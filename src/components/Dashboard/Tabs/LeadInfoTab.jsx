// import React, { useState, useEffect } from 'react';

// export default function LeadInfoTab({ activeLead, setActiveTab }) {
//   if (!activeLead) return null;

//   const [isEditing, setIsEditing] = useState(!!activeLead.isNew);
//   const [formData, setFormData] = useState({
//     name: activeLead.name === 'Unknown Contact' ? '' : activeLead.name,
//     phone: activeLead.phone || '',
//     company: '',
//     timezone: '',
//   });

//   // Sync local editing state if activeLead prop externally changes
//   useEffect(() => {
//     setIsEditing(!!activeLead.isNew);
//     setFormData({
//       name: activeLead.name === 'Unknown Contact' ? '' : activeLead.name,
//       phone: activeLead.phone || '',
//       company: '',
//       timezone: '',
//     });
//   }, [activeLead]);

//   const handleSave = () => {
//     // Simulated UI save mutation
//     if (formData.name.trim()) activeLead.name = formData.name;
//     if (formData.phone.trim()) activeLead.phone = formData.phone;
//     activeLead.isNew = false;
//     setIsEditing(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="dash-content-area fade-in flex-col" style={{flexDirection: 'column', gap: 24}}>

//       {/* Back Navigation & Status Header */}
//       <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
//          <span 
//            onClick={() => setActiveTab('Call Logs')}
//            style={{fontSize: 13, fontWeight: 600, color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8}}
//          >
//            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg> Back to Call Logs
//          </span>

//          <div className="soft-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px'}}>
//             <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
//                <div style={{width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #e0e7ff, #bfdbfe)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 24, fontWeight: 700, color: 'var(--accent-2)'}}>
//                   {activeLead.name === 'Unknown Contact' ? '?' : activeLead.name.charAt(0)}
//                </div>
//                <div>
//                   <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
//                      <h2 style={{margin: 0, fontSize: 24, fontWeight: 700, color: 'var(--text-main)'}}>
//                        {isEditing ? (formData.name || 'New Lead') : activeLead.name}
//                      </h2>
//                      <span className="kpi-badge" style={{background: 'var(--success-light)', color: 'var(--success)', fontSize: 11}}>
//                        {isEditing ? 'Draft Lead' : 'Active Lead'}
//                      </span>
//                   </div>
//                   <div style={{fontSize: 14, color: 'var(--muted)', fontWeight: 500, marginTop: 4, display: 'flex', alignItems: 'center', gap: 8}}>
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
//                     {isEditing ? (formData.phone || activeLead.phone) : activeLead.phone}
//                   </div>
//                </div>
//             </div>

//             <button className="btn-call" style={{padding: '0 24px', height: 44, display: 'flex', alignItems: 'center', gap: 8}}>
//                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
//                Dial Lead
//             </button>
//          </div>
//       </div>

//       <div style={{display: 'flex', gap: 24, flex: 1}}>

//         {/* Left Col: Overview & Notes */}
//         <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 24}}>
//            {/* Detailed Block (View or Form) */}
//            <div className="soft-card" style={{padding: 24}}>
//               <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
//                  <h3 className="soft-card-title" style={{margin: 0}}>Lead Overview</h3>
//                  {!isEditing && (
//                     <button 
//                        onClick={() => setIsEditing(true)} 
//                        style={{background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: 'var(--text-sec)'}}
//                     >
//                        Edit Info
//                     </button>
//                  )}
//               </div>

