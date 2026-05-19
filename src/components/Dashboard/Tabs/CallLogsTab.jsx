import { useState, useEffect } from 'react';
import { useCallState } from '../../../context/callstate.context';
import AIInsights from '../AIInsights';
import LiveAISuggestions from '../LiveAISuggestions';
import '../../../styles/CallLogsTab.css';
import { PhoneIncomingIcon, PhoneMissedIcon, PhoneOutgoingIcon, Users, ArrowRightLeft, Phone, PhoneForwarded } from 'lucide-react';

export default function CallLogsTab({ setActiveLead, setActiveTab }) {
  const { callState, setCallState } = useCallState();
  const [activeFilter, setActiveFilter] = useState('All');
  const [dialInput, setDialInput] = useState('+1 (555) 012-3456');
  const [showDialpad, setShowDialpad] = useState(false);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);

  // New Call Action States
  const [activeCallAction, setActiveCallAction] = useState(null); // 'conference', 'transfer', null
  const [actionTab, setActionTab] = useState('agents'); // 'agents', 'queues', 'contacts', 'dialpad'
  const [actionSearch, setActionSearch] = useState('');
  const [conferenceParticipants, setConferenceParticipants] = useState([]);
  const [actionDialpadInput, setActionDialpadInput] = useState('');
  const [transferStatus, setTransferStatus] = useState(null);

  // Disposition States
  const [showDisposition, setShowDisposition] = useState(false);
  const [dispositionOutcome, setDispositionOutcome] = useState('Resolved');
  const [dispositionNote, setDispositionNote] = useState('');

  const handleDialpadClick = (num) => {
    setDialInput(prev => prev + num);
  };

  const handleActionDialpadClick = (num) => {
    setActionDialpadInput(prev => prev + num);
  };

  const initiateCall = (e, phone = null, name = 'Unknown Contact') => {
    e?.preventDefault();
    const finalPhone = phone || dialInput;
    if (!finalPhone) return;
    setCallState({
      isActive: true,
      leadName: name,
      phone: finalPhone,
      duration: '00:00'
    });
    setShowDialpad(false);
    setActiveCallAction(null);
    setConferenceParticipants([]);
    setTransferStatus(null);
  };

  const endCall = () => {
    setShowDisposition(true);
  };

  const handleDispositionSubmit = () => {
    setShowDisposition(false);
    setCallState({ ...callState, isActive: false });
    setActiveCallAction(null);
    setConferenceParticipants([]);
    setDispositionNote('');
    setDispositionOutcome('Resolved');
  };

  const handleActionToggle = (action) => {
    if (activeCallAction === action) {
      setActiveCallAction(null);
    } else {
      setActiveCallAction(action);
      setActionTab('agents');
      setActionSearch('');
      setTransferStatus(null);
    }
  };

  const addParticipant = (person) => {
    if (!conferenceParticipants.find(p => p.id === person.id)) {
      setConferenceParticipants([...conferenceParticipants, { ...person, status: 'Joining', role: person.role || 'Agent' }]);
      // Simulate connection
      setTimeout(() => {
        setConferenceParticipants(prev => prev.map(p => p.id === person.id ? { ...p, status: 'Connected' } : p));
      }, 1500);
    }
  };

  const removeParticipant = (id) => {
    setConferenceParticipants(conferenceParticipants.filter(p => p.id !== id));
  };

  const executeTransfer = (type) => {
    setTransferStatus(`${type}ing...`);
    setTimeout(() => {
      setTransferStatus('Transferred Successfully');
      setTimeout(() => {
        endCall();
      }, 1500);
    }, 2000);
  };

  const openLead = (name, phone) => {
    setActiveLead({
      name: name || 'Unknown Contact',
      phone,
      isNew: name === 'Unknown Contact' || !name
    });
    setActiveTab('LeadInfo');
  };

  const agentsList = [
    { id: 'a1', name: 'Sarah  Mumkins', initials: 'SL', dept: 'Support', status: 'Available' },
    { id: 'a2', name: 'Marcus Chen', initials: 'MC', dept: 'Billing', status: 'On Call' },
    { id: 'a3', name: 'David Smith', initials: 'DS', dept: 'Technical', status: 'Busy' },
    { id: 'a4', name: 'Alia Jones', initials: 'AJ', dept: 'Sales', status: 'Available' },
  ];

  const queuesList = [
    { id: 'q1', name: 'Billing Support', agents: 4, waitTime: '2m', role: 'Queue' },
    { id: 'q2', name: 'Tier 1 Support', agents: 12, waitTime: '30s', role: 'Queue' },
    { id: 'q3', name: 'Technical Escalation', agents: 2, waitTime: '5m', role: 'Queue' },
    { id: 'q4', name: 'VIP Queue', agents: 5, waitTime: '0s', role: 'Queue' },
  ];

  const contactsList = [
    { id: 'c1', name: 'John Doe', number: '+1 555-0101', initials: 'JD', role: 'Customer' },
    { id: 'c2', name: 'Jane Smith', number: '+1 555-0102', initials: 'JS', role: 'Customer' },
    { id: 'c3', name: 'ACME Corp', number: '+1 555-0999', initials: 'AC', role: 'Partner' },
  ];

  return (
    <div className="dash-content-area fade-in cl-container">

      {/* Top Action Bar (Active Call / Dialer) */}
      <div className={`cl-top-action-bar ${callState.isActive ? 'is-active-call' : ''}`}>
        {/* Search Input */}
        <div className={`cl-search-container ${callState.isActive ? 'cl-desktop-only' : ''}`}>
          <form
            onSubmit={initiateCall}
            className="cl-search-form"
            onClick={() => setShowDialpad(!showDialpad)}
          >
            {/* Dialpad indication icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="4" height="4"/><rect x="10" y="4" width="4" height="4"/><rect x="16" y="4" width="4" height="4"/><rect x="4" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="16" y="10" width="4" height="4"/><rect x="4" y="16" width="4" height="4"/><rect x="10" y="16" width="4" height="4"/><rect x="16" y="16" width="4" height="4"/></svg>
            <input
              type="text"
              placeholder="+1 (555) 012-3456"
              value={dialInput}
              onChange={(e) => setDialInput(e.target.value)}
              onClick={(e) => e.stopPropagation()} // Prevent double toggle if input is clicked
              onFocus={() => setShowDialpad(true)}
              className="cl-search-input"
            />
            <button type="submit" className="cl-dial-btn" onClick={(e) => e.stopPropagation()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </button>
          </form>

          {showDialpad && !callState.isActive && (
            <div className="cl-compact-dialpad fade-in">
              {[
                { n: '1', l: '' }, { n: '2', l: 'ABC' }, { n: '3', l: 'DEF' },
                { n: '4', l: 'GHI' }, { n: '5', l: 'JKL' }, { n: '6', l: 'MNO' },
                { n: '7', l: 'PQRS' }, { n: '8', l: 'TUV' }, { n: '9', l: 'WXYZ' },
                { n: '*', l: '' }, { n: '0', l: '+' }, { n: '#', l: '' }
              ].map((key) => (
                <button
                  key={key.n}
                  type="button"
                  className="cl-dialpad-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDialpadClick(key.n);
                  }}
                >
                  <span className="cl-dialpad-num">{key.n}</span>
                  <span className="cl-dialpad-letters">{key.l}</span>
                </button>
              ))}
              <div style={{ gridColumn: 'span 3', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px', marginTop: '4px' }}>
                <button
                  type="button"
                  className="cl-dialpad-btn cl-dialpad-btn-clear"
                  style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDialInput('');
                  }}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="cl-dialpad-btn cl-dialpad-btn-clear"
                  style={{ background: 'var(--surface2)', color: 'var(--text-sec)', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDialInput(prev => prev.slice(0, -1));
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {!callState.isActive && (
          <button
            onClick={() => setCallState({ ...callState, isIncoming: true, incomingMinimized: false, incomingData: { name: 'Alex Johnson', phone: '+1 (555) 789-1234', avatar: 'A' } })}
            style={{ marginLeft: 'auto', background: 'var(--danger-light)', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: '8px', color: 'var(--danger)', fontWeight: '600', cursor: 'pointer' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line></svg>
            Simulate Incoming Call
          </button>
        )}

        {/* Call Controls */}
        {callState.isActive && (
          <div className="cl-active-call-container">
            {/* MOBILE ONLY INCALL HEADER */}
            <div className="cl-mobile-incall-header">
              <div className="cl-mobile-incall-status">Calling...</div>
              <div className="cl-mobile-incall-name">{callState.leadName}</div>
              <div className="cl-mobile-incall-number">Mobile • {callState.phone}</div>
              <div className="cl-mobile-incall-avatar-wrapper">
                <div className="cl-mobile-incall-avatar">{callState.leadName.charAt(0)}</div>
              </div>
            </div>

            <div
              className="cl-lead-info cl-desktop-only"
              onClick={() => openLead(callState.leadName, callState.phone)}
              style={{ cursor: 'pointer' }}
            >
              <div className="cl-lead-dot"></div>
              <div>
                <div className="cl-lead-name">ON CALL: {callState.leadName.toUpperCase()}</div>
                <div className="cl-lead-duration">04:12 <span className="cl-lead-queue">/ Queue: Support Tier 1</span></div>
              </div>
            </div>

            <div className="cl-call-controls">
              <div className="cl-cc-item">
                <button className="btn-icon-cir hover:bg-gray-100 cl-icon-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="4" height="4"></rect><rect x="10" y="4" width="4" height="4"></rect><rect x="16" y="4" width="4" height="4"></rect><rect x="4" y="10" width="4" height="4"></rect><rect x="10" y="10" width="4" height="4"></rect><rect x="16" y="10" width="4" height="4"></rect><rect x="4" y="16" width="4" height="4"></rect><rect x="10" y="16" width="4" height="4"></rect><rect x="16" y="16" width="4" height="4"></rect></svg>
                </button>
                <div className="cl-cc-label">Keypad</div>
              </div>
              <div className="cl-cc-item">
                <button className="btn-icon-cir cl-icon-btn-active">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                </button>
                <div className="cl-cc-label">Mute</div>
              </div>
              <div className="cl-cc-item">
                <button className="btn-icon-cir hover:bg-gray-100 cl-icon-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                </button>
                <div className="cl-cc-label">Speaker</div>
              </div>
              <div className="cl-cc-item">
                <button 
                  className={`btn-icon-cir hover:bg-gray-100 cl-icon-btn ${activeCallAction === 'conference' ? 'ca-btn-active' : ''}`}
                  onClick={() => handleActionToggle('conference')}
                  title="Conference"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                </button>
                <div className="cl-cc-label">Add</div>
              </div>
              <div className="cl-cc-item">
                <button 
                  className={`btn-icon-cir hover:bg-gray-100 cl-icon-btn ${activeCallAction === 'transfer' ? 'ca-btn-active' : ''}`}
                  onClick={() => handleActionToggle('transfer')}
                  title="Transfer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path></svg>
                </button>
                <div className="cl-cc-label">Transfer</div>
              </div>
            </div>

            <button onClick={endCall} className="cl-hangup-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line></svg>
              <span className="cl-hangup-text">Hangup</span>
            </button>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
        {/* KPI Cards */}
        {!callState.isActive && (
          <div className="cl-kpi-grid" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* KPI 1 */}
            <div className="cl-kpi-card">
              <div className="cl-kpi-header">
                <div className="cl-kpi-icon cl-kpi-icon-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>

                <div className="cl-kpi-main">
                  <div className="cl-kpi-title">AVG TALK TIME</div>
                  <div className="cl-kpi-value">05:42</div>
                </div>
              </div>

              <div className="cl-kpi-sub cl-kpi-sub-gray">
                Goal: 60 calls
              </div>

              <div className="cl-kpi-sub cl-kpi-sub-green">
                ↓ 12% from yesterday
              </div>
            </div>

            {/* KPI 2 */}
            <div className="cl-kpi-card">
              <div className="cl-kpi-header">
                <div className="cl-kpi-icon cl-kpi-icon-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>

                <div className="cl-kpi-main">
                  <div className="cl-kpi-title">TOTAL HANDLED</div>
                  <div className="cl-kpi-value">48</div>
                </div>
              </div>

              <div className="cl-kpi-sub cl-kpi-sub-gray">
                Goal: 60 calls
              </div>
            </div>
            {/* KPI 3 */}
            <div className="cl-kpi-card">
              <div className="cl-kpi-header">
                <div className="cl-kpi-icon cl-kpi-icon-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>

                <div className="cl-kpi-main">
                  <div className="cl-kpi-title">ABANDONMENT %</div>
                  <div className="cl-kpi-value">2.4%</div>
                </div>
              </div>
              <div className="cl-kpi-sub cl-kpi-sub-green">
                Within target threshold
              </div>
            </div>
            {/* KPI 4 */}
            <div className="cl-kpi-card">
              <div className="cl-kpi-header">
                <div className="cl-kpi-icon cl-kpi-icon-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>

                <div className="cl-kpi-main">
                  <div className="cl-kpi-title">CSAT SCORE</div>
                  <div className="cl-kpi-value">4.9/5</div>
                </div>
              </div>
              <div className="cl-kpi-sub cl-kpi-sub-green">
                Highest in team
              </div>
            </div>
          </div>)}
        {/* AI Insights & Suggestions - Handled specifically for active call */}
        {callState.isActive && (
          <div className="cl-ai-grid active-call-grid" style={{ width: '100%', flex: 1 }}>
            <div className="hide-on-mobile" style={{ display: 'flex', flexDirection: 'column' }}>
              <AIInsights />
            </div>
            <div className="hide-on-mobile" style={{ display: 'flex', flexDirection: 'column' }}>
              <LiveAISuggestions />
            </div>
            
            {/* Call Actions Panel - Only rendered when Call is Active */}
            <div className={`ca-panel fade-in ${activeCallAction ? 'ca-panel-open' : ''}`}>
              {/* Mobile Drag Handle */}
              <div className="ca-mobile-handle"></div>
              {!activeCallAction ? (
                <div className="ca-empty-state">
                  <div className="ca-empty-icon">
                    <Phone strokeWidth="1.5" size={32} />
                  </div>
                  <h3 className="ca-empty-title">Call Actions</h3>
                  <p className="ca-empty-desc">
                    Select Conference or Transfer from the controls above to manage this live call.
                  </p>
                </div>
              ) : (
                <div className="ca-active-state fade-in">
                  <h3 className="ca-title">
                    {activeCallAction === 'conference' ? 'Conference Call' : 'Transfer Call'}
                  </h3>
                  
                  <div className="ca-tabs">
                    {['agents', 'queues', 'contacts', 'dialpad'].map(tab => (
                      <button 
                        key={tab}
                        className={`ca-tab-pill ${actionTab === tab ? 'ca-tab-active' : ''}`}
                        onClick={() => setActionTab(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  <div className="ca-content">
                    {actionTab !== 'dialpad' && (
                      <div className="ca-search-bar">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input 
                          type="text" 
                          placeholder={`Search ${actionTab}...`}
                          value={actionSearch}
                          onChange={(e) => setActionSearch(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="ca-list-container">
                      {actionTab === 'agents' && agentsList.filter(a => a.name.toLowerCase().includes(actionSearch.toLowerCase())).map((agent, i) => (
                        <div key={i} className="ca-list-item">
                          <div className="ca-avatar bg-blue">{agent.initials}</div>
                          <div className="ca-info">
                            <div className="ca-name">{agent.name}</div>
                            <div className="ca-sub">{agent.dept} • <span className={`ca-status ca-status-${agent.status.toLowerCase().replace(' ', '')}`}>{agent.status}</span></div>
                          </div>
                          <button className="ca-add-btn" onClick={() => addParticipant(agent)}>+</button>
                        </div>
                      ))}

                      {actionTab === 'queues' && queuesList.filter(q => q.name.toLowerCase().includes(actionSearch.toLowerCase())).map((queue, i) => (
                        <div key={i} className="ca-list-item">
                          <div className="ca-avatar bg-gray"><Users size={16} /></div>
                          <div className="ca-info">
                            <div className="ca-name">{queue.name}</div>
                            <div className="ca-sub">{queue.agents} Agents • Wait: {queue.waitTime}</div>
                          </div>
                          <button className="ca-add-btn" onClick={() => addParticipant(queue)}>+</button>
                        </div>
                      ))}

                      {actionTab === 'contacts' && contactsList.filter(c => c.name.toLowerCase().includes(actionSearch.toLowerCase())).map((contact, i) => (
                        <div key={i} className="ca-list-item">
                          <div className="ca-avatar bg-green">{contact.initials}</div>
                          <div className="ca-info">
                            <div className="ca-name">{contact.name}</div>
                            <div className="ca-sub">{contact.number}</div>
                          </div>
                          <button className="ca-add-btn" onClick={() => addParticipant(contact)}>+</button>
                        </div>
                      ))}

                      {actionTab === 'dialpad' && (
                        <div className="ca-dialpad-wrapper">
                          <input 
                            type="text" 
                            className="ca-dialpad-input"
                            value={actionDialpadInput}
                            onChange={e => setActionDialpadInput(e.target.value)}
                            placeholder="Enter number..."
                          />
                          <div className="ca-dialpad-grid">
                            {[
                              { n: '1', l: '' }, { n: '2', l: 'ABC' }, { n: '3', l: 'DEF' },
                              { n: '4', l: 'GHI' }, { n: '5', l: 'JKL' }, { n: '6', l: 'MNO' },
                              { n: '7', l: 'PQRS' }, { n: '8', l: 'TUV' }, { n: '9', l: 'WXYZ' },
                              { n: '*', l: '' }, { n: '0', l: '+' }, { n: '#', l: '' }
                            ].map((key) => (
                              <button key={key.n} className="ca-dialpad-btn" onClick={() => handleActionDialpadClick(key.n)}>
                                <span className="ca-n">{key.n}</span>
                              </button>
                            ))}
                            <div style={{ gridColumn: 'span 3', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px', marginTop: '8px' }}>
                              <button
                                type="button"
                                className="ca-dialpad-btn"
                                style={{ width: '100%', height: '40px', borderRadius: '8px', background: 'var(--danger-light)', color: 'var(--danger)', fontSize: '14px' }}
                                onClick={() => setActionDialpadInput('')}
                              >
                                Clear
                              </button>
                              <button
                                type="button"
                                className="ca-dialpad-btn"
                                style={{ width: '100%', height: '40px', borderRadius: '8px', background: 'var(--surface2)', color: 'var(--text-sec)' }}
                                onClick={() => setActionDialpadInput(prev => prev.slice(0, -1))}
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {activeCallAction === 'conference' && conferenceParticipants.length > 0 && (
                    <div className="ca-participants-section fade-in">
                      <div className="ca-part-title">Participants ({conferenceParticipants.length + 2})</div>
                      <div className="ca-part-list">
                        <div className="ca-part-item host">
                          <div className="ca-speak-ind"></div>
                          <div className="ca-avatar bg-blue">ME</div>
                          <div className="ca-info">
                            <div className="ca-name">You (Host)</div>
                          </div>
                        </div>
                        <div className="ca-part-item">
                          <div className="ca-speak-ind speaking"></div>
                          <div className="ca-avatar bg-green">JD</div>
                          <div className="ca-info">
                            <div className="ca-name">Customer – {callState.leadName}</div>
                            <div className="ca-sub">Connected</div>
                          </div>
                        </div>
                        {conferenceParticipants.map((p, i) => (
                          <div key={i} className="ca-part-item">
                            <div className={`ca-speak-ind ${p.status === 'Connected' ? '' : 'inactive'}`}></div>
                            <div className="ca-avatar bg-gray">{p.initials || <Users size={12}/>}</div>
                            <div className="ca-info">
                              <div className="ca-name">{p.name} <span className="ca-role-badge">{p.role}</span></div>
                              <div className="ca-sub">{p.status}</div>
                            </div>
                            <button className="ca-remove-btn" onClick={() => removeParticipant(p.id)}>×</button>
                          </div>
                        ))}
                      </div>
                      <div className="ca-cta-row">
                        <button className="ca-btn-secondary" onClick={endCall}>End Conference</button>
                        <button className="ca-btn-primary">Merge Conference</button>
                      </div>
                    </div>
                  )}

                  {activeCallAction === 'transfer' && (
                    <div className="ca-transfer-section">
                      {transferStatus ? (
                        <div className="ca-transfer-status">
                          <div className="spinner"></div>
                          <span>{transferStatus}</span>
                        </div>
                      ) : (
                        <div className="ca-cta-row-col">
                          <button className="ca-btn-primary" onClick={() => executeTransfer('Warm Transfer')}>Warm Transfer</button>
                          <button className="ca-btn-secondary" onClick={() => executeTransfer('Blind Transfer')}>Blind Transfer</button>
                          <button className="ca-btn-secondary" onClick={() => executeTransfer('Consult Transfer')}>Consult Transfer</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Table Area */}
        {!callState.isActive && (
          <div className="cl-table-container">

            {/* Table Header Controls */}
            <div className="cl-table-header">
              <div className="cl-table-title-row">
                <h2 className="cl-table-title">Call History &amp; Logs</h2>
                <div className="cl-table-actions">
                  <button className="cl-btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Export CSV
                  </button>
                  <button className="cl-btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Today
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '4px' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                </div>
              </div>

              <div className="cl-table-controls-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="cl-filter-tabs">
                    {['All', 'Inbound', 'Outbound', 'Abandoned'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveFilter(tab)}
                        className={`cl-filter-tab ${activeFilter === tab ? 'cl-filter-tab-active' : 'cl-filter-tab-inactive'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="cl-filter-sub">
                    FILTER BY:
                    <div className="cl-filter-sub-group">
                      <button className="cl-filter-sub-btn-active">Agent</button>
                      <button className="cl-filter-sub-btn-inactive">Queue</button>
                      <button className="cl-filter-sub-btn-inactive">Contacts</button>
                    </div>
                  </div>
                </div>

                <button className="cl-advanced-search-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  Advanced Search
                </button>
              </div>
            </div>

            {/* Table Content */}
            <div className="cl-table-content">
              <div className="cl-table-grid cl-table-head-row">
                <div>TYPE</div>
                <div>CONTACT NAME / NUMBER</div>
                <div>ID / SOURCE</div>
                <div>DURATION</div>
                <div>TIMESTAMP</div>
                <div>STATUS</div>
                <div></div>
              </div>

              {[
                {
                  type: 'inbound', name: 'Eleanor Shellstrop', phone: '+1 (310) 901-2244',
                  id: '#4492-BX', source: 'MAIN BILLING QUEUE',
                  dur: '12m 45s', time: '10:42 AM', date: 'AUG 24, 2023', status: 'RESOLVED', statusColor: 'var(--success-light)', textColor: 'var(--success)'
                },
                {
                  type: 'outbound', name: 'Michael Realman', phone: '+44 20 7946 0958',
                  id: '#4491-ZT', source: 'OUTBOUND FOLLOW-UP',
                  dur: '03m 12s', time: '09:15 AM', date: 'AUG 24, 2023', status: 'NO ANSWER', statusColor: 'var(--surface2)', textcolor: 'var(--text-sec)'
                },
                {
                  type: 'missed', name: 'Chidi Anagonye', phone: '+1 (212) 555-0198',
                  id: '#4489-KP', source: 'TECH SUPPORT TIER 2',
                  dur: '00m 00s', time: '08:52 AM', date: 'AUG 24, 2023', status: 'ABANDONED', statusColor: 'var(--danger-light)', textColor: 'var(--danger)'
                },
                {
                  type: 'inbound', name: 'Tahani Al-Jamil', phone: '+44 1632 960882',
                  id: '#4488-XX', source: 'VIP HIGH-PRIORITY',
                  dur: '45m 02s', time: '08:01 AM', date: 'AUG 24, 2023', status: 'RESOLVED', statusColor: 'var(--success-light)', textColor: 'var(--success)'
                },
                {
                  type: 'inbound', name: 'Jason Mendoza', phone: '+1 (904) 555-0100',
                  id: '#4487-JM', source: 'MAIN BILLING QUEUE',
                  dur: '02m 33s', time: '07:45 AM', date: 'AUG 24, 2023', status: 'RESOLVED', statusColor: 'var(--success-light)', textColor: 'var(--success)'
                }
              ].map((row, i) => (
                <div
                  key={i}
                  className={`cl-table-grid cl-table-row ${expandedRowIndex === i ? 'is-expanded' : ''}`}
                  onClick={() => {
                    if (window.innerWidth <= 768) {
                      setExpandedRowIndex(expandedRowIndex === i ? null : i);
                    } else {
                      openLead(row.name, row.phone);
                    }
                  }}
                >
                  <div className="cl-col-icon">
                    <div className="cl-avatar-mobile">{row.name.charAt(0).toUpperCase()}</div>
                    <div className="cl-icon-desktop">
                      {row.type === 'inbound' && <PhoneIncomingIcon size={18} />}
                      {row.type === 'outbound' && <PhoneOutgoingIcon size={18} />}
                      {row.type === 'missed' && <PhoneMissedIcon size={18} color="var(--accent)" />}
                    </div>
                  </div>

                  <div className="cl-col-contact">
                    <div className="cl-contact-name">{row.name}</div>
                    <div className="cl-contact-subtext-mobile">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: row.type === 'missed' ? 'var(--accent)' : 'var(--muted)' }}>
                        {row.type === 'inbound' && <PhoneIncomingIcon size={12} />}
                        {row.type === 'outbound' && <PhoneOutgoingIcon size={12} />}
                        {row.type === 'missed' && <PhoneMissedIcon size={12} />}
                        Mobile • {row.time}
                      </span>
                    </div>
                    <div className="cl-contact-phone">{row.phone}</div>
                  </div>

                  <div className="cl-col-id">
                    <div className="cl-id">{row.id}</div>
                    <div className="cl-source">{row.source}</div>
                  </div>

                  <div className="cl-col-dur cl-dur">
                    {row.dur}
                  </div>

                  <div className="cl-col-time">
                    <div className="cl-time">{row.time}</div>
                    <div className="cl-date">{row.date}</div>
                  </div>

                  <div className="cl-col-status">
                    <div className="cl-status-badge" style={{ background: row.statusColor, color: row.textColor }}>
                      {row.status}
                    </div>
                  </div>

                  <div className="cl-col-action" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); initiateCall(e, row.phone, row.name); }}
                      className="cl-call-btn"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </button>
                  </div>
                  
                  {/* Expanded Content for Mobile */}
                  {expandedRowIndex === i && (
                    <div className="cl-row-expanded-content fade-in" onClick={(e) => e.stopPropagation()}>
                      <div className="cl-expanded-audio">
                        <div className="cl-audio-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></div>
                        <div className="cl-audio-bar"><div className="cl-audio-progress"></div></div>
                        <div className="cl-audio-time">00:00 / {row.dur.split('m')[0]}:00</div>
                      </div>
                      <div className="cl-expanded-details">
                        <div className="cl-exp-detail-item"><strong>Duration:</strong> {row.dur}</div>
                        <div className="cl-exp-detail-item"><strong>Queue:</strong> {row.source}</div>
                        <div className="cl-exp-detail-item"><strong>Date:</strong> {row.date} at {row.time}</div>
                      </div>
                      <div className="cl-expanded-actions">
                        <button className="cl-exp-action-btn" onClick={() => openLead(row.name, row.phone)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                          Contact Info
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

            </div>

            {/* Pagination */}
            <div className="cl-pagination">
              <div className="cl-page-info">
                Showing 1-15 of 2,401 recent calls
              </div>
              <div className="cl-page-controls">
                <button className="cl-page-btn cl-page-btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button className="cl-page-btn cl-page-btn-active">1</button>
                <button className="cl-page-btn">2</button>
                <button className="cl-page-btn">3</button>
                <button className="cl-page-btn cl-page-btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Disposition Modal */}
      {showDisposition && (
        <div className="ca-modal-overlay fade-in">
          <div className="ca-modal-card fade-in">
            <div className="ca-modal-header">
              <h3 className="ca-modal-title">Call Disposition</h3>
              <button className="ca-modal-close" onClick={handleDispositionSubmit}>×</button>
            </div>
            
            <div className="ca-modal-content">
              <div className="ca-modal-field">
                <label>Outcome</label>
                <div className="ca-select-wrapper">
                  <select value={dispositionOutcome} onChange={e => setDispositionOutcome(e.target.value)} className="ca-select">
                    <option>Resolved</option>
                    <option>Escalated</option>
                    <option>Follow-up Required</option>
                    <option>Transferred</option>
                    <option>No Answer</option>
                  </select>
                  <svg className="ca-select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
              
              <div className="ca-modal-field">
                <label>Notes</label>
                <textarea 
                  rows={4} 
                  value={dispositionNote} 
                  onChange={e => setDispositionNote(e.target.value)}
                  className="ca-textarea"
                  placeholder="Summarize the call..."
                ></textarea>
              </div>
            </div>
            
            <div className="ca-modal-footer">
              <button className="ca-btn-submit" onClick={handleDispositionSubmit}>Submit Disposition</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}