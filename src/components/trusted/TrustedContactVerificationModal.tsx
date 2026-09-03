import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  X, 
  PhoneCall, 
  Clock, 
  Smartphone, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBankData } from '../../context/BankDataContext';
import { TrustedContact } from '../../types/banking';

interface TrustedContactVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  transferDetails?: {
    recipientName: string;
    amount: number;
  };
  onVerificationComplete: (status: 'APPROVED' | 'REJECTED') => void;
}

export const TrustedContactVerificationModal: React.FC<TrustedContactVerificationModalProps> = ({
  isOpen,
  onClose,
  transferDetails,
  onVerificationComplete
}) => {
  const { currentPersona } = useAuth();
  const contacts = currentPersona.trustedContacts;

  const [selectedContact, setSelectedContact] = useState<TrustedContact>(contacts[0]);
  const [step, setStep] = useState<'SELECT' | 'WAITING' | 'RESULT'>('SELECT');
  const [verificationResult, setVerificationResult] = useState<'APPROVED' | 'REJECTED'>('REJECTED');

  if (!isOpen) return null;

  const handleSendRequest = () => {
    setStep('WAITING');
  };

  const handleSimulateContactDecision = (decision: 'APPROVED' | 'REJECTED') => {
    setVerificationResult(decision);
    setStep('RESULT');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-blue-200 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shadow-inner">
              <Users className="w-6 h-6 text-blue-200" />
            </div>
            <div>
              <span className="bg-blue-800/80 text-blue-200 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                Vulnerable Customer Safety Layer
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Verify with Trusted Contact
              </h2>
            </div>
          </div>
          <p className="text-xs text-blue-100 mt-2 leading-relaxed">
            Would you like someone you trust to help verify this payment before money is sent?
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 text-xs space-y-4">
          {/* STEP 1: Select Contact */}
          {step === 'SELECT' && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Pending Transfer Review:</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-slate-900 text-sm">
                    {transferDetails?.recipientName || 'Ravi Kumar'}
                  </span>
                  <span className="font-extrabold text-slate-900 text-base">
                    ₹{(transferDetails?.amount || 80000).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2">
                  Choose Who Should Review This:
                </label>
                <div className="space-y-2">
                  {contacts.map(c => {
                    const isSelected = selectedContact.id === c.id;
                    return (
                      <div
                        key={c.id}
                        onClick={() => setSelectedContact(c)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                              <span>{c.name}</span>
                              <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                                Verified Contact
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {c.relationship} • {c.phone}
                            </div>
                          </div>
                        </div>
                        <input
                          type="radio"
                          checked={isSelected}
                          onChange={() => setSelectedContact(c)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSendRequest}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Verification Request to {selectedContact.name}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Waiting Pulse & Interactive Simulated Response */}
          {step === 'WAITING' && (
            <div className="space-y-5 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto flex items-center justify-center" />

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Verification Request Sent
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Sent to <span className="font-semibold text-slate-800">{selectedContact.name} ({selectedContact.relationship})</span>
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full mt-2">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span>Waiting for trusted contact response...</span>
                </div>
              </div>

              {/* Hackathon Simulated Phone Screen */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white text-left max-w-sm mx-auto shadow-xl border border-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-blue-400" />
                    <span>{selectedContact.name}'s Phone Screen (Simulation)</span>
                  </span>
                  <span>Now</span>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-slate-800/90 border border-slate-700">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-[11px] mb-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>SentinelBank Urgent Family Alert</span>
                  </div>
                  <p className="text-[11px] text-slate-200 leading-snug">
                    "Your mother {currentPersona.name} is attempting an unusual transfer of ₹{(transferDetails?.amount || 80000).toLocaleString('en-IN')} to new recipient '{transferDetails?.recipientName || 'Ravi Kumar'}'. Do you recognize this payment?"
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => handleSimulateContactDecision('REJECTED')}
                    className="flex-1 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] text-center"
                  >
                    🚨 Decline: This is a Scam!
                  </button>
                  <button
                    onClick={() => handleSimulateContactDecision('APPROVED')}
                    className="flex-1 py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-[11px] text-center"
                  >
                    ✓ Yes, I Know Them
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Result Screen */}
          {step === 'RESULT' && (
            <div className="space-y-4 py-2">
              {verificationResult === 'REJECTED' ? (
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mx-auto text-rose-600">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-rose-950">
                      🚨 Transaction Cancelled by {selectedContact.name}
                    </h3>
                    <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                      "{selectedContact.name} flagged this as an unverified scam caller and advised you not to send money. Your funds of ₹{(transferDetails?.amount || 80000).toLocaleString('en-IN')} remain completely safe."
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onVerificationComplete('REJECTED');
                        onClose();
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                    >
                      Complete Protection & Return to Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-emerald-950">
                      ✓ Trusted Contact Verified
                    </h3>
                    <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                      {selectedContact.name} reviewed and confirmed the recipient is legitimate.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onVerificationComplete('APPROVED');
                        onClose();
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500"
                    >
                      Proceed to Complete Transfer
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
