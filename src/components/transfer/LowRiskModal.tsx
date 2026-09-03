import React from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { RiskEvaluationResult } from '../../types/risk';

interface LowRiskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  recipientName: string;
  method: string;
  riskResult: RiskEvaluationResult;
}

export const LowRiskModal: React.FC<LowRiskModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  recipientName,
  method,
  riskResult
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-500/40"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold">Transaction Appears Safe</h3>
          <p className="text-xs text-emerald-100 mt-1">
            Low Risk Score: <span className="font-extrabold text-white">{riskResult.score} / 100</span>
          </p>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Sending to:</span>
              <span className="font-bold text-slate-900 text-sm">{recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount:</span>
              <span className="font-black text-slate-900 text-base">₹{amount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Mode:</span>
              <span className="font-semibold text-slate-800">{method}</span>
            </div>
          </div>

          <div className="space-y-1.5 text-slate-600 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safety Signals Passed:</span>
            </div>
            <p>• Verified known beneficiary with regular payment history</p>
            <p>• Transfer amount aligns with your standard banking patterns</p>
            <p>• Authenticated from your registered trusted device</p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Confirm Payment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
