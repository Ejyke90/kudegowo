'use client';

import { Tag, SlideWrap, H1 } from './shared';
import { Megaphone, Users, Share2, Handshake, Star, Shield } from 'lucide-react';

export function SlideGoToMarket() {
  return (
    <SlideWrap>
      <Tag>Go‑to‑Market</Tag>
      <H1>User acquisition blueprint</H1>

      <p className="text-white/60 text-base leading-relaxed mb-8 max-w-2xl">
        We lean on organic trust first, then amplify through digital and institutional
        channels. Each pillar feeds the next, creating a self‑reinforcing growth loop that
        scales from neighbourhood schools to nationwide adoption.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex items-start gap-4">
          <Megaphone className="w-6 h-6 text-emerald-400 mt-1" />
          <div>
            <h3 className="font-semibold text-white">Word of mouth</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Happy parents and school admins refer neighbouring schools in exchange for
              airtime top‑ups and fee discounts. Schools trust schools.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Users className="w-6 h-6 text-blue-400 mt-1" />
          <div>
            <h3 className="font-semibold text-white">Social media</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Targeted campaigns on WhatsApp, Instagram and TikTok showcase success stories
              and wallet walkthroughs. Viral reels drive parent downloads.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Handshake className="w-6 h-6 text-purple-400 mt-1" />
          <div>
            <h3 className="font-semibold text-white">Partnerships</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Collaborate with school associations, PTA chapters and education NGOs to
              bundle Kudegowo with school services and training workshops.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Share2 className="w-6 h-6 text-orange-400 mt-1" />
          <div>
            <h3 className="font-semibold text-white">Referral program</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              A built‑in invite system rewards both the referrer and the new user with
              bonus KudiCoins and faster access to premium features.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <svg className="w-6 h-6 text-yellow-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3v4m0 0v4m0-4h4m-4 0H4m12 8v4m0 0v4m0-4h4m-4 0H8M3 12h2m14 0h2" />
          </svg>
          <div>
            <h3 className="font-semibold text-white">SEO</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Content hub and keyword strategy ensure schools searching for digital
              solutions find Kudegowo first. Organic traffic feeds the funnel.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <svg className="w-6 h-6 text-pink-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8-4H8m8 8H8m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <h3 className="font-semibold text-white">Email marketing</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Drip campaigns nurture leads and keep schools engaged through onboarding,
              tips, and product updates, turning curiosity into adoption.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <svg className="w-6 h-6 text-red-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3a3 3 0 006 0c0-1.657-1.343-3-3-3z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m8-10h2M2 12H0m15.364-6.364l1.414 1.414M4.222 19.778l1.414-1.414m10.728 0l-1.414-1.414M4.222 4.222l1.414 1.414" />
          </svg>
          <div>
            <h3 className="font-semibold text-white">Pay‑Per‑Click</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Targeted ads on Google and social networks drive immediate traffic during
              promotional windows and key enrollment periods.
            </p>
          </div>
        </div>
      </div>

      {/* optional funnel graphic */}
      <div className="flex justify-center">
        <svg
          className="w-full max-w-lg text-white/25"
          viewBox="0 0 600 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 30 H140 L200 10 L260 50 L320 20 L380 40 L440 15 L500 45 H600" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* personas */}
      <div className="mt-10">
        <H1>Core Personas</H1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {[
            {
              title: 'Parents',
              desc: 'Busy moms and dads who need transparent, secure ways to fund school expenses and monitor their child’s activity. They value convenience, safety alerts, and financial teaching tools.',
              icon: <Users className="w-8 h-8 text-blue-400" />,            },
            {
              title: 'Children',
              desc: 'Students aged 6‑17 who use the wallet for meals, snacks, and savings. Gamified features and parental controls keep them engaged and learning about money.',
              icon: <Star className="w-8 h-8 text-yellow-400" />,
            },
            {
              title: 'School Admins',
              desc: 'Principals and bursars responsible for fee collection, reporting and campus safety. They need easy onboarding, real‑time dashboards, and compliance support.',
              icon: <Shield className="w-8 h-8 text-purple-400" />,            },
          ].map((p) => (
            <div key={p.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center">
              {p.icon}
              <h4 className="font-bold text-white mt-3 mb-1">{p.title}</h4>
              <p className="text-white/60 text-xs leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideWrap>
  );
}
