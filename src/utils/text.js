/** Minúsculas sin acentos ni diéresis, para búsquedas tolerantes ("petición" = "peticion"). */
export function normalize(text = '') {
  return String(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

/** Iniciales para avatares de chat ("Óscar Treviño" → "OT"). */
export function initials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}
