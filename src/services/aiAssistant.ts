import { ChatMessage, ScamAnalysisResult } from '../types/ai';

export interface AIServiceConfig {
  apiKey?: string;
  model?: string;
  useLiveAPI?: boolean;
}

class AIAssistantService {
  private config: AIServiceConfig = {
    apiKey: '',
    model: 'gemini-1.5-flash',
    useLiveAPI: false
  };

  public setConfig(config: Partial<AIServiceConfig>) {
    this.config = { ...this.config, ...config };
  }

  /**
   * Evaluates user situation for financial scam patterns and returns conversational advice.
   */
  public async analyzeAndRespond(userMessage: string, context?: {
    customerName?: string;
    transferAmount?: number;
    recipientName?: string;
    riskScore?: number;
  }): Promise<ChatMessage> {
    // If live API key is configured in future, call real LLM endpoint here:
    if (this.config.useLiveAPI && this.config.apiKey) {
      try {
        return await this.callLiveLLM(userMessage, context);
      } catch (err) {
        console.warn('Live LLM call failed, falling back to Sentinel AI expert engine:', err);
      }
    }

    // Expert Rule & Heuristic Engine simulating state-of-the-art LLM safety diagnosis
    const analysis = this.detectScamPattern(userMessage);

    let responseText = '';
    let categoryDetected = analysis.category;
    let confidence = analysis.confidence;
    let urgency: 'low' | 'medium' | 'high' | 'critical' = 'high';

    if (analysis.isScamLikely) {
      urgency = 'critical';
      responseText = `⚠️ **Critical Scam Warning: ${analysis.threatSummary}**\n\n` +
        `${analysis.reasoning}\n\n` +
        `**Key Danger Signs Identified:**\n` +
        analysis.warningPoints.map(p => `• ${p}`).join('\n') +
        `\n\n**What You Should Do Immediately:**\n` +
        analysis.immediateSteps.map(s => `1. ${s}`).join('\n') +
        `\n\n🛡️ *Remember: Legitimate police officers, bank managers, and government departments will NEVER demand an instant money transfer to a private bank account.*`;
    } else {
      urgency = 'medium';
      responseText = `I have analyzed your situation carefully.\n\n` +
        `While this does not immediately match a known digital arrest or phishing script, because the transfer involves an unverified recipient or unusual amount, extreme caution is warranted.\n\n` +
        `**Safety Checklist Before Proceeding:**\n` +
        `• Have you personally met or spoken on a verified number with ${context?.recipientName || 'the recipient'}?\n` +
        `• Did someone instruct you not to disconnect the phone or keep this secret from family?\n` +
        `• Never share OTPs, passwords, or install remote access software (AnyDesk, TeamViewer).\n\n` +
        `Would you like to verify this with your designated family contact or Sentinel Bank Concierge first?`;
    }

    return {
      id: `ai-msg-${Date.now()}`,
      sender: 'assistant',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      scamCategoryDetected: categoryDetected,
      confidenceScore: confidence,
      urgencyLevel: urgency,
      quickActions: [
        { label: 'Cancel Transaction (Recommended)', action: 'CANCEL_TRANSACTION', variant: 'danger' },
        { label: 'Verify with Trusted Contact', action: 'VERIFY_TRUSTED', variant: 'primary' },
        { label: 'Contact Bank Helpline (1800-SENTINEL)', action: 'CONTACT_BANK', variant: 'outline' },
        { label: 'Report to Cybercrime (1930)', action: 'REPORT_1930', variant: 'secondary' }
      ]
    };
  }

