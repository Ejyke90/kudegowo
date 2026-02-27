'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { SlideCover } from './components/SlideCover';
import { SlideVision } from './components/SlideVision';
import { SlideProblem } from './components/SlideProblem';
import { SlideSolution } from './components/SlideSolution';
import { SlideMarket } from './components/SlideMarket';
import { SlideProduct } from './components/SlideProduct';
import { SlideRevenue } from './components/SlideRevenue';
import { SlideTraction } from './components/SlideTraction';
import { SlideTechnology } from './components/SlideTechnology';
import { SlideAsk } from './components/SlideAsk';
import { SlideCompetitors } from './components/SlideCompetitors';
import { SlideGoToMarket } from './components/SlideGoToMarket';

const SLIDES = [
  { label: 'Cover',      Component: SlideCover },
  { label: 'Vision',     Component: SlideVision },
  { label: 'Problem',    Component: SlideProblem },
  { label: 'Solution',   Component: SlideSolution },
  { label: 'Market',     Component: SlideMarket },
  { label: 'Product',    Component: SlideProduct },
  { label: 'Competitors',    Component: SlideCompetitors },
  { label: 'Technology', Component: SlideTechnology },
  { label: 'Leads Generation',    Component: SlideGoToMarket },
  { label: 'Revenue',    Component: SlideRevenue },
  { label: 'Traction',   Component: SlideTraction },
  { label: 'The Ask',    Component: SlideAsk },
];

export default function PitchDeck() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // helper to change slide with fade animation
  const changeSlide = (newIndex: number) => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setCurrent(newIndex);
          gsap.fromTo(
            containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3 }
          );
        },
      });
    } else {
      setCurrent(newIndex);
    }
  };

  const prev = () => changeSlide(Math.max(0, current - 1));
  const next = () => changeSlide(Math.min(SLIDES.length - 1, current + 1));

  const ActiveSlide = SLIDES[current].Component;

  // initial fade-in on mount
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }
  }, [current]);


  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* ── Top nav ── */}
      <nav className="flex items-center justify-between px-8 py-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center font-black text-xs text-white">
            K
          </div>
          <span className="font-bold tracking-tight">KudEgOwo</span>
          {/* <span className="text-xs text-white/30 ml-1">· Seed Deck 2026</span> */}
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
      <div ref={containerRef} className="flex-1 overflow-auto">
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
