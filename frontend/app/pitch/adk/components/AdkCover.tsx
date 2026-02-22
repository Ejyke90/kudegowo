'use client';

import { Star } from 'lucide-react';
import { Tag, SlideWrap, StatBox } from '../../components/shared';

export function AdkCover() {
  return (
    <SlideWrap>
      <div className="grid grid-cols-2 gap-16 items-center min-h-[520px]">
        {/* Left */}
        <div>
          <Tag><Star className="w-3 h-3" /> Confidential · 2026</Tag>
          <h1 className="text-7xl font-black tracking-tight leading-none mb-3 text-white">
            Kude<span className="text-emerald-400">gowo</span>
          </h1>
          <p className="text-white/40 italic text-sm mb-6">
            Yoruba — <em>"Let's manage our money together"</em>
          </p>
          <p className="text-2xl font-semibold leading-snug text-white/90 mb-4">
            Nigeria's Education & Payments Platform
          </p>
          <p className="text-white/50 leading-relaxed mb-10">
            The financial and academic infrastructure for Nigerian schools — starting with the cashless wallet every child deserves.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <StatBox value="91,252" label="Private schools in Nigeria" />
            <StatBox value="47M" label="Children enrolled" />
            <StatBox value="₦600T" label="E-payments in Nigeria 2023" />
          </div>
          <p className="text-white/20 text-xs mt-3">Sources: UBEC 2022 · NIBSS / BusinessDay 2023</p>
        </div>

        {/* Right — platform overview visual */}
        <div className="relative">
          <div className="bg-gradient-to-br from-emerald-950 to-gray-900 border border-emerald-500/20 rounded-3xl p-7 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-sm text-white">K</div>
              <div>
                <div className="font-bold text-sm text-white">Kudegowo Platform</div>
                <div className="text-xs text-white/40">Education · Payments · Safety</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: '💳', label: 'School Payments', desc: 'Cashless fees, meals & trips', col: 'border-emerald-500/30 bg-emerald-500/5' },
                { icon: '👶', label: 'Child Wallet', desc: 'Spending wallet with parental controls', col: 'border-blue-500/30 bg-blue-500/5' },
                { icon: '🛡️', label: 'Safe School', desc: 'Digital access, attendance & safety', col: 'border-purple-500/30 bg-purple-500/5' },
                { icon: '📊', label: 'School Analytics', desc: 'Revenue dashboards & reports', col: 'border-orange-500/30 bg-orange-500/5' },
              ].map((item) => (
                <div key={item.label} className={`flex items-center gap-3 border ${item.col} rounded-xl px-4 py-2.5`}>
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-white">{item.label}</p>
                    <p className="text-xs text-white/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -top-3 -right-3 bg-emerald-500 rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg text-white">
            🇳🇬 Built for Nigeria
          </div>
          <div className="absolute -bottom-3 -left-3 bg-gray-800 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg text-white">
            📱 Mobile-first
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
