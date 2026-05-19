

import React from 'react';

export default function AIInsights() {
  return (
    <div
      className="soft-card"
      style={{
        height: '100%',
        background: 'linear-gradient(135deg, var(--accent-2), var(--accent))',
        border: 'none',
        color: 'var(--text-inverse)'
      }}
    >
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          margin: '0 0 12px 0',
          color: 'var(--text-inverse)',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}
      >
        AI Assistant Report
      </h3>

      <div
        style={{
          fontSize: 14,
          color: 'var(--text-inverse)',
          opacity: 0.9,
          lineHeight: '1.6',
          fontWeight: 500
        }}
      >
        The assistant has identified{' '}
        <strong style={{ color: 'var(--text-inverse)' }}>
          three active opportunities
        </strong>{' '}
        that necessitate immediate agent intervention.
        <br /><br />

        <div
          style={{
            padding: '10px 14px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(6px)',
            borderRadius: 10,
            border: '1px solid rgba(255, 255, 255, 0.3)',
            fontSize: 13,
            color: 'var(--text-inverse)'
          }}
        >
          <span style={{ fontWeight: 700, color: 'var(--text-inverse)' }}>
            Meeting alert:
          </span>{' '}
          Meeting with jon doe is in 10 minutes
        </div>
      </div>
    </div>
  );
}
