import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { BankDataProvider, useBankData } from './context/BankDataContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DemoLoginScreen } from './components/auth/DemoLoginScreen';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FraudAlertCenter } from './components/security/FraudAlertCenter';
import { SendMoneyModal } from './components/transfer/SendMoneyModal';
import { AddBeneficiaryModal } from './components/transfer/AddBeneficiaryModal';
import { PayBillsModal } from './components/transfer/PayBillsModal';
import { SentinelAIAssistantModal } from './components/ai/SentinelAIAssistantModal';
import { TrustedContactVerificationModal } from './components/trusted/TrustedContactVerificationModal';
import { ManageTrustedContactsModal } from './components/trusted/ManageTrustedContactsModal';
import { AccessibilitySettingsPanel } from './components/accessibility/AccessibilitySettingsPanel';
import { ScamSimulationRunner } from './components/demo/ScamSimulationRunner';
import { GPaySimulatorModal } from './components/transfer/GPaySimulatorModal';

const MainAppContent: React.FC = () => {
  const { isLoggedIn, viewMode, setViewMode } = useAuth();

  // Modals state
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isSendMoneyOpen, setIsSendMoneyOpen] = useState(false);
  const [isGPayOpen, setIsGPayOpen] = useState(false);
  const [isAddBeneficiaryOpen, setIsAddBeneficiaryOpen] = useState(false);
  const [isPayBillsOpen, setIsPayBillsOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isTrustedContactModalOpen, setIsTrustedContactModalOpen] = useState(false);
  const [isManageTrustedContactsOpen, setIsManageTrustedContactsOpen] = useState(false);

  // Sub-view inside customer portal ('dashboard' vs 'security-center')
  const [customerSubView, setCustomerSubView] = useState<'dashboard' | 'security-center'>('dashboard');

  // Pending transfer context for trusted contact verification modal
  const [pendingTransfer, setPendingTransfer] = useState<{ recipientName: string; amount: number }>({
    recipientName: 'Ravi Kumar',
    amount: 80000
  });

  if (!isLoggedIn) {
    return <DemoLoginScreen onStartSimulation={() => setIsSimulationOpen(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors">
      {/* Top Navbar */}
      <Navbar
        onOpenSimulation={() => setIsSimulationOpen(true)}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        onOpenSendMoney={() => setIsSendMoneyOpen(true)}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
      />

      {/* Main Body View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'admin' ? (
          <AdminDashboard onSwitchToCustomer={() => setViewMode('customer')} />
        ) : customerSubView === 'security-center' ? (
          <FraudAlertCenter onBackToDashboard={() => setCustomerSubView('dashboard')} />
        ) : (
          <CustomerDashboard
            onSendMoney={() => setIsSendMoneyOpen(true)}
            onOpenGPay={() => setIsGPayOpen(true)}
            onAddBeneficiary={() => setIsAddBeneficiaryOpen(true)}
            onPayBills={() => setIsPayBillsOpen(true)}
            onOpenSecurityCenter={() => setCustomerSubView('security-center')}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
            onOpenTrustedContacts={() => setIsManageTrustedContactsOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {/* 1. Send Money Modal */}
      <SendMoneyModal
        isOpen={isSendMoneyOpen}
        onClose={() => setIsSendMoneyOpen(false)}
        onOpenAIAssistant={() => {
          setIsSendMoneyOpen(false);
          setIsAIAssistantOpen(true);
        }}
        onOpenTrustedContactModal={details => {
          setPendingTransfer(details);
          setIsSendMoneyOpen(false);
          setIsTrustedContactModalOpen(true);
        }}
      />

      {/* 1B. Google Pay & UPI Pre-PIN Hook Simulator */}
      <GPaySimulatorModal
        isOpen={isGPayOpen}
        onClose={() => setIsGPayOpen(false)}
        onOpenAIAssistant={() => {
          setIsGPayOpen(false);
          setIsAIAssistantOpen(true);
        }}
        onOpenTrustedContactModal={details => {
          setPendingTransfer(details);
          setIsGPayOpen(false);
          setIsTrustedContactModalOpen(true);
        }}
      />

      {/* 2. Add Beneficiary Modal */}
      <AddBeneficiaryModal
        isOpen={isAddBeneficiaryOpen}
        onClose={() => setIsAddBeneficiaryOpen(false)}
      />

      {/* 3. Pay Bills Modal */}
      <PayBillsModal
        isOpen={isPayBillsOpen}
        onClose={() => setIsPayBillsOpen(false)}
      />

      {/* 4. Sentinel AI Assistant Modal */}
      <SentinelAIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onOpenTrustedContactModal={() => {
          setIsAIAssistantOpen(false);
          setIsTrustedContactModalOpen(true);
        }}
      />

      {/* 5. Trusted Contact Verification Modal */}
      <TrustedContactVerificationModal
        isOpen={isTrustedContactModalOpen}
        onClose={() => setIsTrustedContactModalOpen(false)}
        transferDetails={pendingTransfer}
        onVerificationComplete={status => {
          console.log('Trusted contact verification completed with status:', status);
        }}
      />

      {/* 6. Manage Trusted Contacts Circle Modal */}
      <ManageTrustedContactsModal
        isOpen={isManageTrustedContactsOpen}
        onClose={() => setIsManageTrustedContactsOpen(false)}
      />

      {/* 7. Accessibility & Senior Controls Panel */}
      <AccessibilitySettingsPanel
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
      />

      {/* 8. Hackathon Centerpiece: Scam Simulation Runner */}
      <ScamSimulationRunner
        isOpen={isSimulationOpen}
        onClose={() => setIsSimulationOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <BankDataProvider>
          <MainAppContent />
        </BankDataProvider>
      </AccessibilityProvider>
    </AuthProvider>
  );
};

export default App;
