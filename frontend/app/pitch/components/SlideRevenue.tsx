'use client';

import { Tag, SlideWrap, H1 } from './shared';

const streams = [
  { e: '💳', t: 'Per-Child Subscription', d: '₦500–₦1,500/child/month. Freemium → Premium.', p: 'Phase 1' },
  { e: '⚡', t: 'Transaction Fees', d: '0.5–1.5% on every payment processed through the platform.', p: 'Phase 1' },
  { e: '🏫', t: 'School Licence Fee', d: '₦50k–₦500k/year per school. Onboarding + dashboard included.', p: 'Phase 1' },
  { e: '🔄', t: 'Digital Ajo Fees', d: '0.5% platform fee per cycle. School community trust = low default risk.', p: 'Phase 2' },
  { e: '🏦', t: 'Bank Partner Revenue', d: 'Activation fee + revenue share on child savings deposits.', p: 'Phase 2' },
  { e: '🛒', t: 'Marketplace Commission', d: '5–15% affiliate commission. Textbooks, uniforms, edtech content.', p: 'Phase 3' },
];

const phaseColor: Record<string, string> = {
  'Phase 1': 'bg-emerald-500/20 text-emerald-400',
  'Phase 2': 'bg-blue-500/20 text-blue-400',
  'Phase 3': 'bg-purple-500/20 text-purple-400',
};

export function SlideRevenue() {
  return (
    <SlideWrap>
      <Tag>Business Model</Tag>
      <H1>6 interlocking revenue streams</H1>

      <div className="grid grid-cols-3 gap-4 mb-7">
        {streams.map((s) => (
          <div key={s.t} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl">{s.e}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${phaseColor[s.p]}`}>{s.p}</span>
            </div>
            <h4 className="font-bold text-sm mb-1 text-white">{s.t}</h4>
            <p className="text-white/50 text-xs leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>

      {/* Unit economics */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Illustrative unit economics — per school</p>
        <div className="grid grid-cols-3 gap-5">
          {[
            { label: 'Avg. children per school', value: '200', sub: 'private/semi-private Lagos school' },
            { label: 'Subscription per child/mo', value: '₦1,000', sub: 'mid-tier plan' },
            { label: 'Revenue per school / mo', value: '₦200k', sub: '200 × ₦1,000' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-black text-emerald-400 mb-1">{value}</div>
              <div className="text-xs font-semibold text-white/70 mb-0.5">{label}</div>
              <div className="text-xs text-white/30 italic">{sub}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
          {[
            { label: '10 pilot schools (90-day target)', value: '₦2M / mo', c: 'text-blue-400' },
            { label: '100 schools (12-month target)', value: '₦20M / mo', c: 'text-purple-400' },
          ].map(({ label, value, c }) => (
            <div key={label}>
              <div className={`text-xl font-black ${c} mb-1`}>{value}</div>
              <div className="text-xs text-white/40">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-white/30 mt-4 text-center">
        * Illustrative only. Based on publicly available Nigerian private school data. Actual figures will be validated during the pilot phase funded by this raise.
      </p>
    </SlideWrap>
  );
}