//               {isEditing ? (
//                  <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
//                     <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
//                        <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
//                           <label style={{fontSize: 12, fontWeight: 600, color: 'var(--text-sec)'}}>Lead Name</label>
//                           <input 
//                              name="name" value={formData.name} onChange={handleInputChange} 
//                              placeholder="E.g. Eleanor Shellstrop" 
//                              style={{padding: '10px 12px', borderRadius: 8, border: '1px solid var(--muted)', fontSize: 14}} 
//                           />
//                        </div>
//                        <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
//                           <label style={{fontSize: 12, fontWeight: 600, color: 'var(--text-sec)'}}>Phone Number</label>
//                           <input 
//                              name="phone" value={formData.phone} onChange={handleInputChange} 
//                              placeholder="+1 (xxx) xxx-xxxx" 
//                              style={{padding: '10px 12px', borderRadius: 8, border: '1px solid var(--muted)', fontSize: 14}} 
//                           />
//                        </div>
//                     </div>
//                     <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
//                        <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
//                           <label style={{fontSize: 12, fontWeight: 600, color: 'var(--text-sec)'}}>Company</label>
//                           <input 
//                              name="company" value={formData.company} onChange={handleInputChange} 
//                              placeholder="Company Name" 
//                              style={{padding: '10px 12px', borderRadius: 8, border: '1px solid var(--muted)', fontSize: 14}} 
//                           />
//                        </div>
//                        <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
//                           <label style={{fontSize: 12, fontWeight: 600, color: 'var(--text-sec)'}}>Timezone</label>
//                           <input 
//                              name="timezone" value={formData.timezone} onChange={handleInputChange} 
//                              placeholder="E.g. EST (UTC-5)" 
//                              style={{padding: '10px 12px', borderRadius: 8, border: '1px solid var(--muted)', fontSize: 14}} 
//                           />
//                        </div>
//                     </div>
//                     <div style={{display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12}}>
//                        <button onClick={() => setIsEditing(false)} style={{padding: '8px 16px', borderRadius: 8, border: '1px solid var(--muted)', background: 'var(--surface)', fontWeight: 600, cursor: 'pointer', color: 'var(--text-sec)'}}>Cancel</button>
//                        <button onClick={handleSave} style={{padding: '8px 24px', borderRadius: 8, border: 'none', background: 'var(--accent)', color: 'var(--text-inverse)', fontWeight: 600, cursor: 'pointer'}}>Save Lead</button>
//                     </div>
//                  </div>
//               ) : (
//                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
//                     <div>
//                        <div style={{fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase'}}>Company</div>
//                        <div style={{fontSize: 14, fontWeight: 500, color: 'var(--text-main)', marginTop: 4}}>{formData.company || 'Acme Corp Global'}</div>
//                     </div>
//                     <div>
//                        <div style={{fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase'}}>Timezone</div>
//                        <div style={{fontSize: 14, fontWeight: 500, color: 'var(--text-main)', marginTop: 4}}>{formData.timezone || 'EST (UTC-5)'}</div>
//                     </div>
//                     <div>
//                        <div style={{fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase'}}>Last Contact</div>
//                        <div style={{fontSize: 14, fontWeight: 500, color: 'var(--text-main)', marginTop: 4}}>Just now</div>
//                     </div>
//                     <div>
//                        <div style={{fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase'}}>Lead Score</div>
//                        <div style={{fontSize: 14, fontWeight: 500, color: 'var(--success)', marginTop: 4}}>84 / 100 (High)</div>
//                     </div>
//                  </div>
//               )}
//            </div>

//            {/* Interactive Notes block */}
//            <div className="soft-card" style={{flex: 1, display: 'flex', flexDirection: 'column', padding: 24}}>
//               <h3 className="soft-card-title">Lead Notes</h3>
//               <textarea 
//                 placeholder="Type your notes here... They will auto-save to the CRM." 
//                 style={{flex: 1, border: '1px solid var(--border)', borderRadius: 12, padding: 16, outline: 'none', background: 'var(--surface2)', fontSize: 13, resize: 'none', lineHeight: 1.5, fontFamily: 'inherit'}}
//                 defaultValue={activeLead.isNew ? "" : "Requested a full demo link. Mentioned their budget might open up towards Q3. Follow up specifically targeting their compliance tracking features."}
//               />
//               <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 16}}>
//                  <button className="btn-action" style={{padding: '8px 24px', background: 'var(--text-main)', color: 'var(--text-inverse)'}}>Save Notes</button>
//               </div>
//            </div>
//         </div>

//         {/* Right Col: Timeline & Intelligence */}
//         <div className="soft-card" style={{flex: 1, padding: 24}}>
//            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
//               <h3 className="soft-card-title" style={{margin: 0}}>Activity Timeline</h3>
//               <div style={{fontSize: 11, fontWeight: 600, padding: '4px 8px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: 12}}>Powered by AI</div>
//            </div>

