'use client';

import { Shield, Bell, Users, MapPin, AlertTriangle, BarChart3 } from 'lucide-react';
import { Tag, SlideWrap, H1 } from '../../components/shared';

const features = [
  {
    icon: <Shield className="w-5 h-5" />,
    col: 'purple',
    t: 'Digital Passphrase Entry',
    b: 'Every child is assigned a unique digital PIN or QR code. Entry is logged at the school gate via a tablet or phone. No PIN, no entry. Every arrival and departure is timestamped.',
  },
  {
    icon: <Bell className="w-5 h-5" />,
    col: 'emerald',
    t: 'Instant Parent Alerts',
    b: 'Parents receive a WhatsApp or SMS notification the moment their child checks in or out. If a child has not arrived by a set time, an automatic alert is sent to the parent and school admin.',
  },
  {
    icon: <Users className="w-5 h-5" />,
    col: 'blue',
    t: 'Visitor Management',
    b: 'Every visitor — parent, contractor, delivery — is logged at the gate with name, purpose, and time. Authorised pickup lists prevent unauthorised collection of children.',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    col: 'orange',
    t: 'Real-Time Attendance Dashboard',
    b: 'School admins see a live dashboard of who is present, absent, or late — by class, year group, or whole school. Attendance reports are generated automatically each day.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    col: 'red',
    t: 'Emergency Alert System',
    b: 'One-tap lockdown or evacuation alert sent simultaneously to all parents, staff, and a designated emergency contact. Designed for the Nigerian threat environment — fast, offline-capable.',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    col: 'pink',
    t: 'Safety Reports & Audit Trail',
    b: 'Every entry, exit, visitor, and incident is logged with a full audit trail. Schools can generate compliance reports for regulators, parents, or the Safe Schools Declaration assessment.',
  },
];

const colMap: Record<string, { border: string; text: string; iconBg: string }> = {
  purple:  { border: 'hover:border-purple-500/40',  text: 'text-purple-400',  iconBg: 'bg-purple-500/20' },
  emerald: { border: 'hover:border-emerald-500/40', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20' },
  blue:    { border: 'hover:border-blue-500/40',    text: 'text-blue-400',    iconBg: 'bg-blue-500/20' },
  orange:  { border: 'hover:border-orange-500/40',  text: 'text-orange-400',  iconBg: 'bg-orange-500/20' },
  red:     { border: 'hover:border-red-500/40',     text: 'text-red-400',     iconBg: 'bg-red-500/20' },
  pink:    { border: 'hover:border-pink-500/40',    text: 'text-pink-400',    iconBg: 'bg-pink-500/20' },
};

export function SSSolution() {
  return (
    <SlideWrap>
      <Tag>The Solution</Tag>
      <H1>Six layers of school safety. One platform.</H1>
      <div className="grid grid-cols-3 gap-5 mb-6">
        {features.map((f) => {
          const c = colMap[f.col];
          return (
            <div key={f.t} className={`bg-white/5 border border-white/10 ${c.border} rounded-2xl p-5 transition-colors`}>
              <div className={`w-9 h-9 rounded-xl ${c.iconBg} flex items-center justify-center ${c.text} mb-4`}>
                {f.icon}
              </div>
              <h4 className="font-bold text-sm mb-2 text-white">{f.t}</h4>
              <p className="text-white/50 text-xs leading-relaxed">{f.b}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-purple-900/30 to-red-900/20 border border-purple-500/20 rounded-2xl p-5 flex items-center gap-6">
        <div className="text-3xl">🔗</div>
        <div>
          <p className="font-bold text-sm text-white mb-1">Integrated with Kudegowo payments</p>
          <p className="text-white/50 text-xs leading-relaxed">
            Safe School is a module within the Kudegowo platform — not a standalone app. Schools that already use Kudegowo for payments get Safe School as an add-on. One login, one dashboard, one parent app.
          </p>
        </div>
      </div>
    </SlideWrap>
  );
}
