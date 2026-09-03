import { AdminMetrics, FraudTrendPoint, FraudIndicatorStat, AuditLogEntry } from '../types/admin';

export const INITIAL_ADMIN_METRICS: AdminMetrics = {
  totalTransactions: 18450,
  transactionsAnalyzed: 18450,
  suspiciousTransactions: 412,
  highRiskInterventions: 94,
  transactionsPrevented: 88,
  estimatedAmountProtectedINR: 18450000, // ₹1.84 Crores
  vulnerableCustomerProtectionRate: 98.6,
  activeGuardsCount: 3
};

export const FRAUD_TREND_DATA: FraudTrendPoint[] = [
  { timeLabel: 'Mon', lowRisk: 2400, mediumRisk: 42, highRisk: 14, prevented: 12 },
  { timeLabel: 'Tue', lowRisk: 2890, mediumRisk: 55, highRisk: 18, prevented: 17 },
  { timeLabel: 'Wed', lowRisk: 3100, mediumRisk: 61, highRisk: 12, prevented: 11 },
  { timeLabel: 'Thu', lowRisk: 2750, mediumRisk: 48, highRisk: 16, prevented: 15 },
  { timeLabel: 'Fri', lowRisk: 3420, mediumRisk: 74, highRisk: 22, prevented: 21 },
  { timeLabel: 'Sat', lowRisk: 1980, mediumRisk: 82, highRisk: 28, prevented: 27 },
  { timeLabel: 'Sun (Today)', lowRisk: 1910, mediumRisk: 50, highRisk: 19, prevented: 18 }
];

