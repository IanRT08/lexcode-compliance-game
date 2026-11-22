import { useEffect, useMemo, useState } from 'react';
import { Award, Info, Printer, RotateCcw } from 'lucide-react';
import LexBadge from '../brand/LexBadge.jsx';
import Modal from '../ui/Modal.jsx';
import { METRIC_META } from '../layout/TopHUD.jsx';
import { useGame, METRIC_KEYS } from '../../context/GameContext.jsx';
import { SPRINTS } from '../../data/sprints.js';
import { summarize, sprintHistory } from '../../utils/stats.js';
import { playSound } from '../../utils/soundEffects.js';

/**
 * Niveles propios del juego. Se evitan a propósito los nombres de la escala de evaluación
 * académica para que el reconocimiento no se confunda con una calificación real.
 */
export function performanceLevel(accuracy) {
  if (accuracy >= 90) return { label: 'Oficial ejemplar', tone: 'text-olive' };
  if (accuracy >= 80) return { label: 'Oficial confiable', tone: 'text-olive-2' };
  if (accuracy >= 70) return { label: 'Oficial en práctica', tone: 'text-earth' };
  return { label: 'Aprendiz de cumplimiento', tone: 'text-crimson' };
}

/** Código corto y reproducible de la partida (alias + fecha de aceptación del aviso). */
function gameCode(name, seed) {
  let h = 2166136261;
  for (const ch of `${name}|${seed}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return `LX-${(h >>> 0).toString(36).toUpperCase().padStart(7, '0')}`;
}

const DISCLAIMER =
  'Este reconocimiento es un premio simbólico por terminar el juego LexCode. No es un documento oficial, no acredita conocimientos ni calificaciones y no tiene validez legal ni académica ante la UTEZ ni ante ninguna otra institución. NovaByte Solutions y sus personajes son ficticios.';

/**
 * Reconocimiento final imprimible (@media print) con desglose por unidad.
 * Antes de imprimirlo se muestra un aviso que el jugador debe confirmar.
 */
export default function ComplianceCertificate() {
  const { state, actions } = useGame();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const total = summarize(state.decisionHistory);
  const level = performanceLevel(total.accuracy);
  const issued = useMemo(
    () => new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }),
    [],
  );

  useEffect(() => {
    playSound('success');
  }, []);

  const print = () => {
    setConfirmOpen(false);
    setUnderstood(false);
    // Se espera a que el modal se cierre para que no aparezca en la impresión.
    setTimeout(() => window.print(), 150);
  };

  return (
    <div className="scroll-pane h-full overflow-y-auto px-4 py-6 print:overflow-visible print:p-0">
      <div className="no-print mx-auto mb-4 max-w-4xl space-y-3">
        <div className="flex items-start gap-3 rounded border-[1.5px] border-muted bg-[color-mix(in_oklab,var(--bg-app)_85%,black)] p-3">
          <Info className="mt-0.5 size-[18px] shrink-0 text-muted" aria-hidden="true" />
          <p className="text-sm text-paper">
            <strong>Recuerda:</strong> este reconocimiento es solo un premio simbólico por terminar el juego. No tiene
            validez legal ni oficial y no sustituye ninguna calificación ni constancia escolar.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button type="button" className="btn-outline text-paper" onClick={actions.restart}>
            <RotateCcw className="size-4" aria-hidden="true" /> Jugar de nuevo
          </button>
          <button type="button" className="btn-primary" onClick={() => setConfirmOpen(true)} autoFocus>
            <Printer className="size-4" aria-hidden="true" /> Descargar / imprimir reconocimiento
          </button>
        </div>
      </div>

      <article
        className="print-area paper relative mx-auto max-w-4xl overflow-hidden border-[3px] border-double border-olive p-6 sm:p-10"
        aria-label="Reconocimiento simbólico del juego LexCode"
      >
        <span
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 font-mono text-3xl font-bold tracking-[0.15em] whitespace-nowrap text-sage/20 uppercase select-none sm:text-6xl"
          aria-hidden="true"
        >
          Sin validez oficial
        </span>

        <p className="relative rounded-sm border-[1.5px] border-earth px-3 py-2 text-center text-xs font-semibold text-earth">
          PREMIO SIMBÓLICO DE UN JUEGO EDUCATIVO · SIN VALIDEZ LEGAL NI OFICIAL
        </p>

        <header className="relative mt-5 flex flex-col items-center gap-3 border-b border-sage pb-5 text-center">
          <LexBadge className="size-14" />
          <p className="label-caps text-earth">Juego LexCode · Empresa ficticia NovaByte Solutions</p>
          <h1 className="text-2xl font-bold sm:text-3xl">Reconocimiento al Oficial de Cumplimiento</h1>
        </header>

        <section className="relative py-6 text-center">
          <p className="text-sm text-olive">Se entrega, como premio del juego, a</p>
          <p className="mt-1 font-mono text-3xl font-semibold tracking-tight">{state.player.name}</p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed">
            por completar los cuatro Sprints de auditoría ética y legal de LexCode, con {total.total} dictámenes y una
            precisión de <strong className="font-mono">{total.accuracy}%</strong>.
          </p>
          <p className={`mt-3 inline-flex items-center gap-1.5 text-sm font-semibold ${level.tone}`}>
            <Award className="size-[18px]" aria-hidden="true" /> Rango en el juego: {level.label}
          </p>
        </section>

        <section className="relative" aria-labelledby="cert-units">
          <h2 id="cert-units" className="label-caps mb-2 text-olive">
            Resultados por unidad temática
          </h2>
          <div className="overflow-x-auto rounded border border-sage">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-panel/50">
                <tr>
                  {['Unidad', 'Tema', 'Aciertos', 'Precisión', 'Rango'].map((h) => (
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

        <section className="relative mt-5 grid gap-4 sm:grid-cols-2">
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

        <footer className="relative mt-6 border-t border-sage pt-4">
          <div className="flex flex-wrap justify-between gap-2 text-xs text-olive">
            <p>
              Código de partida: <span className="font-mono text-app">{gameCode(state.player.name, state.player.acceptedAt)}</span>
            </p>
            <p>Generado el {issued} por el juego LexCode (Equipo LexCode).</p>
          </div>
          <p className="mt-3 rounded-sm bg-panel/45 px-3 py-2 text-xs leading-relaxed">
            <strong>Aviso:</strong> {DISCLAIMER}
          </p>
        </footer>
      </article>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        icon={Info}
        kicker="Antes de descargar"
        title="Este reconocimiento no tiene validez oficial"
        size="md"
        footer={
          <>
            <button type="button" className="btn-ghost" onClick={() => setConfirmOpen(false)}>
              Cancelar
            </button>
            <button type="button" className="btn-primary" disabled={!understood} onClick={print}>
              <Printer className="size-4" aria-hidden="true" /> Entendido, descargar
            </button>
          </>
        }
      >
        <div className="prose-legal">
          <p>{DISCLAIMER}</p>
          <ul>
            <li>Es un premio simbólico para celebrar que terminaste la auditoría de NovaByte.</li>
            <li>No lo presentes como constancia, certificado escolar ni comprobante de estudios.</li>
            <li>No incluye logotipos institucionales para evitar confusiones.</li>
            <li>Para guardarlo como PDF, elige «Guardar como PDF» en el diálogo de impresión de tu navegador.</li>
          </ul>
        </div>
        <label className="mt-4 flex cursor-pointer items-start gap-3 rounded border border-sage p-3 text-sm">
          <input
            type="checkbox"
            checked={understood}
            onChange={(e) => setUnderstood(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-[var(--brand-primary)]"
          />
          Entiendo que este reconocimiento es solo un premio del juego y que no tiene validez legal ni oficial.
        </label>
      </Modal>
    </div>
  );
}
