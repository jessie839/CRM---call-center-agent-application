import React from 'react';

export default function CallSummary() {
  return (
    <div className="soft-card">
      <h3 className="soft-card-title">Call Summary</h3>
      <p style={{fontSize: 13, color: 'var(--text-main)', fontWeight: 600, marginBottom: 8}}>Follow-Up Discussion regarding Server Costs</p>
      
      <div style={{display: 'flex', gap: 16, marginBottom: 24}}>
        <div>
          <span style={{display: 'block', fontSize: 11, color: 'var(--muted)', marginBottom: 2}}>Status</span>
          <span style={{background: 'var(--success-light)', color: 'var(--success)', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700}}>Completed</span>
        </div>
        <div>
          <span style={{display: 'block', fontSize: 11, color: 'var(--muted)', marginBottom: 2}}>Contact</span>
          <div style={{display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500}}>
            <div style={{width: 16, height: 16, background: '#c7d2fe', borderRadius: '50%'}}></div>
            Dr. Alicia Kim
          </div>
        </div>
        <div>
          <span style={{display: 'block', fontSize: 11, color: 'var(--muted)', marginBottom: 2}}>Date</span>
          <span style={{fontSize: 13, color: 'var(--text-main)', fontWeight: 500}}>July 25, 2026</span>
        </div>
      </div>

      <div className="timeline-container">
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-time">10:30 – 10:35</div>
          <div className="timeline-desc">Check-in and Intake Verification</div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-time">10:35 – 10:50</div>
          <div className="timeline-desc">Technical Consultation & Diagnosis</div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-time">10:50 – 11:00</div>
          <div className="timeline-desc">Resolution & Notes Review</div>
        </div>
      </div>
      
    </div>
  );
}
