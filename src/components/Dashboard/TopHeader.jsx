import React, { useState, useMemo, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import ProfileStatusDropdown from './ProfileStatusDropdown';
import { useCallState } from '../../context/callstate.context';
import { useAutoDial } from '../../context/autodial.context';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Bell, Menu, X, Search, MessageCircle, Phone, Info, CheckCircle, ArrowLeft, Send, Plus, Image, FileText, Video } from 'lucide-react';
import '../../styles/TopHeader.css';

// --- DUMMY DATA FOR WHATSAPP ---
const WHATSAPP_CONTACTS = [
  { id: 1, name: "John Doe", number: "+1 234 567 8900" },
  { id: 2, name: "Alice Smith", number: "+1 987 654 3210" },
  { id: 3, name: "Bob Johnson", number: "+1 555 123 4567" },
  { id: 4, name: "Emma Davis", number: "+44 7700 900077" },
  { id: 5, name: "Michael Wilson", number: "+61 400 123 456" },
  { id: 6, name: "Sarah Brown", number: "+1 800 555 0199" },
  { id: 7, name: "David Miller", number: "+1 312 555 0122" },
  { id: 8, name: "Lisa Anderson", number: "+1 212 555 0188" },
];

const FB_CONTACTS = [
  { id: 1, name: "Alex Johnson", message: "Last seen 5m ago" },
  { id: 2, name: "Maria Garcia", message: "Online" },
  { id: 3, name: "James Wilson", message: "Last seen 1h ago" },
  { id: 4, name: "Sarah Miller", message: "Online" },
];

