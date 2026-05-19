import React, { useState, useEffect } from 'react';

export default function ClickToCall() {
  const [callState, setCallState] = useState('Idle'); 
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (callState === 'Active') {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const formatTime = (t) => {
    const m = Math.floor(t / 60).toString().padStart(2, '0');
    const s = (t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="dash-card click-to-call-card">
      <div className="ctc-header">
        <h3>Call Station</h3>
        <span className={`status-badge ${callState.toLowerCase().replace(' ', '-')}`}>
          {callState} {callState === 'Active' && `(${formatTime(timer)})`}
        </span>
      </div>
      
      <div className="ctc-body">
        <input type="text" placeholder="Enter phone number..." className="dial-input" />
        
        <div className="ctc-actions">
          {callState === 'Idle' && <button className="btn-call" onClick={() => setCallState('Dialing')}>Call</button>}
          {callState === 'Dialing' && <button className="btn-end" onClick={() => setCallState('Active')}>Answer (Simulate)</button>}
          {callState === 'Active' && (
            <>
              <button className="btn-mute">Mute</button>
              <button className="btn-hold">Hold</button>
              <button className="btn-action">Transfer</button>
              <button className="btn-end" onClick={() => setCallState('Wrap-up')}>End Call</button>
            </>
          )}
          {callState === 'Wrap-up' && <button className="btn-action" onClick={() => setCallState('Idle')}>Complete Wrap-up</button>}
        </div>
      </div>
    </div>
  );
}
