import React from 'react';

export default function LiveQueue() {
  const queue = [
    { id: 1, name: 'Billing Inquiry', priority: 'High', wait: '02:14' },
    { id: 2, name: 'General Support', priority: 'Normal', wait: '04:30' },
    { id: 3, name: 'Technical Issue', priority: 'Urgent', wait: '01:05' },
  ];

  return (
    <div className="dash-card">
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
        <h3>Live Call Queue <span style={{background: 'var(--danger)', color: 'var(--text-inverse)', padding: '2px 8px', borderRadius: 10, fontSize: 11, marginLeft: 8}}>3 Waiting</span></h3>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Priority</th>
              <th>Wait Time</th>
            </tr>
          </thead>
          <tbody>
            {queue.map(q => (
              <tr key={q.id}>
                <td style={{fontWeight: 500}}>{q.name}</td>
                <td>
                  <span style={{
                    color: q.priority === 'Urgent' ? 'var(--accent)' : q.priority === 'High' ? 'var(--accent)' : 'var(--accent)',
                    fontWeight: 600, fontSize: 12
                  }}>{q.priority}</span>
                </td>
                <td style={{color: 'var(--muted)', fontWeight: 600}}>{q.wait}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
