'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

const standards = [
  {
    org: 'CBN Cashless Policy 2023',
    title: 'Regulatory Payment Requirements',
    items: [
      'Digital payment channels for institutions',
      'Transaction audit trail and reporting',
      'Consumer protection and dispute resolution',
      'Data residency and NDPR compliance',
      'Anti-money laundering (AML) controls',
    ],
    kudegowo: ['✅ Card, transfer, USSD, POS', '✅ Full ledger + receipt trail', '✅ Parent dispute portal', '✅ Nigerian data residency', '✅ KYC on all accounts'],
    col: 'border-emerald-500/30 bg-emerald-500/5',
    badge: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    org: 'SchoolMint / Brightwheel (US — 50,000+ schools)',
    title: 'Industry-Standard School Payment Features',
    items: [
      'Digital tuition and fee collection',
      'Instalment and payment plan management',
      'Automated overdue reminders',
      'Parent-facing payment portal',
      'Financial reporting for administrators',
    ],
    kudegowo: ['✅ Card / transfer / USSD', '✅ Flexible instalment plans', '✅ WhatsApp + SMS reminders', '✅ Parent app + web portal', '✅ Real-time revenue dashboard'],
    col: 'border-blue-500/30 bg-blue-500/5',
    badge: 'bg-blue-500/20 text-blue-400',
  },
  {
    org: 'EFInA Financial Inclusion Strategy 2023',
    title: 'Child Financial Inclusion Goals',
    items: [
      'Expand access to savings for minors',
      'Build financial literacy from early age',
      'Reduce cash dependency in households',
      'Enable digital identity for children',
      'Support parental financial oversight',
    ],
    kudegowo: ['✅ Child savings account via bank partner', '✅ Gamified KudiCoins + lessons', '✅ Cashless canteen + wallet', '✅ Child wallet = financial identity', '✅ Parental controls + spend alerts'],
    col: 'border-purple-500/30 bg-purple-500/5',
    badge: 'bg-purple-500/20 text-purple-400',
  },
];

export function SPStandards() {
  return (
    <SlideWrap>
      <Tag>Industry Standards</Tag>
      <H1>Built to global standards. Designed for Nigeria.</H1>

      <div className="grid grid-cols-3 gap-5 mb-6">
        {standards.map((s) => (
          <div key={s.org} className={`border ${s.col} rounded-2xl p-5`}>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.badge} mb-3 inline-block`}>{s.org}</span>
            <h4 className="font-bold text-sm text-white mb-3">{s.title}</h4>
            <div className="space-y-2">
              {s.items.map((item, i) => (
                <div key={item} className="flex gap-2 items-start">
                  <span className="text-xs shrink-0 mt-0.5">{s.kudegowo[i].startsWith('✅') ? '✅' : '⏳'}</span>
                  <div>
                    <p className="text-white/50 text-xs leading-snug">{item}</p>
                    <p className="text-white/25 text-xs italic">{s.kudegowo[i].replace('✅ ', '').replace('⏳ ', '')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Key metrics — global school payment platforms</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { label: 'SchoolMint schools served', value: '50,000+', src: 'SchoolMint 2024' },
              { label: 'Avg. fee collection time', value: '< 2 min', src: 'Brightwheel benchmark' },
              { label: 'Parent alert open rate', value: '~95%', src: 'WhatsApp Business API avg.' },
              { label: 'Digital vs cash collection', value: '10× faster', src: 'CBN Digital Finance Report' },
            ].map((m) => (
              <div key={m.label} className="bg-white/5 rounded-lg p-2.5">
                <div className="font-black text-white text-base">{m.value}</div>
                <div className="text-white/50 text-xs">{m.label}</div>
                <div className="text-white/20 text-xs mt-0.5">Source: {m.src}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/30 to-gray-900 border border-emerald-500/20 rounded-xl p-4">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Kudegowo School Payments vs. alternatives</p>
          <div className="space-y-2 text-xs">
            {[
              { feature: 'Purpose-built for Nigeria', kude: true, cloudnotte: false, bluebic: false },
              { feature: 'Child wallet + canteen', kude: true, cloudnotte: false, bluebic: false },
              { feature: 'WhatsApp-native alerts', kude: true, cloudnotte: false, bluebic: false },
              { feature: 'USSD fallback payments', kude: true, cloudnotte: false, bluebic: false },
              { feature: 'Instalment / payment plans', kude: true, cloudnotte: false, bluebic: true },
              { feature: 'Integrated with school safety', kude: true, cloudnotte: false, bluebic: false },
            ].map((row) => (
              <div key={row.feature} className="grid grid-cols-4 items-center gap-2">
                <span className="col-span-2 text-white/50">{row.feature}</span>
                <span className={`text-center font-bold ${row.kude ? 'text-emerald-400' : 'text-white/20'}`}>{row.kude ? '✅' : '—'}</span>
                <span className={`text-center font-bold ${row.cloudnotte ? 'text-blue-400' : 'text-white/20'}`}>{row.cloudnotte ? '✅' : '—'}</span>
              </div>
            ))}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10 text-white/20 text-xs">
              <span className="col-span-2" />
              <span className="text-center text-emerald-400 font-bold">Kudegowo</span>
              <span className="text-center">Cloudnotte</span>
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
