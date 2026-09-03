import React, { useState } from 'react';
import { UserPlus, X, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { useBankData } from '../../context/BankDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';

interface AddBeneficiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddBeneficiaryModal: React.FC<AddBeneficiaryModalProps> = ({ isOpen, onClose }) => {
  const { addBeneficiary } = useBankData();
  const { simpleLanguage } = useAccessibility();

  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('SBIN0001244');
  const [bankName, setBankName] = useState('State Bank of India');
  const [category, setCategory] = useState<'Family' | 'Medical' | 'Utilities' | 'Shopping' | 'Unknown'>('Family');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addBeneficiary({
      name: name.trim(),
      accountNumber: accountNumber ? `•••• •••• ${accountNumber.slice(-4)}` : '•••• •••• 9921',
      ifsc,
      bankName,
      isNew: true, // Brand new, enters 24h cooldown
      verified: false,
      category
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {simpleLanguage ? 'Add New Contact' : 'Add Beneficiary'}
              </h3>
              <p className="text-[11px] text-slate-300">
                Subject to 24-hour initial cooling-off safety limits
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

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Beneficiary Added!</h4>
            <p className="text-xs text-slate-500">
              {name} is now added. For safety, a 24-hour high-value cooldown is now in effect.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-2">
              <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="leading-snug text-[11px]">
                {simpleLanguage
                  ? 'For your safety, any large payment to a newly added person will require an extra pause and verification.'
                  : 'RBI Safety Standard: Newly added beneficiaries enter a 24-hour cooling-off window with enhanced anomaly scoring.'}
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                Recipient Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Rajesh Verma"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                  Bank Name
                </label>
                <select
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 text-slate-800"
                >
                  <option value="State Bank of India">SBI</option>
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Punjab National Bank">PNB</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full p-2 rounded-xl border border-slate-300 text-slate-800"
                >
                  <option value="Family">Family / Personal</option>
                  <option value="Medical">Medical / Doctor</option>
                  <option value="Utilities">Household / Utility</option>
                  <option value="Shopping">Shopping / Merchant</option>
                  <option value="Unknown">Other / New</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                Account Number
              </label>
              <input
                type="text"
                placeholder="e.g. 501002394857"
                value={accountNumber}
                onChange={e => setAccountNumber(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                Bank IFSC
              </label>
              <input
                type="text"
                placeholder="SBIN0001244"
                value={ifsc}
                onChange={e => setIfsc(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono uppercase"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Save Beneficiary
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
