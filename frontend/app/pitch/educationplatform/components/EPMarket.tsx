'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

export function EPMarket() {
  return (
    <SlideWrap>
      <Tag>Market Opportunity</Tag>
      <H1>91,000 schools. Zero digital records. One MVP.</H1>

      <div className="grid grid-cols-2 gap-10 items-start">
        {/* Left — market facts */}
        <div className="space-y-4">
          {[
            {
              value: '91K+',
              label: 'Private schools in Nigeria',
              sub: 'Virtually none have digital attendance, homework, or score records',
              src: 'UBEC 2022',
              col: 'border-sky-500/30 bg-sky-500/5',
              valCol: 'text-sky-400',
            },
            {
              value: '13.7M',
              label: 'Children in private schools',
              sub: 'Parents paying premium fees with zero visibility into daily learning',
              src: 'UBEC 2022',
              col: 'border-purple-500/30 bg-purple-500/5',
              valCol: 'text-purple-400',
            },
            {
              value: '<5%',
              label: 'Schools using any digital tool',
              sub: 'Paper registers, verbal homework, handwritten report cards — still the norm',
              src: 'GSMA Connected Education Report 2023',
              col: 'border-red-500/30 bg-red-500/5',
              valCol: 'text-red-400',
            },
            {
              value: '220M+',
              label: 'Mobile subscribers in Nigeria',
              sub: 'Teachers already own smartphones — the infrastructure is there, the software is not',
              src: 'NCC 2024',
              col: 'border-emerald-500/30 bg-emerald-500/5',
              valCol: 'text-emerald-400',
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
                { e: '📱', t: 'Teachers already own Android phones — our MVP requires no laptop, no Wi-Fi, no IT setup. Just a phone and a SIM card.' },
                { e: '💸', t: 'Private school fees rose 50–70% in 2024 — parents paying premium fees now demand visibility, not just a report card once a term.' },
                { e: '🏛️', t: 'Federal EdTech Policy Framework 2023 — regulatory tailwind for digital tools in private schools. Government is pushing, not blocking.' },
                { e: '�', t: 'Kudegowo already has school relationships via payments and Safe School — KudiEko is an add-on, not a cold start.' },
                { e: '🌍', t: 'Same gap across West Africa — Ghana, Cameroon, Senegal all have private school markets with zero digital school records.' },
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
                { name: 'ULesson (Nigeria)', detail: 'Video lessons for SS students only — no attendance, no homework tracking, no school integration' },
                { name: 'Prepclass (Nigeria)', detail: 'Tutor booking only — no school records, no attendance, no scores, no parent alerts' },
                { name: 'Cloudnotte (Nigeria)', detail: 'School admin/fees — no attendance tracking, no homework, no quiz or score management' },
                { name: 'Paper & WhatsApp groups', detail: 'Current reality for 95%+ of schools — no structure, no records, no accountability' },
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
              <p className="text-sky-400 text-xs font-semibold">→ No platform combines NERDC curriculum, tutor marketplace, and school integration for Nigeria. KudiEko is first.</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
