import React from 'react';
import { ScreenId } from '../../types';
import { PATIENT_DATA, GDHCN_DEV_KEY } from '../../data/storylineData';
import { 
  BookOpen, 
  HelpCircle, 
  ShieldCheck, 
  Globe2, 
  ExternalLink, 
  ArrowRight, 
  Users, 
  Smartphone, 
  Database,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface WorkshopGuideProps {
  onNavigateToScreen: (screenId: ScreenId) => void;
}

export const WorkshopGuide: React.FC<WorkshopGuideProps> = ({ onNavigateToScreen }) => {
  return (
    <div className="w-full bg-clinical-alabaster min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-[1200px] mx-auto space-y-6">
        
        {/* Banner */}
        <div className="bg-white rounded-2xl border border-clinical-divider p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sky-700 font-mono text-xs font-bold mb-2">
            <BookOpen className="w-4 h-4" />
            <span>WHO PRE-GDHF WORKSHOP DELEGATE COMPANION</span>
          </div>
          <h2 className="text-xl font-bold text-clinical-ink">
            VaxLink: Cross-Border Digital Immunization Portability & Verification
          </h2>
          <p className="text-xs text-clinical-steel mt-1 max-w-3xl leading-relaxed">
            Prepared for the WHO Pre-Global Digital Health Forum (Pre-GDHF) Technical Working Group. This document guides facilitators and delegates through the 5-stage clinical and technical architecture linking Thailand (Country A) and Lao PDR (Country B).
          </p>
        </div>

        {/* Narrative & Vignette Context */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-clinical-divider p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Users className="w-4 h-4 text-dpi-cobalt" />
              <span>The Sengmany Family</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
              <li>&bull; <strong>Mother:</strong> Khamla Sengmany (26y, Lao citizen)</li>
              <li>&bull; <strong>Father:</strong> Bounmy Sengmany (29y, Lao citizen, phone holder)</li>
              <li>&bull; <strong>Newborn:</strong> Somsack Sengmany (born in Thailand, no Thai CID)</li>
              <li>&bull; <strong>Household ID:</strong> #{PATIENT_DATA.householdId} (Catchment Village 04)</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-clinical-divider p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Globe2 className="w-4 h-4 text-amber-600" />
              <span>Country A: Thailand</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
              <li>&bull; <strong>Role:</strong> Certificate Issuer (Maternity Ward) & Year 1 PoC Viewer</li>
              <li>&bull; <strong>GDHCN DEV Participant:</strong> XXR (Thailand MOPH)</li>
              <li>&bull; <strong>Signing Key:</strong> `{GDHCN_DEV_KEY.kid}` (ES256)</li>
              <li>&bull; <strong>Vaccines:</strong> Hepatitis B & BCG birth doses (WHO PreQual codes)</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-clinical-divider p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Country B: Lao PDR</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
              <li>&bull; <strong>Role:</strong> Home Health System & Sovereign Custodian</li>
              <li>&bull; <strong>Frontline:</strong> Catchment Village 04 CHW (Offline Android SDC)</li>
              <li>&bull; <strong>Verification:</strong> Vientiane District Health Center Nurse</li>
              <li>&bull; <strong>Tech Stack:</strong> Open Health Stack (OHS) &bull; Info Gateway</li>
            </ul>
          </div>
        </div>

        {/* 4 Core Pillars of the Specification */}
        <div className="bg-white rounded-2xl border border-clinical-divider p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-clinical-ink uppercase tracking-wider">
            Key Architectural Pillars Demonstrated in this Application
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>1. Decentralized Public Key Infrastructure (WHO GDHCN)</span>
                <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded">Trust</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Trust lists containing public document signer certificates (DSCs) are cached locally at health facilities. Frontline clinics in Lao PDR independently verify Thai cryptographic signatures without runtime network dependency or querying foreign government servers.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>2. Offline-First Frontline Capture (Open Health Stack)</span>
                <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Resilience</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Rural community health workers register newborns using Structured Data Capture (SDC) forms stored in local SQLite without network connectivity for 28+ days. Scanned certificates are safely flagged as unverified (<code className="font-mono text-amber-800">primarySource: false</code>) until facility validation.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>3. 3-Layer Terminology Adjudication</span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Semantics</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Rather than overwriting or forcing unnatural translation, the system preserves the original WHO PreQual product code issued in Thailand and appends the Lao PDR national schedule code. This enables automated clinical decision support via FHIR <code className="font-mono text-slate-800">PlanDefinition</code> without losing origin provenance.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>4. Verifiable Health Links (VHL) & Zero Data Duplication</span>
                <span className="text-[10px] font-mono bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">Privacy</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Health records remain safely hosted in the citizen's home country (Lao PDR). The family carries a lightweight QR carrying only a signed pointer token and encryption key protected by a 4-digit verbal passcode. Foreign clinicians access the IPS in memory with zero permanent local retention.
              </p>
            </div>

          </div>
        </div>

        {/* Workshop Discussion Questions */}
        <div className="bg-white rounded-2xl border border-clinical-divider p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-dpi-cobalt" />
            <span>Policy & Operational Discussion Prompts for Workshop Breakouts</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900">Q1. Identity Sovereignty & Birth Abroad:</strong>
              <p className="text-slate-600 leading-relaxed">
                How should national immunization information systems (EPI) handle temporary identification numbers for cross-border infants prior to civil registration (CRVS) completion?
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900">Q2. Frontline Offline Trust Demarcation:</strong>
              <p className="text-slate-600 leading-relaxed">
                Why is it critical that offline CHW mobile devices store foreign cards as <code className="font-mono text-amber-700">primarySource: false</code> rather than attempting local authoritative signature validation?
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900">Q3. Cross-Border Terminology Equivalence:</strong>
              <p className="text-slate-600 leading-relaxed">
                When a monovalent vaccine is administered abroad but the home country uses a multivalent pentavalent formulation, how should clinical decision support rules calculate future required doses?
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900">Q4. Cross-Border Telemetry & Real-Time Audit:</strong>
              <p className="text-slate-600 leading-relaxed">
                What legal agreements are needed between member states for point-of-care VHL access to trigger <code className="font-mono text-emerald-700">AuditEvent</code> callbacks to the patient's sovereign health authority?
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
