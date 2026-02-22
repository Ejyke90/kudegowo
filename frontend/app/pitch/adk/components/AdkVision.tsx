'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

export function AdkVision() {
  return (
    <SlideWrap>
      <Tag>Our Vision</Tag>
      <H1>One platform. Every school. Every child.</H1>

      <p className="text-white/60 text-base leading-relaxed mb-10 max-w-2xl">
        Kudegowo is not just a payments app. It is the infrastructure layer for Nigerian education — starting where trust already exists: <span className="text-white font-semibold">the school gate.</span>
      </p>

      {/* Three pillars */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: '💳',
            title: 'School Payments',
            subtitle: 'The entry point',
            desc: 'Replace cash at the school gate with a seamless digital payments platform. Parents pay fees, meals, and trips. Schools receive funds instantly with full reporting.',
            col: 'from-emerald-900/40 to-gray-900',
            border: 'border-emerald-500/30',
            tag: 'Phase 1 — Now',
            tagCol: 'bg-emerald-500/20 text-emerald-400',
          },
          {
            icon: '🛡️',
            title: 'Safe School',
            subtitle: 'The trust layer',
            desc: 'Digital passphrase entry, real-time attendance monitoring, and campus safety alerts. Schools become safer. Parents stay informed. Every entry and exit is recorded.',
            col: 'from-purple-900/40 to-gray-900',
            border: 'border-purple-500/30',
            tag: 'Phase 1/2',
            tagCol: 'bg-purple-500/20 text-purple-400',
          },
          {
            icon: '🎓',
            title: 'Education Platform',
            subtitle: 'The growth layer',
            desc: 'Academic progress tracking, tutor marketplace, and financial literacy for children. Kudegowo becomes the operating system for Nigerian school life — not just payments.',
            col: 'from-blue-900/40 to-gray-900',
            border: 'border-blue-500/30',
            tag: 'Phase 3',
            tagCol: 'bg-blue-500/20 text-blue-400',
          },
        ].map((p) => (
          <div key={p.title} className={`bg-gradient-to-b ${p.col} border ${p.border} rounded-2xl p-6`}>
            <div className="text-4xl mb-4">{p.icon}</div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-black text-base text-white">{p.title}</h3>
            </div>
            <p className="text-xs text-white/40 mb-3 italic">{p.subtitle}</p>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{p.desc}</p>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.tagCol}`}>{p.tag}</span>
          </div>
        ))}
      </div>

      {/* Tagline strip */}
      <div className="bg-gradient-to-r from-emerald-900/30 to-blue-900/20 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-6">
        <div className="text-3xl">🔗</div>
        <div>
          <p className="font-bold text-sm text-white mb-1">The flywheel</p>
          <p className="text-white/50 text-sm leading-relaxed">
            A school adopts payments → parents join → children get wallets → Safe School adds value → data enables academic tools → the platform becomes indispensable. Each layer makes the next one easier to sell.
          </p>
        </div>
      </div>
    </SlideWrap>
  );
}
