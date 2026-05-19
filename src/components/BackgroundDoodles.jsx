export default function BackgroundDoodles() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', 
      overflow: 'hidden', zIndex: -1, pointerEvents: 'none', opacity: 0.12
    }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="telephony-pattern" x="0" y="0" width="250" height="250" patternUnits="userSpaceOnUse">
            {/* Phone Icon */}
            <g transform="translate(20, 20) scale(0.8) rotate(-15)">
                <path d="M10,20 C10,15 15,10 20,10 L25,10 C28,10 30,12 30,15 L30,22 C30,25 28,27 25,27 L22,27 C22,35 28,41 36,41 L39,41 C42,41 44,43 44,46 L44,53 C44,56 42,58 39,58 L34,58 C22,58 10,46 10,34 Z" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            {/* Chat Bubble */}
            <g transform="translate(150, 40) scale(0.7) rotate(10)">
                <path d="M20,10 L60,10 C65,10 70,15 70,20 L70,45 C70,50 65,55 60,55 L35,55 L20,70 L20,55 C15,55 10,50 10,45 L10,20 C10,15 15,10 20,10 Z" fill="none" stroke="#24BB96" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="25" cy="32" r="2.5" fill="#24BB96"/>
                <circle cx="40" cy="32" r="2.5" fill="#24BB96"/>
                <circle cx="55" cy="32" r="2.5" fill="#24BB96"/>
            </g>
            {/* Headset */}
            <g transform="translate(40, 140) scale(0.9) rotate(5)">
                <path d="M10,30 C10,10 30,10 50,10 C70,10 90,10 90,30 L90,45 C90,55 80,65 70,65 L60,65 C55,65 50,60 50,55 L50,45 C50,40 55,35 60,35 L70,35 L70,30 C70,20 50,20 50,20 C50,20 30,20 30,30 L30,35 L40,35 C45,35 50,40 50,45 L50,55 C50,60 45,65 40,65 L30,65 C20,65 10,55 10,45 Z" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M60,55 L30,65" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
            </g>
            {/* Signal Bars */}
            <g transform="translate(200, 170) scale(0.8)">
                <path d="M10,40 L10,50 M20,30 L20,50 M30,20 L30,50 M40,10 L40,50" stroke="#24BB96" strokeWidth="3.5" strokeLinecap="round"/>
            </g>
            {/* Simple Nodes/Dots */}
            <circle cx="120" cy="110" r="3" fill="#24BB96" opacity="0.6"/>
            <circle cx="210" cy="100" r="4.5" fill="none" stroke="var(--accent)" strokeWidth="2" opacity="0.7"/>
            <circle cx="90" cy="210" r="2.5" fill="var(--accent)" opacity="0.8"/>
            
            <g transform="translate(120, 190) scale(0.7) rotate(-20)">
               <path d="M10,30 Q30,10 50,30 T90,30" fill="none" stroke="#24BB96" strokeWidth="3" strokeLinecap="round"/>
            </g>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#telephony-pattern)" />
      </svg>
    </div>
  );
}
