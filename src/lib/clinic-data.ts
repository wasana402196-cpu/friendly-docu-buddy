import doc1 from "@/assets/doc-1.jpg";
import doc2 from "@/assets/doc-2.jpg";
import doc3 from "@/assets/doc-3.jpg";
import doc4 from "@/assets/doc-4.jpg";

/**
 * Crescent & Pearl Dental — synthetic demo content (MYCLINIC_FRONTEND.md).
 * Every value here is fictional and must be approved by the real clinic owner
 * before publication. Nothing here is an offer, quote or medical advice.
 */

export const CLINIC = {
  name: "Crescent & Pearl Dental",
  short: "Crescent & Pearl",
  promise: "Comfortable, transparent dental care for the whole family.",
  city: "Karachi (demo location)",
  phone: "+92 300 000 0000 (demo)",
  whatsapp: "wa.example/crescentpearl",
  email: "hello@crescentpearl.example",
  address: "Demo address — 12 Example Lane, Karachi",
  hours: [
    ["Mon – Thu", "10:00 – 20:00"],
    ["Friday", "15:00 – 21:00"],
    ["Saturday", "10:00 – 18:00"],
    ["Sunday", "Closed"],
  ] as const,
  nextAvailable: "Today, 4:30 PM",
};

export type ToothRegion = "front" | "molar" | "all" | "gum";

export type Service = {
  id: string;
  name: string;
  category: "Check-ups" | "Treatment" | "Surgery" | "Cosmetic" | "Orthodontics" | "Children" | "Urgent";
  purpose: string;
  duration: string;
  rate: number;
  from: boolean;
  consultRequired: boolean;
  region: ToothRegion;
};

export const SERVICES: Service[] = [
  { id: "consultation", name: "Dental consultation", category: "Check-ups", purpose: "A full look at your teeth and gums, and a clear plan if anything needs care.", duration: "30 min", rate: 1500, from: false, consultRequired: false, region: "all" },
  { id: "scaling", name: "Scaling and polishing", category: "Check-ups", purpose: "Removes tartar and stains so gums stay healthy and teeth feel smooth.", duration: "45–60 min", rate: 5500, from: true, consultRequired: false, region: "gum" },
  { id: "filling", name: "Tooth-coloured filling", category: "Treatment", purpose: "Repairs a cavity with a filling that matches your natural tooth.", duration: "45 min", rate: 4500, from: true, consultRequired: true, region: "molar" },
  { id: "extraction", name: "Simple extraction", category: "Surgery", purpose: "Gentle removal of a tooth that cannot be saved.", duration: "30–45 min", rate: 4500, from: true, consultRequired: true, region: "molar" },
  { id: "surgical-extraction", name: "Surgical extraction", category: "Surgery", purpose: "For impacted or broken teeth, including wisdom teeth.", duration: "60 min", rate: 18000, from: true, consultRequired: true, region: "molar" },
  { id: "root-canal", name: "Root canal treatment", category: "Treatment", purpose: "Saves an infected tooth by cleaning and sealing its root.", duration: "60–90 min / stage", rate: 18000, from: true, consultRequired: true, region: "molar" },
  { id: "crown", name: "Porcelain crown", category: "Cosmetic", purpose: "A natural-looking cap that protects a weak or treated tooth.", duration: "2 visits", rate: 28000, from: true, consultRequired: true, region: "front" },
  { id: "whitening", name: "Teeth whitening", category: "Cosmetic", purpose: "Brightens your smile safely under dentist supervision.", duration: "60–90 min", rate: 24000, from: true, consultRequired: true, region: "front" },
  { id: "braces", name: "Braces consultation", category: "Orthodontics", purpose: "Find out if braces suit you and what the journey looks like.", duration: "30 min", rate: 2000, from: false, consultRequired: false, region: "front" },
  { id: "aligners", name: "Clear-aligner assessment", category: "Orthodontics", purpose: "Check whether near-invisible aligners can straighten your teeth.", duration: "45 min", rate: 3000, from: false, consultRequired: false, region: "front" },
  { id: "child-checkup", name: "Child dental check-up", category: "Children", purpose: "A calm, friendly visit that builds good habits early.", duration: "30 min", rate: 1200, from: false, consultRequired: false, region: "all" },
  { id: "emergency", name: "Dental emergency assessment", category: "Urgent", purpose: "Fast assessment for pain, a broken tooth or swelling.", duration: "30 min", rate: 2000, from: false, consultRequired: false, region: "all" },
];

export const SERVICE_CATEGORIES = Array.from(new Set(SERVICES.map((s) => s.category)));

export function pkr(n: number) {
  return `PKR ${n.toLocaleString("en-PK")}`;
}

export function priceLabel(s: Service) {
  return s.from ? `From ${pkr(s.rate)}` : pkr(s.rate);
}

