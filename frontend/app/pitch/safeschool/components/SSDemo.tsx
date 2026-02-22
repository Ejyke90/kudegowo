'use client';

import { useState } from 'react';
import { Shield, Bell, AlertTriangle, CheckCircle, Clock, UserX } from 'lucide-react';
import { Tag, SlideWrap, H1 } from '../../components/shared';

const students = [
  { id: 'A001', name: 'Amara Okafor',   class: 'JSS 2A', time: '7:42 AM', status: 'present', parent: 'Mrs Okafor' },
  { id: 'A002', name: 'Chidi Nwosu',    class: 'SS 1B',  time: '7:58 AM', status: 'present', parent: 'Mr Nwosu' },
  { id: 'A003', name: 'Fatima Bello',   class: 'JSS 3C', time: '—',       status: 'absent',  parent: 'Mrs Bello' },
  { id: 'A004', name: 'Emeka Eze',      class: 'SS 2A',  time: '8:14 AM', status: 'late',    parent: 'Mr Eze' },
  { id: 'A005', name: 'Ngozi Adeyemi',  class: 'JSS 1B', time: '7:39 AM', status: 'present', parent: 'Mrs Adeyemi' },
  { id: 'A006', name: 'Tunde Afolabi',  class: 'SS 3C',  time: '—',       status: 'absent',  parent: 'Mr Afolabi' },
];

const visitors = [
  { name: 'Mr Babatunde (Parent)', purpose: 'Child pickup', time: '2:45 PM', status: 'authorised' },
  { name: 'Zenith Bank Technician', purpose: 'ATM maintenance', time: '10:12 AM', status: 'authorised' },
  { name: 'Unknown Male', purpose: 'Unspecified', time: '11:30 AM', status: 'flagged' },
];

