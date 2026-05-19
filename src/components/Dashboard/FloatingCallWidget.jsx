import React, { useState } from 'react';
import { useCallState } from '../../context/callstate.context';

export default function FloatingCallWidget({ onMaximize }) {
  const { callState, setCallState } = useCallState();
  const [position, setPosition] = useState({ x: window.innerWidth - 340, y: window.innerHeight - 160 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      className="floating-call-widget soft-card"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 9999,
        width: 300,
        padding: '16px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        height: 'fit-content'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <div className="pulse-dot" style={{width: 8, height: 8}}></div>
          <span style={{fontSize: 12, fontWeight: 700, color: 'var(--accent)'}}>Active Call</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onMaximize(); }} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 4}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </button>
      </div>

      <div style={{marginBottom: 16}}>
        <div style={{fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 2}}>{callState.leadName}</div>
        <div style={{fontSize: 13, color: 'var(--muted)'}}>{callState.duration || '00:14'}</div>
      </div>

      <div style={{display: 'flex', gap: 8}}>
        <button className="btn-mute" style={{flex: 1, padding: '8px 0'}}>Mute</button>
        <button 
          className="btn-end-call" 
          style={{flex: 1, padding: '8px 0'}} 
          onClick={(e) => { e.stopPropagation(); setCallState({...callState, isActive: false}); }}
        >
          End Call
        </button>
      </div>
    </div>
  );
}
