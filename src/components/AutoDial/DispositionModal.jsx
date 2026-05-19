import { useState } from 'react';
import '../../styles/AutoDial.css';

const DISPOSITIONS = ["New Lead", "Contacted", "Interested", "Rejected", "Follow-up", "No Answer", "Callback", "Meeting"];
const SCHEDULING_DISPOSITIONS = ['Callback', 'Meeting', 'Follow-up'];

export default function DispositionModal({ lead, onSave }) {
  const [disposition, setDisposition] = useState(lead?.disposition || 'Contacted');
  const [notes, setNotes] = useState('');
  const [dispositionDateTime, setDispositionDateTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const isScheduled = SCHEDULING_DISPOSITIONS.includes(disposition);
    onSave({ disposition, notes, dispositionDateTime });
    if (isScheduled) {
      const label = disposition === 'Meeting' ? 'Meeting' : 'Callback';
      const snackbar = document.createElement('div');
      snackbar.style.cssText = `
        position: fixed;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #1e293b, #0f172a);
        color: #fff;
        padding: 14px 24px;
        border-radius: 12px;
        z-index: 99999;
        box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        font-weight: 500;
        opacity: 1;
        border: 1px solid rgba(74, 222, 128, 0.3);
        transition: opacity 0.4s ease-in-out;
        min-width: 320px;
        max-width: 480px;
      `;
      const icon = document.createElement('div');
      icon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
      icon.style.cssText = 'display:flex;align-items:center;flex-shrink:0;';
      snackbar.appendChild(icon);
      const text = document.createTextNode(`✓ ${label} has been initiated — we will notify you at the scheduled time.`);
      snackbar.appendChild(text);
      document.body.appendChild(snackbar);
      setTimeout(() => {
        snackbar.style.opacity = '0';
        setTimeout(() => snackbar.remove(), 400);
      }, 4500);
    }
  };

  return (
    <div className="ad-modal-overlay">
      <div className="ad-modal">
        <div className="ad-modal-header">
          <h3 className="ad-modal-title">Call Outcome: {lead?.firstName} {lead?.lastName}</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="ad-modal-body">
          <div className="ad-field">
            <label>Disposition <span style={{color: 'var(--danger)'}}>*</span></label>
            <select 
              value={disposition} 
              onChange={(e) => setDisposition(e.target.value)}
              className="ad-select"
              required
            >
              {DISPOSITIONS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {SCHEDULING_DISPOSITIONS.includes(disposition) && (
            <div className="ad-field fade-in">
              <label>
                {disposition === 'Meeting' ? '📅 Meeting Date & Time' : '📅 Callback Date & Time'}
              </label>
              <input 
                type="datetime-local" 
                value={dispositionDateTime}
                onChange={(e) => setDispositionDateTime(e.target.value)}
                className="ad-select"
                style={{ boxSizing: 'border-box' }}
              />
            </div>
          )}

          <div className="ad-field">
            <label>Notes (Optional)</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="ad-textarea"
              placeholder="Add call notes..."
              rows={4}
            />
          </div>

          <div className="ad-modal-footer">
            <button type="submit" className="ad-btn-save">Save & Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}