const alerts = [
  { icon: '✅', msg: 'Amara Okafor checked in — 7:42 AM', to: 'Mrs Okafor', col: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  { icon: '⚠️', msg: 'Fatima Bello has not arrived — 8:30 AM', to: 'Mrs Bello', col: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  { icon: '🕐', msg: 'Emeka Eze arrived late — 8:14 AM', to: 'Mr Eze', col: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  { icon: '🚨', msg: 'Unknown visitor flagged at gate — 11:30 AM', to: 'Admin', col: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
];

const statusStyle: Record<string, { label: string; col: string; icon: React.ReactNode }> = {
  present: { label: 'Present',     col: 'text-green-400',  icon: <CheckCircle className="w-3 h-3" /> },
  absent:  { label: 'Not arrived', col: 'text-red-400',    icon: <UserX className="w-3 h-3" /> },
  late:    { label: 'Late',        col: 'text-yellow-400', icon: <Clock className="w-3 h-3" /> },
};

type Tab = 'attendance' | 'visitors' | 'alerts' | 'emergency';

export function SSDemo() {
  const [tab, setTab] = useState<Tab>('attendance');
  const [lockdown, setLockdown] = useState(false);

  const present = students.filter((s) => s.status === 'present').length;
  const absent  = students.filter((s) => s.status === 'absent').length;
  const late    = students.filter((s) => s.status === 'late').length;

  return (
    <SlideWrap>
      <Tag>Live Demo</Tag>
      <H1>Greenfield Academy — Safety Dashboard</H1>

      <div className="grid grid-cols-3 gap-10">
        {/* Left panel — stats + tabs */}
        <div className="col-span-2">
          {/* Summary stats */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Present',  value: present, col: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20' },
              { label: 'Absent',   value: absent,  col: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20' },
              { label: 'Late',     value: late,    col: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
              { label: 'Visitors', value: visitors.length, col: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
            ].map((s) => (
              <div key={s.label} className={`border ${s.bg} rounded-xl p-3 text-center`}>
                <div className={`text-2xl font-black ${s.col}`}>{s.value}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {(['attendance', 'visitors', 'alerts', 'emergency'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  tab === t ? 'bg-purple-500 text-white' : 'bg-white/5 text-white/40 hover:text-white/70'
                }`}
              >
                {t === 'emergency' ? '🚨 Emergency' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {tab === 'attendance' && (
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-white/30 uppercase tracking-wider">
                    <th className="text-left px-4 py-2.5">Student</th>
                    <th className="text-left px-4 py-2.5">Class</th>
                    <th className="text-left px-4 py-2.5">Time</th>
                    <th className="text-left px-4 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => {
                    const st = statusStyle[s.status];
                    return (
                      <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-2.5 font-semibold text-white">{s.name}</td>
                        <td className="px-4 py-2.5 text-white/40">{s.class}</td>
                        <td className="px-4 py-2.5 text-white/40">{s.time}</td>
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

            {tab === 'visitors' && (
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-white/30 uppercase tracking-wider">
                    <th className="text-left px-4 py-2.5">Visitor</th>
                    <th className="text-left px-4 py-2.5">Purpose</th>
                    <th className="text-left px-4 py-2.5">Time</th>
                    <th className="text-left px-4 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((v) => (
                    <tr key={v.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-2.5 font-semibold text-white">{v.name}</td>
                      <td className="px-4 py-2.5 text-white/40">{v.purpose}</td>
                      <td className="px-4 py-2.5 text-white/40">{v.time}</td>
                      <td className="px-4 py-2.5">
                        <span className={`font-semibold ${v.status === 'flagged' ? 'text-red-400' : 'text-green-400'}`}>
                          {v.status === 'flagged' ? '🚩 Flagged' : '✅ Authorised'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {tab === 'alerts' && (
              <div className="p-4 space-y-3">
                {alerts.map((a) => (
                  <div key={a.msg} className={`flex items-start gap-3 border ${a.bg} rounded-xl px-4 py-3`}>
                    <span className="text-base shrink-0">{a.icon}</span>
                    <div className="flex-1">
                      <p className={`text-xs font-semibold ${a.col}`}>{a.msg}</p>
                      <p className="text-white/30 text-xs mt-0.5">WhatsApp sent → {a.to}</p>
                    </div>
                    <span className="text-white/20 text-xs shrink-0">Delivered ✓</span>
                  </div>
                ))}
              </div>
            )}

            {tab === 'emergency' && (
              <div className="p-6 text-center">
                {lockdown ? (
                  <div className="space-y-4">
                    <div className="text-5xl animate-pulse">🚨</div>
                    <p className="text-red-400 font-black text-xl">LOCKDOWN ACTIVE</p>
                    <p className="text-white/50 text-sm">Alert sent to all 337 parents, 24 staff, and emergency contact</p>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {[
                        { label: 'Parents notified', value: '337', col: 'text-red-400' },
                        { label: 'Staff alerted', value: '24', col: 'text-orange-400' },
                        { label: 'Response time', value: '< 3s', col: 'text-yellow-400' },
                      ].map((s) => (
                        <div key={s.label} className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                          <div className={`text-xl font-black ${s.col}`}>{s.value}</div>
                          <div className="text-xs text-white/40">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setLockdown(false)}
                      className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white/60 transition-colors">
                      Clear lockdown
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AlertTriangle className="w-12 h-12 text-red-400 mx-auto" />
                    <p className="text-white font-bold text-lg">Emergency Response</p>
                    <p className="text-white/50 text-sm max-w-sm mx-auto">
                      One tap sends an instant alert to all parents, staff, and emergency contacts simultaneously — via WhatsApp, SMS, and push notification.
                    </p>
                    <button
                      onClick={() => setLockdown(true)}
                      className="px-8 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-white text-sm transition-colors shadow-lg shadow-red-900/40">
                      🚨 Trigger Demo Lockdown
                    </button>
                    <p className="text-white/20 text-xs">Demo only — no real alerts sent</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right panel — parent view */}
        <div>
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Parent View (WhatsApp)</p>
          <div className="bg-[#0b1f13] border border-green-900/40 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-xs font-bold">K</div>
              <div>
                <p className="text-xs font-bold text-white">Kudegowo SafeSchool</p>
                <p className="text-xs text-white/30">Greenfield Academy</p>
              </div>
            </div>
            {[
              { msg: '✅ Amara arrived safely at school — 7:42 AM. Have a great day!', time: '7:42 AM', mine: false },
              { msg: 'Thank you! 🙏', time: '7:43 AM', mine: true },
              { msg: '⚠️ Reminder: Amara\'s school trip payment of ₦5,000 is due tomorrow.', time: '9:00 AM', mine: false },
              { msg: '✅ Amara checked out — 2:58 PM. She has been collected by Mrs Okafor (authorised).', time: '2:58 PM', mine: false },
            ].map((m, i) => (
              <div key={i} className={`flex ${m.mine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                  m.mine ? 'bg-green-700 text-white' : 'bg-white/10 text-white/80'
                }`}>
                  <p>{m.msg}</p>
                  <p className="text-white/30 text-xs mt-1 text-right">{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Also via</p>
            <div className="flex gap-2">
              {['📱 SMS', '🔔 Push', '📧 Email'].map((ch) => (
                <span key={ch} className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded-lg">{ch}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
