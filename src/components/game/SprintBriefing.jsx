import { ArrowRight, BookOpen, Lightbulb, Mail, Target, Wallet } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import { HINT_COST, SPRINT_BUDGET_BONUS } from '../../context/GameContext.jsx';

/** Correo de inicio de cada Sprint: narrativa, objetivos de aprendizaje y recordatorio de reglas. */
export default function SprintBriefing({ sprint, onStart }) {
  const b = sprint.briefing;
  if (!b) return null;
  return (
    <Modal
      open
      dismissible={false}
      size="lg"
      icon={Mail}
      kicker={`Sprint ${sprint.id} · Unidad ${sprint.unidad} · ${sprint.casos.length} tickets`}
      title={sprint.titulo}
      footer={
        <button type="button" className="btn-primary" onClick={onStart} data-autofocus>
          Abrir el primer ticket <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      }
    >
      <article className="paper">
        <dl className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1 border-b border-sage px-5 py-3 text-sm">
          <dt className="label-caps pt-0.5 text-olive">De</dt>
          <dd className="font-medium">{b.de}</dd>
          <dt className="label-caps pt-0.5 text-olive">Asunto</dt>
          <dd className="font-semibold">{b.asunto}</dd>
        </dl>
        <p className="px-5 py-4 text-[15px] leading-relaxed whitespace-pre-line">{b.cuerpo}</p>
      </article>

      <section className="mt-4" aria-labelledby="briefing-goals">
        <h3 id="briefing-goals" className="label-caps flex items-center gap-1.5 text-olive">
          <Target className="size-4" aria-hidden="true" /> Objetivos de aprendizaje · {sprint.tema}
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm marker:text-olive-2">
          {b.objetivos.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      <ul className="mt-4 grid gap-2 text-xs sm:grid-cols-3" aria-label="Recordatorio de reglas">
        <li className="flex gap-2 rounded border border-sage p-2.5">
          <BookOpen className="size-4 shrink-0 text-olive" aria-hidden="true" />
          Consultar el Manual Jurídico es gratis.
        </li>
        <li className="flex gap-2 rounded border border-sage p-2.5">
          <Lightbulb className="size-4 shrink-0 text-olive" aria-hidden="true" />
          La pista normativa cuesta {HINT_COST} de presupuesto.
        </li>
        <li className="flex gap-2 rounded border border-sage p-2.5">
          <Wallet className="size-4 shrink-0 text-olive" aria-hidden="true" />
          Cada nuevo trimestre suma {SPRINT_BUDGET_BONUS} de presupuesto.
        </li>
      </ul>
    </Modal>
  );
}
