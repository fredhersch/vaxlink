// Copy the FHIR examples this walkthrough shows from the SMART Trust
// demonstrator IG (litlfred/smart-trust-demo), where the VaxLink journey is
// documented as a DAK and IG, into src/data/ig/. The snapshot is committed,
// so the site builds offline; rerun to refresh it.
//
//   node scripts/sync-ig-examples.mjs [base-url]
//
// The default base is the IG's published site; a staging preview works too.
import { mkdir, writeFile } from 'node:fs/promises';

const base = (process.argv[2] ?? 'https://litlfred.github.io/smart-trust-demo/').replace(/\/?$/, '/');
const examples = [
  'Patient-TrustDemoSomsack',
  'Group-TrustDemoHousehold',
  'Immunization-TrustDemoJ3HepB',
  'ServiceRequest-TrustDemoJ2Referral',
  'Provenance-TrustDemoJ3Verification',
  'AuditEvent-TrustDemoJ41Access',
  'ConceptMap-TrustDemoProductToLaoEpi',
];

await mkdir(new URL('../src/data/ig/', import.meta.url), { recursive: true });
for (const name of examples) {
  const res = await fetch(`${base}${name}.json`);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status} from ${base}`);
  const json = await res.json();
  await writeFile(new URL(`../src/data/ig/${name}.json`, import.meta.url), JSON.stringify(json, null, 2) + '\n');
  console.log(`synced ${name}`);
}
