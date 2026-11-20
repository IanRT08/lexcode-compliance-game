import { Trash } from 'lucide-react';
import Modal from '../ui/Modal.jsx';

/** Confirmación del borrado de datos locales (cancelación ARCO / revocación del consentimiento). */
export default function DeleteDataDialog({ open, onClose, onConfirm, hasData }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={Trash}
      title="Eliminar mis datos locales"
      size="sm"
      footer={
        hasData ? (
          <>
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn-danger" onClick={onConfirm}>
              Sí, eliminar definitivamente
            </button>
          </>
        ) : (
          <button type="button" className="btn-primary" onClick={onClose}>
            Cerrar
          </button>
        )
      }
    >
      {hasData ? (
        <div className="prose-legal">
          <p>Se borrarán de este navegador:</p>
          <ul>
            <li>Tu alias y la fecha en que aceptaste el aviso de privacidad.</li>
            <li>Tu avance, indicadores y el historial de decisiones.</li>
          </ul>
          <p>
            <strong>Esta acción no se puede deshacer.</strong> Volverás a la pantalla de inicio y, si quieres jugar de
            nuevo, se te pedirá otra vez tu consentimiento.
          </p>
        </div>
      ) : (
        <p className="text-sm text-ink-300">
          No hay datos personales guardados en este navegador. El juego solo almacena información después de que
          aceptas el aviso de privacidad.
        </p>
      )}
    </Modal>
  );
}
