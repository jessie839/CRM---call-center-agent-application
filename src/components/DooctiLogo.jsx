export default function DooctiLogo({ className = "", color = "var(--accent)" }) {
  return (
    <svg className={className} width="110" height="32" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="32" fontFamily="Inter, sans-serif" fontSize="34" fontWeight="600" fill={color} letterSpacing="-1">do</text>
      <g transform="translate(46, 12)">
        <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="2.5" />
        <path d="M4 14 C7 17 13 17 16 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="7" r="1.5" fill={color} />
        <path d="M21 5 L24 7 L21 9 Z" fill={color} />
      </g>
      <text x="80" y="32" fontFamily="Inter, sans-serif" fontSize="34" fontWeight="600" fill={color} letterSpacing="-1">cti</text>
    </svg>
  );
}
