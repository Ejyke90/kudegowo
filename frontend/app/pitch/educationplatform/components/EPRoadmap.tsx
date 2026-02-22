'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

const phases = [
  {
    phase: 'Phase 1',
    label: 'MVP — Now',
    sub: 'Works on any phone · Offline-capable · No IT setup',
    col: 'border-sky-500/40 bg-sky-500/10',
    badge: 'bg-sky-500 text-white',
    dot: 'bg-sky-500',
    active: true,
    features: [
      { icon: '📋', t: 'Attendance Tracking', b: 'One-tap daily register. WhatsApp alert to parent if child is absent.' },
      { icon: '📝', t: 'Homework & Assignments', b: 'Teacher sets digitally. Parent sees due date. Teacher marks who submitted.' },
      { icon: '📊', t: 'Scores & Test Results', b: 'Enter scores on phone. Auto class average. Instant parent visibility.' },
      { icon: '✏️', t: 'Quizzes', b: 'Multiple-choice quizzes. Works offline. Scores recorded automatically.' },
      { icon: '🎓', t: 'Exam Results & Report Cards', b: 'End-of-term results formatted into digital report card. Sent via WhatsApp.' },
      { icon: '📚', t: 'WAEC Practice Q&A', b: 'Historical past questions and answers for all WAEC subjects. Students practise by year and topic.' },
    ],
  },
  {
    phase: 'Phase 2',
    label: 'Richer Learning',
    sub: 'Once schools are digitally comfortable — 12–18 months',
    col: 'border-purple-500/30 bg-purple-500/5',
    badge: 'bg-purple-500/20 text-purple-400',
    dot: 'bg-purple-500',
    active: false,
    features: [
      { icon: '📚', t: 'NERDC Digital Lessons', b: 'Curriculum-aligned content for Primary 1 – SS3. Short videos + exercises per topic.' },
      { icon: '🎮', t: 'Gamified Learning', b: 'KudiCoins, streaks, badges, and leaderboards. Rewards sync with Kudegowo wallet.' },
      { icon: '📈', t: 'Parent Progress Dashboard', b: 'Full app view of child\'s learning journey — scores, lessons done, subject strengths.' },
      { icon: '🤖', t: 'Adaptive Learning Paths', b: 'Lessons adjust difficulty based on quiz and test score history per child.' },
      { icon: '🌐', t: 'Local Language UI', b: 'Platform available in Yoruba, Igbo, and Hausa for teachers and parents.' },
    ],
  },
  {
    phase: 'Phase 3',
    label: 'Platform & Scale',
    sub: 'Full edtech platform — 24–36 months',
    col: 'border-emerald-500/30 bg-emerald-500/5',
    badge: 'bg-emerald-500/20 text-emerald-400',
    dot: 'bg-emerald-500',
    active: false,
    features: [
      { icon: '👩‍🏫', t: 'Tutor Marketplace', b: 'Book verified tutors. Pay via Kudegowo wallet. Sessions tracked and rated.' },
      { icon: '📹', t: 'Live Virtual Classes', b: 'Low-bandwidth video lessons for revision and remote learners. Auto-recorded.' },
      { icon: '📦', t: 'WAEC/NECO Exam Packs', b: 'Premium past question bundles sold directly to parents and SS students.' },
      { icon: '🌍', t: 'West Africa Expansion', b: 'Same paper-classroom gap in Ghana, Cameroon, Senegal. Same product. New markets.' },
      { icon: '🏫', t: 'Public School Entry', b: 'Partner with state governments to bring KudiEko to public primary schools.' },
    ],
  },
];

export function EPRoadmap() {
  return (
    <SlideWrap>
      <Tag>Product Roadmap</Tag>
      <H1>Where we start. Where we are going.</H1>

      {/* Timeline connector */}
      <div className="flex items-center gap-0 mb-6">
        {phases.map((p, i) => (
          <div key={p.phase} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${p.dot} ${p.active ? 'ring-4 ring-sky-500/30' : ''}`} />
            </div>
            <div className={`flex-1 h-px ${i < phases.length - 1 ? 'bg-white/10' : 'hidden'}`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {phases.map((p) => (
          <div key={p.phase} className={`border ${p.col} rounded-2xl p-5 ${p.active ? 'ring-1 ring-sky-500/30' : ''}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-black px-2.5 py-1 rounded-full ${p.badge}`}>{p.phase}</span>
              {p.active && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Building now
                </span>
              )}
            </div>
            <h3 className="font-black text-white text-base mb-0.5">{p.label}</h3>
            <p className="text-white/30 text-xs mb-4">{p.sub}</p>

            {/* Features */}
            <div className="space-y-3">
              {p.features.map((f) => (
                <div key={f.t} className={`flex gap-3 items-start ${p.active ? '' : 'opacity-60'}`}>
                  <span className="text-base shrink-0">{f.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-white leading-snug">{f.t}</p>
                    <p className="text-white/40 text-xs leading-relaxed">{f.b}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom tag */}
            {!p.active && (
              <div className="mt-4 pt-3 border-t border-white/10">
                <p className="text-white/20 text-xs">🔮 Future — unlocked as schools digitise</p>
              </div>
            )}
            {p.active && (
              <div className="mt-4 pt-3 border-t border-sky-500/20">
                <p className="text-sky-400 text-xs font-semibold">✅ Seeking seed funding to build this now</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom integration note */}
      <div className="mt-5 bg-gradient-to-r from-sky-900/30 to-purple-900/20 border border-sky-500/20 rounded-2xl p-4 flex items-center gap-5">
        <div className="text-2xl">🔗</div>
        <div>
          <p className="font-bold text-sm text-white mb-0.5">All three phases run on the same Kudegowo platform</p>
          <p className="text-white/40 text-xs">Schools using Kudegowo Payments and Safe School get KudiEko Phase 1 as an add-on today. Phases 2 and 3 unlock as the school grows digitally. One login. One parent app. Three products.</p>
        </div>
      </div>
    </SlideWrap>
  );
}
