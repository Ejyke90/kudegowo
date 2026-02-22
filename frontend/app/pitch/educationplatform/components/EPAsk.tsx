'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

const useOfFunds = [
  { pct: '50%', label: 'Product & Engineering', detail: 'KudiEko MVP: attendance, homework, scores, quizzes, exam results. Offline-first Android app.', col: 'bg-sky-500' },
  { pct: '30%', label: 'School Pilots & Onboarding', detail: 'Onboard 5–10 Lagos private schools. In-person teacher training. Dedicated success manager.', col: 'bg-purple-500' },
  { pct: '20%', label: 'Operations & Awareness', detail: 'Parent WhatsApp campaigns, school network outreach, brand launch, admin infrastructure.', col: 'bg-orange-500' },
];

const milestones = [
  { q: 'Q2 2026', m: 'Close round. Build MVP: attendance, homework, scores, quizzes, report cards. Identify 5 pilot schools.' },
  { q: 'Q3 2026', m: 'Launch at 5 pilot schools in Lagos. Train teachers. Collect feedback. Validate WhatsApp parent alerts.' },
  { q: 'Q4 2026', m: 'Expand to 20 schools. Refine UX based on teacher feedback. Launch school licence billing.' },
  { q: 'Q1 2027', m: 'Hit 50 schools. Begin Phase 2: digital lessons + gamification. Explore Abuja entry.' },
];

const revenue = [
  { stream: 'School Licence Fee', detail: '₦50k–₦200k/year per school. Covers all MVP features for all classes.', phase: 'Phase 1' },
  { stream: 'Per-Child SaaS', detail: '₦300–₦800/child/month for schools that prefer per-pupil billing.', phase: 'Phase 1' },
  { stream: 'Digital Lessons Add-on', detail: 'NERDC-aligned content library unlocked as a paid upgrade per school.', phase: 'Phase 2' },
  { stream: 'Tutor Marketplace Commission', detail: '15–20% commission per tutor session booked through the platform.', phase: 'Phase 3' },
];

export function EPAsk() {
  return (
    <SlideWrap>
      <Tag>The Ask</Tag>
      <H1>Fund Nigeria's first school-integrated learning platform</H1>

      <div className="grid grid-cols-3 gap-8">
        {/* Use of funds */}
        <div>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Use of Funds</h3>
          <div className="space-y-3 mb-5">
            {useOfFunds.map((f) => (
              <div key={f.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-white">{f.label}</span>
                  <span className="text-xs font-black text-white">{f.pct}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full mb-1">
                  <div className={`h-1.5 ${f.col} rounded-full`} style={{ width: f.pct }} />
                </div>
                <p className="text-xs text-white/30">{f.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Revenue Model</h3>
          <div className="space-y-2">
            {revenue.map((r) => (
              <div key={r.stream} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs font-semibold text-white">{r.stream}</p>
                  <span className="text-xs text-sky-400 font-bold shrink-0 ml-2">{r.phase}</span>
                </div>
                <p className="text-xs text-white/40">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">18-Month Milestones</h3>
          <div className="space-y-3 mb-6">
            {milestones.map((m, i) => (
              <div key={m.q} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${i === 0 ? 'bg-sky-500 text-white' : 'bg-white/10 text-white/60'}`}>
                    {i + 1}
                  </div>
                  {i < milestones.length - 1 && <div className="w-px h-6 bg-white/10 mt-1" />}
                </div>
                <div className="pb-3">
                  <p className="text-xs font-bold text-sky-400">{m.q}</p>
                  <p className="text-xs text-white/60 leading-relaxed">{m.m}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Unit economics */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Illustrative unit economics</p>
            <div className="space-y-2 text-xs">
              {[
                { label: 'Avg. school licence fee/yr', value: '₦120k' },
                { label: '10 pilot schools (Yr 1)', value: '₦1.2M' },
                { label: '50 schools (Yr 2)', value: '₦6M / yr' },
                { label: '200 schools (Yr 3)', value: '₦24M / yr' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-white/40">{label}</span>
                  <span className="font-bold text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing */}
        <div>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Why now. Why us.</h3>
          <div className="space-y-3 mb-6">
            {[
              { e: '�', t: '91,000+ schools still running on paper registers', b: 'No attendance app. No homework tracker. No digital scores. The gap is not complex — it is just unfilled.' },
              { e: '�', t: 'Teachers already have smartphones', b: 'The hardware is there. Our MVP needs no laptop, no Wi-Fi, no IT team. Just install and go.' },
              { e: '🔗', t: 'Kudegowo already has school relationships', b: 'Schools using our payments and Safe School products get KudiEko as a natural add-on. Distribution is built in.' },
              { e: '🌍', t: 'Same gap across West Africa', b: 'Ghana, Cameroon, Senegal — same paper-based classrooms, same parent frustration, same zero competition.' },
            ].map((item) => (
              <div key={item.t} className="bg-white/5 border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-xl shrink-0">{item.e}</span>
                <div>
                  <p className="text-xs font-bold text-white mb-0.5">{item.t}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{item.b}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing card */}
          <div className="bg-gradient-to-br from-sky-900/50 to-gray-900 border border-sky-500/30 rounded-2xl p-5">
            <p className="text-base font-bold text-white leading-snug mb-2">
              Every Nigerian child deserves to learn — and for their parent to see it happening in real time.
            </p>
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              KudiEko is the infrastructure that makes this possible — starting with 91,252 private schools and 13.7 million children.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { i: 'EU', c: 'bg-sky-600' },
                { i: 'TO', c: 'bg-blue-600' },
                { i: 'JO', c: 'bg-purple-600' },
                { i: 'NN', c: 'bg-pink-600' },
                { i: 'HO', c: 'bg-orange-600' },
              ].map(({ i, c }) => (
                <div key={i} className={`w-8 h-8 rounded-lg ${c} flex items-center justify-center font-black text-xs text-white`}>{i}</div>
              ))}
              <div className="ml-1">
                <p className="text-xs font-bold text-white">kudegowo.com/kudieko</p>
                <p className="text-xs text-white/40">hello@kudegowo.com</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">What we are seeking</p>
            <div className="space-y-1.5">
              {[
                { e: '💰', t: '₦150M seed investment (~$100k USD)' },
                { e: '🏫', t: 'Introductions to private school networks in Lagos' },
                { e: '🎓', t: 'Tutor network partnerships for marketplace launch' },
                { e: '🤝', t: 'Strategic partnership for education advocacy' },
              ].map((item) => (
                <div key={item.t} className="flex gap-2 items-center">
                  <span className="text-sm">{item.e}</span>
                  <p className="text-xs text-white/70">{item.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