const FacebookIcon = ({ size = 24, color = "currentColor" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
 
// --- DUMMY CHAT DATA ---
const WA_MESSAGES = [
  { id: 1, sender: "John Doe", text: "Hey! How can I help you today?", time: "10:30 AM", type: "in" },
  { id: 2, sender: "Me", text: "I have a question about my order.", time: "10:32 AM", type: "out" },
  { id: 3, sender: "John Doe", text: "Sure, go ahead!", time: "10:33 AM", type: "in" },
];

const FB_MESSAGES = [
  { id: 1, sender: "Alex Johnson", text: "Is the product still available?", time: "09:15 AM", type: "in" },
  { id: 2, sender: "Me", text: "Yes, it is!", time: "09:20 AM", type: "out" },
  { id: 3, sender: "Alex Johnson", text: "Great, I'll take it.", time: "09:22 AM", type: "in" },
];

// --- DUMMY NOTIFICATIONS ---
const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'whatsapp', title: 'New WhatsApp Message', body: 'John Doe: Hey, I need help with my order.', time: '2 min ago', read: false },
  { id: 2, type: 'missed_call', title: 'Missed Call', body: '+1 987 654 3210 called and got no answer.', time: '15 min ago', read: false },
  { id: 3, type: 'whatsapp', title: 'New WhatsApp Message', body: 'Emma Davis: When will my refund be processed?', time: '1 hr ago', read: false },
  { id: 4, type: 'update', title: 'System Update', body: 'Call routing rules have been updated by admin.', time: '3 hr ago', read: true },
  { id: 5, type: 'missed_call', title: 'Missed Call', body: '+1 312 555 0122 called and got no answer.', time: 'Yesterday', read: true },
  { id: 6, type: 'update', title: 'New Feature Available', body: 'Disposition scheduling is now live for all agents.', time: 'Yesterday', read: true },
];
function NotifIcon({ type }) {
  if (type === 'whatsapp') return <MessageCircle size={16} color="#25D366" />;
  if (type === 'missed_call') return <Phone size={16} color="var(--danger, #ef4444)" />;
  if (type === 'update') return <Info size={16} color="var(--accent, #6366f1)" />;
  return <Bell size={16} />;
}
export default function TopHeader({ activeTab, setActiveTab, tabs, headerText = "Agent Details", onToggleSidebar, isSidebarOpen }) {
  const { callState, setCallState } = useCallState();
  const { mode, setMode } = useTheme();
 
  const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);
  const [isWhatsAppWidgetOpen, setIsWhatsAppWidgetOpen] = useState(false);
  const [isFacebookWidgetOpen, setIsFacebookWidgetOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWAContact, setSelectedWAContact] = useState(null);
  const [selectedFBContact, setSelectedFBContact] = useState(null);

  // Chat states
  const [waMessages, setWaMessages] = useState(WA_MESSAGES);
  const [fbMessages, setFbMessages] = useState(FB_MESSAGES);
  const [waInput, setWaInput] = useState('');
  const [fbInput, setFbInput] = useState('');

  const waFileInputRef = useRef(null);
  const fbFileInputRef = useRef(null);

  const handleSendMessage = (platform) => {
    if (platform === 'wa' && waInput.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: "Me",
        text: waInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "out"
      };
      setWaMessages([...waMessages, newMessage]);
      setWaInput('');
    } else if (platform === 'fb' && fbInput.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: "Me",
        text: fbInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "out"
      };
      setFbMessages([...fbMessages, newMessage]);
      setFbInput('');
    }
  };

  const handleFileClick = (platform) => {
    if (platform === 'wa') waFileInputRef.current.click();
    else fbFileInputRef.current.click();
  };

  const handleFileChange = (e, platform) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    const newMessage = {
      id: Date.now(),
      sender: "Me",
      text: file.name,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "out",
      fileUrl,
      fileType: file.type,
      isImage,
      isVideo,
      isFile: true
    };

    if (platform === 'wa') setWaMessages([...waMessages, newMessage]);
    else setFbMessages([...fbMessages, newMessage]);
  };
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const clearAll = () => setNotifications([]);
 
  const filteredContacts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return WHATSAPP_CONTACTS.filter(c =>
      c.name.toLowerCase().includes(q) || c.number.includes(q)
    );
  }, [searchQuery]);

  const filteredFBContacts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return FB_CONTACTS.filter(c =>
      c.name.toLowerCase().includes(q)
    );
  }, [searchQuery]);
 
  const socialMenuRef = useRef(null);
  const waNodeRef = useRef(null);
  const fbNodeRef = useRef(null);

  // Close social menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (socialMenuRef.current && !socialMenuRef.current.contains(event.target)) {
        setIsSocialMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Global event listener for external triggers (like Lead Details page)
  useEffect(() => {
    const handleToggleWA = (e) => {
      setIsWhatsAppWidgetOpen(true);
      if (e.detail && e.detail.name) {
        setSelectedWAContact({
          id: 'external',
          name: e.detail.name,
          number: e.detail.phone || '',
          avatar: e.detail.name.charAt(0)
        });
      } else {
        setSelectedWAContact(null); 
      }
    };
    window.addEventListener('toggle-whatsapp', handleToggleWA);
    return () => window.removeEventListener('toggle-whatsapp', handleToggleWA);
  }, []);

  const openWhatsApp = () => {
    setIsSocialMenuOpen(false);
    setIsWhatsAppWidgetOpen(true);
    setSelectedWAContact(null); // Show list first
  };
  const openFacebook = () => {
    setIsSocialMenuOpen(false);
    setIsFacebookWidgetOpen(true);
    setSelectedFBContact(null); // Show list first
  };
 
  return (
    <>
      {/* Notification panel backdrop */}
      {isNotifOpen && (
        <div
          className="notif-backdrop"
          onClick={() => setIsNotifOpen(false)}
        />
      )}
 
      <header className="new-top-header">
        {/* ── Left: Title ── */}
        <div className="header-left">
          <span className="header-text">{headerText}</span>
        </div>
        {/* ── Center: Tabs ── */}
        {tabs && tabs.length > 0 && (
          <div className="header-tabs">
            {tabs.map((tab) => (
              <div
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'Call Logs' && callState.incomingMinimized) {
                    setCallState({ ...callState, incomingMinimized: false });
                  }
                }}
              >
                {tab}
                {tab === 'Call Logs' && callState.incomingMinimized && (
                  <span className="call-log-dot" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Right: Actions ── */}
        <div className="header-actions">

          {/* Burger Menu for Socials */}
          <div className="social-menu-wrapper" ref={socialMenuRef}>
            <div className="header-icon" onClick={() => setIsSocialMenuOpen(!isSocialMenuOpen)}>
              <Menu size={18} />
            </div>
            {isSocialMenuOpen && (
              <div className="social-dropdown">
                <div className="social-dropdown-header">
                  Social Media
                </div>
                <div className="social-dropdown-body">
                  <button
                    className="social-dropdown-item"
                    onClick={openWhatsApp}
                  >
                    <MessageCircle size={28} color="#25D366" />
                    <span>Whatsapp</span>
                  </button>
                  <button
                    className="social-dropdown-item"
                    onClick={openFacebook}
                  >
                    <FacebookIcon size={28} color="#1877F2" />
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            )}
          </div>
 
          {/* Theme Toggle */}
          <div className="header-icon" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
            {mode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </div>

          {/* Profile */}
          <ProfileStatusDropdown />

          {/* Bell Icon with unread badge */}
          <div className="bell-wrapper">
            <div
              className="header-icon"
              onClick={() => setIsNotifOpen(prev => !prev)}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="unread-badge">{unreadCount}</span>
              )}
            </div>
          </div>
        </div>

        {/* ── Notification Slider Panel ── */}
        <div className={`notif-panel ${isNotifOpen ? 'notif-panel--open' : ''}`}>

          {/* Panel Header */}
          <div className="notif-panel-header">
            <div className="notif-panel-title">
              <Bell size={18} color="var(--accent)" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="notif-new-badge">{unreadCount} new</span>
              )}
            </div>
            <button
              className="notif-close-btn"
              onClick={() => setIsNotifOpen(false)}
              onMouseOver={(e) => e.currentTarget.classList.add('hovered')}
              onMouseOut={(e) => e.currentTarget.classList.remove('hovered')}
            >
              <X size={16} />
            </button>
          </div>
 
          {/* Quick Actions */}
          {notifications.length > 0 && (
            <div className="notif-actions-bar">
              <button className="notif-action-btn notif-action-btn--primary" onClick={markAllRead}>
                <CheckCircle size={12} /> Mark all read
              </button>
              <button className="notif-action-btn notif-action-btn--muted" onClick={clearAll}>
                Clear all
              </button>
            </div>
          )}
 
          {/* Notification List */}
          <div className="notif-list custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="notif-empty">
                <Bell size={48} className="notif-empty-icon" />
                <div className="notif-empty-title">All caught up!</div>
                <div className="notif-empty-sub">No notifications right now.</div>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`notif-item ${notif.read ? '' : 'notif-item--unread'}`}
                  onClick={() => markRead(notif.id)}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--surface2)'}
                  onMouseOut={(e) => e.currentTarget.style.background = notif.read ? 'transparent' : 'var(--accent-light, rgba(99,102,241,0.06))'}
                >
                  <div className="notif-item-icon">
                    <NotifIcon type={notif.type} />
                  </div>
                  <div className="notif-item-body">
                    <div className="notif-item-top">
                      <span className={`notif-item-title ${notif.read ? '' : 'notif-item-title--unread'}`}>
                        {notif.title}
                      </span>
                      <span className="notif-item-time">{notif.time}</span>
                    </div>
                    <div className="notif-item-text">{notif.body}</div>
                  </div>
                  {!notif.read && <div className="notif-unread-dot" />}
                </div>
              ))
            )}
          </div>
        </div>
        {/* ── WhatsApp Widget (draggable) ── */}
        {isWhatsAppWidgetOpen && (
          <Draggable nodeRef={waNodeRef} handle=".wa-widget-header" bounds="body">
            <div className="wa-widget wa-chat-widget" ref={waNodeRef}>
              <div className="wa-widget-header">
                {selectedWAContact ? (
                  <div className="wa-chat-header-info">
                    <button className="wa-back-btn" onClick={() => setSelectedWAContact(null)}>
                      <ArrowLeft size={18} />
                    </button>
                    <div className="wa-chat-avatar">{selectedWAContact.name.charAt(0)}</div>
                    <h3 className="wa-widget-title">{selectedWAContact.name}</h3>
                  </div>
                ) : (
                  <h3 className="wa-widget-title">WhatsApp Contacts</h3>
                )}
                <button
                  className="wa-widget-close-btn"
                  onClick={() => { setIsWhatsAppWidgetOpen(false); setSelectedWAContact(null); setSearchQuery(''); }}
                >
                  <X size={16} />
                </button>
              </div>

              {!selectedWAContact ? (
                <>
                  <div className="wa-search-bar">
                    <div className="wa-search-input-wrapper">
                      <Search size={16} color="var(--muted)" className="wa-search-icon" />
                      <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="wa-search-input"
                      />
                    </div>
                  </div>
                  <div className="wa-contact-list custom-scrollbar">
                    {filteredContacts.map(contact => (
                      <div
                        key={contact.id}
                        className="wa-contact-item"
                        onClick={() => setSelectedWAContact(contact)}
                      >
                        <div className="wa-contact-avatar">{contact.name.charAt(0)}</div>
                        <div className="wa-contact-info">
                          <div className="wa-contact-name">{contact.name}</div>
                          <div className="wa-contact-number">{contact.number}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="wa-chat-body custom-scrollbar">
                    <div className="chat-date-separator"><span>TODAY</span></div>
                    {waMessages.map(msg => (
                      <div key={msg.id} className={`wa-msg-bubble wa-msg-${msg.type} ${msg.isFile ? 'wa-msg-file' : ''}`}>
                        <div className="wa-msg-text">
                          {msg.isImage ? (
                            <img src={msg.fileUrl} alt={msg.text} className="chat-media-preview" onClick={() => window.open(msg.fileUrl)} />
                          ) : msg.isVideo ? (
                            <video src={msg.fileUrl} className="chat-media-preview" controls />
                          ) : msg.isFile ? (
                            <a href={msg.fileUrl} target="_blank" rel="noreferrer" className="chat-file-link">
                              <FileText size={16} />
                              <span>{msg.text}</span>
                            </a>
                          ) : (
                            msg.text
                          )}
                        </div>
                        <div className="wa-msg-time">{msg.time}</div>
                      </div>
                    ))}
                  </div>
                  <div className="wa-chat-footer">
                    <input type="file" ref={waFileInputRef} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'wa')} />
                    <button className="wa-attach-btn" onClick={() => handleFileClick('wa')}>
                      <Plus size={20} />
                    </button>
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="wa-chat-input" 
                      value={waInput}
                      onChange={(e) => setWaInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage('wa')}
                    />
                    <button className="wa-send-btn" onClick={() => handleSendMessage('wa')}>
                      <Send size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </Draggable>
        )}

        {/* ── Facebook Widget (draggable) ── */}
        {isFacebookWidgetOpen && (
          <Draggable nodeRef={fbNodeRef} handle=".fb-widget-header" bounds="body">
            <div className="fb-widget fb-chat-widget" ref={fbNodeRef}>
              <div className="fb-widget-header">
                {selectedFBContact ? (
                  <div className="fb-chat-header-info">
                    <button className="fb-back-btn" onClick={() => setSelectedFBContact(null)}>
                      <ArrowLeft size={18} />
                    </button>
                    <div className="fb-chat-avatar">{selectedFBContact.name.charAt(0)}</div>
                    <h3 className="wa-widget-title">{selectedFBContact.name}</h3>
                  </div>
                ) : (
                  <h3 className="wa-widget-title">Messenger</h3>
                )}
                <button
                  className="fb-widget-close-btn"
                  onClick={() => { setIsFacebookWidgetOpen(false); setSelectedFBContact(null); setSearchQuery(''); }}
                >
                  <X size={16} />
                </button>
              </div>

              {!selectedFBContact ? (
                <>
                  <div className="wa-search-bar">
                    <div className="wa-search-input-wrapper">
                      <Search size={16} color="var(--muted)" className="wa-search-icon" />
                      <input
                        type="text"
                        placeholder="Search Messenger..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="wa-search-input"
                      />
                    </div>
                  </div>
                  <div className="wa-contact-list custom-scrollbar">
                    {filteredFBContacts.map(contact => (
                      <div
                        key={contact.id}
                        className="wa-contact-item"
                        onClick={() => setSelectedFBContact(contact)}
                      >
                        <div className="fb-chat-avatar">{contact.name.charAt(0)}</div>
                        <div className="wa-contact-info">
                          <div className="wa-contact-name">{contact.name}</div>
                          <div className="wa-contact-number">{contact.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="fb-chat-body custom-scrollbar">
                    <div className="chat-date-separator"><span>TODAY</span></div>
                    {fbMessages.map(msg => (
                      <div key={msg.id} className={`fb-msg-bubble fb-msg-${msg.type} ${msg.isFile ? 'fb-msg-file' : ''}`}>
                        <div className="fb-msg-text">
                          {msg.isImage ? (
                            <img src={msg.fileUrl} alt={msg.text} className="chat-media-preview" onClick={() => window.open(msg.fileUrl)} />
                          ) : msg.isVideo ? (
                            <video src={msg.fileUrl} className="chat-media-preview" controls />
                          ) : msg.isFile ? (
                            <a href={msg.fileUrl} target="_blank" rel="noreferrer" className="chat-file-link">
                              <FileText size={16} />
                              <span>{msg.text}</span>
                            </a>
                          ) : (
                            msg.text
                          )}
                        </div>
                        <div className="fb-msg-time">{msg.time}</div>
                      </div>
                    ))}
                  </div>
                  <div className="fb-chat-footer">
                    <input type="file" ref={fbFileInputRef} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'fb')} />
                    <button className="fb-attach-btn" onClick={() => handleFileClick('fb')}>
                      <Plus size={20} />
                    </button>
                    <input 
                      type="text" 
                      placeholder="Aa" 
                      className="fb-chat-input" 
                      value={fbInput}
                      onChange={(e) => setFbInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage('fb')}
                    />
                    <button className="fb-send-btn" onClick={() => handleSendMessage('fb')}>
                      <Send size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </Draggable>
        )}
      </header>
    </>
  );
}