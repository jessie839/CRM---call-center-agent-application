import React, { createContext, useState, useContext } from 'react';

const CallStateContext = createContext();

export const CallStateProvider = ({ children }) => {
  const [callState, setCallState] = useState({
    isActive: false,
    leadName: '',
    phone: '',
    duration: 0,
    isIncoming: false,
    incomingMinimized: false,
    incomingData: null
  });

  return (
    <CallStateContext.Provider value={{ callState, setCallState }}>
      {children}
    </CallStateContext.Provider>
  );
};

export const useCallState = () => {
  const context = useContext(CallStateContext);
  if (context === undefined) {
    throw new Error('useCallState must be used within a CallStateProvider');
  }
  return context;
};
