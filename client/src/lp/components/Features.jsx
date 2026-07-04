import React from 'react';
import { Activity, Users, Apple, LineChart } from 'lucide-react';

const features = [
  {
    tag: 'POSE',
    Icon: Activity,
    name: 'Real-time activity recognition',
    description:
      'Your webcam becomes a coach. FitFlow reads joint angles frame by frame and calls out form issues the instant they happen.',
    span: 'lg:col-span-2',
  },
  {
    tag: 'SQUAD',
    Icon: Users,
    name: 'Leaderboard & rewards',
    description:
      'Compare streaks with friends, climb the weekly leaderboard, and unlock badges for consistency, not just intensity.',
    span: 'lg:col-span-1',
  },
  {
    tag: 'TRACK',
    Icon: LineChart,
    name: 'Progress you can see',
    description:
      'Every rep, set, and session rolls up into a dashboard that shows the trend, not just the number.',
    span: 'lg:col-span-1',
  },
  {
    tag: 'PLAN',
    Icon: Apple,
    name: 'Personalized nutrition',
    description:
      'A meal plan tuned to your goals and your schedule, adjusted automatically as your activity changes week to week.',
    span: 'lg:col-span-2',
  },
];

const Features = () => {
  return (
    <div id="features" className="w-full py-32 bg-[#F6F4EE] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16 max-w-xl">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#48C4A4]">
            What FitFlow actually does
          </span>
          <h2 className="font-display mt-4 text-4xl md:text-5xl font-medium text-[#0B0F0E] leading-tight">
            Four systems, one loop: move, get read, get told, improve.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.name}
              className={`group relative rounded-3xl bg-[#0B0F0E] p-8 overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${feature.span}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#48C4A4]/10 to-transparent" />

              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#48C4A4] border border-[#48C4A4]/30 rounded-full px-3 py-1">
                  {feature.tag}
                </span>
                <feature.Icon className="h-6 w-6 text-[#48C4A4]" />
              </div>

              <h3 className="relative mt-8 text-2xl font-display font-medium text-[#F6F4EE]">
                {feature.name}
              </h3>
              <p className="relative mt-3 text-[#9CA6A1] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;