import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allActivities, statusConfig, typeConfig, typeIcons } from '../components/Dashboard/calllogData.js';
import { BaseWrapper } from '../wrapper/base.wrapper.jsx';
import '../styles/Page-latestactivity.css';

const allTypes = ['All', 'Support', 'Email', 'Call', 'Document', 'Meeting', 'Alert'];
const allStatuses = [
  { key: 'all', label: 'All Statuses' },
  { key: 'resolved', label: 'Resolved' },
  { key: 'done', label: 'Done' },
  { key: 'sent', label: 'Sent' },
  { key: 'escalated', label: 'Escalated' },
  { key: 'upcoming', label: 'Upcoming' },
];

const allChips = [
  ...allTypes.map(t => ({ key: `type:${t}`, label: t, group: 'type' })),
  ...allStatuses.map(s => ({ key: `status:${s.key}`, label: s.label, group: 'status', statusKey: s.key })),
];

export default function AllActivityPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = useMemo(() => {
    let list = [...allActivities];
    if (typeFilter !== 'All') list = list.filter(l => l.type === typeFilter);
    if (statusFilter !== 'all') list = list.filter(l => l.status === statusFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(l => l.title.toLowerCase().includes(q));
    }
    return list;
  }, [search, typeFilter, statusFilter]);

  const handleChip = (chip) => {
    if (chip.group === 'type') setTypeFilter(chip.label);
    else setStatusFilter(chip.statusKey);
  };

  const isActive = (chip) =>
    chip.group === 'type' ? typeFilter === chip.label : statusFilter === chip.statusKey;

  return (
    <BaseWrapper tabProps={{ tabs: [], headerText: "Recent Activity" }}>
      <div className="activity-page">

        {/* Back */}
        <button className="activity-back-btn" onClick={() => navigate(-1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="activity-header">
          <div className="activity-header-left">
            <h2 className="activity-title">Recent Activity</h2>
            <span className="activity-count-badge">
              {filtered.length} of {allActivities.length}
            </span>
          </div>
         
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search activity..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="activity-search"
        />

        {/* Filter chips */}
        <div className="activity-filters">
          {allChips.map(chip => (
            <div
              key={chip.key}
              onClick={() => handleChip(chip)}
              className={`activity-filter-chip${isActive(chip) ? ' active' : ''}`}
            >
              {chip.label}
            </div>
          ))}
        </div>

        {/* Activity list */}
        <div className="activity-list">
          {filtered.length > 0 ? filtered.map((log) => {
            const s = statusConfig[log.status];
            const t = typeConfig[log.type];
            const iconPath = typeIcons[log.type];
            return (
              <div key={log.id} className="activity-row">
                <div className="activity-row-left">
                  <div
                    className="activity-icon"
                    style={{ background: t.bg }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2.2">
                      <path d={iconPath} />
                    </svg>
                  </div>
                  <div className="activity-info">
                    <div className="activity-log-title">{log.title}</div>
                    <div className="activity-log-meta">
                      <span
                        className="activity-type-badge"
                        style={{ background: t.bg, color: t.color }}
                      >
                        {log.type}
                      </span>
                      <span className="activity-time">{log.time}</span>
                    </div>
                  </div>
                </div>

                <span
                  className="activity-status-badge"
                  style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                >
                  {s.label.toUpperCase()}
                </span>
              </div>
            );
          }) : (
            <div className="activity-empty">No activity matches your search.</div>
          )}
        </div>

      </div>
    </BaseWrapper>
  );
}