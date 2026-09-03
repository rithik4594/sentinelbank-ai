import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  User, 
  Zap, 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  Smartphone, 
  Users, 
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBankData } from '../../context/BankDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { SentinelRiskEngine } from '../../engine/riskEngine';

interface ScamSimulationRunnerProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchLiveSimulation?: () => void;
}

type SimulationStep = 1 | 2 | 3 | 4 | 5 | 6;

export const ScamSimulationRunner: React.FC<ScamSimulationRunnerProps> = ({
  isOpen,
  onClose,
  onLaunchLiveSimulation
}) => {
  const { setPersonaById } = useAuth();
  const { preventTransaction } = useBankData();
  const { speakText, voiceGuidance } = useAccessibility();

  const [currentStep, setCurrentStep] = useState<SimulationStep>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isPlaying && isOpen) {
      timer = setTimeout(() => {
        if (currentStep < 6) {
          setCurrentStep((prev: SimulationStep) => (prev + 1) as SimulationStep);
        } else {
          setIsPlaying(false);
        }
      }, 4500);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, isOpen]);

  // Voice narration for each step when playing
  useEffect(() => {
    if (!isOpen) return;

    if (currentStep === 1) {
      setPersonaById('cust-meena');
    } else if (currentStep === 3) {
      speakText('Risk engine evaluated the payment: 91 out of 100, High Risk.');
    } else if (currentStep === 4) {
      speakText('Pause and verify safety intervention triggered.');
    } else if (currentStep === 6) {
      speakText('Transaction successfully protected. Eighty thousand rupees saved.');
    }
  }, [currentStep, isOpen]);

  if (!isOpen) return null;

  const stepsList = [
    { num: 1, title: 'Normal Behavior', subtitle: 'Customer Baseline' },
    { num: 2, title: 'The Attack', subtitle: 'Urgent ₹80K Request' },
    { num: 3, title: 'Risk Engine', subtitle: '91/100 High Risk' },
    { num: 4, title: 'Pause & Verify', subtitle: 'Intervention Screen' },
    { num: 5, title: 'Sentinel AI', subtitle: 'Scam Diagnosis' },
    { num: 6, title: 'Zero Loss', subtitle: 'Funds Protected' }
  ];

  const handleApplyToLiveApp = () => {
    // Actually inject the prevented transaction into the live data store
    const dummyRisk = SentinelRiskEngine.evaluate({
      customer: {
        id: 'cust-meena',
        name: 'Meena Sharma',
        age: 68,
        role: 'Senior Citizen',
        experienceLevel: 'Beginner',
        accountNumber: '•••• •••• 4892',
        ifsc: 'SBIN0001244',
        balance: 284500,
        avatar: '',
        phone: '',
        email: '',
        city: 'Pune',
        normalDevice: 'Samsung Galaxy M31',
        typicalMinAmount: 500,
        typicalMaxAmount: 5000,
        averageTransactionAmount: 2500,
        knownBeneficiariesCount: 8,
        trustedContacts: [],
        securityScore: 94,
        bio: ''
      },
      amount: 80000,
      beneficiary: { name: 'Ravi Kumar', accountNumber: '•••• •••• 6712', ifsc: 'SBIN0019482', isNew: true },
      device: 'Unrecognized Device',
      isUnfamiliarDevice: true,
      isUnusualTime: true,
      rapidTransactionCount: 1,
      purpose: 'Digital Arrest Clearance',
      method: 'UPI'
    });

    preventTransaction({
      recipientName: 'Ravi Kumar (Suspected Mule)',
      recipientAccount: '•••• •••• 6712',
      recipientBank: 'State Bank of India',
      amount: 80000,
      purpose: 'Digital Arrest Clearance',
      method: 'UPI',
      riskResult: dummyRisk,
      deviceUsed: 'Unknown Chrome / Linux Device',
      reason: 'Hackathon Scam Simulation Protected'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div 
        className="bg-slate-900 rounded-3xl max-w-4xl w-full text-white shadow-2xl border border-slate-800 flex flex-col overflow-hidden my-auto"
        role="dialog"
        aria-label="Fraud Prevention Hackathon Demo"
      >
        {/* Top Showcase Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-600 flex items-center justify-center shadow-lg shadow-rose-600/30">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base text-white tracking-tight">
                  Hackathon Presentation Showcase
                </span>
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  End-to-End Prevention Story
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Demonstrating proactive zero-loss intervention for vulnerable senior customers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${
                isPlaying ? 'bg-amber-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              <span>{isPlaying ? 'Pause Auto-Play' : 'Auto-Play Story'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stepper Timeline Header */}
        <div className="px-6 py-3.5 bg-slate-900 border-b border-slate-800 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[620px] gap-2">
            {stepsList.map(s => {
              const isCurrent = currentStep === s.num;
              const isPast = currentStep > s.num;

              return (
                <div
                  key={s.num}
                  onClick={() => setCurrentStep(s.num as SimulationStep)}
                  className={`flex-1 p-2 rounded-xl cursor-pointer transition-all border ${
                    isCurrent
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-sm'
                      : isPast
                      ? 'bg-slate-800/60 border-slate-700 text-emerald-400'
                      : 'bg-slate-900/40 border-slate-800/60 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                      isCurrent
                        ? 'bg-blue-500 text-white'
                        : isPast
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isPast ? '✓' : s.num}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 truncate mt-0.5">
                    {s.subtitle}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Presentation Stage */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {/* STEP 1: Normal Behavior Baseline */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Phase 1 of 6: Customer Behavioral Baseline
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Meet Meena Sharma (Age 68, Retired Teacher)
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Meena lives in Pune. She is a beginner digital banking user who primarily pays regular utility bills (MSEDCL Electricity), pharmacy prescriptions (Apollo Pharmacy), and occasional gifts to her granddaughter.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Normal Spending Range</span>
                  <span className="text-xl font-bold text-white">₹500 – ₹5,000</span>
                  <span className="text-slate-400 block text-[10px]">Average: ₹2,500</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Registered Device</span>
                  <span className="text-xl font-bold text-white">Samsung Galaxy M31</span>
                  <span className="text-slate-400 block text-[10px]">Pune home IP</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Trusted Emergency Contact</span>
                  <span className="text-xl font-bold text-emerald-400">Aarav Sharma</span>
                  <span className="text-slate-400 block text-[10px]">Son & Primary Guardian</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: The Attack */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Phase 2 of 6: The Attack Trigger
                </span>
              </div>
              <h3 className="text-2xl font-black text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-7 h-7 text-rose-500" />
                <span>The Attack: "Digital Arrest" Coercion</span>
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                At 2:15 AM, Meena receives a panic-inducing video call from a scammer posing as a Mumbai Crime Branch officer. He claims her Aadhaar is linked to illegal contraband and demands an immediate transfer of <span className="text-white font-bold">₹80,000</span> to a newly created "escrow clearance" account belonging to "Ravi Kumar".
              </p>

              <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-800/80 text-xs space-y-2">
                <div className="font-bold text-rose-300 uppercase tracking-wider text-[11px]">
                  Scam Vector Signature Detected:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-200">
                  <div className="p-2.5 rounded-lg bg-black/40">
                    <span className="text-slate-400 text-[10px] block">Transfer Amount</span>
                    <span className="font-bold text-rose-400 text-sm">₹80,000 (32x normal)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40">
                    <span className="text-slate-400 text-[10px] block">Beneficiary</span>
                    <span className="font-bold text-rose-400 text-sm">Ravi Kumar (Added 15m ago)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40">
                    <span className="text-slate-400 text-[10px] block">Device Signature</span>
                    <span className="font-bold text-rose-400 text-sm">Unfamiliar Device</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40">
                    <span className="text-slate-400 text-[10px] block">Time of Day</span>
                    <span className="font-bold text-rose-400 text-sm">2:15 AM (Unusual)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Risk Engine Calculation */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Phase 3 of 6: Transparent Risk Engine Decomposition
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-2xl font-black text-white">
                  Risk Engine Computes: <span className="text-rose-500">91 / 100 HIGH RISK</span>
                </h3>
                <span className="bg-rose-500 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Critical Intervention Triggered
                </span>
              </div>

              {/* Exact Hackathon Math Matrix */}
              <div className="p-5 rounded-2xl bg-black/40 border border-slate-800 font-mono text-xs space-y-2">
                <div className="text-slate-400 text-[11px] pb-2 border-b border-slate-800 flex justify-between font-bold">
                  <span>RISK SIGNAL FACTOR</span>
                  <span>POINTS ADDED</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Amount anomaly (₹80,000 vs avg ₹2,500)</span>
                  <span className="text-rose-400 font-bold">+25 pts</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>New beneficiary (Ravi Kumar &lt; 24 hrs)</span>
                  <span className="text-rose-400 font-bold">+20 pts</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>New unfamiliar device & IP</span>
                  <span className="text-rose-400 font-bold">+15 pts</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Unusual transaction time (2:15 AM)</span>
                  <span className="text-rose-400 font-bold">+10 pts</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Behavior & velocity anomaly</span>
                  <span className="text-rose-400 font-bold">+12 pts</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Senior vulnerable customer protection profile</span>
                  <span className="text-rose-400 font-bold">+9 pts</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-white">
                  <span>TOTAL COMPOSITE RISK SCORE</span>
                  <span className="text-rose-400 font-black">91 / 100</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Pause & Verify Intervention */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Phase 4 of 6: Adaptive Safety Intervention
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">
                🚨 "Pause & Verify" Screen Halts The Transaction
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Instead of processing the payment silently, SentinelBank AI displays the non-alarming safety barrier. It explains the risk in plain human terms and gives Meena immediate choices.
              </p>

              <div className="p-5 rounded-2xl bg-white text-slate-900 max-w-md mx-auto shadow-2xl border-2 border-rose-500 space-y-3">
                <div className="flex items-center gap-2 text-rose-600 font-extrabold text-sm">
                  <ShieldAlert className="w-5 h-5" />
                  <span>Pause and Verify (Sentinel AI)</span>
                </div>
                <p className="text-xs text-slate-700">
                  You are sending ₹80,000 to Ravi Kumar.
                  <br />
                  <span className="font-bold block mt-1">Why are we asking you to pause?</span>
                  • This is a new recipient
                  <br />
                  • Amount is much higher than usual
                  <br />
                  • Unusual late-night transfer
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  <div className="p-2.5 bg-slate-900 text-white rounded-lg text-center font-bold text-xs">
                    Cancel Transaction (Safest)
                  </div>
                  <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-lg text-center font-bold text-xs border border-indigo-200">
                    I Need Help (Sentinel AI Assistant)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Sentinel AI Scam Explanation */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Phase 5 of 6: AI Social Engineering Counseling
                </span>
              </div>
              <h3 className="text-2xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <span>Sentinel AI Detects Digital Arrest Script</span>
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Meena asks: <em>"Someone called saying my bank account is linked to illegal narcotics and I am under digital arrest."</em> Sentinel AI instantly identifies the extortion pattern and calms the customer.
              </p>

              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 max-w-xl mx-auto text-xs space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Sentinel AI Assistant:</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2 leading-relaxed">
                  <p className="text-rose-400 font-bold">
                    ⚠️ Critical Warning: Suspected "Digital Arrest" Extortion Scam.
                  </p>
                  <p>
                    Under Indian criminal law, there is <strong>NO concept of "Digital Arrest."</strong> Real police officers never conduct arrests over WhatsApp/Skype video calls, nor do they demand money transfers to private bank accounts.
                  </p>
                  <p className="text-emerald-400 font-semibold">
                    Action: We recommend cancelling this payment immediately and alerting your son Aarav.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Zero Loss Protection */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Phase 6 of 6: Mission Accomplished
                </span>
              </div>
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 border border-emerald-500/50 shadow-2xl text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <div>
                  <span className="bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    Zero Financial Loss
                  </span>
                  <h3 className="text-3xl font-black text-white mt-2">
                    ₹80,000 Successfully Protected!
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-xl mx-auto leading-relaxed">
                    Son Aarav Sharma verified the scam and declined the transfer. The transaction was aborted before a single rupee left Meena's account.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleApplyToLiveApp}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    View Protected Record in Banking Dashboard →
                  </button>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Story</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1) as SimulationStep)}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 ${
              currentStep === 1 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:text-white bg-slate-800'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Phase</span>
          </button>

          <span className="text-slate-500 text-[11px] font-medium hidden sm:inline">
            Use for Judge Q&A and Product Walkthrough
          </span>

          <button
            disabled={currentStep === 6}
            onClick={() => setCurrentStep(prev => Math.min(6, prev + 1) as SimulationStep)}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 ${
              currentStep === 6 ? 'text-slate-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            <span>Next Phase</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
