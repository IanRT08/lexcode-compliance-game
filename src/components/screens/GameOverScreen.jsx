import { useEffect } from 'react';
import { Gavel, HeartCrack, RotateCcw, TrendingDown } from 'lucide-react';
import { useGame } from '../../context/GameContext.jsx';
import { getSprint } from '../../data/sprints.js';
import { summarize } from '../../utils/stats.js';
import { playSound } from '../../utils/soundEffects.js';

const ENDINGS = {
  budget: {
    icon: TrendingDown,
    sello: 'Quiebra',
    titulo: 'Quiebra financiera',
    texto:
      'NovaByte se quedó sin recursos. Las multas, las indemnizaciones y los costos de corregir decisiones apresuradas superaron el presupuesto. Cumplir la ley y actuar con ética también exige administrar con prudencia: un buen dictamen busca la solución responsable que la empresa pueda sostener.',
  },
  ethics: {
    icon: HeartCrack,
    sello: 'Crisis',
    titulo: 'Crisis reputacional',
    texto:
      'Clientes, talento e inversionistas abandonaron NovaByte. Aunque algunas decisiones no fueran ilegales, la confianza se perdió: la ética va más allá de lo que la ley exige, y una empresa de tecnología vive de la confianza de las personas usuarias.',
  },
  legal: {
    icon: Gavel,
    sello: 'Clausura',
    titulo: 'Clausura y sanción legal',
    texto:
      'Las autoridades sancionaron a NovaByte y suspendieron sus operaciones. Ignorar la normatividad vigente expuso a la empresa a multas, procedimientos e incluso responsabilidad penal de sus directivos. El cumplimiento normativo no es un trámite: es una condición para operar.',
  },
};

/** Final temático cuando un indicador llega a 0. */
export default function GameOverScreen() {
  const { state, actions } = useGame();
  const ending = ENDINGS[state.endReason] ?? ENDINGS.legal;
  const Icon = ending.icon;
  const stats = summarize(state.decisionHistory);
  const sprint = getSprint(state.currentSprint);

  useEffect(() => {
    playSound('gameOver');
  }, []);

  return (
    <div className="scroll-pane grid h-full place-items-center overflow-y-auto px-4 py-8">
      <article className="paper w-full max-w-2xl overflow-hidden">
        <header className="flex items-center gap-3 bg-burgundy px-5 py-3 text-paper">
          <Icon className="size-[18px]" aria-hidden="true" />
          <p className="label-caps">Fin de la partida · Sprint {sprint.id}</p>
        </header>
        <div className="px-6 py-6">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div
              className="animate-stamp grid h-20 w-40 shrink-0 place-items-center rounded border-[3px] border-crimson font-mono text-xl font-bold tracking-[0.12em] text-crimson uppercase outline-2 outline-offset-2 outline-crimson"
              aria-hidden="true"
            >
              {ending.sello}
            </div>
            <h1 className="text-2xl font-bold text-crimson">{ending.titulo}</h1>
          </div>
          <p className="mt-4 text-sm leading-relaxed">{ending.texto}</p>

          <dl className="mt-5 grid grid-cols-3 divide-x divide-sage rounded border border-sage">
            <div className="px-3 py-2">
              <dt className="label-caps text-olive">Dictámenes</dt>
              <dd className="font-mono text-xl font-semibold">{stats.total}</dd>
            </div>
            <div className="px-3 py-2">
              <dt className="label-caps text-olive">Aciertos</dt>
              <dd className="font-mono text-xl font-semibold">{stats.correct}</dd>
            </div>
            <div className="px-3 py-2">
              <dt className="label-caps text-olive">Precisión</dt>
              <dd className="font-mono text-xl font-semibold">{stats.accuracy}%</dd>
            </div>
          </dl>

          <p className="mt-5 text-sm text-olive">
            Repasa la retroalimentación de cada caso y consulta el Manual Jurídico antes de sellar. Cada decisión tiene un
            fundamento que puedes encontrar.
          </p>
          <button type="button" className="btn-primary mt-4" onClick={actions.restart} autoFocus>
            <RotateCcw className="size-4" aria-hidden="true" /> Reiniciar auditoría desde el Sprint 1
          </button>
        </div>
      </article>
    </div>
  );
}
