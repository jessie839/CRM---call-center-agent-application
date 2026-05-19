import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BackgroundDoodles from './components/BackgroundDoodles';
import GradientPanel from './components/GradientPanel';
import CreateAccountPage from './pages/CreateAccountPage';
import ConfigureWorkspacePage from './pages/ConfigureWorkspacePage';
import DashboardPage from './pages/DashboardPage';
import AgentProfile from './pages/AgentProfile';
import LeadsPage from './pages/LeadsPage';
import MeetingsPage from './pages/MeetingsPage';
import TeampeeringPage from './pages/TeampeeringPage';
import RecommendedActionsPage from './pages/RecommendedActionsPage';
import Alltasks from './pages/Alltasks';
import LatestActivityPage from './pages/LatestActivityPage';
import Callpage from './pages/Callpage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import AIAnalyticsTab from './pages/Analyticspage';
import { Toaster } from "react-hot-toast";
import { CallStateProvider } from './context/callstate.context'
import { AutoDialProvider } from './context/autodial.context'

import './index.css';
import './App.css';

function App() {
  const [isSwitched, setIsSwitched] = useState(false);
  const [activeField, setActiveField] = useState('default');

  // Preserve existing Dashboard / Login UI behavior as fallback
  const mainContent = <>
    <BackgroundDoodles />
    <div className={`card-container ${isSwitched ? 'switched' : ''}`} id="main-card">
      <div className="overlay-container">
        <GradientPanel activeField={activeField} />
      </div>
      <div className="cred-section">
        <CreateAccountPage onLoginSuccess={() => setIsSwitched(true)} />
        <ConfigureWorkspacePage
          onFieldFocus={setActiveField}
          onGoBack={() => setIsSwitched(false)}
        />
      </div>
    </div>
  </>;

  return (
    <CallStateProvider>
      <AutoDialProvider>
         <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/profile" element={<AgentProfile />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/contacts" element={<Callpage />} />
          {/* <Route path="/call-log" element={<Callpage />} /> */}
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/teampeering" element={<TeampeeringPage />} />
          <Route path="/all-recommends" element={<RecommendedActionsPage />} />
          <Route path="/all-tasks" element={<Alltasks />} />
          <Route path="/activity" element={<LatestActivityPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/configure-workspace" element={<ConfigureWorkspacePage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/call-log" element={<AIAnalyticsTab />} />
          <Route path="*" element={mainContent} />
        </Routes>
      </AutoDialProvider>
    </CallStateProvider>
  );
}

export default App;
