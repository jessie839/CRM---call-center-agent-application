
import { useState, useMemo, useEffect } from "react";
import { Phone, Filter, Pause, Play, Pencil } from 'lucide-react';
import "../styles/LeadPage.css";
import { BaseWrapper } from "../wrapper/base.wrapper";
import { useCallState } from '../context/callstate.context';
import { useAutoDial } from '../context/autodial.context';
import ContactDetailPage from "./contact-detail-page";
import toast from "react-hot-toast";

/* ── Filter Sidebar ── */
function FilterSidebar({ isOpen, onClose, onApply }) {
  const [localFilters, setLocalFilters] = useState({
    firstName: '', lastName: '', phone: '', email: '', address: ''
  });

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleClear = () => {
    const empty = { firstName: '', lastName: '', phone: '', email: '', address: '' };
    setLocalFilters(empty);
    onApply(empty);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="lm-filter-sidebar-overlay" onClick={onClose}>
      <div className="lm-filter-sidebar" onClick={e => e.stopPropagation()}>
        <div className="lm-filter-header">
          <button className="lm-filter-back" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span className="lm-filter-title" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Filter By</span>
        </div>
        
        <div className="lm-filter-body">
          <div className="lm-filter-group">
            <label>First Name</label>
            <input type="text" placeholder="First Name" value={localFilters.firstName} onChange={e => setLocalFilters({...localFilters, firstName: e.target.value})} />
          </div>
          <div className="lm-filter-group">
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" value={localFilters.lastName} onChange={e => setLocalFilters({...localFilters, lastName: e.target.value})} />
          </div>
          <div className="lm-filter-group">
            <label>Priority</label>
            <select><option>Lead Priority</option></select>
          </div>
          <div className="lm-filter-group">
            <label>Timezone</label>
            <input type="text" placeholder="Timezone" />
          </div>
          <div className="lm-filter-group">
            <label>Dialed Count</label>
            <input type="number" placeholder="Dialed Count" />
          </div>
          <div className="lm-filter-group">
            <label>Phone Number</label>
            <input type="text" placeholder="Phone Number" value={localFilters.phone} onChange={e => setLocalFilters({...localFilters, phone: e.target.value})} />
          </div>
          <div className="lm-filter-group">
            <label>Email</label>
            <input type="text" placeholder="Email" value={localFilters.email} onChange={e => setLocalFilters({...localFilters, email: e.target.value})} />
          </div>
          <div className="lm-filter-group">
            <label>Address</label>
            <input type="text" placeholder="Address" value={localFilters.address} onChange={e => setLocalFilters({...localFilters, address: e.target.value})} />
          </div>
          <div className="lm-filter-group">
            <label>List ID</label>
            <input type="text" placeholder="List ID" />
          </div>
          <div className="lm-filter-group">
            <label>Tags</label>
            <input type="text" placeholder="Tags" />
          </div>
          <div className="lm-filter-group">
            <label>Dial Status</label>
            <select><option>No</option><option>Yes</option></select>
          </div>
          <div className="lm-filter-group">
            <label>Subdisposition</label>
            <select><option>Subdisposition</option></select>
          </div>
          <div className="lm-filter-group">
            <label>Lead ID</label>
            <input type="text" placeholder="Lead ID" />
          </div>
          <div className="lm-filter-group">
            <label>Dial Attempt</label>
            <input type="number" placeholder="Dial Attempt" />
          </div>
          <div className="lm-filter-group">
            <label>Last Dial Datetime</label>
            <input type="date" />
          </div>
          <div className="lm-filter-group">
            <label>Disposition</label>
            <select><option>Disposition</option></select>
          </div>
          
          <div className="lm-filter-group-title">Modified Date</div>
          <div className="lm-filter-group">
            <label>Condition Type</label>
            <select><option>Condition Type</option></select>
          </div>
          <div className="lm-filter-group">
            <label>Created At</label>
            <select><option>Created At</option></select>
          </div>
          <div className="lm-filter-row">
            <div className="lm-filter-group">
              <label>From</label>
              <input type="date" />
            </div>
            <div className="lm-filter-group">
              <label>To</label>
              <input type="date" />
            </div>
          </div>
          
          <div className="lm-filter-group">
            <label>Alternative Number</label>
            <input type="text" placeholder="Alternative Number" />
          </div>
          <div className="lm-filter-group">
            <label>Isclosed</label>
            <select><option>No</option><option>Yes</option></select>
          </div>
          <div className="lm-filter-group">
            <label>Lead Status</label>
            <select><option>Lead Status</option></select>
          </div>
          <div className="lm-filter-group">
            <label>Source</label>
            <select><option>Source</option></select>
          </div>
        </div>
        
        <div className="lm-filter-footer">
          <button className="lm-btn-filter lm-btn-filter-clear" onClick={handleClear}>Clear</button>
          <button className="lm-btn-filter lm-btn-filter-quick" onClick={handleApply}>Quick Filter</button>
        </div>
      </div>
    </div>
  );
}

