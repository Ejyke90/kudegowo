'use client';

import { CreditCard, Wallet, Shield, MessageSquare, BarChart3, Star } from 'lucide-react';
import { Tag, SlideWrap, H1 } from '../../components/shared';

const cards = [
  { icon: <CreditCard className="w-5 h-5" />, col: 'emerald', t: 'Cashless School Payments', b: 'Parents pay tuition, meals, trips, and uniforms digitally. Schools receive funds instantly. No cash on premises. Full audit trail.' },
  { icon: <Wallet className="w-5 h-5" />, col: 'blue', t: 'Child Wallet', b: 'Every child gets a spending wallet with parental controls. Parents top up; children spend only at school. Real-time alerts on every transaction.' },
  { icon: <Shield className="w-5 h-5" />, col: 'purple', t: 'Safe School', b: 'Digital passphrase entry, real-time attendance monitoring, and campus safety alerts. Every entry and exit is recorded. Parents are notified instantly.' },
  { icon: <MessageSquare className="w-5 h-5" />, col: 'orange', t: 'Smart Notifications', b: 'Parents get SMS, WhatsApp, and push alerts for every payment, attendance event, and school update. Real-time visibility. Zero surprises.' },
  { icon: <BarChart3 className="w-5 h-5" />, col: 'pink', t: 'School Analytics', b: 'School admins get real-time revenue dashboards, meal tracking, attendance reports, and financial summaries. Data-driven school management.' },
  { icon: <Star className="w-5 h-5" />, col: 'yellow', t: 'Financial Literacy', b: 'Gamified money lessons for children. Savings goals, reward coins, and leaderboards. Building financially confident young Nigerians.' },
];

const colMap: Record<string, { border: string; text: string; iconBg: string }> = {
  emerald: { border: 'hover:border-emerald-500/40', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20' },
  blue:    { border: 'hover:border-blue-500/40',    text: 'text-blue-400',    iconBg: 'bg-blue-500/20' },
  purple:  { border: 'hover:border-purple-500/40',  text: 'text-purple-400',  iconBg: 'bg-purple-500/20' },
  orange:  { border: 'hover:border-orange-500/40',  text: 'text-orange-400',  iconBg: 'bg-orange-500/20' },
  pink:    { border: 'hover:border-pink-500/40',    text: 'text-pink-400',    iconBg: 'bg-pink-500/20' },
  yellow:  { border: 'hover:border-yellow-500/40',  text: 'text-yellow-400',  iconBg: 'bg-yellow-500/20' },
};

export function AdkSolution() {
  return (
    <SlideWrap>
      <Tag>The Solution</Tag>
      <H1>One platform. Every school need. Every child.</H1>
      <div className="grid grid-cols-3 gap-5">
        {cards.map((card) => {
          const c = colMap[card.col];
          return (
            <div key={card.t} className={`bg-white/5 border border-white/10 ${c.border} rounded-2xl p-5 transition-colors`}>
              <div className={`w-9 h-9 rounded-xl ${c.iconBg} flex items-center justify-center ${c.text} mb-4`}>
                {card.icon}
              </div>
              <h4 className="font-bold text-sm mb-2 text-white">{card.t}</h4>
              <p className="text-white/50 text-xs leading-relaxed">{card.b}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-gradient-to-r from-emerald-900/30 to-blue-900/20 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-6">
        <div className="text-3xl">🔗</div>
        <div>
          <p className="font-bold text-sm text-white mb-1">Everything works together</p>
          <p className="text-white/50 text-xs leading-relaxed">
            A parent tops up → child wallet credited → school canteen charges lunch → parent gets WhatsApp alert → child arrives at school → Safe School logs attendance → parent notified. One platform, zero friction.
          </p>
        </div>
      </div>

      <p className="text-white/20 text-xs mt-4 text-center">
        * Community savings (Ajo) module under consideration for future release
      </p>
    </SlideWrap>
  );
}
