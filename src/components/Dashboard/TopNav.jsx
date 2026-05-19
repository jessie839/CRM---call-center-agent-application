import React from 'react';

export default function TopNav() {
  return (
    <header className="top-nav">
      <div className="nav-search">
        <input type="text" placeholder="Search records, contacts, calls..." />
      </div>
      <div className="nav-actions">
        <div className="agent-status">
          <span className="status-dot"></span>
          Ready to Call
        </div>
        <div style={{width: 32, height: 32, background: 'var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600}}>JD</div>
      </div>
    </header>
  );
}
