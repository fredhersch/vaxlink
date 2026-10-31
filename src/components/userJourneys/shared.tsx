import React from 'react';
import { Frown, Meh, Smile, Laugh } from 'lucide-react';
import { Emotion, Persona, RECORD_TRUST_LADDER } from '../../data/journeyData';

const EMOTION_META: Record<Emotion, { label: string; Icon: typeof Smile; className: string }> = {
  [-2]: { label: 'Distressed', Icon: Frown, className: 'text-rose-600 bg-rose-50 border-rose-200' },
  [-1]: { label: 'Worried', Icon: Frown, className: 'text-amber-700 bg-amber-50 border-amber-200' },
  [0]: { label: 'Neutral', Icon: Meh, className: 'text-slate-600 bg-slate-50 border-slate-200' },
  [1]: { label: 'Reassured', Icon: Smile, className: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  [2]: { label: 'Delighted', Icon: Laugh, className: 'text-emerald-800 bg-emerald-100 border-emerald-300' },
};

export const emotionLabel = (e: Emotion) => EMOTION_META[e].label;

export const EmotionBadge: React.FC<{ emotion: Emotion; compact?: boolean }> = ({ emotion, compact }) => {
  const { label, Icon, className } = EMOTION_META[emotion];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${className}`}
      title={label}
    >
      <Icon className="w-3 h-3" />
      {!compact && <span>{label}</span>}
    </span>
  );
};

export const PersonaAvatar: React.FC<{ persona: Persona; size?: 'sm' | 'md' | 'lg' }> = ({ persona, size = 'md' }) => {
  const dims = size === 'sm' ? 'w-6 h-6 text-[9px]' : size === 'lg' ? 'w-12 h-12 text-sm' : 'w-8 h-8 text-[11px]';
  return (
    <span
      className={`${dims} ${persona.color.dot} rounded-full text-white font-bold flex items-center justify-center flex-shrink-0 shadow-sm`}
      aria-hidden
    >
      {persona.initials}
    </span>
  );
};

const TRUST_COLORS = ['bg-amber-400', 'bg-amber-500', 'bg-emerald-500', 'bg-emerald-600', 'bg-sky-500', 'bg-indigo-600'];

export const trustColor = (level: number) => TRUST_COLORS[Math.min(level, TRUST_COLORS.length - 1)];

/** Horizontal ladder showing how far Somsack's record has progressed. */
export const TrustMeter: React.FC<{ level: number; showLabels?: boolean }> = ({ level, showLabels = true }) => (
  <div className="space-y-1.5">
    <div className="flex gap-1">
      {RECORD_TRUST_LADDER.map((rung, i) => (
        <div
          key={rung.label}
          className={`h-2 flex-1 rounded-full transition-colors ${i <= level ? trustColor(i) : 'bg-slate-200'}`}
          title={`${rung.label}: ${rung.hint}`}
        />
      ))}
    </div>
    {showLabels && (
      <div className="flex gap-1">
        {RECORD_TRUST_LADDER.map((rung, i) => (
          <div
            key={rung.label}
            className={`flex-1 text-[9px] leading-tight ${i === level ? 'font-bold text-slate-900' : 'text-slate-400'}`}
          >
            {rung.label}
          </div>
        ))}
      </div>
    )}
  </div>
);

export const countryChip = (country: string) =>
  country === 'Thailand'
    ? 'bg-amber-100 text-amber-900'
    : country === 'Lao PDR'
    ? 'bg-sky-100 text-sky-900'
    : 'bg-indigo-100 text-indigo-900';
