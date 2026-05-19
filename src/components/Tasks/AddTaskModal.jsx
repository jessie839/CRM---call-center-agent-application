import { useState } from 'react';
import { X } from 'lucide-react';
import toast from "react-hot-toast";

export default function AddTaskModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    title: '',
    desc: '',
    deadline: '',
    createdBy: ''
  });

  const handleChange = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form, 
      id: Date.now(),
      color: 'var(--accent)', // Default color for new tasks
      due: form.deadline ? new Date(form.deadline).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }).toUpperCase() : 'PENDING',
      status: 'Pending',
      iconPath: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' // Default icon
    });
           toast.success("Task added successfully!");

  };

  return (
    <div className="pt-modal-overlay">
      <div className="pt-modal">
        <div className="pt-modal-header">
          <h3>Add New Task</h3>
          <button className="pt-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="pt-modal-body">
            <div className="pt-field">
              <label>Task Name *</label>
              <input 
                required 
                className="pt-input" 
                value={form.title} 
                onChange={e => handleChange('title', e.target.value)} 
                placeholder="E.g., Follow up with Acme Corp" 
              />
            </div>

            <div className="pt-field">
              <label>Description</label>
              <textarea 
                className="pt-textarea" 
                value={form.desc} 
                onChange={e => handleChange('desc', e.target.value)} 
                placeholder="Detailed context about the task..." 
              />
            </div>

            <div className="pt-grid-fields">
              <div className="pt-field">
                <label>Deadline (Date & Time) *</label>
                <input 
                  required
                  type="datetime-local"
                  className="pt-input" 
                  value={form.deadline} 
                  onChange={e => handleChange('deadline', e.target.value)} 
                />
              </div>

              <div className="pt-field">
                <label>Created By *</label>
                <input 
                  required
                  className="pt-input" 
                  value={form.createdBy} 
                  onChange={e => handleChange('createdBy', e.target.value)} 
                  placeholder="Your Name"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-modal-footer">
            <button type="button" className="pt-btn-modal-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="pt-add-btn">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
