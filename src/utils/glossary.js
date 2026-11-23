import glossary from '../data/glossary.json';
import { normalize } from './text.js';

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Cada término se busca por sus alias como palabra completa (sin acentos ni mayúsculas).
const MATCHERS = glossary.map((entry) => ({
  entry,
  regex: new RegExp(`(^|[^a-z0-9])(${entry.alias.map((a) => escape(normalize(a))).join('|')})(?=[^a-z0-9]|$)`),
}));

/** Reúne todo el texto visible de un caso (contexto, evidencias y opciones). */
function caseText(caso) {
  const parts = [];
  const walk = (v) => {
    if (typeof v === 'string') parts.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk([caso.titulo, caso.remitente, caso.contexto, caso.pregunta, caso.evidencias ?? caso.evidencia]);
  walk(caso.opciones?.map((o) => o.etiqueta));
  return normalize(parts.join('\n'));
}

/** Términos del glosario que aparecen en un caso, en el orden del glosario. */
export function termsForCase(caso) {
  const text = caseText(caso);
  return MATCHERS.filter(({ regex }) => regex.test(text)).map(({ entry }) => entry);
}

export const GLOSSARY = glossary;
