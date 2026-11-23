import { useMemo, useState } from 'react';
import { BookA } from 'lucide-react';
import { termsForCase } from '../../utils/glossary.js';

/**
 * Términos técnicos que aparecen en el ticket actual. Cada término es un botón que despliega
 * su definición en lenguaje sencillo.
 */
export default function TicketGlossary({ caso }) {
  const terms = useMemo(() => termsForCase(caso), [caso]);
  const [open, setOpen] = useState(null);
  if (terms.length === 0) return null;
  const active = terms.find((t) => t.termino === open);

  return (
    <section className="mt-5 border-t border-sage pt-3" aria-labelledby={`glossary-${caso.id}`}>
      <h3 id={`glossary-${caso.id}`} className="label-caps flex items-center gap-1.5 text-olive">
        <BookA className="size-4" aria-hidden="true" /> Glosario de este ticket ({terms.length})
      </h3>
      <p className="mt-1 text-xs text-olive">Toca un término para ver qué significa.</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {terms.map((t) => {
          const selected = open === t.termino;
          return (
            <li key={t.termino}>
              <button
                type="button"
                aria-expanded={selected}
                aria-controls={`glossary-def-${caso.id}`}
                onClick={() => setOpen(selected ? null : t.termino)}
                className={`cursor-pointer rounded-sm border px-2 py-1 font-mono text-[12px] transition-colors ${
                  selected ? 'border-olive bg-olive text-paper' : 'border-olive-2 text-app hover:bg-panel/50'
                }`}
              >
                {t.termino}
              </button>
            </li>
          );
        })}
      </ul>
      <div id={`glossary-def-${caso.id}`} aria-live="polite">
        {active && (
          <p className="mt-2 rounded-sm border-l-[3px] border-earth bg-panel/35 px-3 py-2 text-sm leading-relaxed">
            <strong>{active.termino}:</strong> {active.definicion}
          </p>
        )}
      </div>
    </section>
  );
}
