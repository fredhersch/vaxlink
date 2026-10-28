import React, { useState } from 'react';
import { ActiveTab, ScreenId, DeviceType } from './types';
import { JOURNEY_STAGES } from './data/storylineData';
import { Header } from './components/common/Header';
import { DeviceFrame } from './components/common/DeviceFrame';
import { FhirInspectorDrawer } from './components/common/FhirInspectorDrawer';

// Screens
import { S0_Storyboard } from './components/screens/S0_Storyboard';
import { S1_BirthDosePreview } from './components/screens/S1_BirthDosePreview';
import { S2_ChwRegistration } from './components/screens/S2_ChwRegistration';
import { S3_ChwScanReferral } from './components/screens/S3_ChwScanReferral';
import { S4_ClinicVerification } from './components/screens/S4_ClinicVerification';
import { S5_TerminologyAdjudication } from './components/screens/S5_TerminologyAdjudication';
import { S6_FamilyWallet } from './components/screens/S6_FamilyWallet';
import { S7_VhlQrDisplay } from './components/screens/S7_VhlQrDisplay';
import { S8_ForeignClinicViewer } from './components/screens/S8_ForeignClinicViewer';

// Additional Pages
import { InteractiveJourneyFlow } from './components/journeyFlow/InteractiveJourneyFlow';
import { WorkshopGuide } from './components/workshopGuide/WorkshopGuide';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('storyboard');
  const [currentScreenId, setCurrentScreenId] = useState<ScreenId>('S1');
  const [isFramed, setIsFramed] = useState<boolean>(true);
  const [isFhirDrawerOpen, setIsFhirDrawerOpen] = useState<boolean>(false);
  const [isPresenterMode, setIsPresenterMode] = useState<boolean>(true);

  const currentStageMetadata = JOURNEY_STAGES.find((s) => s.screenId === currentScreenId) || JOURNEY_STAGES[1];

  const handleSelectScreen = (screenId: ScreenId) => {
    if (screenId === 'S0') {
      setActiveTab('storyboard');
    } else {
      setCurrentScreenId(screenId);
      setActiveTab('screens');
    }
  };

  const handleResetSimulation = () => {
    setCurrentScreenId('S1');
    setIsFhirDrawerOpen(false);
  };

  const renderActiveScreenContent = () => {
    switch (currentScreenId) {
      case 'S1':
        return (
          <S1_BirthDosePreview
            onNext={() => setCurrentScreenId('S2')}
            onOpenFhirInspector={() => setIsFhirDrawerOpen(true)}
          />
        );
      case 'S2':
        return (
          <S2_ChwRegistration
            onNext={() => setCurrentScreenId('S3')}
            onOpenFhirInspector={() => setIsFhirDrawerOpen(true)}
          />
        );
      case 'S3':
        return (
          <S3_ChwScanReferral
            onNext={() => setCurrentScreenId('S4')}
            onOpenFhirInspector={() => setIsFhirDrawerOpen(true)}
          />
        );
      case 'S4':
        return (
          <S4_ClinicVerification
            onNext={() => setCurrentScreenId('S5')}
            onOpenFhirInspector={() => setIsFhirDrawerOpen(true)}
          />
        );
      case 'S5':
        return (
          <S5_TerminologyAdjudication
            onNext={() => setCurrentScreenId('S6')}
            onOpenFhirInspector={() => setIsFhirDrawerOpen(true)}
          />
        );
      case 'S6':
        return (
          <S6_FamilyWallet
            onNext={() => setCurrentScreenId('S7')}
            onOpenFhirInspector={() => setIsFhirDrawerOpen(true)}
          />
        );
      case 'S7':
        return (
          <S7_VhlQrDisplay
            onNext={() => setCurrentScreenId('S8')}
            onOpenFhirInspector={() => setIsFhirDrawerOpen(true)}
          />
        );
      case 'S8':
        return (
          <S8_ForeignClinicViewer
            onRestart={() => setCurrentScreenId('S1')}
            onOpenFhirInspector={() => setIsFhirDrawerOpen(true)}
          />
        );
      default:
        return (
          <S1_BirthDosePreview
            onNext={() => setCurrentScreenId('S2')}
            onOpenFhirInspector={() => setIsFhirDrawerOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-clinical-alabaster flex flex-col text-clinical-ink">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentScreenId={currentScreenId}
        setCurrentScreenId={setCurrentScreenId}
        onResetSimulation={handleResetSimulation}
        isPresenterMode={isPresenterMode}
        setIsPresenterMode={setIsPresenterMode}
      />

      {/* Presenter Guidelines / Objective Ribbon */}
      {isPresenterMode && (
        <div className="bg-sky-950 text-sky-200 px-6 py-2 border-b border-sky-900 text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono bg-sky-800 text-white px-2 py-0.5 rounded font-bold text-[10px]">
              PRESENTER NOTE
            </span>
            <span>
              {activeTab === 'storyboard' && 'Screen S0 provides a 5-column birds-eye view for plenary presentations & workshop context.'}
              {activeTab === 'screens' && `Stage ${currentStageMetadata.stageCode} (${currentStageMetadata.title}) — ${currentStageMetadata.learningObjective}`}
              {activeTab === 'journey-flow' && 'End-to-End Architecture Flow maps data handoffs, cryptographic trust, and FHIR mutations across borders.'}
              {activeTab === 'fhir-inspector' && 'Full developer inspection bar displaying syntax-highlighted FHIR R4 resources & COSE headers.'}
              {activeTab === 'workshop-guide' && 'Facilitator companion with policy takeaways & discussion questions for Pre-GDHF delegates.'}
            </span>
          </div>
          <button
            onClick={() => setIsPresenterMode(false)}
            className="text-[11px] text-sky-400 hover:text-white underline font-mono"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Body Viewport */}
      <main className="flex-1 flex flex-col">
        {/* Tab 1: S0 Master Storyboard Canvas */}
        {activeTab === 'storyboard' && (
          <S0_Storyboard
            onSelectScreen={handleSelectScreen}
            onOpenFhirInspector={() => setIsFhirDrawerOpen(true)}
          />
        )}

        {/* Tab 2: Interactive Device Screens (S1 - S8) */}
        {activeTab === 'screens' && (
          <DeviceFrame
            deviceType={currentStageMetadata.deviceType}
            title={currentStageMetadata.title}
            appConfig={currentStageMetadata.appConfig}
            isFramed={isFramed}
            onToggleFrame={() => setIsFramed(!isFramed)}
          >
            {renderActiveScreenContent()}
          </DeviceFrame>
        )}

        {/* Tab 3: End-to-End Architecture & Interactive Flow */}
        {activeTab === 'journey-flow' && (
          <InteractiveJourneyFlow
            onNavigateToScreen={(screenId) => {
              setCurrentScreenId(screenId);
              setActiveTab('screens');
            }}
          />
        )}

        {/* Tab 4: Dedicated FHIR Inspector Tab */}
        {activeTab === 'fhir-inspector' && (
          <div className="p-6 max-w-5xl mx-auto w-full">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-clinical-ink">
                FHIR R4 & WHO GDHCN Technical Resource Inspector
              </h2>
              <p className="text-xs text-clinical-steel">
                Inspect structured clinical resources, provenance, concept mappings, and raw CBOR payloads.
              </p>
            </div>
            <FhirInspectorDrawer
              currentStageCode={currentStageMetadata.stageCode}
              isOpen={true}
              onToggle={() => {}}
            />
          </div>
        )}

        {/* Tab 5: Workshop Guide & Policy Companion */}
        {activeTab === 'workshop-guide' && (
          <WorkshopGuide
            onNavigateToScreen={(screenId) => {
              setCurrentScreenId(screenId);
              setActiveTab('screens');
            }}
          />
        )}
      </main>

      {/* Persistent Collapsible Developer Payload Drawer */}
      <FhirInspectorDrawer
        currentStageCode={activeTab === 'screens' ? currentStageMetadata.stageCode : 'Master'}
        isOpen={isFhirDrawerOpen}
        onToggle={() => setIsFhirDrawerOpen(!isFhirDrawerOpen)}
      />
    </div>
  );
}

export default App;
