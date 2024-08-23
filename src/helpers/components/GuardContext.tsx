import React, { createContext, useContext, useRef, useState } from 'react';

interface GuardContextProps {
  guardRef: React.RefObject<any>;
  guardColliderRef: React.RefObject<any>;
  animation: string;
  setAnimation: React.Dispatch<React.SetStateAction<string>>;
  guard: React.RefObject<any>;
  punches: number;
  setPunches: React.Dispatch<React.SetStateAction<number>>;
}

const GuardContext = createContext<GuardContextProps | undefined>(undefined);

export const GuardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const guardRef = useRef(null);
  const guard = useRef(null);
  const guardColliderRef = useRef(null);
  const [animation, setAnimation] = useState("idle");
  const [punches, setPunches] = useState(0);

  return (
    <GuardContext.Provider value={{ guardRef, guard, guardColliderRef, animation, setAnimation, punches, setPunches }}>
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
