import React from 'react';

export default function TopKPIs() {
  return (
    <div className="kpi-row">

      <div className="kpi-card">
        <div className="kpi-h">
          <svg width="16" height="16" stroke="var(--muted)" viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          Calls Handled
        </div>
        <div className="kpi-body">
          <span className="val">165</span>
          <span className="unit">calls</span>
          <span className="kpi-badge up" style={{ marginLeft: 'auto' }}>-5%</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-h">
          <svg width="16" height="16" stroke="var(--muted)" viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          First Call Resolution
        </div>
        <div className="kpi-body">
          <span className="val">87</span>
          <span className="unit">%</span>
          <span className="kpi-badge up" style={{ marginLeft: 'auto' }}>+2.1%</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-h">
          <svg width="16" height="16" stroke="var(--muted)" viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Avg Handle Time
        </div>
        <div className="kpi-body">
          <span className="val">140</span>
          <span className="unit">sec</span>
          <span className="kpi-badge down" style={{ marginLeft: 'auto' }}>+2.4%</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-h">
          <svg width="16" height="16" stroke="var(--muted)" viewBox="0 0 24 24" fill="none" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          CSAT Score
        </div>
        <div className="kpi-body">
          <span className="val">94</span>
          <span className="unit">%</span>
          <span className="kpi-badge up" style={{ marginLeft: 'auto' }}>+1.9%</span>
        </div>
      </div>

    </div>
  );
}
