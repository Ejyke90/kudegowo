'use client';

import { Star } from 'lucide-react';
import { Tag, SlideWrap, StatBox } from './shared';

export function SlideCover() {
  return (
    <SlideWrap>
      <div className="grid grid-cols-2 gap-16 items-center min-h-[520px]">
        {/* Left */}
        <div>
          <Tag><Star className="w-3 h-3" /> Seed Round · 2026</Tag>
          <h1 className="text-7xl font-black tracking-tight leading-none mb-3 text-white">
            Kude<span className="text-emerald-400">gowo</span>
          </h1>
          <p className="text-white/40 italic text-sm mb-6">
            Yoruba — <em>"Let's manage our money together"</em>
          </p>
          <p className="text-2xl font-semibold leading-snug text-white/90 mb-4">
            Africa's school payments &amp; child financial platform
          </p>
          <p className="text-white/50 leading-relaxed mb-10">
            Digitising the ₦2.4 trillion Nigerian school payments market — starting with the cashless wallet every child deserves.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <StatBox value="54M+" label="School-age children" />
            <StatBox value="₦2.4T" label="Annual market size" />
            <StatBox value="Gap" label="No school-native fintech" />
          </div>
        </div>

        {/* Right — mock wallet UI */}
        <div className="relative">
          <div className="bg-gradient-to-br from-emerald-950 to-gray-900 border border-emerald-500/20 rounded-3xl p-7 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-sm text-white">
                K
              </div>
              <div>
                <div className="font-bold text-sm text-white">Amara's Wallet</div>
                <div className="text-xs text-white/40">JSS 2 · Greenfield Academy</div>
              </div>
              <span className="ml-auto text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            {/* Balance */}
            <div className="text-4xl font-black text-emerald-400 mb-0.5">₦12,500</div>
            <div className="text-xs text-white/30 mb-5">Available balance</div>

            {/* Transactions */}
            <div className="space-y-2.5">
              {[
                { l: 'Lunch — Monday', a: '-₦350', c: 'text-red-400' },
                { l: 'Mum topped up', a: '+₦5,000', c: 'text-emerald-400' },
                { l: 'School trip deposit', a: '-₦1,500', c: 'text-red-400' },
              ].map((t) => (
                <div
                  key={t.l}
                  className="flex justify-between py-2 border-b border-white/5 text-sm"
                >
                  <span className="text-white/60">{t.l}</span>
                  <span className={`font-semibold ${t.c}`}>{t.a}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {['Top Up', 'Meals', 'Ajo'].map((b) => (
                <button
                  key={b}
                  className="bg-white/10 rounded-xl py-2 text-xs font-medium hover:bg-white/20 transition-colors text-white"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -top-3 -right-3 bg-emerald-500 rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg text-white">
            🔒 CBN Compliant
          </div>
          <div className="absolute -bottom-3 -left-3 bg-gray-800 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg text-white">
            📱 USSD fallback
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
