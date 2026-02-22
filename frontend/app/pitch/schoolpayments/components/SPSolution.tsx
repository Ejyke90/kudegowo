'use client';

import { CreditCard, PiggyBank, Bell, BarChart3, RefreshCw, Star } from 'lucide-react';
import { Tag, SlideWrap, H1 } from '../../components/shared';

const features = [
  {
    icon: <CreditCard className="w-5 h-5" />,
    col: 'emerald',
    t: 'Digital Fee Collection',
    b: 'Parents pay tuition, levies, and extra-curricular fees digitally via card, bank transfer, or USSD. Schools receive funds instantly. No cash on premises. Automated receipts sent to parents.',
  },
  {
    icon: <PiggyBank className="w-5 h-5" />,
    col: 'blue',
    t: 'Child Wallet & Canteen',
    b: 'Every child gets a digital spending wallet with parental controls. Parents top up remotely. Children spend at the canteen via QR or NFC tap. Parents get an alert for every purchase.',
  },
  {
    icon: <Bell className="w-5 h-5" />,
    col: 'orange',
    t: 'Real-Time Parent Alerts',
    b: 'Parents receive WhatsApp or SMS notifications for every payment — fee receipts, canteen debits, trip payments. Full financial visibility. Zero surprises. Zero disputes.',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    col: 'purple',
    t: 'School Finance Dashboard',
    b: 'Bursars see a live ledger of all collections, outstanding fees, and payment plans. Automated reminders chase defaulters. One-click financial reports for proprietors and auditors.',
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    col: 'pink',
    t: 'Instalment & Payment Plans',
    b: 'Parents who cannot pay full fees upfront can set up structured payment plans. Schools define terms. Kudegowo automates collection and tracks compliance — reducing dropout due to fee pressure.',
  },
  {
    icon: <Star className="w-5 h-5" />,
    col: 'yellow',
    t: 'Financial Literacy for Kids',
    b: 'Gamified money lessons built into the child wallet. KudiCoins, savings goals, and leaderboards. Children learn to save, budget, and spend responsibly — starting in primary school.',
  },
];

const colMap: Record<string, { border: string; text: string; iconBg: string }> = {
  emerald: { border: 'hover:border-emerald-500/40', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20' },
  blue:    { border: 'hover:border-blue-500/40',    text: 'text-blue-400',    iconBg: 'bg-blue-500/20' },
  orange:  { border: 'hover:border-orange-500/40',  text: 'text-orange-400',  iconBg: 'bg-orange-500/20' },
  purple:  { border: 'hover:border-purple-500/40',  text: 'text-purple-400',  iconBg: 'bg-purple-500/20' },
  pink:    { border: 'hover:border-pink-500/40',    text: 'text-pink-400',    iconBg: 'bg-pink-500/20' },
  yellow:  { border: 'hover:border-yellow-500/40',  text: 'text-yellow-400',  iconBg: 'bg-yellow-500/20' },
};

export function SPSolution() {
  return (
    <SlideWrap>
      <Tag>The Solution</Tag>
      <H1>Six payment features. One school platform.</H1>
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

      <div className="bg-gradient-to-r from-emerald-900/30 to-blue-900/20 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-6">
        <div className="text-3xl">🔗</div>
        <div>
          <p className="font-bold text-sm text-white mb-1">Integrated with Kudegowo Safe School</p>
          <p className="text-white/50 text-xs leading-relaxed">
            School Payments is a module within the Kudegowo platform. Schools that use Safe School for attendance and access control get payments as an add-on. One login, one dashboard, one parent app — covering safety and finance together.
          </p>
        </div>
      </div>
    </SlideWrap>
  );
}
