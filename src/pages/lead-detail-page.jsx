import { useState } from "react";
import "../styles/lead-detail-page.css";
import AppointmentsTab from "../components/Dashboard/Tabs/AppointmentsTab";
import { useAutoDial } from "../context/autodial.context";
import { Pencil, MessageCircle, ArrowLeft, Phone } from "lucide-react";
import { Save } from "lucide-react";

/* ─── helpers ─── */
const PALETTE = ["#4f83cc","#e8935a","#6dba8a","#c97bb5","#e26d6d","#7bb5d4","#d4a76a"];
function getAvatarBg(name = "") {
  return PALETTE[(name.charCodeAt(0) || 0) % PALETTE.length];
}
function initials(first = "", last = "") {
  return [(first[0] || ""), (last[0] || "")].join("").toUpperCase();
}

/* ─── static tab list ─── */
const TABS = ["Details", "All Leads", "Activity", "History", "Comments", "Meetings"];

const ALL_DISPOSITIONS = ["Open", "New Lead", "Contacted", "Interested", "Rejected"];
const TAG_OPTIONS      = ["Hot", "Warm", "Cold", "VIP"];
const CONTACT_OPTIONS  = ["Contact A", "Contact B", "Contact C"];
const SOURCE_OPTIONS   = ["Web", "Referral", "Cold Call", "Social Media", "Event"];

/* ════════════════════════════════
   LEFT SIDEBAR
════════════════════════════════ */
function Sidebar({ lead, isOpen, onToggle }) {
  const { startAutoDial } = useAutoDial();
  const bg = getAvatarBg(lead.firstName);
  const ini = initials(lead.firstName, lead.lastName);
  const fullName = `${lead.firstName} ${lead.lastName}`;

  const infoRows = [
    { icon: "👤", label: "First Name", value: lead.firstName },
    { icon: "✉️", label: "Email",      value: lead.email || "—" },
    { icon: "📍", label: "Address",    value: lead.address || "—" },
    { icon: "🏙️", label: "City",       value: "—" },
    { icon: "🏠", label: "State",      value: "—" },
  ];

  return (
    <aside className={`ldp-sidebar${isOpen ? " ldp-sidebar--expanded" : ""}`}>

      {/* Header — always visible, tap to expand/collapse on mobile */}
      <div className="ldp-sidebar-header" onClick={onToggle}>
        <span className="ldp-sidebar-title">Customer</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="ldp-sidebar-call-btn"
            title="WhatsApp"
            style={{ background: '#25D366' }}
            onClick={e => { 
              e.stopPropagation(); 
              window.dispatchEvent(new CustomEvent('toggle-whatsapp', { 
                detail: { name: fullName, phone: lead.phone } 
              }));
            }}
          >
            <MessageCircle size={15} color="white" />
          </button>
          <button
            className="ldp-sidebar-call-btn"
            title="Call"
            onClick={e => { 
              e.stopPropagation(); 
              startAutoDial([lead.id], [lead]);
            }}
          >
            <Phone size={15} />
          </button>
        </div>
      </div>

      {/* Collapsible body */}
      <div className="ldp-sidebar-collapsible-body">

        {/* Avatar */}
        <div className="ldp-avatar-wrap">
          <div className="ldp-avatar" style={{ background: bg }}>{ini}</div>
        </div>

        {/* Name + phone */}
        <div className="ldp-sidebar-name-row">
          <span className="ldp-sidebar-fullname">{fullName}</span>
          <span className="ldp-sidebar-phone">{lead.phone}</span>
        </div>

        {/* Info rows */}
        <div className="ldp-sidebar-info-list">
          {infoRows.map(r => (
            <div key={r.label} className="ldp-sidebar-info-row">
              <span className="ldp-sidebar-info-value">{r.value}</span>
              <span className="ldp-sidebar-info-icon">{r.icon}</span>
            </div>
          ))}
        </div>

        {/* Call stats */}
        <div className="ldp-sidebar-stats">
          {[
            { label: "Inbound Call",     val: 0 },
            { label: "Outbound Call",    val: 3 },
            { label: "Missed Call",      val: 3 },
            { label: "Whatsapp Summary", val: 0 },
          ].map(s => (
            <div key={s.label} className="ldp-sidebar-stat-row">
              <span className="ldp-sidebar-stat-label">{s.label}</span>
              <span className="ldp-sidebar-stat-val">{s.val}</span>
            </div>
          ))}
        </div>

      </div>
    </aside>
  );
}

