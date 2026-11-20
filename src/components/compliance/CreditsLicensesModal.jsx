import { ExternalLink, Users } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import { OWN_ASSETS, PROJECT, TEAM, THIRD_PARTY } from '../../data/project.js';

/** Matriz oficial de atribuciones y propiedad intelectual (Criterio 7). */
export default function CreditsLicensesModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={Users}
      title="Créditos y propiedad intelectual"
      size="xl"
      footer={
        <button type="button" className="btn-primary" onClick={onClose}>
          Cerrar
        </button>
      }
    >
      <div className="space-y-6">
        <section aria-labelledby="credits-team">
          <SectionTitle id="credits-team">Equipo LexCode</SectionTitle>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <li key={m.name} className="rounded-lg border border-desk-700 bg-desk-800 px-3 py-2">
                <p className="text-sm font-medium text-ink-100">{m.name}</p>
                <p className="text-xs text-ink-400">{m.role}</p>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-ink-500">
            {PROJECT.course} · {PROJECT.program} · Docente: {PROJECT.teacher}
          </p>
        </section>

        <section aria-labelledby="credits-third">
          <SectionTitle id="credits-third">Recursos de terceros</SectionTitle>
          <CreditsTable
            headers={['Categoría', 'Recurso', 'Autor / organización', 'Licencia', 'Referencia']}
            rows={THIRD_PARTY.map((r) => [
              r.category,
              r.resource,
              r.author,
              <LicenseTag key="l">{r.license}</LicenseTag>,
              <a
                key="u"
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-brand-300 hover:underline"
              >
                Repositorio <ExternalLink className="size-3" aria-hidden="true" />
              </a>,
            ])}
          />
        </section>

        <section aria-labelledby="credits-own">
          <SectionTitle id="credits-own">Recursos propios</SectionTitle>
          <CreditsTable
            headers={['Categoría', 'Recurso', 'Detalle', 'Licencia']}
            rows={OWN_ASSETS.map((r) => [r.category, r.resource, r.detail, <LicenseTag key="l">{r.license}</LicenseTag>])}
          />
        </section>

        <section aria-labelledby="credits-notes" className="prose-legal">
          <SectionTitle id="credits-notes">Notas de propiedad intelectual</SectionTitle>
          <ul>
            <li>
              <strong>Sin hotlinking ni recursos protegidos:</strong> no se cargan imágenes, audios ni fuentes desde
              sitios externos; todo se distribuye junto con el proyecto y con licencia verificada.
            </li>
            <li>
              <strong>Textos legales citados:</strong> los artículos de leyes y de la Constitución que se citan no son
              objeto de protección por derecho de autor (Art. 14, fracción VIII, de la Ley Federal del Derecho de
              Autor). Los casos que los aplican son redacción original del equipo.
            </li>
            <li>
              <strong>Inspiración de diseño:</strong> la mecánica de «inspector de documentos» y gestión de indicadores
              se inspira en el género de simuladores de toma de decisiones. Las ideas y mecánicas de juego no son
              objeto de protección por derecho de autor (Art. 14, fracción I, LFDA); LexCode no utiliza nombres, arte,
              música ni ningún otro recurso de juegos existentes.
            </li>
            <li>
              <strong>Personajes y empresas ficticios:</strong> cualquier parecido de los casos con personas u
              organizaciones reales es coincidencia.
            </li>
          </ul>
        </section>
      </div>
    </Modal>
  );
}

function SectionTitle({ id, children }) {
  return (
    <h3 id={id} className="mb-2.5 text-sm font-semibold tracking-wide text-brand-300 uppercase">
      {children}
    </h3>
  );
}

function LicenseTag({ children }) {
  return (
    <span className="inline-block rounded-md bg-desk-700 px-2 py-0.5 font-mono text-xs whitespace-nowrap text-ink-100">
      {children}
    </span>
  );
}

function CreditsTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-desk-700">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-desk-800 text-xs tracking-wide text-ink-400 uppercase">
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col" className="px-3 py-2.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-desk-700">
          {rows.map((cells, i) => (
            <tr key={i} className="align-top">
              {cells.map((c, j) => (
                <td key={j} className={`px-3 py-2.5 ${j === 1 ? 'font-medium text-ink-100' : 'text-ink-300'}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
