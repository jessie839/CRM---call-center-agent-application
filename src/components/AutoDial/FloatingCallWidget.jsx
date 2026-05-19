import { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { PhoneOff, Mic, MicOff, Maximize2, Pause, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AutoDial.css';

export default function FloatingCallWidget({ lead, callStatus, setCallStatus, isPaused, onTogglePause, onEndCall }) {
  const nodeRef = useRef(null);
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let timer;
    if (callStatus === 'CONNECTED' || callStatus === 'CALLING') {
      timer = setInterval(() => setDuration(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  const handleExpand = () => {
    navigate('/call-log');
  };


  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div 
        ref={nodeRef} 
        className="ad-floating-call-new"
        style={{ cursor: 'grab' }}
      >
        <div className="ad-header-new">
          <div className="ad-active-tag">
            <span className={callStatus === 'CALLING' ? "ad-dot-yellow" : "ad-dot-green"}></span>
            <span className={callStatus === 'CALLING' ? "ad-tag-text ad-tag-text--paused" : "ad-tag-text"}>
              {callStatus === 'CALLING' ? "Calling..." : "Active Call"}
            </span>
          </div>
          <button className="ad-expand-btn" onClick={(e) => { e.stopPropagation(); handleExpand(); }}>
            <Maximize2 size={16} />
          </button>
        </div>
        
        <div className="ad-body-new">
          <h3 className="ad-contact-name-bold">{lead?.firstName} {lead?.lastName}</h3>
          <div className="ad-duration-small">{formatDuration(duration)}</div>
        </div>

        <div className="ad-footer-new" style={{ flexWrap: 'wrap', gap: '8px' }}>
          <button 
            className={`ad-btn-pill ad-btn-mute ${isMuted ? 'active' : ''}`} 
            style={{ flex: 1 }}
            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
          
          <button 
            className={`ad-btn-pill`}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: 'var(--surface2)', color: 'var(--text-main)', border: '1px solid var(--border)' }}
            onClick={(e) => { e.stopPropagation(); onTogglePause(); }}
            title={isPaused ? "Resume Auto Dial" : "Pause Auto Dial"}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
            {isPaused ? "Resume" : "Pause"}
          </button>

          <button 
            className="ad-btn-pill ad-btn-end" 
            style={{ flex: 1, minWidth: '100%' }}
            onClick={(e) => { e.stopPropagation(); onEndCall(); }}
          >
            End Call
          </button>
        </div>
      </div>
    </Draggable>
  );
}

const formatDuration = (secs) => {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

// Inline Avatar for standalone use
function Avatar({ name }) {
  const palette = ["#4f83cc", "#e8935a", "#6dba8a", "#c97bb5", "#e26d6d", "#7bb5d4", "#d4a76a"];
  const char = name.trim() ? name.trim().charCodeAt(0) : 65;
  const bg = palette[char % palette.length];
  const initials = name.split(" ").filter(Boolean).map(n => n[0]).slice(0, 2).join("").toUpperCase() || "?";
  
  return (
    <div className="ad-avatar" style={{ background: bg }}>
      {initials}
    </div>
  );
}
