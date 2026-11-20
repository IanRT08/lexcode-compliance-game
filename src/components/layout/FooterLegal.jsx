import { Scale, ScrollText, Trash, Users } from 'lucide-react';
import { OWN_LICENSES, PROJECT } from '../../data/project.js';

/** Pie legal visible en todo momento (Criterio 7). */
export default function FooterLegal({ onOpen }) {
  const links = [
    { key: 'privacy', label: 'Aviso de Privacidad', icon: ScrollText },
    { key: 'license', label: `Licencia ${OWN_LICENSES.code.id.replace('-or-later', '+')}`, icon: Scale },
    { key: 'credits', label: 'Créditos y PI', icon: Users },
    { key: 'delete', label: 'Eliminar mis datos locales', icon: Trash },
  ];

  return (
    <footer className="border-t border-desk-700 bg-desk-950/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-500">
          © {PROJECT.year} Equipo LexCode · UTEZ · Código {OWN_LICENSES.code.id} · Contenido {OWN_LICENSES.content.id}
        </p>
        <nav aria-label="Información legal">
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {links.map(({ key, label, icon: Icon }) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => onOpen(key)}
                  className={`inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium hover:underline ${
                    key === 'delete' ? 'text-bad/90' : 'text-ink-300 hover:text-brand-300'
                  }`}
                >
                  <Icon className="size-3.5" aria-hidden="true" />
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
