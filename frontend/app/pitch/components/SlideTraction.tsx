'use client';

import { Tag, SlideWrap, H1 } from './shared';

export function SlideTraction() {
  return (
    <SlideWrap>
      <Tag>Traction</Tag>
      <H1>Pre-launch. Product in hand. Problem confirmed.</H1>
      <div className="grid grid-cols-2 gap-12 items-start">
        <div>
          <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-5">What we have built</h3>
          <div className="space-y-3">
            {[
              { e: '✅', t: 'Marketing site live with full interactive wireframes' },
              { e: '✅', t: 'Paystack payment integration working end-to-end' },
              { e: '✅', t: 'Parent auth flow, child profiles, transaction history' },
              { e: '✅', t: 'School admin dashboard — UI complete, ready for pilot' },
              { e: '✅', t: 'Financial literacy prototype built and demoed' },
              { e: '🔄', t: 'Child wallet + Ajo module — in active development' },
            ].map((item) => (
              <div key={item.t} className="flex gap-3 items-start">
                <span className="text-base mt-0.5">{item.e}</span>
                <p className="text-white/60 text-sm leading-relaxed">{item.t}</p>
              </div>
            ))}
          </div>

          {/* Honest stage callout */}
          <div className="mt-5 bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Where we are</p>
            <p className="text-sm text-white/60 leading-relaxed">
              We are at the <span className="text-emerald-400 font-semibold">pre-seed / initial development stage</span>. The core product is in active development. This raise funds the sprint from working prototype to first paying schools.
            </p>
          </div>

          {/* What's next */}
          <div className="mt-3 bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Immediately after closing</p>
            <div className="space-y-2">
              {[
                'First sales hire — school onboarding begins',
                'Child wallet + Ajo module shipped to pilot schools',
                'Bank partner MOU signed for child savings account',
                'Real payment volume collected and pricing validated',
              ].map((item) => (
                <div key={item} className="flex gap-2 items-start">
                  <span className="text-emerald-400 text-xs mt-0.5 shrink-0">→</span>
                  <p className="text-white/60 text-xs leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-5">Why the problem is real</h3>

          <div className="space-y-3 mb-5">
            {[
              { e: '🏫', t: 'Nigerian schools overwhelmingly still collect fees in cash — no dominant digital alternative exists.' },
              { e: '👨‍👩‍👧', t: 'Parents have no real-time visibility into how school money is spent or what their child eats.' },
              { e: '💰', t: 'Ajo (rotating savings) is a deeply embedded cultural practice with no safe digital home.' },
              { e: '📵', t: '54 million school-age children in Nigeria — zero child-native fintech products.' },
            ].map((item) => (
              <div key={item.t} className="flex gap-3 items-start bg-white/5 rounded-xl p-3">
                <span className="text-lg shrink-0">{item.e}</span>
                <p className="text-white/60 text-xs leading-relaxed">{item.t}</p>
              </div>
            ))}
          </div>

          {/* Next milestone */}
          <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-xl p-4">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Next milestone with this raise</p>
            <p className="text-sm text-white/70 leading-relaxed">
              Onboard <span className="text-white font-semibold">first 10 pilot schools</span> in Lagos, collect real payment volume, and validate pricing — within 90 days of closing.
            </p>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
