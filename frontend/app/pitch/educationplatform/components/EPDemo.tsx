'use client';

import { useState } from 'react';
import { BookOpen, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Tag, SlideWrap, H1 } from '../../components/shared';

const students = [
  { id: 'S001', name: 'Amara Okafor',  attendance: 'present', hw: 'done',    score: 82, examScore: 76 },
  { id: 'S002', name: 'Chidi Nwosu',   attendance: 'present', hw: 'missing', score: 68, examScore: 61 },
  { id: 'S003', name: 'Fatima Bello',  attendance: 'absent',  hw: '—',       score: null, examScore: 88 },
  { id: 'S004', name: 'Emeka Eze',     attendance: 'present', hw: 'done',    score: 55, examScore: 49 },
  { id: 'S005', name: 'Ngozi Adeyemi', attendance: 'present', hw: 'pending', score: 77, examScore: 72 },
  { id: 'S006', name: 'Tunde Afolabi', attendance: 'present', hw: 'done',    score: 88, examScore: 91 },
];

const quizQuestions = [
  { q: 'What is 7 × 8?',        options: ['54', '56', '64', '48'],                   answer: 1 },
  { q: 'Simplify: 3x + 2x',    options: ['5x', '6x', '5x²', 'x⁵'],                 answer: 0 },
  { q: 'Capital of Ogun State?', options: ['Ibadan', 'Abeokuta', 'Ijebu', 'Sagamu'], answer: 1 },
];

const waecSubjects = [
  { subject: 'Mathematics',        year: 2023, questions: 50, done: 38, pct: 76 },
  { subject: 'English Language',   year: 2023, questions: 60, done: 52, pct: 87 },
  { subject: 'Biology',            year: 2022, questions: 50, done: 21, pct: 42 },
  { subject: 'Economics',          year: 2023, questions: 50, done: 44, pct: 88 },
  { subject: 'Government',         year: 2022, questions: 50, done: 10, pct: 20 },
  { subject: 'Physics',            year: 2023, questions: 50, done: 33, pct: 66 },
];

const waecSample = [
  {
    subject: 'Mathematics 2023',
    q: 'If 2x + 3 = 11, find the value of x.',
    options: ['3', '4', '5', '6'],
    answer: 1,
    explanation: '2x = 11 − 3 = 8, so x = 4',
  },
  {
    subject: 'English Language 2023',
    q: 'Choose the word closest in meaning to "Benevolent".',
    options: ['Cruel', 'Generous', 'Timid', 'Arrogant'],
    answer: 1,
    explanation: 'Benevolent means well-meaning and kindly — closest to Generous.',
  },
  {
    subject: 'Biology 2022',
    q: 'Which organelle is known as the powerhouse of the cell?',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Vacuole'],
    answer: 2,
    explanation: 'Mitochondria produce ATP — the cell\'s energy currency.',
  },
];

