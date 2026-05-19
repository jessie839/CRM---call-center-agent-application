import React, { useState, useEffect } from "react";
import "../styles/MeetingsPage.css";
import { BaseWrapper } from "../wrapper/base.wrapper";
import { Calendar, Filter } from "lucide-react";
import toast from "react-hot-toast";

// Predefined doctors/service staff list
const STAFF_LIST = [
  { value: "jon_doe", label: "Jon Doe" },
  { value: "maria_ross", label: "Maria Ross" },
  { value: "jacob_maraski", label: "Jacob Maraski" },
  { value: "elena_ross", label: "Elena Ross" },
];

const MOCK_DATA = [
  {
    id: 1,
    title: "Acme Corp - Initial Discovery",
    date: "2026-04-09",
    startTime: "09:00",
    endTime: "10:00",
    type: "patient",
    assignedStaff: "jon_doe",
    description:
      "First call with the Acme Corp acquisition team to discuss their CRM needs and outline a custom demo.",
  },
  {
    id: 2,
    title: "Weekly Sales Sync",
    date: "2026-04-09",
    startTime: "11:00",
    endTime: "12:00",
    type: "meeting",
    assignedStaff: "maria_ross",
    description:
      "Weekly team sync. Review quarterly targets and major pipeline updates. Lead by Sarah  Mumkins.",
  },
  {
    id: 3,
    title: "Lunch Break",
    date: "2026-04-09",
    startTime: "13:00",
    endTime: "14:00",
    type: "break",
    assignedStaff: "elena_ross",
    description: "Blocked out for lunch.",
  },
  {
    id: 4,
    title: "Global Tech - ESCALATION",
    date: "2026-04-09",
    startTime: "15:30",
    endTime: "16:00",
    type: "urgent",
    assignedStaff: "jacob_maraski",
    description:
      "Client is at risk of churning due to implementation blockers. Urgent resolution required.",
  },
  {
    id: 5,
    title: "Renewal Negotiation - Vertex Ltd",
    date: "2026-04-10",
    startTime: "10:30",
    endTime: "11:30",
    type: "patient",
    assignedStaff: "jon_doe",
    description:
      "Finalizing numbers for Vertex Ltd Q3 renewal. Aim to upsell Enterprise tier.",
  },
  {
    id: 6,
    title: "Product Marketing Alignment",
    date: "2026-04-10",
    startTime: "14:00",
    endTime: "15:00",
    type: "meeting",
    assignedStaff: "maria_ross",
    description: "Aligning with PMM on the new feature drop messaging.",
  },
  {
    id: 7,
    title: "Pipeline Review - Q2",
    date: "2026-04-07",
    startTime: "10:00",
    endTime: "11:30",
    type: "meeting",
    assignedStaff: "elena_ross",
    description: "1-on-1 pipeline review with Management.",
  },
];

const WEEK_DAYS = [
  { name: "Mon", date: "2026-04-06" },
  { name: "Tue", date: "2026-04-07" },
  { name: "Wed", date: "2026-04-08" },
  { name: "Thu", date: "2026-04-09" },
  { name: "Fri", date: "2026-04-10" },
  { name: "Sat", date: "2026-04-11" },
  { name: "Sun", date: "2026-04-12" },
];