//            <div style={{display: 'flex', flexDirection: 'column'}}>
//               {/* Timeline Item 1 */}
//               <div className="timeline-item">
//                  <div className="timeline-dot" style={{background: 'var(--success)'}}></div>
//                  <div style={{flex: 1}}>
//                     <div style={{fontSize: 13, fontWeight: 600, color: 'var(--text-main)', marginBottom: 4}}>AI Call Summary Generated</div>
//                     <div style={{fontSize: 12, color: 'var(--muted)', marginBottom: 8}}>Outbound Call • 04m 12s • Today</div>
//                     {!activeLead.isNew && (
//                        <div style={{background: 'var(--surface2)', padding: 12, borderRadius: 8, fontSize: 13, color: 'var(--text-sec)', lineHeight: 1.4, borderLeft: '3px solid var(--accent)'}}>
//                           <strong>Summary:</strong> The client expressed high interest in the enterprise tier but has concerns over deployment times.
//                        </div>
//                     )}
//                  </div>
//               </div>

//               {!activeLead.isNew && (
//                  <>
//                     {/* Timeline Item 2 */}
//                     <div className="timeline-item">
//                        <div className="timeline-dot" style={{background: 'var(--muted)'}}></div>
//                        <div style={{flex: 1}}>
//                           <div style={{fontSize: 13, fontWeight: 600, color: 'var(--text-main)', marginBottom: 4}}>Email Sent</div>
//                           <div style={{fontSize: 12, color: 'var(--muted)', marginBottom: 8}}>Follow-up PDF requested • Yesterday, 14:15 PM</div>
//                        </div>
//                     </div>

//                     {/* Timeline Item 3 */}
//                     <div className="timeline-item">
//                        <div className="timeline-dot" style={{background: 'var(--danger)'}}></div>
//                        <div style={{flex: 1}}>
//                           <div style={{fontSize: 13, fontWeight: 600, color: 'var(--text-main)', marginBottom: 4}}>Missed Callback</div>
//                           <div style={{fontSize: 12, color: 'var(--muted)', marginBottom: 8}}>Inbound Call • 00m 00s • Mar 22, 09:12 AM</div>
//                        </div>
//                     </div>
//                  </>
//               )}

//            </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import '../../../styles/LeadInfoTab.css';

