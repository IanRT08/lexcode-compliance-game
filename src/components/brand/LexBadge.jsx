/** Insignia original de LexCode (SVG propio, GPL-3.0-or-later). */
export default function LexBadge({ className = 'size-10', title = 'Insignia de LexCode' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title}>
      <path
        d="M32 4 8 13v17c0 15 10.2 26.4 24 30 13.8-3.6 24-15 24-30V13L32 4Z"
        fill="#585E30"
        stroke="#C2996C"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="m24 24-7 8 7 8M40 24l7 8-7 8"
        fill="none"
        stroke="#E8E8E3"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m35 21-6 22" stroke="#C2996C" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
