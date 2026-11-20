# Especificación Integral de Proyecto: *LexCode: Oficial de Cumplimiento*

> **Nota de contexto para el Asistente de Programación (Claude):** Este documento contiene el contexto académico, el temario completo de la asignatura, los criterios exactos de la rúbrica de evaluación, los requisitos de despliegue en **Vercel (plan gratuito)** y las reglas estrictas de **propiedad intelectual y atribución de recursos de terceros** para programar un juego didáctico web en **React (con Vite) usando JavaScript**. Todo el código generado debe apegarse estrictamente a estos requerimientos para alcanzar el nivel **Competente Estratégico (90–100 puntos)**.

---

## 1. Contexto Académico e Institucional

* **Institución:** Universidad Tecnológica Emiliano Zapata del Estado de Morelos (UTEZ) / Dirección General de Universidades Tecnológicas y Politécnicas (DGTYP).
* **Programa Educativo:** Ingeniería en Tecnologías de la Información e Innovación Digital (7.º Cuatrimestre).
* **Asignatura:** Ética y Legislación en Tecnologías de la Información (Clave: `E-ELTI-3`).
* **Docente Evaluador:** Mtra. Iris Nayeli Corona Aceves.
* **Fecha de Evaluación:** Diciembre 2026.
* **Propósito del Proyecto:** Desarrollar un videojuego educativo funcional, accesible vía web, que sintetice con rigor ético y jurídico las **4 unidades de la asignatura**, demostrando capacidad de ingeniería de software, diseño pedagógico (aprendizaje activo con retroalimentación inmediata) y congruencia normativa en el propio desarrollo.

---

## 2. Temario Oficial de la Asignatura (Unidades I a IV)

El juego debe cubrir de manera orgánica, profunda y contextualizada al marco jurídico mexicano e internacional los siguientes bloques temáticos:

### Unidad I: Fundamentos de la Ética en TIC (Ponderación: 15 pts)
* Distinción conceptual y práctica entre **moral, valores, ética y normatividad/legalidad**.
* **Ética en el desarrollo de software:** responsabilidad profesional del ingeniero en TI, calidad, transparencia y códigos de ética (ej. ACM/IEEE).
* **Dilemas éticos contemporáneos en TIC:**
  * Ciberacoso (*cyberbullying* y acoso laboral digital).
  * Plagio académico y profesional (apropiación indebida de código fuente y documentación).
  * Discriminación tecnológica y exclusión digital.
  * Desinformación, noticias falsas (*fake news*) y manipulación algorítmica.
* **Modelos de toma de decisiones éticas:** aplicación práctica (ej. enfoque utilitarista, deontológico, de justicia/derechos y virtud) ante escenarios reales con consecuencias medibles.

### Unidad II: Datos Personales y Derecho de la Propiedad (Ponderación: 20 pts)
* **Marco Constitucional Mexicano aplicable a las TIC:**
  * **Art. 6.º Constitucional:** Derecho de acceso a la información y transparencia.
  * **Art. 7.º Constitucional:** Libertad de expresión y difusión de ideas en entornos digitales.
  * **Art. 8.º Constitucional:** Derecho de petición (incluyendo medios electrónicos).
  * **Art. 16.º Constitucional:** Derecho a la privacidad, inviolabilidad de comunicaciones privadas y protección de datos personales (Derechos ARCO: Acceso, Rectificación, Cancelación y Oposición).
* **Protección de Datos Personales en México:**
  * **LFPDPPP** (Ley Federal de Protección de Datos Personales en Posesión de los Particulares): principios (licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad), Aviso de Privacidad (integral y simplificado), consentimiento tácito vs. consentimiento expreso y por escrito para **datos personales sensibles** (salud, biométricos, origen, creencias).
* **Derecho de la Propiedad Intelectual y Auditoría Legal de Código:**
  * **LFDA** (Ley Federal del Derecho de Autor): protección del software como obra literaria/programa de computación, derechos morales y patrimoniales, registro ante INDAUTOR.
  * **LFPPI** (Ley Federal de Protección a la Propiedad Industrial): distinción clara entre derechos de autor y figuras de propiedad industrial (patentes, modelos de utilidad, diseños industriales, marcas y secretos industriales).
  * **Revisión y auditoría legal de código:** detección de fragmentos sin licencia o infracciones de autoría en repositorios.

