'use client';

import { Tag, SlideWrap, H1 } from '../../components/shared';

const standards = [
  {
    org: 'UNICEF / Nigeria MSSS 2024',
    title: 'Minimum Standards for Safe Schools',
    items: [
      'Early warning systems for threat identification',
      'Attendance monitoring and absence reporting',
      'Secure perimeter and access control',
      'Emergency response and evacuation plans',
      'Parent communication protocols',
    ],
    kudegowo: ['✅ Automated absence alerts', '✅ Digital check-in/out', '✅ Visitor management', '✅ One-tap emergency broadcast', '✅ WhatsApp/SMS parent alerts'],
    col: 'border-blue-500/30 bg-blue-500/5',
    badge: 'bg-blue-500/20 text-blue-400',
  },
  {
    org: 'Raptor Technologies (US — 52,000 schools)',
    title: 'Industry-Standard School Safety Features',
    items: [
      'Visitor screening and ID verification',
      'Sex offender / watchlist database check',
      'Volunteer tracking and background checks',
      'Emergency drill management and reporting',
      'Automated dismissal and reunification',
    ],
    kudegowo: ['✅ Visitor log + authorised pickup list', '⏳ Watchlist check (Phase 2)', '⏳ Volunteer tracking (Phase 2)', '✅ Emergency drill log', '✅ Authorised collector verification'],
    col: 'border-emerald-500/30 bg-emerald-500/5',
    badge: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    org: 'Nigeria Safe Schools Declaration (endorsed 2014)',
    title: 'Government Policy Alignment',
    items: [
      'Protect schools from military use',
      'Continue education during emergencies',
      'Rebuild and make schools safer post-attack',
      'Collect data on attacks and safety gaps',
      'Engage communities in school protection',
    ],
    kudegowo: ['✅ Incident reporting module', '✅ Offline-capable (works without internet)', '✅ Audit trail for regulators', '✅ Safety data dashboard for admin', '✅ Parent community alerts'],
    col: 'border-purple-500/30 bg-purple-500/5',
    badge: 'bg-purple-500/20 text-purple-400',
  },
];

export function SSStandards() {
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
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Key metrics — global school safety platforms</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { label: 'Raptor Technologies schools', value: '52,000+', src: 'Raptor / PowerSchool 2024' },
              { label: 'Avg. visitor check-in time', value: '< 30 sec', src: 'Raptor VisitorSafe benchmark' },
              { label: 'Emergency alert delivery', value: '< 3 sec', src: 'Centegix platform data' },
              { label: 'Parent notification open rate', value: '~95%', src: 'WhatsApp Business API avg.' },
            ].map((m) => (
              <div key={m.label} className="bg-white/5 rounded-lg p-2.5">
                <div className="font-black text-white text-base">{m.value}</div>
                <div className="text-white/50 text-xs">{m.label}</div>
                <div className="text-white/20 text-xs mt-0.5">Source: {m.src}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-gray-900 border border-purple-500/20 rounded-xl p-4">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Kudegowo Safe School vs. alternatives</p>
          <div className="space-y-2 text-xs">
            {[
              { feature: 'Purpose-built for Nigeria', kude: true, raptor: false, cloudnotte: false },
              { feature: 'WhatsApp-native alerts', kude: true, raptor: false, cloudnotte: false },
              { feature: 'Offline-capable (USSD fallback)', kude: true, raptor: false, cloudnotte: false },
              { feature: 'Integrated with school payments', kude: true, raptor: false, cloudnotte: false },
              { feature: 'Visitor management', kude: true, raptor: true, cloudnotte: false },
              { feature: 'Emergency broadcast', kude: true, raptor: true, cloudnotte: false },
            ].map((row) => (
              <div key={row.feature} className="grid grid-cols-4 items-center gap-2">
                <span className="col-span-2 text-white/50">{row.feature}</span>
                <span className={`text-center font-bold ${row.kude ? 'text-emerald-400' : 'text-white/20'}`}>{row.kude ? '✅' : '—'}</span>
                <span className={`text-center font-bold ${row.raptor ? 'text-blue-400' : 'text-white/20'}`}>{row.raptor ? '✅' : '—'}</span>
              </div>
            ))}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10 text-white/20 text-xs">
              <span className="col-span-2" />
              <span className="text-center text-purple-400 font-bold">Kudegowo</span>
              <span className="text-center">Raptor</span>
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
