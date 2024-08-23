import React, { createContext, useContext, useRef, useState } from 'react';

interface GuardContextProps {
  guardRef: React.RefObject<any>;
  guardColliderRef: React.RefObject<any>;
  animation: string;
  setAnimation: React.Dispatch<React.SetStateAction<string>>;
}

const GuardContext = createContext<GuardContextProps | undefined>(undefined);

export const GuardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const guardRef = useRef(null);
  const guardColliderRef = useRef(null);
  const [animation, setAnimation] = useState("idle");

  return (
    <GuardContext.Provider value={{ guardRef, guardColliderRef, animation, setAnimation }}>
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
