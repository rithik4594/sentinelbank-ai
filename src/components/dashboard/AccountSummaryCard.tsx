import React from 'react';
import { Wallet, ArrowUpRight, ShieldCheck, Smartphone, MapPin, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBankData } from '../../context/BankDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';

interface AccountSummaryCardProps {
  onSendMoney: () => void;
  onAddBeneficiary: () => void;
}

export const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  onSendMoney,
  onAddBeneficiary
}) => {
  const { currentPersona } = useAuth();
  const { balance } = useBankData();
  const { simpleLanguage } = useAccessibility();

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl text-white p-6 shadow-xl border border-slate-800 relative overflow-hidden">
      {/* Decorative subtle background aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Customer Profile Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <img
              src={currentPersona.avatar}
              alt={currentPersona.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-blue-400/40 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  {currentPersona.name}
                </h1>
                <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  {currentPersona.role}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {currentPersona.city}
                </span>
                <span>•</span>
                <span className="text-slate-300">
                  {simpleLanguage ? 'Digital experience:' : 'Tech profile:'} {currentPersona.experienceLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AI Shield Protected</span>
            </span>
          </div>
        </div>

        {/* Balance & Actions Section */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Balance */}
          <div className="lg:col-span-7">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-blue-400" />
              {simpleLanguage ? 'Money in your bank account' : 'Available Account Balance'}
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-slate-400 font-medium">INR</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
              <div>
                <span className="text-slate-500">{simpleLanguage ? 'Account:' : 'Acc No:'}</span>{' '}
                <span className="font-mono text-slate-200">{currentPersona.accountNumber}</span>
              </div>
              <div>
                <span className="text-slate-500">IFSC:</span>{' '}
                <span className="font-mono text-slate-200">{currentPersona.ifsc}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Smartphone className="w-3 h-3 text-slate-500" />
                <span>{currentPersona.normalDevice.split('(')[0]}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Buttons */}
          <div className="lg:col-span-5 flex flex-wrap sm:flex-nowrap items-center gap-3 justify-start lg:justify-end">
            <button
              onClick={onSendMoney}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>{simpleLanguage ? 'Send Money' : 'Transfer Money'}</span>
            </button>
            <button
              onClick={onAddBeneficiary}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
            >
              <span>{simpleLanguage ? '+ Add Contact' : '+ Add Beneficiary'}</span>
            </button>
          </div>
        </div>

        {/* Normal Pattern Summary Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Typical Transfer Range:</span>
            <span className="font-semibold text-slate-200">
              ₹{currentPersona.typicalMinAmount.toLocaleString('en-IN')} – ₹{currentPersona.typicalMaxAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Historical Average:</span>
            <span className="font-semibold text-slate-200">
              ₹{currentPersona.averageTransactionAmount.toLocaleString('en-IN')} / transfer
            </span>
          </div>
          <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Primary Trusted Contact:</span>
            <span className="font-semibold text-emerald-300">
              {currentPersona.trustedContacts[0]?.name} ({currentPersona.trustedContacts[0]?.relationship.split('(')[0]})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