export type Dentist = {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  focus: string[];
  next: string;
  experience: string;
  bio: string;
  photo: string;
  serviceIds: string[];
};

export const DENTISTS: Dentist[] = [
  { id: "sana", name: "Dr. Sana Mirza", specialty: "Family dentist", languages: ["English", "Urdu"], focus: ["Check-ups", "Fillings", "Children"], next: "Today 4:30 PM", experience: "Credentials: placeholder", bio: "Calm, unhurried family visits — explains every step before starting.", photo: doc1, serviceIds: ["consultation", "scaling", "filling", "child-checkup", "emergency"] },
  { id: "hamza", name: "Dr. Hamza Qureshi", specialty: "Endodontics (root canal)", languages: ["English", "Urdu", "Punjabi"], focus: ["Root canal", "Crowns", "Pain relief"], next: "Today 6:00 PM", experience: "Credentials: placeholder", bio: "Focused on saving natural teeth with careful, staged treatment.", photo: doc2, serviceIds: ["consultation", "root-canal", "crown", "emergency"] },
  { id: "maryam", name: "Dr. Maryam Siddiqui", specialty: "Orthodontics", languages: ["English", "Urdu"], focus: ["Braces", "Aligners", "Teen smiles"], next: "Tomorrow 11:00 AM", experience: "Credentials: placeholder", bio: "Plans straighter smiles with clear timelines and honest estimates.", photo: doc3, serviceIds: ["consultation", "braces", "aligners", "whitening"] },
  { id: "usman", name: "Dr. Usman Farooq", specialty: "Oral surgery", languages: ["English", "Urdu", "Sindhi"], focus: ["Extractions", "Wisdom teeth", "Implants review"], next: "Tomorrow 9:30 AM", experience: "Credentials: placeholder", bio: "Gentle surgical care with clear aftercare and follow-up checks.", photo: doc4, serviceIds: ["consultation", "extraction", "surgical-extraction", "emergency"] },
];

export const TRUST = [
  { title: "Itemized treatment plans", body: "Every stage and estimate written down before we begin." },
  { title: "Sterilization you can see", body: "Instruments cleaned, sealed and opened in front of you." },
  { title: "Family appointments", body: "Book children and parents together, with guardian support." },
  { title: "Dentist-reviewed records", body: "Your dentist reviews and signs every clinical entry." },
];

export const JOURNEY = [
  { step: "Book", body: "Pick a treatment, dentist and time that suits you." },
  { step: "Visit", body: "Check in, watch your private queue, sit in the chair on time." },
  { step: "Treatment plan", body: "See each stage, the reason and an itemized estimate." },
  { step: "Follow-up", body: "Aftercare notes and a reminder for your next check-up." },
];

export const STERILIZATION = [
  "Instruments are cleaned and ultrasonically washed after every patient.",
  "They are sealed in pouches and heat-sterilized in an autoclave.",
  "Pouches are opened in front of you, at the chair.",
  "Surfaces are disinfected and barriers replaced between visits.",
];

export const WHAT_TO_BRING = [
  "Your CNIC or a form of ID (guardian ID for children).",
  "A list of medicines you take and any allergies.",
  "Previous X-rays or dental reports, if you have them.",
  "Arrive 10 minutes early for your first visit.",
];

export const PAYMENT_METHODS = ["Cash", "Debit / credit card", "Bank transfer", "Mobile wallet"];

export const FAQ = [
  { q: "Are these prices final?", a: "No. They are indicative demo rates. Your dentist confirms the final cost after examining you, and you approve it before treatment." },
  { q: "Do I need a consultation first?", a: "Some treatments need an examination first — each service shows whether a consultation is required." },
  { q: "Can I book for my child or parent?", a: "Yes. In the booking form choose \"Booking for someone else\" and add your relationship as guardian or family member." },
  { q: "What if I am in severe pain?", a: "Book a dental emergency assessment or call the clinic. For heavy bleeding, facial swelling spreading to the eye or neck, or trouble breathing, go to the nearest hospital emergency department." },
  { q: "Who can see my records?", a: "Only authorized clinic staff involved in your care. Clinical notes are reviewed by your dentist before anything is shared with you." },
  { q: "Can I cancel or reschedule?", a: "Yes, up to 12 hours before your visit from your patient area or by calling the clinic (demo policy)." },
];

/** Demo time slots — visibly synthetic. */
export const DEMO_DAYS = (() => {
  const labels = ["Today", "Tomorrow", "Wed", "Thu", "Fri", "Sat"];
  return labels.map((label, i) => ({
    id: `d${i}`,
    label,
    slots: i === 4 ? [] : ["10:00", "11:30", "13:00", "16:30", "18:00", "19:30"].filter((_, j) => (i + j) % 3 !== 0),
  }));
})();
