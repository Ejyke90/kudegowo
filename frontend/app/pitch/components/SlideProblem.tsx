'use client';

import { Tag, SlideWrap, H1 } from './shared';

const problems = [
  {
    e: '💸',
    t: "Cash is king — and it's a nightmare",
    b: 'Nigerian schools collect billions in cash every term. Parents queue at school gates. Admins count notes by hand. Cash gets lost, stolen, or misappropriated.',
    s: '₦2.4T handled in cash annually',
  },
  {
    e: '📋',
    t: 'Parents have zero visibility',
    b: "Parents have no insight into what their child eats, which trips they've paid for, or how fees are used. Trust is broken. Disputes are common.",
    s: 'No digital paper trail — disputes are unresolvable',
  },
  {
    e: '🏦',
    t: 'Children are financially invisible',
    b: 'Nigerian children have no financial identity. No wallet, no savings account, no financial literacy tools. They enter adulthood with zero money skills.',
    s: '54M children, 0 child fintech products',
  },
  {
    e: '🔄',
    t: 'Ajo is manual and risky',
    b: "Millions of parents run rotating savings clubs on WhatsApp and trust alone. Defaults happen. Money disappears. There's no recourse.",
    s: 'Billions lost to defaults with no recourse',
  },
];

export function SlideProblem() {
  return (
    <SlideWrap>
      <Tag>The Problem</Tag>
      <H1>Nigerian school finance is broken</H1>
      <div className="grid grid-cols-2 gap-5">
        {problems.map((p) => (
          <div
            key={p.t}
            className="bg-white/5 border border-white/10 hover:border-red-500/30 rounded-2xl p-6 transition-colors group"
          >
            <div className="text-3xl mb-3">{p.e}</div>
            <h3 className="font-bold text-base mb-2 group-hover:text-red-400 transition-colors">
              {p.t}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4">{p.b}</p>
            <span className="inline-block bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold px-3 py-1 rounded-full">
              {p.s}
            </span>
          </div>
        ))}
      </div>
    </SlideWrap>
  );
}
