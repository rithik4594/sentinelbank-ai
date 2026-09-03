import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Smartphone, 
  Sparkles, 
  ExternalLink, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBankData } from '../../context/BankDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { AccountSummaryCard } from './AccountSummaryCard';
import { SafetyScoreGauge } from './SafetyScoreGauge';
import { QuickActions } from './QuickActions';
import { ActiveAlertsBanner } from './ActiveAlertsBanner';
import { RecentTransactionsList } from './RecentTransactionsList';

interface CustomerDashboardProps {
  onSendMoney: () => void;
  onOpenGPay: () => void;
  onAddBeneficiary: () => void;
  onPayBills: () => void;
  onOpenSecurityCenter: () => void;
  onOpenAIAssistant: () => void;
  onOpenTrustedContacts: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  onSendMoney,
  onOpenGPay,
  onAddBeneficiary,
  onPayBills,
  onOpenSecurityCenter,
  onOpenAIAssistant,
  onOpenTrustedContacts
}) => {
  const { currentPersona } = useAuth();
  const { simpleLanguage } = useAccessibility();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in">
      {/* Active Alerts Banner */}
      <ActiveAlertsBanner />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Account Balance Card */}
          <AccountSummaryCard
            onSendMoney={onSendMoney}
            onAddBeneficiary={onAddBeneficiary}
          />

          {/* Quick Actions Grid */}
          <QuickActions
            onSendMoney={onSendMoney}
            onOpenGPay={onOpenGPay}
            onAddBeneficiary={onAddBeneficiary}
            onPayBills={onPayBills}
            onOpenSecurityCenter={onOpenSecurityCenter}
            onOpenAIAssistant={onOpenAIAssistant}
            onOpenTrustedContacts={onOpenTrustedContacts}
          />

          {/* Recent Transactions List with Risk Badges & Audit */}
          <RecentTransactionsList />
        </div>

        {/* Right 4 Cols: Security Health & Guardian Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Account Safety Score Ring Meter */}
          <SafetyScoreGauge />

          {/* Trusted Family Guardians Mini Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                  {simpleLanguage ? 'Family Safety Circle' : 'Designated Trusted Contacts'}
                </h3>
              </div>
              <button
                onClick={onOpenTrustedContacts}
                className="text-[11px] font-semibold text-blue-600 hover:underline"
              >
                Manage
              </button>
            </div>

            <div className="mt-3 space-y-3">
              {currentPersona.trustedContacts.slice(0, 2).map(contact => (
                <div
                  key={contact.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">{contact.name}</span>
                    <span className="text-[11px] text-slate-500">{contact.relationship}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Active</span>
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              High-risk or unfamiliar payments can be verified by your family contact before money leaves your account.
            </p>
          </div>

          {/* AI Guardian Proactive Tip */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-5 text-white border border-indigo-800/60 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Sentinel AI Guardian Advisory
              </span>
            </div>
            <h4 className="font-bold text-sm text-white">
              Beware of Fake Police Video Calls
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Scammers often pretend to be CBI, Police, or Customs and threaten "Digital Arrest." Real law enforcement never asks for money transfers or escrow deposits.
            </p>
            <button
              onClick={onOpenAIAssistant}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
            >
              <span>Learn Scam Signs with AI</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
