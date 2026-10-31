# VaxLink: Cross-Border Digital Immunization Portability & Verification

An interactive walkthrough of a cross-border immunization journey, built for the **WHO Pre-GDHF (Global Digital Health Forum) Workshop**, Bangkok 2026.

**Live site:** [https://fredhersch.github.io/vaxlink/](https://fredhersch.github.io/vaxlink/)

VaxLink follows one baby's vaccination record between **Thailand** and **Lao PDR** over his first year. It shows how three things work together so a record can cross a border and still be trusted, with no shared database between the two countries:

- **WHO GDHCN:** a WHO trust network where countries publish the keys they sign health documents with, so anyone can verify them.
- **Open Health Stack (OHS):** open-source tools for offline-first health apps.
- **IHE Verifiable Health Links (VHL):** family-controlled sharing through a QR code.

The site leads with **people and moments**. The technical layer (standards, tools, FHIR payloads) sits underneath each moment, ready when the room asks *"how does that work?"*

> **Simulation notice:** all people, records, keys and payloads are fictional and for demonstration only. The signing key belongs to a GDHCN **DEV** test participant (`XXR`), not a production key.

---

## 📖 The story

> Somsack is born in Thailand, grows up in Lao PDR, and one year later a Thai doctor can see every vaccine he has ever had, without a single record being copied across the border.

| # | Moment | When | Where | What happens |
|---|---|---|---|---|
| 1 | **Born abroad** | Birth day | Chiang Rai, Thailand | Birth doses given; two signed paper vaccine certificates (QR) issued |
| 2 | **Found at home** | +3 weeks | Village 04, Lao PDR | A health worker registers him offline and records the cards as *reported, not verified* |
| 3 | **Made official** | +4 weeks | District Health Center, Lao PDR | A nurse verifies the signature, then maps the Thai vaccines to the Lao schedule |
| 4 | **Crossing back** | +12 months | Lao PDR → Thailand | Dad shares a passcode-protected link; a Thai doctor views the full history; the access is logged in Lao PDR |

**The cast:** Khamla (mother), Bounmy (father, holds the family phone), Soukanh (community health worker), Nurse Chanthasone (district health center) and Dr. Somchai (Thai clinician).

---

## 🎤 Running a workshop session

The site opens on **User Journeys**. A suggested order:

1. **Overview:** introduce the story in one sentence and the cast.
2. **Walkthrough:** present the eight moments one at a time. For each one, use **Ask the room**, then reveal the **What if…** branch.
3. **Under the hood:** turn it on in the walkthrough (press **T**) when the room wants to know how a moment works.
4. **Persona lens:** use it for discussion, e.g. why Khamla's mood dips when the records live on Bounmy's phone.
5. **How it works:** use it for technical questions. Pick a standard or tool to see every moment that depends on it.
6. **Device screens:** open one from any moment ("See what … sees") to show the real interface. The tamper and wrong-passcode tests live on screens S4 and S8.

**Presenter mode** (top right) shows a facilitator cue for the current moment in the banner and in the walkthrough. Turn it off before sharing your screen if you don't want the cues visible.

### Keyboard shortcuts (Walkthrough)

| Key | Action |
|---|---|
| `→` / `PageDown` | Next moment |
| `←` / `PageUp` | Previous moment |
| `W` | Reveal or hide the "What if…" branch |
| `T` | Show or hide "Under the hood" |

---

## 🧭 What's in the app

### User Journeys (default tab)

| View | Use it to… |
|---|---|
| **Overview** | Tell the story, introduce the four moments and the cast, and show the "Follow the record" trust ladder (on paper → reported → verified → scheduled → portable → shared & audited) |
| **Walkthrough** | Present one moment at a time: who's involved and how they feel, pain point vs. enabler, how the record's trust changes, "Ask the room", "What if…", the facilitator cue and **Under the hood** |
| **Journey map** | See everyone at every moment as a swimlane, with optional rows for pain points, enablers and the technical layer. Focus on one persona to dim the rest |
| **Persona lens** | Follow one person end to end: goals, needs, frustrations, an emotion curve and touchpoints |
| **How it works** | Connect the journey to the architecture: four big ideas and a grid of building blocks against moments, with a detail panel for each standard or tool |

**Under the hood** (per moment) shows:
- a plain-language technical so-what;
- the tools, data standards and trust/exchange pieces in play, and what each does at that moment;
- the data hand-off (and whether it works offline);
- the FHIR resources it changes, with **Inspect JSON** links into the payload drawer.

### Technical deep dives

| Tab | Contents |
|---|---|
| **S0 Storyboard Canvas** | A five-column overview by country for plenary sessions, with clinical and FHIR/GDHCN architecture views |
| **Interactive Device Screens** | Screens S1–S8, simulating each actor's device (see below) |
| **End-to-End Flow & Architecture** | A cross-border swimlane, plus a per-stage deep dive into actors, cryptography, FHIR changes and policy takeaways |
| **FHIR Payloads** | Syntax-highlighted `Patient`, `Group`, `Immunization`, `ServiceRequest`, `Provenance`, `ConceptMap`, `AuditEvent` and raw CBOR/COSE, with copy to clipboard |
| **Workshop Guide** | Architectural pillars and policy discussion questions for delegates |

### Device screens

| Screen | Moment | Country · device | Shows |
|---|---|---|---|
| S1 | J1 | Thailand · tablet | Birth doses with WHO PreQual codes; two printed DVC cards (`HC1:` QR signed with DEV key `916ffa567c0f44a2`) |
| S2 | J2a | Lao PDR · mobile | Offline CHW registration of Somsack into the household `Group` via an SDC questionnaire |
| S3 | J2b | Lao PDR · mobile | Offline QR scan saved as `primarySource: false`, plus a `ServiceRequest` referral |
| S4 | J3a | Lao PDR · tablet | COSE_Sign1 verification against the cached GDHCN trust list, with `Provenance` attached. Includes a **Simulate Tampered QR Card** test |
| S5 | J3b | Lao PDR · tablet | Three-layer `ConceptMap` adjudication to `LAO-EPI-HEPB-BD`, and `PlanDefinition` schedule calculation |
| S6 | J4.0a | Lao PDR · mobile | "One Family, One Phone" wallet; IPS with 6 verified doses |
| S7 | J4.0b | Lao PDR · mobile | VHL QR with a 4-digit passcode (`4829`), 14-day expiry and IHE PCF consent |
| S8 | J4.1 | Thailand · tablet | VHL viewer with passcode unlock and a wrong-passcode test; `AuditEvent` logged in Lao PDR |

---

## 🧱 Standards & building blocks

These are shown in **How it works** and **Under the hood**.

| Layer | Building blocks |
|---|---|
| **Tools & apps** | Thai hospital system + DVC issuing service · [OHS FHIR SDK](https://github.com/google/android-fhir) (multiplatform, offline FHIR engine) · OHS Structured Data Capture library · [OHS FHIR Info Gateway](https://github.com/google/fhir-gateway) (authorization layer) · Lao national FHIR server · [OHS FHIR Data Pipes](https://github.com/google/fhir-data-pipes) (analytics) · family wallet · VHL viewer |
| **Data standards** | [HL7 FHIR R4](https://hl7.org/fhir/R4/) · [WHO SMART Guidelines: Immunizations](https://smart.who.int/immunizations/) (PreQual codes) · [International Patient Summary](https://hl7.org/fhir/uv/ips/) · [FHIR SDC](https://hl7.org/fhir/uv/sdc/) · ConceptMap · PlanDefinition/CQL · Provenance |
| **Trust & exchange** | [WHO Digital Vaccine Certificate / SMART Trust](https://smart.who.int/trust/) (CBOR + COSE signed QR) · [WHO GDHCN](https://www.who.int/initiatives/global-digital-health-certification-network) · [IHE ITI Verifiable Health Links](https://profiles.ihe.net/ITI/VHL/) · [IHE Privacy Consent on FHIR](https://profiles.ihe.net/ITI/PCF/) · AuditEvent ([IHE BALP](https://profiles.ihe.net/ITI/BALP/)) |

---

## ✏️ Editing the content

All narrative and technical content lives in data files, so you can change the story without touching components.

| File | Contains |
|---|---|
| `src/data/journeyData.ts` | Personas, the four chapters and eight moments. Per moment: actions, feelings, pain points, enablers, record state, "Ask the room", "What if…" and facilitator cues |
| `src/data/techData.ts` | Building blocks (tools, standards, trust), the four big ideas' blocks, and each moment's technical layer: so-what, roles, data hand-off and FHIR changes |
| `src/data/storylineData.ts` | Stage metadata for the device screens, patient demographics, the DEV signing key and the sample FHIR/CBOR payloads |

### Project structure

```
src/
├── App.tsx                     # Tabs, shared state, presenter banner
├── data/                       # Content (see above)
├── types/index.ts
└── components/
    ├── userJourneys/           # Overview, Walkthrough, Journey map, Persona lens, How it works, Under the hood
    ├── screens/                # S0 storyboard and S1–S8 device simulations
    ├── journeyFlow/            # End-to-End Flow & Architecture tab
    ├── workshopGuide/          # Workshop Guide tab
    └── common/                 # Header, device frame, QR view, FHIR inspector drawer
```

---

## 🚀 Getting started

### Prerequisites
- Node.js 18 or later (CI uses Node 20)
- npm

### Run locally

```bash
git clone https://github.com/fredhersch/vaxlink.git
cd vaxlink
npm install
npm run dev
```

Then open [http://localhost:5173/](http://localhost:5173/).

### Production build

```bash
npm run build     # type-check + build into dist/
npm run preview   # serve dist/ locally
```

### Deploying to GitHub Pages

Deployment is automatic. Every push to `main`, including merged PRs, runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. To redeploy without a code change, go to **Actions → Deploy to GitHub Pages → Run workflow**.

One-time setup: in **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**.

> The old `npm run deploy` script (which force-pushes `dist/` to the `gh-pages` branch) is no longer used once Pages deploys from Actions. It and the `gh-pages` branch can be removed.

---

## 🛠 Tech stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite 5
- **Styling:** Tailwind CSS (custom clinical design tokens)
- **Icons:** Lucide React
- **QR codes:** `qrcode`
- **Hosting:** GitHub Pages via GitHub Actions

---

## 📜 Credits

- **Author / presenter:** Fred Hersch
- **Audience:** WHO Pre-GDHF Workshop, Bangkok 2026
- **Built on the work of:** WHO (GDHCN, SMART Guidelines), Open Health Stack, HL7 International (FHIR, IPS) and IHE (VHL, PCF, BALP)
