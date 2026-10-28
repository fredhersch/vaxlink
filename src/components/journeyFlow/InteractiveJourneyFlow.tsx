import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { PATIENT_DATA, GDHCN_DEV_KEY, JOURNEY_STAGES } from '../../data/storylineData';
import { 
  Building2, 
  Home, 
  ShieldCheck, 
  Globe2, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Activity, 
  Database, 
  Code2, 
  Smartphone, 
  FileText, 
  Share2, 
  Layers,
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';

interface InteractiveJourneyFlowProps {
  onNavigateToScreen: (screenId: ScreenId) => void;
}

export const InteractiveJourneyFlow: React.FC<InteractiveJourneyFlowProps> = ({
  onNavigateToScreen,
}) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const [activeLaneFilter, setActiveLaneFilter] = useState<'ALL' | 'THA' | 'LAO' | 'DPI'>('ALL');

  const stages = [
    {
      code: "J1",
      screenId: "S1" as ScreenId,
      title: "Birth Abroad & DVC Paper Card Issuance",
      country: "Thailand (Country A)",
      countryCode: "THA",
      lane: "THA",
      actor: "Maternity Ward Nurse / Hospital Discharge Station",
      actorSystem: "Chiang Rai Hospital EMR + Printer",
      timeline: "T0 (Birth Day)",
      crypto: "COSE_Sign1 (ES256) signed with Thailand MOPH DEV key (kid: 916ffa567c0f44a2)",
      fhirResources: ["FHIR Immunization (HepB)", "FHIR Immunization (BCG)", "CBOR DVCMinPreQual logical model"],
      narrative: [
        "Lao mother Khamla delivers infant Somsack in Thailand without Thai civil registration.",
        "Maternity staff administer Hepatitis B and BCG birth doses using WHO PreQual product codes (vp-hepb-peds-monovalent, vp-bcg-freeze-dried).",
        "Hospital issues two physical paper Digital Vaccine Certificates (DVCs) with high-density QR Version 16 codes carried by the family returning home."
      ],
      policyTakeaway: "Enables non-national newborns to receive cryptographically verifiable health credentials without depending on host-country citizen registry IDs.",
      dataFlow: "Birth Event → EMR Record → COSE Signature (XXR Key) → QR Matrix → Paper Printout",
      statusVariant: "info"
    },
    {
      code: "J2a",
      screenId: "S2" as ScreenId,
      title: "Household Discovery & Newborn SDC Registration",
      country: "Lao PDR (Country B)",
      countryCode: "LAO",
      lane: "LAO",
      actor: "Soukanh (Frontline Community Health Worker)",
      actorSystem: "OHS Player Community Config (Offline Android)",
      timeline: "T0 + 3 Weeks",
      crypto: "Local SQLite offline transaction (No cryptographic network check required)",
      fhirResources: ["FHIR Patient (Somsack)", "FHIR RelatedPerson", "FHIR Group (#HH-LAO-204 mutation)"],
      narrative: [
        "During a routine home visit in Catchment Village 04, CHW discovers newborn Somsack in the Sengmany household roster.",
        "CHW launches Structured Data Capture (SDC) questionnaire to register Somsack into the household Group.",
        "CHW marks foreign birth in Thailand and flags that the parents possess two Thai paper vaccination cards."
      ],
      policyTakeaway: "Guarantees newborn registration in rural offline environments (offline up to 28+ days) without premature national ID dependencies.",
      dataFlow: "Frontline Interview → SDC Form Input → Offline SQLite Store → Linked RelatedPerson",
      statusVariant: "warning"
    },
    {
      code: "J2b",
      screenId: "S3" as ScreenId,
      title: "Offline QR Scan & Health Center Referral",
      country: "Lao PDR (Country B)",
      countryCode: "LAO",
      lane: "LAO",
      actor: "Soukanh (Frontline Community Health Worker)",
      actorSystem: "OHS Player Community Config (Offline Android)",
      timeline: "T0 + 3 Weeks",
      crypto: "Offline CBOR string decoding only (No key signature check; primarySource=false)",
      fhirResources: ["FHIR Immunization (x2, primarySource=false)", "FHIR ServiceRequest (Referral)"],
      narrative: [
        "CHW scans the two paper QR cards using the phone's camera in offline mode.",
        "Decodes base metadata (vaccine type, lot number, date) into local SQLite store as unverified immunizations (primarySource=false).",
        "Creates a FHIR ServiceRequest referral to Vientiane District Health Center for signature verification and schedule mapping."
      ],
      policyTakeaway: "Maintains clear boundary between unverified caregiver assertions (primarySource=false) and authoritative verified health records.",
      dataFlow: "Paper QR Scan → CBOR Decoding → Local Immunization (Unverified) → ServiceRequest Referral",
      statusVariant: "unverified"
    },
    {
      code: "J3a",
      screenId: "S4" as ScreenId,
      title: "Clinic GDHCN Signature Verification",
      country: "Lao PDR (Country B)",
      countryCode: "LAO",
      lane: "LAO",
      actor: "Nurse Chanthasone",
      actorSystem: "OHS Player Facility Config (Tablet EMR)",
      timeline: "T0 + 4 Weeks",
      crypto: "COSE_Sign1 verified against cached GDHCN DEV trust list (XXR key 916ffa567c0f44a2)",
      fhirResources: ["FHIR Provenance (Attached)", "FHIR Immunization (Updated to primarySource=true)"],
      narrative: [
        "Family brings Somsack to Vientiane District Health Center fulfilling the CHW referral.",
        "Nurse scans the paper cards with tablet camera; EMR verifies cryptographic ES256 signature against cached GDHCN trust list.",
        "Verification succeeds; EMR updates Immunization.primarySource to true and attaches authoritative FHIR Provenance pointing to Thailand MOPH."
      ],
      policyTakeaway: "Decentralized trust verification: Lao health facility independently verifies Thai signature without contacting Thailand servers at runtime.",
      dataFlow: "Camera Scan → GDHCN Trust List Lookup → COSE Signature Check → Provenance Resource Created",
      statusVariant: "verified"
    },
    {
      code: "J3b",
      screenId: "S5" as ScreenId,
      title: "Terminology Adjudication & National Schedule",
      country: "Lao PDR (Country B)",
      countryCode: "LAO",
      lane: "LAO",
      actor: "Nurse Chanthasone",
      actorSystem: "OHS Player Facility Config (Tablet EMR)",
      timeline: "T0 + 4 Weeks",
      crypto: "ConceptMap 3-layer crosswalk & PlanDefinition schedule evaluation engine",
      fhirResources: ["FHIR Immunization.vaccineCode.coding[] (Dual Coded)", "FHIR PlanDefinition", "FHIR Task / Appointment"],
      narrative: [
        "Thai PreQual product code (vp-hepb-peds-monovalent) has no automated match in Lao national schedule.",
        "Clinician adjudicates 3-layer ConceptMap: confirms equivalence to Lao EPI HepB-BD and appends second national coding while preserving original PreQual code.",
        "PlanDefinition engine evaluates infant schedule, validates birth doses as complete, and books 6-week pentavalent catchup."
      ],
      policyTakeaway: "Preserves clinical provenance by retaining source cross-border coding alongside local national schedule codes (never overwrite foreign history).",
      dataFlow: "PreQual Code → ConceptMap Adjudication → Dual-Coding Array → PlanDefinition Engine → Task Booking",
      statusVariant: "verified"
    },
    {
      code: "J4.0a",
      screenId: "S6" as ScreenId,
      title: "One Family, One Phone Multi-Member Wallet",
      country: "Lao PDR (Country B)",
      countryCode: "LAO",
      lane: "LAO",
      actor: "Bounmy Sengmany (Father & Phone Holder)",
      actorSystem: "OHS Player Family Config (Mobile Wallet)",
      timeline: "T0 + 12 Months",
      crypto: "Encrypted local key storage & HTTPS sync with Lao National Health Portal",
      fhirResources: ["FHIR Group", "FHIR Bundle [IPS] (Somsack: 6 verified doses)", "FHIR MedicationStatement (Bounmy)"],
      narrative: [
        "One year later, family prepares for return travel to Thailand on Somsack's first birthday.",
        "Father's shared smartphone manages profiles for Father (chronic hypertension medications), Mother, and Baby Somsack.",
        "Somsack's IPS bundle consolidates the 2 birth doses verified in Thailand + 4 domestic Lao doses into a unified longitudinal summary."
      ],
      policyTakeaway: "Digital health equity: Shared smartphone architecture ('One Family, One Phone') prevents marginalizing families without multiple devices.",
      dataFlow: "National Portal Sync → Household Group Profile Switcher → Longitudinal IPS Assembly",
      statusVariant: "verified"
    },
    {
      code: "J4.0b",
      screenId: "S7" as ScreenId,
      title: "VHL QR Generation & Passcode Protection",
      country: "Lao PDR (Country B)",
      countryCode: "LAO",
      lane: "LAO",
      actor: "Bounmy Sengmany (Father & Traveler)",
      actorSystem: "OHS Player Family Config (Mobile Wallet)",
      timeline: "T0 + 12 Months",
      crypto: "IHE ITI VHL manifest signing + 4-digit verbal passcode key derivation (4829)",
      fhirResources: ["IHE ITI VHL Manifest", "FHIR Consent (IHE PCF Profile)"],
      narrative: [
        "Father generates a Verifiable Health Link (VHL) QR code for Somsack prior to crossing the border.",
        "The QR code contains only a secure pointer and decryption key — no clinical records are embedded directly in the matrix.",
        "Father sets a 4-digit verbal passcode (4829) with 14-day link lifetime to prevent unauthorized scanning by third parties."
      ],
      policyTakeaway: "Sovereign data custody: Clinical data never leaves Lao PDR until specifically authorized and decrypted at point of care.",
      dataFlow: "IPS Pointer Request → National Portal VHL Token → Passcode Salt Binding → Dynamic VHL QR",
      statusVariant: "info"
    },
    {
      code: "J4.1",
      screenId: "S8" as ScreenId,
      title: "Foreign Point-of-Care VHL Access & Real-Time Audit",
      country: "Thailand (Country A)",
      countryCode: "THA",
      lane: "THA",
      actor: "Dr. Somchai (Clinician)",
      actorSystem: "OHS Player Viewer Config (Web/Tablet)",
      timeline: "T0 + 12 Months",
      crypto: "HTTPS TLS + Passcode decryption + Real-time FHIR AuditEvent telemetry",
      fhirResources: ["Decrypted FHIR Bundle [IPS]", "FHIR AuditEvent (Delivered to Lao Info Gateway)"],
      narrative: [
        "At a Thai clinic on Somsack's first birthday, Dr. Somchai scans Somsack's VHL QR and enters the verbal passcode (4829).",
        "Clinician tablet fetches the encrypted IPS bundle over HTTPS from Lao national repository and decrypts in memory for a zero-retention session.",
        "The fetch automatically triggers an immutable FHIR AuditEvent logged back at the Lao PDR OHS Info Gateway completing the full loop."
      ],
      policyTakeaway: "Full-circle cross-border continuity of care without central data repositories, international patient databases, or vendor lock-in.",
      dataFlow: "VHL QR Scan → Verbal Passcode 4829 → HTTPS Manifest Fetch → In-Memory Decrypt → Live AuditEvent Log",
      statusVariant: "verified"
    }
  ];

  const currentStage = stages[selectedStageIndex];

  return (
    <div className="w-full bg-clinical-alabaster min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* Header Strip */}
        <div className="bg-white rounded-2xl border border-clinical-divider p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-sky-100 text-sky-800 font-mono text-xs font-bold">
                  Architecture & Process Flow
                </span>
                <h2 className="text-xl font-bold text-clinical-ink tracking-tight">
                  End-to-End Cross-Border Lifecycle & Trust Topology
                </h2>
              </div>
              <p className="text-xs text-clinical-steel mt-1 max-w-3xl">
                Explore how clinical identity, cryptographic trust, offline sync, terminology harmonization, and Verifiable Health Links (VHL) interconnect across Thailand and Lao PDR.
              </p>
            </div>

            {/* Lane Filter Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setActiveLaneFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeLaneFilter === 'ALL' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Lanes
              </button>
              <button
                onClick={() => setActiveLaneFilter('THA')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeLaneFilter === 'THA' ? 'bg-amber-100 text-amber-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Thailand (THA)
              </button>
              <button
                onClick={() => setActiveLaneFilter('LAO')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeLaneFilter === 'LAO' ? 'bg-sky-100 text-sky-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lao PDR (LAO)
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Cross-Border Visual Pipeline (8 Steps Horizontal Scrubber) */}
        <div className="bg-white rounded-2xl border border-clinical-divider p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-dpi-cobalt" />
              <span>Interactive Step-by-Step Pipeline (Click any step to inspect details)</span>
            </span>
            <span className="text-xs font-mono text-slate-500">
              Step {selectedStageIndex + 1} of {stages.length}: {currentStage.code}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {stages.map((stage, idx) => {
              const isSelected = selectedStageIndex === idx;
              const isFiltered = activeLaneFilter !== 'ALL' && stage.lane !== activeLaneFilter;

              return (
                <button
                  key={stage.code}
                  onClick={() => setSelectedStageIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[96px] ${
                    isSelected
                      ? 'border-dpi-cobalt bg-sky-50/70 shadow-sm ring-2 ring-dpi-cobalt/20'
                      : isFiltered
                      ? 'opacity-40 border-slate-200 bg-white hover:opacity-80'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-mono text-xs font-bold ${isSelected ? 'text-dpi-cobalt' : 'text-slate-700'}`}>
                        {stage.code}
                      </span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                        stage.countryCode === 'THA' ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'
                      }`}>
                        {stage.countryCode}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-800 line-clamp-2 leading-tight">
                      {stage.title}
                    </div>
                  </div>

                  <div className="text-[9px] font-mono text-slate-400 mt-2">
                    {stage.timeline}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Deep-Dive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (7 cols): Narrative & Clinical Flow */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl border border-clinical-divider p-6 shadow-sm space-y-4">
              
              {/* Stage title & meta */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-slate-900 text-white">
                      {currentStage.code}
                    </span>
                    <h3 className="text-lg font-bold text-clinical-ink">
                      {currentStage.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-clinical-steel mt-1">
                    <span>Location: <strong>{currentStage.country}</strong></span>
                    <span>&bull;</span>
                    <span>Timeline: <strong>{currentStage.timeline}</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToScreen(currentStage.screenId)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-dpi-cobalt hover:bg-dpi-cobalt-dark text-white rounded-lg text-xs font-semibold shadow-xs transition"
                >
                  <span>Launch Screen {currentStage.screenId}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Actor & System */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">Primary Actor</span>
                  <strong className="text-slate-800">{currentStage.actor}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">Software System / Config</span>
                  <strong className="text-slate-800">{currentStage.actorSystem}</strong>
                </div>
              </div>

              {/* What happens at this stage: Step by step */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  What Happens at this Stage (Detailed Process)
                </h4>
                <div className="space-y-2">
                  {currentStage.narrative.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Transformation Pipeline */}
              <div className="p-3.5 bg-slate-900 rounded-xl text-slate-200 text-xs font-mono space-y-1.5">
                <div className="text-[10px] text-sky-400 uppercase tracking-wider font-semibold">
                  Data Transformation & Transport Pipeline
                </div>
                <div className="text-emerald-400 text-xs leading-relaxed">
                  {currentStage.dataFlow}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (5 cols): Cryptographic, FHIR & Policy Specifications */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Cryptographic & Trust Mechanics */}
            <div className="bg-white rounded-2xl border border-clinical-divider p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-clinical-ink uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cryptographic & Trust Mechanics</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                {currentStage.crypto}
              </p>
            </div>

            {/* FHIR R4 Resources Mutated / Generated */}
            <div className="bg-white rounded-2xl border border-clinical-divider p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-clinical-ink uppercase tracking-wider">
                <Code2 className="w-4 h-4 text-dpi-cobalt" />
                <span>FHIR R4 Resources Created / Mutated</span>
              </div>
              <div className="space-y-1.5">
                {currentStage.fhirResources.map((res, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policy & Governance Takeaway */}
            <div className="bg-white rounded-2xl border border-clinical-divider p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-clinical-ink uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>WHO Pre-GDHF Delegate Policy Takeaway</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/70 p-3 rounded-xl border border-amber-200">
                {currentStage.policyTakeaway}
              </p>
            </div>

          </div>

        </div>

        {/* Global Architecture Swimlane Diagram (Bottom Overview) */}
        <div className="bg-white rounded-2xl border border-clinical-divider p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-clinical-ink uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-dpi-cobalt" />
            <span>Cross-Border Swimlane Architecture Overview</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            {/* Lane 1: Thailand */}
            <div className="p-4 rounded-xl border-2 border-amber-200 bg-amber-50/30 space-y-2">
              <div className="font-bold text-amber-900 border-b border-amber-200 pb-1 flex items-center justify-between">
                <span>Country A: Thailand</span>
                <span className="text-[10px] font-mono bg-amber-200/70 px-1.5 py-0.5 rounded">XXR DEV</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 text-[11px]">
                <li>&bull; Provincial Maternity Hospital (Chiang Rai)</li>
                <li>&bull; Issues physical paper DVC cards (QR v16)</li>
                <li>&bull; Signed by XXR DEV Key `916ffa567c0f44a2`</li>
                <li>&bull; Year 1: Dr. Somchai PoC VHL Viewer</li>
              </ul>
            </div>

            {/* Lane 2: Transit */}
            <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-800 border-b border-slate-200 pb-1 flex items-center justify-between">
                <span>Cross-Border Physical Transit</span>
                <span className="text-[10px] font-mono bg-slate-200 px-1.5 py-0.5 rounded">Family</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 text-[11px]">
                <li>&bull; Mother carries printed DVC paper wallet cards</li>
                <li>&bull; Father carries smartphone with Family Wallet</li>
                <li>&bull; No live connection required across border</li>
                <li>&bull; Verifiable Health Link (VHL) over IHE ITI profile</li>
              </ul>
            </div>

            {/* Lane 3: Lao PDR */}
            <div className="p-4 rounded-xl border-2 border-sky-200 bg-sky-50/30 space-y-2">
              <div className="font-bold text-sky-900 border-b border-sky-200 pb-1 flex items-center justify-between">
                <span>Country B: Lao PDR (Home)</span>
                <span className="text-[10px] font-mono bg-sky-200/70 px-1.5 py-0.5 rounded">Open Health Stack</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 text-[11px]">
                <li>&bull; Village 04 CHW: Offline SDC capture (Android)</li>
                <li>&bull; District Health Center: GDHCN trust verification</li>
                <li>&bull; 3-Layer ConceptMap adjudication (HepB-BD)</li>
                <li>&bull; National OHS Info Gateway & FHIR Repository</li>
              </ul>
            </div>

            {/* Lane 4: Trust Infrastructure */}
            <div className="p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50/30 space-y-2">
              <div className="font-bold text-emerald-900 border-b border-emerald-200 pb-1 flex items-center justify-between">
                <span>Global Trust Infrastructure</span>
                <span className="text-[10px] font-mono bg-emerald-200/70 px-1.5 py-0.5 rounded">WHO GDHCN</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 text-[11px]">
                <li>&bull; WHO GDHCN DEV Trust List caching</li>
                <li>&bull; Public key distribution for DSC validation</li>
                <li>&bull; WHO SMART Guidelines & PreQual CodeSystems</li>
                <li>&bull; Zero patient data stored in central GDHCN</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
