import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { getSprint, TOTAL_SPRINTS } from '../data/sprints.js';
import { setSoundEnabled } from '../utils/soundEffects.js';

// ---------------------------------------------------------------------------
// Persistencia 100 % local (localStorage). Nada sale del navegador del jugador.
// Solo se guarda algo DESPUÉS de aceptar el Aviso de Privacidad (Criterio 7).
// ---------------------------------------------------------------------------
export const STORAGE_KEY = 'lexcode.save.v1';
const SAVE_VERSION = 1;

export const METRIC_KEYS = ['budget', 'ethics', 'legal'];

/** Costo de pedir la pista normativa al área jurídica externa. */
export const HINT_COST = 3;
/** Presupuesto que la dirección asigna al iniciar cada nuevo Sprint (trimestre). */
export const SPRINT_BUDGET_BONUS = 15;

export const initialState = {
  player: {
    name: '',
    privacyAccepted: false, // Obligatorio para iniciar (Criterio 7)
    acceptedAt: null,
  },
  soundEnabled: true,
  currentSprint: 1, // 1 a 4 (Unidades I a IV)
  currentCaseIndex: 0,
  metrics: { budget: 100, ethics: 100, legal: 100 },
  activeFeedback: null, // Dictamen del último caso resuelto (VerdictModal)
  decisionHistory: [], // Registro para estadísticas y certificado final
  hintsUsed: [], // IDs de casos en los que se pidió la pista normativa
  endReason: null, // 'budget' | 'ethics' | 'legal' cuando hay GAME_OVER
  gameStatus: 'START', // 'START' | 'PLAYING' | 'SPRINT_SUMMARY' | 'GAME_OVER' | 'VICTORY'
};

const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));

/** Primer indicador que llegó a 0, en orden de gravedad (legal > ética > presupuesto). */
function findDepletedMetric(metrics) {
  return ['legal', 'ethics', 'budget'].find((k) => metrics[k] <= 0) ?? null;
}

function freshRun(state) {
  return {
    ...initialState,
    player: state.player,
    soundEnabled: state.soundEnabled,
    gameStatus: 'PLAYING',
  };
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'ACCEPT_PRIVACY':
      return {
        ...state,
        player: {
          name: action.name.trim(),
          privacyAccepted: true,
          acceptedAt: new Date().toISOString(),
        },
      };

    case 'START_GAME':
      if (!state.player.privacyAccepted) return state;
      return freshRun(state);

    case 'USE_HINT': {
      if (state.gameStatus !== 'PLAYING' || state.activeFeedback) return state;
      if (state.hintsUsed.includes(action.caseId) || state.metrics.budget <= HINT_COST) return state;
      return {
        ...state,
        hintsUsed: [...state.hintsUsed, action.caseId],
        metrics: { ...state.metrics, budget: clamp(state.metrics.budget - HINT_COST) },
      };
    }

    case 'RESOLVE_CASE': {
      if (state.gameStatus !== 'PLAYING' || state.activeFeedback) return state;
      const { caseData, optionId } = action;
      const option = caseData.opciones.find((o) => o.id === optionId);
      if (!option) return state;

      const before = state.metrics;
      const after = {};
      for (const k of METRIC_KEYS) after[k] = clamp(before[k] + (option.impacto?.[k] ?? 0));

      return {
        ...state,
        metrics: after,
        activeFeedback: {
          caseId: caseData.id,
          titulo: caseData.titulo,
          subtema: caseData.subtema,
          option,
          correctOption: caseData.opciones.find((o) => o.esCorrecta) ?? null,
          metricsBefore: before,
          metricsAfter: after,
          depletedMetric: findDepletedMetric(after),
        },
        decisionHistory: [
          ...state.decisionHistory,
          {
            caseId: caseData.id,
            sprint: state.currentSprint,
            subtema: caseData.subtema,
            optionId: option.id,
            tipo: option.tipo ?? null,
            marcoEtico: option.marcoEtico ?? null,
            usedHint: state.hintsUsed.includes(caseData.id),
            esCorrecta: Boolean(option.esCorrecta),
            impacto: option.impacto ?? {},
            at: new Date().toISOString(),
          },
        ],
      };
    }

    case 'ACKNOWLEDGE_FEEDBACK': {
      const fb = state.activeFeedback;
      if (!fb) return state;
      if (fb.depletedMetric) {
        return { ...state, activeFeedback: null, gameStatus: 'GAME_OVER', endReason: fb.depletedMetric };
      }
      const totalCases = getSprint(state.currentSprint).casos.length;
      const nextIndex = state.currentCaseIndex + 1;
      if (nextIndex < totalCases) {
        return { ...state, activeFeedback: null, currentCaseIndex: nextIndex };
      }
      return { ...state, activeFeedback: null, gameStatus: 'SPRINT_SUMMARY' };
    }

    case 'ADVANCE_SPRINT':
      if (state.gameStatus !== 'SPRINT_SUMMARY') return state;
      if (state.currentSprint >= TOTAL_SPRINTS) return { ...state, gameStatus: 'VICTORY' };
      return {
        ...state,
        currentSprint: state.currentSprint + 1,
        currentCaseIndex: 0,
        metrics: { ...state.metrics, budget: clamp(state.metrics.budget + SPRINT_BUDGET_BONUS) },
        gameStatus: 'PLAYING',
      };

    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };

    case 'RESTART':
      return freshRun(state);

    case 'DELETE_LOCAL_DATA':
      // Derechos ARCO (cancelación) y revocación del consentimiento.
      return { ...initialState, soundEnabled: state.soundEnabled };

    default:
      return state;
  }
}

// --- Acceso seguro a localStorage (puede fallar en modo privado o con almacenamiento bloqueado) ---
function readSave() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== SAVE_VERSION || !parsed.state?.player?.privacyAccepted) return null;
    const saved = parsed.state;
    return {
      ...initialState,
      ...saved,
      player: { ...initialState.player, ...saved.player },
      metrics: { ...initialState.metrics, ...saved.metrics },
      decisionHistory: Array.isArray(saved.decisionHistory) ? saved.decisionHistory : [],
      hintsUsed: Array.isArray(saved.hintsUsed) ? saved.hintsUsed : [],
    };
  } catch {
    return null;
  }
}

function writeSave(state) {
  try {
    if (state.player.privacyAccepted) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: SAVE_VERSION, state }));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Sin almacenamiento disponible el juego sigue funcionando, solo sin guardar avance.
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, (init) => readSave() ?? init);

  useEffect(() => writeSave(state), [state]);
  useEffect(() => setSoundEnabled(state.soundEnabled), [state.soundEnabled]);

  const actions = useMemo(
    () => ({
      acceptPrivacy: (name) => dispatch({ type: 'ACCEPT_PRIVACY', name }),
      startGame: () => dispatch({ type: 'START_GAME' }),
      useHint: (caseId) => dispatch({ type: 'USE_HINT', caseId }),
      resolveCase: (caseData, optionId) => dispatch({ type: 'RESOLVE_CASE', caseData, optionId }),
      acknowledgeFeedback: () => dispatch({ type: 'ACKNOWLEDGE_FEEDBACK' }),
      advanceSprint: () => dispatch({ type: 'ADVANCE_SPRINT' }),
      toggleSound: () => dispatch({ type: 'TOGGLE_SOUND' }),
      restart: () => dispatch({ type: 'RESTART' }),
      deleteLocalData: () => dispatch({ type: 'DELETE_LOCAL_DATA' }),
    }),
    [],
  );

  const value = useMemo(() => ({ state, actions }), [state, actions]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame debe usarse dentro de <GameProvider>');
  return ctx;
}
