'use client';

import { BookOpen } from 'lucide-react';
import { Tag, SlideWrap, StatBox } from '../../components/shared';

export function EPCover() {
  return (
    <SlideWrap>
      <div className="grid grid-cols-2 gap-16 items-center min-h-[520px]">
        <div>
          <Tag><BookOpen className="w-3 h-3" /> Education Platform · 2026</Tag>
          <h1 className="text-6xl font-black tracking-tight leading-none mb-3 text-white">
            Kudi<span className="text-sky-400">Eko</span>
          </h1>
          <p className="text-white/40 italic text-sm mb-6">by Kudegowo</p>
          <p className="text-2xl font-semibold leading-snug text-white/90 mb-4">
            Digital school records for every Nigerian classroom
          </p>
          <p className="text-white/50 leading-relaxed mb-8">
            Attendance tracking, homework management, scores, quizzes, and exam results — built for schools with basic smartphones and unreliable internet. No laptops required. No IT team needed.
          </p>

          {/* MVP vs Future pills */}
          <div className="flex gap-3 mb-8 flex-wrap">
            <span className="flex items-center gap-1.5 bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-bold px-3 py-1.5 rounded-full">✅ MVP — launching now</span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/40 text-xs font-bold px-3 py-1.5 rounded-full">🔮 Future — roadmap</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <StatBox value="91K+" label="Private schools with no digital records" />
            <StatBox value="54M" label="School-age children in Nigeria" />
            <StatBox value="67%" label="Students below reading proficiency" />
          </div>
          <p className="text-white/20 text-xs mt-3">Sources: UBEC 2022 · UNICEF 2024 · GSMA 2023</p>
        </div>

        {/* Right — simple dashboard mockup */}
        <div className="relative">
          <div className="bg-gradient-to-br from-sky-950 to-gray-900 border border-sky-500/20 rounded-3xl p-7 shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center font-black text-sm text-white">📚</div>
              <div>
                <div className="font-bold text-sm text-white">Greenfield Academy</div>
                <div className="text-xs text-white/40">Lagos · JSS 2A · Today</div>
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Present',    value: '28', col: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                { label: 'Absent',     value: '4',  col: 'text-red-400',     bg: 'bg-red-500/10 border-red-500/20' },
                { label: 'Avg. Score', value: '71%', col: 'text-sky-400',    bg: 'bg-sky-500/10 border-sky-500/20' },
              ].map((s) => (
                <div key={s.label} className={`border ${s.bg} rounded-xl p-3 text-center`}>
                  <div className={`text-xl font-black ${s.col}`}>{s.value}</div>
                  <div className="text-xs text-white/40">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {[
                { name: 'Amara Okafor',  status: 'Present', hw: 'Submitted', score: '82%', scol: 'text-emerald-400' },
                { name: 'Chidi Nwosu',   status: 'Present', hw: 'Missing',   score: '68%', scol: 'text-yellow-400' },
                { name: 'Fatima Bello',  status: 'Absent',  hw: '—',         score: '—',   scol: 'text-white/30' },
              ].map((e) => (
                <div key={e.name} className="flex items-center justify-between py-2 border-b border-white/5 text-xs">
                  <p className="font-semibold text-white w-28">{e.name}</p>
                  <span className={`${e.status === 'Present' ? 'text-emerald-400' : 'text-red-400'} font-semibold w-16`}>{e.status}</span>
                  <span className={`${e.hw === 'Missing' ? 'text-red-400' : e.hw === '—' ? 'text-white/20' : 'text-sky-400'} w-16`}>{e.hw}</span>
                  <span className={`font-bold ${e.scol}`}>{e.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -top-3 -right-3 bg-sky-500 rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg text-white">
            � Works on any phone
          </div>
          <div className="absolute -bottom-3 -left-3 bg-gray-800 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg text-white">
            📵 Offline-capable
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
