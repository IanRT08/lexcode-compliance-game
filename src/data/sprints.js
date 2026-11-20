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
  },
  {
    id: 2,
    unidad: 'II',
    titulo: 'Bóveda de Datos y Autoría',
    tema: 'Datos Personales y Derecho de la Propiedad',
    escenario: 'Inspector de documentos y auditoría de repositorios',
    puntosRubrica: 20,
    casos: sprint2,
  },
  {
    id: 3,
    unidad: 'III',
    titulo: 'Respuesta a Incidentes SOC',
    tema: 'Delitos Informáticos',
    escenario: 'Consola forense de ciberseguridad',
    puntosRubrica: 20,
    casos: sprint3,
  },
  {
    id: 4,
    unidad: 'IV',
    titulo: 'Lanzamiento Disruptivo',
    tema: 'Aplicaciones de la Ética y la Legislación en TIC',
    escenario: 'Validador de dependencias, e-commerce e IA',
    puntosRubrica: 15,
    casos: sprint4,
  },
];

export const TOTAL_SPRINTS = SPRINTS.length;

export function getSprint(id) {
  return SPRINTS.find((s) => s.id === id) ?? SPRINTS[0];
}