### Unidad III: Delitos Informáticos (Ponderación: 20 pts)
* **Clasificación técnico-jurídica y tipificación penal (Código Penal Federal - CPF y leyes especiales):**
  * **Delitos contra el patrimonio:** estafas informáticas, defraudación, *phishing*, *ransomware*, acceso ilícito a sistemas y equipos de informática (Arts. 211 bis 1 al 211 bis 7 del CPF), alteración o destrucción de información/daños a sistemas.
  * **Delitos contra la propiedad intelectual:** piratería de software, reproducción no autorizada con fines de lucro, elusión de medidas tecnológicas de protección.
  * **Uso de las TI como medio delictivo:** suplantación de identidad, fraude financiero electrónico, delitos contra la intimidad (Ley Olimpia).
* **Marcos normativos internacionales y prevención:**
  * **Convenio de Budapest** sobre la Ciberdelincuencia (cooperación internacional, tipificación homogénea y evidencia digital).
  * Estrategias de **cumplimiento normativo (*Compliance*)**, seguridad de la información y respuesta a incidentes.
* **Responsabilidad social, ambiental y regulación de Inteligencia Artificial:**
  * Impacto ambiental de las TIC: gestión de residuos electrónicos (*e-waste*), obsolescencia programada y huella energética de centros de datos.
  * Marcos regulatorios emergentes de IA (principios éticos de la UNESCO, enfoque basado en riesgos tipo *EU AI Act* y regulación nacional).

### Unidad IV: Aplicaciones de la Ética y la Legislación en TIC (Ponderación: 15 pts)
* **Ética en la investigación en línea:** consentimiento informado en entornos digitales, recolección ética de datos (*web scraping* responsable vs. extracción abusiva), anonimización.
* **Redes sociales:** moderación de contenidos, privacidad del usuario, responsabilidad de plataformas y difusión de desinformación.
* **Propiedad industrial y licenciamiento de software:**
  * Modelos de licenciamiento: **Copyright (propietario)** vs. **Copyleft (software libre / código abierto)**.
  * Compatibilidad e incompatibilidad de licencias en dependencias (`MIT`, `Apache 2.0`, `GNU GPLv3`, `CC-BY`).
* **Comercio electrónico y protección al consumidor:**
  * **LFPC** (Ley Federal de Protección al Consumidor, Art. 76 Bis): obligaciones de proveedores en transacciones electrónicas, términos y condiciones claros, seguridad en pagos, políticas de devolución y prevención de publicidad engañosa o patrones oscuros (*dark patterns*).
* **Dilemas éticos y legales de la Inteligencia Artificial:**
  * Sesgos algorítmicos y discriminación automatizada en procesos de selección, crédito o salud.
  * Privacidad en el entrenamiento de modelos y derechos de autor sobre obras generadas/entrenadas con IA.

---

## 3. Rúbrica Oficial de Evaluación (100 Puntos)

El proyecto debe diseñarse apuntando exclusivamente a la columna **Estratégico / Excelente (100% de cada rubro)**:

