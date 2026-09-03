import { RiskLevel, RiskFactorItem } from './risk';

export interface AdminMetrics {
  totalTransactions: number;
  transactionsAnalyzed: number;
  suspiciousTransactions: number;
  highRiskInterventions: number;
  transactionsPrevented: number;
  estimatedAmountProtectedINR: number; // e.g. 14200000 -> 1.42 Cr
  vulnerableCustomerProtectionRate: number; // e.g. 98.4%
  activeGuardsCount: number;
}

export interface FraudTrendPoint {
  timeLabel: string;
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
  prevented: number;
}

export interface FraudIndicatorStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  customerId: string;
  customerName: string;
  customerRole: string;
  customerExperience: string;
  amount: number;
  recipientName: string;
  recipientAccount: string;
  recipientBank: string;
  deviceUsed: string;
  riskScore: number;
  riskLevel: RiskLevel;
  breakdown: RiskFactorItem[];
  status: 'PREVENTED' | 'VERIFIED_TRUSTED' | 'CANCELLED_BY_USER' | 'COMPLETED' | 'FLAGGED_INVESTIGATION';
  socialEngineeringClues?: string[];
  officerActionTaken?: string;
}
