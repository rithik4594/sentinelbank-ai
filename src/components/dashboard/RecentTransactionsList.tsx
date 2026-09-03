import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowUpRight, 
  Smartphone, 
  Clock, 
  ChevronRight,
  Info,
  X
} from 'lucide-react';
import { Transaction } from '../../types/banking';
import { useBankData } from '../../context/BankDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const RecentTransactionsList: React.FC = () => {
  const { transactions } = useBankData();
  const { simpleLanguage } = useAccessibility();

  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            {simpleLanguage ? 'Recent Payments' : 'Recent Transactions'}
          </h2>
          <p className="text-xs text-slate-500">
            {simpleLanguage ? 'History of your money transfers' : 'Real-time ledger with AI risk classification'}
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Showing {transactions.length} items
        </span>
      </div>

      <div className="mt-4 divide-y divide-slate-100">
        {transactions.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No transactions yet.
          </div>
        ) : (
          transactions.map(tx => {
            const isPrevented = tx.status === 'PREVENTED';
            const isHighRisk = tx.riskLevel === 'HIGH' || tx.riskScore >= 71;
            const isMedRisk = tx.riskLevel === 'MEDIUM' || (tx.riskScore >= 31 && tx.riskScore < 71);

            return (
              <div
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className={`py-3.5 px-2 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                  isPrevented
                    ? 'bg-rose-50/50 hover:bg-rose-50'
                    : 'hover:bg-slate-50'
                }`}
              >
                {/* Left: Icon & Details */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isPrevented
                        ? 'bg-rose-100 text-rose-700'
                        : isMedRisk
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {isPrevented ? (
                      <ShieldAlert className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {tx.recipientName}
                      </span>
                      {isPrevented && (
                        <span className="bg-rose-600 text-white font-extrabold text-[9px] px-1.5 py-0.2 rounded uppercase">
                          Halted by AI
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {tx.purpose || 'Direct Transfer'} • {new Date(tx.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Risk Score */}
                <div className="text-right flex-shrink-0">
                  <div className={`text-xs font-bold ${
                    isPrevented ? 'text-rose-700 line-through' : 'text-slate-900'
                  }`}>
                    - ₹{tx.amount.toLocaleString('en-IN')}
                  </div>
                  <div className="mt-0.5 flex items-center justify-end gap-1.5">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                      isPrevented
                        ? 'bg-rose-100 text-rose-800 font-bold'
                        : isMedRisk
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      Risk: {tx.riskScore}/100
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Transaction Detail & Explainability Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className={`p-6 text-white ${
              selectedTx.status === 'PREVENTED'
                ? 'bg-gradient-to-r from-rose-900 to-red-800'
                : 'bg-slate-900'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
                    Transaction Audit Review
                  </span>
                  <h3 className="text-lg font-bold mt-1">
                    {selectedTx.recipientName}
                  </h3>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {selectedTx.recipientBank} • {selectedTx.recipientAccount}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTx(null)}
                  className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className={`text-2xl font-black ${
                  selectedTx.status === 'PREVENTED' ? 'line-through text-rose-200' : 'text-white'
                }`}>
                  ₹{selectedTx.amount.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-300">
                  via {selectedTx.method}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-600">Final Protection Status:</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                  selectedTx.status === 'PREVENTED'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {selectedTx.status === 'PREVENTED' ? '🛡️ PREVENTED (Zero Money Lost)' : '✓ COMPLETED'}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
                  Risk Engine Assessment
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="font-semibold text-slate-700">Calculated Risk Score:</span>
                    <span className="font-black text-sm text-slate-900">{selectedTx.riskScore} / 100</span>
                  </div>
                  <div className="text-slate-600 space-y-1">
                    <p>• Device used: <span className="font-mono text-slate-800">{selectedTx.deviceUsed}</span></p>
                    <p>• Recipient status: <span className="font-medium text-slate-800">{selectedTx.isBeneficiaryNew ? 'New / Unverified' : 'Known / Established'}</span></p>
                    <p>• Purpose: <span className="text-slate-800">{selectedTx.purpose}</span></p>
                    <p>• Timestamp: <span className="font-mono text-slate-800">{new Date(selectedTx.timestamp).toLocaleString('en-IN')}</span></p>
                  </div>
                </div>
              </div>

              {selectedTx.status === 'PREVENTED' && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    <span>Why was this stopped?</span>
                  </div>
                  <p className="leading-relaxed">
                    The transaction exhibited multiple high-risk scam indicators (amount was significantly higher than average, recipient had no previous history, and digital arrest/coercion markers were detected).
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
