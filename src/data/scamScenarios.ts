import { ScamScenario } from '../types/ai';

export const SCAM_SCENARIOS: ScamScenario[] = [
  {
    id: 'scam-digital-arrest',
    title: 'Digital Arrest / CBI Impersonation',
    subtitle: 'Threatening phone call claiming illegal parcel or money laundering',
    userPrompt: 'Someone called me claiming to be Mumbai Crime Branch / CBI. They said a parcel with illegal passports has my Aadhaar card, and I will be arrested unless I immediately transfer ₹80,000 to a "court verification escrow account".',
    category: 'DIGITAL_ARREST',
    badgeColor: 'red',
    attackerClaim: 'CBI / Police officer demanding money for clearance certificate'
  },
  {
    id: 'scam-kyc-expiry',
    title: 'Bank KYC Expiry & Account Block',
    subtitle: 'Urgent SMS threatening account suspension within 24 hours',
    userPrompt: 'I received an urgent SMS saying: "Dear Customer, your bank account KYC has expired. Your account will be blocked by 9 PM. Click this link or transfer ₹25,000 immediately to verify your identity."',
    category: 'BANK_KYC_IMPERSONATION',
    badgeColor: 'amber',
    attackerClaim: 'Fake bank manager demanding urgent transfer to avoid freeze'
  },
  {
    id: 'scam-electricity-cutoff',
    title: 'Electricity Bill Disconnection Threat',
    subtitle: 'Message warning power will be disconnected tonight',
    userPrompt: 'A message came saying: "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from the main office because previous month bill was not updated. Call electricity officer now and pay ₹14,500."',
    category: 'UTILITY_CUTOFF',
    badgeColor: 'orange',
    attackerClaim: 'Fake electricity officer threatening immediate blackout'
  },
  {
    id: 'scam-task-lottery',
    title: 'Telegram Part-Time Job / Lottery',
    subtitle: 'Promises high daily returns for rating hotels or YouTube videos',
    userPrompt: 'I was added to a Telegram group offering ₹5,000/day for liking YouTube videos. They gave me ₹200 first, but now they are asking me to transfer ₹50,000 to unlock my VIP withdrawal of ₹2,00,000.',
    category: 'TASK_LOTTERY',
    badgeColor: 'purple',
    attackerClaim: 'Ponzi/task scam demanding deposit to withdraw fake earnings'
  },
  {
    id: 'scam-anydesk-remote',
    title: 'Screen-Share / AnyDesk App Fraud',
    subtitle: 'Caller asks to install QuickSupport or AnyDesk for "refund"',
    userPrompt: 'Customer care executive asked me to download an app called AnyDesk or TeamViewer QuickSupport so they can assist me in refunding ₹500. While on call, they asked me to open my banking app.',
    category: 'ANYDESK_REMOTE',
    badgeColor: 'red',
    attackerClaim: 'Screen sharing tool used to capture passwords and OTPs'
  }
];
