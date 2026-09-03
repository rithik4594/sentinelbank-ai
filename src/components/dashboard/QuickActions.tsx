import React from 'react';
import { 
  ArrowUpRight, 
  UserPlus, 
  Receipt, 
  ShieldAlert, 
  Sparkles, 
  Users, 
  QrCode,
  Smartphone
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface QuickActionsProps {
  onSendMoney: () => void;
  onOpenGPay: () => void;
  onAddBeneficiary: () => void;
  onPayBills: () => void;
  onOpenSecurityCenter: () => void;
  onOpenAIAssistant: () => void;
  onOpenTrustedContacts: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onSendMoney,
  onOpenGPay,
  onAddBeneficiary,
  onPayBills,
  onOpenSecurityCenter,
  onOpenAIAssistant,
  onOpenTrustedContacts
}) => {
  const { simpleLanguage } = useAccessibility();

  const actions = [
    {
      id: 'send',
      label: simpleLanguage ? 'Send Money' : 'Transfer Funds',
      icon: ArrowUpRight,
      color: 'bg-blue-600 text-white hover:bg-blue-500',
      badge: 'Protected',
      onClick: onSendMoney
    },
    {
      id: 'gpay',
      label: simpleLanguage ? 'Google Pay / QR' : 'GPay / UPI Scan',
      icon: QrCode,
      color: 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white hover:from-blue-600 hover:to-indigo-600 shadow-sm',
      badge: 'Pre-PIN Hook',
      onClick: onOpenGPay
    },
    {
      id: 'add-ben',
      label: simpleLanguage ? 'Add Contact' : 'Add Beneficiary',
      icon: UserPlus,
      color: 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50',
      onClick: onAddBeneficiary
    },
    {
      id: 'bills',
      label: simpleLanguage ? 'Pay Utility Bills' : 'Pay Bills (BBPS)',
      icon: Receipt,
      color: 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50',
      onClick: onPayBills
    },
    {
      id: 'ai-guard',
      label: simpleLanguage ? 'Ask Safety AI' : 'Sentinel AI Assistant',
      icon: Sparkles,
      color: 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100',
      badge: 'Scam Help',
      onClick: onOpenAIAssistant
    },
    {
      id: 'trusted',
      label: simpleLanguage ? 'Family Contacts' : 'Trusted Contacts',
      icon: Users,
      color: 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50',
      onClick: onOpenTrustedContacts
    },
    {
      id: 'security-center',
      label: simpleLanguage ? 'Security Center' : 'Fraud Alert Center',
      icon: ShieldAlert,
      color: 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50',
      onClick: onOpenSecurityCenter
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h2 className="text-sm font-bold text-slate-900">
          {simpleLanguage ? 'What would you like to do?' : 'Quick Banking Actions'}
        </h2>
        <span className="text-xs text-slate-400">All actions monitored by AI</span>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map(action => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`p-3.5 rounded-xl flex flex-col items-center justify-center text-center relative transition-all group hover:shadow-sm ${action.color}`}
            >
              {action.badge && (
                <span className="absolute -top-1.5 -right-1 bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow-sm">
                  {action.badge}
                </span>
              )}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold leading-tight">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
