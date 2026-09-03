import React from 'react';
import { Shield, PhoneCall, AlertCircle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>SentinelBank AI Guard</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              An intelligent behavioral safety layer designed to proactively intercept social engineering, digital arrest extortion, and unintended transfers before money leaves the bank.
            </p>
          </div>

          <div>
            <div className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Emergency Fraud Helplines (India)</span>
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <span className="text-slate-300 font-semibold">National Cybercrime Helpline:</span>{' '}
                <span className="text-emerald-400 font-mono font-bold">1930</span> (24x7 Toll Free)
              </li>
              <li>
                <span className="text-slate-300 font-semibold">SentinelBank Senior Concierge:</span>{' '}
                <span className="text-blue-400 font-mono">1800-SENTINEL</span>
              </li>
              <li>
                <span className="text-slate-300 font-semibold">Portal:</span>{' '}
                <span className="text-slate-400">cybercrime.gov.in</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Hackathon Demonstration Notice</span>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/70 text-[11px] text-slate-300">
              This application is an educational prototype. No real bank accounts are connected, no real monetary transfers are executed, and no live credentials or UPI PINs are collected.
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            © 2026 SentinelBank AI. Built for vulnerable customer safety & financial inclusion.
          </div>
          <div className="flex items-center gap-1">
            <span>Powered by Transparent Explainable AI & Adaptive Risk Engines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
