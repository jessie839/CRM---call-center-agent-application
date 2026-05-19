// import DooctiLogo from './DooctiLogo';

import DooctiLogo from '../assets/Doocti-logo-white.svg';

export default function GradientPanel({ activeField }) {
  let titleText = "Get access your personal hub for clarity and productivity";

  if (activeField === 'campaign') {
    titleText = "Focus on what moves the needle";
  } else if (activeField === 'extension') {
    titleText = "Stay connected, always reachable";
  } else if (activeField === 'team') {
    titleText = "Build with the right people";
  } else if (activeField === 'queue') {
    titleText = "Take control of your workflow";
  }

  return (
    <div className="gradient-panel">
      <div className="gradient-bg"></div>
      <div className="panel-content">
        <div className="logo">
          {/* <DooctiLogo className="asterisk-logo" color="#fff" /> */}
          <img src={DooctiLogo} alt="Doocti Logo" className="asterisk-logo" color='#fff' />
        </div>
        <div className="panel-text" key={titleText} style={{ animation: 'fadeIn 0.5s ease-out' }}>
          <p className="subtitle">You can easily</p>
          <h1 className="text">{titleText}</h1>
        </div>
      </div>
    </div>
  );
}