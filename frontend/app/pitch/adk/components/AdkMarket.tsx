'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

export function AdkMarket() {
  return (
    <SlideWrap>
      <Tag>Market Opportunity</Tag>
      <H1>A massive, untapped market</H1>

      <div className="grid grid-cols-2 gap-10 items-start">
        {/* Left — key market facts */}
        <div className="space-y-4">
          {[
            {
              value: '91,252',
              label: 'Private schools in Nigeria',
              sub: '171,027 total schools (public + private)',
              src: 'UBEC 2022',
              col: 'border-emerald-500/30 bg-emerald-500/5',
              valCol: 'text-emerald-400',
            },
            {
              value: '13.7M',
              label: 'Children enrolled in private schools',
              sub: '47 million total basic education enrolment',
              src: 'UBEC 2022',
              col: 'border-blue-500/30 bg-blue-500/5',
              valCol: 'text-blue-400',
            },
            {
              value: '23.3%',
              label: 'Private school share of primary enrolment',
              sub: 'Growing as parents seek quality education',
              src: 'World Bank 2023',
              col: 'border-purple-500/30 bg-purple-500/5',
              valCol: 'text-purple-400',
            },
            {
              value: '$400M',
              label: 'Nigeria EdTech market forecast by 2030',
              sub: 'Nigeria leads Africa — 34% of top 50 EdTech companies',
              src: 'EduTech Global 2024 · IMARC Group',
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
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Why now?</h3>
            <div className="space-y-3">
              {[
                { e: '📱', t: 'Nigeria has 220M+ mobile subscribers (NCC 2024) — smartphone adoption accelerating across urban centres' },
                { e: '🏦', t: "CBN's cashless policy is tightening — cash handling limits reduced every year, pushing schools toward digital" },
                { e: '📈', t: 'E-payment growth hit +88% YoY in Q1 2024 — Nigerians already trust digital payments (NIBSS)' },
                { e: '💸', t: 'Private school fees rose 50–70% in 2024 — schools urgently need smarter financial management tools' },
                { e: '🌍', t: 'Same playbook scales to Ghana, Kenya, East Africa — same cash culture, same school structure' },
              ].map((item) => (
                <div key={item.t} className="flex gap-3 items-start bg-white/5 border border-white/10 rounded-xl p-3">
                  <span className="text-base shrink-0">{item.e}</span>
                  <p className="text-white/60 text-xs leading-relaxed">{item.t}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">The gap</p>
            <p className="text-sm text-white/70 leading-relaxed">
              Despite 91,252 private schools and 13.7 million enrolled children, there is <span className="text-emerald-400 font-semibold">no dominant school-native platform</span> in Nigeria. Banks don't serve schools. Generic fintech apps don't understand school culture. Kudegowo is purpose-built for this gap.
            </p>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
