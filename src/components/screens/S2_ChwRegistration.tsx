import React, { useState } from 'react';
import { PATIENT_DATA } from '../../data/storylineData';
import { 
  Users, 
  UserPlus, 
  AlertTriangle, 
  QrCode, 
  WifiOff, 
  Check, 
  Baby, 
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface S2Props {
  onNext: () => void;
  onOpenFhirInspector?: () => void;
}

export const S2_ChwRegistration: React.FC<S2Props> = ({ onNext }) => {
  const [givenName, setGivenName] = useState(PATIENT_DATA.infantName.split(' ')[0]);
  const [familyName, setFamilyName] = useState(PATIENT_DATA.infantName.split(' ')[1]);
  const [dob, setDob] = useState(PATIENT_DATA.infantDob);
  const [gender, setGender] = useState('male');
  const [hasPaperCards, setHasPaperCards] = useState(true);
  const [birthplace, setBirthplace] = useState('abroad');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full bg-clinical-alabaster font-sans">
      {/* 1. Mobile Top Bar */}
      <div className="bg-white border-b border-clinical-divider px-4 py-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-clinical-ink tracking-tight">
              Lao PDR Community Health
            </h2>
            <div className="text-[10px] text-clinical-steel">
              Catchment Village 04 &bull; CHW: Soukanh
            </div>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium">
            <WifiOff className="w-3 h-3 text-amber-600" />
            <span>Offline (28d)</span>
          </div>
        </div>
      </div>

      {/* 2. Hero / Household Summary Card */}
      <div className="p-3">
        <div className="bg-white rounded-xl border border-clinical-divider p-3.5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-clinical-ink">Sengmany Household</h3>
                <span className="font-mono text-[10px] text-clinical-steel">#{PATIENT_DATA.householdId} &bull; FHIR Group</span>
              </div>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono">
              2 Members
            </span>
          </div>

          {/* Existing adults in roster */}
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="font-semibold text-slate-800">{PATIENT_DATA.fatherName}</div>
              <div className="text-[10px] text-slate-500">Father (29y) &bull; Head</div>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="font-semibold text-slate-800">{PATIENT_DATA.motherName}</div>
              <div className="text-[10px] text-slate-500">Mother (26y)</div>
            </div>
          </div>

          {/* Newborn alert banner */}
          <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-2 text-[11px] text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Newborn Reported at Home Visit:</strong>
              <p className="text-[10px] text-amber-800 mt-0.5 leading-tight">
                Infant born abroad in Thailand. Not yet recorded in village civil register or national EPI.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Primary Content Area: SDC Newborn Registration Form */}
      <div className="flex-1 px-3 pb-3 space-y-3 overflow-y-auto">
        <div className="bg-white rounded-xl border border-clinical-divider p-3.5 shadow-sm space-y-3">
          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <Baby className="w-4 h-4 text-dpi-cobalt" />
            <h4 className="font-bold text-xs text-clinical-ink">
              Register Newborn Household Member (SDC)
            </h4>
          </div>

          {/* Names */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-semibold text-clinical-steel uppercase mb-1">
                Given Name
              </label>
              <input
                type="text"
                value={givenName}
                onChange={(e) => setGivenName(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-dpi-cobalt font-medium text-slate-900"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-clinical-steel uppercase mb-1">
                Family Name
              </label>
              <input
                type="text"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-dpi-cobalt font-medium text-slate-900"
                required
              />
            </div>
          </div>

          {/* DOB & Sex */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-semibold text-clinical-steel uppercase mb-1">
                Date of Birth (T0)
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-dpi-cobalt font-mono text-slate-900"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-clinical-steel uppercase mb-1">
                Sex
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-dpi-cobalt font-medium text-slate-900 bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Relationship to Head/Mother */}
          <div>
            <label className="block text-[10px] font-semibold text-clinical-steel uppercase mb-1">
              Household Relationship
            </label>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
              Child of Khamla Sengmany &bull; RelatedPerson
            </div>
          </div>

          {/* Birthplace & Civil Registration */}
          <div>
            <label className="block text-[10px] font-semibold text-clinical-steel uppercase mb-1">
              Birthplace & Identity Status
            </label>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 p-2 rounded-lg border border-sky-200 bg-sky-50/50 cursor-pointer text-xs">
                <input
                  type="radio"
                  name="birthplace"
                  checked={birthplace === 'abroad'}
                  onChange={() => setBirthplace('abroad')}
                  className="text-dpi-cobalt"
                />
                <span className="font-medium text-slate-900">
                  Born Abroad — Thailand [No Lao National ID Yet]
                </span>
              </label>
            </div>
          </div>

          {/* Toggle: Family presented foreign paper card */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
              <div className="pr-2">
                <div className="text-xs font-semibold text-clinical-ink">
                  Family presented foreign paper card(s)
                </div>
                <div className="text-[10px] text-clinical-steel">
                  Two Thai DVC QR certificates (Hep B & BCG)
                </div>
              </div>
              <input
                type="checkbox"
                checked={hasPaperCards}
                onChange={(e) => setHasPaperCards(e.target.checked)}
                className="w-4 h-4 rounded text-dpi-cobalt focus:ring-dpi-cobalt"
              />
            </label>
          </div>
        </div>
      </div>

      {/* 4. Bottom Sticky Action Bar */}
      <div className="bg-white border-t border-clinical-divider p-3 shadow-lg">
        <button
          type="submit"
          className="w-full py-3 px-4 bg-dpi-cobalt hover:bg-dpi-cobalt-dark text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/20 transition flex items-center justify-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          <span>Save Newborn & Scan Paper QR Cards (2)</span>
        </button>
        <p className="text-[10px] text-center text-clinical-steel mt-1.5 font-mono">
          Creates local FHIR Patient & RelatedPerson in offline SQLite store
        </p>
      </div>
    </form>
  );
};
