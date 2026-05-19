import { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { GripHorizontal, X } from 'lucide-react';
import '../../styles/AutoDial.css';

export default function CountdownTimerWidget({ lead, seconds, isPaused, onTimerComplete, onCancel }) {
  const nodeRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (isPaused) return;
    
    if (timeLeft <= 0) {
      onTimerComplete();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isPaused, onTimerComplete]);

  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div ref={nodeRef} className="ad-floating-timer" style={{ cursor: 'grab' }}>
        <div className="ad-drag-handle-visual">
          <GripHorizontal size={16} color="var(--muted)" />
        </div>
        
        <div className="ad-timer-content">
          <div className="ad-timer-circle">
            <svg viewBox="0 0 36 36" className="ad-circular-chart">
              <path className="ad-circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path className="ad-circle"
                strokeDasharray={`${(timeLeft / seconds) * 100}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="ad-percentage">{timeLeft}</text>
            </svg>
          </div>
          <div className="ad-timer-info">
            <h4>Next: {lead?.firstName} {lead?.lastName}</h4>
            <p>{isPaused ? 'Auto-dialing paused' : 'Auto-dialing next lead'}</p>
          </div>
        </div>

        <button className="ad-btn-cancel-timer" onClick={onCancel} style={{ width: '100%', marginTop: '4px' }}>
          <X size={16} /> Cancel Auto Dial
        </button>
      </div>
    </Draggable>
  );
}
