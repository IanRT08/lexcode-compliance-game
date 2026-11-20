/** Insignia original de LexCode (SVG propio, GPL-3.0-or-later). */
export default function LexBadge({ className = 'size-10', title = 'Insignia de LexCode' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id="lexShield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <path
        d="M32 4 8 13v17c0 15 10.2 26.4 24 30 13.8-3.6 24-15 24-30V13L32 4Z"
        fill="url(#lexShield)"
        stroke="#5eead4"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="m24 24-7 8 7 8M40 24l7 8-7 8"
        fill="none"
        stroke="#ecfeff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m35 21-6 22" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
