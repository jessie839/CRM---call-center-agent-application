import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import OverviewTab from '../components/Dashboard/Tabs/OverviewTab';
// import AppointmentsTab from '../components/Dashboard/Tabs/AppointmentsTab';
// import CallLogsTab from '../components/Dashboard/Tabs/CallLogsTab';

import { BaseWrapper } from '../wrapper/base.wrapper';

import '../styles/Dashboard.css';

export default function DashboardPage() {
  const location = useLocation();
  // Global Routing State
  // const [activeTab, setActiveTab] = useState('Analytics');
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'Overview');
  const [activeLead, setActiveLead] = useState(null); // Tracks lead routing object
  const tabs = ['Overview', 'Call Logs'];

  return (

    <BaseWrapper tabProps={{ activeTab, setActiveTab, headerText: "Dashboard" }}>
      {/* Tab Logic Router */}
      <OverviewTab />
    </BaseWrapper>


  );
}
