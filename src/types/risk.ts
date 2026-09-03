import { CustomerPersona, Beneficiary, PaymentMethod } from './banking';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RiskFactorItem {
  id: string;
  name: string;
  points: number;
  maxPoints: number;
  description: string;
  isFlagged: boolean;
  severity: 'safe' | 'caution' | 'critical';
}

export interface RiskEvaluationRequest {
  customer: CustomerPersona;
  amount: number;
  beneficiary: Beneficiary | { name: string; accountNumber: string; ifsc: string; isNew: boolean };
  device: string;
  isUnfamiliarDevice: boolean;
  timeOfDayHour?: number; // 0-23
  isUnusualTime?: boolean;
  purpose: string;
  method: PaymentMethod;
  rapidTransactionCount?: number; // recent transfers in last 10 mins
  remoteAccessAppDetected?: boolean; // AnyDesk, TeamViewer etc
}

export interface RiskEvaluationResult {
  score: number; // 0 to 100
  level: RiskLevel;
  breakdown: RiskFactorItem[];
  title: string;
  humanExplanation: string[];
  recommendedAction: 'ALLOW' | 'VERIFY_MEDIUM' | 'PAUSE_AND_VERIFY';
  suggestedPromptForAI?: string;
  timestamp: string;
}
