# LexCode: Oficial de Cumplimiento

Simulador educativo de **auditoría ética y legal en Tecnologías de la Información**. El jugador es el Oficial de Cumplimiento de *NovaByte Solutions*, una startup mexicana ficticia: inspecciona código, contratos, chats y bitácoras, consulta un Manual Jurídico y emite dictámenes que afectan tres indicadores vitales de la empresa (**Presupuesto**, **Reputación Ética** y **Cumplimiento Legal**). Cada decisión recibe retroalimentación inmediata con su fundamento ético y legal.

Proyecto final de **Ética y Legislación en Tecnologías de la Información (E-ELTI-3)** — Ingeniería en Tecnologías de la Información e Innovación Digital, 7.º cuatrimestre, Universidad Tecnológica Emiliano Zapata del Estado de Morelos (UTEZ). Docente: Mtra. Iris Nayeli Corona Aceves.

## Equipo LexCode

| Integrante | Rol |
| :--- | :--- |
| Ian Alejandro Rivera Torres | Líder de proyecto |
| Valentino Amador Gonzáles Adames | Integrante |
| Edgar Adrian Gonzalez Guadarrama | Integrante |
| Joed Soriano Ocampo | Integrante |
| Brittany Itzel Sánchez Mora | Integrante |

## Estructura del juego

| Sprint | Unidad | Escenario | Temas |
| :---: | :---: | :--- | :--- |
| 1 | I | El Código del Desarrollador | Moral, valores, ética y normatividad; ética en el desarrollo de software; ciberacoso, plagio, discriminación y desinformación; modelos de decisión ética |
| 2 | II | Bóveda de Datos y Autoría | Arts. 6, 7, 8 y 16 constitucionales; LFPDPPP; LFDA vs. LFPPI; auditoría legal de código |
| 3 | III | Respuesta a Incidentes SOC | Delitos informáticos (CPF), Convenio de Budapest, *compliance*, *e-waste* y regulación de IA |
| 4 | IV | Lanzamiento Disruptivo | Licenciamiento Copyright/Copyleft, LFPC Art. 76 Bis, investigación en línea, redes sociales y sesgos de IA |

## Tecnología

- **React 18 + Vite** (JavaScript) y **Tailwind CSS 4**.
- Página única estática (SPA). La navegación se hace por estado global (`gameStatus`), sin rutas URL, así que no hay errores 404 al recargar.
- **Sin backend ni base de datos.** El avance se guarda solo en el `localStorage` del navegador, y únicamente después de aceptar el Aviso de Privacidad.
- Motor basado en datos: los casos viven en `src/data/cases/*.json` y el Manual Jurídico en `src/data/legalManual.json`.
- Efectos de sonido sintetizados con la **Web Audio API** (sin archivos de audio de terceros).

## Desarrollo local

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # compilación de producción en dist/
npm run preview   # vista previa de la compilación
```

## Despliegue en Vercel (plan gratuito)

1. Sube el repositorio a GitHub.
2. En [vercel.com](https://vercel.com), elige **Add New → Project** e importa el repositorio.
3. Vercel detecta la configuración automáticamente:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Pulsa **Deploy**. No se necesitan variables de entorno.

Cada `git push` a la rama `main` vuelve a desplegar el sitio automáticamente.

## Licencias de la obra propia

- **Código fuente:** [GNU GPL v3.0 o posterior](https://www.gnu.org/licenses/gpl-3.0.html) — ver [`LICENSE`](LICENSE).
- **Contenido didáctico** (casos, narrativa, Manual Jurídico y textos del juego): [Creative Commons Atribución-CompartirIgual 4.0 Internacional (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/deed.es).

Elegimos licencias *Copyleft* por congruencia con la Unidad IV: cualquier versión derivada debe seguir siendo libre y conservar la autoría.

© 2026 Equipo LexCode — UTEZ.

## Privacidad

El juego solo pide un **alias** (recomendamos no usar el nombre real), después de mostrar un Aviso de Privacidad Simplificado y otro Integral y de obtener consentimiento expreso. El alias y el avance se guardan únicamente en el navegador del jugador. No hay servidores propios, cookies, analítica ni transferencias a terceros. El botón **«Eliminar mis datos locales»** del pie de página permite ejercer en cualquier momento los derechos ARCO y revocar el consentimiento.

## Créditos y atribuciones de terceros

| Categoría | Recurso | Autor / organización | Licencia | Referencia |
| :--- | :--- | :--- | :--- | :--- |
| Librería | React y React DOM 18 | Meta Platforms, Inc. y afiliadas | MIT | https://github.com/facebook/react |
| Librería | Vite | VoidZero Inc. y colaboradores de Vite | MIT | https://github.com/vitejs/vite |
| Librería | @vitejs/plugin-react | Evan You y colaboradores de Vite | MIT | https://github.com/vitejs/vite-plugin-react |
| Librería | Tailwind CSS y @tailwindcss/vite | Tailwind Labs, Inc. | MIT | https://github.com/tailwindlabs/tailwindcss |
| Iconografía | Lucide (lucide-react) | Lucide Icons y colaboradores | ISC | https://github.com/lucide-icons/lucide |
| Tipografía | Inter (vía @fontsource/inter) | The Inter Project Authors (Rasmus Andersson) | SIL OFL 1.1 | https://github.com/rsms/inter |
| Tipografía | JetBrains Mono (vía @fontsource/jetbrains-mono) | The JetBrains Mono Project Authors | SIL OFL 1.1 | https://github.com/JetBrains/JetBrainsMono |

### Recursos propios

| Categoría | Recurso | Detalle | Licencia |
| :--- | :--- | :--- | :--- |
| Imagen | Logotipo, insignias, sellos y favicon (SVG) | Diseñados en código por el equipo | GPL-3.0-or-later |
| Audio | Efectos de sonido de interfaz | Sintetizados con la Web Audio API; no se usan archivos de audio | GPL-3.0-or-later |
| Contenido | Casos, narrativa y Manual Jurídico | Redacción original del equipo | CC BY-SA 4.0 |

### Notas de propiedad intelectual

- No se enlazan imágenes, audios ni fuentes desde sitios externos (*hotlinking*): todo se distribuye con el proyecto y con licencia verificada.
- Los textos legislativos citados no son objeto de protección por derecho de autor (Art. 14, fracción VIII, LFDA). Los casos que los aplican son redacción original.
- La mecánica de «inspector de documentos» con indicadores se inspira en el género de simuladores de toma de decisiones. Las ideas y mecánicas no son objeto de protección por derecho de autor (Art. 14, fracción I, LFDA). LexCode no usa nombres, arte, música ni otros recursos de juegos existentes.
- Personas y empresas de los casos son ficticias.

> **Aviso:** LexCode es un recurso educativo y no constituye asesoría legal.
