import { useEffect, useId, useState } from 'react';
import { ArrowLeft, Lock, ScrollText } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import { PrivacyNoticeFull, PrivacyNoticeSimplified } from './PrivacyNoticeContent.jsx';
import { playSound } from '../../utils/soundEffects.js';

const NAME_MIN = 2;
const NAME_MAX = 32;

/**
 * Pantalla obligatoria previa al juego (Criterio 7): primero se informa con el Aviso de
 * Privacidad y solo después de un consentimiento expreso se recaba el alias.
 */
export default function PrivacyGateModal({ open, onClose, onAccept }) {
  const [view, setView] = useState('simple'); // 'simple' | 'full'
  const [accepted, setAccepted] = useState(false);
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);
  const nameId = useId();
  const errorId = useId();

  useEffect(() => {
    if (open) {
      setView('simple');
      setAccepted(false);
      setName('');
      setTouched(false);
    }
  }, [open]);

  const trimmed = name.trim();
  const nameValid = trimmed.length >= NAME_MIN && trimmed.length <= NAME_MAX;
  const canStart = accepted && nameValid;

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!canStart) return;
    playSound('approve');
    onAccept(trimmed);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={view === 'simple' ? Lock : ScrollText}
      title={view === 'simple' ? 'Aviso de Privacidad Simplificado' : 'Aviso de Privacidad Integral'}
      size={view === 'simple' ? 'md' : 'lg'}
      footer={
        view === 'full' ? (
          <button type="button" className="btn-ghost" onClick={() => setView('simple')}>
            <ArrowLeft className="size-4" aria-hidden="true" /> Volver al aviso simplificado
          </button>
        ) : (
          <>
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" form="privacy-gate-form" className="btn-primary" disabled={!canStart}>
              Aceptar e iniciar auditoría
            </button>
          </>
        )
      }
    >
      {view === 'full' ? (
        <PrivacyNoticeFull />
      ) : (
        <form id="privacy-gate-form" onSubmit={submit} noValidate className="space-y-5">
          <PrivacyNoticeSimplified />

          <button
            type="button"
            onClick={() => setView('full')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 underline-offset-4 hover:underline"
          >
            <ScrollText className="size-4" aria-hidden="true" /> Leer el Aviso de Privacidad Integral
          </button>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-desk-600 bg-desk-800 p-3.5">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-brand-500"
            />
            <span className="text-sm text-ink-300">
              He leído el Aviso de Privacidad y <strong className="text-ink-100">otorgo mi consentimiento expreso</strong>{' '}
              para que mi alias se guarde localmente en este navegador con las finalidades descritas.
            </span>
          </label>

          <div>
            <label htmlFor={nameId} className="mb-1.5 block text-sm font-medium text-ink-100">
              Alias para tu credencial de Oficial de Cumplimiento
            </label>
            <input
              id={nameId}
              type="text"
              value={name}
              disabled={!accepted}
              maxLength={NAME_MAX}
              autoComplete="nickname"
              placeholder={accepted ? 'Ej. Oficial_Turing' : 'Primero acepta el aviso de privacidad'}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-invalid={touched && accepted && !nameValid}
              aria-describedby={errorId}
              className="w-full rounded-lg border border-desk-600 bg-desk-950 px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-500 focus:border-brand-400 disabled:opacity-50"
            />
            <p id={errorId} className="mt-1.5 text-xs text-ink-500">
              {touched && accepted && !nameValid ? (
                <span className="text-bad">
                  Escribe entre {NAME_MIN} y {NAME_MAX} caracteres.
                </span>
              ) : (
                'Principio de minimización: usa un alias, no necesitamos tu nombre real.'
              )}
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
}
