'use client';

import { Smartphone, School, Star, Shield } from 'lucide-react';
import { Tag, SlideWrap, H1, Check } from '../../components/shared';

export function AdkProduct() {
  return (
    <SlideWrap>
      <Tag>Product</Tag>
      <H1>Built for Nigerian parents, schools &amp; children</H1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-b from-emerald-900/30 to-gray-900 border border-emerald-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-3">
            <Smartphone className="w-4 h-4" /> Parent App
          </div>
          <ul className="space-y-1.5">
            {[
              'Top up child wallet',
              'Pay school fees & trips',
              'View real-time spending',
              'Receive attendance alerts',
              'Track academic progress',
              'WhatsApp & SMS alerts',
            ].map((f) => <Check key={f} text={f} color="emerald" />)}
          </ul>
        </div>

        <div className="bg-gradient-to-b from-blue-900/30 to-gray-900 border border-blue-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-3">
            <School className="w-4 h-4" /> School Admin
          </div>
          <ul className="space-y-1.5">
            {[
              'Manage payment items',
              'Real-time revenue tracking',
              'Meal pre-ordering system',
              'Canteen QR code scanner',
              'Multi-campus management',
              'Automated financial reports',
            ].map((f) => <Check key={f} text={f} color="blue" />)}
          </ul>
        </div>

        <div className="bg-gradient-to-b from-purple-900/30 to-gray-900 border border-purple-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs mb-3">
            <Star className="w-4 h-4" /> Child Experience
          </div>
          <ul className="space-y-1.5">
            {[
              'Personal spending wallet',
              'Savings goals & tracking',
              'Financial literacy games',
              'Reward coins system',
              'Class leaderboard',
              'Parent-controlled rules',
            ].map((f) => <Check key={f} text={f} color="purple" />)}
          </ul>
        </div>

        <div className="bg-gradient-to-b from-orange-900/30 to-gray-900 border border-orange-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-orange-400 font-bold text-xs mb-3">
            <Shield className="w-4 h-4" /> Safe School
          </div>
          <ul className="space-y-1.5">
            {[
              'Digital passphrase entry',
              'Real-time attendance log',
              'Instant parent alerts',
              'Campus access control',
              'Incident reporting',
              'Daily attendance reports',
            ].map((f) => <Check key={f} text={f} color="orange" />)}
          </ul>
        </div>
      </div>

      {/* Roadmap strip */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Product Roadmap</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              phase: 'Phase 1 · Now',
              col: 'emerald',
              items: ['Child wallet', 'School payments', 'School admin dashboard', 'Safe School MVP'],
            },
            {
              phase: 'Phase 2 · 3–6 months',
              col: 'blue',
              items: ['WhatsApp notifications', 'Meal pre-ordering', 'Academic progress tracking', 'Parent mobile app'],
            },
            {
              phase: 'Phase 3 · 6–12 months',
              col: 'purple',
              items: ['Tutor marketplace', 'Financial literacy', 'Bank savings account', 'Community finance *(tentative)*'],
            },
          ].map(({ phase, col, items }) => (
            <div key={phase}>
              <p className={`text-xs font-bold text-${col}-400 mb-2`}>{phase}</p>
              <ul className="space-y-1">
                {items.map((item) => <Check key={item} text={item} color={col} />)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SlideWrap>
  );
}
