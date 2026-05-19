import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const statuses = [
  { id: 'oncall', label: 'Oncall', color: 'var(--success)' }, // green
  { id: 'meeting', label: 'Meeting', color: 'var(--warning)' }, // yellow
  { id: 'break', label: 'Break', color: 'var(--danger)' } // red
];

const BREAK_DURATION = 15 * 60;

export default function ProfileStatusDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState(statuses[0]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Timer Effect
  useEffect(() => {
    let timer;

    if (activeStatus.id === 'break') {
      // Countdown timer
      timer = setInterval(() => {
        setTimeElapsed(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);

    } else {
      // Count up timer
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [activeStatus]);

  // Handle external clicks to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = (status) => {
    setActiveStatus(status);

    if (status.id === 'break') {
      setTimeElapsed(BREAK_DURATION);
    } else {
      setTimeElapsed(0);
    }

    setIsOpen(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    const h = Math.floor(seconds / 3600);
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m}:${s}`;
    return `${m}:${s}`;
  };

  return (
    <div className="profile-status-wrapper" ref={dropdownRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>

      {/* Current Status Badge (Visible Next to Avatar) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'var(--surface2)', padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--border)' }} onClick={() => setIsOpen(!isOpen)}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: activeStatus.color }}></div>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-sec)' }}>{activeStatus.label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-main)', fontVariantNumeric: 'tabular-nums', width: '40px' }}>{formatTime(timeElapsed)}</span>
      </div>

      {/* Profile Toggle */}
      <div
        onClick={() => navigate('/profile')}
        style={{
          width: 40, height: 40, borderRadius: '50%', cursor: 'pointer',
          background: `url('https://i.pravatar.cc/150?img=33') center/cover`,
          border: '2px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'relative', top: "-1px", left: "1px"
        }}
      >
        <div style={{
          position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: '50%',
          background: activeStatus.color, border: '2px solid white'
        }}></div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute', cursor: 'pointer', top: '56px', right: '0', background: 'white', width: 220,
          borderRadius: 12, boxShadow: '0 12px 32px rgba(0,0,0,0.12)', border: '1px solid var(--surface2)', zIndex: 1000, overflow: 'hidden'
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--surface2)', background: 'var(--surface2)' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>Agent Settings</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Manage your availability</div>
          </div>
          <div style={{ padding: '8px' }}>
            {statuses.map(s => (
              <div
                key={s.id}
                onClick={() => handleStatusChange(s)}
                style={{
                  padding: '10px 12px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12,
                  background: activeStatus.id === s.id ? '#f0f7ff' : 'transparent',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => { if (activeStatus.id !== s.id) e.currentTarget.style.background = 'var(--surface3)' }}
                onMouseOut={(e) => { if (activeStatus.id !== s.id) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }}></div>
                <span style={{ fontSize: 13, fontWeight: 500, color: activeStatus.id === s.id ? 'var(--accent)' : 'var(--text-sec)' }}>
                  {s.label}
                </span>
                {activeStatus.id === s.id && (
                  <svg style={{ marginLeft: 'auto' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
