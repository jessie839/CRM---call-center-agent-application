import React from 'react';
import { useNavigate } from 'react-router-dom';
import { allActivities, statusConfig, typeConfig, typeIcons } from './calllogData.js';

export default function LatestActivity() {
  const navigate = useNavigate();
  const topActivities = allActivities.slice(0, 2);

  return (
    <div className="soft-card" style={{ height: '100%' }}>
      <h3 className="soft-card-title" style={{ marginBottom: 24, fontSize: 16 }}>
        Latest Activity{' '}
        <span
          className="link-text"
          style={{ fontSize: 12, cursor: 'pointer' }}
          onClick={() => navigate('/activity')}
        >
          View All
        </span>
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {topActivities.map(log => {
          const s = statusConfig[log.status];
          const t = typeConfig[log.type];
          const iconPath = typeIcons[log.type];
          return (
            <div key={log.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px', background: 'var(--surface2)', borderRadius: 12, border: '1px solid var(--surface2)',
            }}>
              <div className="li-content" style={{ gap: 16 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', background: 'var(--surface)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexShrink: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2.5">
                    <path d={iconPath} />
                  </svg>
                </div>
                <div>
                  <span className="li-text" style={{ fontSize: 14, fontWeight: 600 }}>{log.title}</span>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{log.type}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-main)' }}>{log.time}</div>
                <div style={{ fontSize: 11, color: s.color, fontWeight: 600 }}>{s.label.toUpperCase()}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}