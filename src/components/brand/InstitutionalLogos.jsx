/**
 * Logotipos institucionales de la UTEZ y de su División Académica de Tecnologías de la
 * Información y Diseño (DATID). Son marcas propiedad de la UTEZ, proporcionadas por la
 * universidad al equipo para trabajos académicos: se usan sin modificar, solo para
 * identificar el origen académico del proyecto, y NO están cubiertos por las
 * licencias GPL/CC de LexCode (ver Créditos y README).
 * Se muestran sobre papel porque sus colores están pensados para fondo claro.
 */
export default function InstitutionalLogos({ className = '', compact = false }) {
  const h = compact ? 'h-9' : 'h-12 sm:h-14';
  return (
    <div className={`paper flex items-center gap-4 px-4 py-2.5 ${className}`}>
      <img
        src="/assets/institucional/utez-logo.png"
        alt="Universidad Tecnológica Emiliano Zapata del Estado de Morelos (UTEZ)"
        className={`${h} w-auto`}
        width={1053}
        height={641}
      />
      <span className="h-8 w-px bg-sage" aria-hidden="true" />
      <img
        src="/assets/institucional/datid-logo.png"
        alt="División Académica de Tecnologías de la Información y Diseño"
        className={`${h} w-auto`}
        width={1880}
        height={524}
      />
    </div>
  );
}