  private detectScamPattern(input: string): {
    isScamLikely: boolean;
    category: string;
    confidence: number;
    threatSummary: string;
    reasoning: string;
    warningPoints: string[];
    immediateSteps: string[];
  } {
    const text = input.toLowerCase();

    // 1. Digital Arrest / Police / CBI / Crime Branch / Narcotics / Court
    if (
      text.includes('digital arrest') ||
      text.includes('cbi') ||
      text.includes('police') ||
      text.includes('crime branch') ||
      text.includes('customs') ||
      text.includes('illegal parcel') ||
      text.includes('passport') ||
      text.includes('narcotics') ||
      text.includes('supreme court') ||
      text.includes('money laundering') ||
      text.includes('escrow')
    ) {
      return {
        isScamLikely: true,
        category: 'Digital Arrest / Law Enforcement Impersonation',
        confidence: 98,
        threatSummary: 'Suspected "Digital Arrest" Extortion Scam',
        reasoning: 'Scammers impersonate police, CBI, or customs officials on video calls. They falsely claim your Aadhaar is linked to narcotics or money laundering and force victims into a fake "digital arrest," demanding urgent deposits to "government escrow" accounts.',
        warningPoints: [
          'Indian law does NOT have any concept called "Digital Arrest". No court or police agency operates arrests via video calls.',
          'Government agencies never ask citizens to transfer money to personal bank accounts for clearance.',
          'Scammers use fake badges, police uniform backdrops, and forged letterheads to create immense panic.'
        ],
        immediateSteps: [
          'Cancel this transaction immediately — do not send any money.',
          'Hang up the call immediately. You are in NO legal danger.',
          'Notify your family members or designated trusted contact.',
          'Report the phone number immediately to the National Cybercrime Portal by dialing 1930.'
        ]
      };
    }

    // 2. Bank KYC / Account Block / PAN update
    if (
      text.includes('kyc') ||
      text.includes('account blocked') ||
      text.includes('account will be blocked') ||
      text.includes('pan card') ||
      text.includes('bank manager') ||
      text.includes('update kyc') ||
      text.includes('suspend') ||
      text.includes('hold on account')
    ) {
      return {
        isScamLikely: true,
        category: 'Bank Impersonation & KYC Phishing',
        confidence: 95,
        threatSummary: 'Urgent KYC Expiry / Bank Impersonation Scam',
        reasoning: 'Fraudsters send fake SMS messages or call claiming your bank account will be frozen within hours unless you complete KYC or make a test transfer.',
        warningPoints: [
          'Banks never freeze accounts with zero notice via SMS links.',
          'KYC updates NEVER require you to transfer money to another account or share OTPs.',
          'Legitimate banks never threaten immediate disconnection or suspension over a phone call.'
        ],
        immediateSteps: [
          'Cancel the transaction and ignore the SMS link.',
          'Call SentinelBank official support directly at 1800-SENTINEL or visit your nearest branch.',
          'Do not share any OTP, UPI PIN, or NetBanking password.'
        ]
      };
    }

    // 3. Electricity / Water / Utility cutoff
    if (
      text.includes('electricity') ||
      text.includes('power cut') ||
      text.includes('power will be disconnected') ||
      text.includes('bill not updated') ||
      text.includes('light bill') ||
      text.includes('utility')
    ) {
      return {
        isScamLikely: true,
        category: 'Utility Bill Disconnection Scam',
        confidence: 96,
        threatSummary: 'Fake Electricity Disconnection Fraud',
        reasoning: 'Fraudsters send spoofed messages threatening that power will be cut off tonight at 9:30 PM due to an unpaid bill, directing victims to call a personal phone number.',
        warningPoints: [
          'Electricity distribution companies (like MSEDCL, BESCOM, Tata Power) never send personal mobile numbers for bill payments.',
          'Official bills must only be paid through authorized consumer portals or verified biller payment systems.',
          'Scammers create false panic of immediate darkness to force impulsive transfers.'
        ],
        immediateSteps: [
          'Cancel the transfer to this private individual.',
          'Check your official electricity bill on the official provider app or consumer website.',
          'Do not install any remote support apps sent by the caller.'
        ]
      };
    }

    // 4. Remote screen sharing / AnyDesk / QuickSupport
    if (
      text.includes('anydesk') ||
      text.includes('teamviewer') ||
      text.includes('quicksupport') ||
      text.includes('rustdesk') ||
      text.includes('screen share') ||
      text.includes('install app') ||
      text.includes('download app')
    ) {
      return {
        isScamLikely: true,
        category: 'Remote Access Tool Hijack',
        confidence: 99,
        threatSummary: 'Device Screen Takeover Fraud',
        reasoning: 'The caller is tricking you into installing remote desktop software. Once installed, they can see your screen, record your banking passwords, and silently intercept OTPs.',
        warningPoints: [
          'No bank representative or genuine customer service will ever ask you to install AnyDesk or QuickSupport.',
          'Sharing your screen allows the caller complete control over your mobile device.',
          'Even if the caller sounds courteous, they will drain your account once they view your PIN.'
        ],
        immediateSteps: [
          'Immediately disconnect and uninstall AnyDesk / QuickSupport from your phone.',
          'Cancel this transaction right now.',
          'Turn off Wi-Fi/Mobile Data for 2 minutes to sever their connection.',
          'Call Sentinel Bank to temporarily freeze online transactions for safety.'
        ]
      };
    }

    // 5. Work-from-home / Telegram / YouTube task scam / Lottery
    if (
      text.includes('telegram') ||
      text.includes('youtube') ||
      text.includes('part-time') ||
      text.includes('daily return') ||
      text.includes('vip level') ||
      text.includes('rating') ||
      text.includes('lottery') ||
      text.includes('prize') ||
      text.includes('crypto deposit')
    ) {
      return {
        isScamLikely: true,
        category: 'Task Investment / Advance Fee Fraud',
        confidence: 94,
        threatSummary: 'Task Scam & Fake Investment Trap',
        reasoning: 'Scammers recruit victims via Telegram or WhatsApp for simple tasks like liking videos, pay a small initial token (₹200-₹500) to gain trust, and then demand large deposits to "withdraw profits."',
        warningPoints: [
          'You can never withdraw the deposited money; scammers will continuously invent "tax" or "upgrade" fees.',
          'Genuine employers do not ask you to pay money to receive salary.',
          'Telegram investment groups are staged with fake accounts pretending to make profits.'
        ],
        immediateSteps: [
          'Do NOT send the money. You will lose every rupee transferred.',
          'Block the Telegram recruiter and leave the group immediately.',
          'Report the group to Cybercrime (1930).'
        ]
      };
    }

    // Generic urgency or pressure check
    if (text.includes('urgent') || text.includes('hurry') || text.includes('immediately') || text.includes('threat') || text.includes('scared')) {
      return {
        isScamLikely: true,
        category: 'High-Urgency Social Engineering',
        confidence: 85,
        threatSummary: 'High-Urgency Pressure Trap',
        reasoning: 'The situation exhibits artificial urgency designed to bypass your logical reflection and prevent you from consulting loved ones.',
        warningPoints: [
          'Artificial urgency ("transfer in 10 minutes or suffer consequences") is the #1 hallmark of social engineering scams.',
          'Genuine financial institutions provide clear written documentation and dispute windows.'
        ],
        immediateSteps: [
          'Pause and take a deep breath. Stop the payment.',
          'Consult a trusted family member or call our Bank Concierge desk.'
        ]
      };
    }

    return {
      isScamLikely: false,
      category: 'Unverified Large Transfer',
      confidence: 60,
      threatSummary: 'Unverified Transaction Precaution',
      reasoning: 'Transfer involves parameters deviating from historical baseline.',
      warningPoints: ['Verify recipient identity in person or via trusted channels.'],
      immediateSteps: ['Ensure recipient credentials match official records.']
    };
  }

