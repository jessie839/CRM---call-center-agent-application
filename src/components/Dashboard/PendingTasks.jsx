import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allTasks } from './Taskdata.js';
import '../../styles/Pendingtasks.css';

function TaskIcon({ color, iconPath }) {
  return (
    <div className="task-icon" style={{ background: `${color}15`, color }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={iconPath} />
      </svg>
    </div>
  );
}

export default function PendingTasks() {
  const navigate = useNavigate();
  const [doneIds, setDoneIds] = useState([]);

  const toggleDone = (id) => {
    setDoneIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const topTasks = allTasks.slice(0, 3);

  return (
    <div className="soft-card pending-tasks-card">
      <div className="pending-tasks-header">
        <h3 className="soft-card-title pending-tasks-title">Pending Tasks</h3>
        <span className="pending-tasks-view-all" onClick={() => navigate('/all-tasks')}>
          View All
        </span>
      </div>

      <div className="pending-tasks-list">
        {topTasks.map((task) => {
          const isDone = doneIds.includes(task.id);
          return (
            <div key={task.id} className={`task-row${isDone ? ' task-row--done' : ''}`}>
              <TaskIcon color={task.color} iconPath={task.iconPath} />

              <div className="task-info">
                <div className={`task-title${isDone ? ' task-title--done' : ''}`}>
                  {task.title}
                </div>
                <div className="task-desc">{task.desc}</div>
              </div>

              <div className="task-due">{task.due}</div>

              <button
                onClick={() => toggleDone(task.id)}
                title={isDone ? 'Mark undone' : 'Mark done'}
                className={`task-check-btn${isDone ? ' task-check-btn--done' : ''}`}
              >
                {isDone && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}