'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

export function SPMarket() {
  return (
    <SlideWrap>
      <Tag>Market Opportunity</Tag>
      <H1>A massive, underserved, and urgent market</H1>

      <div className="grid grid-cols-2 gap-10 items-start">
        {/* Left — market facts */}
        <div className="space-y-4">
          {[
            {
              value: '₦2.4T',
              label: 'School fees collected in cash annually',
              sub: 'Virtually none processed digitally — no audit trail, no efficiency',
              src: 'CBN Payment System Report 2023',
              col: 'border-emerald-500/30 bg-emerald-500/5',
              valCol: 'text-emerald-400',
            },
            {
              value: '91,252',
              label: 'Private schools in Nigeria',
              sub: 'Less than 2% have any form of digital fee collection',
              src: 'UBEC 2022',
              col: 'border-purple-500/30 bg-purple-500/5',
              valCol: 'text-purple-400',
            },
            {
              value: '13.7M',
              label: 'Children in private schools',
              sub: 'Primary market — parents paying ₦50k–₦500k+ per term',
              src: 'UBEC 2022',
              col: 'border-blue-500/30 bg-blue-500/5',
              valCol: 'text-blue-400',
            },
            {
              value: '54M',
              label: 'Children with no financial identity',
              sub: 'No wallet, no savings, no credit history — Kudegowo fixes this',
              src: 'NBS 2024 · EFInA',
              col: 'border-orange-500/30 bg-orange-500/5',
              valCol: 'text-orange-400',
            },
          ].map((item) => (
            <div key={item.label} className={`border ${item.col} rounded-xl p-4`}>
              <div className={`text-2xl font-black mb-0.5 ${item.valCol}`}>{item.value}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="text-xs text-white/40 mt-0.5">{item.sub}</p>
              <p className="text-white/20 text-xs mt-1">Source: {item.src}</p>
            </div>
          ))}
        </div>

        {/* Right — why now + competitive gap */}
        <div className="space-y-5">
          <div>
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Why this market is ready now</h3>
            <div className="space-y-3">
              {[
                { e: '📱', t: '220M+ mobile subscribers in Nigeria (NCC 2024) — WhatsApp penetration makes instant payment alerts viable at zero infrastructure cost' },
                { e: '🏦', t: 'CBN cashless policy expansion in 2023 — regulatory tailwind pushing schools and parents toward digital payments' },
                { e: '💸', t: 'Private school fees rose 50–70% in 2024 — schools under pressure to demonstrate financial transparency and efficiency to parents' },
                { e: '🌍', t: 'Same problem exists across West Africa — Ghana, Kenya, Cameroon all have private school markets with zero digital payment infrastructure' },
                { e: '🏫', t: 'Post-COVID digital adoption — school proprietors are more open to technology than ever before, reducing sales friction' },
              ].map((item) => (
                <div key={item.t} className="flex gap-3 items-start bg-white/5 border border-white/10 rounded-xl p-3">
                  <span className="text-base shrink-0">{item.e}</span>
                  <p className="text-white/60 text-xs leading-relaxed">{item.t}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Global comparables</p>
            <div className="space-y-2 text-xs">
              {[
                { name: 'SchoolMint (US)', detail: 'Enrollment + fee management — $0 African presence, no child wallet' },
                { name: 'Brightwheel (US)', detail: 'Childcare payments — US/Canada only, no Nigerian market entry' },
                { name: 'Cloudnotte (Nigeria)', detail: 'School management software — no payment processing or child wallet' },
                { name: 'BlueBic (Africa)', detail: 'Basic fee tracking — no canteen, no child wallet, no parent alerts' },
              ].map((c) => (
                <div key={c.name} className="flex gap-2 items-start">
                  <span className="text-white/20 shrink-0">—</span>
                  <div>
                    <span className="font-semibold text-white/70">{c.name}: </span>
                    <span className="text-white/40">{c.detail}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-emerald-400 text-xs font-semibold">→ No purpose-built school payments + child wallet platform exists for Nigeria. Kudegowo School Payments is first.</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
