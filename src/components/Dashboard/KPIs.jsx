import React from 'react';

export default function KPIs() {
  return (
    <div className="dash-card">
      <h3>Performance Overview</h3>
      <div className="kpi-grid">
        <div className="kpi-item">
          <span className="kpi-label">Calls Handled</span>
          <span className="kpi-value">142</span>
          <span className="kpi-trend up">↑ 12% today</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-label">Avg. Handle Time</span>
          <span className="kpi-value">4m 12s</span>
          <span className="kpi-trend down">↓ 15s</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-label">Conversion Rate</span>
          <span className="kpi-value">24%</span>
          <span className="kpi-trend up">↑ 2.1%</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-label">CSAT Score</span>
          <span className="kpi-value">4.8/5</span>
          <span className="kpi-trend up">↑ 0.2</span>
        </div>
      </div>
    </div>
  );
}