  private async callLiveLLM(userMessage: string, context?: any): Promise<ChatMessage> {
    // Scaffold for real Gemini / OpenAI API call if user configures a key
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + this.config.apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are Sentinel AI, an intelligent safety assistant built into SentinelBank to protect vulnerable customers (senior citizens, novice digital users) from banking fraud, digital arrest scams, and social engineering.
Context: Customer is sending ₹${context?.transferAmount || 0} to ${context?.recipientName || 'unknown'}. Risk score: ${context?.riskScore || 0}/100.
Customer message: "${userMessage}".
Give a clear, empathetic, authoritative response explaining if this is a scam, why, and step-by-step advice. Keep it non-technical and easy to read.`
          }]
        }]
      })
    });
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Scam analysis completed.';
    return {
      id: `ai-live-${Date.now()}`,
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      scamCategoryDetected: 'AI Live Diagnosis',
      confidenceScore: 92,
      urgencyLevel: 'high',
      quickActions: [
        { label: 'Cancel Transaction', action: 'CANCEL_TRANSACTION', variant: 'danger' },
        { label: 'Verify with Trusted Contact', action: 'VERIFY_TRUSTED', variant: 'primary' },
        { label: 'Contact Bank Helpline', action: 'CONTACT_BANK', variant: 'outline' }
      ]
    };
  }
}

export const aiAssistantService = new AIAssistantService();
