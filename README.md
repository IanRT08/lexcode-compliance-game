# LexCode: Oficial de Cumplimiento

**Jugar en línea:** [https://lexcode-compliance-game.vercel.app/](https://lexcode-compliance-game.vercel.app/)

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
| 4 | IV | Lanzamiento Disruptivo | Licenciamiento Copyright/Copyleft, LFPC Art. 76 Bis y patrones oscuros, investigación en línea, scraping, redes sociales, sesgos de IA e IA generativa |

## Tecnología

- **React 18 + Vite** (JavaScript) y **Tailwind CSS 4**.
- Página única estática (SPA). La navegación se hace por estado global (`gameStatus`), sin rutas URL, así que no hay errores 404 al recargar.
- **Sin backend ni base de datos.** El avance se guarda solo en el `localStorage` del navegador, y únicamente después de aceptar el Aviso de Privacidad.
- Motor basado en datos: los casos viven en `src/data/cases/*.json` y el Manual Jurídico en `src/data/legalManual.json`.
- Efectos de sonido sintetizados con la **Web Audio API** (sin archivos de audio de terceros).
- Interfaz tipo estación de trabajo: HUD fijo, expediente con pestañas a la izquierda, dictamen y Manual Jurídico a la derecha. Paleta institucional de 10 tonos definida como variables CSS en `src/styles/globals.css`.

## Cómo se juega

1. Cada ticket llega con un **expediente**: contexto y evidencias (correos, chats, código, diffs, bitácoras, contratos, configuraciones).
2. El **Manual Jurídico** se consulta sin costo; la **pista normativa** del despacho externo cuesta presupuesto.
   Un **glosario** de 60 términos técnicos (SDK, Pull Request, ransomware, scraping, UMA…) explica en lenguaje sencillo las palabras de cada ticket y tiene buscador propio.
3. Se sella un **dictamen** (Aprobar, Bloquear, Remediar o Escalar). Cada dictamen muestra de inmediato el fundamento ético y legal, el modelo ético aplicado, el dictamen recomendado si fallaste y el aprendizaje clave.
4. Si **Presupuesto**, **Reputación Ética** o **Cumplimiento Legal** llegan a 0, la partida termina con un final temático. Al cerrar cada Sprint se muestra el perfil de decisión ética del jugador.
5. Cada Sprint abre con un correo de briefing (narrativa y objetivos de aprendizaje).
6. Al completar los 4 Sprints (26 casos) se genera un **reconocimiento simbólico imprimible** con el desglose por unidad. Es solo un premio del juego: **no tiene validez legal, oficial ni académica**, no incluye logotipos institucionales y el juego lo advierte antes de descargarlo y dentro del propio documento.

## Fuentes normativas oficiales

El contenido jurídico se verificó en noviembre de 2026 contra los textos vigentes publicados por fuentes oficiales. Cada entrada del Manual Jurídico del juego enlaza a su fuente.

| Norma | Fuente oficial | Última reforma consultada |
| :--- | :--- | :--- |
| Constitución Política de los Estados Unidos Mexicanos | [Cámara de Diputados](https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf) | DOF 07/10/2026 |
| Ley Federal de Protección de Datos Personales en Posesión de los Particulares | [Cámara de Diputados](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf) | DOF 14/11/2025 (ley de 20/03/2025) |
| Ley Federal del Derecho de Autor | [Cámara de Diputados](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFDA.pdf) | DOF 14/05/2026 |
| Ley Federal de Protección a la Propiedad Industrial | [Cámara de Diputados](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPPI.pdf) | DOF 03/04/2026 |
| Código Penal Federal | [Cámara de Diputados](https://www.diputados.gob.mx/LeyesBiblio/pdf/CPF.pdf) | DOF 13/03/2026 |
| Ley General en materia de Extorsión | [Cámara de Diputados](https://www.diputados.gob.mx/LeyesBiblio/pdf/LGPISDME.pdf) | DOF 28/11/2025 |
| Ley Federal de Protección al Consumidor | [Cámara de Diputados](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPC.pdf) | DOF 12/12/2025 |
| Ley Federal del Trabajo | [Cámara de Diputados](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf) | DOF 14/05/2026 |
| Ley Federal para Prevenir y Eliminar la Discriminación | [Cámara de Diputados](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPED.pdf) | DOF 14/11/2025 |
| Ley General para la Prevención y Gestión Integral de los Residuos | [Cámara de Diputados](https://www.diputados.gob.mx/LeyesBiblio/pdf/LGPGIR.pdf) | DOF 19/01/2026 |
| NOM-035-STPS-2018 (vigente) | [Diario Oficial de la Federación](https://dof.gob.mx/nota_detalle.php?codigo=5541828&fecha=23/10/2018) | Publicación original |
| Amparo Directo 6/2025 (IA y derecho de autor) | [SCJN](https://transparencia-ciudadana.scjn.gob.mx/resoluciones-relevantes-de-la-SCJN/derechos-digitales/ad-6-2025) | 2025 |
| Reglamento (UE) 2024/1689 (AI Act) y Reglamento (UE) 2026/1744 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689) · [EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026R1744) | 08/07/2026 |
| Convenio de Budapest | [Consejo de Europa](https://rm.coe.int/cyber-buda-benefits-1-julio-2026-es/48802c5c23) | Julio de 2026 |
| Recomendación sobre la Ética de la IA | [UNESCO](https://www.unesco.org/es/artificial-intelligence/recommendation-ethics) | Vigente |
| Compatibilidad de licencias | [FSF](https://www.gnu.org/licenses/license-list.html) · [Apache](https://www.apache.org/licenses/GPL-compatibility.html) · [Creative Commons](https://creativecommons.org/share-your-work/licensing-considerations/compatible-licenses/) | 2026 |

> Algunos instrumentos se adoptaron hace más de cuatro años (Convenio de Budapest, NOM-035, Recomendación de la UNESCO, GPLv3), pero son los vigentes y se citan desde su fuente oficial actual.

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

## Términos de uso

El juego incluye Términos de uso (pie de página y paso inicial): es un recurso educativo gratuito que no constituye asesoría legal, todo su contenido es ficticio, el reconocimiento final no tiene validez oficial y el software se ofrece sin garantía conforme a la GPLv3.

## Privacidad

El juego solo pide un **alias** (recomendamos no usar el nombre real), después de mostrar un Aviso de Privacidad Simplificado y otro Integral y de obtener consentimiento expreso. El alias y el avance se guardan únicamente en el navegador del jugador. No hay servidores propios, cookies, analítica ni transferencias a terceros. El botón **«Eliminar mis datos locales»** del pie de página permite ejercer en cualquier momento los derechos ARCO y revocar el consentimiento.

## Créditos y atribuciones de terceros

| Categoría | Recurso | Autor / organización | Licencia | Referencia |
| :--- | :--- | :--- | :--- | :--- |
| Librería | React, React DOM 18 y scheduler | Meta Platforms, Inc. y afiliadas | MIT | https://github.com/facebook/react |
| Librería | Vite | VoidZero Inc. y colaboradores de Vite | MIT | https://github.com/vitejs/vite |
| Librería | @vitejs/plugin-react | Evan You y colaboradores de Vite | MIT | https://github.com/vitejs/vite-plugin-react |
| Librería | Tailwind CSS y @tailwindcss/vite | Tailwind Labs, Inc. | MIT | https://github.com/tailwindlabs/tailwindcss |
| Iconografía | Lucide (lucide-react) | Lucide Icons y colaboradores | ISC | https://github.com/lucide-icons/lucide |
| Iconografía | Iconos derivados de Feather (incluidos en Lucide) | Cole Bemis | MIT | https://github.com/feathericons/feather |
| Tipografía | Inter (vía @fontsource/inter) | The Inter Project Authors (Rasmus Andersson) | SIL OFL 1.1 | https://github.com/rsms/inter |
| Tipografía | JetBrains Mono (vía @fontsource/jetbrains-mono) | The JetBrains Mono Project Authors | SIL OFL 1.1 | https://github.com/JetBrains/JetBrainsMono |

El texto completo de cada licencia de terceros, con sus avisos de copyright, se publica con el sitio en [THIRD_PARTY_LICENSES.txt](https://lexcode-compliance-game.vercel.app/THIRD_PARTY_LICENSES.txt). Lo genera `scripts/generate-licenses.mjs` antes de cada compilación (`prebuild`), así que siempre corresponde a las versiones instaladas.

### Marcas institucionales (excluidas de las licencias del proyecto)

| Categoría | Recurso | Archivo | Titular | Licencia | Uso |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Imagen (marca) | Logotipo de la UTEZ | `public/assets/institucional/utez-logo.png` | Universidad Tecnológica Emiliano Zapata del Estado de Morelos | Todos los derechos reservados | Proporcionado por la UTEZ al equipo para trabajos académicos; identificación institucional, sin modificaciones ni fines comerciales |
| Imagen (marca) | Logotipo de la División Académica de Tecnologías de la Información y Diseño | `public/assets/institucional/datid-logo.png` | Universidad Tecnológica Emiliano Zapata del Estado de Morelos | Todos los derechos reservados | Proporcionado por la UTEZ al equipo para trabajos académicos; identificación de la división, sin modificaciones |

Los logotipos son signos distintivos de la UTEZ, protegidos en materia de propiedad industrial (LFPPI). La universidad los proporcionó al Equipo LexCode para este trabajo académico. **No** están cubiertos por la GPLv3 ni por la CC BY-SA 4.0 de LexCode: esa autorización es para el equipo, así que si redistribuyes el proyecto sin autorización propia de la universidad, retíralos.

### Recursos propios

| Categoría | Recurso | Detalle | Licencia |
| :--- | :--- | :--- | :--- |
| Imagen | Logotipo, insignias, sellos y favicon (SVG) | Diseñados en código por el equipo | GPL-3.0-or-later |
| Audio | Efectos de sonido de interfaz | Sintetizados con la Web Audio API; no se usan archivos de audio | GPL-3.0-or-later |
| Contenido | Casos, narrativa y Manual Jurídico | Redacción original del equipo | CC BY-SA 4.0 |

### Notas de propiedad intelectual

- No se enlazan imágenes, audios ni fuentes desde sitios externos (*hotlinking*): todo se distribuye con el proyecto y con licencia verificada.
- Los textos legislativos citados no son objeto de protección por derecho de autor (Art. 14, fracción VIII, LFDA). Los casos que los aplican son redacción original.
- Los principios del Código de Ética de la ACM y del Código de Ética de Ingeniería de Software ACM/IEEE-CS se citan de forma breve y parafraseada, con fines educativos y referencia a su fuente.
- La mecánica de «inspector de documentos» con indicadores se inspira en el género de simuladores de toma de decisiones. Las ideas y mecánicas no son objeto de protección por derecho de autor (Art. 14, fracción I, LFDA). LexCode no usa nombres, arte, música ni otros recursos de juegos existentes.
- Personas y empresas de los casos son ficticias.

> **Aviso:** LexCode es un recurso educativo y no constituye asesoría legal.
