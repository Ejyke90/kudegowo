'use client';

import { useState } from 'react';
import { CreditCard, Bell, BarChart3, PiggyBank, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Tag, SlideWrap, H1 } from '../../components/shared';

const payments = [
  { id: 'P001', name: 'Amara Okafor',  class: 'JSS 2A', type: 'School Fees',    amount: '₦85,000', date: '14 Jan',  status: 'paid',    parent: 'Mrs Okafor' },
  { id: 'P002', name: 'Chidi Nwosu',   class: 'SS 1B',  type: 'Canteen Top-up', amount: '₦5,000',  date: '15 Jan',  status: 'paid',    parent: 'Mr Nwosu' },
  { id: 'P003', name: 'Fatima Bello',  class: 'JSS 3C', type: 'School Fees',    amount: '₦85,000', date: '—',       status: 'overdue', parent: 'Mrs Bello' },
  { id: 'P004', name: 'Emeka Eze',     class: 'SS 2A',  type: 'Trip Payment',   amount: '₦12,000', date: '13 Jan',  status: 'paid',    parent: 'Mr Eze' },
  { id: 'P005', name: 'Ngozi Adeyemi', class: 'JSS 1B', type: 'School Fees',    amount: '₦85,000', date: '—',       status: 'pending', parent: 'Mrs Adeyemi' },
  { id: 'P006', name: 'Tunde Afolabi', class: 'SS 3C',  type: 'Canteen Top-up', amount: '₦3,000',  date: '16 Jan',  status: 'paid',    parent: 'Mr Afolabi' },
];

const canteenLog = [
  { name: 'Amara Okafor',  item: 'Jollof Rice + Drink', amount: '₦800',  time: '12:04 PM', balance: '₦4,200' },
  { name: 'Chidi Nwosu',   item: 'Fried Rice + Chicken', amount: '₦1,100', time: '12:11 PM', balance: '₦3,900' },
  { name: 'Emeka Eze',     item: 'Snack + Water',        amount: '₦350',  time: '10:30 AM', balance: '₦6,650' },
  { name: 'Tunde Afolabi', item: 'Jollof Rice',          amount: '₦600',  time: '12:22 PM', balance: '₦2,400' },
];

