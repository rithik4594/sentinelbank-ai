import { Transaction, SecurityAlert } from '../types/banking';

export const INITIAL_TRANSACTIONS: Record<string, Transaction[]> = {
  'cust-meena': [
    {
      id: 'tx-m-1',
      customerId: 'cust-meena',
      recipientName: 'Apollo Pharmacy Pune',
      recipientAccount: '•••• •••• 9921',
      recipientBank: 'ICICI Bank',
      upiId: 'apollopharmacy.pune@icici',
      amount: 1840.0,
      purpose: 'Monthly Prescription & Blood Sugar Strips',
      method: 'UPI',
      timestamp: '2026-09-02T11:20:00Z',
      status: 'COMPLETED',
      riskScore: 8,
      riskLevel: 'LOW',
      isBeneficiaryNew: false,
      deviceUsed: 'Samsung Galaxy M31'
    },
    {
      id: 'tx-m-2',
      customerId: 'cust-meena',
      recipientName: 'MSEDCL Electricity Board',
      recipientAccount: '•••• •••• 5530',
      recipientBank: 'State Bank of India',
      amount: 2450.0,
      purpose: 'August Electricity Bill',
      method: 'NEFT',
      timestamp: '2026-08-28T16:15:00Z',
      status: 'COMPLETED',
      riskScore: 12,
      riskLevel: 'LOW',
      isBeneficiaryNew: false,
      deviceUsed: 'Samsung Galaxy M31'
    },
    {
      id: 'tx-m-3',
      customerId: 'cust-meena',
      recipientName: 'Aarav Sharma',
      recipientAccount: '•••• •••• 1042',
      recipientBank: 'HDFC Bank',
      upiId: 'aarav.sharma@okhdfcbank',
      amount: 5000.0,
      purpose: 'Gift for Granddaughter Birthday',
      method: 'UPI',
      timestamp: '2026-08-20T10:05:00Z',
      status: 'COMPLETED',
      riskScore: 15,
      riskLevel: 'LOW',
      isBeneficiaryNew: false,
      deviceUsed: 'Samsung Galaxy M31'
    },
    {
      id: 'tx-m-4',
      customerId: 'cust-meena',
      recipientName: 'Lakshmi Bai (House Help)',
      recipientAccount: '•••• •••• 3319',
      recipientBank: 'Punjab National Bank',
      upiId: 'lakshmibai@upi',
      amount: 4500.0,
      purpose: 'Monthly Salary',
      method: 'UPI',
      timestamp: '2026-08-01T09:30:00Z',
      status: 'COMPLETED',
      riskScore: 10,
      riskLevel: 'LOW',
      isBeneficiaryNew: false,
      deviceUsed: 'Samsung Galaxy M31'
    }
  ],
  'cust-ramesh': [
    {
      id: 'tx-r-1',
      customerId: 'cust-ramesh',
      recipientName: 'Surat Yarn Distributors',
      recipientAccount: '•••• •••• 6610',
      recipientBank: 'Bank of Baroda',
      amount: 8500.0,
      purpose: 'Cotton Yarn Spools Batch #4',
      method: 'IMPS',
      timestamp: '2026-09-01T15:00:00Z',
      status: 'COMPLETED',
      riskScore: 18,
      riskLevel: 'LOW',
      isBeneficiaryNew: false,
      deviceUsed: 'Redmi Note 11'
    },
    {
      id: 'tx-r-2',
      customerId: 'cust-ramesh',
      recipientName: 'Chirag Patel (Son)',
      recipientAccount: '•••• •••• 9940',
      recipientBank: 'HDFC Bank',
      amount: 3000.0,
      purpose: 'Household Expenses',
      method: 'UPI',
      timestamp: '2026-08-25T18:40:00Z',
      status: 'COMPLETED',
      riskScore: 12,
      riskLevel: 'LOW',
      isBeneficiaryNew: false,
      deviceUsed: 'Redmi Note 11'
    }
  ],
  'cust-priya': [
    {
      id: 'tx-p-1',
      customerId: 'cust-priya',
      recipientName: 'Prestige Apartments HOA',
      recipientAccount: '•••• •••• 1188',
      recipientBank: 'Kotak Mahindra Bank',
      amount: 14500.0,
      purpose: 'Quarterly Maintenance',
      method: 'NEFT',
      timestamp: '2026-09-02T14:10:00Z',
      status: 'COMPLETED',
      riskScore: 5,
      riskLevel: 'LOW',
      isBeneficiaryNew: false,
      deviceUsed: 'iPhone 15 Pro'
    },
    {
      id: 'tx-p-2',
      customerId: 'cust-priya',
      recipientName: 'Rohit Verma',
      recipientAccount: '•••• •••• 7712',
      recipientBank: 'ICICI Bank',
      amount: 25000.0,
      purpose: 'Flight tickets reimbursement',
      method: 'UPI',
      timestamp: '2026-08-29T12:00:00Z',
      status: 'COMPLETED',
      riskScore: 10,
      riskLevel: 'LOW',
      isBeneficiaryNew: false,
      deviceUsed: 'iPhone 15 Pro'
    }
  ]
};

export const INITIAL_ALERTS: Record<string, SecurityAlert[]> = {
  'cust-meena': [
    {
      id: 'alt-1',
      title: 'Active AI Guard: Protected Mode',
      description: 'Sentinel AI is proactively monitoring for caller impersonation & digital arrest threats.',
      severity: 'info',
      timestamp: '2026-09-03T09:00:00Z',
      category: 'SCAM_WARNING'
    },
    {
      id: 'alt-2',
      title: 'Advisory: Fake Courier & Police Scam Alert',
      description: 'RBI & Police Warning: Authorities never demand instant transfers or video calls for clearance.',
      severity: 'warning',
      timestamp: '2026-09-01T10:00:00Z',
      category: 'SCAM_WARNING'
    }
  ],
  'cust-ramesh': [
    {
      id: 'alt-3',
      title: 'First-Time Digital Safeguards Enabled',
      description: 'Cooldown limits applied to newly added beneficiaries for first 24 hours.',
      severity: 'info',
      timestamp: '2026-09-02T08:30:00Z',
      category: 'TRANSACTION_HOLD'
    }
  ],
  'cust-priya': [
    {
      id: 'alt-4',
      title: 'Multi-Factor Device Health Good',
      description: 'Your registered devices are authenticated with biometric tokens.',
      severity: 'info',
      timestamp: '2026-09-01T12:00:00Z',
      category: 'DEVICE_LOGIN'
    }
  ]
};