| Criterio | Pts | Requisito para Nivel Estratégico / Excelente (100%) | Penalizaciones / Qué Evitar |
| :--- | :---: | :--- | :--- |
| **1. Cobertura Unidad I:** Fundamentos de la Ética en TIC | **15** | Integra orgánicamente moral, valores, ética en desarrollo de software, dilemas éticos (ciberacoso, plagio, discriminación, desinformación) y modelos de toma de decisiones. Escenarios realistas con consecuencias claras. | Abordar solo conceptos generales sin conectarlos al desarrollo de software o confundir moral, ética y normatividad. |
| **2. Cobertura Unidad II:** Datos Personales y Propiedad | **20** | Mecánicas/retos sólidos sobre marco constitucional mexicano (Arts. 6, 7, 8, 16), derecho a la información, libertad de expresión, derecho de petición, privacidad, LFPDPPP, LFDA, LFPPI y revisión/auditoría de código. | Omitir derecho de petición o libertad de expresión, hacer preguntas aisladas sin contexto mexicano o confundir patentes con derechos de autor. |
| **3. Cobertura Unidad III:** Delitos Informáticos | **20** | Clasifica y ejemplifica con rigor técnico-jurídico delitos contra el patrimonio, propiedad intelectual, TI como medio delictivo, responsabilidad social/ambiental y regulación de IA, incluyendo penas y prevención nacional e internacional. | Limitarse a mencionar *phishing* o piratería sin detallar clasificación legal, sanciones o *compliance*, o confundir faltas éticas con delitos. |
| **4. Cobertura Unidad IV:** Aplicaciones Ética y Legislación | **15** | Casos prácticos complejos sobre investigación en línea, redes sociales, propiedad industrial y licenciamiento (Copyright/Copyleft), e-commerce/consumidor y dilemas de IA (sesgos, discriminación, privacidad). | Tocar solo uno o dos temas de forma anecdótica sin vincularlos a responsabilidad social y corporativa. |
| **5. Diseño Pedagógico y Gamificación** | **10** | Mecánicas (niveles, reglas, narrativa, decisiones) facilitan aprendizaje activo de los 4 bloques. **Cada acción incluye retroalimentación inmediata** explicando el fundamento ético o legal. | **CRÍTICO:** Hacer un cuestionario lineal o trivia simple sin narrativa ni interacción estratégica. |
| **6. Calidad Técnica, Funcionalidad y Usabilidad** | **10** | Producto estable, completo, libre de errores críticos. UI/UX intuitiva, reglas claras y acabado acorde a 7.º cuatrimestre de ingeniería. | Prototipos rotos, fallos visuales, bloqueos o interfaz confusa. |
| **7. Congruencia Ética y Legal del Propio Proyecto** | **10** | Predica con el ejemplo: incluye **Aviso de Privacidad propio** (si recaba datos), especifica **licenciamiento de su obra/código** y declara **derechos de autor y atribuciones** de todos los recursos de terceros (audios, imágenes, fuentes, librerías). | **CRÍTICO:** Usar recursos protegidos sin permiso ni atribución (plagio), omitir licencia del proyecto o pedir datos del jugador sin Aviso de Privacidad. |

**Escala de Desempeño:** `90–100 pts`: Competente Estratégico | `80–89 pts`: Competente Autónomo | `70–79 pts`: Competente Básico | `< 70 pts`: No Acreditado.

---

## 4. Diseño Conceptual y Mecánicas del Juego

Para evitar la penalización de "trivia simple", el juego se plantea como un **Simulador de Auditoría Corporativa y Toma de Decisiones en 2D basado en Interfaz de Usuario (UI)**, inspirado en tres juegos didácticos y de simulación reales:

1. ***Papers, Please*:** Escritorio virtual donde el jugador inspecciona documentos, contratos, cabeceras de código y solicitudes, contrastándolos contra un **Manual Jurídico** integrado para emitir un dictamen (*Aprobar*, *Rechazar/Bloquear* o *Escalar/Remediar*).
2. ***Orwell: Keeping an Eye on You*:** Investigación de hilos de correo, chats internos, registros (*logs*) y configuraciones de privacidad para detectar infracciones.
3. ***CyberCIEGE*:** Gestión simultánea de **3 indicadores vitales** de la empresa (`Presupuesto`, `Reputación Ética` y `Cumplimiento Legal`). Si cualquiera llega a `0`, ocurre un *Game Over* temático (quiebra financiera, crisis reputacional o clausura/sanción legal).

### Estructura por Niveles (4 Sprints = 4 Unidades)
* **Sprint 1 (Unidad I - El Código del Desarrollador):** Simulador de chat corporativo (Slack/Teams) y revisión de *Pull Requests*. El jugador resuelve dilemas de ciberacoso en el equipo, plagio de código, discriminación y desinformación eligiendo rutas basadas en modelos éticos.
* **Sprint 2 (Unidad II - Bóveda de Datos y Autoría):** Inspector de documentos y auditoría de repositorios. Revisión de Avisos de Privacidad (LFPDPPP, datos sensibles), solicitudes de acceso a la información / derechos ARCO / petición (Arts. 6°, 7°, 8°, 16° Const.) y auditoría de autoría de software (LFDA vs. LFPPI).
* **Sprint 3 (Unidad III - Respuesta a Incidentes SOC):** Consola forense de ciberseguridad. Clasificación legal de incidentes (*phishing*, fraude, acceso ilícito bajo el Código Penal Federal y Convenio de Budapest), aplicación de controles de *compliance*, gestión de residuos electrónicos (*e-waste*) y gobernanza de IA.
* **Sprint 4 (Unidad IV - Lanzamiento Disruptivo):** Validador de dependencias (`package.json`) para conflictos de licencias (**Copyright vs. Copyleft**, incompatibilidad GPL/MIT), auditoría de flujo de compra en e-commerce (LFPC Art. 76 Bis), ética en *web scraping* / redes sociales y mitigación de sesgos en modelos de IA.

