import { RotateCcw, Trophy } from 'lucide-react';
import { useGame } from '../../context/GameContext.jsx';
import { SPRINTS } from '../../data/sprints.js';
import { summarize, sprintHistory } from '../../utils/stats.js';

/**
 * Informe final (versión provisional). En la Etapa 4 se sustituye por el certificado
 * imprimible ComplianceCertificate con desglose por unidad.
 */
export default function VictoryScreen() {
  const { state, actions } = useGame();
  const total = summarize(state.decisionHistory);

  return (
    <div className="scroll-pane grid h-full place-items-center overflow-y-auto px-4 py-8">
      <article className="paper w-full max-w-2xl overflow-hidden">
        <header className="flex items-center gap-3 bg-olive px-5 py-3 text-paper">
          <Trophy className="size-[18px]" aria-hidden="true" />
          <p className="label-caps">Auditoría completada</p>
        </header>
        <div className="px-6 py-6">
          <h1 className="text-2xl font-bold">Felicidades, {state.player.name}</h1>
          <p className="mt-2 text-sm">
            NovaByte superó los cuatro Sprints con tus dictámenes. Precisión global:{' '}
            <strong className="font-mono">{total.accuracy}%</strong> ({total.correct}/{total.total}).
          </p>
          <ul className="mt-4 divide-y divide-sage rounded border border-sage">
            {SPRINTS.map((s) => {
              const st = summarize(sprintHistory(state.decisionHistory, s.id));
              return (
                <li key={s.id} className="flex items-center justify-between px-3 py-2 text-sm">
                  <span>
                    <span className="font-mono text-xs text-olive">U{s.unidad}</span> {s.titulo}
                  </span>
                  <span className="font-mono">
                    {st.correct}/{st.total}
                  </span>
                </li>
              );
            })}
          </ul>
          <button type="button" className="btn-primary mt-5" onClick={actions.restart}>
            <RotateCcw className="size-4" aria-hidden="true" /> Jugar de nuevo
          </button>
        </div>
      </article>
    </div>
  );
}
