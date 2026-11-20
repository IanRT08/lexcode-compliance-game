import { BookOpen, FileText, Gavel, Play, Stamp } from 'lucide-react';
import LexBadge from '../brand/LexBadge.jsx';
import InstitutionalLogos from '../brand/InstitutionalLogos.jsx';
import { METRIC_META } from '../layout/TopHUD.jsx';
import { SPRINTS } from '../../data/sprints.js';
import { PROJECT } from '../../data/project.js';
import { playSound } from '../../utils/soundEffects.js';

/** Pantalla de inicio: identidad institucional, narrativa, reglas y plan de Sprints. */
export default function StartScreen({ onStart }) {
  return (
    <div className="scroll-pane h-full overflow-y-auto">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <InstitutionalLogos compact />
          <p className="font-mono text-[11px] leading-relaxed text-panel sm:text-right">
            {PROJECT.course}
            <br />
            {PROJECT.program}
          </p>
        </div>

        <section className="mt-8 grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="label-caps inline-flex items-center gap-2 rounded-sm border border-muted px-2 py-1 text-muted">
              <Stamp className="size-4" aria-hidden="true" /> Expediente de contratación N.º 2026-117
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance text-paper sm:text-5xl">
              LexCode: Oficial de Cumplimiento
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-panel">
              Acabas de ser contratado como Oficial de Cumplimiento en <strong className="text-paper">NovaByte
              Solutions</strong>, una startup mexicana de software que crece demasiado rápido. Cada día llegan tickets a
              tu escritorio: código, contratos, chats y bitácoras. Inspecciónalos, consulta el Manual Jurídico y emite
              un dictamen antes de que la empresa cruce una línea ética o legal.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="btn-stamp stamp-aprobar px-6 py-3 text-base"
                onClick={() => {
                  playSound('click');
                  onStart();
                }}
              >
                <Play className="size-[18px]" aria-hidden="true" /> Iniciar auditoría
              </button>
              <p className="max-w-xs text-xs text-panel">
                Antes de comenzar verás nuestro Aviso de Privacidad. Tus datos nunca salen de tu navegador.
              </p>
            </div>
          </div>

          <div className="paper p-5">
            <div className="flex items-center gap-3 border-b border-sage pb-3">
              <LexBadge className="size-10" />
              <div>
                <p className="label-caps text-olive">Manual de inducción</p>
                <p className="text-sm font-semibold">Reglas del escritorio</p>
              </div>
            </div>
            <ol className="mt-4 space-y-4 text-sm">
              <Rule n={1} icon={FileText} title="Inspecciona el expediente">
                Cada ticket trae evidencia: código, correos, chats o contratos. Revisa todas las pestañas.
              </Rule>
              <Rule n={2} icon={BookOpen} title="Consulta el Manual Jurídico">
                Contrasta la evidencia con la ley mexicana y los códigos de ética profesional. Consultarlo es gratis.
              </Rule>
              <Rule n={3} icon={Gavel} title="Sella tu dictamen">
                Aprueba, bloquea, remedia o escala. Cada decisión recibe retroalimentación inmediata con su fundamento.
              </Rule>
              <li className="flex gap-3">
                <Num n={4} />
                <div>
                  <p className="font-semibold">Cuida los 3 indicadores vitales</p>
                  <p className="mb-2 text-olive">
                    Si cualquiera llega a 0, la empresa cae: quiebra, crisis reputacional o clausura.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.values(METRIC_META).map(({ label, icon: Icon }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-olive-2 px-1.5 py-0.5 font-mono text-[11px]"
                      >
                        <Icon className="size-4 text-olive" aria-hidden="true" /> {label}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section aria-labelledby="sprints-title" className="mt-10">
          <h2 id="sprints-title" className="label-caps text-muted">
            Plan de trabajo · 4 Sprints · 4 Unidades
          </h2>
          <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SPRINTS.map((s) => (
              <li key={s.id} className="rounded border border-olive-2 bg-panel p-4 text-app">
                <p className="label-caps text-earth">
                  Sprint {s.id} · Unidad {s.unidad}
                </p>
                <p className="mt-1.5 font-semibold">{s.titulo}</p>
                <p className="mt-1 text-xs">{s.tema}</p>
                <p className="mt-3 border-t border-olive-2/40 pt-2 font-mono text-[11px] text-olive">{s.escenario}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

function Num({ n }) {
  return (
    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-sm bg-olive font-mono text-xs font-semibold text-paper">
      {n}
    </span>
  );
}

function Rule({ n, icon: Icon, title, children }) {
  return (
    <li className="flex gap-3">
      <Num n={n} />
      <div>
        <p className="flex items-center gap-1.5 font-semibold">
          <Icon className="size-4 text-olive-2" aria-hidden="true" /> {title}
        </p>
        <p className="text-olive">{children}</p>
      </div>
    </li>
  );
}
