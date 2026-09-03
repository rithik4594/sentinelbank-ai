import express from 'express';
import cors from 'cors';
import { SentinelRiskEngine } from '../src/engine/riskEngine';
import { aiAssistantService } from '../src/services/aiAssistant';
import { DEMO_PERSONAS } from '../src/data/demoPersonas';
import { INITIAL_ADMIN_METRICS, FRAUD_TREND_DATA, FRAUD_INDICATOR_STATS, INITIAL_AUDIT_LOGS } from '../src/data/adminMockData';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory data store for the prototype session
let currentMetrics = { ...INITIAL_ADMIN_METRICS };
let auditLogs = [...INITIAL_AUDIT_LOGS];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'SentinelBank AI Proactive Defense API',
    engineVersion: '2.4.0',
    mode: 'Hackathon Prototype — No Real Financial Accounts',
    timestamp: new Date().toISOString()
  });
});

// Personas List
app.get('/api/personas', (req, res) => {
  res.json({ personas: DEMO_PERSONAS });
});

// Risk Evaluation Endpoint
app.post('/api/risk/evaluate', (req, res) => {
  try {
    const { customer, amount, beneficiary, device, isUnfamiliarDevice, isUnusualTime, purpose, method } = req.body;
    
    const result = SentinelRiskEngine.evaluate({
      customer: customer || DEMO_PERSONAS[0],
      amount: parseFloat(amount) || 0,
      beneficiary: beneficiary || { name: 'Unknown Payee', accountNumber: '•••• 0000', ifsc: 'SBIN0001244', isNew: true },
      device: device || 'Registered Device',
      isUnfamiliarDevice: Boolean(isUnfamiliarDevice),
      isUnusualTime: Boolean(isUnusualTime),
      purpose: purpose || 'Transfer',
      method: method || 'UPI'
    });

    res.json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Sentinel AI Safety Assistant Chat Endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const aiResponse = await aiAssistantService.analyzeAndRespond(message, context);
    res.json({ success: true, message: aiResponse });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Admin Security Metrics & Trend Analytics
app.get('/api/admin/metrics', (req, res) => {
  res.json({
    success: true,
    metrics: currentMetrics,
    trends: FRAUD_TREND_DATA,
    indicators: FRAUD_INDICATOR_STATS
  });
});

// Audit Logs
app.get('/api/admin/audit-logs', (req, res) => {
  res.json({
    success: true,
    count: auditLogs.length,
    logs: auditLogs
  });
});

// Record a Prevented Scam Transaction
app.post('/api/transactions/prevent', (req, res) => {
  try {
    const { customerName, amount, recipientName, riskScore, riskLevel, breakdown, deviceUsed, reason } = req.body;

    const newLog = {
      id: `aud-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      customerId: 'cust-meena',
      customerName: customerName || 'Meena Sharma',
      customerRole: 'Senior Citizen',
      customerExperience: 'Beginner',
      amount: parseFloat(amount) || 80000,
      recipientName: recipientName || 'Ravi Kumar',
      recipientAccount: '•••• •••• 6712',
      recipientBank: 'State Bank of India',
      deviceUsed: deviceUsed || 'Unknown Chrome / Linux Device',
      riskScore: riskScore || 91,
      riskLevel: riskLevel || 'HIGH',
      breakdown: breakdown || [],
      status: 'PREVENTED' as const,
      socialEngineeringClues: [
        'Urgent transfer to newly registered beneficiary',
        'Amount severely higher than customer average',
        'Customer acted upon Sentinel AI safety intervention'
      ],
      officerActionTaken: `Transaction automatically halted by Sentinel AI Shield. Zero financial loss.`
    };

    auditLogs.unshift(newLog);

    currentMetrics.totalTransactions += 1;
    currentMetrics.transactionsAnalyzed += 1;
    currentMetrics.suspiciousTransactions += 1;
    currentMetrics.highRiskInterventions += 1;
    currentMetrics.transactionsPrevented += 1;
    currentMetrics.estimatedAmountProtectedINR += parseFloat(amount) || 80000;

    res.json({ success: true, log: newLog, updatedMetrics: currentMetrics });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🛡️ SentinelBank AI Security Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
});
