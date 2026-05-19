import { useState } from "react";
import { ChevronDown } from 'lucide-react';
import { BaseWrapper } from '../wrapper/base.wrapper';
import "../styles/TeampeeringPage.css";

const agents = [
    { rank: 1, name: "Anjali Singh",  handle: "anjalisingh",  callsMade: 785, connected: 307, conversions: 358, rankColor: "#f0c040", initials: "AS", bg: "#fdf3d0", fg: "#b8860b" },
    { rank: 2, name: "Rahul Kapoor",  handle: "rahulkapoor",  callsMade: 562, connected: 368, conversions: 138, rankColor: "#c8d0da", initials: "RK", bg: "#e8edf5", fg: "#546078" },
    { rank: 3, name: "Neha Mehta",    handle: "nehametha",    callsMade: 550, connected: 334, conversions: 142, rankColor: "#d4895a", initials: "NM", bg: "#fce8da", fg: "#a0522d" },
    { rank: 4, name: "Priya Sharma",  handle: "priyasharma",  callsMade: 413, connected: 245, conversions: 103, rankColor: "var(--accent)", initials: "PS", bg: "var(--accent-light)", fg: "var(--accent)", isYou: true },
    { rank: 5, name: "Vikram Joshi",  handle: "vikramjoshi",  callsMade: 390, connected: 236, conversions:  97, rankColor: "#a78bdb", initials: "VJ", bg: "#f0eaff", fg: "#5a3ea0" },
    { rank: 6, name: "Sneha Patil",   handle: "snehapatil",   callsMade: 357, connected: 211, conversions:  85, rankColor: "#f0a060", initials: "SP", bg: "#fff0e8", fg: "#a0522d" },
    { rank: 7, name: "Arjun Das",     handle: "arjundas",     callsMade: 290, connected: 135, conversions:  70, rankColor: "#5cc890", initials: "AD", bg: "#e8f7ee", fg: "#1e6e3c" },
];

const shuffleAgents = (seed) => {
    let shuffled = [...agents].sort((a, b) => {
        let scoreA = (a.name.length * seed) % 7;
        let scoreB = (b.name.length * seed) % 7;
        if (scoreA === scoreB) return a.callsMade - b.callsMade;
        return scoreB - scoreA;
    });
    return shuffled.map((a, i) => ({
        ...a,
        rank: i + 1,
        rankColor: agents[i].rankColor
    }));
};

const queuesData = {
    "All": agents,
    "Queue 1": shuffleAgents(1),
    "Queue 2": shuffleAgents(2),
    "Queue 3": shuffleAgents(3)
};

const ordSuffix = (n) => ["st", "nd", "rd"][n - 1] ?? "th";
const ordLabel  = (n) => `${n}${ordSuffix(n)}`;

/* ─── Avatar with rank badge ─── */
function Avatar({ a, large = false }) {
    return (
        <div className="lb-avatar-wrap">
            <div
                className={`lb-avatar${large ? " size-lg" : ""}`}
                style={{ background: a.bg, color: a.fg }}
            >
                {a.initials}
            </div>
            <div
                className="lb-rank-badge"
                style={{
                    background: a.rankColor,
                    color: a.rank === 1 ? "#7a5500" : a.rank === 2 ? "#3d4f5c" : "#6b3a1e",
                }}
            >
                {ordLabel(a.rank)}
            </div>
        </div>
    );
}

/* ─── Small avatar used in table rows ─── */
function SmallAvatar({ a }) {
    return (
        <div
            className="lb-small-avatar"
            style={{ background: a.bg, color: a.fg }}
        >
            {a.initials}
        </div>
    );
}

