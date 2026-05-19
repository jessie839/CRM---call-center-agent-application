import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allTasks as initialTasks } from '../components/Dashboard/Taskdata.js';
import { BaseWrapper } from '../wrapper/base.wrapper.jsx';
import AddTaskModal from '../components/Tasks/AddTaskModal.jsx';
import '../styles/Page-pendingtasks.css';
import toast from "react-hot-toast";

function TaskIcon({ color, iconPath }) {
  return (
    <div
      className="task-icon"
      style={{ background: `${color}15`, color }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={iconPath} />
      </svg>
    </div>
  );
}

export default function AllTasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(initialTasks);
  const [doneIds, setDoneIds] = useState([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'done'
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDone = (id) => {
    setDoneIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSaveTask = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
    setIsModalOpen(false);
  };

  const filtered = useMemo(() => {
    let list = [...tasks];
    if (activeFilter === 'pending') list = list.filter(t => !doneIds.includes(t.id));
    if (activeFilter === 'done') list = list.filter(t => doneIds.includes(t.id));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) || (t.desc && t.desc.toLowerCase().includes(q))
      );
    }
    return list;
  }, [search, activeFilter, doneIds, tasks]);

  const pendingCount = tasks.length - doneIds.length;
  const doneCount = doneIds.length;

  const filters = [
    { key: 'all', label: 'All', count: tasks.length },
    { key: 'pending', label: 'Pending', count: pendingCount },
    { key: 'done', label: 'Done', count: doneCount },
  ];

  return (
    <BaseWrapper tabProps={{ tabs: [], headerText: "Tasks" }}>
      <div className="tasks-page">

        {/* Back */}
        <button className="tasks-back-btn" onClick={() => navigate(-1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="tasks-header">
          <div className="tasks-header-left">
            <h2 className="tasks-title">All Tasks</h2>
            <span className="tasks-count-badge">
              {filtered.length} of {tasks.length}
            </span>
          </div>

          <div className="tasks-header-right">
            <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
             + Add Task
            </button>
          </div>
          
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="tasks-search"
        />

        {/* Filter chips */}
        <div className="tasks-filters">
          {filters.map(f => (
            <div
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`tasks-filter-chip${activeFilter === f.key ? ' active' : ''}`}
            >
              {f.label} <span className="tasks-filter-chip-count">{f.count}</span>
            </div>
          ))}
        </div>

        {/* Task list */}
        <div className="tasks-list">
          {filtered.length > 0 ? filtered.map((task) => {
            const isDone = doneIds.includes(task.id);
            return (
              <div key={task.id} className={`task-row${isDone ? ' done' : ''}`}>
                <TaskIcon color={task.color} iconPath={task.iconPath} />

                <div className="task-info">
                  <div className={`task-title${isDone ? ' done' : ''}`}>
                    {task.title}
                  </div>
                  <div className="task-desc">{task.desc}</div>
                  {task.createdBy && (
                    <div style={{fontSize: '10px', color: 'var(--muted)', marginTop: '4px'}}>
                      Created by: {task.createdBy}
                    </div>
                  )}
                </div>

                <div className="task-due">{task.due}</div>

                <button
                  onClick={() => toggleDone(task.id)}
                  title={isDone ? 'Mark undone' : 'Mark done'}
                  className={`task-toggle-btn${isDone ? ' done' : ''}`}
                >
                  {isDone && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              </div>
            );
          }) : (
            <div className="tasks-empty">No tasks match your search.</div>
          )}
        </div>

        {isModalOpen && (
          <AddTaskModal 
            onClose={() => setIsModalOpen(false)} 
            onSave={handleSaveTask} 
          />
        )}

      </div>
    </BaseWrapper>
  );
}
