'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

const streams = [
  { phase: 'Phase 1', col: 'bg-emerald-500', t: 'Per-Child Subscription', b: 'Parents pay a monthly fee per enrolled child. Freemium tier for basic payments; premium for wallet, literacy, and Safe School features.' },
  { phase: 'Phase 1', col: 'bg-blue-500', t: 'Transaction Fees', b: '0.5–1.5% on every payment processed through the platform — fees, meals, trips, uniforms.' },
  { phase: 'Phase 1', col: 'bg-purple-500', t: 'School Licence Fee', b: 'Annual platform licence per school. Includes onboarding, training, admin dashboard, and reporting.' },
  { phase: 'Phase 2', col: 'bg-orange-500', t: 'Safe School Subscription', b: 'Schools pay a monthly fee for the digital access, attendance, and safety alert system.' },
  { phase: 'Phase 2', col: 'bg-pink-500', t: 'Bank Partner Revenue', b: 'Activation fee and revenue share when parents open child savings accounts via our bank partner.' },
  { phase: 'Phase 3', col: 'bg-yellow-500', t: 'Tutor Marketplace Commission', b: 'Teachers and tutors offer virtual classes through the platform. Kudegowo takes a commission per session booked.' },
  { phase: 'Phase 3', col: 'bg-teal-500', t: 'Marketplace Commission', b: '5–15% affiliate commission on textbooks, uniforms, and edtech content sold through the platform.' },
];

export function AdkRevenue() {
  return (
    <SlideWrap>
      <Tag>Business Model</Tag>
      <H1>Multiple revenue streams. One platform.</H1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {streams.map((s) => (
          <div key={s.t} className="bg-white/5 border border-white/10 rounded-2xl p-4 relative">
            <span className={`absolute top-3 right-3 text-xs font-bold text-white px-2 py-0.5 rounded-full ${s.col}`}>
              {s.phase}
            </span>
            <h4 className="font-bold text-sm text-white mb-2 pr-16">{s.t}</h4>
            <p className="text-white/50 text-xs leading-relaxed">{s.b}</p>
          </div>
        ))}
      </div>

      {/* Model summary */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Why this model works</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { e: '🔁', t: 'Recurring revenue', b: 'Subscriptions from parents and schools provide predictable monthly income from day one.' },
            { e: '📈', t: 'Grows with usage', b: 'Transaction fees scale automatically as more payments flow through the platform.' },
            { e: '🌐', t: 'Proven globally', b: 'Revenue model mirrors ParentPay (UK), FACTS (US), and other leading edtech platforms worldwide.' },
          ].map((item) => (
            <div key={item.t} className="flex gap-3">
              <span className="text-xl shrink-0">{item.e}</span>
              <div>
                <p className="text-sm font-semibold text-white mb-1">{item.t}</p>
                <p className="text-xs text-white/50 leading-relaxed">{item.b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrap>
  );
}
