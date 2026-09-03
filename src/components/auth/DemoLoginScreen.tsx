import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  Play, 
  Lock, 
  AlertCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DemoLoginScreenProps {
  onStartSimulation: () => void;
}

export const DemoLoginScreen: React.FC<DemoLoginScreenProps> = ({ onStartSimulation }) => {
  const { allPersonas, loginAs } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <span className="font-extrabold text-xl text-white tracking-tight">
              Sentinel<span className="text-blue-500">Bank</span> AI
            </span>
            <span className="block text-[11px] text-slate-400">
              Proactive Zero-Loss Scam Defense System
            </span>
          </div>
        </div>

        <button
          onClick={onStartSimulation}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-md shadow-rose-600/20 flex items-center gap-2 transition-transform transform hover:scale-[1.02]"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>⚡ Run Fraud Simulation</span>
        </button>
      </div>

      {/* Main Persona Selection Area */}
      <div className="max-w-5xl mx-auto w-full my-auto py-10 z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="bg-blue-500/15 text-blue-400 border border-blue-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Hackathon Interactive Prototype
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Select a Customer Persona to Test
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Experience how SentinelBank's explainable risk engine adapts protection based on customer vulnerability, transaction habits, and social-engineering risk signals.
          </p>
        </div>

        {/* 3 Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allPersonas.map((persona, idx) => {
            const isSenior = persona.role === 'Senior Citizen';
            const isNovice = persona.role === 'First-Time Digital Banking User';

            return (
              <div
                key={persona.id}
                onClick={() => loginAs(persona.id)}
                className={`p-6 rounded-3xl cursor-pointer border transition-all transform hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between text-left group ${
                  isSenior
                    ? 'bg-slate-900/90 border-blue-500/40 hover:border-blue-400 shadow-blue-900/10'
                    : isNovice
                    ? 'bg-slate-900/90 border-amber-500/40 hover:border-amber-400 shadow-amber-900/10'
                    : 'bg-slate-900/90 border-slate-700 hover:border-slate-500'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700 shadow-sm"
                    />
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                      isSenior
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : isNovice
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    }`}>
                      {persona.role}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {persona.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Age {persona.age} • {persona.city}
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {persona.bio}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Digital Experience:</span>
                      <span className="font-bold text-slate-200">{persona.experienceLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Typical Range:</span>
                      <span className="font-bold text-slate-200">₹{persona.typicalMinAmount} – ₹{persona.typicalMaxAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Historical Average:</span>
                      <span className="font-bold text-emerald-400">₹{persona.averageTransactionAmount} / tx</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-blue-300">
                  <span>Enter as {persona.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Prototype Safety Notice */}
        <div className="mt-8 max-w-xl mx-auto p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>Demo Authentication — No real banking credentials or real money required.</span>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full text-center text-[11px] text-slate-500 z-10">
        SentinelBank AI • Built for Vulnerable Customer Protection & Hackathon Presentation
      </div>
    </div>
  );
};
