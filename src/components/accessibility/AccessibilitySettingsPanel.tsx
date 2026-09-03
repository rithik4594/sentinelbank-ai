import React from 'react';
import { 
  X, 
  Type, 
  Eye, 
  Volume2, 
  FileText, 
  Sparkles, 
  Check, 
  HelpCircle,
  Accessibility
} from 'lucide-react';
import { useAccessibility, FontSizeLevel } from '../../context/AccessibilityContext';

interface AccessibilitySettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilitySettingsPanel: React.FC<AccessibilitySettingsPanelProps> = ({
  isOpen,
  onClose
}) => {
  const {
    fontSize,
    setFontSize,
    highContrast,
    toggleHighContrast,
    simpleLanguage,
    toggleSimpleLanguage,
    voiceGuidance,
    toggleVoiceGuidance,
    vulnerableMode,
    toggleVulnerableMode,
    speakText,
    isSpeaking
  } = useAccessibility();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-title"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600/30 border border-blue-400/30 text-blue-300">
              <Accessibility className="w-5 h-5" />
            </div>
            <div>
              <h2 id="accessibility-title" className="font-bold text-base">
                Accessibility & Senior Controls
              </h2>
              <p className="text-xs text-slate-300">
                Personalize text, contrast, and voice assistance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick Preset: Senior / Vulnerable Mode */}
          <div className={`p-4 rounded-xl border transition-all ${
            vulnerableMode 
              ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-sm' 
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-bold text-sm flex items-center gap-2">
                  <span>👵 Senior & First-Time User Preset</span>
                  {vulnerableMode && (
                    <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-1.5 py-0.5 rounded uppercase">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Enables large typography, plain language, and vocal safety alerts automatically.
                </p>
              </div>
              <button
                onClick={toggleVulnerableMode}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  vulnerableMode
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {vulnerableMode ? 'Turn Off' : 'Activate'}
              </button>
            </div>
          </div>

          {/* 1. Font Size Adjustment */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-slate-500" />
              <span>Text Size</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'extra-large'] as FontSizeLevel[]).map(size => {
                const isSelected = fontSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`py-2 px-3 rounded-lg border text-center font-medium transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="capitalize text-xs">
                      {size === 'normal' ? 'Normal' : size === 'large' ? 'Large (A+)' : 'Extra Large (A++)'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. High Contrast Mode */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">High Contrast Mode</div>
                <div className="text-xs text-slate-500">Increases legibility of borders and buttons</div>
              </div>
            </div>
            <button
              onClick={toggleHighContrast}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                highContrast ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  highContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 3. Simple Plain Language Mode */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Simple Language Mode</div>
                <div className="text-xs text-slate-500">Replaces banking jargon with simple everyday terms</div>
              </div>
            </div>
            <button
              onClick={toggleSimpleLanguage}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                simpleLanguage ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  simpleLanguage ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 4. Voice Guidance (Web Speech API) */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${voiceGuidance ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span>Voice Guidance</span>
                  {voiceGuidance && (
                    <button
                      onClick={() => speakText('Sentinel Bank AI is active. Your account is protected against fraud.', true)}
                      className="text-[11px] text-emerald-700 underline font-medium hover:text-emerald-800"
                    >
                      (Test Audio)
                    </button>
                  )}
                </div>
                <div className="text-xs text-slate-500">Reads safety alerts and warnings aloud</div>
              </div>
            </div>
            <button
              onClick={toggleVoiceGuidance}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                voiceGuidance ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  voiceGuidance ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
