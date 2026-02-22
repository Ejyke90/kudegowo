'use client';

import { CreditCard, PiggyBank, Shield, MessageSquare, BarChart3, Star } from 'lucide-react';
import { Tag, SlideWrap, H1 } from './shared';

const cards = [
  { icon: <CreditCard className="w-5 h-5" />, col: 'emerald', t: 'Cashless School Payments', b: 'Parents pay tuition, meals, trips, and uniforms digitally. Schools receive funds instantly. No cash on premises.' },
  { icon: <PiggyBank className="w-5 h-5" />, col: 'blue', t: 'Child Wallet & Savings', b: 'Every child gets a spending wallet with parental controls and a savings account via our bank partner.' },
  { icon: <Shield className="w-5 h-5" />, col: 'purple', t: 'Safe School', b: 'Digital passphrase entry, real-time attendance monitoring, and campus safety alerts. Every entry and exit is recorded. Parents notified instantly.' },
  { icon: <MessageSquare className="w-5 h-5" />, col: 'orange', t: 'Smart Notifications', b: 'Parents get SMS, WhatsApp, and push alerts for every transaction. Real-time visibility. Zero surprises.' },
  { icon: <BarChart3 className="w-5 h-5" />, col: 'pink', t: 'School Analytics', b: 'Admins get real-time revenue dashboards, meal tracking, and financial reports. Data-driven school management.' },
  { icon: <Star className="w-5 h-5" />, col: 'yellow', t: 'Financial Literacy', b: 'Gamified money lessons for children. KudiCoins, leaderboards, savings goals. Building the next generation.' },
];

const colMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  emerald: { bg: '', border: 'hover:border-emerald-500/40', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20' },
  blue:    { bg: '', border: 'hover:border-blue-500/40',    text: 'text-blue-400',    iconBg: 'bg-blue-500/20' },
  purple:  { bg: '', border: 'hover:border-purple-500/40',  text: 'text-purple-400',  iconBg: 'bg-purple-500/20' },
  orange:  { bg: '', border: 'hover:border-orange-500/40',  text: 'text-orange-400',  iconBg: 'bg-orange-500/20' },
  pink:    { bg: '', border: 'hover:border-pink-500/40',    text: 'text-pink-400',    iconBg: 'bg-pink-500/20' },
  yellow:  { bg: '', border: 'hover:border-yellow-500/40',  text: 'text-yellow-400',  iconBg: 'bg-yellow-500/20' },
};

export function SlideSolution() {
  return (
    <SlideWrap>
      <Tag>The Solution</Tag>
      <H1>One platform. Every school payment. Every child.</H1>
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

      {/* How it connects */}
      <div className="mt-8 bg-gradient-to-r from-emerald-900/30 to-blue-900/20 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-6">
        <div className="text-3xl">🔗</div>
        <div>
          <p className="font-bold text-sm text-white mb-1">Everything is connected</p>
          <p className="text-white/50 text-xs leading-relaxed">
            A parent tops up → child wallet credited → school canteen debits at lunch → parent gets WhatsApp alert → savings auto-round-up → Ajo contribution auto-deducted. One ecosystem, zero friction.
          </p>
        </div>
      </div>
    </SlideWrap>
  );
}
