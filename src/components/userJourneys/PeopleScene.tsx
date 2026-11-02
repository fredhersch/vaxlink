import React from 'react';
import { PERSONA_BY_ID, PersonaId } from '../../data/journeyData';

/**
 * A small drawn scene for each of the four moments: who is there, where, and
 * what passes from hand to hand. Figures wear their persona's colour, so the
 * scene matches the avatars used everywhere else.
 */

type Prop = 'qr' | 'phone' | 'tablet' | 'stethoscope' | 'none';
type Fig = { id: PersonaId; x: number; prop?: Prop; holdsBaby?: boolean; toddler?: boolean };
type Scene = {
  place: string;
  setting: 'hospital' | 'house' | 'clinic' | 'border';
  people: Fig[];
  handoff: { from: number; to: number; label: string };
};

const SCENES: Record<string, Scene> = {
  'born-abroad': {
    place: 'Chiang Rai hospital, Thailand',
    setting: 'hospital',
    people: [
      { id: 'somchai', x: 110, prop: 'stethoscope' },
      { id: 'khamla', x: 230, holdsBaby: true, prop: 'qr' },
    ],
    handoff: { from: 110, to: 230, label: 'two signed QR cards' },
  },
  'found-at-home': {
    place: 'Village 04, Lao PDR · no signal',
    setting: 'house',
    people: [
      { id: 'bounmy', x: 92 },
      { id: 'khamla', x: 150, holdsBaby: true, prop: 'qr' },
      { id: 'soukanh', x: 250, prop: 'phone' },
    ],
    handoff: { from: 150, to: 250, label: 'scans the cards' },
  },
  'made-official': {
    place: 'District health centre, Lao PDR',
    setting: 'clinic',
    people: [
      { id: 'khamla', x: 120, holdsBaby: true, prop: 'qr' },
      { id: 'chanthasone', x: 235, prop: 'tablet' },
    ],
    handoff: { from: 120, to: 235, label: 'verified, on the Lao schedule' },
  },
  'crossing-back': {
    place: 'Lao PDR → clinic in Thailand',
    setting: 'border',
    people: [
      { id: 'khamla', x: 62 },
      { id: 'somsack', x: 98, toddler: true },
      { id: 'bounmy', x: 140, prop: 'phone' },
      { id: 'somchai', x: 250, prop: 'stethoscope' },
    ],
    handoff: { from: 140, to: 250, label: 'passcode link' },
  },
};

const SKIN = '#e9c4a0';
const INK = '#334155';
const GROUND = 104;

const Setting: React.FC<{ kind: Scene['setting'] }> = ({ kind }) => {
  const line = { stroke: '#cbd5e1', strokeWidth: 1.5, fill: 'none' } as const;
  switch (kind) {
    case 'hospital':
      return (
        <g>
          <rect x={14} y={40} width={50} height={64} rx={3} {...line} fill="#f8fafc" />
          <rect x={33} y={50} width={12} height={4} fill="#f87171" />
          <rect x={37} y={46} width={4} height={12} fill="#f87171" />
          <rect x={22} y={70} width={10} height={10} {...line} />
          <rect x={46} y={70} width={10} height={10} {...line} />
          <rect x={33} y={88} width={12} height={16} {...line} />
        </g>
      );
    case 'house':
      return (
        <g>
          <path d="M10 62 L38 42 L66 62 Z" {...line} fill="#fef3c7" />
          <rect x={16} y={62} width={44} height={22} {...line} fill="#fffbeb" />
          <line x1={20} y1={84} x2={20} y2={104} {...line} />
          <line x1={56} y1={84} x2={56} y2={104} {...line} />
          {/* no signal */}
          <g transform="translate(280 18)" stroke="#94a3b8" strokeWidth={1.5} fill="none">
            <path d="M-8 4 Q0 -4 8 4" />
            <path d="M-4 8 Q0 4 4 8" />
            <line x1={-9} y1={-3} x2={9} y2={11} stroke="#f87171" />
          </g>
        </g>
      );
    case 'clinic':
      return (
        <g>
          <rect x={14} y={48} width={56} height={56} rx={3} {...line} fill="#f0f9ff" />
          <rect x={14} y={42} width={56} height={8} fill="#bae6fd" />
          <rect x={22} y={60} width={14} height={12} {...line} />
          <rect x={46} y={60} width={14} height={12} {...line} />
          {/* calendar */}
          <g transform="translate(276 22)">
            <rect x={-10} y={-8} width={20} height={18} rx={2} fill="#fff" stroke="#38bdf8" />
            <rect x={-10} y={-8} width={20} height={5} fill="#38bdf8" />
            <path d="M-5 3 L-1 7 L6 -1" stroke="#0284c7" strokeWidth={1.8} fill="none" />
          </g>
        </g>
      );
    case 'border':
      return (
        <g>
          <line x1={195} y1={14} x2={195} y2={GROUND} stroke="#94a3b8" strokeDasharray="4 4" />
          <text x={189} y={98} textAnchor="end" fontSize={8} fill="#64748b" fontWeight={700}>LA</text>
          <text x={201} y={98} fontSize={8} fill="#64748b" fontWeight={700}>TH</text>
        </g>
      );
  }
};

