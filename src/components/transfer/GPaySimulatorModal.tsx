import React, { useState } from 'react';
import { 
  QrCode, 
  Smartphone, 
  ShieldCheck, 
  ShieldAlert, 
  X, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Camera, 
  RefreshCw,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBankData } from '../../context/BankDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { SentinelRiskEngine } from '../../engine/riskEngine';
import { RiskEvaluationResult } from '../../types/risk';
import { LowRiskModal } from './LowRiskModal';
import { MediumRiskModal } from './MediumRiskModal';
import { HighRiskInterventionModal } from './HighRiskInterventionModal';

interface GPaySimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAIAssistant: () => void;
  onOpenTrustedContactModal: (details: { recipientName: string; amount: number }) => void;
}

export const GPaySimulatorModal: React.FC<GPaySimulatorModalProps> = ({
  isOpen,
  onClose,
  onOpenAIAssistant,
  onOpenTrustedContactModal
}) => {
  const { currentPersona } = useAuth();
  const { balance, executeTransaction, preventTransaction } = useBankData();
  const { simpleLanguage } = useAccessibility();

  const [activeTab, setActiveTab] = useState<'scan' | 'upiId'>('scan');
  const [upiId, setUpiId] = useState('ravikumar.invest99@oksbi');
  const [recipientName, setRecipientName] = useState('Ravi Kumar');
  const [amount, setAmount] = useState('80000');
  const [note, setNote] = useState('Court Clearance Escrow');
  const [isScanning, setIsScanning] = useState(false);

  // Risk Modals State
  const [evaluatedRisk, setEvaluatedRisk] = useState<RiskEvaluationResult | null>(null);
  const [activeModalStage, setActiveModalStage] = useState<'NONE' | 'LOW' | 'MEDIUM' | 'HIGH'>('NONE');

  if (!isOpen) return null;

  // Presets for quick judge testing
  const handleSelectPreset = (preset: 'scam' | 'phishing' | 'safe') => {
    if (preset === 'scam') {
      setRecipientName('Ravi Kumar (Unverified VPA)');
      setUpiId('ravikumar.invest99@oksbi');
      setAmount('80000');
      setNote('Police Digital Arrest Verification');
    } else if (preset === 'phishing') {
      setRecipientName('MSEDCL Electricity Officer');
      setUpiId('officer.power992@paytm');
      setAmount('14500');
      setNote('Power Cutoff Immediate Clearance');
    } else {
      setRecipientName('Apollo Pharmacy Pune');
      setUpiId('apollopharmacy.pune@icici');
      setAmount('1840');
      setNote('Monthly Prescription');
    }
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      handleSelectPreset('scam');
    }, 1200);
  };

  const handleProceedGPay = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    const isScamPreset = upiId.includes('ravikumar') || recipientName.includes('Ravi') || numAmount >= 50000;

    // Run Risk Engine
    const risk = SentinelRiskEngine.evaluate({
      customer: currentPersona,
      amount: numAmount,
      beneficiary: {
        name: recipientName,
        accountNumber: upiId,
        ifsc: 'SBIN0019482',
        isNew: isScamPreset
      },
      device: isScamPreset ? 'Unfamiliar Chrome Device' : currentPersona.normalDevice,
      isUnfamiliarDevice: isScamPreset,
      isUnusualTime: isScamPreset,
      purpose: note || 'UPI Payment via GPay',
      method: 'UPI'
    });

    setEvaluatedRisk(risk);

    if (risk.score <= 30) {
      setActiveModalStage('LOW');
    } else if (risk.score <= 70) {
      setActiveModalStage('MEDIUM');
    } else {
      setActiveModalStage('HIGH');
    }
  };

  const handleConfirmSafePayment = () => {
    if (!evaluatedRisk) return;
    executeTransaction({
      recipientName,
      recipientAccount: upiId,
      recipientBank: 'UPI (GPay)',
      amount: parseFloat(amount),
      purpose: note,
      method: 'UPI',
      riskResult: evaluatedRisk,
      deviceUsed: currentPersona.normalDevice,
      isBeneficiaryNew: false,
      status: 'COMPLETED'
    });
    setActiveModalStage('NONE');
    onClose();
  };

  const handleCancelScamPayment = () => {
    if (!evaluatedRisk) return;
    preventTransaction({
      recipientName,
      recipientAccount: upiId,
      recipientBank: 'UPI (GPay)',
      amount: parseFloat(amount),
      purpose: note,
      method: 'UPI',
      riskResult: evaluatedRisk,
      deviceUsed: 'Unfamiliar Device',
      reason: 'Halted before UPI PIN entry via Sentinel Pre-PIN Shield'
    });
    setActiveModalStage('NONE');
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-auto">
          {/* GPay Header with Brand Colors */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-md">
                {/* Google Pay Style 4-Color Icon */}
                <div className="flex items-center gap-0.5 font-black text-sm">
                  <span className="text-blue-600">G</span>
                  <span className="text-red-500">P</span>
                  <span className="text-yellow-500">a</span>
                  <span className="text-green-600">y</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-white">Google Pay (UPI)</h3>
                  <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Pre-PIN AI Hook
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Protected by SentinelBank Intelligent Safety Layer
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Architecture Insight Notice */}
          <div className="p-3 bg-blue-50/80 border-b border-blue-100 px-6 text-xs text-blue-950 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="leading-snug text-[11px]">
              <strong>How this works with GPay:</strong> Once you enter a UPI PIN, funds settle irreversibly in 2 seconds. SentinelBank AI sits <strong>between the amount entry and the UPI PIN prompt</strong> to intercept scams before authentication.
            </p>
          </div>

          {/* Presets Row */}
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Select Test UPI Scenario:
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleSelectPreset('scam')}
                className={`p-2 rounded-xl border text-left transition-all ${
                  upiId.includes('ravikumar')
                    ? 'border-rose-500 bg-rose-50/70 text-rose-900 font-bold shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] text-rose-600 font-black block">🚨 SCAM QR</span>
                <span className="text-[11px] truncate block">Ravi Kumar (₹80K)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('phishing')}
                className={`p-2 rounded-xl border text-left transition-all ${
                  upiId.includes('officer')
                    ? 'border-amber-500 bg-amber-50/70 text-amber-900 font-bold shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] text-amber-600 font-black block">⚠️ FAKE OFFICER</span>
                <span className="text-[11px] truncate block">Power Cutoff (₹14.5K)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('safe')}
                className={`p-2 rounded-xl border text-left transition-all ${
                  upiId.includes('apollo')
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-bold shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] text-emerald-600 font-black block">🟢 SAFE STORE</span>
                <span className="text-[11px] truncate block">Apollo Pharmacy</span>
              </button>
            </div>
          </div>

          {/* Tabs: QR Scanner vs Enter UPI ID */}
          <div className="p-6 space-y-4 text-xs">
            <div className="flex border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('scan')}
                className={`pb-2.5 px-4 font-bold text-xs flex items-center gap-1.5 transition-colors ${
                  activeTab === 'scan'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>Scan Any QR Code</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('upiId')}
                className={`pb-2.5 px-4 font-bold text-xs flex items-center gap-1.5 transition-colors ${
                  activeTab === 'upiId'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Pay via UPI ID / Number</span>
              </button>
            </div>

            {activeTab === 'scan' ? (
              <div className="space-y-4 text-center">
                {/* Camera Scanner Simulation */}
                <div className="relative w-full h-44 bg-slate-900 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-4 border-2 border-dashed border-blue-500/50">
                  <div className="w-32 h-32 border-2 border-blue-400 rounded-xl relative flex items-center justify-center">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white" />
                    
                    {isScanning ? (
                      <div className="w-full h-0.5 bg-rose-500 shadow-md shadow-rose-500 animate-pulse" />
                    ) : (
                      <QrCode className="w-16 h-16 text-slate-500" />
                    )}
                  </div>

                  <span className="text-[11px] text-slate-300 mt-2">
                    {isScanning ? 'Decoding UPI QR payload...' : 'Align scanner over UPI QR code'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateScan}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <Camera className="w-4 h-4 text-blue-600" />
                  <span>Simulate Scanning Scammer QR Code</span>
                </button>
              </div>
            ) : null}

            {/* Payment Fields */}
            <form onSubmit={handleProceedGPay} className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-500 font-bold uppercase">Recipient VPA:</span>
                  <span className="font-mono text-slate-800 font-bold text-xs">{upiId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-500 font-bold uppercase">Display Name:</span>
                  <span className="font-bold text-slate-900 text-xs">{recipientName}</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                  Amount in Rupees (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                  Payment Note / Reference
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="e.g. Police Clearance or Pharmacy Bill"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹{parseFloat(amount || '0').toLocaleString('en-IN')} with Google Pay</span>
                </button>
                <span className="text-[10px] text-slate-400 text-center block mt-1.5">
                  SentinelBank Pre-PIN Risk Engine inspects the transaction before UPI PIN prompt
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Adaptive Modals for GPay */}
      {activeModalStage === 'LOW' && evaluatedRisk && (
        <LowRiskModal
          isOpen={true}
          onClose={() => setActiveModalStage('NONE')}
          onConfirm={handleConfirmSafePayment}
          amount={parseFloat(amount)}
          recipientName={recipientName}
          method="UPI (GPay)"
          riskResult={evaluatedRisk}
        />
      )}

      {activeModalStage === 'MEDIUM' && evaluatedRisk && (
        <MediumRiskModal
          isOpen={true}
          onClose={() => setActiveModalStage('NONE')}
          onConfirm={handleConfirmSafePayment}
          amount={parseFloat(amount)}
          recipientName={recipientName}
          method="UPI (GPay)"
          riskResult={evaluatedRisk}
        />
      )}

      {activeModalStage === 'HIGH' && evaluatedRisk && (
        <HighRiskInterventionModal
          isOpen={true}
          onCancelTransaction={handleCancelScamPayment}
          onOpenAIAssistant={() => {
            setActiveModalStage('NONE');
            onOpenAIAssistant();
          }}
          onVerifyWithTrustedContact={() => {
            setActiveModalStage('NONE');
            onOpenTrustedContactModal({
              recipientName,
              amount: parseFloat(amount)
            });
          }}
          onContinueAnyway={handleConfirmSafePayment}
          amount={parseFloat(amount)}
          recipientName={recipientName}
          riskResult={evaluatedRisk}
        />
      )}
    </>
  );
};