export default function LeadInfoTab({ activeLead, setActiveTab }) {
   if (!activeLead) return null;

   const [isEditing, setIsEditing] = useState(!!activeLead.isNew);
   const [formData, setFormData] = useState({
      name: activeLead.name === 'Unknown Contact' ? '' : activeLead.name,
      phone: activeLead.phone || '',
      company: '',
      timezone: '',
   });

   // Sync local editing state if activeLead prop externally changes
   useEffect(() => {
      setIsEditing(!!activeLead.isNew);
      setFormData({
         name: activeLead.name === 'Unknown Contact' ? '' : activeLead.name,
         phone: activeLead.phone || '',
         company: '',
         timezone: '',
      });
   }, [activeLead]);

   const handleSave = () => {
      // Simulated UI save mutation
      if (formData.name.trim()) activeLead.name = formData.name;
      if (formData.phone.trim()) activeLead.phone = formData.phone;
      activeLead.isNew = false;
      setIsEditing(false);
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   return (
      <div className="lead-info-tab dash-content-area fade-in flex-col">

         {/* Back Navigation & Status Header */}
         <div className="header-section">
            <span
               onClick={() => setActiveTab('Call Logs')}
               className="back-link"
            >
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
               </svg>
               Back to Call Logs
            </span>

            <div className="status-header soft-card">
               <div className="lead-info">
                  <div className="lead-avatar">
                     {activeLead.name === 'Unknown Contact' ? '?' : activeLead.name.charAt(0)}
                  </div>
                  <div>
                     <div className="lead-name-section">
                        <h2 className="lead-name">
                           {isEditing ? (formData.name || 'New Lead') : activeLead.name}
                        </h2>
                        <span className={`status-badge ${isEditing ? 'draft' : 'active'}`}>
                           {isEditing ? 'Draft Lead' : 'Active Lead'}
                        </span>
                     </div>
                     <div className="lead-phone">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        {isEditing ? (formData.phone || activeLead.phone) : activeLead.phone}
                     </div>
                  </div>
               </div>

               <button className="btn-call">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Dial Lead
               </button>
            </div>
         </div>

         <div className="main-content">

            {/* Left Col: Overview & Notes */}
            <div className="left-column">
               {/* Detailed Block (View or Form) */}
               <div className="soft-card overview-card">
                  <div className="card-header">
                     <h3 className="soft-card-title">Lead Overview</h3>
                     {!isEditing && (
                        <button
                           onClick={() => setIsEditing(true)}
                           className="edit-button"
                        >
                           Edit Info
                        </button>
                     )}
                  </div>

                  {isEditing ? (
                     <div className="edit-form">
                        <div className="form-row">
                           <div className="form-group">
                              <label>Lead Name</label>
                              <input
                                 name="name"
                                 value={formData.name}
                                 onChange={handleInputChange}
                                 placeholder="E.g. Eleanor Shellstrop"
                                 className="form-input"
                              />
                           </div>
                           <div className="form-group">
                              <label>Phone Number</label>
                              <input
                                 name="phone"
                                 value={formData.phone}
                                 onChange={handleInputChange}
                                 placeholder="+1 (xxx) xxx-xxxx"
                                 className="form-input"
                              />
                           </div>
                        </div>
                        <div className="form-row">
                           <div className="form-group">
                              <label>Company</label>
                              <input
                                 name="company"
                                 value={formData.company}
                                 onChange={handleInputChange}
                                 placeholder="Company Name"
                                 className="form-input"
                              />
                           </div>
                           <div className="form-group">
                              <label>Timezone</label>
                              <input
                                 name="timezone"
                                 value={formData.timezone}
                                 onChange={handleInputChange}
                                 placeholder="E.g. EST (UTC-5)"
                                 className="form-input"
                              />
                           </div>
                        </div>
                        <div className="form-actions">
                           <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                           <button onClick={handleSave} className="save-button">Save Lead</button>
                        </div>
                     </div>
                  ) : (
                     <div className="view-mode">
                        <div className="info-item">
                           <div className="info-label">Company</div>
                           <div className="info-value">{formData.company || 'Acme Corp Global'}</div>
                        </div>
                        <div className="info-item">
                           <div className="info-label">Timezone</div>
                           <div className="info-value">{formData.timezone || 'EST (UTC-5)'}</div>
                        </div>
                        <div className="info-item">
                           <div className="info-label">Last Contact</div>
                           <div className="info-value">Just now</div>
                        </div>
                        <div className="info-item">
                           <div className="info-label">Lead Score</div>
                           <div className="info-value score">84 / 100 (High)</div>
                        </div>
                     </div>
                  )}
               </div>

               {/* Interactive Notes block */}
               <div className="soft-card notes-card">
                  <h3 className="soft-card-title">Lead Notes</h3>
                  <textarea
                     placeholder="Type your notes here... They will auto-save to the CRM."
                     className="notes-textarea"
                     defaultValue={activeLead.isNew ? "" : "Requested a full demo link. Mentioned their budget might open up towards Q3. Follow up specifically targeting their compliance tracking features."}
                  />
                  <div className="notes-actions">
                     <button className="save-notes-button">Save Notes</button>
                  </div>
               </div>
            </div>

            {/* Right Col: Timeline & Intelligence */}
            <div className="right-column soft-card">
               <div className="timeline-header">
                  <h3 className="soft-card-title">Activity Timeline</h3>
                  <div className="ai-badge">Powered by AI</div>
               </div>

               <div className="timeline-container">
                  {/* Timeline Item 1 */}
                  <div className="timeline-item">
                     <div className="timeline-dot success"></div>
                     <div className="timeline-content">
                        <div className="timeline-title">AI Call Summary Generated</div>
                        <div className="timeline-meta">Outbound Call • 04m 12s • Today</div>
                        {!activeLead.isNew && (
                           <div className="timeline-summary">
                              <strong>Summary:</strong> The client expressed high interest in the enterprise tier but has concerns over deployment times.
                           </div>
                        )}
                     </div>
                  </div>

                  {!activeLead.isNew && (
                     <>
                        {/* Timeline Item 2 */}
                        <div className="timeline-item">
                           <div className="timeline-dot neutral"></div>
                           <div className="timeline-content">
                              <div className="timeline-title">Email Sent</div>
                              <div className="timeline-meta">Follow-up PDF requested • Yesterday, 14:15 PM</div>
                           </div>
                        </div>

                        {/* Timeline Item 3 */}
                        <div className="timeline-item">
                           <div className="timeline-dot error"></div>
                           <div className="timeline-content">
                              <div className="timeline-title">Missed Callback</div>
                              <div className="timeline-meta">Inbound Call • 00m 00s • Mar 22, 09:12 AM</div>
                           </div>
                        </div>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}