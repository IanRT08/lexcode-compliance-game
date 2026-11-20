import {
  Braces,
  ClipboardList,
  FileCode,
  FileText,
  GitPullRequest,
  Hash,
  Mail,
  MessageSquare,
  Paperclip,
  Terminal,
} from 'lucide-react';
import { initials } from '../../utils/text.js';

/** Icono por tipo de evidencia (también lo usan las pestañas del expediente). */
export const EVIDENCE_ICONS = {
  codigo: FileCode,
  diff: GitPullRequest,
  chat: MessageSquare,
  correo: Mail,
  documento: FileText,
  log: Terminal,
  json: Braces,
  formulario: ClipboardList,
};

/** Etiqueta corta para la pestaña de una evidencia. */
export function evidenceTitle(ev) {
  if (ev.etiqueta) return ev.etiqueta;
  if (ev.tipo === 'correo') return `correo · ${(ev.de ?? '').split('@')[0]}`;
  if (ev.tipo === 'chat') return `#${ev.canal}`;
  if (ev.tipo === 'diff' && ev.numero) return `PR #${ev.numero}`;
  return ev.nombreArchivo ?? ev.titulo ?? 'Evidencia';
}

/** Renderizador dinámico según el tipo de documento (código, correo, contrato, log...). */
export default function EvidenceInspector({ evidence }) {
  switch (evidence.tipo) {
    case 'codigo':
    case 'json':
      return <CodeView ev={evidence} />;
    case 'diff':
      return <DiffView ev={evidence} />;
    case 'log':
      return <LogView ev={evidence} />;
    case 'chat':
      return <ChatView ev={evidence} />;
    case 'correo':
      return <MailView ev={evidence} />;
    case 'formulario':
      return <FormView ev={evidence} />;
    case 'documento':
    default:
      return <DocumentView ev={evidence} />;
  }
}

/* --- Vistas tipo editor (fondo oscuro, tipografía monoespaciada) -------- */

function EditorFrame({ name, meta, children }) {
  return (
    <figure className="overflow-hidden rounded border border-olive-2 bg-[color-mix(in_oklab,var(--bg-app)_70%,black)]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-olive-2 bg-[color-mix(in_oklab,var(--bg-app)_85%,black)] px-3 py-1.5">
        <span className="truncate font-mono text-xs text-paper">{name}</span>
        {meta && <span className="shrink-0 font-mono text-[11px] text-panel">{meta}</span>}
      </figcaption>
      <div className="scroll-pane overflow-x-auto">{children}</div>
    </figure>
  );
}

function isComment(line) {
  const t = line.trim();
  return t.startsWith('//') || t.startsWith('#') || t.startsWith('/*') || t.startsWith('*');
}

function CodeView({ ev }) {
  const lines = (ev.contenido ?? '').split('\n');
  return (
    <EditorFrame name={ev.nombreArchivo} meta={ev.lenguaje ?? (ev.tipo === 'json' ? 'json' : null)}>
      <pre className="min-w-max py-2 font-mono text-[13px] leading-6">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="w-11 shrink-0 pr-3 text-right text-sage select-none">{i + 1}</span>
            <code className={`pr-4 whitespace-pre ${isComment(line) ? 'text-muted' : 'text-paper'}`}>{line || ' '}</code>
          </div>
        ))}
      </pre>
    </EditorFrame>
  );
}

function DiffView({ ev }) {
  const lines = (ev.contenido ?? '').split('\n');
  return (
    <div className="space-y-3">
      {(ev.titulo || ev.descripcion) && (
        <div className="paper p-4">
          <p className="label-caps flex items-center gap-1.5 text-olive">
            <GitPullRequest className="size-4" aria-hidden="true" /> Pull Request {ev.numero ? `#${ev.numero}` : ''}
          </p>
          {ev.titulo && <p className="mt-1 font-semibold">{ev.titulo}</p>}
          <p className="mt-1 font-mono text-xs text-olive">
            {ev.autor && <>autor: {ev.autor}</>} {ev.rama && <>· {ev.rama}</>}
          </p>
          {ev.descripcion && <p className="mt-2 text-sm whitespace-pre-line">{ev.descripcion}</p>}
        </div>
      )}
      <EditorFrame name={ev.nombreArchivo} meta="diff">
        <pre className="min-w-max py-2 font-mono text-[13px] leading-6">
          {lines.map((line, i) => {
            const sign = line[0];
            const tone =
              sign === '+'
                ? 'bg-olive/45 text-paper'
                : sign === '-'
                  ? 'bg-crimson/30 text-paper'
                  : sign === '@'
                    ? 'text-muted'
                    : 'text-panel';
            return (
              <div key={i} className={`flex ${tone}`}>
                <span className="w-7 shrink-0 text-center select-none">{sign === '+' || sign === '-' ? sign : ''}</span>
                <code className="pr-4 whitespace-pre">{sign === '+' || sign === '-' ? line.slice(1) : line || ' '}</code>
              </div>
            );
          })}
        </pre>
      </EditorFrame>
    </div>
  );
}

