import { Clock, Phone, Ticket, MessageSquare, Settings, ArrowRight } from 'lucide-react';

export default function ActivityCard({ activity }) {
  
  const getIcon = () => {
    switch(activity.type.toLowerCase()) {
      case 'call': return <Phone size={24} color="var(--accent)" />;
      case 'ticket': return <Ticket size={24} color="var(--accent)" />;
      case 'message': return <MessageSquare size={24} color="#ec4899" />;
      case 'system': return <Settings size={24} color="var(--muted)" />;
      default: return <Settings size={24} color="var(--muted)" />;
    }
  };

  const getIconBg = () => {
    switch(activity.type.toLowerCase()) {
      case 'call': return '#eff6ff';
      case 'ticket': return '#f3eafe';
      case 'message': return '#fdf2f8';
      case 'system': return 'var(--border)';
      default: return 'var(--border)';
    }
  };

  const getStatusClass = () => {
    switch(activity.status.toLowerCase()) {
      case 'success': return 'success';
      case 'failed': return 'failed';
      case 'pending': return 'pending';
      default: return 'pending';
    }
  };

  const getActionText = () => {
    switch(activity.type.toLowerCase()) {
      case 'call': return 'View Call Log';
      case 'ticket': return 'View Details';
      case 'message': return 'Open Conversation';
      default: return 'View Info';
    }
  };

  const getStatusIcon = () => {
    if(activity.status.toLowerCase() === 'success') return '🟢';
    if(activity.status.toLowerCase() === 'failed') return '🔴';
    return '🟡';
  };

  return (
    <div className="la-card">
      <div className="la-icon-box" style={{ background: getIconBg() }}>
        {getIcon()}
      </div>
      
      <div className="la-card-content">
        <h4 className="la-card-title">{activity.title}</h4>
        <p className="la-card-desc">{activity.desc}</p>
      </div>

      <div className="la-status-col">
        <span className={`la-badge ${getStatusClass()}`}>
          {getStatusIcon()} {activity.status}
        </span>
        <div className="la-timestamp">
          <Clock size={12} /> {activity.time}
        </div>
      </div>

      {(activity.type !== 'system') && (
        <div className="la-card-actions">
          <button className="la-action-btn">
            {getActionText()} <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
