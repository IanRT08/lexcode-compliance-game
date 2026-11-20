import { ScrollText, Trash } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import { PrivacyNoticeFull } from './PrivacyNoticeContent.jsx';

/** Reapertura del Aviso Integral desde el pie de página, con acceso al borrado de datos. */
export default function PrivacyNoticeModal({ open, onClose, onRequestDelete }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={ScrollText}
      title="Aviso de Privacidad Integral"
      footer={
        <>
          <button type="button" className="btn-ghost" onClick={onRequestDelete}>
            <Trash className="size-4" aria-hidden="true" /> Eliminar mis datos locales
          </button>
          <button type="button" className="btn-primary" onClick={onClose}>
            Entendido
          </button>
        </>
      }
    >
      <PrivacyNoticeFull />
    </Modal>
  );
}
