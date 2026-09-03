import React from 'react';
import { Users, X, ShieldCheck, PhoneCall, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';

interface ManageTrustedContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManageTrustedContactsModal: React.FC<ManageTrustedContactsModalProps> = ({
  isOpen,
  onClose
}) => {
  const { currentPersona } = useAuth();
  const { simpleLanguage } = useAccessibility();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {simpleLanguage ? 'My Trusted Family Contacts' : 'Trusted Contact Circle'}
              </h3>
              <p className="text-[11px] text-slate-300">
                People who can verify high-risk payments on your behalf
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

        <div className="p-6 space-y-4 text-xs">
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-950">
            <div className="font-bold text-xs flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>How Trusted Contacts Work</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              When an unusually large or suspicious transaction occurs, Sentinel AI can automatically alert your designated guardian to verify the payment before any funds leave your account.
            </p>
          </div>

          <div className="space-y-2.5">
            {currentPersona.trustedContacts.map(contact => (
              <div
                key={contact.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <span>{contact.name}</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                        Active Guard
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 block">{contact.relationship}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{contact.phone}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-emerald-600 font-semibold text-[11px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Linked</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert('Feature Preview: Additional trusted contact invitation link generated.')}
              className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 text-slate-600 hover:text-blue-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Another Family Contact</span>
            </button>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
