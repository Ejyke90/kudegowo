'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AdkCover } from './components/AdkCover';
import { AdkVision } from './components/AdkVision';
import { AdkProblem } from './components/AdkProblem';
import { AdkMarket } from './components/AdkMarket';
import { AdkSolution } from './components/AdkSolution';
import { AdkProduct } from './components/AdkProduct';
import { AdkRevenue } from './components/AdkRevenue';
import { AdkAsk } from './components/AdkAsk';

const SLIDES = [
  { label: 'Cover',    Component: AdkCover },
  { label: 'Vision',   Component: AdkVision },
  { label: 'Problem',  Component: AdkProblem },
  { label: 'Market',   Component: AdkMarket },
  { label: 'Solution', Component: AdkSolution },
  { label: 'Product',  Component: AdkProduct },
  { label: 'Revenue',  Component: AdkRevenue },
  { label: 'The Ask',  Component: AdkAsk },
];

export default function AdkDeck() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(SLIDES.length - 1, c + 1));

  const ActiveSlide = SLIDES[current].Component;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* ── Top nav ── */}
      <nav className="flex items-center justify-between px-8 py-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center font-black text-xs text-white">
            K
          </div>
          <span className="font-bold tracking-tight">Kudegowo</span>
          <span className="text-xs text-white/30 ml-1">· For ADK</span>
        </div>

        <div className="flex items-center gap-1">
          {SLIDES.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setCurrent(i)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                i === current
                  ? 'bg-emerald-500 text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-white/30 tabular-nums">
          {current + 1} / {SLIDES.length}
        </span>
      </nav>

      {/* ── Slide content ── */}
      <div className="flex-1 overflow-auto">
        <ActiveSlide />
      </div>

      {/* ── Bottom controls ── */}
      <div className="flex items-center justify-center gap-6 py-4 border-t border-white/10 shrink-0">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/20 text-sm disabled:opacity-30 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        <div className="flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? 'bg-emerald-400 w-6' : 'bg-white/20 w-1.5'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm disabled:opacity-30 transition-colors"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
