'use client';

import { Layers, Shield, Zap, Globe } from 'lucide-react';
import { Tag, SlideWrap, H1 } from './shared';

export function SlideTechnology() {
  return (
    <SlideWrap>
      <Tag>Technology</Tag>
      <H1>Built to scale. Designed for Nigeria.</H1>
      <div className="grid grid-cols-2 gap-10 items-start">
        {/* Architecture principles */}
        <div className="space-y-3">
          {[
            { icon: <Layers className="w-4 h-4 text-emerald-400" />, t: 'Modular Monolith → Microservices', b: 'Ship fast now. Extract Payment, Wallet, and Ajo as independent services when scale demands. No premature complexity.' },
            { icon: <Shield className="w-4 h-4 text-blue-400" />, t: 'Financial-grade security', b: 'HMAC-verified webhooks, append-only ledger, double-entry bookkeeping, AES-256 PII encryption, NDPR compliant.' },
            { icon: <Zap className="w-4 h-4 text-yellow-400" />, t: 'Nigerian network reality', b: 'PWA with offline capability. USSD fallback for low-connectivity parents. Cloudflare edge CDN across Africa.' },
            { icon: <Globe className="w-4 h-4 text-purple-400" />, t: 'Africa-ready from day one', b: 'Multi-currency architecture. Paystack + Flutterwave dual rails. Designed to expand to Ghana, Kenya, East Africa.' },
          ].map((item) => (
            <div key={item.t} className="flex gap-3 bg-white/5 rounded-xl p-4">
              <div className="mt-0.5 shrink-0">{item.icon}</div>
              <div>
                <h4 className="font-semibold text-sm mb-1 text-white">{item.t}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{item.b}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Competitive moat table + queue strategy */}
        <div className="space-y-5">
          <div>
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Competitive Moat</h3>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left py-2.5 px-3 text-white/40 font-medium">Feature</th>
                    <th className="py-2.5 px-3 text-emerald-400 font-bold">Kudegowo</th>
                    <th className="py-2.5 px-3 text-white/40 font-medium">Banks</th>
                    <th className="py-2.5 px-3 text-white/40 font-medium">WhatsApp Ajo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['Child wallet', '✅', '❌', '❌'],
                    ['School-native UX', '✅', '❌', '❌'],
                    ['Digital Ajo + escrow', '✅', '❌', '❌'],
                    ['Parental spending controls', '✅', '❌', '❌'],
                    ['Financial literacy', '✅', '❌', '❌'],
                    ['USSD fallback', '✅', '✅', '❌'],
                  ].map(([feat, k, b, w]) => (
                    <tr key={feat} className="hover:bg-white/5">
                      <td className="py-2 px-3 text-white/60">{feat}</td>
                      <td className="py-2 px-3 text-center">{k}</td>
                      <td className="py-2 px-3 text-center">{b}</td>
                      <td className="py-2 px-3 text-center">{w}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Scalability Path</p>
            <p className="text-xs text-white/60 leading-relaxed">
              Architecture starts lean and scales deliberately — <span className="text-emerald-400 font-semibold">no over-engineering at seed stage</span>. Infrastructure costs are near-zero until significant school volume is reached. The system is designed to handle <span className="text-white font-semibold">millions of daily transactions</span> without a rewrite — just horizontal scaling of existing services.
            </p>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
