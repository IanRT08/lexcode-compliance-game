import { Scale, ScrollText, Trash, Users } from 'lucide-react';
import { OWN_LICENSES, PROJECT } from '../../data/project.js';

/** Pie legal visible en todo momento (Criterio 7). */
export default function FooterLegal({ onOpen }) {
  const links = [
    { key: 'privacy', label: 'Aviso de Privacidad', icon: ScrollText },
    { key: 'license', label: 'Licencia GPL-3.0+', icon: Scale },
    { key: 'credits', label: 'Créditos y PI', icon: Users },
    { key: 'delete', label: 'Eliminar mis datos locales', icon: Trash, danger: true },
  ];

  return (
    <footer className="shrink-0 border-t border-olive-2 bg-[color-mix(in_oklab,var(--bg-app)_85%,black)]">
      <div className="flex flex-col gap-1.5 px-4 py-1.5 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[11px] text-panel">
          © {PROJECT.year} Equipo LexCode · UTEZ · Código {OWN_LICENSES.code.id} · Contenido {OWN_LICENSES.content.id}
        </p>
        <nav aria-label="Información legal">
          <ul className="-mx-2 flex flex-wrap">
            {links.map(({ key, label, icon: Icon, danger }) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => onOpen(key)}
                  className={`btn-ghost px-2 py-1 text-xs font-medium ${danger ? 'text-muted' : 'text-paper'}`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
