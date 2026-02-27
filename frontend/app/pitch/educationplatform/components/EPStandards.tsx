'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

const standards = [
  {
    org: 'MVP — Phase 1 (Now)',
    title: 'Core Digital Records',
    items: [
      'Daily attendance tracking',
      'Homework assignment & submission',
      'Test scores & class averages',
      'Simple quizzes (multiple choice)',
      'Exam results & digital report cards',
    ],
    kudegowo: ['✅ One-tap phone attendance', '✅ Teacher sets, parent sees', '✅ Auto class average + alerts', '✅ Offline-capable, syncs later', '✅ WhatsApp delivery to parents'],
    col: 'border-sky-500/30 bg-sky-500/5',
    badge: 'bg-sky-500/20 text-sky-400',
  },
  {
    org: 'Phase 2 — When schools are ready',
    title: 'Richer Learning Tools',
    items: [
      'NERDC-aligned digital lessons',
      'Video content per subject',
      'Adaptive learning paths',
      'Gamification (KudiCoins, streaks)',
      'Parent progress dashboards',
    ],
    kudegowo: ['⏳ Primary 1–6 content library', '⏳ Short-form video lessons', '⏳ Adaptive by score history', '⏳ Badges + leaderboards', '⏳ Full parent app'],
    col: 'border-purple-500/30 bg-purple-500/5',
    badge: 'bg-purple-500/20 text-purple-400',
  },
  {
    org: 'Phase 3 — Platform expansion',
    title: 'Marketplace & Scale',
    items: [
      'Verified tutor marketplace',
      'Live virtual classes',
      'WAEC/NECO exam prep packs',
      'Multi-language UI (Yoruba, Igbo, Hausa)',
      'West Africa expansion',
    ],
    kudegowo: ['⏳ Tutor booking + Kudegowo pay', '⏳ Low-bandwidth video sessions', '⏳ Premium content bundles', '⏳ Local language support', '⏳ Ghana, Cameroon, Senegal'],
    col: 'border-emerald-500/30 bg-emerald-500/5',
    badge: 'bg-emerald-500/20 text-emerald-400',
  },
];

export function EPStandards() {
  return (
    <SlideWrap>
      <Tag>Industry Standards</Tag>
      <H1>Simple enough for any teacher. Powerful enough for every school.</H1>

      <div className="grid grid-cols-3 gap-5 mb-6">
        {standards.map((s) => (
          <div key={s.org} className={`border ${s.col} rounded-2xl p-5`}>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.badge} mb-3 inline-block`}>{s.org}</span>
            <h4 className="font-bold text-sm text-white mb-3">{s.title}</h4>
            <div className="space-y-2">
              {s.items.map((item, i) => (
                <div key={item} className="flex gap-2 items-start">
                  <span className="text-xs shrink-0 mt-0.5">{s.kudegowo[i].startsWith('✅') ? '✅' : '⏳'}</span>
                  <div>
                    <p className="text-white/50 text-xs leading-snug">{item}</p>
                    <p className="text-white/25 text-xs italic">{s.kudegowo[i].replace('✅ ', '').replace('⏳ ', '')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Why simple wins in Nigeria</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { label: 'Schools with no digital records', value: '95%+', src: 'GSMA 2023' },
              { label: 'WhatsApp message open rate', value: '~95%', src: 'WhatsApp Business API avg.' },
              { label: 'Teachers with a smartphone', value: '~80%', src: 'NCC urban survey 2023' },
              { label: 'Parents who want daily updates', value: '9 in 10', src: 'Kudegowo parent survey 2025' },
            ].map((m) => (
              <div key={m.label} className="bg-white/5 rounded-lg p-2.5">
                <div className="font-black text-white text-base">{m.value}</div>
                <div className="text-white/50 text-xs">{m.label}</div>
                <div className="text-white/20 text-xs mt-0.5">Source: {m.src}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-sky-900/30 to-gray-900 border border-sky-500/20 rounded-xl p-4">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Education Platform vs. alternatives</p>
          <div className="space-y-2 text-xs">
            {[
              { feature: 'Digital attendance tracking',    kude: true,  ulesson: false, prepclass: false },
              { feature: 'Homework tracking',              kude: true,  ulesson: false, prepclass: false },
              { feature: 'Score & test management',        kude: true,  ulesson: false, prepclass: false },
              { feature: 'In-app quizzes',                 kude: true,  ulesson: true,  prepclass: false },
              { feature: 'Digital report cards',           kude: true,  ulesson: false, prepclass: false },
              { feature: 'Works offline on any phone',     kude: true,  ulesson: false, prepclass: false },
            ].map((row) => (
              <div key={row.feature} className="grid grid-cols-4 items-center gap-2">
                <span className="col-span-2 text-white/50">{row.feature}</span>
                <span className={`text-center font-bold ${row.kude ? 'text-sky-400' : 'text-white/20'}`}>{row.kude ? '✅' : '—'}</span>
                <span className={`text-center font-bold ${row.ulesson ? 'text-blue-400' : 'text-white/20'}`}>{row.ulesson ? '✅' : '—'}</span>
              </div>
            ))}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10 text-white/20 text-xs">
              <span className="col-span-2" />
              <span className="text-center text-sky-400 font-bold">Kudegowo</span>
              <span className="text-center">ULesson</span>
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
