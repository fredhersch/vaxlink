import React from 'react';
import { ActiveTab, ScreenId } from '../../types';
import { JOURNEY_STAGES } from '../../data/storylineData';
import { 
  GitBranch, 
  Smartphone, 
  Layers, 
  FileCode, 
  BookOpen, 
  RotateCcw, 
  Globe2, 
  ShieldCheck, 
  ChevronRight,
  Eye,
  Route
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentScreenId: ScreenId;
  setCurrentScreenId: (id: ScreenId) => void;
  onResetSimulation: () => void;
  isPresenterMode: boolean;
  setIsPresenterMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentScreenId,
  setCurrentScreenId,
  onResetSimulation,
  isPresenterMode,
  setIsPresenterMode,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-clinical-divider shadow-sm">
      {/* Top Banner: Context & Trust Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 md:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sky-400 font-semibold tracking-wide">
            <Globe2 className="w-3.5 h-3.5" />
            <span>WHO Pre-GDHF Vignette</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Cross-Border Digital Immunization Portability</span>
          <span className="hidden sm:inline bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-mono">
            J1 → J4.1 (Thailand ⇄ Lao PDR)
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="hidden md:flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-emerald-300">GDHCN DEV Trust List: XXR Active</span>
          </div>
          <button
            onClick={() => setIsPresenterMode(!isPresenterMode)}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded transition ${
              isPresenterMode
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Presenter Notes & Guidelines"
          >
            <Eye className="w-3 h-3" />
            <span>{isPresenterMode ? 'Presenter Mode: ON' : 'Presenter Notes'}</span>
          </button>
        </div>
      </div>

      {/* Main App Navigation Bar */}
      <div className="px-4 md:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Narrative Meta */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-600/20">
            V
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-clinical-ink tracking-tight">VaxLink</h1>
              <span className="text-xs bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded-full">
                Interactive Spec
              </span>
            </div>
            <p className="text-xs text-clinical-steel">
              Open Health Stack (OHS) &bull; WHO GDHCN &bull; Verifiable Health Links (VHL)
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium text-slate-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('journeys')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'journeys'
                ? 'bg-white text-clinical-ink shadow-sm font-semibold'
                : 'hover:text-clinical-ink'
            }`}
          >
            <Route className="w-3.5 h-3.5 text-rose-500" />
            <span>User Journeys</span>
          </button>

          <span className="w-px h-5 bg-slate-300 mx-1 flex-shrink-0" aria-hidden />

          <button
            onClick={() => setActiveTab('storyboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'storyboard'
                ? 'bg-white text-clinical-ink shadow-sm font-semibold'
                : 'hover:text-clinical-ink'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>S0 Storyboard Canvas</span>
          </button>

          <button
            onClick={() => setActiveTab('screens')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'screens'
                ? 'bg-white text-clinical-ink shadow-sm font-semibold'
                : 'hover:text-clinical-ink'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-sky-600" />
            <span>Interactive Device Screens</span>
          </button>

          <button
            onClick={() => setActiveTab('journey-flow')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'journey-flow'
                ? 'bg-white text-clinical-ink shadow-sm font-semibold'
                : 'hover:text-clinical-ink'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-sky-600" />
            <span>End-to-End Flow & Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('fhir-inspector')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'fhir-inspector'
                ? 'bg-white text-clinical-ink shadow-sm font-semibold'
                : 'hover:text-clinical-ink'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-sky-600" />
            <span>FHIR Payloads</span>
          </button>

          <button
            onClick={() => setActiveTab('workshop-guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'workshop-guide'
                ? 'bg-white text-clinical-ink shadow-sm font-semibold'
                : 'hover:text-clinical-ink'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-600" />
            <span>Workshop Guide</span>
          </button>
        </div>

        {/* Global Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetSimulation}
            className="flex items-center gap-1.5 text-xs text-clinical-steel hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
            title="Reset form entries & cryptographic simulations"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Reset Simulation</span>
          </button>
        </div>
      </div>

      {/* Screen / Stage Navigation Scrubber (Active when on Screens tab) */}
      {activeTab === 'screens' && (
        <div className="bg-slate-50 border-t border-clinical-divider px-4 md:px-8 py-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            <span className="text-[11px] font-semibold text-clinical-steel uppercase tracking-wider mr-2">
              Journey Stage:
            </span>
            {JOURNEY_STAGES.filter((s) => s.screenId !== 'S0').map((stage, idx) => {
              const isActive = currentScreenId === stage.screenId;
              return (
                <React.Fragment key={stage.screenId}>
                  {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />}
                  <button
                    onClick={() => setCurrentScreenId(stage.screenId)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition ${
                      isActive
                        ? 'bg-sky-600 text-white font-semibold shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-80">{stage.stageCode}</span>
                    <span>{stage.title}</span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
