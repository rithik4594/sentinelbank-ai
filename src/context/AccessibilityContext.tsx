import React, { createContext, useContext, useState, useEffect } from 'react';
import { speechService } from '../services/speechService';
import { useAuth } from './AuthContext';

export type FontSizeLevel = 'normal' | 'large' | 'extra-large';

interface AccessibilityContextType {
  fontSize: FontSizeLevel;
  setFontSize: (size: FontSizeLevel) => void;
  cycleFontSize: () => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  toggleHighContrast: () => void;
  simpleLanguage: boolean;
  setSimpleLanguage: (val: boolean) => void;
  toggleSimpleLanguage: () => void;
  voiceGuidance: boolean;
  setVoiceGuidance: (val: boolean) => void;
  toggleVoiceGuidance: () => void;
  vulnerableMode: boolean;
  toggleVulnerableMode: () => void;
  speakText: (text: string, force?: boolean) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentPersona } = useAuth();
  const [fontSize, setFontSize] = useState<FontSizeLevel>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [simpleLanguage, setSimpleLanguage] = useState<boolean>(false);
  const [voiceGuidance, setVoiceGuidance] = useState<boolean>(false);
  const [vulnerableMode, setVulnerableMode] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Auto-tune accessibility defaults when switching to senior citizen persona
  useEffect(() => {
    if (currentPersona.role === 'Senior Citizen') {
      setSimpleLanguage(true);
      setFontSize('large');
      setVulnerableMode(true);
    } else if (currentPersona.role === 'First-Time Digital Banking User') {
      setSimpleLanguage(true);
      setFontSize('normal');
    } else {
      setSimpleLanguage(false);
      setFontSize('normal');
      setVulnerableMode(false);
    }
  }, [currentPersona.id]);

  const cycleFontSize = () => {
    setFontSize(prev => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'extra-large';
      return 'normal';
    });
  };

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleSimpleLanguage = () => setSimpleLanguage(prev => !prev);
  const toggleVoiceGuidance = () => {
    setVoiceGuidance(prev => {
      const next = !prev;
      if (next) {
        speechService.speak('Voice guidance enabled. Sentinel Bank AI will read safety alerts aloud.');
      } else {
        speechService.stop();
      }
      return next;
    });
  };

  const toggleVulnerableMode = () => {
    setVulnerableMode(prev => {
      const next = !prev;
      if (next) {
        setFontSize('large');
        setSimpleLanguage(true);
        setVoiceGuidance(true);
        speechService.speak('Senior and Accessibility Mode activated. Simplified words and voice assistance are now on.');
      } else {
        setFontSize('normal');
        setSimpleLanguage(false);
        setVoiceGuidance(false);
        speechService.stop();
      }
      return next;
    });
  };

  const speakText = (text: string, force = false) => {
    if (voiceGuidance || force) {
      setIsSpeaking(true);
      speechService.speak(text, () => setIsSpeaking(false));
    }
  };

  const stopSpeaking = () => {
    speechService.stop();
    setIsSpeaking(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        cycleFontSize,
        highContrast,
        setHighContrast,
        toggleHighContrast,
        simpleLanguage,
        setSimpleLanguage,
        toggleSimpleLanguage,
        voiceGuidance,
        setVoiceGuidance,
        toggleVoiceGuidance,
        vulnerableMode,
        toggleVulnerableMode,
        speakText,
        stopSpeaking,
        isSpeaking
      }}
    >
      <div
        className={`min-h-screen transition-colors duration-200 ${
          highContrast ? 'high-contrast-mode bg-black text-white' : 'bg-slate-50 text-slate-900'
        } ${
          fontSize === 'extra-large' ? 'text-lg' : fontSize === 'large' ? 'text-base' : 'text-sm'
        }`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
