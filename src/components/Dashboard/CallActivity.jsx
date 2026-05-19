import React from 'react';

export default function CallActivity() {
  const calls = [
    { id: 1, name: 'Alice Freeman', status: 'Completed', time: '10:42 AM', duration: '4m 12s' },
    { id: 2, name: 'Acme Corp Support', status: 'Escalated', time: '10:15 AM', duration: '12m 05s' },
    { id: 3, name: 'John Doe', status: 'Missed', time: '09:30 AM', duration: '0m 00s' },
    { id: 4, name: 'Sarah  Mumkins', status: 'Completed', time: '09:12 AM', duration: '2m 45s' },
    { id: 5, name: 'Tech Solutions', status: 'Completed', time: '08:45 AM', duration: '8m 20s' },
  ];

  return (
    <div className="dash-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3>Call Activity</h3>
        <span style={{ fontSize: 12, color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}>View All</span>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Contact</th>
              <th>Status</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {calls.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 500 }}>{c.name}</td>
                <td><span className={`status-dot ${c.status.toLowerCase()}`}></span> {c.status}</td>
                <td style={{ color: 'var(--muted)' }}>{c.time}</td>
                <td style={{ color: 'var(--muted)' }}>{c.duration}</td>
                <td><button className="btn-icon">⋯</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
