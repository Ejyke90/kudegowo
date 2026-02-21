import { CheckCircle } from 'lucide-react';

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">
      {children}
    </span>
  );
}

export function SlideWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto w-full px-14 py-10">
      {children}
    </div>
  );
}

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl font-black tracking-tight leading-tight mb-8 text-white">
      {children}
    </h2>
  );
}

export function Check({ text, color = 'emerald' }: { text: string; color?: string }) {
  const colorMap: Record<string, string> = {
    emerald: 'text-emerald-500',
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
    pink: 'text-pink-500',
    yellow: 'text-yellow-500',
  };
  return (
    <li className="flex items-start gap-2 text-sm text-white/60">
      <CheckCircle className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${colorMap[color] ?? 'text-emerald-500'}`} />
      {text}
    </li>
  );
}

export function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
      <div className="text-2xl font-black text-emerald-400">{value}</div>
      <div className="text-xs text-white/40 mt-1">{label}</div>
    </div>
  );
}