const parentAlerts = [
  { icon: '✅', msg: 'Amara marked present — JSS 2A',          to: 'Mrs Okafor',         col: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { icon: '📝', msg: 'Homework set: Algebra Ch. 5 — due tmrw', to: 'All JSS 2A parents',  col: 'text-sky-400',     bg: 'bg-sky-500/10 border-sky-500/20' },
  { icon: '⚠️', msg: 'Chidi Nwosu missed homework — Week 3',   to: 'Mr Nwosu + Admin',   col: 'text-red-400',     bg: 'bg-red-500/10 border-red-500/20' },
  { icon: '📊', msg: 'Emeka Eze scored 55% — below average',   to: 'Mr Eze',             col: 'text-yellow-400',  bg: 'bg-yellow-500/10 border-yellow-500/20' },
];

const hwStyle: Record<string, { label: string; col: string; icon: React.ReactNode }> = {
  done:    { label: 'Submitted', col: 'text-emerald-400', icon: <CheckCircle className="w-3 h-3" /> },
  pending: { label: 'Pending',   col: 'text-yellow-400',  icon: <Clock className="w-3 h-3" /> },
  missing: { label: 'Missing',   col: 'text-red-400',     icon: <AlertCircle className="w-3 h-3" /> },
  '—':     { label: '—',         col: 'text-white/20',    icon: null },
};

type Tab = 'attendance' | 'homework' | 'scores' | 'quiz' | 'results' | 'waec';

const tabLabels: Record<Tab, string> = {
  attendance: '📋 Attendance',
  homework:   '📝 Homework',
  scores:     '📊 Scores',
  quiz:       '✏️ Quiz',
  results:    '🎓 Exam Results',
  waec:       '📚 WAEC Practice',
};

export function EPDemo() {
  const [tab, setTab] = useState<Tab>('attendance');
  const [selected, setSelected] = useState<Record<number, number>>({});

  const present   = students.filter((s) => s.attendance === 'present').length;
  const absent    = students.filter((s) => s.attendance === 'absent').length;
  const hwMissing = students.filter((s) => s.hw === 'missing').length;
  const scored    = students.filter((s) => s.score !== null);
  const avgScore  = Math.round(scored.reduce((a, s) => a + (s.score ?? 0), 0) / scored.length);

  return (
    <SlideWrap>
      <Tag>Live Demo</Tag>
      <H1>Greenfield Academy · JSS 2A — Mathematics</H1>

      <div className="grid grid-cols-3 gap-10">
        {/* Left panel */}
        <div className="col-span-2">
          {/* Summary stats */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Present',    value: present,        col: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
              { label: 'Absent',     value: absent,         col: 'text-red-400',     bg: 'bg-red-500/10 border-red-500/20' },
              { label: 'HW Missing', value: hwMissing,      col: 'text-yellow-400',  bg: 'bg-yellow-500/10 border-yellow-500/20' },
              { label: 'Class Avg.', value: `${avgScore}%`, col: 'text-sky-400',     bg: 'bg-sky-500/10 border-sky-500/20' },
            ].map((s) => (
              <div key={s.label} className={`border ${s.bg} rounded-xl p-3 text-center`}>
                <div className={`text-2xl font-black ${s.col}`}>{s.value}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {(Object.keys(tabLabels) as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  tab === t ? 'bg-sky-500 text-white' : 'bg-white/5 text-white/40 hover:text-white/70'
                }`}>
                {tabLabels[t]}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

            {tab === 'attendance' && (
              <table className="w-full text-xs">
                <thead><tr className="border-b border-white/10 text-white/30 uppercase tracking-wider">
                  <th className="text-left px-4 py-2.5">Student</th>
                  <th className="text-left px-4 py-2.5">Status</th>
                  <th className="text-left px-4 py-2.5">Parent Alert</th>
                </tr></thead>
                <tbody>{students.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-2.5 font-semibold text-white">{s.name}</td>
                    <td className="px-4 py-2.5">
                      <span className={`font-semibold ${s.attendance === 'present' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {s.attendance === 'present' ? '✅ Present' : '❌ Absent'}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-white/40">
                      {s.attendance === 'absent' ? '⚠️ WhatsApp sent' : '✅ Confirmed'}
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            )}

            {tab === 'homework' && (
              <table className="w-full text-xs">
                <thead><tr className="border-b border-white/10 text-white/30 uppercase tracking-wider">
                  <th className="text-left px-4 py-2.5">Student</th>
                  <th className="text-left px-4 py-2.5">Assignment</th>
                  <th className="text-left px-4 py-2.5">Status</th>
                </tr></thead>
                <tbody>{students.map((s) => {
                  const hw = hwStyle[s.hw];
                  return (
                    <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-2.5 font-semibold text-white">{s.name}</td>
                      <td className="px-4 py-2.5 text-white/50">Algebra Ch. 5</td>
                      <td className="px-4 py-2.5">
                        <span className={`flex items-center gap-1 font-semibold ${hw.col}`}>{hw.icon} {hw.label}</span>
                      </td>
                    </tr>
                  );
                })}</tbody>
              </table>
            )}

            {tab === 'scores' && (
              <table className="w-full text-xs">
                <thead><tr className="border-b border-white/10 text-white/30 uppercase tracking-wider">
                  <th className="text-left px-4 py-2.5">Student</th>
                  <th className="text-left px-4 py-2.5">Test Score</th>
                  <th className="text-left px-4 py-2.5">Grade</th>
                </tr></thead>
                <tbody>{students.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-2.5 font-semibold text-white">{s.name}</td>
                    <td className="px-4 py-2.5">
                      <span className={`font-black text-sm ${s.score === null ? 'text-white/20' : s.score >= 70 ? 'text-emerald-400' : s.score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {s.score !== null ? `${s.score}%` : '—'}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-white/40">
                      {s.score === null ? '—' : s.score >= 70 ? 'Pass' : s.score >= 50 ? 'Average' : 'Below avg.'}
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            )}

            {tab === 'quiz' && (
              <div className="p-5 space-y-4">
                <p className="text-xs text-white/40 font-semibold uppercase tracking-widest">Mathematics Quiz · Week 3 · JSS 2A</p>
                {quizQuestions.map((q, qi) => (
                  <div key={qi} className="bg-white/5 rounded-xl p-4">
                    <p className="text-sm font-semibold text-white mb-3">Q{qi + 1}. {q.q}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, oi) => (
                        <button key={oi} onClick={() => setSelected((p) => ({ ...p, [qi]: oi }))}
                          className={`text-xs px-3 py-2 rounded-lg border text-left transition-all ${
                            selected[qi] === oi
                              ? oi === q.answer ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 font-bold' : 'bg-red-500/20 border-red-500/40 text-red-400 font-bold'
                              : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                          }`}>{opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'results' && (
              <table className="w-full text-xs">
                <thead><tr className="border-b border-white/10 text-white/30 uppercase tracking-wider">
                  <th className="text-left px-4 py-2.5">Student</th>
                  <th className="text-left px-4 py-2.5">Exam Score</th>
                  <th className="text-left px-4 py-2.5">Grade</th>
                  <th className="text-left px-4 py-2.5">Report Card</th>
                </tr></thead>
                <tbody>{students.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-2.5 font-semibold text-white">{s.name}</td>
                    <td className="px-4 py-2.5">
                      <span className={`font-black text-sm ${s.examScore >= 70 ? 'text-emerald-400' : s.examScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {s.examScore}%
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-white/40">{s.examScore >= 70 ? 'Pass' : s.examScore >= 50 ? 'Average' : 'Fail'}</td>
                    <td className="px-4 py-2.5 text-sky-400 font-semibold">📄 Sent via WhatsApp</td>
                  </tr>
                ))}</tbody>
              </table>
            )}

            {tab === 'waec' && (
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-widest">WAEC Past Questions — All Subjects</p>
                  <span className="text-xs bg-amber-500/20 text-amber-400 font-bold px-2.5 py-1 rounded-full">Historical Q&amp;A Bank</span>
                </div>

                {/* Subject progress grid */}
                <div className="grid grid-cols-3 gap-2">
                  {waecSubjects.map((s) => (
                    <div key={s.subject} className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <p className="text-xs font-semibold text-white mb-0.5">{s.subject}</p>
                      <p className="text-white/30 text-xs mb-2">{s.year} · {s.questions} questions</p>
                      <div className="h-1.5 bg-white/10 rounded-full mb-1">
                        <div
                          className={`h-1.5 rounded-full ${s.pct >= 70 ? 'bg-emerald-500' : s.pct >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                      <p className={`text-xs font-bold ${s.pct >= 70 ? 'text-emerald-400' : s.pct >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {s.done}/{s.questions} done · {s.pct}%
                      </p>
                    </div>
                  ))}
                </div>

                {/* Sample interactive questions */}
                <p className="text-xs text-white/30 font-semibold uppercase tracking-widest pt-1">Sample Questions</p>
                {waecSample.map((q, qi) => (
                  <div key={qi} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-amber-400 font-bold">{q.subject}</span>
                    </div>
                    <p className="text-sm font-semibold text-white mb-3">{q.q}</p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {q.options.map((opt, oi) => (
                        <button key={oi}
                          onClick={() => setSelected((p) => ({ ...p, [100 + qi]: oi }))}
                          className={`text-xs px-3 py-2 rounded-lg border text-left transition-all ${
                            selected[100 + qi] === oi
                              ? oi === q.answer
                                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 font-bold'
                                : 'bg-red-500/20 border-red-500/40 text-red-400 font-bold'
                              : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                          }`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                    {selected[100 + qi] !== undefined && (
                      <p className={`text-xs mt-1 px-3 py-2 rounded-lg ${selected[100 + qi] === q.answer ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right panel — parent view */}
        <div>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Parent View — Mrs Okafor</h3>
          <div className="bg-gradient-to-br from-sky-950 to-gray-900 border border-sky-500/20 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Amara Okafor</p>
                <p className="text-xs text-white/40">JSS 2A · Mathematics</p>
              </div>
            </div>
            {parentAlerts.map((item, i) => (
              <div key={i} className={`border ${item.bg} rounded-xl p-3 flex items-start gap-3`}>
                <span className="text-base shrink-0">{item.icon}</span>
                <div>
                  <p className={`text-xs font-semibold ${item.col}`}>{item.msg}</p>
                  <p className="text-white/30 text-xs mt-0.5">→ {item.to}</p>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-white/10">
              <button className="w-full bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold py-2 rounded-xl transition-colors">
                View Full Report Card
              </button>
            </div>
          </div>
          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Works on</p>
            <div className="space-y-1.5 text-xs text-white/60">
              {['📱 Any Android phone', '� Offline — syncs later', '� WhatsApp alerts to parents', '� Low-bandwidth friendly'].map((m) => (
                <p key={m}>{m}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
