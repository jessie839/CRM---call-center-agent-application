import React, { useState, useRef, useMemo } from 'react';

// Data Mock Factory
const createPoints = (labels, maxVal) => {
  return labels.map((label, i) => {
    const val = Math.floor(Math.random() * (maxVal - maxVal/3) + maxVal/3);
    return { 
      x: (i / (labels.length - 1)) * 1000, 
      y: 150 - (val / maxVal * 120), // Y is inverted in SVG, padding at top
      label, 
      val 
    };
  });
};

const datasets = {
  Day: createPoints(['9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM'], 120),
  Week: createPoints(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 800),
  Month: createPoints(['Week 1', 'Week 2', 'Week 3', 'Week 4'], 3200),
  Year: createPoints(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 40000)
};

export default function PerformanceChart() {
  const [filter, setFilter] = useState('Week');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoverData, setHoverData] = useState(null);
  
  const svgRef = useRef(null);
  const points = datasets[filter];

  // Generate smooth cubic bezier SVG path
  const splinePath = useMemo(() => {
    if (!points || points.length === 0) return '';
    let path = `M${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const cx = (p1.x + p2.x) / 2;
        path += ` C${cx},${p1.y} ${cx},${p2.y} ${p2.x},${p2.y}`;
    }
    return path;
  }, [points]);

  const fillPath = `${splinePath} L1000,170 L0,170 Z`;

  // Compute interaction logic mapped horizontally
  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    let percentage = (e.clientX - rect.left) / rect.width;
    percentage = Math.max(0, Math.min(percentage, 1)); // Clamp 0-1
    
    // Find closest index
    const index = Math.round(percentage * (points.length - 1));
    setHoverData(points[index]);
  };

  const handleMouseLeave = () => setHoverData(null);

  // Stats calculate
  const totalCalls = points.reduce((acc, p) => acc + p.val, 0);

  return (
    <div className="soft-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, position: 'relative' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>Call Volume Timeline</h3>
        </div>
        
        {/* Filter Dropdown */}
        <div style={{position: 'relative'}}>
          <div 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 13, fontWeight: 600, color: 'var(--text-sec)', cursor: 'pointer' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            {filter}
          </div>
          {isFilterOpen && (
             <div style={{ position: 'absolute', top: 36, right: 0, background: 'var(--surface)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', border: '1px solid var(--surface2)', borderRadius: 12, overflow: 'hidden', zIndex: 10, minWidth: 120 }}>
                {Object.keys(datasets).map(key => (
                  <div 
                    key={key} 
                    onClick={() => { setFilter(key); setIsFilterOpen(false); setHoverData(null); }}
                    style={{ padding: '10px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer', background: filter === key ? '#f0f7ff' : '#fff', color: filter === key ? 'var(--accent)' : 'var(--text-sec)' }}
                  >
                    {key}
                  </div>
                ))}
             </div>
          )}
        </div>
      </div>

      {/* Graph Area */}
      <div style={{ flex: 1, minHeight: 180, position: 'relative' }}>
        <svg 
           ref={svgRef}
           width="100%" height="100%" viewBox="0 -10 1000 180" 
           fill="none" preserveAspectRatio="none"
           onMouseMove={handleMouseMove}
           onMouseLeave={handleMouseLeave}
           style={{ cursor: 'crosshair', pointerEvents: 'all' }}
        >
          {/* Fill Area with Gradient */}
          <defs>
             <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
             </linearGradient>
          </defs>

          {/* Render Curve Fill & Stroke */}
          <path d={fillPath} fill="url(#curveGrad)" />
          <path d={splinePath} stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

          {/* Interactive Hover Mechanics */}
          {hoverData && (
             <>
               {/* Vertical Guidance Line */}
               <line x1={hoverData.x} y1="0" x2={hoverData.x} y2="180" stroke="var(--muted)" strokeWidth="2" strokeDasharray="6 4" />
               {/* Anchor Node Marker */}
               <circle cx={hoverData.x} cy={hoverData.y} r="6" fill="#fff" stroke="var(--accent)" strokeWidth="4" />
             </>
          )}
        </svg>

        {/* Dynamic Canvas CSS Tooltip Map */}
        {hoverData && svgRef.current && (() => {
           // We project tooltip using HTML absolute so it can render text/drop shadows cleanly instead of ugly SVG text bounds
           const rect = svgRef.current.getBoundingClientRect();
           const percentX = hoverData.x / 1000;
           const pxX = percentX * rect.width;
           return (
             <div style={{
                position: 'absolute', top: 10, left: pxX, transform: 'translate(-50%, -100%)',
                pointerEvents: 'none', background: 'var(--text-main)', color: 'var(--text-inverse)', borderRadius: 8, padding: '8px 12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)', minWidth: 100, zIndex: 5,
                animation: 'tabFadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
             }}>
               <div style={{fontSize: 11, color: 'var(--muted)', marginBottom: 2, fontWeight: 600, textTransform: 'uppercase'}}>{hoverData.label}</div>
               <div style={{fontSize: 16, fontWeight: 700, color: 'var(--text-inverse)'}}>{hoverData.val.toLocaleString()} <span style={{fontSize: 12, fontWeight: 400, color: 'var(--muted)'}}>calls</span></div>
               
               {/* Downward triangle pointer */}
               <div style={{
                 position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
                 width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid var(--text-main)'
               }}></div>
             </div>
           );
        })()}
      </div>

      {/* Bottom Key Metric Footer */}
      <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--surface2)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div>
           <div style={{fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5}}>Selected Volume</div>
           <div style={{fontSize: 24, fontWeight: 700, color: 'var(--text-main)'}}>{totalCalls.toLocaleString()}</div>
        </div>
        <div className="kpi-badge up" style={{fontSize: 13, padding: '4px 10px'}}>+4.2% Growth</div>
      </div>
    </div>
  );
}
