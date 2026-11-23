import { useId, useState } from 'react';
import { ArrowRight, FolderOpen, User } from 'lucide-react';
import EvidenceInspector, { EVIDENCE_ICONS, evidenceTitle } from './EvidenceInspector.jsx';
import { getEvidenceList } from '../../data/taxonomy.js';
import TicketGlossary from './TicketGlossary.jsx';

/**
 * Panel izquierdo: carpeta del expediente con pestañas (resumen del ticket + una pestaña
 * por cada pieza de evidencia). Se reinicia al cambiar de caso mediante `key`.
 */
export default function CaseFile({ caso, sprint, index, total }) {
  const evidences = getEvidenceList(caso);
  const [tab, setTab] = useState(0); // 0 = expediente; 1..n = evidencias
  const baseId = useId();

  const tabs = [
    { label: 'Expediente', icon: FolderOpen },
    ...evidences.map((ev) => ({ label: evidenceTitle(ev), icon: EVIDENCE_ICONS[ev.tipo] ?? FolderOpen })),
  ];

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (tab + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setTab(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <section aria-label="Expediente del caso" className="flex min-h-0 flex-col">
      <header className="animate-ticket border-b border-olive-2 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-paper px-1.5 py-0.5 font-mono text-[11px] font-semibold text-app">{caso.id}</span>
          <span className="rounded-sm border border-muted px-1.5 py-0.5 font-mono text-[11px] text-muted">
            Unidad {sprint.unidad} · Ticket {index + 1}/{total}
          </span>
          <span className="rounded-sm bg-earth px-1.5 py-0.5 text-[11px] font-medium text-paper">{caso.subtema}</span>
        </div>
        <h1 className="mt-2 text-xl font-semibold text-balance text-paper">{caso.titulo}</h1>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-panel">
          <User className="size-4" aria-hidden="true" /> {caso.remitente}
        </p>
      </header>

      <div role="tablist" aria-label="Documentos del expediente" className="scroll-pane mt-3 flex gap-1 overflow-x-auto" onKeyDown={onKeyDown}>
        {tabs.map(({ label, icon: Icon }, i) => {
          const active = tab === i;
          return (
            <button
              key={i}
              id={`${baseId}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${baseId}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => setTab(i)}
              className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-t-md border border-b-0 px-3 py-2 text-xs font-medium transition-colors ${
                active
                  ? 'border-sage bg-paper text-app'
                  : 'border-olive-2 bg-panel text-app hover:bg-muted'
              }`}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span className={`max-w-[13rem] truncate ${i === 0 ? '' : 'font-mono'}`} title={label}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${tab}`}
        className="on-paper -mt-px rounded-b-md rounded-tr-md border border-sage bg-[color-mix(in_oklab,var(--surface-paper)_82%,var(--surface-panel))] p-3 text-app sm:p-4"
      >
        {tab === 0 ? (
          <Brief caso={caso} evidences={evidences} onOpen={setTab} />
        ) : (
          <EvidenceInspector key={tab} evidence={evidences[tab - 1]} />
        )}
      </div>
    </section>
  );
}

function Brief({ caso, evidences, onOpen }) {
  return (
    <article className="paper px-5 py-4">
      <p className="label-caps text-olive">Contexto del ticket</p>
      <p className="mt-2 text-[15px] leading-relaxed whitespace-pre-line">{caso.contexto}</p>

      {caso.pregunta && (
        <p className="mt-4 border-l-[3px] border-earth pl-3 text-sm font-semibold">{caso.pregunta}</p>
      )}

      {evidences.length > 0 && (
        <div className="mt-5 border-t border-sage pt-3">
          <p className="label-caps text-olive">Evidencia adjunta ({evidences.length})</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {evidences.map((ev, i) => {
              const Icon = EVIDENCE_ICONS[ev.tipo];
              return (
                <li key={i}>
                  <button type="button" className="btn-outline px-2.5 py-1.5 font-mono text-xs" onClick={() => onOpen(i + 1)}>
                    {Icon && <Icon className="size-4" aria-hidden="true" />}
                    {evidenceTitle(ev)}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <TicketGlossary caso={caso} />
    </article>
  );
}