const alerts = [
  { icon: '✅', msg: 'Mrs Okafor paid ₦85,000 school fees', to: 'Admin + Mrs Okafor', col: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { icon: '🍽️', msg: 'Amara Okafor spent ₦800 at canteen — 12:04 PM', to: 'Mrs Okafor', col: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  { icon: '⚠️', msg: 'Fatima Bello school fees overdue — 14 days', to: 'Admin + Mrs Bello', col: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  { icon: '📅', msg: 'Ngozi Adeyemi instalment due in 3 days', to: 'Admin + Mrs Adeyemi', col: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
];

const statusStyle: Record<string, { label: string; col: string; icon: React.ReactNode }> = {
  paid:    { label: 'Paid',    col: 'text-emerald-400', icon: <CheckCircle className="w-3 h-3" /> },
  overdue: { label: 'Overdue', col: 'text-red-400',     icon: <AlertCircle className="w-3 h-3" /> },
  pending: { label: 'Pending', col: 'text-yellow-400',  icon: <Clock className="w-3 h-3" /> },
};

type Tab = 'payments' | 'canteen' | 'alerts' | 'analytics';

export function SPDemo() {
  const [tab, setTab] = useState<Tab>('payments');

  const paid    = payments.filter((p) => p.status === 'paid').length;
  const overdue = payments.filter((p) => p.status === 'overdue').length;
  const pending = payments.filter((p) => p.status === 'pending').length;

  return (
    <SlideWrap>
      <Tag>Live Demo</Tag>
      <H1>Greenfield Academy — Payments Dashboard</H1>

      <div className="grid grid-cols-3 gap-10">
        {/* Left panel — stats + tabs */}
        <div className="col-span-2">
          {/* Summary stats */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Collected',  value: '₦4.2M', col: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
              { label: 'Paid',       value: paid,     col: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
              { label: 'Overdue',    value: overdue,  col: 'text-red-400',     bg: 'bg-red-500/10 border-red-500/20' },
              { label: 'Pending',    value: pending,  col: 'text-yellow-400',  bg: 'bg-yellow-500/10 border-yellow-500/20' },
            ].map((s) => (
              <div key={s.label} className={`border ${s.bg} rounded-xl p-3 text-center`}>
                <div className={`text-2xl font-black ${s.col}`}>{s.value}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {(['payments', 'canteen', 'alerts', 'analytics'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  tab === t ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/40 hover:text-white/70'
                }`}
              >
                {t === 'analytics' ? '📊 Analytics' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {tab === 'payments' && (
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-white/30 uppercase tracking-wider">
                    <th className="text-left px-4 py-2.5">Student</th>
                    <th className="text-left px-4 py-2.5">Type</th>
                    <th className="text-left px-4 py-2.5">Amount</th>
                    <th className="text-left px-4 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => {
                    const st = statusStyle[p.status];
                    return (
                      <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-2.5">
                          <p className="font-semibold text-white">{p.name}</p>
                          <p className="text-white/30">{p.class}</p>
                        </td>
                        <td className="px-4 py-2.5 text-white/60">{p.type}</td>
                        <td className="px-4 py-2.5 font-semibold text-white">{p.amount}</td>
                        <td className="px-4 py-2.5">
                          <span className={`flex items-center gap-1 font-semibold ${st.col}`}>
                            {st.icon} {st.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {tab === 'canteen' && (
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-white/30 uppercase tracking-wider">
                    <th className="text-left px-4 py-2.5">Student</th>
                    <th className="text-left px-4 py-2.5">Item</th>
                    <th className="text-left px-4 py-2.5">Spent</th>
                    <th className="text-left px-4 py-2.5">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {canteenLog.map((c) => (
                    <tr key={c.name + c.time} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-2.5 font-semibold text-white">{c.name}</td>
                      <td className="px-4 py-2.5 text-white/60">{c.item}</td>
                      <td className="px-4 py-2.5 font-semibold text-red-400">{c.amount}</td>
                      <td className="px-4 py-2.5 font-semibold text-emerald-400">{c.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {tab === 'alerts' && (
              <div className="p-4 space-y-3">
                {alerts.map((a) => (
                  <div key={a.msg} className={`border ${a.bg} rounded-xl p-3 flex items-start gap-3`}>
                    <span className="text-base shrink-0">{a.icon}</span>
                    <div>
                      <p className={`text-xs font-semibold ${a.col}`}>{a.msg}</p>
                      <p className="text-white/30 text-xs mt-0.5">→ {a.to}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'analytics' && (
              <div className="p-5">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Term 1 · 2026 — Revenue Breakdown</p>
                <div className="space-y-3">
                  {[
                    { label: 'School Fees',    amount: '₦3,825,000', pct: 91, col: 'bg-emerald-500' },
                    { label: 'Canteen Top-ups', amount: '₦245,000',  pct: 6,  col: 'bg-blue-500' },
                    { label: 'Trip Payments',   amount: '₦108,000',  pct: 3,  col: 'bg-purple-500' },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60">{r.label}</span>
                        <span className="font-bold text-white">{r.amount}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full">
                        <div className={`h-2 ${r.col} rounded-full`} style={{ width: `${r.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-center text-xs">
                  <div>
                    <div className="text-xl font-black text-emerald-400">94%</div>
                    <div className="text-white/40">Collection rate</div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-blue-400">2.1 days</div>
                    <div className="text-white/40">Avg. payment time</div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-purple-400">₦4.2M</div>
                    <div className="text-white/40">Total collected</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right panel — parent view */}
        <div>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Parent View — Mrs Okafor</h3>
          <div className="bg-gradient-to-br from-emerald-950 to-gray-900 border border-emerald-500/20 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Amara's Wallet</p>
                <p className="text-xs text-white/40">Balance: ₦4,200</p>
              </div>
            </div>

            {[
              { icon: <CheckCircle className="w-3 h-3" />, col: 'text-emerald-400', bg: 'bg-emerald-500/10', msg: 'Fees paid ✅', sub: '₦85,000 · 14 Jan' },
              { icon: <Bell className="w-3 h-3" />,        col: 'text-blue-400',    bg: 'bg-blue-500/10',    msg: 'Canteen: ₦800 spent', sub: 'Jollof Rice · 12:04 PM' },
              { icon: <PiggyBank className="w-3 h-3" />,   col: 'text-purple-400',  bg: 'bg-purple-500/10',  msg: 'Savings: ₦500 added', sub: 'Auto round-up · today' },
              { icon: <BarChart3 className="w-3 h-3" />,   col: 'text-yellow-400',  bg: 'bg-yellow-500/10',  msg: 'Monthly spend: ₦3,200', sub: 'Canteen this month' },
            ].map((item, i) => (
              <div key={i} className={`${item.bg} rounded-xl p-3 flex items-center gap-3`}>
                <span className={item.col}>{item.icon}</span>
                <div>
                  <p className={`text-xs font-semibold ${item.col}`}>{item.msg}</p>
                  <p className="text-white/30 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-white/10">
              <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold py-2 rounded-xl transition-colors">
                Top Up Wallet
              </button>
            </div>
          </div>

          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Works via</p>
            <div className="space-y-1.5 text-xs text-white/60">
              {['📱 WhatsApp alerts', '💳 Card / bank transfer', '📟 USSD (*737#)', '🏧 POS at school gate'].map((m) => (
                <p key={m}>{m}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
