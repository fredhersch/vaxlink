import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { PATIENT_DATA, GDHCN_DEV_KEY } from '../../data/storylineData';
import { 
  Building2, 
  Home, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  QrCode, 
  Smartphone, 
  FileCheck, 
  Lock, 
  Activity, 
  RefreshCw,
  ExternalLink,
  Layers,
  Database,
  Calendar,
  Users
} from 'lucide-react';

interface S0StoryboardProps {
  onSelectScreen: (screenId: ScreenId) => void;
  onOpenFhirInspector: () => void;
}

export const S0_Storyboard: React.FC<S0StoryboardProps> = ({
  onSelectScreen,
  onOpenFhirInspector,
}) => {
  const [viewMode, setViewMode] = useState<'clinical' | 'architecture'>('clinical');
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);

  return (
    <div className="w-full bg-clinical-alabaster min-h-[900px] flex flex-col font-sans">
      {/* 1. Header Canvas Bar */}
      <div className="bg-white border-b border-clinical-divider px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono text-xs font-semibold">
              Screen S0: Master Overview
            </span>
            <h2 className="text-xl font-bold text-clinical-ink tracking-tight">
              VaxLink — Cross-Border Immunization & VHL Storyboard
            </h2>
          </div>
          <p className="text-xs text-clinical-steel mt-0.5">
            5-Stage Cross-Border Continuity of Care &bull; WHO GDHCN DEV Trust Network &bull; Open Health Stack
          </p>
        </div>

        {/* Country Lane Legend & View Toggle */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Country A: Thailand [Issuer XXR]</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200 text-sky-900 font-medium">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              <span>Country B: Lao PDR [Home System]</span>
            </div>
          </div>

          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
            <button
              onClick={() => setViewMode('clinical')}
              className={`px-3 py-1.5 rounded-md transition ${
                viewMode === 'clinical'
                  ? 'bg-white text-clinical-ink shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Clinical Journey View
            </button>
            <button
              onClick={() => setViewMode('architecture')}
              className={`px-3 py-1.5 rounded-md transition ${
                viewMode === 'architecture'
                  ? 'bg-white text-clinical-ink shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FHIR & GDHCN Architecture
            </button>
          </div>
        </div>
      </div>

      {/* 2. Hero / Patient Context Strip & Timeline Scrubber */}
      <div className="bg-slate-900 text-white px-6 py-3.5 border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Family profile */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-slate-100">Sengmany Household</span>
                <span className="font-mono text-xs text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                  #{PATIENT_DATA.householdId}
                </span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  Nationality: {PATIENT_DATA.nationality}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Newborn: <strong className="text-slate-200">{PATIENT_DATA.infantName}</strong> &bull; Mother: {PATIENT_DATA.motherName} (26y) &bull; Father: {PATIENT_DATA.fatherName} (29y)
              </p>
            </div>
          </div>

          {/* Timeline Scrubber */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">TIMELINE:</span>
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <div className="flex items-center gap-1.5 bg-slate-800 text-amber-300 px-2.5 py-1 rounded border border-amber-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>T0: Birth Abroad (THA)</span>
              </div>
              <ArrowRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
              <div className="flex items-center gap-1.5 bg-slate-800 text-sky-300 px-2.5 py-1 rounded border border-sky-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>T0+3w: CHW Visit (LAO)</span>
              </div>
              <ArrowRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
              <div className="flex items-center gap-1.5 bg-slate-800 text-emerald-300 px-2.5 py-1 rounded border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>T0+4w: Clinic EMR Check</span>
              </div>
              <ArrowRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
              <div className="flex items-center gap-1.5 bg-slate-800 text-indigo-300 px-2.5 py-1 rounded border border-indigo-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>T0+12m: Return Travel (THA)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Primary Content Area: 5-Column Connected Visual Flow */}
      <div className="flex-1 p-6 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* COLUMN 1: J1 Birth Abroad (Thailand Clinic) */}
          <div 
            onClick={() => onSelectScreen('S1')}
            className="group cursor-pointer bg-white rounded-xl border-2 border-amber-200/80 hover:border-amber-400 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Country & Stage Header */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-100 text-amber-900 border border-amber-200">
                  J1 &bull; S1
                </span>
                <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  Country A (Thailand)
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-sm text-clinical-ink group-hover:text-amber-800 transition">
                  Birth Abroad & Printed DVC
                </h3>
              </div>

              <p className="text-xs text-clinical-steel mb-3 line-clamp-2">
                Chiang Rai Provincial Hospital administers Hep B & BCG birth doses with WHO PreQual codes.
              </p>

              {/* Visual Artifacts */}
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-2 mb-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-700">2x Printed Paper Cards:</span>
                  <span className="font-mono text-emerald-700 font-semibold">QR v16</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Key: {GDHCN_DEV_KEY.kid.substring(0, 8)}...</span>
                </div>
                <div className="text-[10px] bg-white p-1.5 rounded border border-slate-200 text-slate-600 font-mono">
                  Payload: HC1:6BFOXN...
                </div>
              </div>

              {/* View mode specific info */}
              {viewMode === 'architecture' ? (
                <div className="space-y-1 text-[11px] font-mono bg-amber-50/60 p-2 rounded border border-amber-100 text-amber-900">
                  <div>+ FHIR Immunization (TH)</div>
                  <div>+ CBOR / COSE_Sign1 (ES256)</div>
                  <div>+ Logical DVCMinPreQual</div>
                </div>
              ) : (
                <div className="text-xs text-amber-900 bg-amber-50 p-2 rounded border border-amber-100">
                  Mother receives physical paper cards to carry across border to Lao PDR.
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-800 font-medium">
              <span>Inspect Screen S1</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* COLUMN 2: J2 Household Discovery (Lao PDR CHW Offline) */}
          <div 
            onClick={() => onSelectScreen('S2')}
            className="group cursor-pointer bg-white rounded-xl border-2 border-sky-200/80 hover:border-sky-400 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-sky-100 text-sky-900 border border-sky-200">
                  J2a/b &bull; S2/S3
                </span>
                <span className="text-[11px] font-medium text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                  Country B (Lao PDR)
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Home className="w-4 h-4 text-sky-600" />
                <h3 className="font-bold text-sm text-clinical-ink group-hover:text-sky-800 transition">
                  Household Roster & Offline Scan
                </h3>
              </div>

              <p className="text-xs text-clinical-steel mb-3 line-clamp-2">
                Catchment Village 04 CHW registers newborn in household Group & scans paper QR offline.
              </p>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-2 mb-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-700">App State:</span>
                  <span className="font-mono text-amber-700 font-semibold">Offline Mode (28d)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50 p-1 rounded font-mono">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>primarySource: false</span>
                </div>
                <div className="text-[10px] bg-white p-1.5 rounded border border-slate-200 text-slate-600">
                  Referral: ServiceRequest to District HC
                </div>
              </div>

              {viewMode === 'architecture' ? (
                <div className="space-y-1 text-[11px] font-mono bg-sky-50/60 p-2 rounded border border-sky-100 text-sky-900">
                  <div>+ SDC QuestionnaireResponse</div>
                  <div>+ FHIR Group & RelatedPerson</div>
                  <div>+ FHIR ServiceRequest (Queued)</div>
                </div>
              ) : (
                <div className="text-xs text-sky-900 bg-sky-50 p-2 rounded border border-sky-100">
                  Metadata decoded locally. Signature verification deferred to clinic with trust list.
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-sky-800 font-medium">
              <span>Inspect Screens S2 &bull; S3</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* COLUMN 3: J3 Clinic Verification & Schedule (Lao PDR Facility Tablet) */}
          <div 
            onClick={() => onSelectScreen('S4')}
            className="group cursor-pointer bg-white rounded-xl border-2 border-emerald-200/80 hover:border-emerald-400 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 text-emerald-900 border border-emerald-200">
                  J3a/b &bull; S4/S5
                </span>
                <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Country B (Lao PDR)
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-sm text-clinical-ink group-hover:text-emerald-800 transition">
                  Signature Verification & Adjudication
                </h3>
              </div>

              <p className="text-xs text-clinical-steel mb-3 line-clamp-2">
                Vientiane District HC validates COSE signature with GDHCN DEV trust list and maps schedule.
              </p>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-2 mb-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-700">COSE Sign1:</span>
                  <span className="font-mono text-emerald-700 font-bold">VALID (ES256)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 p-1 rounded font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>primarySource: true</span>
                </div>
                <div className="text-[10px] bg-white p-1.5 rounded border border-slate-200 text-slate-600">
                  3-Layer ConceptMap: HepB-BD confirmed
                </div>
              </div>

              {viewMode === 'architecture' ? (
                <div className="space-y-1 text-[11px] font-mono bg-emerald-50/60 p-2 rounded border border-emerald-100 text-emerald-900">
                  <div>+ FHIR Provenance (Attached)</div>
                  <div>+ Dual-coded Immunization.vaccineCode</div>
                  <div>+ PlanDefinition Schedule / Task</div>
                </div>
              ) : (
                <div className="text-xs text-emerald-900 bg-emerald-50 p-2 rounded border border-emerald-100">
                  Authoritative cryptographic verification resolves foreign doses into national record.
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800 font-medium">
              <span>Inspect Screens S4 &bull; S5</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* COLUMN 4: J4.0 One Family, One Phone Wallet (Lao PDR Mobile) */}
          <div 
            onClick={() => onSelectScreen('S6')}
            className="group cursor-pointer bg-white rounded-xl border-2 border-indigo-200/80 hover:border-indigo-400 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-100 text-indigo-900 border border-indigo-200">
                  J4.0a/b &bull; S6/S7
                </span>
                <span className="text-[11px] font-medium text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded">
                  Country B (Lao PDR)
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-sm text-clinical-ink group-hover:text-indigo-800 transition">
                  Household Wallet & VHL Credential
                </h3>
              </div>

              <p className="text-xs text-clinical-steel mb-3 line-clamp-2">
                Father's smartphone manages 3 profiles. Generates passcode-protected Verifiable Health Link (VHL).
              </p>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-2 mb-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-700">Baby IPS:</span>
                  <span className="font-mono text-indigo-700 font-semibold">6 Doses (TH+LAO)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-700">
                  <Lock className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                  <span>Passcode: 4829 (Father)</span>
                </div>
                <div className="text-[10px] bg-white p-1.5 rounded border border-slate-200 text-slate-600">
                  IHE ITI VHL &bull; 14-day token link
                </div>
              </div>

              {viewMode === 'architecture' ? (
                <div className="space-y-1 text-[11px] font-mono bg-indigo-50/60 p-2 rounded border border-indigo-100 text-indigo-900">
                  <div>+ FHIR Bundle (IPS Composition)</div>
                  <div>+ IHE PCF Consent Record</div>
                  <div>+ Encrypted VHL Manifest Token</div>
                </div>
              ) : (
                <div className="text-xs text-indigo-900 bg-indigo-50 p-2 rounded border border-indigo-100">
                  Health records remain in Lao PDR custody; QR carries only temporary link + decryption key.
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-800 font-medium">
              <span>Inspect Screens S6 &bull; S7</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* COLUMN 5: J4.1 Foreign Clinic VHL Access & Audit (Thailand Viewer) */}
          <div 
            onClick={() => onSelectScreen('S8')}
            className="group cursor-pointer bg-white rounded-xl border-2 border-rose-200/80 hover:border-rose-400 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-100 text-rose-900 border border-rose-200">
                  J4.1 &bull; S8
                </span>
                <span className="text-[11px] font-medium text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
                  Country A (Thailand)
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-rose-600" />
                <h3 className="font-bold text-sm text-clinical-ink group-hover:text-rose-800 transition">
                  Foreign VHL Access & Audit Trace
                </h3>
              </div>

              <p className="text-xs text-clinical-steel mb-3 line-clamp-2">
                Thai clinician scans VHL, unlocks IPS with passcode 4829, and triggers real-time Lao audit callback.
              </p>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-2 mb-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-700">Session:</span>
                  <span className="font-mono text-emerald-700 font-semibold">Zero-Retention View</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 p-1 rounded font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>AuditEvent Telemetry: OK</span>
                </div>
                <div className="text-[10px] bg-white p-1.5 rounded border border-slate-200 text-slate-600">
                  Full Circle: Birth (TH) → Lao → TH
                </div>
              </div>

              {viewMode === 'architecture' ? (
                <div className="space-y-1 text-[11px] font-mono bg-rose-50/60 p-2 rounded border border-rose-100 text-rose-900">
                  <div>+ HTTPS GET /vhl/manifest</div>
                  <div>+ Decrypted IPS Bundle Payload</div>
                  <div>+ FHIR AuditEvent (Lao Gateway)</div>
                </div>
              ) : (
                <div className="text-xs text-rose-900 bg-rose-50 p-2 rounded border border-rose-100">
                  Completes the cross-border portability loop without data duplication or centralized silos.
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-800 font-medium">
              <span>Inspect Screen S8</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

        {/* Bottom Callout: Technical & Policy Highlights */}
        <div className="mt-8 bg-white border border-clinical-divider rounded-xl p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-clinical-ink flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-dpi-cobalt" />
                <span>WHO DPI-for-Health Core Architectural Principles Demonstrated</span>
              </h4>
              <p className="text-xs text-clinical-steel mt-1">
                Decentralized trust via GDHCN DEV participant keys &bull; Offline-first resilient capture with Open Health Stack &bull; Patient-mediated cross-border sharing via Verifiable Health Links
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenFhirInspector}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-mono font-medium transition flex items-center gap-2"
              >
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <span>Open FHIR & CBOR Inspector</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
