// Genera public/THIRD_PARTY_LICENSES.txt con el texto completo de las licencias de todo el
// código y las tipografías de terceros que se incluyen en el sitio publicado.
// Se ejecuta automáticamente antes de cada build ("prebuild" en package.json).
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Paquetes cuyo código o archivos terminan dentro de dist/ (verificado con el build).
const BUNDLED = [
  { pkg: 'react', uso: 'Biblioteca de interfaz (incluida en el JavaScript publicado)' },
  { pkg: 'react-dom', uso: 'Renderizado en el navegador (incluido en el JavaScript publicado)' },
  { pkg: 'scheduler', uso: 'Dependencia interna de react-dom (incluida en el JavaScript publicado)' },
  { pkg: 'lucide-react', uso: 'Iconografía SVG (incluye iconos derivados del proyecto Feather, MIT)' },
  { pkg: 'tailwindcss', uso: 'Hoja de estilos base generada por Tailwind CSS (incluida en el CSS publicado)' },
  { pkg: '@fontsource/inter', uso: 'Tipografía Inter (archivos .woff/.woff2 publicados)' },
  { pkg: '@fontsource/jetbrains-mono', uso: 'Tipografía JetBrains Mono (archivos .woff/.woff2 publicados)' },
];

function licenseText(dir) {
  const file = fs.readdirSync(dir).find((f) => /^licen[cs]e/i.test(f));
  if (!file) throw new Error(`Sin archivo de licencia en ${dir}`);
  return fs.readFileSync(path.join(dir, file), 'utf8').trim();
}

const sections = BUNDLED.map(({ pkg, uso }) => {
  const pkgJson = require.resolve(`${pkg}/package.json`, { paths: [root] });
  const meta = JSON.parse(fs.readFileSync(pkgJson, 'utf8'));
  return [
    '='.repeat(78),
    `${meta.name} ${meta.version} — Licencia: ${meta.license}`,
    `Uso en LexCode: ${uso}`,
    meta.homepage ? `Sitio: ${meta.homepage}` : null,
    '='.repeat(78),
    '',
    licenseText(path.dirname(pkgJson)),
    '',
  ]
    .filter((l) => l !== null)
    .join('\n');
});

const header = `LexCode: Oficial de Cumplimiento — Licencias de terceros
Generado automáticamente el ${new Date().toISOString().slice(0, 10)} a partir de los paquetes instalados.

El código propio de LexCode se distribuye bajo GNU GPL v3.0 o posterior (ver LICENSE en el
repositorio: https://github.com/IanRT08/lexcode-compliance-game) y su contenido didáctico bajo
CC BY-SA 4.0. Los componentes de terceros incluidos en este sitio conservan sus propias licencias,
cuyo texto completo se reproduce a continuación tal como lo exigen.

Los logotipos de la UTEZ y de la DATID son marcas de la universidad, proporcionadas al equipo para
uso académico; no están cubiertos por ninguna de estas licencias.
Los efectos de sonido se sintetizan con la Web Audio API (código propio, sin archivos de terceros).

`;

const out = path.join(root, 'public', 'THIRD_PARTY_LICENSES.txt');
fs.writeFileSync(out, header + sections.join('\n'));
console.log(`Licencias de terceros: ${BUNDLED.length} paquetes -> ${path.relative(root, out)}`);
