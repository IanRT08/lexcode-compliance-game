import { useEffect } from 'react';
import CaseFile from './CaseFile.jsx';
import DecisionDesk from './DecisionDesk.jsx';
import VerdictModal from './VerdictModal.jsx';
import ConstructionScreen from '../screens/ConstructionScreen.jsx';
import { useGame } from '../../context/GameContext.jsx';
import { getSprint } from '../../data/sprints.js';
import { playSound } from '../../utils/soundEffects.js';

/**
 * Estación de trabajo (split-pane): expediente a la izquierda, dictamen y Manual Jurídico a
 * la derecha. En escritorio ocupa el alto de la ventana y cada panel tiene su propio scroll.
 */
export default function CaseWorkspace() {
  const { state } = useGame();
  const sprint = getSprint(state.currentSprint);
  const caso = sprint.casos[state.currentCaseIndex];

  useEffect(() => {
    if (caso && !state.activeFeedback) playSound('ticket');
    // Solo al llegar un ticket nuevo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caso?.id]);

  if (!caso) return <ConstructionScreen />;

  return (
    <>
      <div className="scroll-pane h-full overflow-y-auto lg:grid lg:grid-cols-[minmax(0,1.45fr)_minmax(360px,1fr)] lg:overflow-hidden">
        <div className="scroll-pane px-4 py-4 lg:min-h-0 lg:overflow-y-auto lg:border-r lg:border-olive-2 lg:px-5">
          <CaseFile key={caso.id} caso={caso} sprint={sprint} index={state.currentCaseIndex} total={sprint.casos.length} />
        </div>
        <div className="scroll-pane border-t border-olive-2 bg-[color-mix(in_oklab,var(--bg-app)_88%,black)] px-4 py-4 lg:min-h-0 lg:overflow-y-auto lg:border-t-0 lg:px-5">
          <DecisionDesk key={caso.id} caso={caso} />
        </div>
      </div>
      <VerdictModal />
    </>
  );
}