const INITIAL_LEADS = [
  { id: 1, firstName: "Fazil", lastName: "Laghari", leadId: "LD-001", phone: "(92) 306 8572 831", altPhone: "(92) 300 1234 567", address: "123 Main St, Karachi", email: "fazil@gmail.com", disposition: "Open" },
  { id: 2, firstName: "Sarah", lastName: "Johnson", leadId: "LD-002", phone: "(92) 306 8572 831", altPhone: "", address: "45 Oak Ave, Lahore", email: "sarah@gmail.com", disposition: "New Lead" },
  { id: 3, firstName: "Michael", lastName: "Brown", leadId: "LD-003", phone: "(92) 306 8572 831", altPhone: "(92) 301 9876 543", address: "78 Pine Rd, Islamabad", email: "michael@gmail.com", disposition: "Open" },
  { id: 4, firstName: "Emily", lastName: "Davis", leadId: "LD-004", phone: "(92) 306 8572 831", altPhone: "", address: "9 Rose Ln, Peshawar", email: "emily@gmail.com", disposition: "New Lead" },
  { id: 5, firstName: "David", lastName: "Lee", leadId: "LD-005", phone: "(92) 306 8572 831", altPhone: "(92) 303 5551 234", address: "22 Elm St, Quetta", email: "david@gmail.com", disposition: "Rejected" },
  { id: 6, firstName: "Lisa", lastName: "Garcia", leadId: "LD-006", phone: "(92) 306 8572 831", altPhone: "", address: "88 Cedar Blvd, Multan", email: "lisa@gmail.com", disposition: "Open" },
  { id: 7, firstName: "James", lastName: "Wilson", leadId: "LD-007", phone: "(92) 306 8572 831", altPhone: "(92) 305 7778 899", address: "3 Birch Ct, Sialkot", email: "james@gmail.com", disposition: "New Lead" },
  { id: 8, firstName: "Jennifer", lastName: "Adams", leadId: "LD-008", phone: "(92) 306 8572 831", altPhone: "", address: "55 Walnut Dr, Faisalabad", email: "jen@gmail.com", disposition: "Rejected" },
  { id: 9, firstName: "Robert", lastName: "Clark", leadId: "LD-009", phone: "(92) 306 8572 831", altPhone: "(92) 307 4443 210", address: "11 Maple Ave, Rawalpindi", email: "rob@gmail.com", disposition: "Contacted" },
  { id: 10, firstName: "Mary", lastName: "Taylor", leadId: "LD-010", phone: "(92) 306 8572 831", altPhone: "", address: "67 Spruce Way, Hyderabad", email: "mary@gmail.com", disposition: "Open" },
  { id: 11, firstName: "Andrew", lastName: "White", leadId: "LD-011", phone: "(92) 306 8572 831", altPhone: "(92) 308 2229 876", address: "14 Ash St, Gujranwala", email: "andrew@gmail.com", disposition: "Interested" },
];

const ALL_FIELDS = [
  { key: "leadId", label: "Call Id" },
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "phone", label: "Phone Number" },
  { key: "altPhone", label: "Alternative Number" },
  { key: "address", label: "Address" },
  { key: "email", label: "Email" },
  { key: "disposition", label: "Disposition" },
  { key: "action", label: "Action" }
];

const DEFAULT_VISIBLE = new Set(["firstName", "lastName", "altPhone", "address", "email", "disposition", "action"]);

const ALL_DISPOSITIONS = ["Open", "New Lead", "Contacted", "Interested", "Rejected"];
const FILTER_DISPOSITIONS = ["All", "Open", "New Lead", "Contacted", "Interested", "Rejected"];

const COL_SIZES = {
  leadId: "1fr", firstName: "1fr", lastName: "1fr",
  phone: "1fr", altPhone: "1fr", address: "1fr",
  email: "1fr", disposition: "1fr", action: "100px"
};

