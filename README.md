# VaxLink: Cross-Border Digital Immunization Portability & Verification

An interactive clinical and technical simulation built for the **WHO Pre-GDHF (Global Digital Health Forum) Workshop Planning Group**.

**Live Demo (GitHub Pages):** [https://fredhersch.github.io/vaxlink/](https://fredhersch.github.io/vaxlink/)

This application illustrates a multi-stage cross-border immunization and continuity of care vignette between **Thailand (Country A)** and **Lao PDR (Country B)**, demonstrating how decentralized public key infrastructure (**WHO GDHCN**), offline-first frontline capture (**Open Health Stack / OHS**), and patient-mediated portability (**IHE ITI Verifiable Health Links / VHL**) work together seamlessly.

---

## 🌟 Key Features

1. **S0: Master End-to-End Storyboard Canvas**
   - 5-column horizontal visual flow (J1 → J4.1)
   - Country lanes: Thailand (Issuer `XXR`) vs Lao PDR (Home Health System)
   - Toggle between **Clinical Journey View** and **FHIR & GDHCN Architecture View**
   - Interactive timeline scrubber: `T0` (Birth) → `T0+3w` (CHW Home Visit) → `T0+4w` (Health Center) → `T0+12m` (Travel)

2. **S1–S8: Interactive Device Simulations**
   - **S1 (J1 — Thailand, Tablet):** Newborn delivery, Hepatitis B & BCG birth doses with WHO PreQual codes, and 2 printed paper Digital Vaccine Certificate (DVC) wallet cards (Version 16 QR, `HC1:` payload signed by Thailand MOPH DEV key `916ffa567c0f44a2`).
   - **S2 (J2a — Lao PDR, Mobile):** Offline Catchment Village 04 CHW registering newborn Somsack into the Sengmany household `Group` using a Structured Data Capture (SDC) questionnaire.
   - **S3 (J2b — Lao PDR, Mobile):** Offline QR scan decoding card metadata as unverified foreign records (`primarySource: false`) and queuing a `ServiceRequest` clinic referral.
   - **S4 (J3a — Lao PDR, Tablet):** Clinic camera scanner verifying cryptographic COSE_Sign1 signature against cached GDHCN DEV trust list, attaching `FHIR Provenance`, upgrading to `primarySource: true`, with an interactive **"Simulate Tampered QR Card"** test toggle.
   - **S5 (J3b — Lao PDR, Tablet):** 3-layer `ConceptMap` adjudication (PreQual code → WHO IG class → Lao schedule ValueSet), clinician equivalence confirmation (`LAO-EPI-HEPB-BD`), and `PlanDefinition` infant schedule calculation.
   - **S6 (J4.0a — Lao PDR, Mobile):** "One Family, One Phone" multi-member wallet (Father Bounmy, Mother Khamla, Baby Somsack 12m) consolidating 6 verified doses in an International Patient Summary (`FHIR Bundle [IPS]`).
   - **S7 (J4.0b — Lao PDR, Mobile):** Passcode-protected Verifiable Health Link (VHL) QR generation with 4-digit verbal passcode (`4829`), 14-day expiry countdown, and `IHE PCF` consent badge.
   - **S8 (J4.1 — Thailand, Tablet):** Point-of-care VHL viewer where Thai clinician unlocks IPS using verbal passcode (with wrong-passcode simulation test), and triggers a real-time `AuditEvent` logged back at the Lao OHS Info Gateway.

3. **Interactive End-to-End Flow & Architecture Page**
   - Cross-border swimlane architecture (Thailand ⇄ Transit ⇄ Lao PDR ⇄ WHO GDHCN).
   - Step-by-step deep dive exploring actors, software configurations, cryptographic operations, FHIR R4 mutations, data pipelines, and policy takeaways.

4. **FHIR R4 & GDHCN Developer Drawer**
   - Syntax-highlighted payloads for `Patient`, `Group`, `Immunization`, `ServiceRequest`, `Provenance`, `ConceptMap`, `AuditEvent`, and raw CBOR/COSE headers with 1-click clipboard copy.

5. **Workshop Companion & Delegate Discussion Guide**
   - Core architectural pillars (Decentralized PKI, Offline Resilience, 3-Layer Terminology, Verifiable Health Links) and policy questions for WHO Pre-GDHF delegates.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Running Locally

```bash
# Clone the repository
git clone https://github.com/fredhersch/vaxlink.git
cd vaxlink

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🛠 Tech Stack

- **Framework:** React 18 with TypeScript
- **Bundler & Build Tool:** Vite
- **Styling:** Tailwind CSS (WHO DPI / Clinical Design System tokens)
- **Icons:** Lucide React
- **QR Generation:** `qrcode` (real high-density Version 16 QR codes with 16px quiet zone)

---

## 📜 Credits & Vignette Context

- **Author / Presenter:** Fred Hersch
- **Audience:** WHO Pre-GDHF Workshop Planning Group
- **Key References:**
  - WHO Digital Public Infrastructure (DPI) for Health
  - Global Digital Health Certification Network (GDHCN)
  - Open Health Stack (OHS)
  - HL7 FHIR R4 / International Patient Summary (IPS)
  - IHE ITI Verifiable Health Links (VHL) & IHE PCF
