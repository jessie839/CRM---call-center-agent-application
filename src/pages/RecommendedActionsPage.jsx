import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allLeads, priorityOrder, priorityBadgeStyles } from '../components/Dashboard/rna.js';
import { BaseWrapper } from '../wrapper/base.wrapper.jsx';
import '../styles/Pages-recommended-next-actions.css';

function AvatarIcon({ avatarColor, iconColor }) {
    return (
        <div  className="avatar"
  style={{ background: avatarColor }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
        </div>
    );
}

function LeadRow({ lead, isCalled, onToggleCall }) {
    const badge = priorityBadgeStyles[lead.priority];
    return (
        <div className="lead-row">
            <AvatarIcon avatarColor={lead.avatarColor} iconColor={lead.iconColor} />

            <div className="lead-info">
                <div className="lead-name">{lead.name}</div>
                <div className="lead-company">{lead.company}</div>
            </div>

            <span className="priority-badge"
            style={badge}
            >
               
            </span>

            <div className="lead-reason">
                {lead.reason}
            </div>

            <button
  onClick={() => onToggleCall(lead.id)}
  className={`call-btn ${isCalled ? 'active' : 'inactive'}`}
>
                {isCalled ? '✓ Called' : 'Initiate Call'}
            </button>
        </div>
    );
}

export default function AllLeadsPage() {
    const navigate = useNavigate();
    const [calledIds, setCalledIds] = useState([]);
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const toggleCall = (id) => {
        setCalledIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const filters = ['all', 'critical', 'high', 'medium', 'low'];

    const filtered = useMemo(() => {
        let list = [...allLeads];
        if (activeFilter !== 'all') list = list.filter(l => l.priority === activeFilter);
        if (search.trim()) {
            const q = search.trim().toLowerCase();
            list = list.filter(l =>
                l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q)
            );
        }
        list.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        return list;
    }, [search, activeFilter]);

    return (
        <BaseWrapper tabProps={{ tabs: [], headerText: "Recommended Next Actions" }}>
            <div className="page-container">

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                   className="back-btn"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back to Dashboard
                </button>

                {/* Page header */}
                <div className="header">
                    <div className="header-left">
                        <h2 className="title">Recommended Next Actions</h2>
                        <span className="count-badge">
                            {filtered.length} of {allLeads.length}
                        </span>
                    </div>
                </div>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by name or company..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="search-input"
                />

                {/* Filter chips */}
                <div className="filter-container">
                    {filters.map(f => {
                        const count = f === 'all' ? allLeads.length : allLeads.filter(l => l.priority === f).length;
                        const label = f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1);
                        const isActive = activeFilter === f;
                        return (
                            <div key={f}
  onClick={() => setActiveFilter(f)}
  className={`filter-chip ${isActive ? 'active' : ''}`}
>
                                {label} <span style={{ opacity: 0.7 }}>{count}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Leads list */}
                <div className="leads-list">
                    {filtered.length > 0 ? filtered.map(lead => (
                        <LeadRow
                            key={lead.id}
                            lead={lead}
                            isCalled={calledIds.includes(lead.id)}
                            onToggleCall={toggleCall}
                        />
                    )) : (
                        <div className="empty-state">
                            No leads match your search.
                        </div>
                    )}
                </div>
            </div>
        </BaseWrapper>
    );
}