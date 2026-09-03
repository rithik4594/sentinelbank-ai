import React, { createContext, useContext, useState } from 'react';
import { Transaction, Beneficiary, SecurityAlert, CustomerPersona } from '../types/banking';
import { AdminMetrics, AuditLogEntry } from '../types/admin';
import { RiskEvaluationResult } from '../types/risk';
import { INITIAL_BENEFICIARIES } from '../data/initialBeneficiaries';
import { INITIAL_TRANSACTIONS, INITIAL_ALERTS } from '../data/initialTransactions';
import { INITIAL_ADMIN_METRICS, INITIAL_AUDIT_LOGS } from '../data/adminMockData';
import { useAuth } from './AuthContext';

interface BankDataContextType {
  balance: number;
  transactions: Transaction[];
  beneficiaries: Beneficiary[];
  alerts: SecurityAlert[];
  adminMetrics: AdminMetrics;
  auditLogs: AuditLogEntry[];
  addBeneficiary: (ben: Omit<Beneficiary, 'id' | 'addedAt'>) => Beneficiary;
  executeTransaction: (
    details: {
      recipientName: string;
      recipientAccount: string;
      recipientBank: string;
      amount: number;
      purpose: string;
      method: any;
      note?: string;
      riskResult: RiskEvaluationResult;
      deviceUsed: string;
      isBeneficiaryNew: boolean;
      status?: 'COMPLETED' | 'VERIFIED';
    }
  ) => Transaction;
  preventTransaction: (
    details: {
      recipientName: string;
      recipientAccount: string;
      recipientBank: string;
      amount: number;
      purpose: string;
      method: any;
      riskResult: RiskEvaluationResult;
      deviceUsed: string;
      reason: string;
    }
  ) => Transaction;
  dismissAlert: (id: string) => void;
  resetDemoData: () => void;
}

const BankDataContext = createContext<BankDataContextType | undefined>(undefined);

