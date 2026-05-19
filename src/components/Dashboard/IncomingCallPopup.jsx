import React, { useState, useRef, useEffect } from 'react';
import { useCallState } from '../../context/callstate.context';
import '../../styles/IncomingCallPopup.css';

export default function IncomingCallPopup() {
  const { callState, setCallState } = useCallState();
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 160, y: 40 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Center popup when screen resizes or on first render
  useEffect(() => {
    const handleResize = () => setPosition(prev => ({ ...prev, x: window.innerWidth / 2 - 160 }));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!callState.isIncoming || callState.incomingMinimized) return null;

  const data = callState.incomingData || { name: 'Unknown Caller', phone: 'Unknown', avatar: '?' };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (isDragging.current) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    e.target.releasePointerCapture(e.pointerId);
  };

  const handleAccept = () => {
    setCallState({
      ...callState,
      isIncoming: false,
      incomingMinimized: false,
      isActive: true,
      leadName: data.name,
      phone: data.phone,
      duration: '00:00'
    });
  };

  const handleReject = () => {
    // Declines call fully, no notification left on tab
    setCallState({
      ...callState,
      isIncoming: false,
      incomingMinimized: false,
    });
  };

  const handleClose = () => {
    // Minimizes call, leaves it ringing in background, shows notification dot
    setCallState({
      ...callState,
      incomingMinimized: true,
    });
  };

  return (
    <div 
      className="incoming-popup"
      style={{ left: position.x, top: position.y }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="inc-header">
        <span className="inc-title">Incoming Call</span>
        <button className="inc-close" onPointerDown={e => e.stopPropagation()} onClick={handleClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div className="inc-body">
        <div className="inc-avatar-pulse">
           <div className="inc-avatar">{data.avatar}</div>
        </div>
        <div className="inc-details">
          <div className="inc-name">{data.name}</div>
          <div className="inc-phone">{data.phone}</div>
        </div>
      </div>
      <div className="inc-actions">
        <button className="inc-btn reject" onPointerDown={e => e.stopPropagation()} onClick={handleReject}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line></svg>
          Decline
        </button>
        <button className="inc-btn accept" onPointerDown={e => e.stopPropagation()} onClick={handleAccept}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          Accept
        </button>
      </div>
    </div>
  );
}
