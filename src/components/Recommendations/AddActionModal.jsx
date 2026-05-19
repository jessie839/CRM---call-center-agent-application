import { useState } from 'react';
import { X } from 'lucide-react';

export default function AddActionModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    reason: '',
    priority: 'Medium'
  });

  const handleChange = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form, 
      id: Date.now(),
      timestamp: 'Just now'
    });
  };

  return (
    <div className="ra-modal-overlay">
      <div className="ra-modal">
        <div className="ra-modal-header">
          <h3>Add Recommended Action</h3>
          <button className="ra-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="ra-modal-body">
            <div className="ra-field">
              <label>Lead / User Name *</label>
              <input required className="ra-input" value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="E.g., Marcus Thorne" />
            </div>

            <div className="ra-field">
              <label>Company Name</label>
              <input className="ra-input" value={form.company} onChange={e => handleChange('company', e.target.value)} placeholder="E.g., Global Logistics Inc." />
            </div>

            <div className="ra-field">
              <label>Priority</label>
              <select className="ra-input" value={form.priority} onChange={e => handleChange('priority', e.target.value)}>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="ra-field">
              <label>Action Description *</label>
              <textarea required className="ra-textarea" value={form.reason} onChange={e => handleChange('reason', e.target.value)} placeholder="Describe the recommended action clearly..." />
            </div>
          </div>
          
          <div className="ra-modal-footer">
            <button type="button" className="ra-btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="ra-add-btn">Add Action</button>
          </div>
        </form>
      </div>
    </div>
  );
}
