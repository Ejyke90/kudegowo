'use client';

import { CreditCard } from 'lucide-react';
import { Tag, SlideWrap, StatBox } from '../../components/shared';

export function SPCover() {
  return (
    <SlideWrap>
      <div className="grid grid-cols-2 gap-16 items-center min-h-[520px]">
        <div>
          <Tag><CreditCard className="w-3 h-3" /> School Payments · 2026</Tag>
          <h1 className="text-6xl font-black tracking-tight leading-none mb-3 text-white">
            School<span className="text-emerald-400">Pay</span>
          </h1>
          <p className="text-white/40 italic text-sm mb-6">by Kudegowo</p>
          <p className="text-2xl font-semibold leading-snug text-white/90 mb-4">
            Nigeria's first cashless school payments platform
          </p>
          <p className="text-white/50 leading-relaxed mb-10">
            Digital fee collection, child wallets, canteen payments, and real-time parent alerts — purpose-built for Nigerian private schools and the families they serve.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <StatBox value="₦2.4T" label="School fees handled in cash annually" />
            <StatBox value="91K+" label="Private schools with no digital payments" />
            <StatBox value="54M" label="Children with zero financial identity" />
          </div>
          <p className="text-white/20 text-xs mt-3">Sources: CBN 2023 · UBEC 2022 · NBS 2024</p>
        </div>

        {/* Right — live payment preview */}
        <div className="relative">
          <div className="bg-gradient-to-br from-emerald-950 to-gray-900 border border-emerald-500/20 rounded-3xl p-7 shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-sm text-white">💳</div>
              <div>
                <div className="font-bold text-sm text-white">Greenfield Academy</div>
                <div className="text-xs text-white/40">Lagos · Payment Dashboard</div>
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Collected', value: '₦4.2M', col: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                { label: 'Pending', value: '₦840k', col: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
                { label: 'Overdue', value: '₦210k', col: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
              ].map((s) => (
                <div key={s.label} className={`border ${s.bg} rounded-xl p-3 text-center`}>
                  <div className={`text-xl font-black ${s.col}`}>{s.value}</div>
                  <div className="text-xs text-white/40">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {[
                { name: 'Amara Okafor', type: 'School Fees', amount: '₦85,000', status: 'Paid', col: 'text-emerald-400', icon: '✅' },
                { name: 'Chidi Nwosu', type: 'Canteen Top-up', amount: '₦5,000', status: 'Paid', col: 'text-emerald-400', icon: '✅' },
                { name: 'Fatima Bello', type: 'School Fees', amount: '₦85,000', status: 'Overdue', col: 'text-red-400', icon: '⚠️' },
              ].map((e) => (
                <div key={e.name} className="flex items-center justify-between py-2 border-b border-white/5 text-xs">
                  <div className="flex items-center gap-2">
                    <span>{e.icon}</span>
                    <div>
                      <p className="font-semibold text-white">{e.name}</p>
                      <p className="text-white/30">{e.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${e.col}`}>{e.status}</p>
                    <p className="text-white/30">{e.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -top-3 -right-3 bg-emerald-500 rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg text-white">
            📱 Parent alerts live
          </div>
          <div className="absolute -bottom-3 -left-3 bg-gray-800 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg text-white">
            💸 Zero cash on campus
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