const PropShape: React.FC<{ prop: Prop; x: number }> = ({ prop, x }) => {
  const hx = x + 11;
  const hy = 76;
  switch (prop) {
    case 'qr':
      return (
        <g transform={`translate(${hx} ${hy - 6})`}>
          <rect width={10} height={12} rx={1} fill="#fff" stroke={INK} strokeWidth={0.8} />
          <rect x={2} y={2} width={3} height={3} fill={INK} />
          <rect x={6} y={6} width={2} height={2} fill={INK} />
          <rect x={2} y={7} width={2} height={3} fill={INK} />
        </g>
      );
    case 'phone':
      return <rect x={hx} y={hy - 10} width={7} height={13} rx={1.5} fill={INK} />;
    case 'tablet':
      return <rect x={hx - 2} y={hy - 10} width={14} height={11} rx={1.5} fill={INK} stroke="#e2e8f0" strokeWidth={1} />;
    case 'stethoscope':
      return <path d={`M${x - 5} 62 Q${x} 78 ${x + 5} 62`} stroke={INK} strokeWidth={1.4} fill="none" />;
    default:
      return null;
  }
};

const Baby: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const c = PERSONA_BY_ID.somsack.color.hex;
  return (
    <g>
      <ellipse cx={x} cy={y} rx={12} ry={7} fill={c} stroke="#fff" strokeWidth={1} />
      <circle cx={x - 11} cy={y - 3} r={5.5} fill={SKIN} stroke="#fff" strokeWidth={1} />
    </g>
  );
};

const Figure: React.FC<{ f: Fig }> = ({ f }) => {
  const p = PERSONA_BY_ID[f.id];
  const c = p.color.hex;
  const name = p.name.replace('Dr. ', 'Dr ');
  if (f.toddler) {
    return (
      <g>
        <circle cx={f.x} cy={78} r={6} fill={SKIN} />
        <path d={`M${f.x - 7} ${GROUND} L${f.x - 5} 86 Q${f.x} 82 ${f.x + 5} 86 L${f.x + 7} ${GROUND} Z`} fill={c} />
        <text x={f.x} y={GROUND + 10} textAnchor="middle" fontSize={8} fill="#334155" fontWeight={600}>{name}</text>
      </g>
    );
  }
  return (
    <g>
      <circle cx={f.x} cy={48} r={9} fill={SKIN} />
      <path d={`M${f.x - 13} ${GROUND} L${f.x - 11} 66 Q${f.x} 56 ${f.x + 11} 66 L${f.x + 13} ${GROUND} Z`} fill={c} />
      {f.prop && <PropShape prop={f.prop} x={f.x} />}
      {f.holdsBaby && <Baby x={f.x - 2} y={76} />}
      <text x={f.x} y={GROUND + 10} textAnchor="middle" fontSize={8} fill="#334155" fontWeight={600}>{f.holdsBaby ? `${name} + Somsack` : name}</text>
    </g>
  );
};

export const PeopleScene: React.FC<{ chapterId: string; className?: string }> = ({ chapterId, className = '' }) => {
  const s = SCENES[chapterId];
  if (!s) return null;
  const { from, to, label } = s.handoff;
  const a = Math.min(from, to) + 18;
  const b = Math.max(from, to) - 18;
  const names = s.people.map((f) => PERSONA_BY_ID[f.id].name).join(', ');
  return (
    <svg viewBox="0 0 300 128" className={`w-full h-auto ${className}`} role="img" aria-label={`${s.place}: ${names}; ${label}`}>
      <rect x={0} y={0} width={300} height={128} rx={10} fill="#ffffff" />
      <line x1={6} y1={GROUND} x2={294} y2={GROUND} stroke="#e2e8f0" strokeWidth={1.5} />
      <Setting kind={s.setting} />
      <text x={8} y={124} fontSize={7} fill="#94a3b8">{s.place}</text>
      {/* hand-off */}
      <defs>
        <marker id={`arr-${chapterId}`} viewBox="0 0 8 8" refX={6} refY={4} markerWidth={6} markerHeight={6} orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#0284c7" />
        </marker>
      </defs>
      <path d={`M${a} 36 Q${(a + b) / 2} 22 ${b} 36`} stroke="#0284c7" strokeWidth={1.5} fill="none" strokeDasharray="3 2" markerEnd={`url(#arr-${chapterId})`} />
      <text x={(a + b) / 2} y={18} textAnchor="middle" fontSize={8} fill="#0369a1" fontWeight={600}>{label}</text>
      {s.people.map((f) => (
        <Figure key={f.id} f={f} />
      ))}
    </svg>
  );
};