const PER_PAGE = 8;

/** Map a disposition label to a BEM modifier for the badge */
const BADGE_MOD = {
  "Open": "open",
  "New Lead": "new-lead",
  "Rejected": "rejected",
  "Contacted": "contacted",
  "Interested": "interested",
};

/* ── Avatar ── */
function Avatar({ name, size = 30 }) {
  const palette = ["#4f83cc", "#e8935a", "#6dba8a", "#c97bb5", "#e26d6d", "#7bb5d4", "#d4a76a"];
  const bg = palette[name.charCodeAt(0) % palette.length];
  const initials = name.split(" ").map(n => n[0]).slice(0, 2).join("");
  return (
    <div
      className="lm-avatar"
      style={{ width: size, height: size, background: bg, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}

/* ── Disposition Badge ── */
function Badge({ value }) {
  const mod = BADGE_MOD[value] || "open";
  return (
    <span className={`lm-badge lm-badge--${mod}`}>
      <span className="lm-badge-dot" />
      {value}
    </span>
  );
}

/* ── Header Fields Modal ── */
function HeaderFieldsModal({ visibleFields, onSave, onClose }) {
  const [pending, setPending] = useState(new Set(visibleFields));
  const allSelected = pending.size === ALL_FIELDS.length;

  const toggle = key => {
    const n = new Set(pending);
    n.has(key) ? n.delete(key) : n.add(key);
    setPending(n);
  };

  return (
    <div className="lm-modal-overlay" onClick={onClose}>
      <div className="lm-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="lm-modal-header">
          <span className="lm-modal-title">Header Fields</span>
        </div>

        {/* Body */}
        <div className="lm-modal-body">
          {/* Select All */}
          <label className="lm-modal-field-row lm-modal-field-row--select-all">
            <input
              type="checkbox"
              className="lm-modal-checkbox"
              checked={allSelected}
              onChange={() =>
                allSelected
                  ? setPending(new Set())
                  : setPending(new Set(ALL_FIELDS.map(f => f.key)))
              }
            />
            <span className="lm-modal-field-row-label lm-modal-field-row-label--bold">
              Select All
            </span>
          </label>

          {/* Individual fields */}
          {ALL_FIELDS.map(f => (
            <label key={f.key} className="lm-modal-field-row">
              <input
                type="checkbox"
                className="lm-modal-checkbox"
                checked={pending.has(f.key)}
                onChange={() => toggle(f.key)}
              />
              <span className="lm-modal-field-row-label">{f.label}</span>
            </label>
          ))}
        </div>

        {/* Footer */}
        <div className="lm-modal-footer">
          <button className="lm-modal-btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="lm-modal-btn-save"
            onClick={() => onSave(pending.size > 0 ? pending : new Set(["firstName"]))}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Add Lead Full Screen ── */
function AddLeadScreen({ onSave, onCancel }) {
  const [form, setForm] = useState({
    leadId: "", firstName: "", lastName: "", phone: "", altPhone: "",
    address: "", email: "", disposition: "New Lead", listId: "", tags: "", contacts: ""
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.phone.trim()) e.phone = "Phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => { if (validate()) onSave({ ...form }); 
  toast.success("Contact created successfully!");
};

  const FIELDS = [
    { key: "firstName", label: "First Name", type: "text", placeholder: "First Name" },
    { key: "lastName", label: "Last Name", type: "text", placeholder: "Last Name" },
    { key: "phone", label: "Phone Number", type: "tel", placeholder: "Phone Number", required: true },
    { key: "email", label: "Email", type: "email", placeholder: "Email" },
    { key: "address", label: "Address", type: "text", placeholder: "Address" },
    { key: "listId", label: "List Id", type: "select", options: ["LD-001", "LD-002", "LD-003"] },
    { key: "tags", label: "Tags", type: "select", options: ["Hot", "Warm", "Cold"] },
    { key: "contacts", label: "Associated Contacts", type: "select", options: ["Contact A", "Contact B"] },
    { key: "altPhone", label: "Alternative Number", type: "tel", placeholder: "Alternative Number" },
    { key: "disposition", label: "Call Log Status", type: "select", options: ALL_DISPOSITIONS },
  ];

  return (
    <div className="lm-add-screen">
      {/* Header */}
      <header className="lm-add-screen-header">
        <div className="lm-add-screen-header-left">
          <button className="lm-btn-back" onClick={onCancel}>←</button>
          <span className="lm-add-screen-title"># Call Log Information</span>
        </div>
        <button className="lm-btn-save" onClick={handleSave}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 13H3a1 1 0 01-1-1V4l3-3h7a1 1 0 011 1v10a1 1 0 01-1 1z" />
            <path d="M5 1v4h6V1M5 13v-4h6v4" />
          </svg>
          Save
        </button>
      </header>

      {/* Body */}
      <div className="lm-add-screen-body">
        <div className="lm-add-card">
          {/* Section heading */}
          <div className="lm-add-card-section-header">
            <div className="lm-add-card-section-dot" />
            <span className="lm-add-card-section-title">Default Field</span>
          </div>

          {/* 2-column grid */}
          <div className="lm-add-fields-grid">
            {FIELDS.map((f, i) => (
              <div
                key={f.key + i}
                className={`lm-add-field${i % 2 === 0 ? " lm-add-field--left" : ""}`}
              >
                <div className="lm-add-field-label">
                  {f.label}
                  {f.required && <span className="lm-add-field-required"> *</span>}
                </div>

                {f.type === "select" ? (
                  <select
                    className="lm-add-field-select"
                    value={form[f.key]}
                    onChange={e => set(f.key, e.target.value)}
                  >
                    <option value="">{f.label}</option>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={f.type}
                    className={`lm-add-field-input${errors[f.key] ? " lm-add-field-input--error" : ""}`}
                    value={form[f.key]}
                    onChange={e => set(f.key, e.target.value)}
                    placeholder={f.placeholder}
                  />
                )}

                {errors[f.key] && (
                  <div className="lm-add-field-error">{errors[f.key]}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Pagination Button ── */
function PagBtn({ label, active, disabled, onClick }) {
  const isNum = typeof label === "number";
  let cls = "lm-pag-btn";
  cls += isNum ? " lm-pag-btn--num" : " lm-pag-btn--text";
  if (active) cls += " lm-pag-btn--active";
  if (disabled) cls += " lm-pag-btn--disabled";
  return (
    <button className={cls} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

/* ── Main ── */
export default function LeadManagement() {
  const { callState, setCallState } = useCallState();
  const { startAutoDial, adState, isPaused, togglePause } = useAutoDial();

  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState("");
  const [filterDisp, setFilterDisp] = useState("All");
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showHeaderModal, setShowHeaderModal] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [advFilters, setAdvFilters] = useState({});
  const [visibleFields, setVisibleFields] = useState(DEFAULT_VISIBLE);
  const [selectedContactDetail, setSelectedContactDetail] = useState(null);

  const handleSingleCall = (leadId) => {
    startAutoDial([leadId], leads);
  };

  const handleStartAutoDial = () => {
    if (selected.size === 0) return;
    startAutoDial(Array.from(selected), leads);
  };

  const filtered = useMemo(() =>
    leads.filter(l => {
      const q = search.toLowerCase();
      const name = (l.firstName + " " + l.lastName).toLowerCase();
      
      let matchSearch = (!q ||
          name.includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.leadId.toLowerCase().includes(q) ||
          l.address.toLowerCase().includes(q));

      let matchDisp = (filterDisp === "All" || l.disposition === filterDisp);

      let matchAdv = true;
      if (advFilters.firstName && !l.firstName.toLowerCase().includes(advFilters.firstName.toLowerCase())) matchAdv = false;
      if (advFilters.lastName && !l.lastName.toLowerCase().includes(advFilters.lastName.toLowerCase())) matchAdv = false;
      if (advFilters.phone && !l.phone.toLowerCase().includes(advFilters.phone.toLowerCase())) matchAdv = false;
      if (advFilters.email && !l.email.toLowerCase().includes(advFilters.email.toLowerCase())) matchAdv = false;
      if (advFilters.address && !l.address.toLowerCase().includes(advFilters.address.toLowerCase())) matchAdv = false;

      return matchSearch && matchDisp && matchAdv;
    }),
    [search, filterDisp, advFilters, leads]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const allChecked = paginated.length > 0 && paginated.every(l => selected.has(l.id));

  const visFields = ALL_FIELDS.filter(f => visibleFields.has(f.key));
  const gridCols = "36px " + visFields.map(f => COL_SIZES[f.key] || "1fr").join(" ");

  const toggleAll = () => {
    const n = new Set(selected);
    if (allChecked) paginated.forEach(l => n.delete(l.id));
    else paginated.forEach(l => n.add(l.id));
    setSelected(n);
  };

  const toggleOne = id => {
    const n = new Set(selected);
    n.has(id) ? n.delete(id) : n.add(id);
    setSelected(n);
  };

  const handleSaveLead = formData => {
    const newId = Math.max(...leads.map(l => l.id)) + 1;
    const autoId = formData.leadId.trim() || `LD-${String(newId).padStart(3, "0")}`;
    setLeads(prev => [{ id: newId, ...formData, leadId: autoId }, ...prev]);
    setShowAdd(false);
    setPage(1);
  };

  /* Row background helper */
  const rowBg = (lead, idx) => {
    if (selected.has(lead.id)) return "lm-table-row--selected";
    return idx % 2 === 0 ? "lm-table-row--even" : "lm-table-row--odd";
  };

  return (
    <BaseWrapper tabProps={{ tabs: [], headerText: "Contacts" }}>

      <div className="lm-root">

        <div className="lm-main">
          {selectedContactDetail ? (
            <ContactDetailPage
              contact={selectedContactDetail}
              onBack={() => setSelectedContactDetail(null)}
              onSave={(updated) => {
                setLeads(prev => prev.map(l => l.id === updated.id ? updated : l));
                setSelectedContactDetail(updated);
              }}
            />
          ) : showAdd ? (
            <AddLeadScreen onSave={handleSaveLead} onCancel={() => setShowAdd(false)} />
          ) : (
            <>       {/* Search input field */}
              <div className="lm-topbar-actions">

                {/* LEFT */}
                <div className="lm-search-wrap">
                  <span className="lm-search-icon">🔍</span>
                  <input
                    className="lm-search-input"
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                    placeholder="Search Contacts…"
                  />
                </div>

                {/* RIGHT */}
                <div className="lm-topbar-right">
                  {/* Disposition filter */}
                  <select
                    className="lm-filter-select"
                    value={filterDisp}
                    onChange={e => { setFilterDisp(e.target.value); setPage(1); }}
                  >
                    {FILTER_DISPOSITIONS.map(s => <option key={s}>{s}</option>)}
                  </select>

                  {/* Advanced Filter Button */}
                  <button className="lm-btn-header-fields" onClick={() => setShowFilterSidebar(true)}>
                    <Filter size={14} />
                    Filter By
                  </button>

                  {/* Header fields toggle */}
                  <button className="lm-btn-header-fields" onClick={() => setShowHeaderModal(true)}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="3" width="14" height="2" rx="1" fill="var(--muted)" />
                      <rect x="1" y="7" width="14" height="2" rx="1" fill="var(--muted)" />
                      <rect x="1" y="11" width="14" height="2" rx="1" fill="var(--muted)" />
                      <circle cx="4" cy="4" r="1.5" fill="var(--accent)" />
                      <circle cx="11" cy="8" r="1.5" fill="var(--accent)" />
                      <circle cx="6" cy="12" r="1.5" fill="var(--accent)" />
                    </svg>
                    Header Fields
                  </button>

                  {/* Auto Dial */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="lm-btn-auto-dial"
                      onClick={handleStartAutoDial}
                      disabled={selected.size === 0 || adState !== 'IDLE'}
                      title={selected.size === 0 ? "Select call logs to start auto dial" : "Start Auto Dial"}
                    >
                      <Phone size={14} /> Auto Dial
                    </button>

                    {adState !== 'IDLE' && (
                      <button
                        className="lm-btn-auto-dial"
                        onClick={togglePause}
                        title={isPaused ? "Resume Auto Dial" : "Pause Auto Dial"}
                        style={{ 
                          background: isPaused ? 'rgba(239, 68, 68, 0.1)' : 'rgba(37, 211, 102, 0.1)', 
                          color: isPaused ? '#ef4444' : '#25D366',
                          borderColor: isPaused ? '#ef4444' : '#25D366',
                          width: 'auto',
                          padding: '0 12px'
                        }}
                      >
                        {isPaused ? <Play size={14} style={{ marginRight: '6px' }} /> : <Pause size={14} style={{ marginRight: '6px' }} />}
                        {isPaused ? "Resume" : "Pause"}
                      </button>
                    )}
                  </div>

                  {/* Add lead */}
                  <button className="lm-btn-add-lead" onClick={() => setShowAdd(true)}>
                    <span className="lm-btn-add-lead-plus">+</span> Add Contact
                  </button>
                </div>
              </div>

              {/* TABLE */}
              <div className="lm-table-container">
                <div className="lm-table-card">
                  {/* Column headers */}
                  <div
                    className="lm-table-header"
                    style={{ gridTemplateColumns: gridCols }}
                  >
                    <div className="lm-checkbox-cell">
                      <input
                        type="checkbox"
                        className="lm-checkbox"
                        checked={allChecked}
                        onChange={toggleAll}
                      />
                    </div>
                    {visFields.map(f => (
                      <div 
                        key={f.key} 
                        className="lm-col-label"
                        style={f.key === "action" ? { textAlign: 'center' } : {}}
                      >
                        {f.label.toUpperCase()}
                      </div>
                    ))}
                  </div>

                  {/* Empty state */}
                  {paginated.length === 0 && (
                    <div className="lm-empty">No call logs match your search.</div>
                  )}

                  {/* Rows */}
                  {paginated.map((lead, idx) => (
                    <div
                      key={lead.id}
                      className={`lm-table-row ${rowBg(lead, idx)}`}
                      style={{ gridTemplateColumns: gridCols }}
                      onClick={() => setSelectedContactDetail(lead)}
                    >
                      {/* Checkbox */}
                      <div 
                        className="lm-checkbox-cell"
                        onClick={e => {
                          e.stopPropagation();
                          toggleOne(lead.id);
                        }}
                      >
                        <input
                          type="checkbox"
                          className="lm-checkbox"
                          checked={selected.has(lead.id)}
                          onChange={() => {}} // Handle change via div click
                        />
                      </div>

                      {/* Dynamic cells */}
                      {visFields.map(f => {
                        if (f.key === "leadId") return (
                          <span key="leadId" className="lm-cell-lead-id">{lead.leadId}</span>
                        );
                        if (f.key === "firstName") return (
                          <div key="firstName" className="lm-cell-first-name">
                            <Avatar name={lead.firstName + " " + lead.lastName} size={28} />
                            <span className="lm-cell-first-name-text">{lead.firstName}</span>
                          </div>
                        );
                        if (f.key === "lastName") return <span key="lastName" className="lm-cell-last-name">{lead.lastName}</span>;
                        if (f.key === "phone") return <span key="phone" className="lm-cell-phone">{lead.phone || "—"}</span>;
                        if (f.key === "altPhone") return <span key="altPhone" className="lm-cell-alt-phone">{lead.altPhone || "—"}</span>;
                        if (f.key === "address") return <span key="address" className="lm-cell-address">{lead.address || "—"}</span>;
                        if (f.key === "email") return <span key="email" className="lm-cell-email">{lead.email}</span>;
                        if (f.key === "disposition") return <Badge key="disposition" value={lead.disposition} />;
                        if (f.key === "action") return (
                          <span key="action" className="lm-cell-action" style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            <button 
                              className="lm-btn-call-inline" 
                              onClick={(e) => { e.stopPropagation(); handleSingleCall(lead.id); }}
                              title="Call"
                            >
                              <Phone size={14} />
                            </button>
                            <button 
                              className="lm-btn-edit-inline" 
                              onClick={(e) => { e.stopPropagation(); setSelectedContactDetail(lead); }}
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>
                          </span>
                        );
                        return null;
                      })}
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}
                <div className="lm-pagination">
                  <span className="lm-pagination-info">
                    Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–
                    {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} call logs
                  </span>

                  <div className="lm-pagination-buttons">
                    <PagBtn label="Prev" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} />
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                      <PagBtn key={p} label={p} active={p === page} onClick={() => setPage(p)} />
                    ))}
                    {totalPages > 5 && <span className="lm-pag-ellipsis">…</span>}
                    {totalPages > 5 && <PagBtn label={totalPages} onClick={() => setPage(totalPages)} />}
                    <PagBtn label="Next" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Header Fields Modal */}
      {showHeaderModal && (
        <HeaderFieldsModal
          visibleFields={visibleFields}
          onSave={fields => { setVisibleFields(fields); setShowHeaderModal(false); }}
          onClose={() => setShowHeaderModal(false)}
        />
      )}

      {/* Filter Sidebar */}
      <FilterSidebar 
        isOpen={showFilterSidebar} 
        onClose={() => setShowFilterSidebar(false)} 
        onApply={(filters) => { setAdvFilters(filters); setPage(1); }}
      />

    </BaseWrapper>
  );
}