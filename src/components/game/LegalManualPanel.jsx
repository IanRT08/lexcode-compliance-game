import { useMemo, useState } from 'react';
import { BookOpen, ExternalLink, Search, X } from 'lucide-react';
import manual from '../../data/legalManual.json';
import { normalize } from '../../utils/text.js';

const UNITS = [
  { value: 0, label: 'Todas' },
  { value: 1, label: 'U. I' },
  { value: 2, label: 'U. II' },
  { value: 3, label: 'U. III' },
  { value: 4, label: 'U. IV' },
];

function haystack(entry) {
  return normalize(
    [entry.titulo, entry.fuente, entry.categoria, entry.resumen, ...(entry.puntosClave ?? []), ...(entry.palabrasClave ?? [])].join(
      ' ',
    ),
  );
}

const INDEXED = manual.map((e) => ({ ...e, _search: haystack(e) }));

/**
 * Manual Jurídico de consulta rápida: buscador en tiempo real (sin acentos), filtro por
 * unidad y entradas relacionadas con el ticket activo al principio.
 */
export default function LegalManualPanel({ relatedIds = [] }) {
  const [query, setQuery] = useState('');
  const [unit, setUnit] = useState(0);

  const results = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    const related = new Set(relatedIds);
    return INDEXED.filter((e) => (unit === 0 || e.unidad === unit) && terms.every((t) => e._search.includes(t))).sort(
      (a, b) => Number(related.has(b.id)) - Number(related.has(a.id)),
    );
  }, [query, unit, relatedIds]);

  const related = new Set(relatedIds);

  return (
    <div className="flex min-h-0 flex-col gap-3">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-olive-2" aria-hidden="true" />
        <input
          type="text"
          role="searchbox"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar: consentimiento, Art. 16, plagio, ACM..."
          aria-label="Buscar en el Manual Jurídico"
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

      <div className="flex flex-wrap gap-1" role="group" aria-label="Filtrar por unidad">
        {UNITS.map((u) => (
          <button
            key={u.value}
            type="button"
            aria-pressed={unit === u.value}
            onClick={() => setUnit(u.value)}
            className={`cursor-pointer rounded-sm border px-2 py-1 font-mono text-[11px] font-semibold ${
              unit === u.value ? 'border-paper bg-paper text-app' : 'border-olive-2 text-panel hover:border-sage'
            }`}
          >
            {u.label}
          </button>
        ))}
        <span className="ml-auto self-center font-mono text-[11px] text-panel" aria-live="polite">
          {results.length} {results.length === 1 ? 'entrada' : 'entradas'}
        </span>
      </div>

      {results.length === 0 ? (
        <div className="paper flex items-center gap-2 p-4 text-sm">
          <BookOpen className="size-4 text-olive" aria-hidden="true" />
          {manual.length === 0
            ? 'El Manual Jurídico aún no tiene entradas.'
            : 'Sin resultados. Prueba con otra palabra o con el número de artículo.'}
        </div>
      ) : (
        <ul className="space-y-2">
          {results.map((e) => (
            <li key={e.id}>
              <details className="group paper" open={Boolean(query) && results.length <= 3}>
                <summary className="flex cursor-pointer list-none items-start gap-2 px-3 py-2.5 [&::-webkit-details-marker]:hidden">
                  <span className="mt-0.5 shrink-0 rounded-sm border border-olive-2 px-1 font-mono text-[10px] font-semibold text-olive">
                    U{e.unidad}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{e.titulo}</span>
                    <span className="block font-mono text-[11px] text-earth">{e.fuente}</span>
                  </span>
                  {related.has(e.id) && (
                    <span className="shrink-0 rounded-sm bg-earth px-1.5 py-0.5 text-[10px] font-semibold text-paper uppercase">
                      Ticket
                    </span>
                  )}
                </summary>
                <div className="border-t border-sage px-3 py-2.5 text-sm">
                  <p className="leading-relaxed">{e.resumen}</p>
                  {e.puntosClave?.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-olive-2">
                      {e.puntosClave.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  )}
                  <p className="label-caps mt-2 text-olive">{e.categoria}</p>
                  {e.fuentesOficiales?.length > 0 && (
                    <ul className="mt-2 space-y-1 border-t border-sage/60 pt-2" aria-label="Fuentes oficiales">
                      {e.fuentesOficiales.map((f) => (
                        <li key={f.url}>
                          <a
                            href={f.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-start gap-1.5 text-xs font-medium text-earth hover:underline"
                          >
                            <ExternalLink className="mt-px size-4 shrink-0" aria-hidden="true" />
                            {f.nombre}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