/* ════════════════════════════════
   DETAILS TAB — editable form
════════════════════════════════ */
function DetailsTab({ lead, onSave, isEditing }) {
  const [form, setForm] = useState({
    firstName:   lead.firstName   || "",
    lastName:    lead.lastName    || "",
    phone:       lead.phone       || "",
    email:       lead.email       || "",
    address:     lead.address     || "",
    tags:        lead.tags        || "",
    contacts:    lead.contacts    || "",
    altPhone:    lead.altPhone    || "",
    disposition: lead.disposition || "New Lead",
    source:      lead.source      || "",
  });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    onSave({ ...lead, ...form });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const FIELDS = [
    [
      { key: "firstName",   label: "First Name",           type: "text",   placeholder: "First Name",        col: "L" },
      { key: "lastName",    label: "Last Name",             type: "text",   placeholder: "Last Name",         col: "R" },
    ],
    [
      { key: "phone",       label: "Phone Number",          type: "tel",    placeholder: "Phone Number",      col: "L", required: true },
      { key: "email",       label: "Email",                 type: "email",  placeholder: "Email",             col: "R" },
    ],
    [
      { key: "address",     label: "Address",               type: "text",   placeholder: "Address",           col: "L" },
      { key: "tags",        label: "Tags",                  type: "select", options: TAG_OPTIONS,             col: "R" },
    ],
    [
      { key: "contacts",    label: "Associated Contacts",   type: "select", options: CONTACT_OPTIONS,         col: "L" },
      { key: "altPhone",    label: "Alternative Number",    type: "tel",    placeholder: "Alternative Number",col: "R" },
    ],
    [
      { key: "disposition", label: "Lead Status",           type: "select", options: ALL_DISPOSITIONS,        col: "L" },
      { key: "source",      label: "Source",                type: "select", options: SOURCE_OPTIONS,          col: "R" },
    ],
  ];

  return (
    <div className="ldp-details-tab">
      <div className="ldp-form-card">
        <div className="ldp-form-card-header">
          <span className="ldp-form-card-dot" />
          <span className="ldp-form-card-title">Default Field</span>
        </div>

        <div className="ldp-form-grid">
          {FIELDS.map((row) =>
            row.map(f => (
              <div key={f.key} className={`ldp-field ldp-field--${f.col === "L" ? "left" : "right"}`}>
                <label className="ldp-field-label">
                  {f.label}
                  {f.required && <span className="ldp-field-required"> *</span>}
                </label>

                {f.type === "select" ? (
                  <div className="ldp-select-wrap">
                    <select
                      className="ldp-field-select"
                      value={form[f.key]}
                      onChange={e => set(f.key, e.target.value)}
                      disabled={!isEditing}
                    >
                      <option value="">{f.label}</option>
                      {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <span className="ldp-select-arrow">▾</span>
                  </div>
                ) : (
                  <input
                    type={f.type}
                    className={`ldp-field-input${f.key === "phone" ? " ldp-field-input--filled" : ""}`}
                    value={form[f.key]}
                    onChange={e => set(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    readOnly={!isEditing}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {isEditing && (
        <div className="ldp-details-actions">
          <button className="ldp-btn-save" onClick={handleSave}>
            {saved ? "✓ Saved!" : (
              <>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 13H3a1 1 0 01-1-1V4l3-3h7a1 1 0 011 1v10a1 1 0 01-1 1z" />
                  <path d="M5 1v4h6V1M5 13v-4h6v4" />
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════
   PLACEHOLDER TAB
════════════════════════════════ */
function PlaceholderTab({ name }) {
  return (
    <div className="ldp-placeholder-tab">
      <div className="ldp-placeholder-icon">📂</div>
      <p className="ldp-placeholder-label">{name}</p>
      <p className="ldp-placeholder-sub">No data available yet.</p>
    </div>
  );
}

/* ════════════════════════════════
   MAIN EXPORT
════════════════════════════════ */
export default function LeadDetailPage({ lead, onBack, onSave }) {
  const [activeTab, setActiveTab] = useState("Details");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const safeLead = lead || {
    id: 1, firstName: "Jon", lastName: "Doe", leadId: "LD-064",
    phone: "1234567890", altPhone: "", address: "", email: "",
    disposition: "New Lead", tags: "", contacts: "", source: "",
  };

  const handleSave = (updated) => {
    if (onSave) onSave(updated);
  };

  return (
    <div className="ldp-root">

      {/* sidebarOpen and setSidebarOpen now correctly live here */}
      <Sidebar
        lead={safeLead}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
      />

      <div className="ldp-content">
        <div className="ldp-content-topbar">
          <div className="ldp-content-topbar-left">
            {onBack && (
              <button className="ldp-btn-back" onClick={onBack} title="Back to Leads">←</button>
            )}
            <span className="ldp-lead-id-title">#{safeLead.leadId} Lead Information</span>
          </div>
          <div className="ldp-content-topbar-actions">
            <button 
              className={`ldp-btn-edit-toggle ${isEditing ? 'ldp-btn-edit-toggle--active' : ''}`}
              onClick={() => setIsEditing(!isEditing)}
              title={isEditing ? "Cancel Edit" : "Edit Lead"}
              style={{ padding: '8px' }}
            >
              
              <Pencil size={18} />
              </button>
            <button className="ldp-topbar-icon-btn" title="Save" onClick={() => handleSave(safeLead)}>
              <Save/>
            </button>
          </div>
        </div>

        <nav className="ldp-tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`ldp-tab${activeTab === tab ? " ldp-tab--active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="ldp-tab-content">
          {activeTab === "Details" ? (
            <DetailsTab lead={safeLead} onSave={(updated) => { handleSave(updated); setIsEditing(false); }} isEditing={isEditing} />
          ) : activeTab === "Meetings" ? (
            <AppointmentsTab />
          ) : (
            <PlaceholderTab name={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
}