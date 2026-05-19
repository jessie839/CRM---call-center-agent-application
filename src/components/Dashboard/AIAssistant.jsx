import React from 'react';

export default function AIAssistant() {
  return (
    <div className="ai-assistant-bar">
      <div className="ai-sparkle">✨</div>
      <div className="ai-prompt">AI Copilot is monitoring your active call queue. Ready to assist.</div>
      <div className="ai-actions">
        <button className="ai-badge">Generate Context Summary</button>
        <button className="ai-badge">Next Best Action</button>
      </div>
    </div>
  );
}