/* ── Filter Sidebar ── */
function FilterSidebar({ isOpen, onClose, onApply }) {
  const [localFilters, setLocalFilters] = useState({
    title: '', phone: '', type: 'all', staff: 'all'
  });

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleClear = () => {
    const empty = { title: '', phone: '', type: 'all', staff: 'all' };
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
            <label>Event Title</label>
            <input type="text" placeholder="Event Title" value={localFilters.title} onChange={e => setLocalFilters({...localFilters, title: e.target.value})} />
          </div>
          <div className="lm-filter-group">
            <label>Phone number</label>
            <input type="text" placeholder="Phone number" value={localFilters.phone} onChange={e => setLocalFilters({...localFilters, phone: e.target.value})} />
          </div>

          <div className="lm-filter-group">
            <label>Event Type</label>
            <select value={localFilters.type} onChange={e => setLocalFilters({...localFilters, type: e.target.value})}>
              <option value="all">All Types</option>
              <option value="patient">Client Consultation</option>
              <option value="meeting">Internal Sync</option>
              <option value="urgent">Escalated Deal</option>
              <option value="break">Break</option>
            </select>
          </div>

          <div className="lm-filter-group">
            <label>Staff</label>
            <select value={localFilters.staff} onChange={e => setLocalFilters({...localFilters, staff: e.target.value})}>
              <option value="all">All Staff</option>
              {STAFF_LIST.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
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

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8);

function getTimeOffset(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(":").map(Number);
  if (h < 8) return 0;
  if (h >= 18) return 10 * 80;
  return (h - 8 + m / 60) * 80;
}

function getDurationHeight(start, end) {
  if (!start || !end) return 60;
  const [h1, m1] = start.split(":").map(Number);
  const [h2, m2] = end.split(":").map(Number);
  const diffHours = h2 - h1 + (m2 - m1) / 60;
  return diffHours * 80;
}

function formatTime(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function getInitials(label) {
  if (!label) return "?";
  return label
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const STAFF_COLORS = {
  jon_doe: "var(--accent)",
  maria_ross: "#ec4899",
  jacob_maraski: "var(--accent)",
  elena_ross: "var(--accent)",
};

// Search Icon SVG
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

const getEventClass = (type) => {
  switch (type) {
    case "patient": return "event-blue";
    case "meeting": return "event-green";
    case "urgent": return "event-red";
    case "break": return "event-orange";
    default: return "event-blue";
  }
};

const getTypeLabel = (type) => {
  switch (type) {
    case "patient": return "Client Consultation";
    case "meeting": return "Internal Sync";
    case "urgent": return "Escalated Deal";
    case "break": return "Break";
    default: return type;
  }
};

const getTypeBadgeColor = (type) => {
  switch (type) {
    case "patient": return "blue";
    case "meeting": return "green";
    case "urgent": return "red";
    case "break": return "orange";
    default: return "blue";
  }
};

export default function AppointmentsTab() {
  const [appointments, setAppointments] = useState(MOCK_DATA);
  const [staffList, setStaffList] = useState(STAFF_LIST);
  const [page, setPage] = useState(1);
const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeTab, setActiveTab] = useState("list");
  const [activeFilter, setActiveFilter] = useState("week");
  const [selectedStaff, setSelectedStaff] = useState("all");
  const [advFilters, setAdvFilters] = useState({
    title: '',
    phone: '',
    type: 'all',
    staff: 'all',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [currentTimeOffset, setCurrentTimeOffset] = useState(-1);
  const [staffSearchQuery, setStaffSearchQuery] = useState("");

  // Search state for list/table view
  const [tableSearch, setTableSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    phone: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "patient",
    assignedStaff: "jon_doe",
    description: "",
  });

  const todayStr = "2026-04-09";

  useEffect(() => {
    const updateTimeOffset = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      if (h >= 8 && h < 18) {
        setCurrentTimeOffset((h - 8 + m / 60) * 80);
      } else {
        setCurrentTimeOffset(-1);
      }
    };
    updateTimeOffset();
    const int = setInterval(updateTimeOffset, 60000);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".staff-dropdown-wrapper")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStaffLabel = (value) => {
    if (value === "all") return "All Staff";
    return staffList.find((s) => s.value === value)?.label || value;
  };

  const getFilteredAppointments = () => {
    let filtered = appointments;

    // Staff filter (top dropdown)
    if (selectedStaff !== "all") {
      filtered = filtered.filter((a) => a.assignedStaff === selectedStaff);
    }

    // Advanced Filters from sidebar
    if (advFilters.title) {
      const q = advFilters.title.toLowerCase();
      filtered = filtered.filter(a => a.title.toLowerCase().includes(q));
    }
    if (advFilters.phone) {
      const q = advFilters.phone.toLowerCase();
      filtered = filtered.filter(a => a.phone && a.phone.includes(q));
    }
    if (advFilters.type && advFilters.type !== 'all') {
      filtered = filtered.filter(a => a.type === advFilters.type);
    }
    if (advFilters.staff && advFilters.staff !== 'all') {
      filtered = filtered.filter(a => a.assignedStaff === advFilters.staff);
    }

    if (activeFilter === "day") {
      return filtered.filter((a) => a.date === todayStr);
    }
    if (activeFilter === "week") {
      const weekDates = WEEK_DAYS.map((d) => d.date);
      return filtered.filter((a) => weekDates.includes(a.date));
    }
    return filtered.sort(
      (a, b) =>
        a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)
    );
  };

  // Apply table search on top of existing filters
  const getTableFilteredAppointments = () => {
    const base = getFilteredAppointments();
    if (!tableSearch.trim()) return base;
    const q = tableSearch.toLowerCase();
    return base.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.date.includes(q) ||
        a.description.toLowerCase().includes(q) ||
        getTypeLabel(a.type).toLowerCase().includes(q) ||
        getStaffLabel(a.assignedStaff).toLowerCase().includes(q) ||
        formatTime(a.startTime).toLowerCase().includes(q) ||
        formatTime(a.endTime).toLowerCase().includes(q) ||
        (a.phone && a.phone.includes(q))
    );
  };

  const filteredAppointments = getFilteredAppointments();
  const tableAppointments = getTableFilteredAppointments();

  const handleSave = () => {
    if (!formData.title || !formData.date || !formData.startTime || !formData.endTime) {
      alert("Please fill all required fields: Event Title, Date, Start Time, and End Time.");
      return;
    }
    const newAppt = { ...formData, id: Date.now() };
    setAppointments([...appointments, newAppt]);
    setIsModalOpen(false);
    setFormData({
      title: "",
      phone: "",
      date: "",
      startTime: "",
      endTime: "",
      type: "patient",
      assignedStaff: "jon_doe",
      description: "",
    });
    toast.success("Appointment saved successfully!");
  };

  const renderCurrentTimeLine = () => {
    if (currentTimeOffset < 0) return null;
    return <div className="current-time-line" style={{ top: currentTimeOffset }} />;
  };

  const StaffTag = ({ staffValue }) => {
    const label = getStaffLabel(staffValue);
    const color = STAFF_COLORS[staffValue] || "var(--muted)";
    return (
      <div className="staff-tag" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
        <span className="staff-tag-avatar" style={{ background: color }}>
          {getInitials(label)}
        </span>
        {label}
      </div>
    );
  };

  return (
    <BaseWrapper tabProps={{ tabs: [], headerText: "Meetings" }}>
      <div className="appts-wrapper">

        {/* Header Area */}
        <div className="appts-header">
          <div className="appts-header-left">
            <div className="appts-tabs">
              <button
                className={`appts-tab-btn ${activeTab === "list" ? "active" : ""}`}
                onClick={() => setActiveTab("list")}
              >
                Appointments List
              </button>
              <button
                className={`appts-tab-btn ${activeTab === "calendar" ? "active" : ""}`}
                onClick={() => setActiveTab("calendar")}
              >
                Calendar View
              </button>
            </div>

            {/* Staff Dropdown Filter */}
            <div className="staff-dropdown-wrapper" style={{ position: "relative" }}>
              <button
                className="staff-dropdown-trigger"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "6px 12px", borderRadius: 8, border: "1px solid var(--border)",
                  background: "var(--surface3)", cursor: "pointer", fontSize: 13,
                  fontWeight: 500,
                  color: selectedStaff !== "all" ? "var(--accent-2)" : "var(--text-sec)",
                  whiteSpace: "nowrap", transition: "all 0.15s",
                  boxShadow: isDropdownOpen ? "0 0 0 2px var(--accent)40" : "none",
                }}
              >
                {selectedStaff !== "all" ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", background: STAFF_COLORS[selectedStaff] || "var(--muted)", display: "inline-block" }} />
                    {getStaffLabel(selectedStaff)}
                  </span>
                ) : "All Staff"}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="staff-dropdown-menu" style={{
                  position: "absolute", top: "calc(100% + 6px)", left: 0,
                  minWidth: 180, background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.10)", zIndex: 100,
                  overflow: "hidden", padding: "4px 0",
                }}>
                  <div style={{ padding: "8px 12px" }}>
                    <div style={{ display: "flex", alignItems: "center", background: "var(--surface2)", borderRadius: 6, padding: "6px 10px", border: "1px solid var(--border)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-sec)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8, flexShrink: 0 }}>
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      <input type="text" placeholder="Search staff..." value={staffSearchQuery}
                        onChange={(e) => setStaffSearchQuery(e.target.value)}
                        style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontSize: 13, color: "var(--text-main)" }}
                        autoFocus />
                    </div>
                  </div>

                  {staffSearchQuery === "" && (
                    <button onClick={() => { setSelectedStaff("all"); setIsDropdownOpen(false); setStaffSearchQuery(""); }}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", border: "none", background: selectedStaff === "all" ? "#f5f3ff" : "transparent", cursor: "pointer", fontSize: 13, fontWeight: selectedStaff === "all" ? 600 : 400, color: selectedStaff === "all" ? "var(--accent-2)" : "var(--text-sec)", textAlign: "left" }}>
                      <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--border)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--muted)", fontWeight: 700 }}>All</span>
                      All Staff
                      {selectedStaff === "all" && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  )}

                  <div style={{ height: 1, background: "var(--surface2)", margin: "2px 0" }} />

                  {staffList.filter((staff) => staff.label.toLowerCase().includes(staffSearchQuery.toLowerCase())).length === 0 ? (
                    <div style={{ padding: "12px 14px", textAlign: "center", fontSize: 12, color: "var(--muted)" }}>No staff found</div>
                  ) : (
                    staffList.filter((staff) => staff.label.toLowerCase().includes(staffSearchQuery.toLowerCase())).map((staff) => (
                      <button key={staff.value}
                        onClick={() => { setSelectedStaff(staff.value); setIsDropdownOpen(false); setStaffSearchQuery(""); }}
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", border: "none", background: selectedStaff === staff.value ? "#f5f3ff" : "transparent", cursor: "pointer", fontSize: 13, fontWeight: selectedStaff === staff.value ? 600 : 400, color: selectedStaff === staff.value ? "var(--accent-2)" : "var(--text-sec)", textAlign: "left" }}>
                        <span style={{ width: 24, height: 24, borderRadius: "50%", background: STAFF_COLORS[staff.value] || "var(--muted)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "var(--text-inverse)", fontWeight: 700, letterSpacing: "0.02em", flexShrink: 0 }}>
                          {getInitials(staff.label)}
                        </span>
                        {staff.label}
                        {selectedStaff === staff.value && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="appts-filters">
              <button className={`appts-filter-btn ${activeFilter === "day" ? "active" : ""}`} onClick={() => setActiveFilter("day")}>Day</button>
              <button className={`appts-filter-btn ${activeFilter === "week" ? "active" : ""}`} onClick={() => setActiveFilter("week")}>Week</button>
              <button className={`appts-filter-btn ${activeFilter === "month" ? "active" : ""}`} onClick={() => setActiveFilter("month")}>Month</button>
            </div>
          </div>

          {/* Advanced Filter Button */}
              <div className="appts-header-right">

  <button
    className="lm-btn-header-fields"
    onClick={() => setShowFilterSidebar(true)}
  >
    <Filter size={14} />
    Filter By
  </button>

  <button
    className="btn-add-appt"
    onClick={() => setIsModalOpen(true)}
  >
    + Add Appointment
  </button>

</div>
        </div>

        <div className="appts-content">
          <div className="appts-main-view">

            {/* ── List / Table View ── */}
            {activeTab === "list" && (
              <div className="appts-table-section">

                {/* Search Bar */}
                <div className="table-search-bar">
                  <span className="table-search-icon"><SearchIcon /></span>
                  <input
                    type="text"
                    className="table-search-input"
                    placeholder="Search by title, staff, type, date, time, description..."
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                  />
                  {tableSearch && (
                    <button className="table-search-clear" onClick={() => setTableSearch("")}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                  <span className="table-search-count">
                    {tableAppointments.length} result{tableAppointments.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Table */}
                <div className="appts-table-wrapper">
                  <table className="appts-table">
                    <thead>
                      <tr className="appts-table-head-row">
                        <th className="appts-th col-title">Event Title</th>
                        <th className="appts-th col-phone">Phone Number</th>
                        <th className="appts-th col-date">Date</th>
                        <th className="appts-th col-start">Start Time</th>
                        <th className="appts-th col-end">End Time</th>
                        <th className="appts-th col-type">Event Type</th>
                        <th className="appts-th col-staff">Staff</th>
                        <th className="appts-th col-desc">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="appts-table-empty">
                            <div className="empty-state">
                              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                              </svg>
                              <span>No appointments match your search.</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        tableAppointments.map((appt) => (
                          <tr
                            key={appt.id}
                            className={`appts-table-row ${selectedAppointment?.id === appt.id ? "row-selected" : ""}`}
                            onClick={() => setSelectedAppointment(appt)}
                          >
                            <td className="appts-td col-title">
                              <span className="td-title-text">{appt.title}</span>
                            </td>
                            <td className="appts-td col-phone">
                              <span className="td-muted">{appt.phone || <span className="td-na">—</span>}</span>
                            </td>
                            <td className="appts-td col-date">
                              <span className="td-date-chip">{appt.date}</span>
                            </td>
                            <td className="appts-td col-start">
                              <span className="td-time">{formatTime(appt.startTime)}</span>
                            </td>
                            <td className="appts-td col-end">
                              <span className="td-time">{formatTime(appt.endTime)}</span>
                            </td>
                            <td className="appts-td col-type">
                              <span className={`appt-type-badge color-${getTypeBadgeColor(appt.type)}`}>
                                {getTypeLabel(appt.type)}
                              </span>
                            </td>
                            <td className="appts-td col-staff">
                              {appt.assignedStaff && <StaffTag staffValue={appt.assignedStaff} />}
                            </td>
                            <td className="appts-td col-desc">
                              <span className="td-desc">{appt.description || <span className="td-na">—</span>}</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Calendar View */}
            {activeTab === "calendar" && (
              <div className="calendar-wrapper" style={{ flex: 1, display: "flex", flexDirection: "column", overflowX: "auto" }}>
                <div className={`calendar-inner ${activeFilter !== "day" ? "scrollable-x" : ""}`}>
                  {activeFilter === "month" ? (
                    <div style={{ padding: 16, flex: 1, overflowY: "auto" }}>
                      <div className="month-grid">
                        {WEEK_DAYS.map((d) => (
                          <div key={d.name} style={{ textAlign: "center", fontWeight: 600, padding: "8px 0", fontSize: 13, color: "var(--text-sec)" }}>
                            {d.name}
                          </div>
                        ))}
                        {Array.from({ length: 35 }).map((_, i) => {
                          const dayNum = i - 4;
                          const isRealDay = dayNum >= 1 && dayNum <= 30;
                          const dateStr = `2026-04-${String(dayNum).padStart(2, "0")}`;
                          const dayAppts = isRealDay ? filteredAppointments.filter((a) => a.date === dateStr) : [];
                          return (
                            <div key={i} className="month-cell" style={{ opacity: isRealDay ? 1 : 0.4 }}>
                              <div className="month-cell-date">{isRealDay ? dayNum : ""}</div>
                              {dayAppts.map((appt) => (
                                <div key={appt.id}
                                  className={`month-event-pill event-${appt.type === "patient" ? "blue" : appt.type === "meeting" ? "green" : appt.type === "urgent" ? "red" : "orange"}`}
                                  onClick={() => setSelectedAppointment(appt)}>
                                  {formatTime(appt.startTime)} {appt.title}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="calendar-days-header">
                        <div className="calendar-time-header-empty" />
                        {activeFilter === "day" ? (
                          <div className={`calendar-day-header ${todayStr === "2026-04-09" ? "is-today" : ""}`}>
                            {WEEK_DAYS.find((d) => d.date === todayStr)?.name || "Day"} <br />
                            <span style={{ fontSize: 20 }}>{todayStr.split("-")[2]}</span>
                          </div>
                        ) : (
                          WEEK_DAYS.map((d) => (
                            <div key={d.date} className={`calendar-day-header ${d.date === todayStr ? "is-today" : ""}`}>
                              {d.name.toUpperCase()} <br />
                              <span style={{ fontSize: 20 }}>{d.date.split("-")[2]}</span>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="calendar-body-scroll">
                        <div className="calendar-grid-row">
                          <div className="calendar-time-col">
                            {HOURS.map((h) => (
                              <div key={h} className="time-slot-label">
                                {h === 12 ? "12 PM" : h > 12 ? `${h - 12} PM` : `${h} AM`}
                              </div>
                            ))}
                          </div>
                          <div className="calendar-cols-container">
                            <div className="calendar-grid-lines">
                              {HOURS.map((h) => <div key={h} className="grid-line-hour" />)}
                            </div>
                            {activeFilter === "day" ? (
                              <div className="calendar-day-col">
                                {renderCurrentTimeLine()}
                                {filteredAppointments.map((appt) => (
                                  <div key={appt.id} onClick={() => setSelectedAppointment(appt)}
                                    className={`calendar-event ${getEventClass(appt.type)} ${selectedAppointment?.id === appt.id ? "selected" : ""}`}
                                    style={{ top: getTimeOffset(appt.startTime), height: getDurationHeight(appt.startTime, appt.endTime) }}>
                                    <div className="event-time-small">{formatTime(appt.startTime)} - {formatTime(appt.endTime)}</div>
                                    <div className="event-title-small">{appt.title}</div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              WEEK_DAYS.map((d) => {
                                const dayAppts = filteredAppointments.filter((a) => a.date === d.date);
                                const isTodayCol = d.date === todayStr;
                                return (
                                  <div key={d.date} className="calendar-day-col">
                                    {isTodayCol && renderCurrentTimeLine()}
                                    {dayAppts.map((appt) => (
                                      <div key={appt.id} onClick={() => setSelectedAppointment(appt)}
                                        className={`calendar-event ${getEventClass(appt.type)} ${selectedAppointment?.id === appt.id ? "selected" : ""}`}
                                        style={{ top: getTimeOffset(appt.startTime), height: getDurationHeight(appt.startTime, appt.endTime) }}>
                                        <div className="event-time-small">{formatTime(appt.startTime)}</div>
                                        <div className="event-title-small">{appt.title}</div>
                                      </div>
                                    ))}
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Details */}
          <div className={`appts-sidebar ${selectedAppointment ? "open" : ""}`}>
            {selectedAppointment ? (
              <>
                <button className="sidebar-close-btn" onClick={() => setSelectedAppointment(null)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div className="sidebar-header">
                  <div className="sidebar-title">{selectedAppointment.title}</div>
                  <div className={`appt-type-badge color-${getTypeBadgeColor(selectedAppointment.type)}`} style={{ display: "inline-block", marginBottom: 12 }}>
                    {getTypeLabel(selectedAppointment.type)}
                  </div>
                  <div className="sidebar-date">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {selectedAppointment.date}
                  </div>
                  <div className="sidebar-date">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {formatTime(selectedAppointment.startTime)} – {formatTime(selectedAppointment.endTime)}
                  </div>
                  {selectedAppointment.phone && (
                    <div className="sidebar-date">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.38 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.06 6.06l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      {selectedAppointment.phone}
                    </div>
                  )}
                  {selectedAppointment.assignedStaff && (
                    <div style={{ marginTop: 8 }}>
                      <StaffTag staffValue={selectedAppointment.assignedStaff} />
                    </div>
                  )}
                </div>

                <div className="sidebar-section">
                  <div className="sidebar-label">Description & Notes</div>
                  <div className="sidebar-text">{selectedAppointment.description || "No description provided."}</div>
                </div>

                <div className="sidebar-actions">
                  <button className="btn-sidebar-primary">
                    {selectedAppointment.type === "meeting" ? "Call Now" : "Open Deal Board"}
                  </button>
                  <button className="btn-sidebar-secondary">Edit Details</button>
                  <button className="btn-sidebar-secondary" style={{ color: "var(--danger)" }}>Cancel Event</button>
                </div>
              </>
            ) : (
              <div className="sidebar-empty">
                <div className="sidebar-icon-placeholder">
                  <Calendar/>
                </div>
                Select an appointment to view details or click + Add Appointment to create a new one.
              </div>
            )}
          </div>
        </div>

        {/* Add Appointment Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">Create Appointment</div>

              <div className="form-group">
                <label>Event Title</label>
                <input type="text" placeholder="e.g. Acme Corp Sync" value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })} autoFocus />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>

              <div className="form-group">
                <label>Event Type</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                  <option value="patient">Client Consultation</option>
                  <option value="meeting">Internal Sync</option>
                  <option value="urgent">Escalated Deal / Urgent</option>
                  <option value="break">Break / Blocked</option>
                </select>
              </div>

              <div className="form-group">
                <label>Staff</label>
                <select value={formData.assignedStaff} onChange={(e) => setFormData({ ...formData, assignedStaff: e.target.value })}>
                  {staffList.map((staff) => (
                    <option key={staff.value} value={staff.value}>{staff.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date</label>
                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Time</label>
                  <input type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input type="time" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} />
                </div>
              </div>

              <div className="form-group">
                <label>Description (Optional)</label>
                <input type="text" placeholder="Add meeting agenda or notes..." value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => {
                  setIsModalOpen(false);
                  setFormData({ title: "", phone: "", date: "", startTime: "", endTime: "", type: "patient", assignedStaff: "jon_doe", description: "" });
                }}>Cancel</button>
                <button className="btn-save" onClick={handleSave}>Save Appointment</button>
              </div>
            </div>
          </div>
        )}
      </div>
{/* Filter Sidebar */}
      <FilterSidebar 
        isOpen={showFilterSidebar} 
        onClose={() => setShowFilterSidebar(false)} 
        onApply={(filters) => { setAdvFilters(filters); setPage(1); }}
      />
    </BaseWrapper>
  );
}