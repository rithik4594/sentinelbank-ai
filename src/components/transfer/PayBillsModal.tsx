import React, { useState } from 'react';
import { Receipt, X, CheckCircle2, ShieldCheck, Zap, Droplets, Smartphone, Tv } from 'lucide-react';
import { useBankData } from '../../context/BankDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { SentinelRiskEngine } from '../../engine/riskEngine';
import { useAuth } from '../../context/AuthContext';

interface PayBillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PayBillsModal: React.FC<PayBillsModalProps> = ({ isOpen, onClose }) => {
  const { currentPersona } = useAuth();
  const { executeTransaction, balance } = useBankData();
  const { simpleLanguage } = useAccessibility();

  const [selectedBiller, setSelectedBiller] = useState('electricity');
  const [consumerNumber, setConsumerNumber] = useState('028491823901');
  const [billAmount, setBillAmount] = useState('1850');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const billers = [
    { id: 'electricity', name: 'MSEDCL Electricity Board', icon: Zap, amount: 2150, verified: true },
    { id: 'water', name: 'Municipal Corporation Water', icon: Droplets, amount: 450, verified: true },
    { id: 'mobile', name: 'Airtel Postpaid Recharge', icon: Smartphone, amount: 799, verified: true },
    { id: 'dth', name: 'Tata Play DTH Service', icon: Tv, amount: 600, verified: true }
  ];

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const active = billers.find(b => b.id === selectedBiller) || billers[0];
    const num = parseFloat(billAmount);

    const risk = SentinelRiskEngine.evaluate({
      customer: currentPersona,
      amount: num,
      beneficiary: { name: active.name, accountNumber: '•••• •••• BBPS', ifsc: 'BBPS0000001', isNew: false },
      device: currentPersona.normalDevice,
      isUnfamiliarDevice: false,
      isUnusualTime: false,
      purpose: `${active.name} Monthly Utility`,
      method: 'UPI'
    });

    executeTransaction({
      recipientName: active.name,
      recipientAccount: '•••• •••• BBPS',
      recipientBank: 'Bharat BillPay (BBPS)',
      amount: num,
      purpose: `${active.name} Official Bill`,
      method: 'UPI',
      riskResult: risk,
      deviceUsed: currentPersona.normalDevice,
      isBeneficiaryNew: false
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {simpleLanguage ? 'Pay Utility Bills' : 'Bharat BillPay (BBPS)'}
              </h3>
              <p className="text-[11px] text-slate-300">
                Official NPCI verified utility network (Safe from utility disconnection scams)
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

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Bill Paid Successfully!</h4>
            <p className="text-xs text-slate-500">
              Receipt generated. Your payment was sent directly to the verified utility board.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="leading-snug text-[11px]">
                <strong>Official Channel Notice:</strong> Always pay electricity and water bills here. Real electricity companies will never ask you to transfer money to an officer's personal UPI number.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2">
                Select Bill Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {billers.map(b => {
                  const Icon = b.icon;
                  const isSelected = selectedBiller === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => {
                        setSelectedBiller(b.id);
                        setBillAmount(b.amount.toString());
                      }}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs font-bold text-emerald-950'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-slate-500'}`} />
                      <span className="text-[11px] truncate">{b.name.split(' ')[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                Consumer / Account ID
              </label>
              <input
                type="text"
                value={consumerNumber}
                onChange={e => setConsumerNumber(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                Verified Bill Amount (INR)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  value={billAmount}
                  onChange={e => setBillAmount(e.target.value)}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-colors"
              >
                Pay Verified Bill (Safe)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
