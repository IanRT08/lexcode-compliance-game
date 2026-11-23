import { ExternalLink, Users } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import { INSTITUTIONAL_MARKS, OWN_ASSETS, PROJECT, TEAM, THIRD_PARTY } from '../../data/project.js';

/** Matriz oficial de atribuciones y propiedad intelectual (Criterio 7). */
export default function CreditsLicensesModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={Users}
      kicker="Matriz de atribuciones"
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
          <SectionTitle id="credits-team">Equipo LexCode — autores de la obra</SectionTitle>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <li key={m.name} className="rounded border border-sage px-3 py-2">
                <p className="text-sm font-semibold">{m.name}</p>
                <p className="text-xs text-olive">{m.role}</p>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-olive">
            {PROJECT.course} · {PROJECT.program} · Docente: {PROJECT.teacher}
          </p>
        </section>

        <section aria-labelledby="credits-third">
          <SectionTitle id="credits-third">Software y tipografías de terceros</SectionTitle>
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
                className="inline-flex items-center gap-1 font-medium text-earth hover:underline"
              >
                Repositorio <ExternalLink className="size-4" aria-hidden="true" />
              </a>,
            ])}
          />
          <p className="mt-2 text-xs text-olive">
            El texto completo de cada licencia (MIT, ISC y SIL OFL 1.1), con sus avisos de copyright, se publica junto con
            el juego en{' '}
            <a
              href="/THIRD_PARTY_LICENSES.txt"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-earth hover:underline"
            >
              THIRD_PARTY_LICENSES.txt <ExternalLink className="size-4" aria-hidden="true" />
            </a>
            , que se genera automáticamente en cada compilación.
          </p>
        </section>

        <section aria-labelledby="credits-marks">
          <SectionTitle id="credits-marks">Marcas institucionales (excluidas de la licencia del proyecto)</SectionTitle>
          <CreditsTable
            headers={['Categoría', 'Recurso', 'Titular', 'Licencia', 'Uso autorizado']}
            rows={INSTITUTIONAL_MARKS.map((r) => [
              r.category,
              r.resource,
              r.owner,
              <LicenseTag key="l" tone="crimson">
                {r.license}
              </LicenseTag>,
              r.usage,
            ])}
          />
          <p className="mt-2 text-xs text-olive">
            Los logotipos son signos distintivos de la UTEZ protegidos en materia de propiedad industrial (Ley Federal de
            Protección a la Propiedad Industrial). La universidad los proporcionó al equipo para este trabajo académico;
            se reproducen sin alteraciones y solo para identificar el origen del proyecto. Esa autorización es para el
            Equipo LexCode: quien redistribuya LexCode bajo la GPL o CC BY-SA debe retirarlos si no cuenta con su propia
            autorización de la universidad.
          </p>
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
              sitios externos; todo se distribuye junto con el proyecto y con licencia o autorización verificada.
            </li>
            <li>
              <strong>Textos legales citados:</strong> los artículos de leyes y de la Constitución que se citan no son
              objeto de protección por derecho de autor (Art. 14, fracción VIII, de la Ley Federal del Derecho de
              Autor). Los casos que los aplican son redacción original del equipo.
            </li>
            <li>
              <strong>Códigos de ética profesionales:</strong> los principios del Código de Ética de la ACM y del Código
              de Ética de Ingeniería de Software ACM/IEEE-CS se citan de forma breve y parafraseada, con fines
              educativos y con referencia a su fuente.
            </li>
            <li>
              <strong>Inspiración de diseño:</strong> la mecánica de «inspector de documentos» y gestión de indicadores
              se inspira en el género de simuladores de toma de decisiones. Las ideas y mecánicas de juego no son
              objeto de protección por derecho de autor (Art. 14, fracción I, LFDA); LexCode no utiliza nombres, arte,
              música ni ningún otro recurso de juegos existentes.
            </li>
            <li>
              <strong>Personajes y empresas ficticios:</strong> NovaByte Solutions y todas las personas de los casos son
              inventadas; cualquier parecido con personas u organizaciones reales es coincidencia.
            </li>
          </ul>
        </section>
      </div>
    </Modal>
  );
}

function SectionTitle({ id, children }) {
  return (
    <h3 id={id} className="label-caps mb-2.5 border-b border-sage pb-1.5 text-olive">
      {children}
    </h3>
  );
}

function LicenseTag({ children, tone = 'olive' }) {
  const tones = {
    olive: 'border-olive-2 text-olive',
    crimson: 'border-crimson text-crimson',
  };
  return (
    <span className={`inline-block rounded-sm border px-1.5 py-0.5 font-mono text-[11px] font-semibold whitespace-nowrap ${tones[tone]}`}>
      {children}
    </span>
  );
}

function CreditsTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded border border-sage">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="bg-panel/60">
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col" className="label-caps px-3 py-2 text-app">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-sage/60">
          {rows.map((cells, i) => (
            <tr key={i} className="align-top">
              {cells.map((c, j) => (
                <td key={j} className={`px-3 py-2 ${j === 1 ? 'font-semibold' : ''}`}>
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
