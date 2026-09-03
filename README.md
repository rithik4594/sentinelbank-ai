# SentinelBank AI 🛡️
> **Proactive Protection Against Digital Financial Fraud for Vulnerable Customers**  
> *Smart India Hackathon (SIH) 2026 Submission • Problem Statement 1 (Fintech & Cybersecurity)*

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24_LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

---

## 📌 Problem Overview

Modern cybercriminals no longer steal banking passwords or clone SIM cards. In scams like **"Digital Arrest"**, **Bank KYC Expiry Phishing**, and **Electricity Cutoff Threats**, scammers psychologically manipulate victims into authorizing payments themselves.

Because the customer types their own valid UPI PIN or Netbanking password, **traditional banking fraud detection engines let the money pass without friction**. Once transferred via instant settlement rails (UPI / IMPS), the victim's life savings are gone forever.

**SentinelBank AI** solves this with an **intelligent Pre-PIN behavioral safety layer** that intercepts suspicious transfers, evaluates psychological coercion signals, and halts fraud **before the money is debited**.

---

## 💡 Core Innovation & Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               SENTINELBANK AI WORKFLOW                                 │
│                                                                                        │
│   Customer Enters Transfer                                                             │
│             │                                                                          │
│             ▼                                                                          │
│   🛡️ Pre-PIN Security Hook (Intercepts payment BEFORE UPI PIN prompt)                 │
│             │                                                                          │
│             ▼                                                                          │
│   ⚙️ Explainable Multi-Signal Risk Engine (Computes 0–100 Score in <15ms)              │
│       ├── Amount Anomaly (Ratio vs historical average)      [+25 pts]                  │
│       ├── Beneficiary Recency (<24 hrs, zero history)       [+20 pts]                  │
│       ├── Device Telemetry & AnyDesk Screen-Share Detection [+15 pts]                  │
│       ├── Circadian Time (2:15 AM Late-Night Panic Window)  [+10 pts]                  │
│       ├── Velocity & Urgency Signals                        [+12 pts]                  │
│       └── Vulnerable Customer Guard (Senior / Novice)       [+9 pts]                   │
│             │                                                                          │
│             ▼                                                                          │
│   🚨 Score: 91/100 (HIGH RISK)                                                         │
│             │                                                                          │
│             ▼                                                                          │
│   🛑 "Pause and Verify" Adaptive Barrier                                               │
│       ├── Plain-Language Human Explanation (No banking jargon)                         │
│       ├── Web Speech API Voice Guidance (Audio warning for seniors)                    │
│       ├── Sentinel AI Scam Counselor (Diagnoses Digital Arrest)                        │
│       └── Trusted Contact Escalation (Alerts Son to cancel payment)                    │
│             │                                                                          │
│             ▼                                                                          │
│   ✅ Result: ZERO FINANCIAL LOSS (₹80,000 completely protected)                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

> **Core Philosophy:**  
> *"We don't just ask whether the transaction is technically authorized. We ask whether the customer is being manipulated."*

---

## ✨ Key Features

1. **⚡ Real-Time Multi-Signal Risk Scoring**: Mathematical evaluation (0 to 100) with granular point-by-point factor attribution.
2. **📱 Google Pay & UPI QR Code Simulator**: Interactive Pre-PIN Hook testing environment with realistic QR camera scanner and VPA inputs.
3. **👵 Senior & Accessible UI Mode**:
   - Web Speech API browser-native voice guidance in clear Indian English.
   - 1-click dynamic font scaling ($A \rightarrow A+ \rightarrow A++$).
   - WCAG AAA high-contrast theme for visually impaired and cataract-affected elders.
   - Plain language translation (converts confusing banking jargon into clear, reassuring words).
4. **🤖 Sentinel AI Safety Assistant**: Conversational scam de-escalation agent that explains why threats like "Digital Arrest" are illegal and impossible under Indian law.
5. **👥 Trusted Contact Verification Circle**: Real-time push simulation allowing senior citizens to route high-risk transfers to a designated family member (e.g., Son Aarav) for review.
6. **📊 Bank Security Operations Center (SOC)**: Professional real-time audit ledger, Recharts analytics (₹1.84 Cr protected, 98.6% safety rate), and deep-dive Explainable AI factor inspector.
7. **⚡ 6-Phase Animated Showcase Story**: Built-in hackathon presentation mode demonstrating how ₹80,000 is intercepted and protected.

---

## 🛠️ Technology Stack

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite 8, Tailwind CSS v4 | Ultra-responsive, accessible fintech client application |
| **Icons & Charts** | Lucide React, Recharts | Semantic iconography and real-time fraud telemetry visualizers |
| **Audio & Voice** | Native Web Speech API (`SpeechSynthesis`) | Browser-native audio alerts for elderly and low-vision users |
| **Backend API** | Node.js 24 LTS, Express 5, TSX Runtime, CORS | High-speed REST API endpoints for risk evaluation & AI chat |
| **Cybersecurity** | Explainable AI (XAI) Engine, NLP Matcher | Deterministic risk scoring and Indian scam taxonomy matching |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended, tested on v24 LTS)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/rithik4594/sentinelbank-ai.git
cd sentinelbank-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Backend API Server
In terminal 1:
```bash
npx tsx server/index.ts
```
*Backend runs on `http://localhost:3001` with endpoints `/api/health`, `/api/risk/evaluate`, `/api/ai/chat`.*

### 4. Start the Frontend Application
In terminal 2:
```bash
npm run dev
```
*Frontend opens at `http://localhost:5173`.*

### 5. Run Production Build & Type Check
```bash
npm run build
```

---

## 🧪 Testing the Prototype

1. Open `http://localhost:5173/` in your browser.
2. Log in with **Meena Sharma (Senior Citizen, 68 yrs)**.
3. Click **"Transfer Funds"** or **"GPay / UPI Scan"**:
   - Send **₹80,000** to new recipient **Ravi Kumar**.
   - Watch the **Explainable Risk Engine** compute **91/100 HIGH RISK**.
   - Observe the **"🚨 Pause and Verify"** barrier halt the transaction before debit.
   - Click **"Verify with Trusted Contact"** to see her son Aarav decline the scam payment!
4. Click **"⚡ Run Fraud Simulation"** in the top navigation for an automated 6-phase presentation flow.

---

## 🏆 Smart India Hackathon (SIH) 2026 Submission

- **Problem Statement ID:** PS-01
- **Problem Statement Title:** Protecting Vulnerable Customers from Digital Financial Fraud
- **Theme:** Smart Banking / Fintech / Cybersecurity
- **Target Beneficiaries:** Senior citizens, pensioners, first-time digital users, and rural banking customers.

---

## 📄 License
This project is developed as an educational prototype for the **Smart India Hackathon (SIH)**. All simulated banking data and persona profiles are mock representations.
