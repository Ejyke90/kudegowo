'use client';

import { Shield } from 'lucide-react';
import { Tag, SlideWrap, StatBox } from '../../components/shared';

export function SSCover() {
  return (
    <SlideWrap>
      <div className="grid grid-cols-2 gap-16 items-center min-h-[520px]">
        <div>
          <Tag><Shield className="w-3 h-3" /> Safe School · 2026</Tag>
          <h1 className="text-6xl font-black tracking-tight leading-none mb-3 text-white">
            Safe<span className="text-purple-400">School</span>
          </h1>
          <p className="text-white/40 italic text-sm mb-6">by Kudegowo</p>
          <p className="text-2xl font-semibold leading-snug text-white/90 mb-4">
            Nigeria's first digital school safety & access platform
          </p>
          <p className="text-white/50 leading-relaxed mb-10">
            Real-time attendance, digital campus access control, emergency alerts, and parent notifications — purpose-built for Nigerian private schools.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <StatBox value="859" label="Children abducted from schools in 2023" />
            <StatBox value="37%" label="Schools with any early warning system" />
            <StatBox value="91K+" label="Private schools with no digital safety" />
          </div>
          <p className="text-white/20 text-xs mt-3">Sources: UNICEF Nigeria 2024 · UBEC 2022</p>
        </div>

        {/* Right — live demo preview */}
        <div className="relative">
          <div className="bg-gradient-to-br from-purple-950 to-gray-900 border border-purple-500/20 rounded-3xl p-7 shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-purple-500 flex items-center justify-center font-black text-sm text-white">🛡️</div>
              <div>
                <div className="font-bold text-sm text-white">Greenfield Academy</div>
                <div className="text-xs text-white/40">Lagos · Live Dashboard</div>
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Present', value: '312', col: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
                { label: 'Absent', value: '18', col: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
                { label: 'Late', value: '7', col: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
              ].map((s) => (
                <div key={s.label} className={`border ${s.bg} rounded-xl p-3 text-center`}>
                  <div className={`text-2xl font-black ${s.col}`}>{s.value}</div>
                  <div className="text-xs text-white/40">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {[
                { name: 'Amara Okafor', class: 'JSS 2A', time: '7:42 AM', status: 'Checked in', col: 'text-green-400', icon: '✅' },
                { name: 'Chidi Nwosu', class: 'SS 1B', time: '7:58 AM', status: 'Checked in', col: 'text-green-400', icon: '✅' },
                { name: 'Fatima Bello', class: 'JSS 3C', time: '—', status: 'Not arrived', col: 'text-red-400', icon: '⚠️' },
              ].map((e) => (
                <div key={e.name} className="flex items-center justify-between py-2 border-b border-white/5 text-xs">
                  <div className="flex items-center gap-2">
                    <span>{e.icon}</span>
                    <div>
                      <p className="font-semibold text-white">{e.name}</p>
                      <p className="text-white/30">{e.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${e.col}`}>{e.status}</p>
                    <p className="text-white/30">{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -top-3 -right-3 bg-purple-500 rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg text-white">
            🔔 Parent alerts live
          </div>
          <div className="absolute -bottom-3 -left-3 bg-gray-800 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg text-white">
            📱 Works on any phone
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
