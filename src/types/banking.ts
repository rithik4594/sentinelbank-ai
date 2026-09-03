export type DigitalExperienceLevel = 'Beginner' | 'Novice' | 'Tech-Savvy';

export interface TrustedContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isVerified: boolean;
  avatar?: string;
}

export interface CustomerPersona {
  id: string;
  name: string;
  age: number;
  role: 'Senior Citizen' | 'First-Time Digital Banking User' | 'Regular Customer';
  experienceLevel: DigitalExperienceLevel;
  accountNumber: string;
  ifsc: string;
  balance: number;
  avatar: string;
  phone: string;
  email: string;
  city: string;
  normalDevice: string;
  typicalMinAmount: number;
  typicalMaxAmount: number;
  averageTransactionAmount: number;
  knownBeneficiariesCount: number;
  trustedContacts: TrustedContact[];
  securityScore: number;
  bio: string;
}

export type TransactionStatus = 'COMPLETED' | 'PREVENTED' | 'VERIFIED' | 'CANCELLED_BY_USER' | 'FLAGGED';
export type PaymentMethod = 'UPI' | 'IMPS' | 'NEFT' | 'RTGS';

export interface Beneficiary {
  id: string;
  name: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
  upiId?: string;
  isNew: boolean;
  addedAt: string; // ISO string
  verified: boolean;
  avatar?: string;
  category: 'Family' | 'Medical' | 'Utilities' | 'Shopping' | 'Unknown';
}

export interface Transaction {
  id: string;
  customerId: string;
  recipientName: string;
  recipientAccount: string;
  recipientBank: string;
  upiId?: string;
  amount: number;
  purpose: string;
  method: PaymentMethod;
  note?: string;
  timestamp: string;
  status: TransactionStatus;
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  riskFactors?: string[];
  isBeneficiaryNew: boolean;
  deviceUsed: string;
  interventionTriggered?: boolean;
  trustedContactVerified?: boolean;
}

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'danger';
  timestamp: string;
  actionRequired?: boolean;
  category: 'SCAM_WARNING' | 'DEVICE_LOGIN' | 'TRANSACTION_HOLD' | 'KYC_ADVISORY';
}
