import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allLeads, priorityDotColors } from './rna.js';

function AvatarIcon({ avatarColor, iconColor }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 12, background: avatarColor,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    </div>
  );
}

export default function RecommendedNextAction() {
  const navigate = useNavigate();
  const [calledIds, setCalledIds] = useState([]);

  const toggleCall = (id) => {
    setCalledIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const topLeads = allLeads.slice(0, 3);

  return (
    <div className="soft-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Recommended Next Actions</h3>
        <span
          onClick={() => navigate('/all-recommends')}
          style={{ fontSize: 12, cursor: 'pointer', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.04em' }}
        >
          View All
        </span>
      </div>

      {/* Top 3 leads */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {topLeads.map((lead) => {
          const isCalled = calledIds.includes(lead.id);
          return (
            <div
              key={lead.id}
              style={{
                background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 12,
                padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 16,
              }}
            >
              <AvatarIcon avatarColor={lead.avatarColor} iconColor={lead.iconColor} />

              <div style={{ minWidth: 180, flexShrink: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>{lead.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{lead.company}</div>
              </div>

              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: priorityDotColors[lead.priority], flexShrink: 0,
              }} title={`Priority: ${lead.priority}`} />

              <div style={{ flex: 1, fontSize: 13, color: 'var(--text-sec)', lineHeight: 1.4, paddingRight: 16 }}>
                {lead.reason}
              </div>

              <button
                onClick={() => toggleCall(lead.id)}
                style={{
                  padding: '8px 16px', borderRadius: 8, border: 'none', fontSize: 13,
                  fontWeight: 600, cursor: 'pointer', minWidth: 110,
                  background: isCalled ? 'var(--surface3)' : 'var(--accent)',
                  color: isCalled ? 'var(--muted)' : 'var(--text-inverse)',
                  boxShadow: isCalled ? 'none' : 'var(--shadow-base)',
                }}
              >
                {isCalled ? '✓ Called' : 'Initiate Call'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}