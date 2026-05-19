import { useState, useRef, useEffect } from 'react';
import {
  User, ChevronDown, ShieldCheck, Trophy, Calendar, Edit2, X,
  PhoneCall, Coffee, LogIn, LogOut, AlertTriangle, Clock,
  Phone, Mail, MapPin, Activity, Timer, Briefcase, LifeBuoy, Settings, Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { BaseWrapper } from '../wrapper/base.wrapper';
import '../styles/AgentProfile.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
// ── SHARED HELPER COMPONENTS ──

const StatBox = ({ label, value, sub, children }) => (
  <div className="stat-box">
    <div className="sb-label">{label}</div>
    {children ? (
      <div className="sb-custom-content">{children}</div>
    ) : (
      <>
        <div className="sb-value sb-val-main sb-val-text">{value}</div>
        <div className="sb-sub">{sub}</div>
      </>
    )}
  </div>
);

const FieldCell = ({ label, children, fullWidth, border }) => (
  <div className={`field-cell ${fullWidth ? 'full-width' : ''}`} style={border ? { borderBottom: '1px solid var(--border)' } : {}}>
    <div className="field-label">{label}</div>
    <div className="field-value">
      {children}
    </div>
  </div>
);

const FieldInput = (props) => (
  <input
    {...props}
    className={`field-input ${props.className || ''}`}
  />
);

const StatusSmallCard = ({ icon, label, value, color }) => (
  <div className="status-small-card">
    <div className="ssc-icon" style={{ backgroundColor: `${color}15`, color: color }}>
      {icon}
    </div>
    <div className="ssc-info">
      <div className="ssc-label">{label}</div>
      <div className="ssc-value">{value}</div>
    </div>
  </div>
);

const MetricCard = ({
  title,
  value,
  icon,
  iconClass = "mc-icon-primary",
  subText,
  subStatus,
  subNode,
  badge
}) => (
  <div className="metric-card">
    <div className="mc-header">
      <div className="mc-title">{title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {badge && (
          <div className={`mc-badge ${subStatus === 'positive' ? 'mc-badge-positive' : 'mc-badge-negative'}`}>
            {subStatus === 'positive' && '↑ '}
            {subStatus === 'negative' && '↓ '}
            {badge}
          </div>
        )}
        <div className={`mc-icon-wrap ${iconClass}`}>
          {icon}
        </div>
      </div>
    </div>
    <div className="mc-body">
      <div className="mc-value">{value}</div>

      {subText && (
        <div className={`mc-subtext ${subStatus === 'positive' ? 'mc-sub-positive' :
          subStatus === 'negative' ? 'mc-sub-negative' : 'mc-sub-neutral'
          }`}>
          {subStatus === 'positive' && '↑ '}
          {subStatus === 'negative' && '↓ '}
          {subText}
        </div>
      )}

      {subNode}
    </div>
  </div>
);

const STATUS_OPTIONS = [
  { value: 'online', label: 'Online / On Call', color: 'var(--success)', bg: 'rgba(38,166,154,0.1)', border: 'rgba(38,166,154,0.28)' },
  { value: 'offline', label: 'Offline', color: 'var(--muted)', bg: 'rgba(143,163,184,0.12)', border: 'rgba(143,163,184,0.3)' },
  { value: 'break', label: 'On Break', color: 'var(--warning)', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.28)' },
  { value: 'meeting', label: 'In Meeting', color: 'var(--accent)', bg: 'rgba(33,150,243,0.1)', border: 'rgba(33,150,243,0.28)' },
];

// ── MAIN AGENT PROFILE COMPONENT ──

export default function AgentProfile() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [status, setStatus] = useState('online');
  const [open, setOpen] = useState(false);
  const [selectedQueues, setSelectedQueues] = useState(['Support', 'Tech', 'Billing']);
  const { mode, setMode, color, setColor, customColor, setCustomColor } = useTheme();
  const navigate = useNavigate()
  const dropRef = useRef(null);
  const current = STATUS_OPTIONS.find(o => o.value === status);
  const availableQueues = ['Sales', 'Enterprise', 'Support', 'Tech', 'Billing', 'Service', 'Account', 'Escalations'];

  // Handle outside click for status dropdown
  useEffect(() => {
    const handler = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelectQueue = (e) => {
    const val = e.target.value;
    if (val && !selectedQueues.includes(val)) {
      setSelectedQueues([...selectedQueues, val]);
    }
    e.target.value = ''; // Reset select
  };

  const removeQueue = (qName) => {
    setSelectedQueues(selectedQueues.filter(q => q !== qName));
  };

  return (
    <BaseWrapper tabProps={{ tabs: [], headerText: "Agent Details" }}>
      <div className="app-container animate-fade-up">
        {/* ── SIDEBAR SECTION ── */}
        <aside className="sidebar-wrapper">
          <div className="sidebar-card">
            {/* Mobile collapse toggle — hidden on desktop via CSS */}
            <button
              className="sidebar-mobile-toggle"
              onClick={() => setSidebarExpanded(e => !e)}
            >
              <div className="smt-left">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="smt-avatar" />
                <div>
                  <div className="smt-name">John Doe</div>
                  <div className="smt-role">Senior Telecaller • Team Alpha</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  className="sb-status-dot"
                  style={{ backgroundColor: current.color, width: '8px', height: '8px' }}
                />
                <ChevronDown
                  size={16}
                  strokeWidth={2.5}
                  style={{
                    color: 'var(--muted)',
                    transform: sidebarExpanded ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s'
                  }}
                />
              </div>
            </button>

            {/* Sidebar body — always visible on desktop, toggleable on mobile */}
            <div className={`sidebar-content ${sidebarExpanded ? 'sidebar-mobile-open' : 'sidebar-mobile-closed'}`}>
              <div className="sb-avatar-wrap sidebar-desktop-only">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="sb-avatar-img" />
              </div>

              <div className="sb-name-row sidebar-desktop-only">
                <div className="sb-name">John Doe</div>
                <button className="sb-edit-icon" title="Edit profile">
                  <Edit2 size={13} strokeWidth={2.5} />
                </button>
              </div>

              <div className="sb-agent-id" style={{ marginTop: '6px', fontSize: '12px' }}>
                Agent ID: <strong>AG-2024-0847</strong>
              </div>

              <div className="sb-role" style={{ marginTop: '4px' }}>Senior Telecaller • Team Alpha</div>

              <div className="sb-status-wrapper" ref={dropRef}>
                <button
                  className="sb-status-pill"
                  style={{ backgroundColor: current.bg, borderColor: current.border, color: current.color }}
                  onClick={() => setOpen(o => !o)}
                >
                  <span className="sb-status-dot" style={{ backgroundColor: current.color }} />
                  <span>{current.label}</span>
                  <ChevronDown size={11} strokeWidth={2.5} style={{ opacity: 0.6, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                {open && (
                  <div className="sb-status-menu">
                    {STATUS_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        className={`sb-status-option ${opt.value === status ? 'active' : ''}`}
                        onClick={() => { setStatus(opt.value); setOpen(false); }}
                      >
                        <span className="sb-status-dot" style={{ backgroundColor: opt.color }} />
                        <span style={{ color: opt.color }}>{opt.label}</span>
                        {opt.value === status && <span className="sb-status-check">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="sb-info-card">
                <div className="sb-info-row">
                  <div className="sb-info-icon"><Phone size={12} strokeWidth={2} /></div>
                  +1 (555) 123-4567
                </div>
                <div className="sb-info-row">
                  <div className="sb-info-icon"><Mail size={12} strokeWidth={2} /></div>
                  connor@example.com
                </div>
                <div className="sb-info-row">
                  <div className="sb-info-icon"><MapPin size={12} strokeWidth={2} /></div>
                  New York, USA
                </div>
              </div>

              <div className="sb-info-card" style={{ marginTop: '12px', backgroundColor: 'rgba(38,166,154,0.05)' }}>
                <div className="sb-info-row">
                  <div className="sb-info-icon" style={{ backgroundColor: 'transparent', color: 'var(--success)' }}>
                    <PhoneCall size={14} strokeWidth={2} />
                  </div>
                  <strong style={{ color: 'var(--text-main)' }}>Current Call:</strong>&nbsp;<span style={{ fontFamily: 'monospace' }}>04:12</span>
                </div>
                <div className="sb-info-row">Ext: 1042 | John Doe</div>
              </div>

              <button
                className="sb-signout"
                style={{ marginTop: 'auto' }}
                onClick={() => navigate('/')}
              >
                <LogOut size={12} strokeWidth={2} />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT (RIGHT COLUMN) ── */}
        <div className="right-column custom-scrollbar">
          <div className="sticky-header">

            {/* TABS BAR SECTION */}
            <div className="tabs-bar">
              <button className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
                <User size={16} strokeWidth={2} /> Personal Info
              </button>
              <button className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`} onClick={() => setActiveTab('account')}>
                <Activity size={16} strokeWidth={2} /> Live Status
              </button>
              <button className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                <Settings size={16} strokeWidth={2} /> Settings
              </button>
            </div>
          </div>

          {/* TAB PANELS SECTION */}
          <div className="tab-panels animate-fade-up-fast">

            {/* PERSONAL INFO PANEL */}
            {activeTab === 'personal' && (
              <div className="tab-section-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, marginBottom: 0 }}>
                <div className="tab-section-header">
                  <div className="tsh-left">
                    <div className="tsh-icon"><User size={18} strokeWidth={2} /></div>
                    <div>
                      <div className="tsh-title">Personal Information & Activities</div>
                      <div className="tsh-desc">Detailed identity metadata, upcoming scheduling, and performance metrics.</div>
                    </div>
                  </div>
                  <button className="tsh-edit-icon-btn" title="Edit Profile"><Edit2 size={16} strokeWidth={2} /></button>
                </div>
                <div className="tab-content-scrollable custom-scrollbar" style={{ overflowY: 'auto', flex: 1 }}>
                  <div className="info-grid">
                    <FieldCell label="Name"><FieldInput type="text" defaultValue="Connor Reynolds" /></FieldCell>
                    <FieldCell label="Role"><div className="badge-primary"><ShieldCheck size={12} strokeWidth={2.5} /> Support Engineer</div></FieldCell>

                    {/* Standard Pattern Section */}
                    <FieldCell label="Team">
                      <div className="input-with-side-label">
                        <div className="queue-tags-wrapper">
                          <div className="queue-chip">Team Alpha</div>
                        </div>
                        {/* <div className="side-label-count">+ 10 Teams</div> */}
                      </div>
                    </FieldCell>
                    <FieldCell label="Current State"><div className="badge-primary" style={{ backgroundColor: 'rgba(38,166,154,0.1)', color: 'var(--success)' }}>Online</div></FieldCell>
                    <FieldCell label="Group">
                      <div className="input-with-side-label">
                        <div className="queue-tags-wrapper">
                          <div className="queue-chip">Group Beta</div>
                        </div>
                        {/* <div className="side-label-count">+ 5 Groups</div> */}
                      </div>
                    </FieldCell>

                    {/* Horizontal Queue Section */}
                    <FieldCell label="Queue">
                      <div className="queue-select-container">
                        <div className="queue-select-wrapper">
                          <select className="queue-select" onChange={handleSelectQueue} defaultValue="">
                            <option value="" disabled>Select Queue...</option>
                            {availableQueues.map(q => (<option key={q} value={q} disabled={selectedQueues.includes(q)}>{q}</option>))}
                          </select>
                          <ChevronDown className="queue-select-icon" size={12} />
                        </div>
                        <div className="queue-tags-row">
                          {selectedQueues.map(q => (
                            <div key={q} className="queue-chip">
                              {q}
                              <button className="chip-remove-btn" onClick={() => removeQueue(q)} title="Remove"><X size={11} strokeWidth={3} /></button>
                            </div>
                          ))}
                        </div>
                        {/* <div className="side-label-count">+ {selectedQueues.length} Queues</div> */}
                      </div>
                    </FieldCell>

                    <FieldCell label="Campaign"><FieldInput type="text" defaultValue="Q4 Sales Campaign" disabled style={{ backgroundColor: 'transparent', opacity: 0.8 }} /></FieldCell>
                    <FieldCell label="Station No"><FieldInput type="text" defaultValue="STN-42-NYC" /></FieldCell>
                    <FieldCell label="Email Address"><div style={{ fontSize: '14px' }}>connorreynolds@gmail.com</div></FieldCell>
                    <FieldCell label="Agent ID"><FieldInput type="text" defaultValue="AG-2024-0847" disabled style={{ backgroundColor: 'transparent', opacity: 0.8 }} /></FieldCell>
                    <FieldCell label="Joining Date"><div style={{ fontSize: '14px' }}>Oct 12, 2022</div></FieldCell>
                    <FieldCell label="Last Login"><div style={{ fontSize: '14px', color: 'var(--muted)' }}>Today, 08:00 AM</div></FieldCell>
                  </div>
                  <div style={{ height: '32px' }} />
                </div>
              </div>
            )}

            {/* LIVE STATUS PANEL */}
            {activeTab === 'account' && (
              <div className="tab-section-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, marginBottom: 0 }}>
                <div className="tab-section-header" style={{ flexShrink: 0 }}>
                  <div className="tsh-left">
                    <div className="tsh-icon" style={{ backgroundColor: 'rgba(33,150,243,0.1)', color: 'var(--accent)' }}><Clock size={18} strokeWidth={2} /></div>
                    <div>
                      <div className="tsh-title">Live Status & Usage</div>
                      <div className="tsh-desc">Real-time metrics for current session and telephony resources.</div>
                    </div>
                  </div>
                </div>
                <div className="custom-scrollbar" style={{ overflowY: 'auto', flex: 1, padding: '24px' }}>
                  <div className="status-cards-grid">
                    <StatusSmallCard icon={<PhoneCall size={14} />} label="On Call" value="Active" color="var(--success)" />
                    <StatusSmallCard icon={<Coffee size={14} />} label="Break" value="15m (Scheduled)" color="var(--warning)" />
                    <StatusSmallCard icon={<Clock size={14} />} label="Last Login Time" value="08:02:45 AM" color="var(--accent)" />
                    <StatusSmallCard icon={<Clock size={14} />} label="Last Logout Time" value="Yesterday, 05:30 PM" color="var(--text-sec)" />
                  </div>
                  <div className="ls-section" style={{ marginTop: '32px' }}>

                  </div>
                  <div className="ls-section" style={{ marginTop: '24px' }}>


                  </div>
                </div>
              </div>
            )}

            {/* SUPPORT PANEL */}
            {activeTab === 'support' && (
              <div className="tab-section-card" style={{ marginBottom: 0 }}>
                <div className="tab-section-header">
                  <div className="tsh-left">
                    <div className="tsh-icon" style={{ backgroundColor: 'rgba(38,166,154,0.1)', color: 'var(--success)' }}><LifeBuoy size={20} strokeWidth={2} /></div>
                    <div>
                      <div className="tsh-title">Help & Issue Management</div>
                      <div className="tsh-desc">Contact support or trace your open system tickets.</div>
                    </div>
                  </div>
                </div>
                <div className="support-grid">
                  <div className="field-cell"><div className="field-label">Support Email</div><div className="field-value"><a href="mailto:support@telecom.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>support@telecom.com</a></div></div>
                  <div className="field-cell"><div className="field-label">Emergency Contact</div><div className="field-value">+1 (800) 999-0000 (24/7 Hotline)</div></div>
                  <div className="field-cell"><div className="field-label">Knowledge Base</div><div className="field-value"><a href="#" style={{ color: 'var(--accent)', textDecoration: 'none' }}>help.telecom-platform.com</a></div></div>
                  <div className="field-cell">
                    <div className="field-label">Application Version</div>
                    <div className="field-value">
                      <div style={{ fontSize: '12px', padding: '3px 10px', background: 'var(--surface2)', borderRadius: '99px', border: '1px solid var(--border)', display: 'inline-block', fontWeight: '500' }}>Telecom WebRTC v4.2.1</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* SETTINGS PANEL */}
            {activeTab === 'settings' && (
              <div className="tab-section-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, marginBottom: 0 }}>
                <div className="tab-section-header">
                  <div className="tsh-left">
                    <div className="tsh-icon"><Settings size={18} strokeWidth={2} /></div>
                    <div>
                      <div className="tsh-title">Application Settings</div>
                      <div className="tsh-desc">Manage your global theme, layout and appearance.</div>
                    </div>
                  </div>
                </div>
                <div className="tab-content-scrollable custom-scrollbar" style={{ overflowY: 'auto', flex: 1 }}>
                  <div className="settings-grid" style={{ padding: '28px' }}>



                    <div>
                      <div className="info-section-label" style={{ padding: '0 0 12px 0', fontSize: '13px' }}>ACCENT COLOR</div>
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
                        {[
                          { id: 'blue', value: '#2196f3', label: 'Blue' },
                          { id: 'green', value: '#10b981', label: 'Green' },
                          { id: 'purple', value: '#8b5cf6', label: 'Purple' },
                          { id: 'orange', value: '#f97316', label: 'Orange' },
                          { id: 'red', value: '#ef4444', label: 'Red' },
                          { id: 'yellow', value: '#eab308', label: 'Yellow' }
                        ].map(c => (
                          <button
                            key={c.id}
                            onClick={() => setColor(c.id)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px',
                              borderRadius: '99px', border: `2px solid ${color === c.id ? c.value : 'var(--border)'}`,
                              backgroundColor: color === c.id ? `${c.value}15` : 'transparent',
                              cursor: 'pointer', transition: 'all 0.2s'
                            }}
                          >
                            <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: c.value, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {color === c.id && <Check size={10} color="#fff" strokeWidth={3} />}
                            </span>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: color === c.id ? c.value : 'var(--text-main)' }}>
                              {c.label}
                            </span>
                          </button>
                        ))}

                        {/* Custom Color Picker */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <button
                              style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px',
                                borderRadius: '99px', border: `2px solid ${color === 'custom' ? customColor : 'var(--border)'}`,
                                backgroundColor: color === 'custom' ? `${customColor}15` : 'transparent',
                                cursor: 'pointer', transition: 'all 0.2s'
                              }}
                            >
                              <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: customColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {color === 'custom' && <Check size={10} color="#fff" strokeWidth={3} />}
                              </span>
                              <span style={{ fontSize: '13px', fontWeight: '600', color: color === 'custom' ? customColor : 'var(--text-main)' }}>
                                Custom
                              </span>
                            </button>

                            <input
                              type="color"
                              defaultValue={customColor}
                              onChange={(e) => {
                                // We store the value in a temporary attribute or just handle it on Apply
                                e.target.setAttribute('data-pending', e.target.value);
                              }}
                              id="custom-color-picker"
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer'
                              }}
                            />
                          </div>

                          <button
                            onClick={() => {
                              const picker = document.getElementById('custom-color-picker');
                              const newColor = picker.getAttribute('data-pending') || picker.value;
                              setCustomColor(newColor);
                              setColor('custom');
                              toast.success('Custom color applied successfully!');
                            }}
                            style={{
                              padding: '10px 20px',
                              borderRadius: '12px',
                              border: 'none',
                              backgroundColor: 'var(--accent)',
                              color: 'white',
                              fontSize: '13px',
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: '700',
                              cursor: 'pointer',
                              boxShadow: '0 4px 12px rgba(var(--accent-rgb), 0.2)',
                              transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
                            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                          >
                            Apply Custom Color
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseWrapper>
  );
}