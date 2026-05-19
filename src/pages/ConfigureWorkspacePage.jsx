import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConfigureWorkspacePage({ onFieldFocus, onGoBack }) {
    const [campaign, setCampaign] = useState('');
    const [team, setTeam] = useState('');
    const [queue, setQueue] = useState([]);
    const [isQueueOpen, setIsQueueOpen] = useState(false);
    const navigate = useNavigate();

    const isQueueEnabled = campaign !== '' && team !== '';

    const queueOptions = [
        { value: 'q1', label: 'Tier 1 Support' },
        { value: 'q2', label: 'Billing Queries' },
        { value: 'q3', label: 'Escalations' }
    ];

    const handleQueueToggle = (val) => {
        if (queue.includes(val)) {
            setQueue(queue.filter(q => q !== val));
        } else {
            setQueue([...queue, val]);
        }
    };

    const handleDetailsSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="form-wrapper details-form" id="details-form">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <button
                    type="button"
                    onClick={onGoBack}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', color: 'var(--muted)' }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
                >
                    <ArrowLeft />
                </button>
                <h2 style={{ margin: 0 }}>Configure Workspace</h2>
            </div>
            <p className="desc">Please select your operational details to enter the dashboard.</p>
            <form id="details-form-element" onSubmit={handleDetailsSubmit}>
                <div className="input-group">
                    <label>Extension Number</label>
                    <input
                        type="text"
                        value="1001 - Agent Desk"
                        id="extension-input"
                        readOnly
                        onFocus={() => onFieldFocus('extension')}
                        onBlur={() => onFieldFocus('default')}
                    />
                </div>
                <div className="input-group">
                    <label>Team</label>
                    <select
                        id="team-select"
                        required
                        value={team}
                        onChange={(e) => {
                            setTeam(e.target.value);
                            setCampaign('');   // Reset campaign when team changes
                            setQueue([]);      // Reset queue when team changes
                        }}
                        onFocus={() => onFieldFocus('team')}
                        onBlur={() => onFieldFocus('default')}
                    >
                        <option value="">Select Team</option>
                        <option value="alpha">Alpha Achievers</option>
                        <option value="beta">Beta Builders</option>
                        <option value="gamma">Gamma Group</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>Campaign</label>
                    <select
                        id="campaign-select"
                        required
                        value={campaign}
                        disabled={!team}   // 👈 Disabled until team is selected
                        onChange={(e) => setCampaign(e.target.value)}
                        onFocus={() => onFieldFocus('campaign')}
                        onBlur={() => onFieldFocus('default')}
                    >
                        <option value="">Select Campaign</option>
                        <option value="inbound">Inbound Customer Service</option>
                        <option value="outbound">Outbound Lead Generation</option>
                        <option value="blended">Blended Operations</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>Queue</label>
                    <div className={`multi-select-container ${!isQueueEnabled ? 'disabled' : ''}`}>
                        <div
                            className="multi-select-header"
                            onClick={() => {
                                if (isQueueEnabled) {
                                    setIsQueueOpen(!isQueueOpen);
                                    onFieldFocus('queue');
                                }
                            }}
                        >
                            <span>{queue.length === 0 ? 'Select Queue(s)' : queue.map(q => queueOptions.find(o => o.value === q)?.label).join(', ')}</span>
                            <span className="dropdown-arrow"><span className="material-symbols-outlined">arrow_drop_down</span></span>
                        </div>
                        {isQueueOpen && isQueueEnabled && (
                            <div className="multi-select-menu">
                                <label className="multi-select-option">
                                    <input
                                        type="checkbox"
                                        checked={queue.length === queueOptions.length}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setQueue(queueOptions.map(option => option.value));
                                            } else {
                                                setQueue([]);
                                            }
                                        }}
                                    />
                                    Select All
                                </label>
                                {queueOptions.map(option => (
                                    <label key={option.value} className="multi-select-option">
                                        <input
                                            type="checkbox"
                                            checked={queue.includes(option.value)}
                                            onChange={() => handleQueueToggle(option.value)}
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button type="submit" className="primary-btn">Enter Dashboard</button>
            </form>
        </div>
    );
}
