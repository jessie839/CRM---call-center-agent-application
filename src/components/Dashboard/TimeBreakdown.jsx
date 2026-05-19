import React from 'react';

export default function TimeBreakdown() {
  return (
    <div className="soft-card">
      <div className="soft-card-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="18" height="18" stroke="var(--muted)" viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          Time Breakdown
        </div>
      </div>

      <div className="progress-list">

        <div className="prog-item">
          <div className="prog-header">
            <span className="prog-title">Login Hours</span>
            <span className="prog-val">6.0 <strong>/ 8.0 hrs</strong></span>
          </div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: '75%', background: 'linear-gradient(90deg, #60a5fa, var(--accent))' }}></div>
          </div>
        </div>

        <div className="prog-item">
          <div className="prog-header">
            <span className="prog-title">Handle time</span>
            <span className="prog-val">6.0 <strong>/ 8.0 hrs</strong></span>
          </div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: '75%', background: 'linear-gradient(90deg, #60a5fa, var(--accent))' }}></div>
          </div>
        </div>

        <div className="prog-item">
          <div className="prog-header">
            <span className="prog-title">Talk time</span>
            <span className="prog-val">2.0 <strong>/ 8.0 hrs</strong></span>
          </div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: '25%', background: 'linear-gradient(90deg, #60a5fa, var(--accent))' }}></div>
          </div>
        </div>

        <div className="prog-item">
            <div className="prog-header">
            <span className="prog-title">Idle Hours</span>
            <span className="prog-val"><strong>2.0 hrs</strong></span>
          </div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: '60%', background: 'linear-gradient(90deg, #cbd5e1, var(--muted))' }}></div>
          </div>
        </div>

        <div className="prog-item">
          <div className="prog-header">
            <span className="prog-title">ACW Time</span>
            <span className="prog-val">45 <strong>/ 60 mins</strong></span>
          </div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: '75%', background: 'linear-gradient(90deg, #fcd34d, var(--accent))' }}></div>
          </div>
        </div>

        <div className="prog-item">
          <div className="prog-header">
            <span className="prog-title">Break Time</span>
            <span className="prog-val">15 <strong>/ 45 mins</strong></span>
          </div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: '33%', background: 'linear-gradient(90deg, #fca5a5, var(--accent))' }}></div>
          </div>
        </div>

      </div>
    </div>
  );
}
