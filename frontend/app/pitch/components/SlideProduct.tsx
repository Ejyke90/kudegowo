'use client';

import { Smartphone, School, Star } from 'lucide-react';
import { Tag, SlideWrap, H1, Check } from './shared';

export function SlideProduct() {
  return (
    <SlideWrap>
      <Tag>Product</Tag>
      <H1>Built for Nigerian parents, schools &amp; children</H1>
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-gradient-to-b from-emerald-900/30 to-gray-900 border border-emerald-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-4">
            <Smartphone className="w-4 h-4" /> Parent App (PWA)
          </div>
          <ul className="space-y-2">
            {['Top up child wallet', 'Pay school fees & trips', 'View real-time spending', 'Join Ajo savings groups', 'Open child savings account', 'WhatsApp & SMS alerts'].map((f) => (
              <Check key={f} text={f} color="emerald" />
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-b from-blue-900/30 to-gray-900 border border-blue-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-4">
            <School className="w-4 h-4" /> School Admin Dashboard
          </div>
          <ul className="space-y-2">
            {['Manage payment items', 'Real-time revenue tracking', 'Meal pre-ordering system', 'Canteen QR code scanner', 'Multi-campus management', 'Automated financial reports'].map((f) => (
              <Check key={f} text={f} color="blue" />
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-b from-purple-900/30 to-gray-900 border border-purple-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-4">
            <Star className="w-4 h-4" /> Child Experience
          </div>
          <ul className="space-y-2">
            {['Personal spending wallet', 'Savings goals & tracking', 'Financial literacy games', 'KudiCoins reward system', 'Class leaderboard', 'Parent-controlled spending rules'].map((f) => (
              <Check key={f} text={f} color="purple" />
            ))}
          </ul>
        </div>
      </div>

      {/* Roadmap strip */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Product Roadmap</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { phase: 'Phase 1 · Now', col: 'emerald', items: ['Child wallet', 'School payments', 'Paystack integration', 'School admin dashboard'] },
            { phase: 'Phase 2 · 3–6 months', col: 'blue', items: ['Digital Ajo module', 'Meal pre-ordering', 'WhatsApp notifications', 'Parent PWA'] },
            { phase: 'Phase 3 · 6–12 months', col: 'purple', items: ['Bank savings account', 'Financial literacy', 'Gov portal', 'Marketplace'] },
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
