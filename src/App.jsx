import { useState } from 'react';
import { useGame } from './context/GameContext.jsx';
import TopHUD from './components/layout/TopHUD.jsx';
import FooterLegal from './components/layout/FooterLegal.jsx';
import StartScreen from './components/screens/StartScreen.jsx';
import CaseWorkspace from './components/game/CaseWorkspace.jsx';
import SprintSummary from './components/screens/SprintSummary.jsx';
import GameOverScreen from './components/screens/GameOverScreen.jsx';
import VictoryScreen from './components/screens/VictoryScreen.jsx';
import PrivacyGateModal from './components/compliance/PrivacyGateModal.jsx';
import PrivacyNoticeModal from './components/compliance/PrivacyNoticeModal.jsx';
import LicenseModal from './components/compliance/LicenseModal.jsx';
import CreditsLicensesModal from './components/compliance/CreditsLicensesModal.jsx';
import DeleteDataDialog from './components/compliance/DeleteDataDialog.jsx';

const SCREENS = {
  PLAYING: CaseWorkspace,
  SPRINT_SUMMARY: SprintSummary,
  GAME_OVER: GameOverScreen,
  VICTORY: VictoryScreen,
};

/**
 * Navegación por estado (gameStatus), sin rutas URL: evita errores 404 al recargar en Vercel.
 * Flujo: START → Aviso de Privacidad → PLAYING → SPRINT_SUMMARY → … → VICTORY | GAME_OVER
 * Layout de estación de trabajo: HUD fijo arriba, área de trabajo al centro y pie legal
 * siempre visible; la ventana completa mide 100dvh y cada panel desplaza su propio contenido.
 */
export default function App() {
  const { state, actions } = useGame();
  // Solo un modal legal abierto a la vez: 'gate' | 'privacy' | 'license' | 'credits' | 'delete' | null
  const [modal, setModal] = useState(null);
  const close = () => setModal(null);

  const handleStart = () => {
    if (state.player.privacyAccepted) actions.startGame();
    else setModal('gate');
  };

  const handleAccept = (name) => {
    actions.acceptPrivacy(name);
    actions.startGame();
    close();
  };

  const handleDelete = () => {
    actions.deleteLocalData();
    close();
  };

  const Screen = SCREENS[state.gameStatus];

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <TopHUD />

      <main className="min-h-0 flex-1 overflow-hidden">
        {Screen ? <Screen /> : <StartScreen onStart={handleStart} />}
      </main>

      <FooterLegal onOpen={setModal} />

      <PrivacyGateModal open={modal === 'gate'} onClose={close} onAccept={handleAccept} />
      <PrivacyNoticeModal open={modal === 'privacy'} onClose={close} onRequestDelete={() => setModal('delete')} />
      <LicenseModal open={modal === 'license'} onClose={close} />
      <CreditsLicensesModal open={modal === 'credits'} onClose={close} />
      <DeleteDataDialog
        open={modal === 'delete'}
        onClose={close}
        onConfirm={handleDelete}
        hasData={state.player.privacyAccepted}
      />
    </div>
  );
}
