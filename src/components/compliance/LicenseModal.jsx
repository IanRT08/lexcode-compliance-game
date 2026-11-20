import { ExternalLink, Scale } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import { OWN_LICENSES, PROJECT, TEAM } from '../../data/project.js';

/** Declaración del licenciamiento de la obra propia (Criterio 7). */
export default function LicenseModal({ open, onClose }) {
  const { code, content } = OWN_LICENSES;
  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={Scale}
      title="Licencia del proyecto"
      footer={
        <button type="button" className="btn-primary" onClick={onClose}>
          Cerrar
        </button>
      }
    >
      <div className="prose-legal">
        <p>
          © {PROJECT.year} {TEAM.map((m) => m.name).join(', ')} — Equipo LexCode, {PROJECT.institution}.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <LicenseCard
            label="Código fuente"
            id={code.id}
            name={code.name}
            url={code.url}
            note="Archivo LICENSE en la raíz del repositorio."
          />
          <LicenseCard
            label="Contenido didáctico"
            id={content.id}
            name={content.name}
            url={content.url}
            note="Casos, narrativa, Manual Jurídico y textos del juego."
          />
        </div>

        <h3>¿Qué puedes hacer con LexCode?</h3>
        <ul>
          <li>Usar, estudiar, copiar y modificar el código y el contenido, incluso con fines comerciales.</li>
          <li>
            Distribuir versiones modificadas, <strong>siempre bajo la misma licencia</strong> (GPLv3 para el código,
            CC BY-SA para el contenido), conservando los avisos de autoría y, en el caso del código, poniendo a
            disposición el código fuente.
          </li>
          <li>Dar crédito al Equipo LexCode e indicar si realizaste cambios.</li>
        </ul>

        <h3>¿Por qué Copyleft?</h3>
        <p>
          Elegimos licencias <strong>Copyleft</strong> por congruencia con la Unidad IV de la asignatura: garantizan
          que el conocimiento que construimos siga siendo libre y que ninguna versión derivada pueda cerrarse como
          software propietario. Es la diferencia práctica entre <em>Copyright</em> (todos los derechos reservados) y{' '}
          <em>Copyleft</em> (derechos de uso garantizados para todos, con la obligación de compartir igual).
        </p>

        <h3>Compatibilidad con las dependencias</h3>
        <p>
          Las librerías que usamos tienen licencias permisivas (<strong>MIT</strong> e <strong>ISC</strong>), que son
          compatibles con su integración en una obra GPLv3: sus avisos de copyright se conservan y se declaran en
          Créditos. Las tipografías se distribuyen bajo <strong>SIL OFL 1.1</strong>, que permite empaquetarlas con
          cualquier software siempre que la fuente conserve su propia licencia.
        </p>

        <h3>Sin garantía</h3>
        <p>
          Conforme a la GPLv3, el software se ofrece «tal cual», sin garantía de ningún tipo. Este juego es un recurso
          educativo y <strong>no constituye asesoría legal</strong>.
        </p>
      </div>
    </Modal>
  );
}

function LicenseCard({ label, id, name, url, note }) {
  return (
    <div className="rounded border border-sage bg-[color-mix(in_oklab,var(--surface-paper)_75%,var(--surface-panel))] p-4">
      <p className="label-caps text-olive">{label}</p>
      <p className="mt-1 font-mono text-sm font-semibold text-earth">{id}</p>
      <p className="mt-1 text-sm! font-medium">{name}</p>
      <p className="mt-1 text-xs! text-olive!">{note}</p>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-earth hover:underline"
      >
        Texto oficial <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}
