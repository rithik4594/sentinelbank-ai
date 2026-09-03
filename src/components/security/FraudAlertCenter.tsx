import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Smartphone, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Lock, 
  Clock, 
  Trash2, 
  ChevronRight,
  Info,
  CheckCircle2,
  XCircle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBankData } from '../../context/BankDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const FraudAlertCenter: React.FC<{ onBackToDashboard: () => void }> = ({ onBackToDashboard }) => {
  const { currentPersona } = useAuth();
  const { beneficiaries, transactions, adminMetrics } = useBankData();
  const { simpleLanguage } = useAccessibility();

  // Simulated Devices list
  const [devices, setDevices] = useState([
    { id: 'dev-1', name: currentPersona.normalDevice, isCurrent: true, ip: '103.21.24.88 (Pune, MH)', status: 'TRUSTED' },
    { id: 'dev-2', name: 'Chrome on Windows 11 (Home PC)', isCurrent: false, ip: '103.21.24.91 (Pune, MH)', status: 'TRUSTED' },
    { id: 'dev-3', name: 'Unknown Linux Device (Suspicious attempt)', isCurrent: false, ip: '45.12.89.12 (Remote/VPN)', status: 'FLAGGED' }
  ]);

  const handleRevokeDevice = (id: string) => {
    setDevices(prev => prev.filter(d => d.id !== id));
    alert('Device access revoked. Session tokens cleared immediately.');
  };

  const preventedCount = transactions.filter(t => t.status === 'PREVENTED').length;
  const completedCount = transactions.filter(t => t.status === 'COMPLETED').length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Security Status: PROTECTED</span>
              </span>
              <span className="text-xs text-slate-400">Sentinel AI Shield v2.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Fraud Alert & Security Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Proactive multi-layered defense protecting {currentPersona.name} against financial coercion, social engineering, and unauthorized devices.
            </p>
          </div>

          <button
            onClick={onBackToDashboard}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
          >
            ← Back to Banking Dashboard
          </button>
        </div>

        {/* Live Counters */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 block">Suspicious Flagged</span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">
              {preventedCount + 2}
            </span>
            <span className="text-[10px] text-slate-400">Real-time alerts</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 block">Money Protected</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">
              {preventedCount > 0 ? `₹${(preventedCount * 80000).toLocaleString('en-IN')}` : '₹80,000'}
            </span>
            <span className="text-[10px] text-slate-400">Zero funds lost</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 block">Transactions Prevented</span>
            <span className="text-2xl font-black text-rose-400 mt-1 block">
              {Math.max(1, preventedCount)}
            </span>
            <span className="text-[10px] text-slate-400">Halted before debit</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 block">Verified Contacts</span>
            <span className="text-2xl font-black text-blue-400 mt-1 block">
              {currentPersona.trustedContacts.length}
            </span>
            <span className="text-[10px] text-slate-400">Guardians linked</span>
          </div>
        </div>
      </div>

      {/* Grid: Devices & Beneficiary Cooldowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Health */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>Recognized Devices</span>
            </h2>
            <span className="text-xs text-slate-500">{devices.length} Devices Active</span>
          </div>

          <div className="mt-4 space-y-3">
            {devices.map(dev => (
              <div
                key={dev.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    dev.status === 'FLAGGED' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{dev.name}</span>
                      {dev.isCurrent && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                          Current Device
                        </span>
                      )}
                      {dev.status === 'FLAGGED' && (
                        <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded">
                          Unrecognized
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500">{dev.ip}</span>
                  </div>
                </div>

                {!dev.isCurrent && (
                  <button
                    onClick={() => handleRevokeDevice(dev.id)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Revoke device access"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Beneficiaries with Safety Cooldown */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Beneficiary Cooldown Status</span>
            </h2>
            <span className="text-xs text-slate-500">24h Protection Window</span>
          </div>

          <div className="mt-4 space-y-3">
            {beneficiaries.slice(0, 4).map(ben => (
              <div
                key={ben.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{ben.name}</span>
                  <span className="text-[11px] text-slate-500">
                    {ben.bankName} • {ben.category}
                  </span>
                </div>
                {ben.isNew ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                    <Clock className="w-3 h-3 text-amber-700" />
                    <span>Cooldown: 23h 45m left</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified Payee</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Recommendations */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Proactive Safety Recommendations for {currentPersona.name}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1.5">
            <h4 className="font-bold text-blue-950 flex items-center gap-1.5">
              <span>🚨 Never obey "Digital Arrest" calls</span>
            </h4>
            <p className="text-blue-900 leading-relaxed text-[11px]">
              Police or CBI never demand video call interrogations or money transfers to "government clearance accounts." Hang up immediately and dial 1930.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 space-y-1.5">
            <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
              <span>📱 Never install AnyDesk / QuickSupport</span>
            </h4>
            <p className="text-amber-900 leading-relaxed text-[11px]">
              Never download screen sharing tools on the advice of an unknown caller. It allows scammers to view your banking screen and capture PINs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
            <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
              <span>👵 Always consult your Trusted Contact</span>
            </h4>
            <p className="text-emerald-900 leading-relaxed text-[11px]">
              If any caller tells you: "Keep this secret from your family," it is guaranteed to be a scam. Always verify with your son {currentPersona.trustedContacts[0]?.name}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
