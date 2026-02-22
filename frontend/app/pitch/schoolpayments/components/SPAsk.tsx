'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

const useOfFunds = [
  { pct: '45%', label: 'Product & Engineering', detail: 'School Payments MVP: fee collection, child wallet, canteen module, parent alerts.', col: 'bg-emerald-500' },
  { pct: '25%', label: 'School Pilots & Sales', detail: 'Onboard 5–10 Lagos private schools. Dedicated school success manager.', col: 'bg-blue-500' },
  { pct: '20%', label: 'Operations & Compliance', detail: 'CBN payment licence, NDPR audit, bank partner integration, legal entity.', col: 'bg-purple-500' },
  { pct: '10%', label: 'Marketing & Awareness', detail: 'School finance awareness campaign. Parent trust-building. Brand launch.', col: 'bg-orange-500' },
];

const milestones = [
  { q: 'Q2 2026', m: 'Close round. Begin School Payments MVP build. Identify 5 pilot schools in Lagos.' },
  { q: 'Q3 2026', m: 'Launch digital fee collection + parent alerts at first 3 pilot schools.' },
  { q: 'Q4 2026', m: 'Add child wallet + canteen module. Validate parent adoption and NPS.' },
  { q: 'Q1 2027', m: 'Expand to 25 schools. Launch instalment plans. Begin Abuja entry.' },
];

const revenue = [
  { stream: 'Per-Child Subscription', detail: '₦500–₦1,500/child/month. Freemium → Premium.', phase: 'Phase 1' },
  { stream: 'Transaction Fees', detail: '0.5–1.5% on every payment processed through the platform.', phase: 'Phase 1' },
  { stream: 'School Licence Fee', detail: '₦50k–₦500k/year per school. Onboarding + dashboard included.', phase: 'Phase 1' },
  { stream: 'Bank Partner Revenue', detail: 'Activation fee + revenue share on child savings deposits.', phase: 'Phase 2' },
];

export function SPAsk() {
  return (
    <SlideWrap>
      <Tag>The Ask</Tag>
      <H1>Fund Nigeria's first school payments platform</H1>

      <div className="grid grid-cols-3 gap-8">
        {/* Use of funds */}
        <div>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Use of Funds</h3>
          <div className="space-y-3 mb-5">
            {useOfFunds.map((f) => (
              <div key={f.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-white">{f.label}</span>
                  <span className="text-xs font-black text-white">{f.pct}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full mb-1">
                  <div className={`h-1.5 ${f.col} rounded-full`} style={{ width: f.pct }} />
                </div>
                <p className="text-xs text-white/30">{f.detail}</p>
              </div>
            ))}
          </div>

          {/* Revenue model */}
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Revenue Model</h3>
          <div className="space-y-2">
            {revenue.map((r) => (
              <div key={r.stream} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs font-semibold text-white">{r.stream}</p>
                  <span className="text-xs text-emerald-400 font-bold shrink-0 ml-2">{r.phase}</span>
                </div>
                <p className="text-xs text-white/40">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">18-Month Milestones</h3>
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
                  <p className="text-xs text-white/60 leading-relaxed">{m.m}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Unit economics */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Illustrative unit economics</p>
            <div className="space-y-2 text-xs">
              {[
                { label: 'Avg. children per school', value: '200' },
                { label: 'Subscription per child/mo', value: '₦1,000' },
                { label: 'Revenue per school / mo', value: '₦200k' },
                { label: '10 pilot schools (90-day)', value: '₦2M / mo' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-white/40">{label}</span>
                  <span className="font-bold text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing */}
        <div>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Why now. Why us.</h3>
          <div className="space-y-3 mb-6">
            {[
              { e: '💸', t: '₦2.4T in school fees collected in cash annually', b: 'The inefficiency is real, documented, and growing. Every term, billions move through envelopes and handshakes.' },
              { e: '📋', t: 'No digital school payments platform exists in Nigeria', b: 'Cloudnotte and BlueBic offer basic tracking. No one has built the full stack — collection, wallet, canteen, alerts.' },
              { e: '🌍', t: 'Same gap across West Africa', b: 'Ghana, Kenya, Cameroon all have growing private school markets with zero digital payment infrastructure. We are first.' },
              { e: '🔗', t: 'Integrated with Kudegowo Safe School', b: 'Schools already using Safe School get payments as an add-on. Distribution is built in. One platform, two products.' },
            ].map((item) => (
              <div key={item.t} className="bg-white/5 border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-xl shrink-0">{item.e}</span>
                <div>
                  <p className="text-xs font-bold text-white mb-0.5">{item.t}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{item.b}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing card */}
          <div className="bg-gradient-to-br from-emerald-900/50 to-gray-900 border border-emerald-500/30 rounded-2xl p-5">
            <p className="text-base font-bold text-white leading-snug mb-2">
              Every Nigerian school deserves to run without cash — and every parent deserves to see every naira.
            </p>
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              Kudegowo School Payments is the infrastructure that makes this possible — starting with 91,252 private schools and 13.7 million children.
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
                <p className="text-xs font-bold text-white">kudegowo.com/schoolpay</p>
                <p className="text-xs text-white/40">hello@kudegowo.com</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">What we are seeking</p>
            <div className="space-y-1.5">
              {[
                { e: '💰', t: '₦150M seed investment (~$100k USD)' },
                { e: '🏫', t: 'Introductions to private school networks in Lagos' },
                { e: '🏦', t: 'Bank partner for child savings accounts' },
                { e: '🤝', t: 'Strategic partnership for school finance advocacy' },
              ].map((item) => (
                <div key={item.t} className="flex gap-2 items-center">
                  <span className="text-sm">{item.e}</span>
                  <p className="text-xs text-white/70">{item.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
