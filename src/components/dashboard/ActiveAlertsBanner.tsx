import React from 'react';
import { AlertTriangle, AlertCircle, Info, X, Volume2, ShieldAlert } from 'lucide-react';
import { useBankData } from '../../context/BankDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ActiveAlertsBanner: React.FC = () => {
  const { alerts, dismissAlert } = useBankData();
  const { speakText, voiceGuidance } = useAccessibility();

  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map(alert => {
        const isDanger = alert.severity === 'danger';
        const isWarning = alert.severity === 'warning';

        return (
          <div
            key={alert.id}
            className={`p-4 rounded-xl border flex items-start justify-between gap-3 shadow-sm transition-all ${
              isDanger
                ? 'bg-rose-50/90 border-rose-200 text-rose-950'
                : isWarning
                ? 'bg-amber-50/90 border-amber-200 text-amber-950'
                : 'bg-blue-50/90 border-blue-200 text-blue-950'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                {isDanger ? (
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                ) : isWarning ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                ) : (
                  <Info className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <span>{alert.title}</span>
                  {isDanger && (
                    <span className="bg-rose-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase">
                      Action Protected
                    </span>
                  )}
                </h4>
                <p className="text-xs mt-1 leading-relaxed">{alert.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => speakText(`${alert.title}. ${alert.description}`, true)}
                title="Listen to this alert aloud"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white/60 transition-colors"
                aria-label="Read alert aloud"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => dismissAlert(alert.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/60 transition-colors"
                aria-label="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
