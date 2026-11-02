import React from 'react';
import { ArrowLeftRight, Globe2, KeyRound, ShieldCheck } from 'lucide-react';
import { DPI_H_RA, IG, SPEC } from '../../data/links';
import { ExtLink, countryChip } from './shared';

/**
 * The Thai and Lao components of the demo, drawn on the minimal DPI-H building
 * blocks of the WHO digital public infrastructure for health reference
 * architecture (DPI-H RA). Trust between the two countries runs through
 * WHO GDHCN; data moves only as a signed QR (DVC) or a Verifiable Health Link.
 */

type Comp = { block: string; name: string; stages: string; href?: string };
type Side = { country: 'Thailand' | 'Lao PDR'; title: string; pos: Comp[]; interop: Comp[]; shared: Comp[] };

const THAI: Side = {
  country: 'Thailand',
  title: 'Thailand (Chiang Rai)',
  pos: [
    { block: 'Point-of-service app', name: 'Provincial hospital EHR', stages: 'J1', href: IG.personas },
    { block: 'Point-of-service app', name: 'Clinic VHL viewer', stages: 'J4.1', href: SPEC.vhl },
  ],
  interop: [{ block: 'Trust service', name: 'DVC signer (HCERT, COSE ES256)', stages: 'J1', href: SPEC.trust }],
  shared: [
    { block: 'Lifelong health record', name: 'Hospital immunization record', stages: 'J1' },
    { block: 'Product registry', name: 'WHO PreQual vaccine product codes', stages: 'J1', href: SPEC.smartImm },
  ],
};

const LAO: Side = {
  country: 'Lao PDR',
  title: 'Lao PDR',
  pos: [
    { block: 'Point-of-service app', name: 'CHW app (OHS FHIR SDK + SDC forms)', stages: 'J2', href: SPEC.ohsSdk },
    { block: 'Point-of-service app', name: 'District health centre EHR', stages: 'J3' },
    { block: 'Point-of-service app', name: 'Family wallet', stages: 'J4.0' },
  ],
  interop: [
    { block: 'Interoperability layer', name: 'OHS Info Gateway', stages: 'J2–J4', href: SPEC.ohsGateway },
    { block: 'Trust service', name: 'DVC verifier + VHL issuer (passcode, expiry)', stages: 'J3, J4', href: SPEC.vhl },
  ],
  shared: [
    { block: 'Client registry', name: 'Patient + household Group', stages: 'J2', href: SPEC.group },
    { block: 'Health facility registry', name: 'Clinics and health centres', stages: 'J2, J3' },
    { block: 'Health workforce registry', name: 'CHWs and vaccinators', stages: 'J2, J3' },
    { block: 'Lifelong health record', name: 'National FHIR server (portal)', stages: 'J3, J4', href: SPEC.immunization },
    { block: 'Terminology service', name: 'ConceptMap: product → Lao EPI code', stages: 'J3', href: SPEC.conceptMap },
    { block: 'Decision support engine', name: 'PlanDefinition: infant schedule', stages: 'J3', href: SPEC.planDefinition },
    { block: 'Audit', name: 'BALP AuditEvent on each access', stages: 'J4.1', href: SPEC.balp },
    { block: 'HMIS', name: 'OHS FHIR Data Pipes analytics', stages: 'J3', href: SPEC.ohsPipes },
  ],
};

const Box: React.FC<{ c: Comp }> = ({ c }) => (
  <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5">
    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{c.block}</div>
    <div className="text-xs font-semibold text-slate-900 leading-snug">
      {c.href ? <ExtLink href={c.href}>{c.name}</ExtLink> : c.name}
    </div>
    <div className="text-[10px] font-mono text-slate-500">{c.stages}</div>
  </div>
);

const Band: React.FC<{ label: string; comps: Comp[]; tone: string }> = ({ label, comps, tone }) => (
  <div className={`rounded-xl border p-2 space-y-1.5 ${tone}`}>
    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{label}</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
      {comps.map((c) => (
        <Box key={c.name} c={c} />
      ))}
    </div>
  </div>
);

const Country: React.FC<{ side: Side }> = ({ side }) => (
  <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-3 space-y-2">
    <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${countryChip(side.country)}`}>{side.country === 'Thailand' ? 'TH' : 'LA'}</span> {side.title}
    </div>
    <Band label="Point-of-service apps" comps={side.pos} tone="bg-teal-50/60 border-teal-200" />
    <Band label="Interoperability and trust" comps={side.interop} tone="bg-indigo-50/60 border-indigo-200" />
    <Band label="Shared registries and services" comps={side.shared} tone="bg-sky-50/60 border-sky-200" />
  </div>
);

export const ArchitectureDiagram: React.FC = () => (
  <section className="bg-white rounded-2xl border border-clinical-divider shadow-sm p-4 md:p-5 space-y-3">
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h3 className="text-base font-bold text-clinical-ink">Architecture: the Thai and Lao components</h3>
      <span className="text-xs text-clinical-steel">
        Drawn on the minimal building blocks of the <ExtLink href={DPI_H_RA}>WHO DPI-H reference architecture</ExtLink>.
        Codes under each box are the journey moments that use it.
      </span>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px_1fr] gap-3 items-stretch">
      <Country side={THAI} />

      <div className="flex flex-col justify-center gap-3">
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-3 text-center space-y-1">
          <Globe2 className="w-6 h-6 text-amber-600 mx-auto" />
          <div className="text-sm font-bold text-slate-900">
            <ExtLink href={SPEC.gdhcn}>WHO GDHCN</ExtLink>
          </div>
          <div className="text-[11px] text-slate-700 leading-snug">Trust list of participants’ public keys</div>
        </div>
        <ul className="text-[11px] text-slate-700 space-y-1.5">
          <li className="flex gap-1.5"><KeyRound className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" /> Thailand publishes its signing key</li>
          <li className="flex gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" /> Lao apps download the list and verify offline</li>
          <li className="flex gap-1.5"><ArrowLeftRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" /> <span>Data crosses only as a signed QR (<ExtLink href={SPEC.hcertQr}>DVC</ExtLink>) carried by the family, or a <ExtLink href={SPEC.vhl}>VHL</ExtLink> the family shares</span></li>
        </ul>
      </div>

      <Country side={LAO} />
    </div>

    <p className="text-[11px] text-slate-500">
      The same components, data and processes are specified as a FHIR implementation guide:{' '}
      <ExtLink href={IG.site}>litlfred.github.io/smart-trust-demo</ExtLink> (source{' '}
      <ExtLink href={IG.repo}>github.com/litlfred/smart-trust-demo</ExtLink>).
    </p>
  </section>
);
