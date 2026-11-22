import { useEffect } from 'react';
import { ArrowRight, CircleCheck, CircleX, GraduationCap, Minus, Scale, Siren, TrendingDown, TrendingUp } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import { TypeChip } from './DecisionDesk.jsx';
import { METRIC_META } from '../layout/TopHUD.jsx';
import { useGame, METRIC_KEYS } from '../../context/GameContext.jsx';
import { ETHICAL_FRAMEWORKS, VERDICT_TYPES } from '../../data/taxonomy.js';
import { getSprint } from '../../data/sprints.js';
import { playSound } from '../../utils/soundEffects.js';

const END_LABELS = {
  budget: 'Presupuesto',
  ethics: 'Reputación Ética',
  legal: 'Cumplimiento Legal',
};

/**
 * Retroalimentación inmediata tras cada dictamen (Criterio 5): explica SIEMPRE el porqué
 * ético y el fundamento legal, tanto si el jugador acierta como si se equivoca.
 */
export default function VerdictModal() {
  const { state, actions } = useGame();
  const fb = state.activeFeedback;

  useEffect(() => {
    if (fb?.depletedMetric) playSound('alert');
  }, [fb?.depletedMetric]);

  if (!fb) return null;

  const sprint = getSprint(state.currentSprint);
  const caso = sprint.casos.find((c) => c.id === fb.caseId);
  const { option, correctOption } = fb;
  const ok = Boolean(option.esCorrecta);
  const isLastCase = state.currentCaseIndex >= sprint.casos.length - 1;

  const nextLabel = fb.depletedMetric ? 'Ver consecuencias' : isLastCase ? 'Cerrar Sprint y ver resumen' : 'Siguiente ticket';

  return (
    <Modal
      open
      dismissible={false}
      size="lg"
      icon={Scale}
      kicker={`Dictamen ${fb.caseId} · ${fb.subtema}`}
      title={fb.titulo}
      footer={
        <button type="button" className="btn-primary" onClick={actions.acknowledgeFeedback} data-autofocus>
          {nextLabel} <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      }
    >
      <div className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <StampMark ok={ok} />
          <div className="min-w-0">
            <p className={`flex items-center gap-1.5 text-lg font-semibold ${ok ? 'text-olive' : 'text-crimson'}`}>
              {ok ? <CircleCheck className="size-[18px]" aria-hidden="true" /> : <CircleX className="size-[18px]" aria-hidden="true" />}
              {ok ? 'Dictamen correcto' : 'Dictamen incorrecto'}
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-olive">Tu decisión:</span>
              <TypeChip type={VERDICT_TYPES[option.tipo] ?? VERDICT_TYPES.aprobar} tipo={option.tipo} />
            </p>
            <p className="mt-1 text-sm font-medium">{option.etiqueta}</p>
          </div>
        </div>

        {fb.depletedMetric && (
          <p className="flex items-start gap-2 rounded border-[1.5px] border-crimson bg-crimson/10 px-3 py-2 text-sm font-semibold text-crimson">
            <Siren className="size-[18px] shrink-0" aria-hidden="true" />
            El indicador de {END_LABELS[fb.depletedMetric]} llegó a 0. NovaByte no puede seguir operando.
          </p>
        )}

        <Impact before={fb.metricsBefore} after={fb.metricsAfter} />

        <Rationale title="Fundamento ético y legal de tu decisión" option={option} tone={ok ? 'olive' : 'crimson'} />

        {!ok && correctOption && (
          <div className="rounded border-[1.5px] border-olive bg-olive/8 p-4">
            <p className="label-caps text-olive">Dictamen recomendado</p>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold">
              <TypeChip type={VERDICT_TYPES[correctOption.tipo] ?? VERDICT_TYPES.aprobar} tipo={correctOption.tipo} />
              {correctOption.etiqueta}
            </p>
            <div className="mt-3">
              <Rationale option={correctOption} tone="olive" compact />
            </div>
          </div>
        )}

        {caso?.aprendizaje && (
          <div className="rounded bg-panel/55 p-4">
            <p className="label-caps flex items-center gap-1.5 text-app">
              <GraduationCap className="size-4" aria-hidden="true" /> Aprendizaje clave
            </p>
            <p className="mt-1.5 text-sm leading-relaxed">{caso.aprendizaje}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

function StampMark({ ok }) {
  return (
    <div
      className={`animate-stamp grid h-20 w-44 shrink-0 place-items-center self-center rounded border-[3px] font-mono text-lg font-bold tracking-[0.12em] uppercase outline-2 outline-offset-2 ${
        ok ? 'border-olive text-olive outline-olive' : 'border-crimson text-crimson outline-crimson'
      } outline`}
      aria-hidden="true"
    >
      {ok ? 'Conforme' : 'No conforme'}
    </div>
  );
}

function Rationale({ title, option, tone, compact = false }) {
  const fw = ETHICAL_FRAMEWORKS[option.marcoEtico];
  return (
    <div className={compact ? '' : `border-l-[3px] pl-4 ${tone === 'crimson' ? 'border-crimson' : 'border-olive'}`}>
      {title && <p className="label-caps text-olive">{title}</p>}
      <p className={`${title ? 'mt-1.5' : ''} text-sm leading-relaxed`}>
        {compact ? option.retroalimentacion.replace(/^Dictamen correcto\.\s*/, '') : option.retroalimentacion}
      </p>
      {(option.modeloEtico || fw) && (
        <p className="mt-2 text-sm">
          <span className="font-semibold">Modelo ético: </span>
          {option.modeloEtico}
          {fw && <span className="mt-0.5 block text-xs text-olive">{fw.label}: {fw.pregunta}</span>}
        </p>
      )}
      {option.fundamento?.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Fundamento normativo">
          {option.fundamento.map((f) => (
            <li key={f} className="rounded-sm border border-olive-2 bg-white/40 px-1.5 py-0.5 font-mono text-[11px]">
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Impact({ before, after }) {
  return (
    <ul className="grid grid-cols-3 gap-2" aria-label="Impacto en los indicadores">
      {METRIC_KEYS.map((k) => {
        const delta = after[k] - before[k];
        const Icon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;
        const MetricIcon = METRIC_META[k].icon;
        return (
          <li key={k} className="rounded border border-sage px-2.5 py-2">
            <p className="flex items-center gap-1 text-xs text-olive">
              <MetricIcon className="size-4" aria-hidden="true" />
              <span className="truncate">{METRIC_META[k].label}</span>
            </p>
            <p className="mt-0.5 flex items-baseline gap-1.5 font-mono">
              <span className="text-lg font-semibold">{after[k]}</span>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                  delta > 0 ? 'text-olive' : delta < 0 ? 'text-crimson' : 'text-olive-2'
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {delta > 0 ? `+${delta}` : delta}
              </span>
            </p>
          </li>
        );
      })}
    </ul>
  );
}
