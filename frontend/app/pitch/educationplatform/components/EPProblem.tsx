'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

const problems = [
  {
    e: '�',
    t: 'Attendance is still taken on paper',
    b: 'Teachers call names from a paper register every morning. Records are lost, forged, or never reviewed. Parents have no idea if their child was actually in class. There is no audit trail, no alert, and no data.',
    s: '91,252 private schools — virtually none have digital attendance',
    src: 'UBEC 2022',
  },
  {
    e: '�',
    t: 'Homework is set verbally and forgotten',
    b: 'Teachers write assignments on the board. Students copy into notebooks — or don\'t. There is no record of what was set, who submitted, or who is falling behind. Parents find out at exam time, not before.',
    s: 'No homework tracking system in any Nigerian private school',
    src: 'Market gap — no sourced incumbent',
  },
  {
    e: '�',
    t: 'Scores and results are opaque',
    b: 'Test scores are written in exercise books and never aggregated. Teachers have no class-wide view of performance. Parents receive a handwritten report card once per term — with no context, no trend, and no subject breakdown.',
    s: 'Report cards once per term — no real-time score visibility',
    src: 'Market gap — no sourced incumbent',
  },
  {
    e: '📵',
    t: 'Nigeria is not digitally equipped — yet',
    b: 'Most Nigerian private school teachers own a basic Android smartphone but have no laptop, no school Wi-Fi, and no IT support. Any edtech solution that requires a computer, fast internet, or technical setup will fail. The MVP must work on a phone, offline.',
    s: 'Less than 5% of Nigerian schools use any edtech tool',
    src: 'GSMA Connected Education Report 2023',
  },
];

export function EPProblem() {
  return (
    <SlideWrap>
      <Tag>The Problem</Tag>
      <H1>Nigerian classrooms run on paper — and parents are blind</H1>
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
