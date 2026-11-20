import { PROJECT, TEAM } from '../../data/project.js';

/** Aviso de Privacidad Simplificado (se muestra antes de recabar el alias). */
export function PrivacyNoticeSimplified() {
  return (
    <div className="prose-legal">
      <p>
        El <strong>Equipo LexCode</strong> (estudiantes de la {PROJECT.institution}) es responsable del tratamiento
        del único dato que te pedimos: un <strong>alias o nombre</strong> para personalizar tu certificado.
      </p>
      <p>
        <strong>Finalidad:</strong> exclusivamente académica — mostrar tu alias en el juego y en el certificado final,
        y guardar tu avance. No hay finalidades secundarias, publicidad ni perfiles.
      </p>
      <p>
        <strong>Dónde se guarda:</strong> solo en el <strong>almacenamiento local (localStorage) de tu navegador</strong>.
        No lo enviamos a ningún servidor ni lo transferimos a terceros; el equipo nunca lo recibe.
      </p>
      <p>
        <strong>Tus derechos ARCO:</strong> puedes borrar tus datos en cualquier momento con el botón
        «Eliminar mis datos locales» del pie de página. Consulta el Aviso de Privacidad Integral para más detalles.
      </p>
    </div>
  );
}

/** Aviso de Privacidad Integral. */
export function PrivacyNoticeFull() {
  return (
    <div className="prose-legal">
      <p className="text-xs! text-ink-500!">Última actualización: {PROJECT.privacyNoticeUpdated}</p>

      <h3>1. Identidad del responsable</h3>
      <p>
        Equipo LexCode, conformado por estudiantes de {PROJECT.program} de la {PROJECT.institution}, para la
        asignatura {PROJECT.course}:
      </p>
      <ul>
        {TEAM.map((m) => (
          <li key={m.name}>
            {m.name} — {m.role}
          </li>
        ))}
      </ul>
      <p>
        Medio de contacto: sección de <em>Issues</em> del repositorio público{' '}
        <a href={PROJECT.repoUrl} target="_blank" rel="noreferrer" className="text-brand-300 underline">
          {PROJECT.repoUrl.replace('https://', '')}
        </a>
        .
      </p>

      <h3>2. Datos personales que se tratan</h3>
      <ul>
        <li>
          <strong>Alias o nombre</strong> que tú escribas (te recomendamos un alias: no necesitamos tu nombre real).
        </li>
        <li>Fecha y hora en que aceptaste este aviso.</li>
        <li>Datos de juego: decisiones tomadas, puntajes de los indicadores y preferencia de sonido.</li>
      </ul>
      <p>
        <strong>No se recaban datos personales sensibles</strong> (salud, biométricos, origen, creencias, etc.), ni
        correo, teléfono, ubicación o datos financieros. El juego no usa cookies, analítica ni rastreadores.
      </p>

      <h3>3. Finalidades del tratamiento</h3>
      <p>
        <strong>Finalidades necesarias:</strong> (a) mostrar tu alias dentro del juego y en el certificado final, y (b)
        guardar tu avance para que puedas continuar la partida. <strong>No existen finalidades voluntarias o
        secundarias</strong> (no hay mercadotecnia, publicidad ni elaboración de perfiles).
      </p>

      <h3>4. Almacenamiento y transferencias</h3>
      <p>
        Los datos se guardan únicamente en el <strong>localStorage de tu propio navegador</strong>, en tu dispositivo.
        El juego no tiene servidor de aplicación ni base de datos, por lo que{' '}
        <strong>no se transfieren datos a terceros</strong> y el equipo no tiene acceso a ellos.
      </p>
      <p>
        El sitio se publica en Vercel (alojamiento de archivos estáticos). Como cualquier servidor web, Vercel puede
        registrar datos técnicos de conexión (por ejemplo, dirección IP) conforme a su propia política de privacidad;
        el equipo no consulta ni utiliza esos registros.
      </p>

      <h3>5. Derechos ARCO y revocación del consentimiento</h3>
      <p>
        Tienes derecho a <strong>Acceder, Rectificar, Cancelar u Oponerte</strong> al tratamiento de tus datos, así como
        a revocar tu consentimiento (Art. 16, párrafo segundo, de la Constitución Política de los Estados Unidos
        Mexicanos). Como los datos solo existen en tu navegador, puedes ejercerlos directamente:
      </p>
      <ul>
        <li>
          <strong>Acceso:</strong> tu alias y avance se muestran en pantalla y en el certificado.
        </li>
        <li>
          <strong>Rectificación:</strong> elimina tus datos e inicia de nuevo con otro alias.
        </li>
        <li>
          <strong>Cancelación, oposición y revocación:</strong> usa el botón «Eliminar mis datos locales» del pie de
          página, o borra los datos del sitio desde la configuración de tu navegador.
        </li>
      </ul>

      <h3>6. Cambios al aviso de privacidad</h3>
      <p>
        Cualquier cambio se publicará en esta misma sección del juego y en el repositorio del proyecto, indicando la
        fecha de actualización.
      </p>

      <h3>7. Marco normativo</h3>
      <p>
        Este aviso se elabora con base en la Ley Federal de Protección de Datos Personales en Posesión de los
        Particulares (publicada en el DOF el 20 de marzo de 2025) y el Art. 16 constitucional, con fines académicos y
        como ejercicio de congruencia ética del propio proyecto.
      </p>
    </div>
  );
}
