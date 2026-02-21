'use client';

import { Tag, SlideWrap, H1 } from './shared';

export function SlideMarket() {
  return (
    <SlideWrap>
      <Tag>Market Opportunity</Tag>
      <H1>A massive, underpenetrated market</H1>
      <div className="grid grid-cols-2 gap-12 items-start">
        {/* TAM / SAM / SOM */}
        <div className="space-y-4">
          {[
            { l: 'TAM', v: '₦2.4T', s: 'All school-related payments in Nigeria annually', src: 'Est. · NBS education spend data', w: 'w-full', col: 'bg-emerald-500' },
            { l: 'SAM', v: '₦480B', s: 'Private & semi-private schools in urban Nigeria (~20%)', src: 'Illustrative · 20% of TAM assumption', w: 'w-4/5', col: 'bg-blue-500' },
            { l: 'SOM', v: '₦4.8B', s: '1% of SAM — target within 3 years of launch', src: 'Illustrative · to be validated at pilot', w: 'w-1/3', col: 'bg-purple-500' },
          ].map(({ l, v, s, src, w, col }) => (
            <div key={l} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xs font-bold text-white/40 w-8">{l}</span>
                <span className="text-2xl font-black text-white">{v}</span>
              </div>
              <p className="text-white/50 text-xs mb-1 ml-11">{s}</p>
              <p className="text-white/25 text-xs italic mb-3 ml-11">{src}</p>
              <div className="h-1.5 bg-white/10 rounded-full ml-11">
                <div className={`h-1.5 ${col} rounded-full ${w}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Why now */}
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-white">Why now?</h3>
          {[
            { e: '📱', t: 'Nigeria has 220M+ mobile subscribers (NCC, 2024) — smartphone adoption accelerating across urban centres' },
            { e: '🏦', t: "CBN's cashless policy is accelerating — cash handling limits tightening every year" },
            { e: '🎓', t: '54M school-age children, 50,000+ private schools — and zero dominant school fintech' },
            { e: '💳', t: 'Paystack, Flutterwave, and Moniepoint have proven Nigerians will pay digitally' },
            { e: '🌍', t: 'Playbook scales to Ghana, Kenya, East Africa — same Ajo culture, same cash problem' },
          ].map((item) => (
            <div key={item.t} className="flex gap-3 items-start">
              <span className="text-xl">{item.e}</span>
              <p className="text-white/60 text-sm leading-relaxed">{item.t}</p>
            </div>
          ))}

          {/* Competitor gap */}
          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Competitive landscape</p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { name: 'Traditional Banks', gap: 'No school UX' },
                { name: 'PiggyVest / Cowrywise', gap: 'Adults only' },
                { name: 'WhatsApp Ajo', gap: 'No escrow, no safety' },
              ].map(({ name, gap }) => (
                <div key={name} className="bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                  <div className="font-semibold text-white/70 mb-1">{name}</div>
                  <div className="text-red-400 text-xs">{gap}</div>
                </div>
              ))}
            </div>
            <p className="text-emerald-400 text-xs font-semibold mt-3 text-center">
              ✅ Kudegowo is the only school-native child fintech in Nigeria
            </p>
          </div>
        </div>
      </div>

      {/* Definitions footnote */}
      <p className="text-white/25 text-xs mt-6 leading-relaxed">
        * <span className="text-white/40 font-semibold">TAM</span> — Total Addressable Market: the entire market if 100% were captured. &nbsp;
        <span className="text-white/40 font-semibold">SAM</span> — Serviceable Addressable Market: the portion reachable with our product and distribution. &nbsp;
        <span className="text-white/40 font-semibold">SOM</span> — Serviceable Obtainable Market: the realistic near-term share we can capture.
      </p>
    </SlideWrap>
  );
}
