import { useState } from 'react';
import { Check, X } from 'lucide-react';

export default function TaskCard({ task, onComplete, onCancel }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleAction = (type) => {
    if (type === 'cancel') {
      if (!window.confirm("Are you sure you want to remove this task?")) return;
    }
    
    setIsRemoving(true);
    setTimeout(() => {
      if (type === 'complete') onComplete(task.id);
      if (type === 'cancel') onCancel(task.id);
    }, 300); // Wait for transition
  };

  const getTagClass = () => {
    switch (task.tag?.toLowerCase()) {
      case 'today': return 'today';
      case 'tomorrow': return 'tomorrow';
      case 'upcoming': return 'upcoming';
      default: return '';
    }
  };

  return (
    <div className={`pt-card ${isRemoving ? 'removing' : ''}`}>
      <div className="pt-icon-box" style={{ background: `${task.color}15`, color: task.color }}>
        {task.icon ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {task.icon}
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
            <path d="M12 8v4l3 3"/>
          </svg>
        )}
      </div>
      
      <div className="pt-card-content">
        <h4 className="pt-card-title">{task.title}</h4>
        <p className="pt-card-desc">{task.desc}</p>
      </div>

      <div className="pt-tags-row">
        <span className={`pt-tag ${getTagClass()}`}>
          {task.tag || 'Upcoming'}
        </span>
      </div>

      <div className="pt-card-actions">
        <button className="pt-action-btn pt-btn-cancel" onClick={() => handleAction('cancel')} title="Remove Task">
          <X size={18} />
        </button>
        <button className="pt-action-btn pt-btn-complete" onClick={() => handleAction('complete')} title="Complete Task">
          <Check size={18} />
        </button>
      </div>
    </div>
  );
}
