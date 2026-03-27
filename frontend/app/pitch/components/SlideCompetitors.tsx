'use client';

import { Tag, SlideWrap, H1 } from './shared';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function SlideCompetitors() {
  const data = [
    { feature: 'School UX', CompA: 5, CompB: 3, CompC: 4, CompD: 2 },
    { feature: 'Mobile App', CompA: 4, CompB: 4, CompC: 3, CompD: 5 },
    { feature: 'Escrow', CompA: 2, CompB: 5, CompC: 3, CompD: 4 },
    { feature: 'Compliance', CompA: 3, CompB: 2, CompC: 5, CompD: 4 },
    { feature: 'Smart Features', CompA: 4, CompB: 2, CompC: 3, CompD: 5 },
  ];

  return (
    <SlideWrap>
      <Tag>Competitive Landscape</Tag>
      <H1>How the players compare</H1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* chart side */}
        <div className="w-full h-96">
          <ResponsiveContainer>
            <RadarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis dataKey="feature" stroke="#fff" />
              <PolarRadiusAxis angle={30} stroke="#fff" />
              <Radar
                name="CompA"
                dataKey="CompA"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Radar
                name="CompB"
                dataKey="CompB"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
              <Radar
                name="CompC"
                dataKey="CompC"
                stroke="#ffc658"
                fill="#ffc658"
                fillOpacity={0.6}
              />
              <Radar
                name="CompD"
                dataKey="CompD"
                stroke="#ff7300"
                fill="#ff7300"
                fillOpacity={0.6}
              />
              <Legend formatter={(value) => <span className="text-white text-xs">{value}</span>} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* narrative side */}
        <div className="space-y-4">
          <p className="text-white/60 text-sm">
            We scored each competitor across five axes that matter to school stakeholders. Higher
            values represent stronger delivery in that dimension. CompA is the closest rival on
            UX, but none offer a fully school‑centric wallet or smart‑school features.
          </p>

          <div className="grid grid-cols-2 gap-4 text-xs">
            {[
              {
                name: 'CompA',
                notes: ['Good mobile app', 'Weak escrow', 'No smart modules'],
              },
              {
                name: 'CompB',
                notes: ['Strong escrow', 'Poor school UX', 'Regulatory risk'],
              },
              {
                name: 'CompC',
                notes: ['Excellent compliance', 'No mobile app', 'Adult focus'],
              },
              {
                name: 'CompD',
                notes: ['Feature‑rich', 'Complex UI', 'Limited school reach'],
              },
            ].map((c) => (
              <div
                key={c.name}
                className="bg-white/5 border border-white/10 rounded-lg p-3 h-full flex flex-col"
              >
                <div className="font-semibold text-white mb-2">{c.name}</div>
                <ul className="list-disc list-inside text-white/50 flex-1 space-y-1">
                  {c.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}
