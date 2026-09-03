import React from 'react';
import { ShieldCheck, Lock, Users, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const SafetyScoreGauge: React.FC = () => {
  const { currentPersona } = useAuth();
  const { simpleLanguage } = useAccessibility();

  const score = currentPersona.securityScore || 94;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{simpleLanguage ? 'Your Safety Score' : 'Transaction Safety Score'}</span>
          </h2>
          <p className="text-xs text-slate-500">
            {simpleLanguage ? 'How safe your account is from fraud' : 'Real-time proactive account health'}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          PROTECTED
        </span>
      </div>

      {/* Score Visual Meter */}
      <div className="mt-5 flex items-center gap-6">
        <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
          {/* SVG Circular Meter */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-500"
              strokeDasharray={`${score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-2xl font-black text-slate-900 tracking-tight">{score}</span>
            <span className="block text-[10px] font-semibold text-slate-400 -mt-1">/ 100</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {simpleLanguage ? 'Safety Protections On' : 'Active Safeguards'}
          </h3>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Registered Device Authentication</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{simpleLanguage ? 'Family emergency contact ready' : 'Trusted Contact Escalation Ready'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{simpleLanguage ? 'Checks for trick phone calls' : 'Digital Arrest & Scam Pattern Detection'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Safety Advisory Footer */}
      <div className="mt-5 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
        <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="leading-snug">
          {simpleLanguage
            ? 'We will always ask you to pause before sending money to anyone new or if the amount is unusually large.'
            : 'Proactive intervention will halt transfers deviating from your baseline spending habits to prevent unrecoverable losses.'}
        </p>
      </div>
    </div>
  );
};
