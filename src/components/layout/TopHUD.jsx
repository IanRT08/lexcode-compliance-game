import { HeartHandshake, Landmark, Volume2, VolumeX, Wallet } from 'lucide-react';
import LexBadge from '../brand/LexBadge.jsx';
import { useGame } from '../../context/GameContext.jsx';
import { getSprint, TOTAL_SPRINTS } from '../../data/sprints.js';

export const METRIC_META = {
  budget: { label: 'Presupuesto', short: 'Presup.', icon: Wallet, color: 'var(--surface-muted)' },
  ethics: { label: 'Reputación Ética', short: 'Ética', icon: HeartHandshake, color: 'var(--surface-paper)' },
  legal: { label: 'Cumplimiento Legal', short: 'Legal', icon: Landmark, color: 'var(--border-subtle)' },
};

export const CRITICAL_THRESHOLD = 25;

/** Barra superior fija: identidad, Sprint actual, progreso y los 3 indicadores vitales. */
export default function TopHUD() {
  const { state, actions } = useGame();
  const inGame = state.gameStatus !== 'START';
  const sprint = getSprint(state.currentSprint);
  const totalCases = sprint.casos.length;

  return (
    <header className="z-30 shrink-0 border-b-2 border-olive bg-app">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <LexBadge className="size-8" />
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-tight text-paper">LexCode</p>
            <p className="label-caps text-panel">Oficial de Cumplimiento</p>
          </div>
        </div>

        {inGame && (
          <div className="min-w-0 border-l border-olive-2 pl-5 leading-tight">
            <p className="label-caps text-muted">
              Sprint {sprint.id}/{TOTAL_SPRINTS} · Unidad {sprint.unidad}
            </p>
            <p className="truncate text-sm font-medium text-paper">{sprint.titulo}</p>
          </div>
        )}

        {inGame && state.gameStatus === 'PLAYING' && totalCases > 0 && (
          <SprintProgress current={state.currentCaseIndex} total={totalCases} />
        )}

        {inGame && (
          <ul
            className="order-last grid w-full grid-cols-3 gap-4 md:order-none md:ml-auto md:w-[min(32rem,40vw)]"
            aria-label="Indicadores de la empresa"
          >
            {Object.entries(METRIC_META).map(([key, meta]) => (
              <MetricBar key={key} meta={meta} value={state.metrics[key]} />
            ))}
          </ul>
        )}

        <div className={`flex items-center gap-3 ${inGame ? '' : 'ml-auto'}`}>
          {inGame && state.player.name && (
            <p className="hidden font-mono text-xs text-panel xl:block">
              OFICIAL: <span className="text-paper">{state.player.name}</span>
            </p>
          )}
          <button
            type="button"
            onClick={actions.toggleSound}
            className="btn-outline p-2 text-paper"
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

function SprintProgress({ current, total }) {
  return (
    <div className="hidden items-center gap-2 lg:flex" aria-label={`Ticket ${current + 1} de ${total}`}>
      <span className="font-mono text-xs text-panel">
        TICKET {String(current + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
      </span>
      <ol className="flex gap-1" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <li
            key={i}
            className={`h-2 w-4 rounded-sm border border-olive-2 ${
              i < current ? 'bg-olive-2' : i === current ? 'bg-muted' : 'bg-transparent'
            }`}
          />
        ))}
      </ol>
    </div>
  );
}

function MetricBar({ meta, value }) {
  const Icon = meta.icon;
  const critical = value <= CRITICAL_THRESHOLD;
  return (
    <li className="min-w-0">
      <div className="mb-1 flex items-center justify-between gap-1">
        <span className="flex min-w-0 items-center gap-1.5 text-xs text-panel">
          <Icon className="size-4 shrink-0" style={{ color: critical ? 'var(--accent-crimson)' : meta.color }} aria-hidden="true" />
          <span className="truncate">
            <span className="sm:hidden">{meta.short}</span>
            <span className="hidden sm:inline">{meta.label}</span>
          </span>
        </span>
        <span
          className={`rounded-sm px-1 font-mono text-xs font-semibold ${critical ? 'bg-crimson text-paper' : 'text-paper'}`}
        >
          {value}
        </span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-sm border border-olive-2 bg-[color-mix(in_oklab,var(--bg-app)_75%,black)]"
        role="meter"
        aria-label={meta.label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div
          className={`h-full transition-[width] duration-500 ${critical ? 'animate-pulse' : ''}`}
          style={{ width: `${value}%`, background: critical ? 'var(--accent-crimson)' : meta.color }}
        />
      </div>
    </li>
  );
}
