import { useEffect } from 'react';
import { ArrowRight, CircleCheck, CircleX, Lightbulb, Wallet } from 'lucide-react';
import { useGame, SPRINT_BUDGET_BONUS } from '../../context/GameContext.jsx';
import { getSprint, TOTAL_SPRINTS } from '../../data/sprints.js';
import { summarize, sprintHistory } from '../../utils/stats.js';
import { playSound } from '../../utils/soundEffects.js';

/** Cierre de Sprint: desempeño, perfil ético y bitácora de decisiones. */
export default function SprintSummary() {
  const { state, actions } = useGame();
  const sprint = getSprint(state.currentSprint);
  const history = sprintHistory(state.decisionHistory, sprint.id);
  const stats = summarize(history);
  const last = sprint.id >= TOTAL_SPRINTS;
  const next = last ? null : getSprint(sprint.id + 1);

  useEffect(() => {
    playSound('success');
  }, []);

  return (
    <div className="scroll-pane h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <p className="label-caps text-muted">
          Cierre de Sprint {sprint.id} · Unidad {sprint.unidad}
        </p>
        <h1 className="mt-1 text-3xl font-bold text-paper">{sprint.titulo}</h1>
        <p className="mt-1 text-panel">{sprint.tema}</p>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <div className="paper grid grid-cols-3 divide-x divide-sage">
              <Stat label="Aciertos" value={`${stats.correct}/${stats.total}`} />
              <Stat label="Precisión" value={`${stats.accuracy}%`} />
              <Stat label="Pistas" value={stats.hints} />
            </div>

            <div className="paper p-4">
              <p className="label-caps text-olive">Tu perfil de decisión ética</p>
              <p className="mt-1 text-xs text-olive">Modelos éticos detrás de los dictámenes que elegiste.</p>
              <ul className="mt-3 space-y-2">
                {stats.profile.map((p) => (
                  <li key={p.key}>
                    <div className="flex justify-between text-sm">
                      <span>{p.label}</span>
                      <span className="font-mono">{p.count}</span>
                    </div>
                    <div className="mt-1 h-2 rounded-sm bg-panel/60">
                      <div
                        className={`h-full rounded-sm ${['egoismo', 'relativismo'].includes(p.key) ? 'bg-crimson' : 'bg-olive'}`}
                        style={{ width: `${(p.count / stats.total) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="paper p-4">
            <p className="label-caps text-olive">Bitácora de dictámenes</p>
            <ol className="mt-2 divide-y divide-sage/50">
              {history.map((h) => {
                const caso = sprint.casos.find((c) => c.id === h.caseId);
                return (
                  <li key={h.caseId} className="flex items-start gap-2.5 py-2.5">
                    {h.esCorrecta ? (
                      <CircleCheck className="mt-0.5 size-4 shrink-0 text-olive" aria-label="Correcto" />
                    ) : (
                      <CircleX className="mt-0.5 size-4 shrink-0 text-crimson" aria-label="Incorrecto" />
                    )}
                    <div className="min-w-0 text-sm">
                      <p className="font-semibold">{caso?.titulo ?? h.caseId}</p>
                      <p className="text-xs text-olive">
                        <span className="font-mono">{h.caseId}</span> · {h.subtema}
                        {h.usedHint && (
                          <span className="ml-1.5 inline-flex items-center gap-0.5">
                            <Lightbulb className="size-4" aria-hidden="true" /> con pista
                          </span>
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded border border-olive-2 p-4 sm:flex-row sm:items-center sm:justify-between">
          {next ? (
            <p className="text-sm text-panel">
              Siguiente: <strong className="text-paper">Sprint {next.id} — {next.titulo}</strong> ({next.tema}).
              <span className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted">
                <Wallet className="size-4" aria-hidden="true" /> La dirección asigna +{SPRINT_BUDGET_BONUS} de presupuesto al nuevo
                trimestre.
              </span>
            </p>
          ) : (
            <p className="text-sm text-panel">Completaste las cuatro unidades. Es momento de presentar tu informe final.</p>
          )}
          <button type="button" className="btn-primary shrink-0" onClick={actions.advanceSprint} autoFocus>
            {next ? `Iniciar Sprint ${next.id}` : 'Ver informe final'} <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="px-4 py-3">
      <p className="label-caps text-olive">{label}</p>
      <p className="mt-0.5 font-mono text-2xl font-semibold">{value}</p>
    </div>
  );
}
