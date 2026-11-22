import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Diálogo modal accesible con aspecto de documento oficial: encabezado institucional
 * en verde olivo y cuerpo en papel. role="dialog", aria-modal, cierre con Escape,
 * foco inicial dentro del diálogo, ciclo de Tab contenido y retorno del foco al cerrar.
 */
export default function Modal({ open, onClose, title, kicker, icon: Icon, children, footer, size = 'lg', dismissible = true }) {
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
    // Foco inicial: el elemento marcado con data-autofocus (acción principal) o el propio diálogo.
    const preferred = dialogRef.current?.querySelector('[data-autofocus]');
    (preferred ?? dialogRef.current)?.focus();

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
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-[color-mix(in_oklab,var(--bg-app)_70%,black)]/85"
        onClick={dismissible ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`on-paper relative flex max-h-[94dvh] w-full ${widths[size]} flex-col overflow-hidden rounded-t-md border border-sage bg-paper text-app outline-none sm:rounded-md`}
      >
        <header className="flex items-center gap-3 border-b-2 border-olive-2 bg-olive px-5 py-3 text-paper">
          {Icon && <Icon className="size-[18px] shrink-0" aria-hidden="true" />}
          <div className="min-w-0 flex-1">
            {kicker && <p className="label-caps text-panel">{kicker}</p>}
            <h2 id={titleId} className="truncate text-[15px] font-semibold">
              {title}
            </h2>
          </div>
          {dismissible && (
            <button type="button" onClick={onClose} className="btn-ghost p-1.5" aria-label="Cerrar">
              <X className="size-[18px]" aria-hidden="true" />
            </button>
          )}
        </header>
        <div className="scroll-pane flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer && (
          <footer className="flex flex-col-reverse gap-2 border-t border-sage bg-[color-mix(in_oklab,var(--surface-paper)_88%,var(--surface-panel))] px-5 py-3 sm:flex-row sm:justify-end">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
