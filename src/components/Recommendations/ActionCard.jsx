import { Clock, Phone } from 'lucide-react';

export default function ActionCard({ action }) {

  const getPriorityClass = () => {
    switch(action.priority.toLowerCase()) {
      case 'critical':
      case 'high': return 'ra-p-high';
      case 'medium': return 'ra-p-medium';
      case 'low': return 'ra-p-low';
      default: return 'ra-p-medium';
    }
  };

  // Extract initials for Avatar
  const nameParts = action.name.split(' ').filter(Boolean);
  const initials = nameParts.length >= 2 
    ? nameParts[0][0] + nameParts[1][0] 
    : action.name.substring(0, 2);

  // Avatar bg gradients
  const gradients = [
    "linear-gradient(135deg, var(--accent), var(--accent-2))",
    "linear-gradient(135deg, var(--accent), #d97706)",
    "linear-gradient(135deg, var(--accent), #059669)",
    "linear-gradient(135deg, #ec4899, #be185d)",
    "linear-gradient(135deg, var(--accent), #2563eb)"
  ];
  const char = action.name.charCodeAt(0) || 65;
  const bgGradient = gradients[char % gradients.length];

  return (
    <div className="ra-card">
      <div className="ra-avatar-box" style={{ background: bgGradient }}>
        {initials.toUpperCase()}
      </div>
      
      <div className="ra-card-user">
        <div className="ra-card-name">{action.name}</div>
        <div className="ra-card-company">{action.company || 'Unknown Company'}</div>
      </div>

      <div className="ra-card-desc">
        <div className="ra-desc-text">{action.reason}</div>
        <div className="ra-meta">
          <div className={`ra-priority-badge ${getPriorityClass()}`}>
            <span className="ra-priority-dot"></span>
            {action.priority} Priority
          </div>
          <div className="ra-timestamp">
            <Clock size={14} />
            {action.timestamp || 'Added Today'}
          </div>
        </div>
      </div>

      <button className="ra-action-btn initiate-btn" onClick={() => {}}>
        <Phone size={16} /> Initiate Call
      </button>
    </div>
  );
}
