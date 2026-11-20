import { useId, useState } from 'react';
import { BookOpen, Gavel, Lightbulb, Stamp } from 'lucide-react';
import LegalManualPanel from './LegalManualPanel.jsx';
import { useGame, HINT_COST } from '../../context/GameContext.jsx';
import { VERDICT_TYPES, getCaseHint } from '../../data/taxonomy.js';
import { playSound } from '../../utils/soundEffects.js';

/**
 * Panel derecho: mesa de dictamen (opciones + sello) y consulta rápida del Manual Jurídico.
 * Se reinicia al cambiar de caso mediante `key`.
 */
export default function DecisionDesk({ caso }) {
  const { state, actions } = useGame();
  const [tab, setTab] = useState('dictamen');
  const [selected, setSelected] = useState(null);
  const groupId = useId();

  const hint = getCaseHint(caso);
  const hintUsed = state.hintsUsed.includes(caso.id);
  const canAffordHint = state.metrics.budget > HINT_COST;
  const selectedOption = caso.opciones.find((o) => o.id === selected);
  const verdict = VERDICT_TYPES[selectedOption?.tipo] ?? VERDICT_TYPES.aprobar;

  const submit = () => {
    if (!selectedOption) return;
    playSound(selectedOption.esCorrecta ? 'approve' : 'reject');
    actions.resolveCase(caso, selectedOption.id);
  };

  return (
    <section aria-label="Mesa de dictamen" className="flex min-h-0 flex-col gap-3">
      <div className="flex gap-2" role="tablist" aria-label="Herramientas del oficial">
        <DeskTab active={tab === 'dictamen'} onClick={() => setTab('dictamen')} icon={Gavel}>
          Dictamen
        </DeskTab>
        <DeskTab active={tab === 'manual'} onClick={() => setTab('manual')} icon={BookOpen}>
          Manual Jurídico
        </DeskTab>
      </div>

      {tab === 'manual' ? (
        <LegalManualPanel relatedIds={caso.manualRefs} />
      ) : (
        <div className="flex flex-col gap-3">
          <fieldset>
            <legend id={groupId} className="label-caps mb-2 text-muted">
              Selecciona tu dictamen
            </legend>
            <div role="radiogroup" aria-labelledby={groupId} className="space-y-2">
              {caso.opciones.map((o, i) => {
                const type = VERDICT_TYPES[o.tipo] ?? VERDICT_TYPES.aprobar;
                const checked = selected === o.id;
                return (
                  <label
                    key={o.id}
                    className={`flex cursor-pointer gap-3 rounded border-[1.5px] bg-paper px-3 py-2.5 text-app transition-colors ${
                      checked ? 'border-muted ring-2 ring-muted' : 'border-sage hover:border-olive-2'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${groupId}-opt`}
                      value={o.id}
                      checked={checked}
                      onChange={() => {
                        playSound('click');
                        setSelected(o.id);
                      }}
                      className="mt-1 size-4 shrink-0 accent-[var(--brand-primary)]"
                    />
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-semibold text-olive">{String.fromCharCode(65 + i)}</span>
                        <TypeChip type={type} tipo={o.tipo} />
                      </span>
                      <span className="mt-1 block text-sm leading-snug">{o.etiqueta}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {hint && (
            <div className="rounded border border-dashed border-sage p-3">
              {hintUsed ? (
                <>
                  <p className="label-caps flex items-center gap-1.5 text-muted">
                    <Lightbulb className="size-4" aria-hidden="true" /> Opinión del área jurídica
                  </p>
                  <p className="mt-1.5 border-l-[3px] border-muted pl-3 font-mono text-[13px] leading-relaxed text-paper">
                    {hint}
                  </p>
                </>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-panel">
                    ¿Dudas? El despacho jurídico externo puede orientarte.
                    <span className="block font-mono text-muted">Costo: −{HINT_COST} Presupuesto</span>
                  </p>
                  <button
                    type="button"
                    className="btn-outline px-3 py-1.5 text-xs text-paper"
                    disabled={!canAffordHint}
                    onClick={() => {
                      playSound('click');
                      actions.useHint(caso.id);
                    }}
                  >
                    <Lightbulb className="size-4" aria-hidden="true" /> Solicitar pista normativa
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="sticky bottom-0 -mx-1 bg-[color-mix(in_oklab,var(--bg-app)_88%,black)] px-1 pt-1 pb-1">
            <button
              type="button"
              className={`btn-stamp w-full ${verdict.stampClass}`}
              disabled={!selectedOption}
              onClick={submit}
            >
              <Stamp className="size-[18px]" aria-hidden="true" />
              {selectedOption ? `Sellar dictamen: ${verdict.label}` : 'Selecciona un dictamen'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function DeskTab({ active, onClick, icon: Icon, children }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`btn-outline flex-1 px-3 py-2 text-[13px] ${active ? 'bg-olive text-paper' : 'text-paper'}`}
    >
      <Icon className="size-4" aria-hidden="true" /> {children}
    </button>
  );
}

export function TypeChip({ type, tipo }) {
  const tones = {
    aprobar: 'border-olive text-olive',
    bloquear: 'border-crimson text-crimson',
    remediar: 'border-earth text-earth',
    escalar: 'border-burgundy text-burgundy',
  };
  return (
    <span
      className={`rounded-sm border-[1.5px] px-1.5 py-px font-mono text-[10px] font-semibold tracking-[0.06em] uppercase ${
        tones[tipo] ?? tones.aprobar
      }`}
    >
      {type.label}
    </span>
  );
}