/* ─── Top-3 podium card ─── */
function PodiumCard({ a }) {
    const isFirst = a.rank === 1;
    return (
        <div className={`lb-podium-card rank-${a.rank}`}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar a={a} large={isFirst} />
            </div>

            <div className="lb-card-name">{a.name}</div>
            <div className="lb-card-handle">{a.handle}</div>

            <div className="lb-calls-badge">
                {a.callsMade.toLocaleString()} Calls Made
            </div>

            <div className="lb-card-stats">
                {[
                    { icon: "📞", val: a.connected,   lbl: "Connected"   },
                    { icon: "↗",  val: a.conversions, lbl: "Conversions" },
                    { icon: "⇄",  val: a.callsMade,   lbl: "Calls"       },
                ].map(({ icon, val, lbl }) => (
                    <div key={lbl} style={{ textAlign: "center" }}>
                        <div className="lb-stat-icon">{icon}</div>
                        <div className="lb-stat-val">{val}</div>
                        <div className="lb-stat-lbl">{lbl}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Table row (rank 4+) ─── */
function AgentRow({ a, isLast }) {
    return (
        <div className={`lb-row${a.isYou ? " is-you" : ""}${isLast ? " last" : ""}`}>
            {/* Rank */}
            <div className="lb-row-rank">
                <span className="lb-row-rank-num">{a.rank}</span>
                <span className="lb-row-rank-suf">{ordSuffix(a.rank)}</span>
            </div>

            {/* Avatar */}
            <SmallAvatar a={a} />

            {/* Name + handle */}
            <div className="lb-row-info">
                <div className="lb-row-name">
                    {a.name}
                    {a.isYou && <span className="lb-you-badge">You</span>}
                </div>
                <div className="lb-row-handle">{a.handle}</div>
            </div>

            {/* Calls badge */}
            <div className="lb-row-calls-badge">{a.callsMade} Calls Made</div>

            {/* Metrics */}
            <div className="lb-row-metrics">
                {[a.callsMade, a.connected, a.conversions].map((val, i) => (
                    <div key={i} className="lb-metric-cell">{val}</div>
                ))}
            </div>
        </div>
    );
}

/* ─── Main component ─── */
export default function TelecallingLeaderboard() {
    const [tab, setTab]       = useState("this");
    const [search, setSearch] = useState("");
    const [queue, setQueue]   = useState("All");

    const currentAgents = queuesData[queue];

    // Podium order: 2nd, 1st, 3rd
    const podium = [currentAgents[1], currentAgents[0], currentAgents[2]];

    const rest = currentAgents.slice(3).filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.handle.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <BaseWrapper tabProps={{ tabs: [], headerText: "Team Peering Leaderboard" }}>
            <div className="lb-root">

                {/* ── Header ── */}
                <div className="lb-header">
                    <a href="/dashboard" className="lb-back-link">← Back to Dashboard</a>
                    <div className="lb-header-controls" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <select 
                                className="lb-queue-select" 
                                style={{ appearance: 'none', padding: '6px 30px 6px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'inherit', outline: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px' }}
                                value={queue}
                                onChange={e => setQueue(e.target.value)}
                            >
                                {Object.keys(queuesData).map(q => <option key={q} value={q}>{q}</option>)}
                            </select>
                            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', pointerEvents: 'none', color: 'var(--muted)' }} />
                        </div>
                        <div className="lb-tab-group">
                            {[["this", "This week"], ["last", "Last week"]].map(([val, label]) => (
                                <button
                                    key={val}
                                    className={`lb-tab-btn${tab === val ? " active" : ""}`}
                                    onClick={() => setTab(val)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
<div className="lb-main">
                {/* ── Top 3 Podium ── */}
                <div className="lb-podium">
                    {podium.map(a => <PodiumCard key={a.rank} a={a} />)}
                </div>

                {/* ── Table section ── */}
                <div className="lb-table-section">

                    {/* Toolbar: search + column headers */}
                    <div className="lb-table-toolbar">
                        <div className="lb-search-wrap">
                            <span className="lb-search-icon">🔍</span>
                            <input
                                type="text"
                                className="lb-search-input"
                                placeholder="Search for user…"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="lb-col-headers">
                            {["Calls Made", "Connected", "Conversions"].map(h => (
                                <div key={h} className="lb-col-head">{h}</div>
                            ))}
                        </div>
                    </div>

                    {/* Rows */}
                    <div className="lb-table-body">
                        {rest.length > 0
                            ? rest.map((a, i) => (
                                <AgentRow key={a.rank} a={a} isLast={i === rest.length - 1} />
                            ))
                            : <div className="lb-empty">No agents found</div>
                        }
                    </div>
                </div>

            </div>
            </div>
        </BaseWrapper>
    );
}