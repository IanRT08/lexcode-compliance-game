import { useId, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { GLOSSARY } from '../../utils/glossary.js';
import { normalize } from '../../utils/text.js';

const CATEGORIES = [...new Set(GLOSSARY.map((t) => t.categoria))];

/** Glosario completo con buscador, agrupado por categoría (pestaña de la mesa de dictamen). */
export default function GlossaryPanel() {
  const [query, setQuery] = useState('');
  const inputId = useId();

  const groups = useMemo(() => {
    const q = normalize(query.trim());
    const match = (t) => !q || normalize(`${t.termino} ${t.alias.join(' ')} ${t.definicion}`).includes(q);
    return CATEGORIES.map((cat) => ({ cat, terms: GLOSSARY.filter((t) => t.categoria === cat && match(t)) })).filter(
      (g) => g.terms.length > 0,
    );
  }, [query]);

  const count = groups.reduce((n, g) => n + g.terms.length, 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <label htmlFor={inputId} className="sr-only">
          Buscar en el glosario
        </label>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-olive-2" aria-hidden="true" />
        <input
          id={inputId}
          type="text"
          role="searchbox"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar: SDK, ransomware, scraping..."
          className="w-full rounded border-[1.5px] border-olive-2 bg-paper py-2 pr-9 pl-9 text-sm text-app placeholder:text-olive-2 focus:border-olive focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="btn-ghost absolute top-1/2 right-1 -translate-y-1/2 p-1 text-app"
            aria-label="Limpiar búsqueda"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
      <p className="font-mono text-[11px] text-panel" aria-live="polite">
        {count} {count === 1 ? 'término' : 'términos'} · Palabras técnicas explicadas en lenguaje sencillo
      </p>

      {count === 0 ? (
        <p className="paper p-4 text-sm">Sin resultados. Prueba con otra palabra.</p>
      ) : (
        groups.map(({ cat, terms }) => (
          <section key={cat} aria-label={cat}>
            <h3 className="label-caps mb-1.5 text-muted">{cat}</h3>
            <dl className="paper divide-y divide-sage/50">
              {terms.map((t) => (
                <div key={t.termino} className="px-3 py-2.5">
                  <dt className="text-sm font-semibold">{t.termino}</dt>
                  <dd className="mt-0.5 text-sm leading-relaxed">{t.definicion}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))
      )}
    </div>
  );
}
