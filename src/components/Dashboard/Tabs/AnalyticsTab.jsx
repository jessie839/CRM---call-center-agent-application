import React, { useState, useRef, useEffect } from 'react';
import '../../../styles/AnalyticsTab.css';

/* ── Sparkline SVG ── */
function Sparkline({ data, color, width = 80, height = 32 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });
  const area = `M${pts[0]} ` + pts.slice(1).map(p => `L${p}`).join(' ') + ` L${width},${height} L0,${height} Z`;
  const line = `M${pts[0]} ` + pts.slice(1).map(p => `L${p}`).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <path d={area} fill={color} opacity="0.12" />
      <path d={line} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/* ── KPI Card ── */
function KpiCard({ label, value, unit, trend, trendUp, insight, sparkData, color, icon }) {
  const isGood = trendUp !== false;
  return (
    <div className="aat-kpi-card">
      <div className="aat-kpi-top">
        <div className="aat-kpi-icon" style={{ background: color + '18', color }}>
          {icon}
        </div>
        <div className={`aat-kpi-trend ${isGood ? 'good' : 'bad'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </div>
      </div>
      <div className="aat-kpi-value">
        {value}<span className="aat-kpi-unit">{unit}</span>
      </div>
      <div className="aat-kpi-label">{label}</div>
      <div className="aat-kpi-bottom">
        <div className="aat-kpi-insight">{insight}</div>
        <Sparkline data={sparkData} color={color} />
      </div>
    </div>
  );
}

/* ── Section Header ── */
function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="aat-section-header">
      <div>
        <div className="aat-section-title">{title}</div>
        {subtitle && <div className="aat-section-sub">{subtitle}</div>}
      </div>
      {action}
    </div>
  );
}

/* ── Insight Card ── */
function InsightCard({ type, message, tag, action }) {
  const typeMap = {
    warning: { cls: 'warning', icon: '⚠' },
    critical: { cls: 'critical', icon: '✕' },
    success: { cls: 'success', icon: '✓' },
    info: { cls: 'info', icon: 'ℹ' },
  };
  const t = typeMap[type] || typeMap.info;
  return (
    <div className={`aat-insight-card aat-insight-card--${t.cls}`}>
      <span className={`aat-insight-icon aat-insight-icon--${t.cls}`}>{t.icon}</span>
      <div className="aat-insight-body">
        <div className="aat-insight-msg">{message}</div>
        {tag && <span className="aat-insight-tag">{tag}</span>}
      </div>
      {action && <button className="aat-insight-action">{action}</button>}
    </div>
  );
}

/* ── AI vs Human Bar Chart (Canvas-free, pure SVG) ── */
function AIvsHumanChart() {
  const [tooltip, setTooltip] = useState(null);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const aiData  = [62, 68, 71, 84, 78, 89];
  const humData = [38, 32, 29, 16, 22, 11];
  const anomaly = [false, false, false, true, false, false];

  const W = 560, H = 200, PAD_L = 36, PAD_B = 28, BAR_W = 28, GAP = 56;

  return (
    <div className="aat-card" style={{ position: 'relative' }}>
      <SectionHeader
        title="AI vs Human Interaction"
        subtitle="% of total conversations handled"
        action={
          <div className="aat-chart-legend">
            <span><span className="aat-dot" style={{ background: 'var(--accent)' }} />AI Resolved</span>
            <span><span className="aat-dot" style={{ background: '#e2e8f0' }} />Human</span>
          </div>
        }
      />
      <div className="aat-chart-wrap">
        <svg width="100%" viewBox={`0 0 ${W} ${H + PAD_B}`} preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(v => {
            const y = H - (v / 100) * (H - 20);
            return (
              <g key={v}>
                <line x1={PAD_L} y1={y} x2={W} y2={y} stroke="var(--border)" strokeWidth="1" />
                <text x={PAD_L - 4} y={y + 4} fill="var(--muted)" fontSize="10" textAnchor="end">{v}</text>
              </g>
            );
          })}

          {months.map((m, i) => {
            const x = PAD_L + i * GAP + 20;
            const aiH = (aiData[i] / 100) * (H - 20);
            const humH = (humData[i] / 100) * (H - 20);
            const aiY = H - aiH;
            const humY = aiY - humH;
            const isAnomaly = anomaly[i];

            return (
              <g key={m}
                onMouseEnter={() => setTooltip({ i, x, aiData: aiData[i], humData: humData[i], m })}
                onMouseLeave={() => setTooltip(null)}
                style={{ cursor: 'pointer' }}
              >
                {isAnomaly && (
                  <rect x={x - BAR_W / 2 - 4} y={humY - 8} width={BAR_W + 8} height={H - humY + 8}
                    fill="var(--accent)" opacity="0.06" rx="4" />
                )}
                {/* Stacked bars */}
                <rect x={x - BAR_W / 2} y={aiY} width={BAR_W} height={aiH} rx="3"
                  fill={isAnomaly ? 'var(--accent-2)' : 'var(--accent)'} />
                <rect x={x - BAR_W / 2} y={humY} width={BAR_W} height={humH} rx="3"
                  fill={isAnomaly ? '#cbd5e1' : '#e2e8f0'} />
                {isAnomaly && (
                  <text x={x} y={humY - 12} textAnchor="middle" fill="var(--accent-2)" fontSize="9" fontWeight="600">
                    SPIKE
                  </text>
                )}
                <text x={x} y={H + PAD_B - 6} textAnchor="middle" fill="var(--muted)" fontSize="11"
                  fontWeight={isAnomaly ? '700' : '400'}>
                  {m}
                </text>
              </g>
            );
          })}
        </svg>

        {tooltip && (
          <div className="aat-chart-tooltip" style={{ left: `${(tooltip.i + 0.5) * (100 / 6)}%` }}>
            <div className="aat-tt-title">{tooltip.m} 2025</div>
            <div className="aat-tt-row"><span style={{ color: '#a5b4fc' }}>AI handled</span><strong>{tooltip.aiData}%</strong></div>
            <div className="aat-tt-row"><span style={{ color: 'var(--muted)' }}>Human</span><strong>{tooltip.humData}%</strong></div>
            {tooltip.i === 3 && <div className="aat-tt-reason">↑ Billing query spike drove escalations</div>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── AI Performance Trend ── */
function PerformanceTrendChart() {
  const W = 360, H = 160;
  const data = [78, 80, 75, 82, 71, 68, 74, 79, 85, 83, 88, 91, 87, 93];
  const target = 80;
  const max = 100, min = 60;

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (W - 20) + 10;
    const y = H - ((v - min) / (max - min)) * (H - 20) - 10;
    return [x, y];
  });

  const targetY = H - ((target - min) / (max - min)) * (H - 20) - 10;
  const linePath = `M${pts[0][0]},${pts[0][1]} ` + pts.slice(1).map(p => `L${p[0]},${p[1]}`).join(' ');
  const areaPath = linePath + ` L${pts[pts.length - 1][0]},${H} L${pts[0][0]},${H} Z`;

  const dipIndices = data.reduce((acc, v, i) => { if (v < target) acc.push(i); return acc; }, []);

  return (
    <div className="aat-card">
      <SectionHeader title="AI Performance Trend" subtitle="Accuracy rate, 2-week view" />
      <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--aat-indigo)', margin: '8px 0 2px' }}>91.3%</div>
      <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        vs last period <span className="aat-pill good">↑ 6.2%</span>
      </div>

      <div style={{ position: 'relative', height: H }}>
        <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Target line */}
          <line x1="0" y1={targetY} x2={W} y2={targetY} stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="4" y={targetY - 4} fill="var(--accent)" fontSize="9" fontWeight="600">TARGET</text>

          {/* Dip highlights */}
          {dipIndices.map(i => (
            <circle key={i} cx={pts[i][0]} cy={pts[i][1]} r="4" fill="var(--accent)" opacity="0.7" />
          ))}

          <path d={areaPath} fill="url(#perfGrad)" />
          <path d={linePath} stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      <div className="aat-perf-legend">
        <span><span className="aat-dot" style={{ background: 'var(--accent)' }} />Accuracy</span>
        <span><span className="aat-dot" style={{ background: 'var(--warning)', borderRadius: 1 }} />Target (80%)</span>
        <span><span className="aat-dot" style={{ background: 'var(--danger)' }} />Below target</span>
      </div>
    </div>
  );
}

/* ── AI Failure Analysis Table ── */
const FAILURES = [
  { id: 1, category: 'Billing', query: 'Refund for double charge', reason: 'Misunderstood intent', severity: 'high', fix: 'Add refund intent training samples', status: 'open' },
  { id: 2, category: 'Technical', query: 'Router keeps disconnecting', reason: 'No matching knowledge', severity: 'medium', fix: 'Expand network troubleshooting KB', status: 'training' },
  { id: 3, category: 'Payments', query: 'Failed international transfer', reason: 'Timeout — slow API', severity: 'high', fix: 'Increase payment API timeout threshold', status: 'open' },
  { id: 4, category: 'Account', query: 'Reset 2FA without phone', reason: 'Policy gap — no flow', severity: 'medium', fix: 'Build 2FA recovery conversation flow', status: 'review' },
  { id: 5, category: 'Cancellation', query: 'Cancel and get prorated refund', reason: 'Multi-intent confusion', severity: 'low', fix: 'Train on compound intent detection', status: 'training' },
];

const SEV_MAP = { high: 'aat-sev--high', medium: 'aat-sev--med', low: 'aat-sev--low' };
const STATUS_MAP = { open: 'aat-status--open', training: 'aat-status--training', review: 'aat-status--review' };

function FailureTable() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="aat-card">
      <SectionHeader
        title="AI Failure Analysis"
        subtitle="Escalations categorised by root cause"
        action={<a className="aat-link" href="#">View all →</a>}
      />
      <table className="aat-fail-table">
        <thead>
          <tr>
            <th>Category</th>
            <th className="hide-on-mobile">Failure Reason</th>
            <th>Severity</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {FAILURES.map(f => (
            <React.Fragment key={f.id}>
              <tr className="aat-fail-row" onClick={() => setExpanded(expanded === f.id ? null : f.id)}>
                <td>
                  <div className="aat-fail-cat">{f.category}</div>
                  <div className="aat-fail-query">{f.query}</div>
                </td>
                <td className="hide-on-mobile"><span className="aat-reason-tag">{f.reason}</span></td>
                <td><span className={`aat-sev ${SEV_MAP[f.severity]}`}>{f.severity}</span></td>
                <td><span className={`aat-status-pill ${STATUS_MAP[f.status]}`}>{f.status}</span></td>
                <td className="aat-expand-btn">{expanded === f.id ? '▲' : '▼'}</td>
              </tr>
              {expanded === f.id && (
                <tr className="aat-fail-drill">
                  <td colSpan={5}>
                    <div className="aat-drill-body">
                      <div className="aat-drill-label">Suggested Training Fix</div>
                      <div className="aat-drill-fix">
                        <span className="aat-drill-icon">🔧</span> {f.fix}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Outcome Intelligence Donut ── */
function OutcomeDonut() {
  const outcomes = [
    { label: 'Resolved by AI', pct: 72, color: 'var(--accent)' },
    { label: 'Escalated',      pct: 19, color: 'var(--warning)' },
    { label: 'Dropped',        pct: 9,  color: 'var(--border)' },
  ];

  const CX = 90, CY = 90, R = 70, STROKE = 20;
  const circumference = 2 * Math.PI * R;
  let offset = 0;

  const arcs = outcomes.map(o => {
    const dash = (o.pct / 100) * circumference;
    const arc = { ...o, dash, offset };
    offset += dash;
    return arc;
  });

  return (
    <div className="aat-card">
      <SectionHeader title="Outcome Intelligence" subtitle="Conversation resolution breakdown" />
      <div className="aat-donut-wrap">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--border)" strokeWidth={STROKE} />
          {arcs.map((a, i) => (
            <circle key={i} cx={CX} cy={CY} r={R} fill="none"
              stroke={a.color} strokeWidth={STROKE}
              strokeDasharray={`${a.dash} ${circumference - a.dash}`}
              strokeDashoffset={-a.offset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${CX} ${CY})`}
            />
          ))}
          <text x={CX} y={CY - 8} textAnchor="middle" fill="var(--accent)" fontSize="22" fontWeight="700">72%</text>
          <text x={CX} y={CY + 10} textAnchor="middle" fill="var(--muted)" fontSize="9">AI Success</text>
        </svg>
        <div className="aat-donut-legend">
          {outcomes.map(o => (
            <div key={o.label} className="aat-donut-row">
              <span className="aat-dot" style={{ background: o.color }} />
              <span className="aat-donut-label">{o.label}</span>
              <span className="aat-donut-pct">{o.pct}%</span>
            </div>
          ))}
          <div className="aat-donut-insight">AI handles <strong>72%</strong> of all conversations without human intervention</div>
        </div>
      </div>
    </div>
  );
}

