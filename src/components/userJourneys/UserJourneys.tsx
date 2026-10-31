import React from 'react';
import { Compass, Map, User, Presentation } from 'lucide-react';
import { ScreenId } from '../../types';
import { PersonaId } from '../../data/journeyData';
import { JourneyOverview } from './JourneyOverview';
import { JourneyMap } from './JourneyMap';
import { PersonaLens } from './PersonaLens';
import { Walkthrough } from './Walkthrough';

export type JourneyView = 'overview' | 'map' | 'personas' | 'walkthrough';

interface Props {
  view: JourneyView;
  onChangeView: (v: JourneyView) => void;
  stepIndex: number;
  onChangeStep: (i: number) => void;
  personaId: PersonaId;
  onChangePersona: (id: PersonaId) => void;
  onOpenScreen: (screenId: ScreenId) => void;
  showFacilitatorNotes: boolean;
}

const VIEWS: { id: JourneyView; label: string; hint: string; Icon: typeof Map }[] = [
  { id: 'overview', label: 'Overview', hint: 'The story & the cast', Icon: Compass },
  { id: 'walkthrough', label: 'Walkthrough', hint: 'Present one moment at a time', Icon: Presentation },
  { id: 'map', label: 'Journey map', hint: 'Everyone, every step', Icon: Map },
  { id: 'personas', label: 'Persona lens', hint: 'One person end-to-end', Icon: User },
];

export const UserJourneys: React.FC<Props> = ({
  view,
  onChangeView,
  stepIndex,
  onChangeStep,
  personaId,
  onChangePersona,
  onOpenScreen,
  showFacilitatorNotes,
}) => {
  const present = (i: number) => {
    onChangeStep(i);
    onChangeView('walkthrough');
  };

  return (
    <div className="w-full bg-clinical-alabaster min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-[1440px] mx-auto space-y-6">
        <nav className="flex flex-wrap gap-2" aria-label="User journey views">
          {VIEWS.map(({ id, label, hint, Icon }) => {
            const active = view === id;
            return (
              <button
                key={id}
                onClick={() => onChangeView(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-left transition ${
                  active ? 'bg-slate-900 border-slate-900 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-sky-300' : 'text-sky-600'}`} />
                <span>
                  <span className="block text-sm font-semibold leading-tight">{label}</span>
                  <span className={`block text-[10px] ${active ? 'text-slate-300' : 'text-slate-400'}`}>{hint}</span>
                </span>
              </button>
            );
          })}
        </nav>

        {view === 'overview' && (
          <JourneyOverview
            onStartWalkthrough={present}
            onOpenPersona={(id) => {
              onChangePersona(id);
              onChangeView('personas');
            }}
            onOpenMap={() => onChangeView('map')}
          />
        )}
        {view === 'map' && (
          <JourneyMap selectedStep={stepIndex} onSelectStep={onChangeStep} onPresentStep={present} onOpenScreen={onOpenScreen} />
        )}
        {view === 'personas' && (
          <PersonaLens personaId={personaId} onSelectPersona={onChangePersona} onPresentStep={present} />
        )}
        {view === 'walkthrough' && (
          <Walkthrough
            stepIndex={stepIndex}
            onChangeStep={onChangeStep}
            onOpenScreen={onOpenScreen}
            showFacilitatorNotes={showFacilitatorNotes}
          />
        )}
      </div>
    </div>
  );
};
