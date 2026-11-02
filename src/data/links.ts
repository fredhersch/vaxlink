/**
 * Where to read more. The journey is documented as a WHO SMART Guidelines L2
 * DAK and L3 FHIR implementation guide in litlfred/smart-trust-demo; the
 * standards are linked lightly, one click from the moment that uses them.
 */

export const IG = {
  site: 'https://litlfred.github.io/smart-trust-demo/',
  repo: 'https://github.com/litlfred/smart-trust-demo',
  journeys: 'https://litlfred.github.io/smart-trust-demo/journeys.html',
  personas: 'https://litlfred.github.io/smart-trust-demo/personas.html',
  processes: 'https://litlfred.github.io/smart-trust-demo/business-processes.html',
  examples: 'https://litlfred.github.io/smart-trust-demo/vaxlink-examples.html',
  /** The page of one IG example, e.g. igExample('ConceptMap', 'TrustDemoProductToLaoEpi'). */
  example: (type: string, id: string) => `https://litlfred.github.io/smart-trust-demo/artifact/${type}-${id}.html`,
};

/** The WHO draft architecture whose DPI-H building blocks the architecture view uses. */
export const DPI_H_RA = 'https://litlfred.github.io/smart-ra/en/dpi-h-ra/index.html';

export const SPEC = {
  fhir: 'https://hl7.org/fhir/',
  fhirR4: 'https://hl7.org/fhir/R4/',
  conceptMap: 'https://hl7.org/fhir/conceptmap.html',
  valueSet: 'https://hl7.org/fhir/valueset.html',
  planDefinition: 'https://hl7.org/fhir/plandefinition.html',
  cql: 'https://cql.hl7.org/',
  provenance: 'https://hl7.org/fhir/provenance.html',
  questionnaire: 'https://hl7.org/fhir/questionnaire.html',
  group: 'https://hl7.org/fhir/group.html',
  immunization: 'https://hl7.org/fhir/immunization.html',
  serviceRequest: 'https://hl7.org/fhir/servicerequest.html',
  consent: 'https://hl7.org/fhir/consent.html',
  auditEvent: 'https://hl7.org/fhir/auditevent.html',
  sdc: 'https://hl7.org/fhir/uv/sdc/',
  ips: 'https://hl7.org/fhir/uv/ips/',
  smartImm: 'https://smart.who.int/immunizations/',
  trust: 'https://smart.who.int/trust/',
  hcertQr: 'https://smart.who.int/trust/qr_code_generation.html',
  gdhcn: 'https://www.who.int/initiatives/global-digital-health-certification-network',
  vhl: 'https://profiles.ihe.net/ITI/VHL/',
  pcf: 'https://profiles.ihe.net/ITI/PCF/',
  balp: 'https://profiles.ihe.net/ITI/BALP/',
  ohsSdk: 'https://github.com/google/android-fhir',
  ohsGateway: 'https://github.com/google/fhir-gateway',
  ohsPipes: 'https://github.com/google/fhir-data-pipes',
};

/** The IG's business process (BPMN) for each moment, drawn as SVG in public/bpmn/. */
export const BPMN_FOR_STAGE: Record<string, { file: string; title: string }> = {
  J1: { file: 'j1-birth-dose-dvc', title: 'J1 Issue the newborn’s birth-dose DVCs' },
  J2a: { file: 'j2-chw-discovery-referral', title: 'J2 Discover and refer an unregistered infant' },
  J2b: { file: 'j2-chw-discovery-referral', title: 'J2 Discover and refer an unregistered infant' },
  J3a: { file: 'j3-clinic-verification-schedule', title: 'J3 Verify, import and schedule at the home clinic' },
  J3b: { file: 'j3-clinic-verification-schedule', title: 'J3 Verify, import and schedule at the home clinic' },
  'J4.0a': { file: 'j4-0-family-vhl-issuance', title: 'J4.0 Issue the family’s records to one phone as VHLs' },
  'J4.0b': { file: 'j4-0-family-vhl-issuance', title: 'J4.0 Issue the family’s records to one phone as VHLs' },
  'J4.1': { file: 'j4-1-vhl-point-of-care', title: 'J4.1 Read a family member’s records at the point of care' },
};

export const BPMN_PROCESSES = Array.from(
  new Map(Object.entries(BPMN_FOR_STAGE).map(([stage, p]) => [p.file, { ...p, stages: [] as string[] }])).values(),
).map((p) => ({ ...p, stages: Object.entries(BPMN_FOR_STAGE).filter(([, q]) => q.file === p.file).map(([s]) => s) }));

/** BPMN SVG served with the site (base-relative, so it works under any Pages path). */
export const bpmnSvg = (file: string) => `${import.meta.env.BASE_URL}bpmn/${file}.svg`;
