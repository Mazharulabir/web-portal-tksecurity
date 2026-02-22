export default function TKLogo({ className = 'w-11 h-11' }) {
  return (
    <svg
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer shield */}
      <path
        d="M50 2 L95 25 L95 65 Q95 95 50 113 Q5 95 5 65 L5 25 Z"
        fill="#0f172a"
        stroke="#3b82f6"
        strokeWidth="3"
      />
      {/* Inner shield */}
      <path
        d="M50 10 L87 30 L87 63 Q87 88 50 105 Q13 88 13 63 L13 30 Z"
        fill="#1e293b"
        stroke="#60a5fa"
        strokeWidth="2"
      />
      {/* Inner glow fill */}
      <path
        d="M50 16 L81 33 L81 61 Q81 83 50 99 Q19 83 19 61 L19 33 Z"
        fill="url(#shieldGrad)"
      />
      {/* T letter */}
      <rect x="25" y="38" width="30" height="6" rx="1" fill="#0f172a" />
      <rect x="37" y="38" width="6" height="28" rx="1" fill="#0f172a" />
      {/* K letter */}
      <rect x="58" y="38" width="6" height="28" rx="1" fill="#0f172a" />
      <polygon points="64,52 78,38 72,38 64,47" fill="#0f172a" />
      <polygon points="64,52 78,66 72,66 64,57" fill="#0f172a" />
      {/* SECURITY INC text */}
      <text
        x="50"
        y="80"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="#0f172a"
        fontFamily="Arial, sans-serif"
        letterSpacing="1.5"
      >
        SECURITY INC
      </text>
      {/* Gradient definition */}
      <defs>
        <linearGradient id="shieldGrad" x1="19" y1="16" x2="81" y2="99" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
      </defs>
    </svg>
  )
}