export const FRAUD_INDICATOR_STATS: FraudIndicatorStat[] = [
  { name: 'Digital Arrest / Police Impersonation', count: 42, percentage: 38, color: '#ef4444' },
  { name: 'Bank KYC Expiry Phishing', count: 28, percentage: 25, color: '#f59e0b' },
  { name: 'Remote Access / AnyDesk Takeover', count: 18, percentage: 16, color: '#ec4899' },
  { name: 'Fake Electricity Disconnection', count: 14, percentage: 13, color: '#8b5cf6' },
  { name: 'Telegram Task / Crypto Scam', count: 9, percentage: 8, color: '#3b82f6' }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-8891',
    timestamp: '2026-09-03T14:45:00Z',
    customerId: 'cust-meena',
    customerName: 'Meena Sharma',
    customerRole: 'Senior Citizen',
    customerExperience: 'Beginner',
    amount: 80000,
    recipientName: 'Ravi Kumar (Suspected Mule)',
    recipientAccount: '•••• •••• 6712',
    recipientBank: 'SBI Patna',
    deviceUsed: 'Unknown Chrome / Linux Device (Unrecognized)',
    riskScore: 91,
    riskLevel: 'HIGH',
    status: 'PREVENTED',
    socialEngineeringClues: [
      'Call in progress during payment initiation',
      'Sudden ₹80,000 transfer (normal avg ₹2,500)',
      'Unverified beneficiary created 15 minutes ago',
      'Caller claim matches Digital Arrest script'
    ],
    breakdown: [
      { id: 'amt', name: 'Amount Anomaly', points: 25, maxPoints: 30, description: '₹80,000 is 32x customer average (₹2,500)', isFlagged: true, severity: 'critical' },
      { id: 'ben', name: 'New Beneficiary', points: 20, maxPoints: 25, description: 'Recipient created <24 hours ago, no transaction history', isFlagged: true, severity: 'critical' },
      { id: 'dev', name: 'Unfamiliar Device', points: 15, maxPoints: 15, description: 'Device fingerprint unrecognized; typical device is Samsung Galaxy M31', isFlagged: true, severity: 'critical' },
      { id: 'time', name: 'Unusual Transaction Time', points: 10, maxPoints: 10, description: 'Initiated at 2:15 AM outside normal active hours', isFlagged: true, severity: 'caution' },
      { id: 'freq', name: 'Behavior & Frequency', points: 12, maxPoints: 12, description: 'Urgent transfer flow without browsing normal account details', isFlagged: true, severity: 'caution' },
      { id: 'vuln', name: 'Vulnerability Multiplier', points: 9, maxPoints: 10, description: 'Senior citizen protection multiplier activated for composite risk', isFlagged: true, severity: 'critical' }
    ],
    officerActionTaken: 'Flagged as confirmed digital arrest fraud. Mule account SBIN0019482 notified to Nodal Officer.'
  },
  {
    id: 'aud-8890',
    timestamp: '2026-09-03T11:10:00Z',
    customerId: 'cust-ramesh',
    customerName: 'Ramesh Patel',
    customerRole: 'First-Time Digital Banking User',
    customerExperience: 'Novice',
    amount: 35000,
    recipientName: 'Cyber Security Escrow Account',
    recipientAccount: '•••• •••• 4419',
    recipientBank: 'Yes Bank',
    deviceUsed: 'Redmi Note 11 (Screen share tool detected)',
    riskScore: 84,
    riskLevel: 'HIGH',
    status: 'PREVENTED',
    socialEngineeringClues: ['Fake customer care APK detected in background', 'Escrow account terminology used'],
    breakdown: [
      { id: 'amt', name: 'Amount Anomaly', points: 22, maxPoints: 30, description: '₹35,000 exceeds usual merchant transactions', isFlagged: true, severity: 'critical' },
      { id: 'ben', name: 'New Beneficiary', points: 20, maxPoints: 25, description: 'Recipient added 5 minutes ago', isFlagged: true, severity: 'critical' },
      { id: 'dev', name: 'Screen Share Indicator', points: 15, maxPoints: 15, description: 'Screen overlay app active during payment', isFlagged: true, severity: 'critical' },
      { id: 'time', name: 'Time of Day', points: 4, maxPoints: 10, description: 'Daytime, minor flag', isFlagged: false, severity: 'safe' },
      { id: 'freq', name: 'Frequency', points: 14, maxPoints: 12, description: 'Repeated failed attempts', isFlagged: true, severity: 'caution' },
      { id: 'vuln', name: 'Novice Shield', points: 9, maxPoints: 10, description: 'First-time user protection applied', isFlagged: true, severity: 'critical' }
    ],
    officerActionTaken: 'Payment blocked. Customer called by branch safety concierge.'
  },
  {
    id: 'aud-8889',
    timestamp: '2026-09-02T19:22:00Z',
    customerId: 'cust-priya',
    customerName: 'Priya Verma',
    customerRole: 'Regular Customer',
    customerExperience: 'Tech-Savvy',
    amount: 14500,
    recipientName: 'Prestige Apartments HOA',
    recipientAccount: '•••• •••• 1188',
    recipientBank: 'Kotak Mahindra Bank',
    deviceUsed: 'iPhone 15 Pro (Known)',
    riskScore: 5,
    riskLevel: 'LOW',
    status: 'COMPLETED',
    breakdown: [
      { id: 'amt', name: 'Amount Anomaly', points: 2, maxPoints: 30, description: 'Within normal tech salary transfer range', isFlagged: false, severity: 'safe' },
      { id: 'ben', name: 'Beneficiary Check', points: 0, maxPoints: 25, description: 'Existing verified beneficiary (>1 year)', isFlagged: false, severity: 'safe' },
      { id: 'dev', name: 'Device Signature', points: 0, maxPoints: 15, description: 'Registered primary device', isFlagged: false, severity: 'safe' },
      { id: 'time', name: 'Time', points: 1, maxPoints: 10, description: 'Normal evening transfer', isFlagged: false, severity: 'safe' },
      { id: 'freq', name: 'Frequency', points: 2, maxPoints: 12, description: 'Single monthly recurring transfer', isFlagged: false, severity: 'safe' },
      { id: 'vuln', name: 'Vulnerability Check', points: 0, maxPoints: 10, description: 'Experienced user, no multiplier', isFlagged: false, severity: 'safe' }
    ]
  }
];
