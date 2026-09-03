import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Search, 
  Filter, 
  Eye, 
  X, 
  Lock, 
  Building2, 
  CheckCircle2, 
  PhoneCall, 
  FileText,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { useBankData } from '../../context/BankDataContext';
import { AuditLogEntry } from '../../types/admin';
import { FRAUD_TREND_DATA, FRAUD_INDICATOR_STATS } from '../../data/adminMockData';

export const AdminDashboard: React.FC<{ onSwitchToCustomer: () => void }> = ({ onSwitchToCustomer }) => {
  const { adminMetrics, auditLogs } = useBankData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [inspectingEntry, setInspectingEntry] = useState<AuditLogEntry | null>(null);

  // Filter audit logs
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedRiskFilter === 'ALL') return true;
    return log.riskLevel === selectedRiskFilter;
  });

  const pieData = [
    { name: 'Low Risk', value: 16800, color: '#10b981' },
    { name: 'Medium Risk', value: 1238, color: '#f59e0b' },
    { name: 'High Risk (Flagged)', value: 412, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in">
      {/* Top Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600/30 text-blue-400 border border-blue-500/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Bank Security Operations Center (SOC)</span>
            </span>
            <span className="text-xs text-slate-400">Admin Clearance Level 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sentinel Fraud Prevention Terminal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Real-time heuristic telemetry and proactive intervention logs for vulnerable banking cohorts.
          </p>
        </div>

        <button
          onClick={onSwitchToCustomer}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-colors"
        >
          Switch to Customer Portal
        </button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Analyzed</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">
            {adminMetrics.transactionsAnalyzed.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">100% In-flight</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Suspicious Flags</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">
            {adminMetrics.suspiciousTransactions}
          </span>
          <span className="text-[10px] text-amber-700 font-semibold mt-0.5 block">Rule anomalies</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Interventions</span>
          <span className="text-2xl font-black text-rose-600 mt-1 block">
            {adminMetrics.highRiskInterventions}
          </span>
          <span className="text-[10px] text-rose-700 font-semibold mt-0.5 block">"Pause & Verify" fired</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Prevented</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">
            {adminMetrics.transactionsPrevented}
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">Stopped before debit</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1 lg:col-span-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Protected INR</span>
          <span className="text-2xl font-black text-blue-700 mt-1 block truncate">
            ₹{(adminMetrics.estimatedAmountProtectedINR / 10000000).toFixed(2)} Cr
          </span>
          <span className="text-[10px] text-blue-800 font-semibold mt-0.5 block">Total scam savings</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1 lg:col-span-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Vulnerable Shield</span>
          <span className="text-2xl font-black text-purple-700 mt-1 block">
            {adminMetrics.vulnerableCustomerProtectionRate}%
          </span>
          <span className="text-[10px] text-purple-800 font-semibold mt-0.5 block">Senior / Novice rate</span>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Fraud Attempts Over Time Area Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Fraud Attacks & Interventions Over Time</span>
              </h3>
              <p className="text-xs text-slate-500">Weekly trend of suspicious velocity vs safe transactions</p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-700">
              Last 7 Days
            </span>
          </div>

          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FRAUD_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrevented" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="timeLabel" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }} 
                />
                <Area type="monotone" dataKey="prevented" stroke="#ef4444" fillOpacity={1} fill="url(#colorPrevented)" name="Scams Blocked" />
                <Area type="monotone" dataKey="mediumRisk" stroke="#f59e0b" fillOpacity={1} fill="url(#colorMedium)" name="Medium Risk Verifications" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Donut */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-purple-600" />
                <span>Risk Level Breakdown</span>
              </h3>
            </div>

            <div className="h-48 w-full mt-2 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center pointer-events-none">
                <span className="text-xl font-black text-slate-900 block">18.4K</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Total</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            {pieData.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Fraud Vectors Bar Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-rose-600" />
          <span>Top Financial Scam Vectors Intercepted by Sentinel AI</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {FRAUD_INDICATOR_STATS.map(stat => (
            <div key={stat.name} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-900 text-xs line-clamp-2">{stat.name}</span>
                <span className="text-sm font-black" style={{ color: stat.color }}>{stat.percentage}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ width: `${stat.percentage * 2}%`, backgroundColor: stat.color }}
                />
              </div>
              <span className="text-[10px] text-slate-500 block">{stat.count} incidents intercepted</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Risk List & Audit Trail */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Live Customer Risk Audit Log
            </h3>
            <p className="text-xs text-slate-500">
              Granular transaction signals, factor point math, and proactive protection decisions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search customer, payee, or ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Risk Filter */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setSelectedRiskFilter(f)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                    selectedRiskFilter === f
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Audit ID / Time</th>
                <th className="py-3.5 px-4">Customer & Profile</th>
                <th className="py-3.5 px-4">Amount & Recipient</th>
                <th className="py-3.5 px-4">Risk Score</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map(log => {
                const isHigh = log.riskLevel === 'HIGH';
                const isMed = log.riskLevel === 'MEDIUM';

                return (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-slate-900 block">{log.id}</span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{log.customerName}</span>
                      <span className="text-[11px] text-slate-500">
                        {log.customerRole} ({log.customerExperience})
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-extrabold text-slate-900 text-sm block">
                        ₹{log.amount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-500 max-w-[160px] truncate block">
                        To: {log.recipientName}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 font-black px-2 py-0.5 rounded text-xs ${
                        isHigh
                          ? 'bg-rose-100 text-rose-800'
                          : isMed
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {log.riskScore} / 100
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-bold text-[10px] px-2 py-0.5 rounded uppercase ${
                        log.status === 'PREVENTED'
                          ? 'bg-rose-600 text-white'
                          : log.status === 'VERIFIED_TRUSTED'
                          ? 'bg-blue-600 text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setInspectingEntry(log)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] inline-flex items-center gap-1 shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Explain AI</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep-Dive Explainable AI Modal for Bank Officer */}
      {inspectingEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
                  Risk Engine Factor Decomposition
                </span>
                <h3 className="text-xl font-bold mt-0.5">
                  Audit #{inspectingEntry.id} — {inspectingEntry.customerName}
                </h3>
                <p className="text-xs text-slate-400">
                  Transfer amount: ₹{inspectingEntry.amount.toLocaleString('en-IN')} to {inspectingEntry.recipientName}
                </p>
              </div>
              <button
                onClick={() => setInspectingEntry(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs uppercase tracking-wider block text-rose-800">
                    Calculated Explainable Risk Score
                  </span>
                  <span className="text-3xl font-black text-rose-600 mt-1 block">
                    {inspectingEntry.riskScore} / 100 {inspectingEntry.riskLevel} RISK
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-rose-800 font-bold block">Outcome:</span>
                  <span className="bg-rose-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg uppercase inline-block mt-1">
                    {inspectingEntry.status}
                  </span>
                </div>
              </div>

              {/* Granular Points Factor Breakdown */}
              <div>
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
                  Factor Point Attribution
                </h4>
                <div className="space-y-2">
                  {inspectingEntry.breakdown.map(factor => (
                    <div
                      key={factor.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                          <span>{factor.name}</span>
                          <span className="text-[10px] text-slate-500 font-normal">
                            (Max: {factor.maxPoints} pts)
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                          {factor.description}
                        </p>
                      </div>
                      <span className={`text-base font-black px-2.5 py-1 rounded-lg ${
                        factor.points > 0 ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'
                      }`}>
                        +{factor.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Engineering Clues */}
              {inspectingEntry.socialEngineeringClues && inspectingEntry.socialEngineeringClues.length > 0 && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                  <span className="font-bold text-xs uppercase tracking-wider block text-amber-900 mb-1">
                    Detected Social Engineering Indicators:
                  </span>
                  <ul className="space-y-1 text-[11px]">
                    {inspectingEntry.socialEngineeringClues.map((clue, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                        <span>{clue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Officer Action Log */}
              {inspectingEntry.officerActionTaken && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-[11px]">
                  <span className="font-bold block text-blue-900">Officer Record:</span>
                  <p className="mt-0.5">{inspectingEntry.officerActionTaken}</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Log authenticated by Sentinel Automated Defense Layer
              </span>
              <button
                onClick={() => setInspectingEntry(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Close Audit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
