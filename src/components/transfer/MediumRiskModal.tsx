import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, X, CheckSquare, Square, ArrowRight } from 'lucide-react';
import { RiskEvaluationResult } from '../../types/risk';

interface MediumRiskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  recipientName: string;
  method: string;
  riskResult: RiskEvaluationResult;
}

export const MediumRiskModal: React.FC<MediumRiskModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  recipientName,
  method,
  riskResult
}) => {
  const [hasVerifiedRecipient, setHasVerifiedRecipient] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-amber-200 overflow-hidden">
        {/* Amber Header */}
        <div className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-amber-100 hover:text-white hover:bg-amber-600"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold">Please Verify This Payment</h3>
          <p className="text-xs text-amber-100 mt-1">
            Medium Risk Score: <span className="font-extrabold text-white">{riskResult.score} / 100</span>
          </p>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-amber-950 space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-[10px]">
              Why are we asking you to verify?
            </h4>
            <ul className="space-y-1.5 leading-relaxed">
              {riskResult.humanExplanation.map((exp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{exp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Recipient:</span>
              <span className="font-bold text-slate-900 text-sm">{recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount:</span>
              <span className="font-black text-slate-900 text-base">₹{amount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Verification Checkbox */}
          <div 
            onClick={() => setHasVerifiedRecipient(prev => !prev)}
            className="p-3.5 rounded-xl border border-slate-300 hover:border-blue-500 bg-slate-50 cursor-pointer flex items-start gap-3 transition-colors select-none"
          >
            <div className="mt-0.5 text-blue-600 flex-shrink-0">
              {hasVerifiedRecipient ? (
                <CheckSquare className="w-5 h-5 fill-blue-600 text-white" />
              ) : (
                <Square className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <div>
              <span className="font-bold text-slate-900 text-xs block">
                Have you personally verified this recipient?
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                I confirm I have personally spoken to {recipientName} or know them offline, and was not instructed by an unknown caller.
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-white transition-colors"
          >
            Cancel Payment
          </button>
          <button
            disabled={!hasVerifiedRecipient}
            onClick={onConfirm}
            className={`flex-1 py-2.5 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              hasVerifiedRecipient
                ? 'bg-amber-600 hover:bg-amber-500 shadow-md shadow-amber-600/20 cursor-pointer'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Yes, Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
