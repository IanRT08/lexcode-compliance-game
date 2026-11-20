import { ETHICAL_FRAMEWORKS } from '../data/taxonomy.js';

/** Estadísticas de un conjunto de decisiones (un Sprint o la partida completa). */
export function summarize(history) {
  const total = history.length;
  const correct = history.filter((h) => h.esCorrecta).length;
  const hints = history.filter((h) => h.usedHint).length;
  const frameworks = {};
  for (const h of history) {
    if (h.marcoEtico) frameworks[h.marcoEtico] = (frameworks[h.marcoEtico] ?? 0) + 1;
  }
  const profile = Object.entries(frameworks)
    .map(([key, count]) => ({ key, label: ETHICAL_FRAMEWORKS[key]?.label ?? key, count }))
    .sort((a, b) => b.count - a.count);
  return { total, correct, hints, accuracy: total ? Math.round((correct / total) * 100) : 0, profile };
}

export function sprintHistory(history, sprintId) {
  return history.filter((h) => h.sprint === sprintId);
}
