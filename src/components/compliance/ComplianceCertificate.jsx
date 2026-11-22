import { useEffect, useMemo } from 'react';
import { Printer, RotateCcw } from 'lucide-react';
import LexBadge from '../brand/LexBadge.jsx';
import InstitutionalLogos from '../brand/InstitutionalLogos.jsx';
import { METRIC_META } from '../layout/TopHUD.jsx';
import { useGame, METRIC_KEYS } from '../../context/GameContext.jsx';
import { SPRINTS } from '../../data/sprints.js';
import { PROJECT } from '../../data/project.js';
import { summarize, sprintHistory } from '../../utils/stats.js';
import { playSound } from '../../utils/soundEffects.js';

/** Escala inspirada en la escala de desempeño por competencias de la rúbrica (DGTyP). */
export function performanceLevel(accuracy) {
  if (accuracy >= 90) return { label: 'Competente Estratégico', tone: 'text-olive' };
  if (accuracy >= 80) return { label: 'Competente Autónomo', tone: 'text-olive-2' };
  if (accuracy >= 70) return { label: 'Competente Básico', tone: 'text-earth' };
  return { label: 'En formación', tone: 'text-crimson' };
}

/** Folio corto y reproducible a partir del alias y la fecha de aceptación del aviso. */
function folio(name, seed) {
  let h = 2166136261;
  for (const ch of `${name}|${seed}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return `LX-${(h >>> 0).toString(36).toUpperCase().padStart(7, '0')}`;
}

/**
 * Certificado final imprimible (@media print) con desglose por unidad.
 * Es una constancia lúdica del juego: se aclara que no es un documento oficial de la UTEZ.
 */
export default function ComplianceCertificate() {
  const { state, actions } = useGame();
  const total = summarize(state.decisionHistory);
  const level = performanceLevel(total.accuracy);
  const issued = useMemo(
    () => new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }),
    [],
  );

  useEffect(() => {
    playSound('success');
  }, []);

  return (
    <div className="scroll-pane h-full overflow-y-auto px-4 py-6 print:overflow-visible print:p-0">
      <div className="no-print mx-auto mb-4 flex max-w-4xl flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-panel">
          Auditoría completada. Puedes imprimir tu certificado o guardarlo como PDF desde el diálogo de impresión.
        </p>
        <div className="flex gap-2">
          <button type="button" className="btn-outline text-paper" onClick={actions.restart}>
            <RotateCcw className="size-4" aria-hidden="true" /> Jugar de nuevo
          </button>
          <button type="button" className="btn-primary" onClick={() => window.print()} autoFocus>
            <Printer className="size-4" aria-hidden="true" /> Imprimir / guardar PDF
          </button>
        </div>
      </div>

      <article
        className="print-area paper mx-auto max-w-4xl border-[3px] border-double border-olive p-6 sm:p-10"
        aria-label="Certificado de Oficial de Cumplimiento"
      >
        <header className="flex flex-col items-center gap-4 border-b border-sage pb-5 text-center">
          <InstitutionalLogos className="border-0 bg-transparent p-0" />
          <div className="flex items-center gap-3">
            <LexBadge className="size-12" />
            <div className="text-left">
              <p className="label-caps text-earth">LexCode · NovaByte Solutions</p>
              <h1 className="text-2xl font-bold sm:text-3xl">Certificado de Oficial de Cumplimiento</h1>
            </div>
          </div>
        </header>

        <section className="py-6 text-center">
          <p className="text-sm text-olive">Se otorga a</p>
          <p className="mt-1 font-mono text-3xl font-semibold tracking-tight">{state.player.name}</p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed">
            por completar la auditoría ética y legal de NovaByte Solutions en las cuatro unidades de la asignatura{' '}
            <strong>{PROJECT.course}</strong>, emitiendo {total.total} dictámenes con una precisión global de{' '}
            <strong className="font-mono">{total.accuracy}%</strong>.
          </p>
          <p className={`label-caps mt-3 text-sm ${level.tone}`}>Nivel alcanzado: {level.label}</p>
        </section>

        <section aria-labelledby="cert-units">
          <h2 id="cert-units" className="label-caps mb-2 text-olive">
            Desglose por unidad
          </h2>
          <div className="overflow-x-auto rounded border border-sage">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-panel/50">
                <tr>
                  {['Unidad', 'Tema', 'Aciertos', 'Precisión', 'Nivel'].map((h) => (
                    <th key={h} scope="col" className="label-caps px-3 py-2 text-app">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-sage/60">
                {SPRINTS.map((s) => {
                  const st = summarize(sprintHistory(state.decisionHistory, s.id));
                  const lv = performanceLevel(st.accuracy);
                  return (
                    <tr key={s.id}>
                      <td className="px-3 py-2 font-mono font-semibold">{s.unidad}</td>
                      <td className="px-3 py-2">
                        <span className="font-medium">{s.tema}</span>
                        <span className="block text-xs text-olive">{s.titulo}</span>
                      </td>
                      <td className="px-3 py-2 font-mono">
                        {st.correct}/{st.total}
                      </td>
                      <td className="px-3 py-2 font-mono">{st.accuracy}%</td>
                      <td className={`px-3 py-2 text-xs font-semibold ${lv.tone}`}>{lv.label}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded border border-sage p-3">
            <p className="label-caps text-olive">Estado final de NovaByte</p>
            <ul className="mt-2 space-y-1 text-sm">
              {METRIC_KEYS.map((k) => (
                <li key={k} className="flex justify-between">
                  <span>{METRIC_META[k].label}</span>
                  <span className="font-mono font-semibold">{state.metrics[k]}/100</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded border border-sage p-3">
            <p className="label-caps text-olive">Perfil de decisión ética</p>
            <ul className="mt-2 space-y-1 text-sm">
              {total.profile.slice(0, 3).map((p) => (
                <li key={p.key} className="flex justify-between">
                  <span>{p.label}</span>
                  <span className="font-mono">{p.count}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-olive">Pistas normativas solicitadas: {total.hints}</p>
          </div>
        </section>

        <footer className="mt-6 flex flex-col gap-4 border-t border-sage pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-xs text-olive">
            <p>
              Folio: <span className="font-mono text-app">{folio(state.player.name, state.player.acceptedAt)}</span>
            </p>
            <p>Fecha de emisión: {issued}</p>
          </div>
          <div className="text-center">
            <div className="mx-auto h-px w-48 bg-app" aria-hidden="true" />
            <p className="mt-1 text-xs font-semibold">Equipo LexCode</p>
            <p className="text-[11px] text-olive">{PROJECT.program}</p>
          </div>
        </footer>
        <p className="mt-4 text-center text-[10px] leading-snug text-olive">
          Constancia generada por un juego educativo con fines académicos. No es un documento oficial ni tiene validez
          ante la UTEZ u otra institución; los logotipos identifican el origen académico del proyecto. El alias se
          obtuvo con consentimiento y solo existe en este navegador.
        </p>
      </article>
    </div>
  );
}
