import { HeartHandshake, Landmark, Volume2, VolumeX, Wallet } from 'lucide-react';
import LexBadge from '../brand/LexBadge.jsx';
import { useGame } from '../../context/GameContext.jsx';
import { getSprint, TOTAL_SPRINTS } from '../../data/sprints.js';

export const METRIC_META = {
  budget: { label: 'Presupuesto', icon: Wallet, color: 'var(--color-budget)' },
  ethics: { label: 'Reputación Ética', icon: HeartHandshake, color: 'var(--color-ethics)' },
  legal: { label: 'Cumplimiento Legal', icon: Landmark, color: 'var(--color-legal)' },
};

/** Barra superior: identidad, Sprint actual, progreso y los 3 indicadores vitales. */
export default function TopHUD() {
  const { state, actions } = useGame();
  const inGame = state.gameStatus !== 'START';
  const sprint = getSprint(state.currentSprint);
  const totalCases = sprint.casos.length;

  return (
    <header className="sticky top-0 z-30 border-b border-desk-700 bg-desk-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <LexBadge className="size-8" />
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-tight">LexCode</p>
            <p className="text-[11px] text-ink-500">Oficial de Cumplimiento</p>
          </div>
        </div>

        {inGame && (
          <div className="min-w-0 leading-tight">
            <p className="text-[11px] font-semibold tracking-wide text-brand-300 uppercase">
              Sprint {sprint.id}/{TOTAL_SPRINTS} · Unidad {sprint.unidad}
            </p>
            <p className="truncate text-sm font-medium">{sprint.titulo}</p>
            {state.gameStatus === 'PLAYING' && totalCases > 0 && (
              <p className="text-[11px] text-ink-500">
                Ticket {Math.min(state.currentCaseIndex + 1, totalCases)} de {totalCases}
              </p>
            )}
          </div>
        )}

        {inGame && (
          <ul className="order-last grid w-full grid-cols-3 gap-3 sm:order-none sm:w-auto sm:flex-1 sm:max-w-xl" aria-label="Indicadores de la empresa">
            {Object.entries(METRIC_META).map(([key, meta]) => (
              <MetricBar key={key} meta={meta} value={state.metrics[key]} />
            ))}
          </ul>
        )}

        <div className="ml-auto flex items-center gap-3">
          {inGame && state.player.name && (
            <p className="hidden text-xs text-ink-400 md:block">
              Oficial: <span className="font-medium text-ink-100">{state.player.name}</span>
            </p>
          )}
          <button
            type="button"
            onClick={actions.toggleSound}
            className="rounded-lg border border-desk-600 p-2 text-ink-300 hover:bg-desk-700 hover:text-ink-100"
            aria-pressed={!state.soundEnabled}
            aria-label={state.soundEnabled ? 'Silenciar efectos de sonido' : 'Activar efectos de sonido'}
            title={state.soundEnabled ? 'Silenciar' : 'Activar sonido'}
          >
            {state.soundEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

function MetricBar({ meta, value }) {
  const Icon = meta.icon;
  const critical = value <= 25;
  return (
    <li className="min-w-0">
      <div className="mb-1 flex items-center justify-between gap-1 text-[11px]">
        <span className="flex min-w-0 items-center gap-1 text-ink-400">
          <Icon className="size-3.5 shrink-0" style={{ color: meta.color }} aria-hidden="true" />
          <span className="truncate">{meta.label}</span>
        </span>
        <span className={`font-mono font-semibold ${critical ? 'text-bad' : 'text-ink-100'}`}>{value}</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-desk-700"
        role="meter"
        aria-label={meta.label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${critical ? 'animate-pulse' : ''}`}
          style={{ width: `${value}%`, background: critical ? 'var(--color-bad)' : meta.color }}
        />
      </div>
    </li>
  );
}
