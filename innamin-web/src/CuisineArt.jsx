// Original illustrations, one per kind of food. Each is drawn on a 96 x 96 grid
// using only Maryland's colours, with the same thick black outline as our buttons.
// To add a new one: write a small component below, add it to PICTURES, then add a
// line to KEYWORDS saying which cuisine names should use it.

const LINE = {
  stroke: "#000",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const GOLD = "#ffc72c";
const RED = "#ba0c2f";
const WHITE = "#fff";
const BLACK = "#000";

function Pizza() {
  return (
    <g {...LINE}>
      <path d="M14 26 L82 26 L48 86 Z" fill={GOLD} />
      <rect x="10" y="16" width="76" height="14" rx="7" fill={WHITE} />
      <circle cx="36" cy="44" r="7" fill={RED} />
      <circle cx="58" cy="42" r="6.5" fill={RED} />
      <circle cx="47" cy="63" r="6" fill={RED} />
      <circle cx="50" cy="50" r="1.5" fill={BLACK} />
      <circle cx="42" cy="32" r="1.5" fill={BLACK} />
      <circle cx="30" cy="34" r="1.5" fill={BLACK} />
    </g>
  );
}

function Taco() {
  return (
    <g {...LINE} transform="rotate(-10 48 48)">
      <path d="M6 44 q5 -16 12 -5 q5 -16 12 -4 q5 -16 12 -3 q5 -16 12 -2 q5 -16 12 -1 q5 -14 12 0 q5 -6 8 12 Z" fill={WHITE} />
      <rect x="22" y="26" width="10" height="10" rx="1.5" fill={RED} transform="rotate(-14 27 31)" strokeWidth="2.5" />
      <rect x="50" y="22" width="10" height="10" rx="1.5" fill={RED} transform="rotate(12 55 27)" strokeWidth="2.5" />
      <rect x="68" y="28" width="10" height="10" rx="1.5" fill={RED} transform="rotate(-8 73 33)" strokeWidth="2.5" />
      <path d="M6 46 H90 A42 36 0 0 1 6 46 Z" fill={GOLD} />
      <path d="M18 62 A34 24 0 0 0 40 76" fill="none" strokeWidth="2.5" />
      <circle cx="52" cy="62" r="1.8" fill={BLACK} />
      <circle cx="66" cy="56" r="1.8" fill={BLACK} />
      <circle cx="60" cy="70" r="1.8" fill={BLACK} />
    </g>
  );
}

function Curry() {
  return (
    <g {...LINE}>
      <path d="M36 28 q-7 -6 0 -12 q7 -6 0 -12" fill="none" />
      <path d="M50 30 q-7 -6 0 -12 q7 -6 0 -12" fill="none" />
      <path d="M64 28 q-7 -6 0 -12 q7 -6 0 -12" fill="none" />
      <path d="M10 46 H86 C86 68 70 82 48 82 C26 82 10 68 10 46 Z" fill={RED} />
      <ellipse cx="48" cy="46" rx="38" ry="9" fill={GOLD} />
      <path d="M32 46 q8 -4 16 0 q8 4 16 0" fill="none" strokeWidth="2.5" stroke={WHITE} />
      <path d="M32 86 H64" />
    </g>
  );
}

function Burger() {
  return (
    <g {...LINE}>
      <path d="M14 38 C14 14 82 14 82 38 Z" fill={GOLD} />
      <ellipse cx="34" cy="26" rx="2.6" ry="1.6" fill={WHITE} strokeWidth="1.5" />
      <ellipse cx="50" cy="22" rx="2.6" ry="1.6" fill={WHITE} strokeWidth="1.5" />
      <ellipse cx="64" cy="28" rx="2.6" ry="1.6" fill={WHITE} strokeWidth="1.5" />
      <path d="M10 42 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0" fill={WHITE} />
      <rect x="14" y="50" width="68" height="10" rx="3" fill={RED} />
      <rect x="12" y="60" width="72" height="12" rx="6" fill={BLACK} />
      <path d="M14 74 H82 V78 C82 84 78 86 72 86 H24 C18 86 14 84 14 78 Z" fill={GOLD} />
    </g>
  );
}

function Takeout() {
  return (
    <g {...LINE}>
      <path d="M30 34 L12 8 M38 34 L22 6" />
      <path d="M34 28 C32 4 64 4 62 28" fill="none" />
      <path d="M20 38 H76 L68 86 H28 Z" fill={RED} />
      <path d="M12 40 L26 26 H70 L84 40 Z" fill={WHITE} />
      <path d="M48 26 V40" fill="none" strokeWidth="2.5" />
      <circle cx="48" cy="62" r="13" fill={WHITE} />
      <path d="M39 59 H57 C57 67 53 71 48 71 C43 71 39 67 39 59 Z" fill={GOLD} strokeWidth="2.5" />
    </g>
  );
}

function Sushi() {
  return (
    <g {...LINE}>
      <rect x="12" y="52" width="72" height="26" rx="13" fill={WHITE} />
      <path d="M8 52 C8 30 88 30 88 52 C88 58 82 60 78 60 H18 C12 60 8 58 8 52 Z" fill={RED} />
      <path d="M26 42 q4 6 2 14 M44 38 q4 8 2 18 M62 40 q4 6 2 16" fill="none" stroke={WHITE} strokeWidth="2.5" />
      <rect x="42" y="38" width="12" height="42" rx="2" fill={BLACK} />
    </g>
  );
}

function Noodles() {
  return (
    <g {...LINE}>
      <path d="M62 8 L42 44 M72 12 L50 46" />
      <path d="M10 48 H86 C86 70 70 84 48 84 C26 84 10 70 10 48 Z" fill={GOLD} />
      <ellipse cx="48" cy="48" rx="38" ry="8" fill={WHITE} />
      <path d="M20 47 q4 -5 8 0 t8 0 M52 49 q4 -5 8 0 t8 0" fill="none" strokeWidth="2.5" />
      <circle cx="42" cy="48" r="4.5" fill={RED} strokeWidth="2.5" />
      <path d="M32 88 H64" />
    </g>
  );
}

function Cupcake() {
  return (
    <g {...LINE}>
      <path d="M22 50 H74 L66 86 H30 Z" fill={RED} />
      <path d="M36 52 L40 86 M48 52 V86 M60 52 L56 86" fill="none" strokeWidth="2" />
      <path d="M16 52 C10 34 28 28 30 20 C32 8 62 8 66 20 C70 28 86 34 80 52 Z" fill={WHITE} />
      <path d="M28 40 q10 6 20 0 q10 6 20 0" fill="none" strokeWidth="2.5" />
      <circle cx="48" cy="9" r="6" fill={RED} />
    </g>
  );
}

function Coffee() {
  return (
    <g {...LINE}>
      <path d="M36 24 q-6 -6 0 -12 M50 24 q-6 -6 0 -12 M64 24 q-6 -6 0 -12" fill="none" />
      <path d="M16 34 H72 V58 C72 74 62 82 44 82 C26 82 16 74 16 58 Z" fill={GOLD} />
      <path d="M72 42 H80 C88 42 88 62 78 62 H72" fill="none" />
      <path d="M16 34 H72" strokeWidth="5" />
      <path d="M30 56 q6 8 14 0" fill="none" strokeWidth="2.5" />
      <path d="M8 90 H80" />
    </g>
  );
}

function Plate() {
  return (
    <g {...LINE}>
      <circle cx="48" cy="48" r="32" fill={WHITE} />
      <circle cx="48" cy="48" r="20" fill={GOLD} />
      <circle cx="48" cy="48" r="7" fill={RED} />
      <path d="M8 18 V36 M14 18 V36 M20 18 V36 M8 36 H20 V40 H14 V80" fill="none" strokeWidth="2.5" />
      <path d="M86 18 C78 24 78 38 86 42 V80" fill="none" strokeWidth="2.5" />
    </g>
  );
}

// Looks at the cuisine name and picks the best picture. Anything unknown gets the plate.
const PICTURES = {
  pizza: <Pizza />,
  taco: <Taco />,
  curry: <Curry />,
  burger: <Burger />,
  takeout: <Takeout />,
  sushi: <Sushi />,
  noodles: <Noodles />,
  cupcake: <Cupcake />,
  coffee: <Coffee />,
  plate: <Plate />,
};

const KEYWORDS = [
  [/pizza|italian/, "pizza"],
  [/mexican|taco|burrito|tex/, "taco"],
  [/indian|curry|pakistani|nepal/, "curry"],
  [/burger|american|sandwich|deli|grill|bbq|wings|chicken/, "burger"],
  [/chinese|asian/, "takeout"],
  [/japan|sushi/, "sushi"],
  [/thai|vietnam|korean|ramen|noodle|pho/, "noodles"],
  [/dessert|bakery|sweet|ice cream|cake|donut/, "cupcake"],
  [/coffee|cafe|caf\u00e9|tea|breakfast|brunch/, "coffee"],
];

function pictureFor(cuisine) {
  const name = (cuisine ?? "").toLowerCase();
  const match = KEYWORDS.find(([pattern]) => pattern.test(name));
  return PICTURES[match ? match[1] : "plate"];
}

export default function CuisineArt({ cuisine, className = "" }) {
  return (
    <svg
      className={`cuisine-art ${className}`.trim()}
      viewBox="0 0 96 96"
      aria-hidden="true"
      focusable="false"
    >
      {pictureFor(cuisine)}
    </svg>
  );
}