'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

const useOfFunds = [
  { pct: '45%', label: 'Product & Engineering', detail: 'Safe School MVP: digital check-in, attendance dashboard, visitor log, emergency alerts.', col: 'bg-purple-500' },
  { pct: '25%', label: 'School Pilots & Sales', detail: 'Onboard 5–10 Lagos private schools. Dedicated school success manager.', col: 'bg-blue-500' },
  { pct: '20%', label: 'Operations & Compliance', detail: 'NDPR audit, NSCDC partnership discussions, legal entity, data residency.', col: 'bg-emerald-500' },
  { pct: '10%', label: 'Marketing & Awareness', detail: 'School safety awareness campaign. Parent trust-building. Brand launch.', col: 'bg-orange-500' },
];

const milestones = [
  { q: 'Q2 2026', m: 'Close round. Begin Safe School MVP build. Identify 5 pilot schools in Lagos.' },
  { q: 'Q3 2026', m: 'Launch digital check-in + attendance dashboard at first 3 pilot schools.' },
  { q: 'Q4 2026', m: 'Add visitor management + emergency alerts. Validate parent adoption and NPS.' },
  { q: 'Q1 2027', m: 'Expand to 25 schools. Begin NSCDC partnership conversations. Abuja entry.' },
];

const revenue = [
  { stream: 'School Safety Subscription', detail: '₦10,000–₦30,000/month per school depending on size', phase: 'Phase 1' },
  { stream: 'Per-Child Safety Fee', detail: '₦200–₦500/child/month — bundled with parent app', phase: 'Phase 1' },
  { stream: 'Visitor Management Module', detail: 'Add-on for schools with high visitor volume', phase: 'Phase 2' },
  { stream: 'Govt / NSCDC Contract', detail: 'Bulk licensing to state education ministries', phase: 'Phase 3' },
];

export function SSAsk() {
  return (
    <SlideWrap>
      <Tag>The Ask</Tag>
      <H1>Fund Nigeria's first school safety platform</H1>

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
                  <span className="text-xs text-purple-400 font-bold shrink-0 ml-2">{r.phase}</span>
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
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${i === 0 ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60'}`}>
                    {i + 1}
                  </div>
                  {i < milestones.length - 1 && <div className="w-px h-6 bg-white/10 mt-1" />}
                </div>
                <div className="pb-3">
                  <p className="text-xs font-bold text-purple-400">{m.q}</p>
                  <p className="text-xs text-white/60 leading-relaxed">{m.m}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What we need */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">What we are seeking</p>
            <div className="space-y-2">
              {[
                { e: '💰', t: '₦150M seed investment (~$100k USD)' },
                { e: '🏫', t: 'Introductions to private school networks in Lagos' },
                { e: '🏛️', t: 'Connections to NSCDC or state education ministries' },
                { e: '🤝', t: 'Strategic partnership for school safety advocacy' },
              ].map((item) => (
                <div key={item.t} className="flex gap-2 items-center">
                  <span className="text-sm">{item.e}</span>
                  <p className="text-xs text-white/70">{item.t}</p>
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
              { e: '🚨', t: '859 children abducted from schools in 2023', b: 'The crisis is real, documented, and worsening. The urgency is not manufactured.' },
              { e: '📋', t: '63% of schools have no early warning system', b: 'UNICEF has published the standards. No one has built the product to meet them.' },
              { e: '🌍', t: 'No African school safety platform exists', b: 'Raptor has 52,000 US schools. Africa has zero. We are first.' },
              { e: '🔗', t: 'Integrated with Kudegowo payments', b: 'Schools already using Kudegowo get Safe School as an add-on. Distribution is built in.' },
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
          <div className="bg-gradient-to-br from-purple-900/50 to-gray-900 border border-purple-500/30 rounded-2xl p-5">
            <p className="text-base font-bold text-white leading-snug mb-2">
              Every Nigerian child deserves to arrive at school safely — and for their parent to know it.
            </p>
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              Kudegowo Safe School is the infrastructure that makes this possible — starting with 91,252 private schools and 13.7 million children.
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
                <p className="text-xs font-bold text-white">kudegowo.com/safeschool</p>
                <p className="text-xs text-white/40">hello@kudegowo.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
