import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  X, 
  HelpCircle, 
  Users, 
  AlertOctagon, 
  ChevronDown, 
  ChevronUp, 
  Volume2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { RiskEvaluationResult } from '../../types/risk';
import { useAccessibility } from '../../context/AccessibilityContext';

interface HighRiskInterventionModalProps {
  isOpen: boolean;
  onCancelTransaction: () => void;
  onOpenAIAssistant: () => void;
  onVerifyWithTrustedContact: () => void;
  onContinueAnyway: () => void;
  amount: number;
  recipientName: string;
  riskResult: RiskEvaluationResult;
}

export const HighRiskInterventionModal: React.FC<HighRiskInterventionModalProps> = ({
  isOpen,
  onCancelTransaction,
  onOpenAIAssistant,
  onVerifyWithTrustedContact,
  onContinueAnyway,
  amount,
  recipientName,
  riskResult
}) => {
  const { speakText, voiceGuidance } = useAccessibility();
  const [showTechnicalBreakdown, setShowTechnicalBreakdown] = useState(true);

  // Automatically read safety alert when opened if voice guidance is enabled
  useEffect(() => {
    if (isOpen) {
      speakText(
        `Please pause and verify. You are sending ₹${amount} to ${recipientName}. Sentinel Bank AI flagged this transfer as high risk to protect your money from scams.`
      );
    }
  }, [isOpen, amount, recipientName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-rose-200 overflow-hidden my-auto"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="intervention-title"
      >
        {/* Urgent but non-alarming header */}
        <div className="p-6 bg-gradient-to-r from-rose-700 via-rose-600 to-red-700 text-white relative">
          <button
            onClick={onCancelTransaction}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-rose-200 hover:text-white hover:bg-rose-500/40 transition-colors"
            title="Cancel transaction"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
              <ShieldAlert className="w-7 h-7 text-white animate-bounce" />
            </div>
            <div>
              <span className="bg-rose-900/60 text-rose-200 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full border border-rose-400/30">
                Sentinel AI Active Defense
              </span>
              <h2 id="intervention-title" className="text-xl sm:text-2xl font-black text-white tracking-tight">
                🚨 Pause and Verify
              </h2>
            </div>
          </div>

          <p className="text-xs text-rose-100 leading-relaxed mt-1">
            We stopped this payment temporarily to protect you from potential financial deception before money is lost.
          </p>

          <div className="mt-4 p-3 rounded-2xl bg-black/20 border border-white/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-rose-200 block font-medium">You are sending:</span>
              <span className="text-2xl font-black text-white">
                ₹{amount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-rose-200 block font-medium">Recipient:</span>
              <span className="text-sm font-bold text-white max-w-[140px] truncate block">
                {recipientName}
              </span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 text-xs">
          {/* Reason Explanations */}
          <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-rose-900 uppercase tracking-wider text-[11px]">
                Why are we asking you to pause?
              </h3>
              <button
                onClick={() =>
                  speakText(
                    `Why we are asking you to pause: ${riskResult.humanExplanation.join('. ')}. These patterns can be associated with financial scams.`,
                    true
                  )
                }
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:text-rose-900"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen Aloud</span>
              </button>
            </div>

            <ul className="space-y-2 text-slate-700">
              {riskResult.humanExplanation.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-rose-200/60 text-[11px] font-medium text-rose-800">
              ⚠️ These patterns can be associated with financial scams, police impersonation (digital arrest), or remote access fraud.
            </div>
          </div>

          {/* Section 6 & 14 Requirement: Explainable Factor Breakdown */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
            <button
              onClick={() => setShowTechnicalBreakdown(prev => !prev)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-xs">
                  Transparent Risk Score:
                </span>
                <span className="bg-rose-100 text-rose-800 font-extrabold text-xs px-2 py-0.5 rounded-md">
                  {riskResult.score} / 100 HIGH RISK
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                <span>{showTechnicalBreakdown ? 'Hide factor math' : 'View factor math'}</span>
                {showTechnicalBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showTechnicalBreakdown && (
              <div className="px-4 pb-4 pt-1 text-[11px] space-y-1.5 font-mono">
                <div className="divide-y divide-slate-200 text-slate-700">
                  {riskResult.breakdown.map(factor => (
                    <div key={factor.id} className="py-1.5 flex items-center justify-between">
                      <span className="truncate pr-2">{factor.name}</span>
                      <span className={`font-bold ${factor.points > 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                        +{factor.points}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 flex items-center justify-between font-bold text-slate-900 text-xs">
                    <span>Total Risk Score</span>
                    <span className="text-rose-600 font-black">{riskResult.score}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Choice Matrix */}
          <div className="space-y-2 pt-1">
            {/* 1. Cancel Transaction (Primary & Safest Action) */}
            <button
              onClick={onCancelTransaction}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4 text-rose-400" />
              <span>Cancel Transaction (Safest Choice)</span>
            </button>

            {/* 2. Verify with Trusted Contact */}
            <button
              onClick={onVerifyWithTrustedContact}
              className="w-full py-3 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4 text-blue-600" />
              <span>Verify with Trusted Contact (Family/Guardian)</span>
            </button>

            {/* 3. I Need Help (Sentinel AI Assistant) */}
            <button
              onClick={onOpenAIAssistant}
              className="w-full py-3 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>I Need Help — Ask Sentinel AI Assistant</span>
            </button>

            {/* 4. Continue Anyway (Secondary with cooling-off warning) */}
            <div className="pt-2 text-center">
              <button
                onClick={onContinueAnyway}
                className="text-[11px] text-slate-400 hover:text-slate-600 underline font-medium transition-colors"
              >
                I understand the risk, Continue Anyway
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