function LogView({ ev }) {
  const lines = (ev.contenido ?? '').split('\n');
  const tone = (l) =>
    /\b(CRIT|ERROR|ALERT|FAIL)/.test(l) ? 'crit' : /\bWARN/.test(l) ? 'warn' : /\bMATCH|\bFOUND/.test(l) ? 'match' : 'info';
  return (
    <EditorFrame name={ev.nombreArchivo} meta="log">
      <pre className="min-w-max py-2 font-mono text-[12.5px] leading-6">
        {lines.map((line, i) => {
          const t = tone(line);
          return (
            <div
              key={i}
              className={`px-3 whitespace-pre ${
                t === 'crit'
                  ? 'bg-crimson/35 text-paper'
                  : t === 'warn'
                    ? 'text-muted'
                    : t === 'match'
                      ? 'bg-earth/35 text-paper'
                      : 'text-panel'
              }`}
            >
              {line || ' '}
            </div>
          );
        })}
      </pre>
    </EditorFrame>
  );
}

/* --- Vistas tipo papel ------------------------------------------------- */

function ChatView({ ev }) {
  return (
    <div className="paper overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-sage bg-panel/50 px-4 py-2">
        <Hash className="size-4 text-olive" aria-hidden="true" />
        <span className="font-mono text-sm font-semibold">{ev.canal}</span>
        {ev.plataforma && <span className="ml-auto font-mono text-[11px] text-olive">{ev.plataforma}</span>}
      </div>
      <ol className="divide-y divide-sage/30">
        {ev.mensajes.map((m, i) => (
          <li key={i} className={`flex gap-3 px-4 py-2.5 ${m.privado ? 'bg-muted/20' : ''}`}>
            <span
              className="grid size-8 shrink-0 place-items-center rounded-sm bg-olive-2 font-mono text-xs font-semibold text-paper"
              aria-hidden="true"
            >
              {initials(m.autor)}
            </span>
            <div className="min-w-0">
              <p className="text-sm">
                <span className="font-semibold">{m.autor}</span>
                {m.rol && <span className="ml-1.5 text-xs text-olive">{m.rol}</span>}
                <span className="ml-2 font-mono text-[11px] text-olive">{m.hora}</span>
                {m.privado && (
                  <span className="ml-2 rounded-sm border border-earth px-1 font-mono text-[10px] text-earth uppercase">
                    mensaje directo
                  </span>
                )}
              </p>
              <p className="mt-0.5 text-sm whitespace-pre-line">{m.texto}</p>
              {m.adjunto && (
                <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-sm border border-sage px-2 py-1 text-xs text-olive">
                  <Paperclip className="size-4" aria-hidden="true" /> {m.adjunto}
                </p>
              )}
              {m.reacciones && <p className="mt-1 font-mono text-[11px] text-olive">{m.reacciones}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function MailView({ ev }) {
  const rows = [
    ['De', ev.de],
    ['Para', ev.para],
    ['CC', ev.cc],
    ['Fecha', ev.fecha],
    ['Asunto', ev.asunto],
  ].filter(([, v]) => v);
  return (
    <article className="paper">
      <dl className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1 border-b border-sage px-5 py-3 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="label-caps pt-0.5 text-olive">{k}</dt>
            <dd className={k === 'Asunto' ? 'font-semibold' : 'font-mono text-[13px]'}>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="px-5 py-4 text-sm leading-relaxed whitespace-pre-line">{ev.cuerpo}</div>
      {ev.adjuntos?.length > 0 && (
        <ul className="flex flex-wrap gap-2 border-t border-sage px-5 py-3">
          {ev.adjuntos.map((a) => (
            <li key={a} className="inline-flex items-center gap-1.5 rounded-sm border border-sage px-2 py-1 font-mono text-xs text-olive">
              <Paperclip className="size-4" aria-hidden="true" /> {a}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function DocumentView({ ev }) {
  return (
    <article className="paper px-6 py-5">
      {ev.membrete && <p className="label-caps text-earth">{ev.membrete}</p>}
      <h3 className="mt-1 text-lg font-semibold">{ev.titulo ?? ev.nombreArchivo}</h3>
      {ev.metadatos && (
        <dl className="mt-3 flex flex-wrap gap-2">
          {Object.entries(ev.metadatos).map(([k, v]) => (
            <div key={k} className="rounded-sm bg-muted/35 px-2 py-1 text-xs">
              <dt className="label-caps inline text-app">{k}: </dt>
              <dd className="inline font-mono">{v}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="mt-4 space-y-4">
        {(ev.secciones ?? []).map((s, i) => (
          <section key={i}>
            {s.titulo && <h4 className="font-mono text-xs font-semibold tracking-wider text-olive uppercase">{s.titulo}</h4>}
            <p className="mt-1 text-sm leading-relaxed whitespace-pre-line">{s.texto}</p>
          </section>
        ))}
        {ev.contenido && <p className="text-sm leading-relaxed whitespace-pre-line">{ev.contenido}</p>}
      </div>
    </article>
  );
}

function FormView({ ev }) {
  return (
    <article className="paper px-6 py-5">
      {ev.membrete && <p className="label-caps text-earth">{ev.membrete}</p>}
      <h3 className="mt-1 text-lg font-semibold">{ev.titulo}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {ev.campos.map((c, i) => (
          <div key={i} className={c.ancho === 'completo' ? 'sm:col-span-2' : ''}>
            <p className="label-caps text-olive">{c.etiqueta}</p>
            <p className="mt-1 rounded-sm border border-olive-2 bg-white/50 px-2.5 py-1.5 font-mono text-[13px]">{c.valor}</p>
            {c.nota && <p className="mt-1 text-xs text-olive">{c.nota}</p>}
          </div>
        ))}
      </div>
    </article>
  );
}
