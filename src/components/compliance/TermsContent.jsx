import { OWN_LICENSES, PROJECT } from '../../data/project.js';

/** Términos de uso del juego (Criterio 7: términos para la persona jugadora). */
export default function TermsContent() {
  return (
    <div className="prose-legal">
      <p className="font-mono text-xs! text-olive!">Última actualización: 22 de noviembre de 2026</p>

      <h3>1. Qué es LexCode</h3>
      <p>
        LexCode es un juego educativo gratuito y sin fines de lucro, desarrollado por el Equipo LexCode como proyecto
        escolar de la asignatura {PROJECT.course} ({PROJECT.institution}). Al usarlo aceptas estos términos.
      </p>

      <h3>2. No es asesoría legal</h3>
      <p>
        Los casos y el Manual Jurídico simplifican la ley con fines didácticos. Se verificaron en noviembre de 2026
        contra los textos oficiales vigentes, pero las leyes cambian y cada situación real requiere un análisis propio.
        Para decisiones reales, consulta el texto oficial y a una persona profesional del derecho.
      </p>

      <h3>3. Contenido ficticio</h3>
      <p>
        NovaByte Solutions, el municipio de Valle Esmeralda, sus productos y todas las personas de los casos son
        ficticios. Cualquier parecido con personas, empresas o autoridades reales es coincidencia.
      </p>

      <h3>4. Uso aceptable</h3>
      <ul>
        <li>Usa un alias respetuoso. No escribas datos personales de otras personas ni contenido ofensivo.</li>
        <li>No intentes alterar el juego para afectar a otras personas usuarias ni presentarlo como un producto oficial.</li>
      </ul>

      <h3>5. Reconocimiento final</h3>
      <p>
        Al terminar se genera un reconocimiento simbólico. <strong>No tiene validez legal, oficial ni académica</strong>{' '}
        y no debe presentarse como constancia, certificado escolar ni comprobante de estudios.
      </p>

      <h3>6. Propiedad intelectual</h3>
      <ul>
        <li>
          Código fuente: {OWN_LICENSES.code.id}. Contenido didáctico: {OWN_LICENSES.content.id}. Puedes reutilizarlos
          respetando esas licencias.
        </li>
        <li>
          Los logotipos de la UTEZ y de la DATID son marcas de la universidad, excluidas de esas licencias. Los recursos de
          terceros se usan conforme a sus licencias (ver Créditos y PI).
        </li>
      </ul>

      <h3>7. Privacidad</h3>
      <p>
        El tratamiento de tu alias se rige por el Aviso de Privacidad. Tus datos solo se guardan en tu navegador y puedes
        borrarlos en cualquier momento.
      </p>

      <h3>8. Sin garantía</h3>
      <p>
        El juego se ofrece «tal cual», sin garantía de disponibilidad ni de ausencia de errores, conforme a la licencia
        GPLv3.
      </p>

      <h3>9. Cambios y contacto</h3>
      <p>
        Cualquier cambio a estos términos se publicará aquí con su fecha. Para dudas o reportes, usa la sección de Issues
        del repositorio{' '}
        <a href={PROJECT.repoUrl} target="_blank" rel="noreferrer">
          {PROJECT.repoUrl.replace('https://', '')}
        </a>
        .
      </p>
    </div>
  );
}
