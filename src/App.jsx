import { useState } from 'react';
import { useGame } from './context/GameContext.jsx';
import TopHUD from './components/layout/TopHUD.jsx';
import FooterLegal from './components/layout/FooterLegal.jsx';
import StartScreen from './components/screens/StartScreen.jsx';
import ConstructionScreen from './components/screens/ConstructionScreen.jsx';
import PrivacyGateModal from './components/compliance/PrivacyGateModal.jsx';
import PrivacyNoticeModal from './components/compliance/PrivacyNoticeModal.jsx';
import LicenseModal from './components/compliance/LicenseModal.jsx';
import CreditsLicensesModal from './components/compliance/CreditsLicensesModal.jsx';
import DeleteDataDialog from './components/compliance/DeleteDataDialog.jsx';

/**
 * Navegación por estado (gameStatus), sin rutas URL: evita errores 404 al recargar en Vercel.
 * Flujo: START → Aviso de Privacidad → PLAYING → SPRINT_SUMMARY → … → VICTORY | GAME_OVER
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

  return (
    <div className="flex min-h-screen flex-col">
      <TopHUD />

      <main className="flex-1">
        {state.gameStatus === 'START' ? <StartScreen onStart={handleStart} /> : <ConstructionScreen />}
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
