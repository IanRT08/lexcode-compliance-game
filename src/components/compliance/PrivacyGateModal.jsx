import { useEffect, useId, useState } from 'react';
import { ArrowLeft, FileText, Lock, ScrollText } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import { PrivacyNoticeFull, PrivacyNoticeSimplified } from './PrivacyNoticeContent.jsx';
import TermsContent from './TermsContent.jsx';
import { playSound } from '../../utils/soundEffects.js';

const NAME_MIN = 2;
const NAME_MAX = 32;

/**
 * Pantalla obligatoria previa al juego (Criterio 7): primero se informa con el Aviso de
 * Privacidad y solo después de un consentimiento expreso se recaba el alias.
 */
export default function PrivacyGateModal({ open, onClose, onAccept }) {
  const [view, setView] = useState('simple'); // 'simple' | 'full' | 'terms'
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
      icon={view === 'simple' ? Lock : view === 'terms' ? FileText : ScrollText}
      kicker="Paso previo obligatorio · LFPDPPP"
      title={
        view === 'simple' ? 'Aviso de Privacidad Simplificado' : view === 'terms' ? 'Términos de uso' : 'Aviso de Privacidad Integral'
      }
      size={view === 'simple' ? 'md' : 'lg'}
      footer={
        view !== 'simple' ? (
          <button type="button" className="btn-ghost" onClick={() => setView('simple')}>
            <ArrowLeft className="size-4" aria-hidden="true" /> Volver
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
      ) : view === 'terms' ? (
        <TermsContent />
      ) : (
        <form id="privacy-gate-form" onSubmit={submit} noValidate className="space-y-5">
          <PrivacyNoticeSimplified />

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setView('full')} className="btn-outline text-sm">
              <ScrollText className="size-4" aria-hidden="true" /> Leer el Aviso de Privacidad Integral
            </button>
            <button type="button" onClick={() => setView('terms')} className="btn-outline text-sm">
              <FileText className="size-4" aria-hidden="true" /> Leer los Términos de uso
            </button>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded border border-sage bg-[color-mix(in_oklab,var(--surface-paper)_80%,var(--surface-panel))] p-3.5">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-[var(--brand-primary)]"
            />
            <span className="text-sm text-app">
              He leído el Aviso de Privacidad y <strong className="font-semibold">otorgo mi consentimiento expreso</strong>{' '}
              para que mi alias se guarde localmente en este navegador con las finalidades descritas. También acepto los{' '}
              <strong className="font-semibold">Términos de uso</strong> del juego.
            </span>
          </label>

          <div>
            <label htmlFor={nameId} className="mb-1.5 block text-sm font-semibold text-app">
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
              className="w-full rounded border-[1.5px] border-olive-2 bg-white/60 px-3 py-2 font-mono text-sm text-app placeholder:text-olive-2 focus:border-olive disabled:opacity-50"
            />
            <p id={errorId} className="mt-1.5 text-xs text-olive">
              {touched && accepted && !nameValid ? (
                <span className="font-semibold text-crimson">
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
