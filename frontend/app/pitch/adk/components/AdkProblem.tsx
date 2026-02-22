'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

const problems = [
  {
    e: '💸',
    t: 'Cash is still king at the school gate',
    b: 'Nigerian schools collect billions in fees, meals, and trips in cash every term. Parents queue. Admins count notes by hand. Money gets lost, stolen, or misappropriated.',
    s: 'Nigeria processed ₦600 trillion in digital payments in 2023 — yet most school fees are still collected in cash',
    src: 'NIBSS / BusinessDay 2023',
  },
  {
    e: '📋',
    t: 'Parents have no visibility',
    b: 'Parents have no insight into what their child eats, which trips they have paid for, or how fees are used. There is no digital paper trail. Disputes are common and unresolvable.',
    s: 'Private school fees rose 50–70% in 2024 — parents are paying more with less transparency than ever',
    src: 'Nairametrics 2024',
  },
  {
    e: '🏫',
    t: 'Schools have no safety infrastructure',
    b: 'Most Nigerian private schools have no digital record of who enters or leaves the campus. Attendance is taken on paper. There is no real-time alert system for parents.',
    s: '91,252 private schools in Nigeria — virtually none have a digital access or attendance system',
    src: 'UBEC 2022',
  },
  {
    e: '👶',
    t: 'Children are financially invisible',
    b: 'Nigerian children have no financial identity. No wallet, no savings account, no financial literacy tools. They enter adulthood with zero money management skills.',
    s: '13.7 million children enrolled in private schools — zero child-native fintech products serving them',
    src: 'UBEC 2022',
  },
];

export function AdkProblem() {
  return (
    <SlideWrap>
      <Tag>The Problem</Tag>
      <H1>Nigerian school management is broken</H1>
      <div className="grid grid-cols-2 gap-5">
        {problems.map((p) => (
          <div
            key={p.t}
            className="bg-white/5 border border-white/10 hover:border-red-500/30 rounded-2xl p-5 transition-colors group"
          >
            <div className="text-3xl mb-3">{p.e}</div>
            <h4 className="font-bold text-sm text-white mb-2 group-hover:text-red-300 transition-colors">{p.t}</h4>
            <p className="text-white/50 text-xs leading-relaxed mb-3">{p.b}</p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <p className="text-red-400 text-xs font-medium leading-snug">{p.s}</p>
              <p className="text-white/20 text-xs mt-1">Source: {p.src}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideWrap>
  );
}
