import { Hammer, RotateCcw } from 'lucide-react';
import { useGame } from '../../context/GameContext.jsx';
import { getSprint } from '../../data/sprints.js';

/**
 * Pantalla temporal de la Etapa 1. Se reemplaza en la Etapa 2 por el escritorio de
 * auditoría (CaseWorkspace, EvidenceInspector, LegalManualDrawer y VerdictModal).
 */
export default function ConstructionScreen() {
  const { state, actions } = useGame();
  const sprint = getSprint(state.currentSprint);
  return (
    <div className="mx-auto grid max-w-2xl place-items-center px-4 py-20 text-center">
      <div className="panel w-full p-8">
        <Hammer className="mx-auto size-10 text-budget" aria-hidden="true" />
        <p className="mt-4 font-mono text-xs text-brand-300">
          SPRINT {sprint.id} · UNIDAD {sprint.unidad} · ESTADO: {state.gameStatus}
        </p>
        <h1 className="mt-2 text-2xl font-bold">{sprint.titulo}</h1>
        <p className="mt-3 text-sm text-ink-300">
          Bienvenido, <strong className="text-ink-100">{state.player.name}</strong>. El escritorio de auditoría y los
          casos de este Sprint se están construyendo. Tu consentimiento y tu avance ya se guardan localmente.
        </p>
        <button type="button" className="btn-ghost mt-6" onClick={actions.restart}>
          <RotateCcw className="size-4" aria-hidden="true" /> Reiniciar partida
        </button>
      </div>
    </div>
  );
}
