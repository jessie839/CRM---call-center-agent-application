import { Bot, Cross, X } from 'lucide-react';
import React, { useState } from 'react';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I am your AI Assistant. How can I help you today?' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages([...messages, { role: 'user', text: inputText }]);
    setInputText('');

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'I am currently running in mock mode. Check out the latest Analytics tab for live volume trends!' }]);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>

      {/* Expanded Chat Interface */}
      {isOpen && (
        <div className="fade-in" style={{
          width: 360, height: 500, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)',
          borderRadius: 20, boxShadow: '0 12px 48px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.4)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>
          {/* Chat Header */}
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #312e81)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-inverse)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4z" /><rect x="4" y="8" width="16" height="12" rx="2" /><line x1="12" y1="12" x2="12" y2="16" /></svg>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>AI Co-pilot</div>
                <div style={{ fontSize: 11, color: 'var(--accent-light)' }}>Online</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-inverse)', cursor: 'pointer', padding: 4 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Chat Body */}
          <div style={{ flex: 1, padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%', padding: '12px 16px', borderRadius: 16, fontSize: 14, lineHeight: 1.5,
                  background: m.role === 'user' ? 'var(--accent)' : 'var(--surface2)',
                  color: m.role === 'user' ? '#fff' : 'var(--text-main)',
                  borderBottomRightRadius: m.role === 'user' ? 4 : 16,
                  borderBottomLeftRadius: m.role === 'ai' ? 4 : 16
                }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div style={{ padding: '16px', borderTop: '1px solid var(--surface2)', background: 'var(--surface)' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="Ask me anything..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{ flex: 1, padding: '12px 16px', borderRadius: 24, border: '1px solid var(--border)', outline: 'none', fontSize: 14, background: 'var(--surface2)' }}
              />
              <button type="submit" style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--accent)', border: 'none', color: 'var(--text-inverse)', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
          boxShadow: '0 8px 24px var(--accent-light)', color: 'var(--text-inverse)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          cursor: 'pointer', transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? (
          <X />) : (
          <Bot />)}
      </div>

    </div>
  );
}
