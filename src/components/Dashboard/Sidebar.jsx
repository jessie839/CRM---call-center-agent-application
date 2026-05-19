import React, { useState, useRef, useEffect, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DooctiLogo from "../../assets/Doocti-bird-logo-white.svg";
import "../../styles/sidebar.css"
import {
  CalendarClock,
  House,
  Trophy,
  User,
  Contact,
  X,
  Menu,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  BarChart2,
  Users,
  Activity,
  Phone,
  Grip,
} from "lucide-react";
 
const TABS = [
  { label: "Overview", icon: <LayoutDashboard size={16} /> },
  // { label: "Appointments", icon: <BarChart2 size={16} /> },
  { label: "Call Logs", icon: <Grip size={16} /> },
  { label: "Analytics", icon: <Activity size={16} /> },
];
 
// Each icon slot height in the sidebar
const ITEM_SIZE = 64;
const ITEM_GAP = 8;
const ITEM_STRIDE = ITEM_SIZE + ITEM_GAP;
 
export default function Sidebar({ isOpen, onClose, activeTab, setActiveTab }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [homeExpanded, setHomeExpanded] = useState(true);
 
  const isDashboardRoute = location.pathname === "/" || location.pathname === "/dashboard";
  const isLeads = location.pathname === "/leads";
  const isMeetings = location.pathname === "/meetings";
  const isTeampeering = location.pathname === "/teampeering";
  // const isCalls = location.pathname === "/call-log";
  const isAnalytics = location.pathname === "/analytics";
  const isCallLog = location.pathname === "/call-log";
  const isContacts = location.pathname === "/contacts";
 
  const hasActiveRoute = isDashboardRoute || isLeads || isMeetings || isTeampeering || isAnalytics || isCallLog || isContacts;
  const isDashboard = isDashboardRoute;
  const sidebarRef = useRef(null);
 
  // Measure each nav item's offsetTop for the animated indicator
  const itemRefs = useRef([]);
  const [indicatorY, setIndicatorY] = useState(() => {
    const saved = sessionStorage.getItem('sidebar_indicator_y');
    return saved !== null ? parseFloat(saved) : -1;
  });
  const [hasAnimated, setHasAnimated] = useState(false);
 
  const navList = [
    { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: <House size={22} />, active: isDashboard },
    { id: "leads", label: "Leads", path: "/leads", icon: <User size={22} />, active: isLeads },
    { id: "contacts", label: "Contacts", path: "/contacts", icon: <Contact size={22} />, active: isContacts },
    { id: "meetings", label: "Meetings", path: "/meetings", icon: <CalendarClock size={22} />, active: isMeetings },
    { id: "call-log", label: "Call Logs", path: "/call-log", icon: <Phone size={22} />, active: isCallLog },
  ];
 
  const bottomNav = [
    { id: "teampeering", label: "Leader Board", path: "/teampeering", icon: <Trophy size={22} />, active: isTeampeering },
  ];
 
  const allNav = [...navList, ...bottomNav];
  const activeIdx = allNav.findIndex((item) => item.active);
 
  useEffect(() => {
    if (activeIdx !== -1 && itemRefs.current[activeIdx]) {
      const currentY = itemRefs.current[activeIdx].offsetTop;
 
      if (indicatorY === -1) {
        // First visit ever: jump directly, no animation
        setIndicatorY(currentY);
        sessionStorage.setItem('sidebar_indicator_y', currentY);
        setTimeout(() => setHasAnimated(true), 50);
      } else if (indicatorY !== currentY) {
        // Came from another page: enable transition, then move to new target
        setHasAnimated(true);
        setTimeout(() => {
          setIndicatorY(currentY);
          sessionStorage.setItem('sidebar_indicator_y', currentY);
        }, 20);
      } else {
        // Refreshed on same route: no movement needed
        setHasAnimated(true);
      }
    }
  }, [activeIdx]); // Intentionally omit indicatorY
 
  useEffect(() => {
    if (isDashboard) setHomeExpanded(true);
  }, [isDashboard]);
 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen]);
 
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);
 
  const handleHomeClick = () => {
    if (!isDashboard) navigate("/dashboard");
    setHomeExpanded((prev) => !prev);
  };
 
  const handleTabClick = (tab) => {
    setActiveTab(tab.label);
    setMobileMenuOpen(false);
  };
 
  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };
 
 
  //  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: <House size={22} />, active: isDashboard },
  // { id: "leads", label: "Leads", path: "/leads", icon: <User size={22} />, active: isLeads },
  // { id: "contacts", label: "Contacts", path: "/contacts", icon: <Contact size={22} />, active: isContacts },
  // { id: "meetings", label: "Meetings", path: "/meetings", icon: <CalendarClock size={22} />, active: isMeetings },
  // { id: "call-log", label: "Call Logs", path: "/call-log", icon: <Phone size={22} />, active: isCallLog },
 
  const mobileNavItems = [
    { label: "Leads", icon: <User size={20} />, path: "/leads", active: isLeads },
    { label: "Meetings", icon: <CalendarClock size={20} />, path: "/meetings", active: isMeetings },
    { label: "Call Logs", icon: <Phone size={20} />, path: "/call-log", active: isCallLog },
    { label: "Contacts", icon: <Contact size={20} />, path: "/contacts", active: isContacts },
    { label: "Leaderboard", icon: <Trophy size={20} />, path: "/teampeering", active: isTeampeering },
  ];
 
  return (
    <>
      {/* ─── Desktop Sidebar ─── */}
      <aside className="nsb desktop-only">
        {/* Logo */}
        <div
          className="nsb-logo"
          onClick={() => navigate('/dashboard')}
          style={{ cursor: 'pointer' }}
        >
          <img src={DooctiLogo} alt="Doocti logo" />
        </div>
 
        {/* Nav items container — position:relative so the SVG overlay can sit inside */}
        <div className="nsb-items">
 
          {/* Animated SVG cutout — same idea as the React Native AnimatedSvg */}
          <div
            className={`nsb-curve-track ${hasAnimated ? 'nsb-curve-track--ready' : ''}`}
            style={{
              transform: `translateY(${indicatorY === -1 ? 0 : indicatorY}px)`,
              opacity: activeIdx === -1 ? 0 : 1,
              visibility: activeIdx === -1 ? 'hidden' : 'visible',
              transition: activeIdx === -1 ? 'opacity 0.2s' : ''
            }}
          >
            {/* The white pill that punches out of the accent sidebar */}
            <div className="nsb-curve-pill" />
            {/* Top concave corner */}
            <div className="nsb-curve-corner nsb-curve-corner--top" />
            {/* Bottom concave corner */}
            <div className="nsb-curve-corner nsb-curve-corner--bot" />
          </div>
 
          {/* Main nav icons */}
          {navList.map((item, idx) => (
            <button
              key={item.id}
              ref={(el) => (itemRefs.current[idx] = el)}
              className={`nsb-icon ${item.active ? "nsb-icon--active" : ""}`}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
 
          {/* Spacer pushes bottom item down */}
          <div className="nsb-spacer" />
 
          {/* Bottom nav icons */}
          {bottomNav.map((item, idx) => (
            <button
              key={item.id}
              ref={(el) => (itemRefs.current[navList.length + idx] = el)}
              className={`nsb-icon ${item.active ? "nsb-icon--active" : ""}`}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </aside>
 
      {/* ─── Mobile Hamburger ─── */}
      <button
        className="mob-hamburger-btn"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>
 
      {/* ─── Backdrop ─── */}
      {
        mobileMenuOpen && (
          <div
            className="mob-sidebar-backdrop"
            onClick={() => setMobileMenuOpen(false)}
          />
        )
      }
 
      {/* ─── Mobile Slide-in Sidebar ─── */}
      <nav
        ref={sidebarRef}
        className={`mob-sidebar ${mobileMenuOpen ? "mob-sidebar--open" : ""}`}
      >
        <div className="mob-sidebar-header">
          <img src={DooctiLogo} alt="Doocti" className="mob-sidebar-logo" />
          <button className="mob-sidebar-close" onClick={() => setMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
 
        <div className="mob-sidebar-nav">
          {/* Home with expandable tabs */}
          <div
            className={`mob-sidebar-item ${isDashboard ? "mob-sidebar-item--active" : ""}`}
            onClick={handleHomeClick}
          >
            <span className="mob-sidebar-item__icon"><House size={20} /></span>
            <span className="mob-sidebar-item__label">Home</span>
            <span className={`mob-sidebar-item__chevron ${homeExpanded ? "mob-sidebar-item__chevron--open" : ""}`}>
              <ChevronDown size={16} />
            </span>
          </div>
 
          <div className={`mob-sidebar-submenu ${homeExpanded ? "mob-sidebar-submenu--open" : ""}`}>
            <div>
              {TABS.map((tab) => (
                <div
                  key={tab.label}
                  className={`mob-sidebar-subitem ${activeTab === tab.label ? "mob-sidebar-subitem--active" : ""}`}
                  onClick={() => handleTabClick(tab)}
                >
                  <span className="mob-sidebar-subitem__icon">{tab.icon}</span>
                  <span>{tab.label}</span>
                  {activeTab === tab.label && (
                    <span className="mob-sidebar-subitem__dot" />
                  )}
                  {/* {activeTab === tab.label && <span className="mob-sidebar-subitem__dot" />} */}
                </div>
              ))}
            </div>
          </div>
 
          {mobileNavItems.map((item) => (
            <div
              key={item.path}
              className={`mob-sidebar-item ${item.active ? "mob-sidebar-item--active" : ""}`}
              onClick={() => handleNavClick(item.path)}
            >
              <span className="mob-sidebar-item__icon">{item.icon}</span>
              <span className="mob-sidebar-item__label">{item.label}</span>
              {item.active && <ChevronRight size={16} className="mob-sidebar-item__arrow" />}
            </div>
          ))}
        </div>
 
        <div className="mob-sidebar-footer">
          <p className="mob-sidebar-footer__text">Doocti v1.0</p>
        </div>
      </nav>
    </>
  );
}