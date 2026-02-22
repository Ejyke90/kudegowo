'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

const useOfFunds = [
  { pct: '40%', label: 'Product & Engineering', detail: 'Complete child wallet + Safe School MVP. Ship school admin v2. First pilot integrations.', col: 'bg-emerald-500' },
  { pct: '25%', label: 'Growth & Sales', detail: 'First sales hire. School onboarding playbook. Lagos pilot market entry.', col: 'bg-blue-500' },
  { pct: '20%', label: 'Operations & Legal', detail: 'Compliance, legal entity setup, bank partner negotiations.', col: 'bg-purple-500' },
  { pct: '15%', label: 'Marketing', detail: 'Parent acquisition campaigns. School referral programme. Brand launch.', col: 'bg-orange-500' },
];

const milestones = [
  { q: 'Q2 2026', m: 'Close round. First sales hire. Begin school pilot outreach.' },
  { q: 'Q3 2026', m: 'Launch child wallet + Safe School MVP. Onboard first 10 pilot schools in Lagos.' },
  { q: 'Q4 2026', m: 'Validate pricing with real payment volume. Bank partner agreement signed.' },
  { q: 'Q1 2027', m: 'Expand to Abuja. Begin next funding round preparation based on pilot data.' },
];

export function AdkAsk() {
  return (
    <SlideWrap>
      <Tag>Partnership Opportunity</Tag>
      <H1>Building Nigeria's education infrastructure together</H1>

      <div className="grid grid-cols-2 gap-10 items-start">
        {/* Use of funds */}
        <div>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5">How funds will be used</h3>
          <div className="space-y-3 mb-6">
            {useOfFunds.map((f) => (
              <div key={f.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-semibold text-white">{f.label}</span>
                  <span className="text-sm font-black text-white">{f.pct}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full mb-1">
                  <div className={`h-2 ${f.col} rounded-full`} style={{ width: f.pct }} />
                </div>
                <p className="text-xs text-white/40">{f.detail}</p>
              </div>
            ))}
          </div>

          {/* What we're seeking */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">What we are seeking</p>
            <div className="space-y-2">
              {[
                { e: '💰', t: '₦150M seed investment (~$100k USD)' },
                { e: '🤝', t: 'Strategic partnership and market access' },
                { e: '🏫', t: 'Introductions to school networks and education stakeholders' },
                { e: '🧭', t: 'Advisory support on Nigerian education sector' },
              ].map((item) => (
                <div key={item.t} className="flex gap-2 items-center">
                  <span className="text-base">{item.e}</span>
                  <p className="text-sm text-white/70">{item.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones + closing */}
        <div>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5">18-Month Plan</h3>
          <div className="space-y-3 mb-6">
            {milestones.map((m, i) => (
              <div key={m.q} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${i === 0 ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/60'}`}>
                    {i + 1}
                  </div>
                  {i < milestones.length - 1 && <div className="w-px h-6 bg-white/10 mt-1" />}
                </div>
                <div className="pb-3">
                  <p className="text-xs font-bold text-emerald-400">{m.q}</p>
                  <p className="text-sm text-white/70">{m.m}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing statement */}
          <div className="bg-gradient-to-br from-emerald-900/50 to-gray-900 border border-emerald-500/30 rounded-2xl p-6">
            <p className="text-lg font-bold text-white leading-snug mb-3">
              91,252 schools. 13.7 million children. Zero dominant platform.
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Kudegowo is building the financial and educational infrastructure for the next generation of Nigerian families — starting in schools, where trust is already established.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { i: 'EU', c: 'bg-emerald-600' },
                { i: 'TO', c: 'bg-blue-600' },
                { i: 'JO', c: 'bg-purple-600' },
                { i: 'NN', c: 'bg-pink-600' },
                { i: 'HO', c: 'bg-orange-600' },
              ].map(({ i, c }) => (
                <div key={i} className={`w-8 h-8 rounded-lg ${c} flex items-center justify-center font-black text-xs text-white`}>{i}</div>
              ))}
              <div className="ml-1">
                <p className="text-xs font-bold text-white">kudegowo.com</p>
                <p className="text-xs text-white/40">hello@kudegowo.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
