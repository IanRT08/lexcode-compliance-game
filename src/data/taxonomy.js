// Catálogos compartidos por el motor del juego (sin dependencias de UI).

/** Tipos de dictamen que puede emitir el Oficial de Cumplimiento. */
export const VERDICT_TYPES = {
  aprobar: { label: 'Aprobar', stamp: 'Aprobado', stampClass: 'stamp-aprobar' },
  bloquear: { label: 'Bloquear', stamp: 'Bloqueado', stampClass: 'stamp-bloquear' },
  remediar: { label: 'Remediar', stamp: 'Remediar', stampClass: 'stamp-remediar' },
  escalar: { label: 'Escalar', stamp: 'Escalado', stampClass: 'stamp-escalar' },
};

/** Modelos de toma de decisiones éticas (Unidad I). */
export const ETHICAL_FRAMEWORKS = {
  utilitarismo: {
    label: 'Utilitarismo',
    pregunta: '¿Qué opción produce el mayor bienestar para el mayor número de personas afectadas?',
  },
  deontologia: {
    label: 'Deontología',
    pregunta: '¿Qué deber, norma o principio debo cumplir, sin importar el resultado inmediato?',
  },
  justicia: {
    label: 'Justicia y derechos',
    pregunta: '¿Se respetan los derechos de todas las personas y se les trata con equidad?',
  },
  virtud: {
    label: 'Ética de la virtud',
    pregunta: '¿Qué haría una persona profesional íntegra, honesta y responsable?',
  },
  egoismo: {
    label: 'Egoísmo ético',
    pregunta: '¿Qué me conviene a mí o a la empresa a corto plazo? (enfoque que ignora a terceros)',
  },
  relativismo: {
    label: 'Relativismo moral',
    pregunta: '«Si todos lo hacen o no es para tanto, está bien». (enfoque que evita juzgar la conducta)',
  },
};

/** Tipos de evidencia que el inspector sabe renderizar. */
export const EVIDENCE_TYPES = ['codigo', 'diff', 'chat', 'correo', 'documento', 'log', 'json', 'formulario'];

/** Normaliza la evidencia de un caso: admite `evidencia` (objeto) o `evidencias` (arreglo). */
export function getEvidenceList(caso) {
  if (Array.isArray(caso.evidencias)) return caso.evidencias;
  if (caso.evidencia) return [{ tipo: caso.tipoDocumento, ...caso.evidencia }];
  return [];
}

/** Pista normativa del caso (nivel caso o, como respaldo, la de la primera evidencia). */
export function getCaseHint(caso) {
  return caso.pistaNormativa ?? getEvidenceList(caso).find((e) => e.pistaNormativa)?.pistaNormativa ?? null;
}