export const BankDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentPersona } = useAuth();

  const [balances, setBalances] = useState<Record<string, number>>({
    'cust-meena': 284500.0,
    'cust-ramesh': 145200.0,
    'cust-priya': 532000.0
  });

  const [allTransactions, setAllTransactions] = useState<Record<string, Transaction[]>>(INITIAL_TRANSACTIONS);
  const [allBeneficiaries, setAllBeneficiaries] = useState<Record<string, Beneficiary[]>>(INITIAL_BENEFICIARIES);
  const [allAlerts, setAllAlerts] = useState<Record<string, SecurityAlert[]>>(INITIAL_ALERTS);
  const [adminMetrics, setAdminMetrics] = useState<AdminMetrics>(INITIAL_ADMIN_METRICS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  const currentBalance = balances[currentPersona.id] ?? currentPersona.balance;
  const currentTransactions = allTransactions[currentPersona.id] ?? [];
  const currentBeneficiaries = allBeneficiaries[currentPersona.id] ?? [];
  const currentAlerts = allAlerts[currentPersona.id] ?? [];

  const addBeneficiary = (benData: Omit<Beneficiary, 'id' | 'addedAt'>): Beneficiary => {
    const newBen: Beneficiary = {
      ...benData,
      id: `ben-custom-${Date.now()}`,
      addedAt: new Date().toISOString()
    };

    setAllBeneficiaries(prev => ({
      ...prev,
      [currentPersona.id]: [newBen, ...(prev[currentPersona.id] || [])]
    }));

    return newBen;
  };

  const executeTransaction = (details: {
    recipientName: string;
    recipientAccount: string;
    recipientBank: string;
    amount: number;
    purpose: string;
    method: any;
    note?: string;
    riskResult: RiskEvaluationResult;
    deviceUsed: string;
    isBeneficiaryNew: boolean;
    status?: 'COMPLETED' | 'VERIFIED';
  }): Transaction => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      customerId: currentPersona.id,
      recipientName: details.recipientName,
      recipientAccount: details.recipientAccount,
      recipientBank: details.recipientBank,
      amount: details.amount,
      purpose: details.purpose,
      method: details.method,
      note: details.note,
      timestamp: new Date().toISOString(),
      status: details.status || 'COMPLETED',
      riskScore: details.riskResult.score,
      riskLevel: details.riskResult.level,
      isBeneficiaryNew: details.isBeneficiaryNew,
      deviceUsed: details.deviceUsed
    };

    // Deduct balance
    setBalances(prev => ({
      ...prev,
      [currentPersona.id]: Math.max(0, (prev[currentPersona.id] ?? currentPersona.balance) - details.amount)
    }));

    // Prepend transaction
    setAllTransactions(prev => ({
      ...prev,
      [currentPersona.id]: [newTx, ...(prev[currentPersona.id] || [])]
    }));

    // Update admin metrics
    setAdminMetrics(prev => ({
      ...prev,
      totalTransactions: prev.totalTransactions + 1,
      transactionsAnalyzed: prev.transactionsAnalyzed + 1
    }));

    return newTx;
  };

  const preventTransaction = (details: {
    recipientName: string;
    recipientAccount: string;
    recipientBank: string;
    amount: number;
    purpose: string;
    method: any;
    riskResult: RiskEvaluationResult;
    deviceUsed: string;
    reason: string;
  }): Transaction => {
    const preventedTx: Transaction = {
      id: `tx-prev-${Date.now()}`,
      customerId: currentPersona.id,
      recipientName: details.recipientName,
      recipientAccount: details.recipientAccount,
      recipientBank: details.recipientBank,
      amount: details.amount,
      purpose: details.purpose,
      method: details.method,
      timestamp: new Date().toISOString(),
      status: 'PREVENTED',
      riskScore: details.riskResult.score,
      riskLevel: details.riskResult.level,
      isBeneficiaryNew: true,
      deviceUsed: details.deviceUsed,
      interventionTriggered: true
    };

    // Add to transactions list as PREVENTED
    setAllTransactions(prev => ({
      ...prev,
      [currentPersona.id]: [preventedTx, ...(prev[currentPersona.id] || [])]
    }));

    // Add an alert to user's feed
    const newAlert: SecurityAlert = {
      id: `alt-prev-${Date.now()}`,
      title: '🚨 Transaction Successfully Protected',
      description: `We safely stopped a high-risk transfer of ₹${details.amount.toLocaleString('en-IN')} to ${details.recipientName}. Your funds remain secure.`,
      severity: 'danger',
      timestamp: new Date().toISOString(),
      category: 'TRANSACTION_HOLD'
    };

    setAllAlerts(prev => ({
      ...prev,
      [currentPersona.id]: [newAlert, ...(prev[currentPersona.id] || [])]
    }));

    // Increment Admin security metrics
    setAdminMetrics(prev => ({
      ...prev,
      totalTransactions: prev.totalTransactions + 1,
      transactionsAnalyzed: prev.transactionsAnalyzed + 1,
      suspiciousTransactions: prev.suspiciousTransactions + 1,
      highRiskInterventions: prev.highRiskInterventions + 1,
      transactionsPrevented: prev.transactionsPrevented + 1,
      estimatedAmountProtectedINR: prev.estimatedAmountProtectedINR + details.amount
    }));

    // Log to audit table for bank officer
    const auditEntry: AuditLogEntry = {
      id: `aud-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      customerId: currentPersona.id,
      customerName: currentPersona.name,
      customerRole: currentPersona.role,
      customerExperience: currentPersona.experienceLevel,
      amount: details.amount,
      recipientName: details.recipientName,
      recipientAccount: details.recipientAccount,
      recipientBank: details.recipientBank,
      deviceUsed: details.deviceUsed,
      riskScore: details.riskResult.score,
      riskLevel: details.riskResult.level,
      breakdown: details.riskResult.breakdown,
      status: 'PREVENTED',
      socialEngineeringClues: [
        'Urgent transfer to newly registered beneficiary',
        'Amount severely higher than customer average',
        'Intervention accepted by customer safety guard'
      ],
      officerActionTaken: `Transaction automatically halted by Sentinel AI Shield. ₹${details.amount.toLocaleString('en-IN')} protected.`
    };

    setAuditLogs(prev => [auditEntry, ...prev]);

    return preventedTx;
  };

  const dismissAlert = (id: string) => {
    setAllAlerts(prev => ({
      ...prev,
      [currentPersona.id]: (prev[currentPersona.id] || []).filter(a => a.id !== id)
    }));
  };

  const resetDemoData = () => {
    setBalances({
      'cust-meena': 284500.0,
      'cust-ramesh': 145200.0,
      'cust-priya': 532000.0
    });
    setAllTransactions(INITIAL_TRANSACTIONS);
    setAllBeneficiaries(INITIAL_BENEFICIARIES);
    setAllAlerts(INITIAL_ALERTS);
    setAdminMetrics(INITIAL_ADMIN_METRICS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
  };

  return (
    <BankDataContext.Provider
      value={{
        balance: currentBalance,
        transactions: currentTransactions,
        beneficiaries: currentBeneficiaries,
        alerts: currentAlerts,
        adminMetrics,
        auditLogs,
        addBeneficiary,
        executeTransaction,
        preventTransaction,
        dismissAlert,
        resetDemoData
      }}
    >
      {children}
    </BankDataContext.Provider>
  );
};

export const useBankData = () => {
  const context = useContext(BankDataContext);
  if (!context) {
    throw new Error('useBankData must be used within a BankDataProvider');
  }
  return context;
};
