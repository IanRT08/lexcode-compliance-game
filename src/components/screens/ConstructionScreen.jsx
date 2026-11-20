import { Hammer, RotateCcw } from 'lucide-react';
import { useGame } from '../../context/GameContext.jsx';
import { getSprint } from '../../data/sprints.js';

/** Aviso para Sprints cuyos casos todavía no se publican (desarrollo por etapas). */
export default function ConstructionScreen() {
  const { state, actions } = useGame();
  const sprint = getSprint(state.currentSprint);
  return (
    <div className="grid h-full place-items-center overflow-y-auto px-4 py-10">
      <div className="paper w-full max-w-xl p-8 text-center">
        <Hammer className="mx-auto size-[18px] text-earth" aria-hidden="true" />
        <p className="label-caps mt-3 text-earth">
          Sprint {sprint.id} · Unidad {sprint.unidad} · En construcción
        </p>
        <h1 className="mt-2 text-2xl font-bold">{sprint.titulo}</h1>
        <p className="mt-3 text-sm">
          Los casos de este Sprint se publicarán en la siguiente etapa del desarrollo. Tu avance se conserva en este
          navegador.
        </p>
        <button type="button" className="btn-outline mt-6" onClick={actions.restart}>
          <RotateCcw className="size-4" aria-hidden="true" /> Reiniciar partida
        </button>
      </div>
    </div>
  );
}
