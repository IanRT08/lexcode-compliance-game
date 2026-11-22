import sprint1 from './cases/sprint1_etica.json';
import sprint2 from './cases/sprint2_datos_pi.json';
import sprint3 from './cases/sprint3_delitos.json';
import sprint4 from './cases/sprint4_aplicaciones.json';

// Metadatos de cada Sprint (1 Sprint = 1 Unidad de la asignatura).
export const SPRINTS = [
  {
    id: 1,
    unidad: 'I',
    titulo: 'El Código del Desarrollador',
    tema: 'Fundamentos de la Ética en TIC',
    escenario: 'Chat corporativo y revisión de Pull Requests',
    puntosRubrica: 15,
    casos: sprint1,
    briefing: {
      de: 'Mariana Ortega — Directora de Tecnología (CTO)',
      asunto: 'Bienvenida: tu primera semana en NovaByte',
      cuerpo:
        'NovaByte pasó de 12 a 140 personas en un año. Crecimos tan rápido que nadie se detiene a preguntar si lo que hacemos está bien. Por eso te contratamos: necesitamos a alguien que sepa decir «no» a tiempo y explicar por qué.\n\nEsta semana revisarás decisiones del equipo de desarrollo: liberaciones, chats, Pull Requests, filtros de contratación y campañas. No basta con que algo sea legal; queremos que sea correcto.',
      objetivos: [
        'Distinguir moral, valores, ética y normatividad.',
        'Aplicar los códigos de ética de ACM y ACM/IEEE-CS al desarrollo de software.',
        'Resolver dilemas de ciberacoso, plagio, discriminación y desinformación con modelos de decisión ética.',
      ],
    },
  },
  {
    id: 2,
    unidad: 'II',
    titulo: 'Bóveda de Datos y Autoría',
    tema: 'Datos Personales y Derecho de la Propiedad',
    escenario: 'Inspector de documentos y auditoría de repositorios',
    puntosRubrica: 20,
    casos: sprint2,
    briefing: {
      de: 'Jorge Paredes — Director General (CEO)',
      asunto: 'Trimestre 2: datos, transparencia y propiedad intelectual',
      cuerpo:
        'Buenas noticias: lanzamos NovaPay Lite y SaludYa, ganamos la licitación de la Ventanilla Ciudadana del municipio de Valle Esmeralda y el fondo Capital Norte quiere invertir.\n\nMalas noticias: todo eso implica datos personales, información pública y propiedad intelectual. Un error aquí cuesta multas, demandas o la inversión completa.',
      objetivos: [
        'Aplicar los Arts. 6, 7, 8 y 16 constitucionales a productos digitales.',
        'Cumplir la LFPDPPP 2025: avisos, consentimiento, datos sensibles y derechos ARCO.',
        'Distinguir derecho de autor (LFDA) de propiedad industrial (LFPPI) y auditar la titularidad del código.',
      ],
    },
  },
  {
    id: 3,
    unidad: 'III',
    titulo: 'Respuesta a Incidentes SOC',
    tema: 'Delitos Informáticos',
    escenario: 'Consola forense de ciberseguridad',
    puntosRubrica: 20,
    casos: sprint3,
    briefing: {
      de: 'Centro de Operaciones de Seguridad (SOC)',
      asunto: 'Trimestre 3: alerta máxima',
      cuerpo:
        'Los ataques contra empresas de pagos se multiplicaron. Esta semana el SOC escalará a tu escritorio incidentes reales: fraudes, ransomware, fugas internas, piratería y contenido ilícito en nuestras plataformas.\n\nTu tarea es clasificar cada incidente con rigor jurídico, aplicar las medidas de compliance correctas y no confundir una falta ética con un delito. También revisarás decisiones ambientales y de inteligencia artificial.',
      objetivos: [
        'Clasificar delitos informáticos con el Código Penal Federal y las leyes especiales, incluidas sus penas.',
        'Responder a incidentes preservando evidencia y protegiendo a las víctimas.',
        'Conocer la cooperación internacional (Convenio de Budapest), la responsabilidad ambiental y la regulación de la IA.',
      ],
    },
  },
  {
    id: 4,
    unidad: 'IV',
    titulo: 'Lanzamiento Disruptivo',
    tema: 'Aplicaciones de la Ética y la Legislación en TIC',
    escenario: 'Validador de dependencias, e-commerce e IA',
    puntosRubrica: 15,
    casos: sprint4,
    briefing: {
      de: 'Jorge Paredes — Director General (CEO)',
      asunto: 'Trimestre 4: el lanzamiento que define a NovaByte',
      cuerpo:
        'Cerramos el año con todo: NovaPay SDK 4.0, la tienda NovaShop, el microcrédito automático NovaCrédito, la nueva función de Barrio y una campaña de aniversario hecha con IA generativa.\n\nEs el trimestre más disruptivo y el más riesgoso. Quiero crecer, pero no a costa de nuestros clientes, de los autores de quienes dependemos ni de nuestra reputación.',
      objetivos: [
        'Resolver conflictos de licencias (Copyright frente a Copyleft) en dependencias reales.',
        'Proteger al consumidor en el comercio electrónico y evitar patrones oscuros.',
        'Aplicar la ética a la investigación en línea, al scraping, a las redes sociales y a la IA (sesgos, privacidad y derechos de autor).',
      ],
    },
  },
];

export const TOTAL_SPRINTS = SPRINTS.length;

export function getSprint(id) {
  return SPRINTS.find((s) => s.id === id) ?? SPRINTS[0];
}
