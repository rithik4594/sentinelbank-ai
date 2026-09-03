import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  ChevronDown, 
  Sparkles, 
  SlidersHorizontal, 
  Volume2, 
  VolumeX, 
  Eye, 
  Type, 
  Play, 
  Building2, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { useAuth, AppViewMode } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';

interface NavbarProps {
  onOpenSimulation: () => void;
  onOpenAccessibility: () => void;
  onOpenSendMoney: () => void;
  onOpenAIAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSimulation,
  onOpenAccessibility,
  onOpenSendMoney,
  onOpenAIAssistant
}) => {
  const { currentPersona, allPersonas, setPersonaById, viewMode, setViewMode } = useAuth();
  const { 
    fontSize, 
    cycleFontSize, 
    highContrast, 
    toggleHighContrast, 
    simpleLanguage, 
    toggleSimpleLanguage,
    voiceGuidance, 
    toggleVoiceGuidance,
    vulnerableMode,
    toggleVulnerableMode,
    isSpeaking
  } = useAccessibility();

  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm transition-colors">
      {/* Top Prototype & Vulnerable Safety Banner */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-flex items-center gap-1.5 bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded border border-blue-500/40 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Hackathon Prototype — No Real Transactions
          </span>
          <span className="hidden sm:inline text-slate-400">
            Intelligent Safety Layer for Vulnerable Banking Customers
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Voice Guidance Live Indicator */}
          <button
            onClick={toggleVoiceGuidance}
            title="Toggle Voice Guidance"
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] transition-colors ${
              voiceGuidance 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {voiceGuidance ? (
              <>
                <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'text-emerald-400 animate-pulse' : ''}`} />
                <span>Voice Guide ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Voice Guide OFF</span>
              </>
            )}
          </button>

          {/* Vulnerable Mode Toggle */}
          <button
            onClick={toggleVulnerableMode}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
              vulnerableMode 
                ? 'bg-amber-500 text-slate-950 shadow-sm' 
                : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
            }`}
            title="Simplified screen and voice support for senior citizens"
          >
            <span>👵 Senior/Accessible UI: {vulnerableMode ? 'ACTIVE' : 'STANDARD'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  Sentinel<span className="text-blue-600">Bank</span>
                </span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  AI Guard
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Zero-Loss Proactive Fraud Protection
              </p>
            </div>
          </div>

          {/* Center: Presentation Simulation Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSimulation}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>⚡ Run Fraud Simulation</span>
            </button>

            <button
              onClick={onOpenAIAssistant}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold text-xs sm:text-sm border border-indigo-200 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Ask Sentinel AI</span>
            </button>
          </div>

          {/* Right: View Switcher & Persona Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Toggle: Customer vs Bank Security Officer */}
            <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center">
              <button
                onClick={() => setViewMode('customer')}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  viewMode === 'customer'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Customer Portal
              </button>
              <button
                onClick={() => setViewMode('admin')}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'admin'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Bank Admin</span>
              </button>
            </div>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPersonaDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-colors text-left"
              >
                <img
                  src={currentPersona.avatar}
                  alt={currentPersona.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <div className="hidden lg:block">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {currentPersona.name}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <span>{currentPersona.role}</span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {personaDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setPersonaDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold uppercase text-slate-400">
                    Switch Demo Persona
                  </div>
                  {allPersonas.map(persona => {
                    const isSelected = persona.id === currentPersona.id;
                    return (
                      <button
                        key={persona.id}
                        onClick={() => {
                          setPersonaById(persona.id);
                          setPersonaDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2.5 flex items-start gap-3 text-left transition-colors hover:bg-slate-50 ${
                          isSelected ? 'bg-blue-50/70 border-l-4 border-blue-600' : ''
                        }`}
                      >
                        <img
                          src={persona.avatar}
                          alt={persona.name}
                          className="w-8 h-8 rounded-full object-cover mt-0.5 border"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {persona.name}
                            </span>
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                              {persona.experienceLevel}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {persona.role} • {persona.age} yrs
                          </div>
                          <div className="text-[10px] text-blue-600 mt-0.5 font-medium">
                            Avg: ₹{persona.averageTransactionAmount.toLocaleString('en-IN')} / tx
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accessibility Settings Trigger */}
            <button
              onClick={onOpenAccessibility}
              title="Accessibility & Senior Settings"
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
