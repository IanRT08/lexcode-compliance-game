import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Diálogo modal accesible: role="dialog", aria-modal, cierre con Escape,
 * foco inicial dentro del diálogo, ciclo de Tab contenido y retorno del foco al cerrar.
 */
export default function Modal({ open, onClose, title, icon: Icon, children, footer, size = 'lg', dismissible = true }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  // onClose en ref: evita re-ejecutar el efecto (y robar el foco) en cada render del padre.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && dismissible) {
        e.stopPropagation();
        onCloseRef.current?.();
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, dismissible]);

  if (!open) return null;

  const widths = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-desk-950/80 backdrop-blur-sm"
        onClick={dismissible ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`panel relative flex max-h-[92vh] w-full ${widths[size]} flex-col overflow-hidden rounded-b-none shadow-2xl shadow-black/50 outline-none sm:rounded-2xl`}
      >
        <header className="flex items-center gap-3 border-b border-desk-700 px-5 py-4">
          {Icon && <Icon className="size-5 shrink-0 text-brand-300" aria-hidden="true" />}
          <h2 id={titleId} className="flex-1 text-base font-semibold text-ink-100">
            {title}
          </h2>
          {dismissible && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 text-ink-400 hover:bg-desk-700 hover:text-ink-100"
              aria-label="Cerrar"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          )}
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer && (
          <footer className="flex flex-col-reverse gap-2 border-t border-desk-700 px-5 py-4 sm:flex-row sm:justify-end">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
