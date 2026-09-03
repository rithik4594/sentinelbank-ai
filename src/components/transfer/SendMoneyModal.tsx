import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowUpRight, 
  ShieldCheck, 
  ShieldAlert, 
  UserPlus, 
  Sliders, 
  Smartphone, 
  Clock, 
  Zap, 
  Info,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBankData } from '../../context/BankDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Beneficiary, PaymentMethod } from '../../types/banking';
import { SentinelRiskEngine } from '../../engine/riskEngine';
import { RiskEvaluationResult } from '../../types/risk';
import { LowRiskModal } from './LowRiskModal';
import { MediumRiskModal } from './MediumRiskModal';
import { HighRiskInterventionModal } from './HighRiskInterventionModal';

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAIAssistant: () => void;
  onOpenTrustedContactModal: (details: { recipientName: string; amount: number }) => void;
  initialPreset?: {
    beneficiaryName?: string;
    amount?: number;
    purpose?: string;
    isUnfamiliarDevice?: boolean;
    isUnusualTime?: boolean;
  };
}

export const SendMoneyModal: React.FC<SendMoneyModalProps> = ({
  isOpen,
  onClose,
  onOpenAIAssistant,
  onOpenTrustedContactModal,
  initialPreset
}) => {
  const { currentPersona } = useAuth();
  const { beneficiaries, balance, executeTransaction, preventTransaction } = useBankData();
  const { simpleLanguage } = useAccessibility();

  // Form State
  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState<string>('');
  const [isCustomBeneficiary, setIsCustomBeneficiary] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>('');
  const [customAccount, setCustomAccount] = useState<string>('');
  const [customIfsc, setCustomIfsc] = useState<string>('');
  const [amount, setAmount] = useState<string>('2500');
  const [purpose, setPurpose] = useState<string>('Family Support');
  const [method, setMethod] = useState<PaymentMethod>('UPI');
  const [note, setNote] = useState<string>('');

  // Simulation Overrides (For live hackathon demo tweaking)
  const [showSimControls, setShowSimControls] = useState<boolean>(false);
  const [isUnfamiliarDevice, setIsUnfamiliarDevice] = useState<boolean>(false);
  const [remoteAccessDetected, setRemoteAccessDetected] = useState<boolean>(false);
  const [isUnusualTime, setIsUnusualTime] = useState<boolean>(false);
  const [rapidTransactionCount, setRapidTransactionCount] = useState<number>(0);

  // Active Risk Assessment Modals
  const [evaluatedRisk, setEvaluatedRisk] = useState<RiskEvaluationResult | null>(null);
  const [activeModalStage, setActiveModalStage] = useState<'NONE' | 'LOW' | 'MEDIUM' | 'HIGH'>('NONE');
  const [pendingRecipientName, setPendingRecipientName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Set defaults when opening or when initialPreset changes
  useEffect(() => {
    if (isOpen) {
      if (initialPreset) {
        if (initialPreset.beneficiaryName) {
          const match = beneficiaries.find(b => b.name.toLowerCase().includes(initialPreset.beneficiaryName!.toLowerCase()));
          if (match) {
            setSelectedBeneficiaryId(match.id);
            setIsCustomBeneficiary(false);
          } else {
            setIsCustomBeneficiary(true);
            setCustomName(initialPreset.beneficiaryName);
            setCustomAccount('•••• •••• 6712');
            setCustomIfsc('SBIN0019482');
          }
        }
        if (initialPreset.amount) setAmount(initialPreset.amount.toString());
        if (initialPreset.purpose) setPurpose(initialPreset.purpose);
        if (initialPreset.isUnfamiliarDevice !== undefined) setIsUnfamiliarDevice(initialPreset.isUnfamiliarDevice);
        if (initialPreset.isUnusualTime !== undefined) setIsUnusualTime(initialPreset.isUnusualTime);
      } else {
        // Default to first known beneficiary
        if (beneficiaries.length > 0 && !selectedBeneficiaryId) {
          setSelectedBeneficiaryId(beneficiaries[0].id);
        }
      }
    }
  }, [isOpen, initialPreset, beneficiaries]);

  if (!isOpen) return null;

  // Load Hackathon Canonical Scam Scenario
  const handleLoadScamScenario = () => {
    // Find Ravi Kumar if exists, or select custom
    const ravi = beneficiaries.find(b => b.name.toLowerCase().includes('ravi'));
    if (ravi) {
      setSelectedBeneficiaryId(ravi.id);
      setIsCustomBeneficiary(false);
    } else {
      setIsCustomBeneficiary(true);
      setCustomName('Ravi Kumar');
      setCustomAccount('•••• •••• 6712');
      setCustomIfsc('SBIN0019482');
    }
    setAmount('80000');
    setPurpose('Police / Court Verification Clearance');
    setIsUnfamiliarDevice(true);
    setIsUnusualTime(true);
    setShowSimControls(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMessage('Please enter a valid transfer amount.');
      return;
    }

    if (numAmount > balance) {
      setErrorMessage(`Insufficient balance. Your available balance is ₹${balance.toLocaleString('en-IN')}.`);
      return;
    }

    let recipientName = '';
    let recipientAccount = '';
    let recipientBank = 'State Bank of India';
    let isBeneficiaryNew = false;

    if (isCustomBeneficiary) {
      if (!customName.trim()) {
        setErrorMessage('Please enter the recipient name.');
        return;
      }
      recipientName = customName.trim();
      recipientAccount = customAccount || '•••• •••• 8831';
      isBeneficiaryNew = true;
    } else {
      const ben = beneficiaries.find(b => b.id === selectedBeneficiaryId);
      if (!ben) {
        setErrorMessage('Please select a recipient.');
        return;
      }
      recipientName = ben.name;
      recipientAccount = ben.accountNumber;
      recipientBank = ben.bankName;
      isBeneficiaryNew = ben.isNew;
    }

    setPendingRecipientName(recipientName);

    // Run Risk Engine Evaluation
    const riskResult = SentinelRiskEngine.evaluate({
      customer: currentPersona,
      amount: numAmount,
      beneficiary: {
        name: recipientName,
        accountNumber: recipientAccount,
        ifsc: customIfsc || 'SBIN0001244',
        isNew: isBeneficiaryNew
      },
      device: isUnfamiliarDevice ? 'Unknown Linux / Chrome Device' : currentPersona.normalDevice,
      isUnfamiliarDevice,
      isUnusualTime,
      rapidTransactionCount,
      remoteAccessAppDetected: remoteAccessDetected,
      purpose,
      method
    });

    setEvaluatedRisk(riskResult);

    // Determine which modal stage to show
    if (riskResult.score <= 30) {
      setActiveModalStage('LOW');
    } else if (riskResult.score <= 70) {
      setActiveModalStage('MEDIUM');
    } else {
      setActiveModalStage('HIGH');
    }
  };

  // Complete Payment Action
  const handleExecutePayment = () => {
    if (!evaluatedRisk) return;
    const numAmount = parseFloat(amount);

    executeTransaction({
      recipientName: pendingRecipientName,
      recipientAccount: isCustomBeneficiary ? customAccount : '•••• •••• 9921',
      recipientBank: 'Bank',
      amount: numAmount,
      purpose,
      method,
      note,
      riskResult: evaluatedRisk,
      deviceUsed: isUnfamiliarDevice ? 'Unfamiliar Device' : currentPersona.normalDevice,
      isBeneficiaryNew: isCustomBeneficiary || evaluatedRisk.breakdown.some(b => b.id === 'new-beneficiary' && b.points > 0),
      status: evaluatedRisk.score > 30 ? 'VERIFIED' : 'COMPLETED'
    });

    setActiveModalStage('NONE');
    onClose();
  };

  // Safe Cancel Action (Halt & Protect)
  const handleCancelAndProtect = () => {
    if (!evaluatedRisk) return;
    const numAmount = parseFloat(amount);

    preventTransaction({
      recipientName: pendingRecipientName,
      recipientAccount: isCustomBeneficiary ? customAccount : '•••• •••• 6712',
      recipientBank: 'State Bank of India',
      amount: numAmount,
      purpose,
      method,
      riskResult: evaluatedRisk,
      deviceUsed: isUnfamiliarDevice ? 'Unfamiliar Device' : currentPersona.normalDevice,
      reason: 'User accepted proactive AI safety recommendation'
    });

    setActiveModalStage('NONE');
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto">
          {/* Header */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-white">
                  {simpleLanguage ? 'Send Money to Someone' : 'Transfer Money (Protected)'}
                </h2>
                <p className="text-[11px] text-slate-300">
                  Protected by Sentinel AI behavioral safety engine
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Quick Demo Preset Trigger */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-rose-950">
                <Zap className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span className="font-semibold text-[11px]">
                  Hackathon Scam Demo Preset:
                </span>
              </div>
              <button
                type="button"
                onClick={handleLoadScamScenario}
                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] shadow-sm transition-colors"
              >
                Load ₹80,000 Scam Preset
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Recipient Selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  {simpleLanguage ? 'Who are you sending to?' : 'Select Recipient / Beneficiary'}
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomBeneficiary(prev => !prev)}
                  className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{isCustomBeneficiary ? 'Choose from saved' : '+ New Unsaved Recipient'}</span>
                </button>
              </div>

              {!isCustomBeneficiary ? (
                <select
                  value={selectedBeneficiaryId}
                  onChange={e => setSelectedBeneficiaryId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {beneficiaries.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.bankName}) {b.isNew ? '⚠️ [NEW RECIPIENT]' : '✓ [Known]'}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="space-y-2 p-3.5 rounded-xl bg-amber-50/50 border border-amber-200">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                      New Recipient Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ravi Kumar"
                      value={customName}
                      onChange={e => setCustomName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                        Account / UPI ID
                      </label>
                      <input
                        type="text"
                        placeholder="•••• •••• 6712"
                        value={customAccount}
                        onChange={e => setCustomAccount(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                        Bank IFSC
                      </label>
                      <input
                        type="text"
                        placeholder="SBIN0019482"
                        value={customIfsc}
                        onChange={e => setCustomIfsc(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Amount */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  {simpleLanguage ? 'How much money? (in Rupees)' : 'Amount (INR)'}
                </label>
                <span className="text-[11px] text-slate-500">
                  Available: <span className="font-semibold text-slate-800">₹{balance.toLocaleString('en-IN')}</span>
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">
                  ₹
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="2500"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Purpose of Payment */}
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                {simpleLanguage ? 'What is this money for?' : 'Purpose of Transfer'}
              </label>
              <select
                value={purpose}
                onChange={e => setPurpose(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium"
              >
                <option value="Family Support">Family Support / Gift</option>
                <option value="Medical & Medicine">Medical & Pharmacy Bill</option>
                <option value="Grocery & Supplies">Monthly Groceries</option>
                <option value="House Rent & Domestic Help">Rent / Domestic Help</option>
                <option value="Police / Court Verification Clearance">⚠️ Police / Court Escrow Clearance (Scam Vector)</option>
                <option value="Urgent KYC / Account Unblock">⚠️ Urgent KYC Unblock Test Transfer (Scam Vector)</option>
                <option value="Telegram / YouTube Task Fee">⚠️ Telegram VIP Task Upgrade Deposit (Scam Vector)</option>
                <option value="Other">Other Personal</option>
              </select>
            </div>

            {/* Payment Mode */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {(['UPI', 'IMPS', 'NEFT', 'RTGS'] as PaymentMethod[]).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`py-2 px-1 text-center rounded-lg border text-xs font-bold transition-all ${
                    method === m
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Simulation Controls Accordion (Hackathon presenter superpower) */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowSimControls(prev => !prev)}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 flex items-center justify-between font-semibold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-blue-600" />
                  <span>Presenter Simulation Controls (Signals Engine)</span>
                </div>
                {showSimControls ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showSimControls && (
                <div className="mt-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block text-[11px]">Originating Device:</span>
                      <span className="text-[10px] text-slate-500">
                        {isUnfamiliarDevice ? 'Unrecognized Linux / Foreign Device' : `Known: ${currentPersona.normalDevice.split('(')[0]}`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsUnfamiliarDevice(prev => !prev)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        isUnfamiliarDevice ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isUnfamiliarDevice ? 'FLAGGED (Unknown)' : 'TRUSTED'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200/70 pt-2">
                    <div>
                      <span className="font-bold text-slate-800 block text-[11px]">Time of Transfer:</span>
                      <span className="text-[10px] text-slate-500">
                        {isUnusualTime ? 'Unusual Late Night (2:15 AM)' : 'Normal Daylight (2:30 PM)'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsUnusualTime(prev => !prev)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        isUnusualTime ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isUnusualTime ? 'FLAGGED (Night)' : 'NORMAL'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200/70 pt-2">
                    <div>
                      <span className="font-bold text-slate-800 block text-[11px]">Screen Share Tool (AnyDesk):</span>
                      <span className="text-[10px] text-slate-500">
                        {remoteAccessDetected ? 'Remote desktop active' : 'No screen share detected'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRemoteAccessDetected(prev => !prev)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        remoteAccessDetected ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {remoteAccessDetected ? 'ACTIVE (Scam Flag)' : 'OFF'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Evaluate & Send Money</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Adaptive Modals */}
      {activeModalStage === 'LOW' && evaluatedRisk && (
        <LowRiskModal
          isOpen={true}
          onClose={() => setActiveModalStage('NONE')}
          onConfirm={handleExecutePayment}
          amount={parseFloat(amount)}
          recipientName={pendingRecipientName}
          method={method}
          riskResult={evaluatedRisk}
        />
      )}

      {activeModalStage === 'MEDIUM' && evaluatedRisk && (
        <MediumRiskModal
          isOpen={true}
          onClose={() => setActiveModalStage('NONE')}
          onConfirm={handleExecutePayment}
          amount={parseFloat(amount)}
          recipientName={pendingRecipientName}
          method={method}
          riskResult={evaluatedRisk}
        />
      )}

      {activeModalStage === 'HIGH' && evaluatedRisk && (
        <HighRiskInterventionModal
          isOpen={true}
          onCancelTransaction={handleCancelAndProtect}
          onOpenAIAssistant={() => {
            setActiveModalStage('NONE');
            onOpenAIAssistant();
          }}
          onVerifyWithTrustedContact={() => {
            setActiveModalStage('NONE');
            onOpenTrustedContactModal({
              recipientName: pendingRecipientName,
              amount: parseFloat(amount)
            });
          }}
          onContinueAnyway={handleExecutePayment}
          amount={parseFloat(amount)}
          recipientName={pendingRecipientName}
          riskResult={evaluatedRisk}
        />
      )}
    </>
  );
};
