import { FileText } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import TermsContent from './TermsContent.jsx';

export default function TermsModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={FileText}
      kicker="Condiciones para la persona jugadora"
      title="Términos de uso"
      footer={
        <button type="button" className="btn-primary" onClick={onClose}>
          Entendido
        </button>
      }
    >
      <TermsContent />
    </Modal>
  );
}
