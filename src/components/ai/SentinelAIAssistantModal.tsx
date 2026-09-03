import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  ShieldAlert, 
  PhoneCall, 
  X, 
  Volume2, 
  CornerDownLeft, 
  AlertTriangle,
  FileCheck2,
  ShieldCheck,
  Bot,
  User,
  ExternalLink
} from 'lucide-react';
import { ChatMessage, ScamScenario } from '../../types/ai';
import { SCAM_SCENARIOS } from '../../data/scamScenarios';
import { aiAssistantService } from '../../services/aiAssistant';
import { useAuth } from '../../context/AuthContext';
import { useBankData } from '../../context/BankDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';

interface SentinelAIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancelPayment?: () => void;
  onOpenTrustedContactModal?: () => void;
}

export const SentinelAIAssistantModal: React.FC<SentinelAIAssistantModalProps> = ({
  isOpen,
  onClose,
  onCancelPayment,
  onOpenTrustedContactModal
}) => {
  const { currentPersona } = useAuth();
  const { preventTransaction } = useBankData();
  const { speakText, voiceGuidance } = useAccessibility();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Hello ${currentPersona.name.split(' ')[0]}. I am **Sentinel AI**, your personal banking safety companion.\n\n` +
        `If someone called, texted, or pressured you to transfer money, tell me what happened. I will analyze if it matches known financial scams before you make any payment.\n\n` +
        `*Click any scenario below or type your own question:*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: 'Verify with Trusted Contact', action: 'VERIFY_TRUSTED', variant: 'primary' },
        { label: 'Bank Helpline (1800-SENTINEL)', action: 'CONTACT_BANK', variant: 'outline' }
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const assistantMsg = await aiAssistantService.analyzeAndRespond(query, {
        customerName: currentPersona.name,
        transferAmount: 80000,
        recipientName: 'Ravi Kumar',
        riskScore: 91
      });

      setMessages(prev => [...prev, assistantMsg]);

      // If voice guidance enabled, speak AI diagnosis
      if (voiceGuidance) {
        const spokenExcerpt = assistantMsg.scamCategoryDetected 
          ? `Warning: This appears to be a ${assistantMsg.scamCategoryDetected}. We recommend cancelling the payment immediately.`
          : 'I have analyzed your situation. Please be cautious and verify with a trusted contact.';
        speakText(spokenExcerpt);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    if (action === 'CANCEL_TRANSACTION') {
      if (onCancelPayment) {
        onCancelPayment();
      }
      onClose();
    } else if (action === 'VERIFY_TRUSTED') {
      if (onOpenTrustedContactModal) {
        onOpenTrustedContactModal();
      }
      onClose();
    } else if (action === 'CONTACT_BANK') {
      alert('Dialing SentinelBank Senior Safety Concierge: 1800-SENTINEL (Toll Free, 24/7)');
    } else if (action === 'REPORT_1930') {
      alert('Redirecting to National Cybercrime Reporting Portal (dial 1930 or visit cybercrime.gov.in)');
    } else if (action === 'GO_BACK') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full h-[620px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        role="dialog"
        aria-label="Sentinel AI Safety Assistant"
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-950 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner">
              <Sparkles className="w-6 h-6 text-blue-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">Sentinel AI</h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Scam Diagnosis Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Helping you identify social engineering and illegal coercion
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Scam Scenarios Carousel/Chips */}
        <div className="bg-slate-100/80 border-b border-slate-200 px-4 py-2.5 flex-shrink-0 overflow-x-auto">
          <div className="flex items-center gap-2 whitespace-nowrap text-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Test Real Scenarios:
            </span>
            {SCAM_SCENARIOS.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => handleSendMessage(scenario.userPrompt)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 text-[11px] font-medium transition-colors shadow-2xs"
              >
                {scenario.title}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Message Thread */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {messages.map(msg => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 space-y-2 shadow-sm ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  {/* Category Header if present */}
                  {msg.scamCategoryDetected && (
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/80">
                      <span className="inline-flex items-center gap-1 font-bold text-[11px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        {msg.scamCategoryDetected}
                      </span>
                      {msg.confidenceScore && (
                        <span className="text-[10px] font-semibold text-slate-500">
                          {msg.confidenceScore}% Confidence
                        </span>
                      )}
                    </div>
                  )}

                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </div>

                  {/* Audio Vocalize Button for AI Answers */}
                  {!isUser && (
                    <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 text-[10px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => speakText(msg.text, true)}
                        className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Read aloud</span>
                      </button>
                    </div>
                  )}

                  {/* Action Buttons inside chat message */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="pt-3 flex flex-wrap gap-2">
                      {msg.quickActions.map((qa, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(qa.action)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-2xs transition-all ${
                            qa.variant === 'danger'
                              ? 'bg-rose-600 text-white hover:bg-rose-700'
                              : qa.variant === 'primary'
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : qa.variant === 'outline'
                              ? 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100'
                              : 'bg-slate-800 text-white hover:bg-slate-700'
                          }`}
                        >
                          {qa.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Sentinel AI is analyzing threat patterns & legal statutes...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex-shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="e.g. 'Someone called saying my bank account will be blocked unless I transfer ₹80,000'..."
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                inputMessage.trim() && !isLoading
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1">
            <span>Official Cybercrime Emergency: Dial 1930</span>
            <button
              onClick={onClose}
              className="text-slate-500 hover:underline"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