---

## 5. Arquitectura Técnica y Despliegue en Vercel (Plan Gratuito)

Para garantizar máxima accesibilidad durante la evaluación (que cualquier docente o compañero pueda abrir un enlace público y jugar inmediatamente desde su navegador sin instalar nada), el proyecto debe cumplir con las siguientes especificaciones de arquitectura y despliegue:

### Requisitos Obligatorios para Vercel (Hobby / Free Tier)
1. **Stack Recomendado:** **React 18+ con Vite (JavaScript ES6+)** y **Tailwind CSS** (o CSS modular). Genera una Single Page Application (SPA) estática en la carpeta `dist/` que Vercel despliega gratuitamente en segundos con configuración automática (`Framework Preset: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
2. **Cero Backend y Cero Bases de Datos de Pago:** Toda la lógica del juego y la persistencia de avance operan **100% del lado del cliente (*Client-Side*)** mediante `localStorage`. No requiere variables de entorno secretas, servidores Node externos ni costos de hosting.
3. **Navegación por Estado (Sin Errores 404 en Vercel):** La transición entre pantallas (`Inicio -> Aviso de Privacidad -> Juego -> Resumen de Sprint -> Certificado Final`) debe manejarse mediante el estado global (`gameStatus` en `GameContext.jsx`) y **no** mediante rutas URL múltiples (`react-router`), evitando así errores `404: NOT_FOUND` al recargar la página en Vercel.
4. **Rutas de Archivos Estáticos Compatibles con Vite/Vercel:** Todos los recursos estáticos locales deben colocarse en `public/` y referenciarse con rutas relativas desde la raíz (ej. `/assets/badge.svg` o `/audio/stamp.mp3`), nunca con rutas absolutas del sistema operativo ni enlaces externos (*hotlinking*) que puedan caerse.
5. **Motor Data-Driven:** Toda la lógica del juego es agnóstica al contenido; los casos y el manual legal residen en archivos `.json` desacoplados dentro de `src/data/`.

### Estructura del Repositorio

```text
lexcode-compliance-game/
├── public/
│   ├── audio/                     # Solo audios CC0/CC-BY verificados (o usar Web Audio API)
│   └── assets/                    # SVGs propios e insignias con licencia documentada
├── src/
│   ├── data/
│   │   ├── cases/
│   │   │   ├── sprint1_etica.json
│   │   │   ├── sprint2_datos_pi.json
│   │   │   ├── sprint3_delitos.json
│   │   │   └── sprint4_aplicaciones.json
│   │   └── legalManual.json       # Base de consulta rápida de leyes y principios
│   ├── utils/
│   │   └── soundEffects.js        # Sintetizador Web Audio API (efectos libres de regalías)
│   ├── context/
│   │   └── GameContext.jsx        # Estado global (useReducer + localStorage)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopHUD.jsx         # Sprint actual, progreso y barras KPI (Presupuesto, Ética, Legal)
│   │   │   └── FooterLegal.jsx    # Enlaces permanentes a Aviso de Privacidad, Licencia y Créditos
│   │   ├── game/
│   │   │   ├── CaseWorkspace.jsx      # Contenedor principal del ticket activo
│   │   │   ├── EvidenceInspector.jsx  # Renderizador dinámico según tipo (código, correo, contrato, log)
│   │   │   ├── LegalManualDrawer.jsx  # Panel lateral con buscador en tiempo real sobre legalManual.json
│   │   │   └── VerdictModal.jsx       # Retroalimentación inmediata con fundamento ético/legal tras cada acción
│   │   └── compliance/
│   │       ├── PrivacyGateModal.jsx      # Pantalla inicial obligatoria con Aviso de Privacidad (Criterio 7)
│   │       ├── CreditsLicensesModal.jsx  # Tabla de atribuciones de terceros (audios, imágenes, fuentes, libs)
│   │       └── ComplianceCertificate.jsx # Certificado final imprimible (@media print) con desglose por unidad
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── LICENSE                        # Texto completo de licencia MIT o GNU GPLv3
└── README.md                      # Documentación, guía de despliegue en Vercel y tabla de atribuciones
```

### Esquema del Estado Global (`GameContext.jsx`)

```javascript
const initialState = {
  player: {
    name: "",
    privacyAccepted: false, // Obligatorio para iniciar (Criterio 7)
  },
  soundEnabled: true,       // Control de mute para accesibilidad
  currentSprint: 1,         // 1 a 4 (Unidades I a IV)
  currentCaseIndex: 0,
  metrics: {
    budget: 100,            // 0 a 100
    ethics: 100,            // 0 a 100
    legal: 100,             // 0 a 100
  },
  activeFeedback: null,     // Objeto con el dictamen del último caso resuelto
  decisionHistory: [],      // Registro de decisiones para estadísticas y certificado final
  gameStatus: "START",      // 'START' | 'PLAYING' | 'SPRINT_SUMMARY' | 'GAME_OVER' | 'VICTORY'
};
```

### Esquema JSON Estándar para los Casos (`src/data/cases/*.json`)

Cada archivo de Sprint debe exportar un arreglo de objetos con esta estructura exacta (incluyendo al menos **4 a 5 casos completos por unidad** para cubrir todos los subtemas de la rúbrica):

```json
[
  {
    "id": "U2_C01",
    "unidad": 2,
    "subtema": "Protección de Datos Personales Sensibles (LFPDPPP)",
    "titulo": "Despliegue de Módulo Biométrico y Clínico 'SaludYa'",
    "remitente": "Dra. Sofía Méndez — Líder de Producto",
    "contexto": "El equipo quiere lanzar hoy la actualización de la app médica. Para agilizar el registro, configuraron un checkbox premarcado que autoriza compartir historial clínico y huella digital con socios aseguradores.",
    "tipoDocumento": "codigo",
    "evidencia": {
      "nombreArchivo": "authController.js",
      "contenido": "const registerUser = async (req, res) => {\n  const { curp, clinicalHistory, fingerprintHash } = req.body;\n  // Consentimiento tácito por defecto para terceros\n  const shareWithInsurers = req.body.shareData ?? true;\n  await saveAndTransfer({ curp, clinicalHistory, fingerprintHash, shareWithInsurers });\n};",
      "pistaNormativa": "Verifica los requisitos de consentimiento para datos personales sensibles en la LFPDPPP."
    },
    "opciones": [
      {
        "id": "opt_1",
        "etiqueta": "Aprobar despliegue inmediato para cumplir fecha de entrega",
        "modeloEtico": "Utilitarismo comercial de corto plazo (incorrecto)",
        "impacto": { "budget": 10, "ethics": -30, "legal": -45 },
        "esCorrecta": false,
        "retroalimentacion": "Infracción grave a la LFPDPPP (Arts. 8 y 9) y al Art. 16 Constitucional. El historial clínico y los datos biométricos son Datos Personales Sensibles que requieren consentimiento expreso y por escrito del titular, nunca tácito ni premarcado."
      },
      {
        "id": "opt_2",
        "etiqueta": "Bloquear pase a producción y exigir consentimiento expreso separado",
        "modeloEtico": "Ética deontológica y cumplimiento normativo",
        "impacto": { "budget": -5, "ethics": 20, "legal": 30 },
        "esCorrecta": true,
        "retroalimentacion": "Decisión estratégica correcta. Conforme al Art. 9 de la LFPDPPP, el tratamiento y transferencia de datos sensibles exige consentimiento expreso y por escrito, además de especificar las finalidades en el Aviso de Privacidad Integral."
      },
      {
        "id": "opt_3",
        "etiqueta": "Aprobar solo si se oculta la transferencia en los Términos y Condiciones",
        "modeloEtico": "Falta al principio de lealtad e información",
        "impacto": { "budget": 5, "ethics": -35, "legal": -40 },
        "esCorrecta": false,
        "retroalimentacion": "Viola los principios de licitud, información y lealtad establecidos en el Art. 6 y 7 de la LFPDPPP. Ocultar transferencias de datos invalida el consentimiento y conlleva multas severas."
      }
    ]
  }
]
```

---

## 6. Requerimientos de Congruencia Ética, Legal y Uso de Recursos de Terceros (Criterio 7 - 10 pts)

La rúbrica establece que el proyecto será reprobado o penalizado si *"utiliza recursos protegidos sin permiso ni atribución (plagio) o recaba datos del usuario sin consentimiento ni aviso de privacidad"*. Por ello, el código debe implementar estrictamente estas políticas:

### A. Política Estricta sobre Materiales de Terceros (Audios, Imágenes, Tipografías y Código)
1. **Prohibición de Plagio y Hotlinking:** Está **estrictamente prohibido** usar URLs externas de imágenes, GIFs, logos o audios protegidos por derechos de autor (ej. resultados genéricos de Google Images, sprites de videojuegos comerciales o música comercial).
2. **Estrategia de Recursos Libres de Riesgo (Cero Infracciones):**
   * **Imágenes, Logos e Iconos:** Usar exclusivamente **SVGs creados por código propio** (insignias, sellos de *APROBADO / RECHAZADO*, avatar del oficial) y la librería de iconos `lucide-react` (Licencia **ISC**). Si el equipo agrega imágenes externas, deben provenir únicamente de repositorios con licencia **CC0 (Dominio Público)** o **CC-BY** (ej. *Kenney.nl* o *Wikimedia Commons*) y guardarse en `public/assets/`.
   * **Audios y Efectos de Sonido:** Para evitar archivos rotos o infracciones de copyright, implementar `src/utils/soundEffects.js` utilizando la **Web Audio API** nativa del navegador para sintetizar sonidos limpios de interfaz (clic de teclado, timbre de ticket nuevo, sonido de sello de aprobación, alerta de infracción). Si se añaden archivos `.mp3`/`.ogg` externos, deben ser exclusivamente **CC0 / CC-BY** (ej. *Freesound.org*), almacenados en `public/audio/` y declarados con su autor y enlace.
   * **Tipografías:** Usar fuentes con licencia **SIL Open Font License 1.1 (OFL)** instaladas localmente mediante `@fontsource/inter` y `@fontsource/jetbrains-mono` (evitando dependencias externas innecesarias y documentando su licencia).
   * **Librerías de Software:** Documentar explícitamente todas las dependencias del `package.json` (`react`, `react-dom`, `vite`, `lucide-react`, `@fontsource/*`) con su autor y licencia (MIT / ISC / SIL OFL).

### B. Componentes Legales Obligatorios en la Interfaz
1. **`PrivacyGateModal.jsx` (Aviso de Privacidad Propio):** Antes de ingresar el nombre/alias del jugador o iniciar partida, mostrar un **Aviso de Privacidad Simplificado** con botón para leer el **Aviso de Privacidad Integral** completo (indicando identidad del equipo responsable, finalidades exclusivamente académicas, almacenamiento 100% local en `localStorage` sin transferencia a servidores externos, y mecanismo para ejercer derechos ARCO/revocación borrando los datos del navegador).
2. **`FooterLegal.jsx` + Archivo `LICENSE`:** Pie de página visible en todo momento con acceso directo a:
   * **Licencia del Proyecto:** Declaración explícita de la licencia elegida para el código del equipo (ej. **Licencia MIT** o **GNU GPLv3**) + archivo `LICENSE` en la raíz del repositorio.
   * **Aviso de Privacidad:** Reapertura del Aviso Integral y botón de *"Eliminar mis datos locales"*.
   * **Créditos y Propiedad Intelectual:** Abre `CreditsLicensesModal.jsx`.
3. **`CreditsLicensesModal.jsx` (Matriz Oficial de Atribuciones):** Modal con una tabla estructurada que lista **cada recurso de terceros utilizado** (categoría: *Librería / Tipografía / Iconografía / Audio / Imagen*, nombre del recurso, autor/organización, tipo de licencia y URL de referencia). Esta misma tabla debe replicarse en el `README.md`.

---

## 7. Instrucciones de Trabajo para el Asistente de Programación

Cuando te pida generar el código de este proyecto:
1. **Garantiza compatibilidad total con Vercel (plan gratuito):** Genera un proyecto **React + Vite (JavaScript)** limpio que compile sin errores ni advertencias críticas con `npm install && npm run build`, sin requerir backend ni variables de entorno.
2. **No simplifiques el contenido académico:** Genera casos completos, realistas y jurídicamente precisos en español, citando artículos reales de la Constitución Política de los Estados Unidos Mexicanos, LFPDPPP, LFDA, LFPPI, Código Penal Federal, LFPC y Convenio de Budapest.
3. **Asegura la retroalimentación pedagógica:** En `VerdictModal.jsx`, muestra siempre el porqué ético y el fundamento legal exacto tanto si el jugador acierta como si se equivoca.
4. **Cumple al 100% con el Criterio 7:** Implementa los efectos de sonido mediante **Web Audio API** (`soundEffects.js`) e iconos mediante `lucide-react` + **SVGs propios**, dejando lista y prellenada la tabla de atribuciones en `CreditsLicensesModal.jsx` y el `README.md` con instrucciones claras para subir el repositorio a GitHub y desplegarlo en **Vercel** con un clic.