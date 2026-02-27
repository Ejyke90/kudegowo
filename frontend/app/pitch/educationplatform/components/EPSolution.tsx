'use client';

import { ClipboardList, BookOpen, BarChart3, CheckSquare, FileText, Users, Video, Star, Cpu } from 'lucide-react';
import { Tag, SlideWrap, H1 } from '../../components/shared';

const mvp = [
  {
    icon: <ClipboardList className="w-5 h-5" />,
    col: 'sky',
    t: 'Attendance Tracking',
    b: 'Teacher marks attendance on their phone in under 60 seconds. Parents get a WhatsApp alert if their child is absent. Daily records stored automatically — no paper, no lost registers.',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    col: 'emerald',
    t: 'Homework & Assignments',
    b: 'Teacher sets homework digitally with a due date. Parents see what was assigned. Teacher marks who submitted and who did not. Full accountability — no more "I didn\'t know there was homework."',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    col: 'purple',
    t: 'Scores & Test Results',
    b: 'Teachers enter test scores on their phone after marking. Parents see results instantly. Class averages and subject trends are calculated automatically — no spreadsheets, no manual reports.',
  },
  {
    icon: <CheckSquare className="w-5 h-5" />,
    col: 'orange',
    t: 'Quizzes',
    b: 'Teachers create simple multiple-choice quizzes. Students answer on a shared phone or their own. Scores are recorded instantly. Works offline — syncs when internet is available.',
  },
  {
    icon: <FileText className="w-5 h-5" />,
    col: 'pink',
    t: 'Exam Results & Report Cards',
    b: 'End-of-term results entered once, formatted automatically into a digital report card. Parents receive it via WhatsApp. No printing, no handwriting, no lost reports.',
  },
];

const future = [
  { icon: <Users className="w-4 h-4" />, t: 'Tutor Marketplace', b: 'Book verified tutors, pay via Kudegowo wallet.' },
  { icon: <Video className="w-4 h-4" />,  t: 'Live Virtual Classes', b: 'Low-bandwidth video lessons for revision and remote learning.' },
  { icon: <Star className="w-4 h-4" />,   t: 'Gamified Learning', b: 'KudiCoins, streaks, and badges to drive engagement.' },
  { icon: <Cpu className="w-4 h-4" />,    t: 'Adaptive Curriculum', b: 'NERDC-aligned lessons that adjust to each child\'s level.' },
];

const colMap: Record<string, { border: string; text: string; iconBg: string }> = {
  sky:     { border: 'hover:border-sky-500/40',     text: 'text-sky-400',     iconBg: 'bg-sky-500/20' },
  emerald: { border: 'hover:border-emerald-500/40', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20' },
  purple:  { border: 'hover:border-purple-500/40',  text: 'text-purple-400',  iconBg: 'bg-purple-500/20' },
  orange:  { border: 'hover:border-orange-500/40',  text: 'text-orange-400',  iconBg: 'bg-orange-500/20' },
  pink:    { border: 'hover:border-pink-500/40',    text: 'text-pink-400',    iconBg: 'bg-pink-500/20' },
};

export function EPSolution() {
  return (
    <SlideWrap>
      <Tag>The Solution</Tag>
      <H1>Start simple. Build from there.</H1>

      {/* MVP */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-bold px-3 py-1 rounded-full">✅ MVP — Phase 1</span>
          <span className="text-xs text-white/30">Works on any Android phone · Offline-capable · No IT setup</span>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {mvp.map((f) => {
            const c = colMap[f.col];
            return (
              <div key={f.t} className={`bg-white/5 border border-white/10 ${c.border} rounded-2xl p-4 transition-colors`}>
                <div className={`w-8 h-8 rounded-xl ${c.iconBg} flex items-center justify-center ${c.text} mb-3`}>
                  {f.icon}
                </div>
                <h4 className="font-bold text-xs mb-1.5 text-white">{f.t}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{f.b}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Future */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-white/5 border border-white/10 text-white/40 text-xs font-bold px-3 py-1 rounded-full">🔮 Future — Phase 2 & 3</span>
          <span className="text-xs text-white/20">Once schools are digitally comfortable</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {future.map((f) => (
            <div key={f.t} className="bg-white/3 border border-white/5 rounded-xl p-4 opacity-60">
              <div className="flex items-center gap-2 mb-1.5 text-white/40">
                {f.icon}
                <h4 className="font-bold text-xs text-white/50">{f.t}</h4>
              </div>
              <p className="text-white/30 text-xs leading-relaxed">{f.b}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-sky-900/30 to-purple-900/20 border border-sky-500/20 rounded-2xl p-5 flex items-center gap-6">
        <div className="text-3xl">🔗</div>
        <div>
          <p className="font-bold text-sm text-white mb-1">Integrated with Kudegowo School Payments & Safe School</p>
          <p className="text-white/50 text-xs leading-relaxed">
            The Education Platform is a module within the Kudegowo platform. Schools using payments and safety get education as an add-on. One login, one parent app, three products.
          </p>
        </div>
      </div>
    </SlideWrap>
  );
}
