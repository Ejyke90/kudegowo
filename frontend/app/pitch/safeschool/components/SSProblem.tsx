'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

const problems = [
  {
    e: '🚨',
    t: 'School attacks & kidnappings are a national crisis',
    b: 'Nigeria has experienced hundreds of mass school abductions since 2014. Armed groups abducted 859 schoolchildren in 2023 alone, and 777 in 2024. Most schools have no early warning or response system.',
    s: '859 children abducted from schools in 2023 · 777 in 2024',
    src: 'UNICEF Nigeria Annual Report 2024',
  },
  {
    e: '📋',
    t: 'Attendance is still taken on paper',
    b: 'The vast majority of Nigerian private schools take attendance manually — paper registers, class teachers calling names. There is no real-time record, no parent notification, and no audit trail.',
    s: 'Only 37% of schools across 10 states have any early warning system in place',
    src: 'UNICEF Minimum Standards for Safe Schools, Nigeria 2024',
  },
  {
    e: '🚪',
    t: 'Anyone can walk into a school',
    b: 'Most Nigerian private schools have no visitor management system. Strangers, unauthorised adults, and unknown vehicles can enter school premises with no record, no check, and no alert.',
    s: '91,252 private schools — virtually none have digital access control',
    src: 'UBEC 2022',
  },
  {
    e: '📵',
    t: 'Parents are the last to know',
    b: 'When something happens — a child is absent, late, or there is an incident — parents find out hours later, by phone call, or not at all. There is no real-time communication infrastructure between schools and parents.',
    s: 'No dominant parent-school communication platform exists in Nigeria',
    src: 'Market gap — no sourced incumbent',
  },
];

export function SSProblem() {
  return (
    <SlideWrap>
      <Tag>The Problem</Tag>
      <H1>Nigerian schools are dangerously unprotected</H1>
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
