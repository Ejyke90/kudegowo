'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

const problems = [
  {
    e: '💸',
    t: 'Cash is king — and it is a crisis',
    b: 'Nigerian private schools collect billions in cash every term. Parents queue at school gates with envelopes. Admins count notes by hand. Cash gets lost, stolen, or misappropriated — with no audit trail and no recourse.',
    s: '₦2.4T in school fees handled in cash annually',
    src: 'CBN Payment System Report 2023',
  },
  {
    e: '📋',
    t: 'Parents have zero financial visibility',
    b: 'Parents have no insight into what their child eats, which trips they have paid for, or how fees are allocated. There is no digital record. Disputes are common and unresolvable. Trust between schools and parents is broken.',
    s: 'No digital paper trail — disputes are unresolvable',
    src: 'Market gap — no sourced incumbent',
  },
  {
    e: '🏦',
    t: 'Children are financially invisible',
    b: 'Nigerian children have no financial identity. No wallet, no savings account, no financial literacy tools. They enter adulthood with zero money skills and no credit history — perpetuating generational financial exclusion.',
    s: '54M children, 0 child-focused fintech products',
    src: 'NBS 2024 · EFInA Access to Finance Survey',
  },
  {
    e: '🏫',
    t: 'Schools are drowning in admin',
    b: 'School bursars manually reconcile hundreds of cash payments per term. Fee defaulters are tracked on paper. Reminders are sent by phone call. There is no automated collection, no real-time ledger, and no financial reporting.',
    s: '91,252 private schools — virtually none have digital fee systems',
    src: 'UBEC 2022',
  },
];

export function SPProblem() {
  return (
    <SlideWrap>
      <Tag>The Problem</Tag>
      <H1>Nigerian school finance is broken</H1>
      <div className="grid grid-cols-2 gap-5">
        {problems.map((p) => (
          <div key={p.t} className="bg-white/5 border border-white/10 hover:border-red-500/30 rounded-2xl p-5 transition-colors group">
            <div className="text-3xl mb-3">{p.e}</div>
            <h4 className="font-bold text-sm text-white mb-2 group-hover:text-red-300 transition-colors">{p.t}</h4>
            <p className="text-white/50 text-xs leading-relaxed mb-3">{p.b}</p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <p className="text-red-400 text-xs font-semibold leading-snug">{p.s}</p>
              <p className="text-white/20 text-xs mt-1">Source: {p.src}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideWrap>
  );
}
