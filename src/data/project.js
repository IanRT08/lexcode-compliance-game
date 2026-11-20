// Fuente única de verdad para datos institucionales, licencias y atribuciones.
// La tabla THIRD_PARTY se replica manualmente en README.md (mantenerlas sincronizadas).

export const PROJECT = {
  name: 'LexCode: Oficial de Cumplimiento',
  shortName: 'LexCode',
  version: '0.1.0',
  year: 2026,
  repoUrl: 'https://github.com/IanRT08/lexcode-compliance-game',
  institution: 'Universidad Tecnológica Emiliano Zapata del Estado de Morelos (UTEZ)',
  program: 'Ingeniería en Tecnologías de la Información e Innovación Digital — 7.º cuatrimestre',
  course: 'Ética y Legislación en Tecnologías de la Información (E-ELTI-3)',
  teacher: 'Mtra. Iris Nayeli Corona Aceves',
  privacyNoticeUpdated: '19 de noviembre de 2026',
};

export const TEAM = [
  { name: 'Ian Alejandro Rivera Torres', role: 'Líder de proyecto' },
  { name: 'Valentino Amador Gonzáles Adames', role: 'Integrante' },
  { name: 'Edgar Adrian Gonzalez Guadarrama', role: 'Integrante' },
  { name: 'Joed Soriano Ocampo', role: 'Integrante' },
  { name: 'Brittany Itzel Sánchez Mora', role: 'Integrante' },
];

// Licenciamiento de la obra propia (Criterio 7).
export const OWN_LICENSES = {
  code: {
    id: 'GPL-3.0-or-later',
    name: 'GNU General Public License v3.0 o posterior',
    url: 'https://www.gnu.org/licenses/gpl-3.0.html',
  },
  content: {
    id: 'CC-BY-SA-4.0',
    name: 'Creative Commons Atribución-CompartirIgual 4.0 Internacional',
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.es',
  },
};

// Recursos creados por el equipo (no son de terceros, pero se declaran por transparencia).
export const OWN_ASSETS = [
  {
    category: 'Imagen',
    resource: 'Logotipo, insignias, sellos y favicon (SVG)',
    detail: 'Diseñados en código por el Equipo LexCode.',
    license: 'GPL-3.0-or-later',
  },
  {
    category: 'Audio',
    resource: 'Efectos de sonido de interfaz',
    detail: 'Sintetizados en tiempo real con la Web Audio API del navegador; no se usan archivos de audio.',
    license: 'GPL-3.0-or-later',
  },
  {
    category: 'Contenido',
    resource: 'Casos, narrativa y Manual Jurídico del juego',
    detail: 'Redacción original del equipo con fines académicos.',
    license: 'CC-BY-SA-4.0',
  },
];

// Matriz oficial de atribuciones de terceros (Criterio 7).
export const THIRD_PARTY = [
  {
    category: 'Librería',
    resource: 'React y React DOM 18',
    author: 'Meta Platforms, Inc. y afiliadas',
    license: 'MIT',
    url: 'https://github.com/facebook/react',
  },
  {
    category: 'Librería',
    resource: 'Vite',
    author: 'VoidZero Inc. y colaboradores de Vite',
    license: 'MIT',
    url: 'https://github.com/vitejs/vite',
  },
  {
    category: 'Librería',
    resource: '@vitejs/plugin-react',
    author: 'Evan You y colaboradores de Vite',
    license: 'MIT',
    url: 'https://github.com/vitejs/vite-plugin-react',
  },
  {
    category: 'Librería',
    resource: 'Tailwind CSS y @tailwindcss/vite',
    author: 'Tailwind Labs, Inc.',
    license: 'MIT',
    url: 'https://github.com/tailwindlabs/tailwindcss',
  },
  {
    category: 'Iconografía',
    resource: 'Lucide (lucide-react)',
    author: 'Lucide Icons y colaboradores',
    license: 'ISC',
    url: 'https://github.com/lucide-icons/lucide',
  },
  {
    category: 'Tipografía',
    resource: 'Inter (vía @fontsource/inter)',
    author: 'The Inter Project Authors (Rasmus Andersson)',
    license: 'SIL OFL 1.1',
    url: 'https://github.com/rsms/inter',
  },
  {
    category: 'Tipografía',
    resource: 'JetBrains Mono (vía @fontsource/jetbrains-mono)',
    author: 'The JetBrains Mono Project Authors',
    license: 'SIL OFL 1.1',
    url: 'https://github.com/JetBrains/JetBrainsMono',
  },
];
