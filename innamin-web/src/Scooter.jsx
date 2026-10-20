// A delivery scooter facing right, drawn in Maryland's colours.
// The wheels have the class "wheel" so the stylesheet can spin them.

const LINE = {
  stroke: "#000",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Wheel({ cx, cy }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className="wheel" {...LINE}>
        <circle r="12" fill="#fff" />
        <path d="M-8 0 H8 M0 -8 V8" strokeWidth="2.5" />
      </g>
      <circle r="3.5" fill="#000" />
    </g>
  );
}

export default function Scooter({ className = "" }) {
  return (
    <svg
      className={`scooter ${className}`.trim()}
      viewBox="0 -8 132 92"
      aria-hidden="true"
      focusable="false"
    >
      <Wheel cx="30" cy="68" />
      <Wheel cx="104" cy="68" />

      <g {...LINE}>
        {/* speed lines */}
        <path className="speed" d="M2 56 H12 M0 64 H8" strokeWidth="2.5" />

        {/* delivery box on a rack at the back */}
        <path d="M24 46 H44" strokeWidth="4" />
        <rect x="6" y="12" width="38" height="32" rx="4" fill="#ffc72c" />
        <path d="M6 24 H44" strokeWidth="2.5" />
        <circle cx="25" cy="34" r="4.5" fill="#ba0c2f" strokeWidth="2.5" />

        {/* rider: leg, jacket, arm, helmet */}
        <path d="M52 38 L76 46 L80 60" fill="none" stroke="#000" strokeWidth="7" />
        <path d="M46 38 L52 12 C54 4 66 4 68 12 L66 38 Z" fill="#ffc72c" />
        <path d="M64 16 L94 26" fill="none" strokeWidth="4.5" />
        <circle cx="62" cy="-1" r="8" fill="#fff" />
        <path d="M54 -1 C54 -10 70 -10 70 -1 Z" fill="#ba0c2f" strokeWidth="2.5" />

        {/* seat and body */}
        <rect x="40" y="36" width="30" height="7" rx="3.5" fill="#000" />
        <path d="M20 58 C14 48 26 44 42 44 H70 L76 62 H44 C38 62 34 58 28 58 Z" fill="#ba0c2f" />
        <path d="M66 60 H96 V67 H70 Z" fill="#ba0c2f" />

        {/* front: leg shield, handlebar, headlight, mudguard */}
        <path d="M86 62 L92 28 H99 L96 62 Z" fill="#ba0c2f" />
        <path d="M89 24 H101" strokeWidth="4.5" />
        <circle cx="104" cy="32" r="5.5" fill="#ffc72c" strokeWidth="2.5" />
        <path d="M94 56 C98 50 112 50 116 60" fill="none" strokeWidth="5" />
      </g>
    </svg>
  );
}