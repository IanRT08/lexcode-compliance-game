import { BookOpen, Gavel, Play, ShieldCheck } from 'lucide-react';
import LexBadge from '../brand/LexBadge.jsx';
import { METRIC_META } from '../layout/TopHUD.jsx';
import { SPRINTS } from '../../data/sprints.js';
import { playSound } from '../../utils/soundEffects.js';

/** Pantalla de inicio: narrativa, reglas del juego y estructura por Sprints. */
export default function StartScreen({ onStart }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-700 bg-brand-700/20 px-3 py-1 text-xs font-medium text-brand-300">
            <ShieldCheck className="size-3.5" aria-hidden="true" /> Simulador de auditoría ética y legal en TI
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            LexCode: <span className="text-brand-300">Oficial de Cumplimiento</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-ink-300">
            Acabas de ser contratado como Oficial de Cumplimiento en <strong className="text-ink-100">NovaByte
            Solutions</strong>, una startup mexicana de software que crece demasiado rápido. Cada día llegan tickets a
            tu escritorio: código, contratos, chats y bitácoras. Inspecciónalos, consulta el Manual Jurídico y emite
            un dictamen antes de que la empresa cruce una línea ética o legal.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-primary px-6 py-3 text-base"
              onClick={() => {
                playSound('click');
                onStart();
              }}
            >
              <Play className="size-5" aria-hidden="true" /> Iniciar auditoría
            </button>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            Antes de comenzar te mostraremos nuestro Aviso de Privacidad. Tus datos nunca salen de tu navegador.
          </p>
        </div>

        <div className="panel relative overflow-hidden p-6">
          <div className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-brand-500/10 blur-2xl" />
          <div className="flex items-center gap-3">
            <LexBadge className="size-12" />
            <div>
              <p className="text-sm font-semibold">Reglas del escritorio</p>
              <p className="text-xs text-ink-500">Lo que necesitas saber antes del primer ticket</p>
            </div>
          </div>
          <ol className="mt-5 space-y-4 text-sm text-ink-300">
            <Rule n={1} icon={BookOpen} title="Inspecciona la evidencia">
              Cada ticket trae un documento. Usa el Manual Jurídico para contrastarlo con la ley y la ética.
            </Rule>
            <Rule n={2} icon={Gavel} title="Emite un dictamen">
              Aprueba, bloquea o remedia. Cada decisión recibe retroalimentación inmediata con su fundamento.
            </Rule>
            <li className="flex gap-3">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-desk-700 text-xs font-bold text-brand-300">
                3
              </span>
              <div>
                <p className="font-medium text-ink-100">Cuida los 3 indicadores vitales</p>
                <p className="mb-2">Si cualquiera llega a 0, la empresa cae: quiebra, crisis reputacional o clausura.</p>
                <div className="flex flex-wrap gap-2">
                  {Object.values(METRIC_META).map(({ label, icon: Icon, color }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-md bg-desk-800 px-2 py-1 text-xs text-ink-100"
                    >
                      <Icon className="size-3.5" style={{ color }} aria-hidden="true" /> {label}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section aria-labelledby="sprints-title" className="mt-14">
        <h2 id="sprints-title" className="text-sm font-semibold tracking-wide text-ink-400 uppercase">
          Tu plan de trabajo: 4 Sprints, 4 Unidades
        </h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SPRINTS.map((s) => (
            <li key={s.id} className="panel p-4">
              <p className="font-mono text-xs text-brand-300">
                SPRINT {s.id} · UNIDAD {s.unidad}
              </p>
              <p className="mt-1.5 font-semibold">{s.titulo}</p>
              <p className="mt-1 text-xs text-ink-400">{s.tema}</p>
              <p className="mt-3 text-xs text-ink-500">{s.escenario}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Rule({ n, icon: Icon, title, children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-desk-700 text-xs font-bold text-brand-300">
        {n}
      </span>
      <div>
        <p className="flex items-center gap-1.5 font-medium text-ink-100">
          <Icon className="size-4 text-ink-400" aria-hidden="true" /> {title}
        </p>
        <p>{children}</p>
      </div>
    </li>
  );
}
