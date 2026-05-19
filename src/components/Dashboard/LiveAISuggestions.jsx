import React from 'react';

export default function LiveAISuggestions() {
  return (
    <div className="soft-card">
      <div className="soft-card-title">
        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <svg width="18" height="18" stroke="var(--muted)" viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          Live AI Diagnostics
        </div>
      </div>
      
      <div className="circular-grid">
        
        <div className="circular-row">
          <div className="circ-desc">
            <div className="circ-title">Customer Sentiment</div>
            <div className="circ-meta">
              <span>Level:</span>
              <span style={{color: 'var(--warning)', fontWeight: 600}}>Neutral</span>
            </div>
          </div>
          <div className="circ-chart">
            <svg viewBox="0 0 36 36">
              <path className="circ-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circ-fg" strokeDasharray="50, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="circ-val">50<span style={{fontSize:10}}>%</span></div>
          </div>
        </div>

        <div className="circular-row">
          <div className="circ-desc">
            <div className="circ-title">Intent Detection Risk</div>
            <div className="circ-meta">
              <span>Level:</span>
              <span style={{color: 'var(--success)', fontWeight: 600}}>Low</span>
            </div>
            <div className="circ-meta" style={{marginTop: 6}}>No escalation patterns</div>
          </div>
          <div className="circ-chart">
            <svg viewBox="0 0 36 36">
              <path className="circ-bg" stroke="var(--surface2)" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circ-fg" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" fill="none" strokeDasharray="12, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="circ-val">12<span style={{fontSize:10}}>%</span></div>
          </div>
        </div>

        <div className="circular-row">
          <div className="circ-desc">
            <div className="circ-title">Script Adherence</div>
            <div className="circ-meta">
              <span>Level:</span>
              <span style={{color: 'var(--accent)', fontWeight: 600}}>High</span>
            </div>
            <div className="circ-meta" style={{marginTop: 6}}>Pitch delivered perfectly</div>
          </div>
          <div className="circ-chart">
            <svg viewBox="0 0 36 36">
              <path className="circ-bg" stroke="var(--surface2)" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circ-fg" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" fill="none" strokeDasharray="88, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="circ-val">88<span style={{fontSize:10}}>%</span></div>
          </div>
        </div>

      </div>
    </div>
  );
}
