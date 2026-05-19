import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useCallState } from './callstate.context';

const AutoDialContext = createContext();

export const useAutoDial = () => useContext(AutoDialContext);

export const AutoDialProvider = ({ children }) => {
  const { callState, setCallState } = useCallState();
  const [adState, setAdState] = useState('IDLE'); // IDLE, CALLING, CONNECTED, DISPOSITION, TIMER
  const [queue, setQueue] = useState([]);
  const [adIndex, setAdIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentAdLead = queue[adIndex] || null;
  const nextAdLead = queue[adIndex + 1] || null;

  // Sync adState with global callState
  useEffect(() => {
    if (adState === 'CONNECTED' && !callState.isActive) {
      setAdState('DISPOSITION');
    }
    if (adState === 'CALLING' && callState.isActive) {
      setAdState('CONNECTED');
    }
  }, [callState.isActive, adState]);

  const startAutoDial = useCallback((leadIds, allLeads) => {
    const leadQueue = leadIds.map(id => allLeads.find(l => l.id === id)).filter(Boolean);
    if (leadQueue.length === 0) return;

    setQueue(leadQueue);
    setAdIndex(0);
    setAdState('CALLING');
    setIsPaused(false);

    setCallState({
      isActive: true,
      leadName: `${leadQueue[0].firstName} ${leadQueue[0].lastName}`,
      phone: leadQueue[0].phone || '',
      duration: 0
    });
  }, [setCallState]);

  const endCall = useCallback(() => {
    setCallState(prev => ({ ...prev, isActive: false }));
    setAdState('DISPOSITION');
  }, [setCallState]);

  const saveDisposition = useCallback(({ disposition, notes }) => {
    if (nextAdLead) {
      setAdState('TIMER');
    } else {
      setAdState('IDLE');
      setQueue([]);
      setAdIndex(0);
      setIsPaused(false);
    }
  }, [nextAdLead]);

  const timerComplete = useCallback(() => {
    const nextIdx = adIndex + 1;
    setAdIndex(nextIdx);
    const nextLead = queue[nextIdx];
    
    setAdState('CALLING');
    setCallState({
      isActive: true,
      leadName: `${nextLead.firstName} ${nextLead.lastName}`,
      phone: nextLead.phone || '',
      duration: 0
    });
  }, [adIndex, queue, setCallState]);

  const cancelAutoDial = useCallback(() => {
    setAdState('IDLE');
    setQueue([]);
    setAdIndex(0);
    setIsPaused(false);
    setCallState(prev => ({ ...prev, isActive: false }));
  }, [setCallState]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  return (
    <AutoDialContext.Provider value={{
      adState,
      currentAdLead,
      nextAdLead,
      isPaused,
      togglePause,
      startAutoDial,
      saveDisposition,
      timerComplete,
      cancelAutoDial,
      endCall
    }}>
      {children}
    </AutoDialContext.Provider>
  );
};
