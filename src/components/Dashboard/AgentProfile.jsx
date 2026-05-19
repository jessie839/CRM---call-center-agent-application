import React from 'react';

export default function AgentProfile() {
  return (
    <div className="soft-card">
      <div className="agent-header">
        <div className="agent-avatar">
          {/* Mock Avatar */}
          <div style={{background: '#c7d2fe', width: '100%', height: '100%'}}></div>
          <span className="status-pill-absolute">In-Call</span>
        </div>
        <div className="agent-info">
          <h2>Arthur Tailor</h2>
          <p>Agent ID: 0693, Tier 1</p>
        </div>
        <div className="agent-action-btns">
          <div className="btn-sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
          <div className="btn-sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></div>
        </div>
      </div>
      
      <div className="profile-meta-grid">
        <div className="meta-block">
          <span>Primary Queue</span>
          <strong>Inbound Customer Svc</strong>
        </div>
        <div className="meta-block">
          <span>Extension N°</span>
          <strong>#XT12234213</strong>
        </div>
        <div className="meta-block">
          <span>Campaign</span>
          <strong>Aetna Gold Plan</strong>
        </div>
      </div>
    </div>
  );
}
