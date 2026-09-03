export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  scamCategoryDetected?: string;
  confidenceScore?: number; // 0-100
  urgencyLevel?: 'low' | 'medium' | 'high' | 'critical';
  quickActions?: {
    label: string;
    action: 'CANCEL_TRANSACTION' | 'CONTACT_BANK' | 'REPORT_1930' | 'VERIFY_TRUSTED' | 'GO_BACK';
    variant: 'danger' | 'primary' | 'outline' | 'secondary';
  }[];
}

export interface ScamScenario {
  id: string;
  title: string;
  subtitle: string;
  userPrompt: string;
  category: 'DIGITAL_ARREST' | 'BANK_KYC_IMPERSONATION' | 'UTILITY_CUTOFF' | 'TASK_LOTTERY' | 'ANYDESK_REMOTE';
  badgeColor: string;
  attackerClaim: string;
}

export interface ScamAnalysisResult {
  isScamLikely: boolean;
  category: string;
  confidence: number;
  threatSummary: string;
  warningPoints: string[];
  safeActionRecommendations: string[];
}