/* ── Top Failed Intents ── */
const INTENTS = [
  { label: 'Refund Processing',      count: 412, pct: 88 },
  { label: 'International Transfer', count: 298, pct: 64 },
  { label: '2FA Recovery',           count: 241, pct: 52 },
  { label: 'Plan Downgrade',         count: 187, pct: 40 },
  { label: 'Proration Calculation',  count: 134, pct: 29 },
];

function TopFailedIntents() {
  return (
    <div className="aat-card">
      <SectionHeader title="Top Failed Intents" subtitle="By escalation volume" />
      <div className="aat-intent-list">
        {INTENTS.map((it, i) => (
          <div key={it.label} className="aat-intent-row">
            <div className="aat-intent-rank">{i + 1}</div>
            <div className="aat-intent-body">
              <div className="aat-intent-top">
                <span className="aat-intent-label">{it.label}</span>
                <span className="aat-intent-count">{it.count} fails</span>
              </div>
              <div className="aat-intent-bar-bg">
                <div className="aat-intent-bar-fill" style={{ width: `${it.pct}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Peak Failure Heatmap ── */
const HOURS = ['12a','2a','4a','6a','8a','10a','12p','2p','4p','6p','8p','10p'];
const DAYS  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const HEAT_DATA = [
  [1,0,0,2,5,8,6,7,9,8,4,2],
  [1,0,0,1,6,9,8,9,10,7,5,2],
  [2,0,0,2,5,7,6,8,9,8,4,1],
  [1,0,0,1,4,6,5,7,8,7,3,1],
  [2,1,0,2,5,7,6,7,6,5,3,1],
  [0,0,0,0,2,3,5,6,4,3,2,1],
  [0,0,0,0,1,2,3,4,3,2,1,0],
];

function PeakFailureHeatmap() {
  const [hovered, setHovered] = useState(null);
  const maxV = 10;
  return (
    <div className="aat-card">
      <SectionHeader title="Peak Failure Time" subtitle="AI escalation density by hour" />
      <div className="aat-heat-wrap">
        <div className="aat-heat-grid">
          {/* Header row */}
          <div className="aat-heat-corner" />
          {HOURS.map(h => <div key={h} className="aat-heat-head">{h}</div>)}

          {DAYS.map((d, di) => (
            <React.Fragment key={d}>
              <div className="aat-heat-day">{d}</div>
              {HOURS.map((h, hi) => {
                const v = HEAT_DATA[di][hi];
                const intensity = v / maxV;
                const isHigh = v >= 8;
                const isHov = hovered && hovered[0] === di && hovered[1] === hi;
                let bg = `rgba(var(--accent-rgb),${intensity * 0.85})`;
                if (v === 0) bg = '#f8fafc';
                return (
                  <div
                    key={h}
                    className={`aat-heat-cell ${isHigh ? 'aat-heat-cell--hot' : ''} ${isHov ? 'aat-heat-cell--hov' : ''}`}
                    style={{ background: bg }}
                    onMouseEnter={() => setHovered([di, hi])}
                    onMouseLeave={() => setHovered(null)}
                    title={`${d} ${h}: ${v} escalations`}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
        <div className="aat-heat-scale">
          <span>Low</span>
          <div className="aat-heat-gradient" />
          <span>High</span>
        </div>
        <div className="aat-heat-note">Peak failures: Tue–Thu, 8am–5pm. Consider increasing AI training data for business hours.</div>
      </div>
    </div>
  );
}

/* ── Confidence Score Distribution ── */
function ConfidencePanel() {
  const buckets = [
    { range: '90–100%', count: 8420, cls: 'conf-top' },
    { range: '75–89%',  count: 6130, cls: 'conf-good' },
    { range: '60–74%',  count: 3210, cls: 'conf-mid' },
    { range: '< 60%',   count: 1804, cls: 'conf-low' },
  ];
  const total = buckets.reduce((s, b) => s + b.count, 0);
  return (
    <div className="aat-card">
      <SectionHeader title="AI Confidence Distribution" subtitle="Per-interaction confidence score" />
      <div className="aat-conf-list">
        {buckets.map(b => {
          const pct = Math.round((b.count / total) * 100);
          return (
            <div key={b.range} className="aat-conf-row">
              <div className="aat-conf-meta">
                <span className="aat-conf-range">{b.range}</span>
                <span className="aat-conf-count">{b.count.toLocaleString()}</span>
              </div>
              <div className="aat-conf-bar-bg">
                <div className={`aat-conf-bar-fill ${b.cls}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="aat-conf-pct">{pct}%</span>
            </div>
          );
        })}
      </div>
      <div className="aat-conf-note">
        <span className="aat-pill good">43.7% high-confidence</span>
        <span style={{ color: 'var(--muted)', fontSize: 12 }}>9.4% of interactions flagged for retraining</span>
      </div>
    </div>
  );
}

/* ── Filter Bar ── */
function FilterBar({ range, setRange, category, setCategory }) {
  return (
    <div className="aat-filterbar">
      <div className="aat-filterbar-left">
        <span className="aat-filterbar-label">AI Agent Analytics</span>
        <span className="aat-filterbar-badge">Live</span>
      </div>
      <div className="aat-filterbar-right">
        {['7D','30D','90D','1Y'].map(r => (
          <button key={r} className={`aat-range-btn ${range === r ? 'active' : ''}`} onClick={() => setRange(r)}>{r}</button>
        ))}
        <select className="aat-filter-select" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="billing">Billing</option>
          <option value="technical">Technical</option>
          <option value="payments">Payments</option>
          <option value="account">Account</option>
        </select>
      </div>
    </div>
  );
}

/* ── Alert Banner ── */
function AlertBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="aat-alert">
      <span className="aat-alert-icon">⚠</span>
      <span className="aat-alert-text">
        <strong>Critical:</strong> Escalation rate for <em>Billing</em> category increased 18% in the last 48 hours — retraining recommended.
      </span>
      <button className="aat-alert-action">View Details</button>
      <button className="aat-alert-close" onClick={() => setVisible(false)}>✕</button>
    </div>
  );
}

