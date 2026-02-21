'use client';

import { Tag, SlideWrap, H1 } from './shared';

const team = [
  {
    initials: 'EU',
    name: 'Ejike Udeze',
    title: 'CEO & Co-founder',
    bg: 'from-emerald-600 to-emerald-800',
    bio: 'Sets the vision, owns the strategy, and leads every investor and partnership conversation. The face of Kudegowo in the market.',
    why: 'Why him: Deep systems thinking + ability to translate complex product into compelling narrative.',
  },
  {
    initials: 'TO',
    name: 'Tolu',
    title: 'CPO & Co-founder',
    bg: 'from-blue-600 to-blue-800',
    bio: 'Defines what gets built and why. Owns the roadmap, user research, and the product decisions that determine whether schools and parents stay.',
    why: 'Why her: Product instinct rooted in real user pain — not assumptions.',
  },
  {
    initials: 'HO',
    name: 'Hope',
    title: 'CTO & Co-founder',
    bg: 'from-orange-600 to-amber-800',
    bio: 'Leads backend architecture and engineering execution. Responsible for the financial logic, API layer, and data integrity that fintech demands.',
    why: 'Why him: Fintech-grade engineering discipline from day one.',
  },
  {
    initials: 'NN',
    name: 'Nnaemeka',
    title: 'Head of Design & Co-founder',
    bg: 'from-pink-600 to-rose-800',
    bio: 'Owns the full user experience — from parent app to school dashboard. In a market where fintech UX is an afterthought, great design is a moat.',
    why: 'Why him: Design-led products win in consumer fintech.',
  },
  {
    initials: 'JO',
    name: 'Joshua',
    title: 'Head of Engineering & Co-founder',
    bg: 'from-purple-600 to-purple-800',
    bio: 'Owns infrastructure, deployment, and platform reliability. Ensures the product stays live and scalable as schools and parents depend on it daily.',
    why: 'Why him: Reliability is trust — and trust is everything in school finance.',
  },
];

export function SlideTeam() {
  return (
    <SlideWrap>
      <Tag>Team</Tag>
      <H1>The right team for this market</H1>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {team.map((member) => (
          <div key={member.name} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${member.bg} flex items-center justify-center font-black text-sm text-white mb-3 shrink-0`}>
              {member.initials}
            </div>
            <h3 className="font-bold text-sm text-white leading-tight">{member.name}</h3>
            <p className="text-xs text-emerald-400 font-semibold mb-2 leading-tight">{member.title}</p>
            <p className="text-white/50 text-xs leading-relaxed mb-3 flex-1">{member.bio}</p>
            <p className="text-white/30 text-xs italic leading-relaxed border-t border-white/5 pt-2">{member.why}</p>
          </div>
        ))}
      </div>

      {/* Why this team wins */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { e: '🎯', t: 'Full-stack founding team', b: 'CEO, CPO, CTO, Design, and Infrastructure — every critical function covered from day one. No key-person gaps.' },
          { e: '🇳🇬', t: 'Nigerian-native insight', b: 'We understand Ajo, school gate culture, and CBN compliance from the inside — not from a market report.' },
          { e: '⚡', t: 'Already shipping', b: 'Working product, live integrations, and a prototype in front of real users — before a single naira of external funding.' },
        ].map((item) => (
          <div key={item.t} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-3">
            <span className="text-xl shrink-0">{item.e}</span>
            <div>
              <p className="text-sm font-semibold text-white mb-1">{item.t}</p>
              <p className="text-xs text-white/50 leading-relaxed">{item.b}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideWrap>
  );
}
