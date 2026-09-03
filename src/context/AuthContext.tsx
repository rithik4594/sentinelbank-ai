import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerPersona } from '../types/banking';
import { DEMO_PERSONAS } from '../data/demoPersonas';

export type AppViewMode = 'customer' | 'admin';

interface AuthContextType {
  currentPersona: CustomerPersona;
  allPersonas: CustomerPersona[];
  setPersonaById: (id: string) => void;
  viewMode: AppViewMode;
  setViewMode: (mode: AppViewMode) => void;
  toggleViewMode: () => void;
  isLoggedIn: boolean;
  logout: () => void;
  loginAs: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPersona, setCurrentPersona] = useState<CustomerPersona>(DEMO_PERSONAS[0]); // Default to Meena Sharma (Senior)
  const [viewMode, setViewMode] = useState<AppViewMode>('customer');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const setPersonaById = (id: string) => {
    const found = DEMO_PERSONAS.find(p => p.id === id);
    if (found) {
      setCurrentPersona(found);
    }
  };

  const loginAs = (id: string) => {
    setPersonaById(id);
    setIsLoggedIn(true);
    setViewMode('customer');
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const toggleViewMode = () => {
    setViewMode(prev => (prev === 'customer' ? 'admin' : 'customer'));
  };

  return (
    <AuthContext.Provider
      value={{
        currentPersona,
        allPersonas: DEMO_PERSONAS,
        setPersonaById,
        viewMode,
        setViewMode,
        toggleViewMode,
        isLoggedIn,
        logout,
        loginAs
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