/* ══════════════════════════════════
   MAIN EXPORT
══════════════════════════════════ */
export default function AIAnalyticsTab() {
  const [range, setRange] = useState('30D');
  const [category, setCategory] = useState('all');

  const kpis = [
    {
      label: 'AI Resolution Rate',
      value: '72.4',
      unit: '%',
      trend: '5.1%',
      trendUp: true,
      insight: 'Best performance this quarter',
      sparkData: [62, 65, 68, 70, 71, 72, 70, 73, 72, 74],
      color: 'var(--accent)',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      label: 'Handoff Rate',
      value: '19.3',
      unit: '%',
      trend: '2.8%',
      trendUp: false,
      insight: 'Billing intents driving escalations',
      sparkData: [24, 23, 22, 21, 22, 20, 21, 19, 20, 19],
      color: 'var(--warning)',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      label: 'AI Accuracy',
      value: '91.3',
      unit: '%',
      trend: '6.2%',
      trendUp: true,
      insight: 'Intent recognition near target',
      sparkData: [83, 84, 85, 87, 86, 88, 89, 90, 91, 91],
      color: 'var(--success)',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      label: 'Time Saved',
      value: '1,284',
      unit: ' hrs',
      trend: '12.3%',
      trendUp: true,
      insight: 'vs equivalent human agent cost',
      sparkData: [900, 950, 1000, 1050, 1100, 1150, 1180, 1220, 1260, 1284],
      color: 'var(--accent)',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  const insights = [
    { type: 'critical', message: 'Escalation rate up 18% — billing refund intents failing consistently', tag: 'Billing', action: 'Retrain →' },
    { type: 'warning',  message: 'AI confidence below 60% for 9.4% of interactions this week', tag: 'Accuracy', action: 'Review →' },
    { type: 'success',  message: 'Payment flow intent accuracy improved 12% after last training cycle', tag: 'Payments' },
    { type: 'info',     message: 'Training recommended for category: 2FA Recovery (241 failures this month)', tag: 'Account', action: 'Train →' },
  ];

  return (
    <div className="aat-root">
      <FilterBar range={range} setRange={setRange} category={category} setCategory={setCategory} />
      <AlertBanner />

      {/* KPI Row */}
      <div className="aat-kpi-grid">
        {kpis.map(k => <KpiCard key={k.label} {...k} />)}
      </div>

      {/* AI Insight Panel */}
      <div className="aat-card aat-insight-panel">
        <div className="aat-insight-panel-header">
          <span className="aat-insight-panel-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
          <span className="aat-insight-panel-title">AI Self-Analysis — What needs attention</span>
          <span className="aat-insight-panel-time">Updated 2 min ago</span>
        </div>
        <div className="aat-insight-grid">
          {insights.map((ins, i) => <InsightCard key={i} {...ins} />)}
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="aat-grid-2-1">
        <AIvsHumanChart />
        <PerformanceTrendChart />
      </div>

      {/* Charts Row 2 */}
      <div className="aat-grid-2-1">
        <FailureTable />
        <OutcomeDonut />
      </div>

      {/* Bottom Row */}
      <div className="aat-grid-3">
        <TopFailedIntents />
        <PeakFailureHeatmap />
        <ConfidencePanel />
      </div>
    </div>
  );
}