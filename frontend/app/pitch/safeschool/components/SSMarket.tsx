'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

export function SSMarket() {
  return (
    <SlideWrap>
      <Tag>Market Opportunity</Tag>
      <H1>A massive, urgent, and unserved market</H1>

      <div className="grid grid-cols-2 gap-10 items-start">
        {/* Left — market facts */}
        <div className="space-y-4">
          {[
            {
              value: '91,252',
              label: 'Private schools in Nigeria',
              sub: 'Virtually none have a digital safety or access system',
              src: 'UBEC 2022',
              col: 'border-purple-500/30 bg-purple-500/5',
              valCol: 'text-purple-400',
            },
            {
              value: '37%',
              label: 'Schools with any early warning system',
              sub: 'Across 10 states assessed — 63% have nothing',
              src: 'UNICEF Minimum Standards for Safe Schools, Nigeria 2024',
              col: 'border-red-500/30 bg-red-500/5',
              valCol: 'text-red-400',
            },
            {
              value: '859',
              label: 'Children abducted from schools in 2023',
              sub: '777 in 2024 — kidnappings are accelerating',
              src: 'UNICEF Nigeria Annual Report 2024',
              col: 'border-orange-500/30 bg-orange-500/5',
              valCol: 'text-orange-400',
            },
            {
              value: '47M',
              label: 'Children enrolled in Nigerian schools',
              sub: '13.7M in private schools — our primary market',
              src: 'UBEC 2022',
              col: 'border-blue-500/30 bg-blue-500/5',
              valCol: 'text-blue-400',
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
                { e: '📱', t: '220M+ mobile subscribers in Nigeria (NCC 2024) — WhatsApp penetration makes instant parent alerts viable at zero infrastructure cost' },
                { e: '🏛️', t: 'Nigeria endorsed the Safe Schools Declaration and published Minimum Standards in 2024 — regulatory tailwind for digital compliance tools' },
                { e: '💸', t: 'Private school fees rose 50–70% in 2024 — schools under pressure to justify costs must demonstrate quality and safety to parents' },
                { e: '🌍', t: 'Same crisis exists across West Africa — Ghana, Cameroon, Mali, Niger all face school security challenges with zero digital solutions' },
                { e: '🏫', t: 'Federal Government overhaul of Safe Schools Initiative in 2024 — NSCDC named lead agency, creating procurement and partnership opportunities' },
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
                { name: 'Raptor Technologies (US)', detail: '52,000+ schools, visitor management + emergency alerts — $0 African presence' },
                { name: 'Centegix (US)', detail: 'Wearable staff alert badges — US-only, no African distribution' },
                { name: 'Cloudnotte (Nigeria)', detail: 'School management software — no safety or access control module' },
                { name: 'BlueBic (Africa)', detail: 'Fee tracking + attendance — no visitor management or emergency alerts' },
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
              <p className="text-emerald-400 text-xs font-semibold">→ No purpose-built school safety platform exists for Nigeria or West Africa. Kudegowo Safe School is first.</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
