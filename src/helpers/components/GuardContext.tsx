import React, { createContext, useContext, useRef, useState } from 'react';

interface GuardContextProps {
  guardRef: React.RefObject<any>;
  guardColliderRef: React.RefObject<any>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const GuardContext = createContext<GuardContextProps | undefined>(undefined);

export const GuardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const guardRef = useRef(null);
  const guardColliderRef = useRef(null);
  const [isActive, setIsActive] = useState(true);

  return (
    <GuardContext.Provider value={{ guardRef, guardColliderRef, isActive, setIsActive }}>
      {children}
    </GuardContext.Provider>
  );
};

export const useGuardContext = () => {
  const context = useContext(GuardContext);
  if (context === undefined) {
    throw new Error('useGuardContext must be used within a GuardProvider');
  }
  return context;
};
