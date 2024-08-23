import React, { createContext, useContext, useRef, useState } from 'react';
import * as THREE from 'three';

interface CharacterContextProps {
  characterRef: React.RefObject<any>;
  characterColliderRef: React.RefObject<any>;
  characterAnimation: string;
  setCharacterAnimation: React.Dispatch<React.SetStateAction<string>>;
  container: React.RefObject<THREE.Group>;
  nick: React.RefObject<any>;
}

const CharacterContext = createContext<CharacterContextProps | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const characterRef = useRef<any>(null);
  const characterColliderRef = useRef<any>(null);
  const [characterAnimation, setCharacterAnimation] = useState("idle");
  const container = useRef<THREE.Group>(null);
  const nick = useRef<any>(null);

  return (
    <CharacterContext.Provider value={{ characterRef, characterAnimation, setCharacterAnimation, characterColliderRef, container, nick }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    console.error('useCharacterContext must be used within a CharacterProvider');
    throw new Error('useCharacterContext must be used within a CharacterProvider');
  }
  return context;
};
