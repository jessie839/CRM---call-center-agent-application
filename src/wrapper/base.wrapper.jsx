import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from "../components/Dashboard/Sidebar";
import TopHeader from "../components/Dashboard/TopHeader";
import FloatingChatbot from "../components/Dashboard/FloatingChatbot";
import FloatingCallWidget from "../components/AutoDial/FloatingCallWidget";
import DispositionModal from "../components/AutoDial/DispositionModal";
import CountdownTimerWidget from "../components/AutoDial/CountdownTimerWidget";
import IncomingCallPopup from "../components/Dashboard/IncomingCallPopup";
import "../styles/base.wrapper.css";
import { useCallState } from "../context/callstate.context";
import { useAutoDial } from "../context/autodial.context";


export const BaseWrapper = ({
    children,
    tabProps = {
        activeTab: 'Overview',
        setActiveTab: () => { },
        tabs: [],
        headerText: '',
    }
}) => {
    const { callState } = useCallState();
    const { adState, currentAdLead, nextAdLead, isPaused, togglePause, saveDisposition, timerComplete, cancelAutoDial, endCall } = useAutoDial();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const isCallLogPage = location.pathname === '/call-log';
    const showFloatingWidgets = !isCallLogPage;

    return (
        <div className={`base-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            {/* Mobile Backdrop Overlay - closes sidebar on click */}
            <div className="mobile-sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
                {...tabProps}
            />
            <div className="main-wrapper">
                <TopHeader 
                    {...tabProps} 
                    onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                    isSidebarOpen={isSidebarOpen}
                />
                {children}
            </div>

            {/* Global Auto Dial & Call Widgets */}
            {showFloatingWidgets && callState.isActive && (
                <FloatingCallWidget
                    lead={currentAdLead || { firstName: callState.leadName, lastName: '', phone: callState.phone }}
                    callStatus={adState === 'CALLING' ? 'CALLING' : 'CONNECTED'}
                    isPaused={isPaused}
                    onTogglePause={togglePause}
                    onEndCall={endCall}
                />
            )}

            {showFloatingWidgets && adState === 'DISPOSITION' && currentAdLead && (
                <DispositionModal
                    lead={currentAdLead}
                    onSave={saveDisposition}
                />
            )}

            {showFloatingWidgets && adState === 'TIMER' && nextAdLead && (
                <CountdownTimerWidget
                    lead={nextAdLead}
                    seconds={5}
                    isPaused={isPaused}
                    onTimerComplete={timerComplete}
                    onCancel={cancelAutoDial}
                />
            )}

            <IncomingCallPopup />
            <FloatingChatbot />
        </div>
    )
}
