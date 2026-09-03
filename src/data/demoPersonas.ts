import { CustomerPersona } from '../types/banking';

export const DEMO_PERSONAS: CustomerPersona[] = [
  {
    id: 'cust-meena',
    name: 'Meena Sharma',
    age: 68,
    role: 'Senior Citizen',
    experienceLevel: 'Beginner',
    accountNumber: '•••• •••• 4892',
    ifsc: 'SBIN0001244',
    balance: 284500.0,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98201 •••••',
    email: 'meena.sharma.68@email.com',
    city: 'Pune, Maharashtra',
    normalDevice: 'Samsung Galaxy M31 (Android 12)',
    typicalMinAmount: 500,
    typicalMaxAmount: 5000,
    averageTransactionAmount: 2500,
    knownBeneficiariesCount: 8,
    securityScore: 94,
    bio: 'Retired high school teacher living in Pune. Relies primarily on trusted contacts for financial decisions. Infrequent digital payment user.',
    trustedContacts: [
      {
        id: 'tc-1',
        name: 'Aarav Sharma',
        relationship: 'Son (Primary Guardian)',
        phone: '+91 98765 43210',
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      {
        id: 'tc-2',
        name: 'Sunita Rao',
        relationship: 'Elder Care Family Friend',
        phone: '+91 98112 33445',
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      },
      {
        id: 'tc-3',
        name: 'Sentinel Bank Concierge',
        relationship: 'Dedicated Senior Officer Desk',
        phone: '1800-SENTINEL-SR',
        isVerified: true
      }
    ]
  },
  {
    id: 'cust-ramesh',
    name: 'Ramesh Patel',
    age: 52,
    role: 'First-Time Digital Banking User',
    experienceLevel: 'Novice',
    accountNumber: '•••• •••• 7129',
    ifsc: 'HDFC0000412',
    balance: 145200.0,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 97234 •••••',
    email: 'ramesh.patel.store@email.com',
    city: 'Vadodara, Gujarat',
    normalDevice: 'Redmi Note 11 (Android 11)',
    typicalMinAmount: 1000,
    typicalMaxAmount: 10000,
    averageTransactionAmount: 4200,
    knownBeneficiariesCount: 5,
    securityScore: 88,
    bio: 'Textile shop owner transitioning from cash to digital banking. Unfamiliar with UPI QR code scams and urgent payment pressures.',
    trustedContacts: [
      {
        id: 'tc-4',
        name: 'Chirag Patel',
        relationship: 'Son (Chartered Accountant)',
        phone: '+91 97234 11223',
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      },
      {
        id: 'tc-5',
        name: 'Sentinel Branch Support',
        relationship: 'Vadodara Main Branch Desk',
        phone: '0265-2445500',
        isVerified: true
      }
    ]
  },
  {
    id: 'cust-priya',
    name: 'Priya Verma',
    age: 29,
    role: 'Regular Customer',
    experienceLevel: 'Tech-Savvy',
    accountNumber: '•••• •••• 9301',
    ifsc: 'ICIC0000982',
    balance: 532000.0,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    phone: '+91 99887 •••••',
    email: 'priya.verma.tech@email.com',
    city: 'Bengaluru, Karnataka',
    normalDevice: 'iPhone 15 Pro (iOS 18)',
    typicalMinAmount: 200,
    typicalMaxAmount: 40000,
    averageTransactionAmount: 8500,
    knownBeneficiariesCount: 24,
    securityScore: 98,
    bio: 'Software engineer at a fintech startup. Frequent user of digital banking across laptops and mobile devices.',
    trustedContacts: [
      {
        id: 'tc-6',
        name: 'Rohit Verma',
        relationship: 'Spouse',
        phone: '+91 99887 76655',
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
      }
    ]
  }
];
