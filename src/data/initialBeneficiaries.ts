import { Beneficiary } from '../types/banking';

export const INITIAL_BENEFICIARIES: Record<string, Beneficiary[]> = {
  'cust-meena': [
    {
      id: 'ben-m-1',
      name: 'Aarav Sharma',
      accountNumber: '•••• •••• 1042',
      ifsc: 'HDFC0000012',
      bankName: 'HDFC Bank',
      upiId: 'aarav.sharma@okhdfcbank',
      isNew: false,
      addedAt: '2023-01-15T10:00:00Z',
      verified: true,
      category: 'Family',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'ben-m-2',
      name: 'Apollo Pharmacy Pune',
      accountNumber: '•••• •••• 9921',
      ifsc: 'ICIC0000219',
      bankName: 'ICICI Bank',
      upiId: 'apollopharmacy.pune@icici',
      isNew: false,
      addedAt: '2023-04-10T12:30:00Z',
      verified: true,
      category: 'Medical'
    },
    {
      id: 'ben-m-3',
      name: 'MSEDCL Electricity Board',
      accountNumber: '•••• •••• 5530',
      ifsc: 'SBIN0000300',
      bankName: 'State Bank of India',
      isNew: false,
      addedAt: '2022-11-20T09:15:00Z',
      verified: true,
      category: 'Utilities'
    },
    {
      id: 'ben-m-4',
      name: 'Dr. Sudhir Kulkarni Clinic',
      accountNumber: '•••• •••• 8841',
      ifsc: 'UTIB0000112',
      bankName: 'Axis Bank',
      upiId: 'drkulkarni@axisbank',
      isNew: false,
      addedAt: '2023-08-05T14:40:00Z',
      verified: true,
      category: 'Medical'
    },
    {
      id: 'ben-m-5',
      name: 'Lakshmi Bai (House Help)',
      accountNumber: '•••• •••• 3319',
      ifsc: 'PUNB0002340',
      bankName: 'Punjab National Bank',
      upiId: 'lakshmibai@upi',
      isNew: false,
      addedAt: '2023-09-01T11:00:00Z',
      verified: true,
      category: 'Family'
    },
    {
      id: 'ben-m-new-ravi',
      name: 'Ravi Kumar',
      accountNumber: '•••• •••• 6712',
      ifsc: 'SBIN0019482',
      bankName: 'State Bank of India (Patna Branch)',
      upiId: 'ravikumar.invest99@sbi',
      isNew: true,
      addedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // added 15 mins ago
      verified: false,
      category: 'Unknown'
    }
  ],
  'cust-ramesh': [
    {
      id: 'ben-r-1',
      name: 'Surat Yarn Distributors',
      accountNumber: '•••• •••• 6610',
      ifsc: 'BARB0VADODA',
      bankName: 'Bank of Baroda',
      isNew: false,
      addedAt: '2024-02-10T10:00:00Z',
      verified: true,
      category: 'Shopping'
    },
    {
      id: 'ben-r-2',
      name: 'Chirag Patel (Son)',
      accountNumber: '•••• •••• 9940',
      ifsc: 'HDFC0001290',
      bankName: 'HDFC Bank',
      upiId: 'chirag.ca@hdfcbank',
      isNew: false,
      addedAt: '2024-01-05T10:00:00Z',
      verified: true,
      category: 'Family'
    },
    {
      id: 'ben-r-new-escrow',
      name: 'Cyber Security Escrow Account',
      accountNumber: '•••• •••• 4419',
      ifsc: 'YESB0000881',
      bankName: 'Yes Bank',
      isNew: true,
      addedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      verified: false,
      category: 'Unknown'
    }
  ],
  'cust-priya': [
    {
      id: 'ben-p-1',
      name: 'Rohit Verma (Spouse)',
      accountNumber: '•••• •••• 7712',
      ifsc: 'ICIC0000982',
      bankName: 'ICICI Bank',
      upiId: 'rohit.v@icici',
      isNew: false,
      addedAt: '2023-01-10T10:00:00Z',
      verified: true,
      category: 'Family'
    },
    {
      id: 'ben-p-2',
      name: 'Prestige Apartments HOA',
      accountNumber: '•••• •••• 1188',
      ifsc: 'KKBK0000210',
      bankName: 'Kotak Mahindra Bank',
      isNew: false,
      addedAt: '2023-05-12T10:00:00Z',
      verified: true,
      category: 'Utilities'
    }
  ]
};
