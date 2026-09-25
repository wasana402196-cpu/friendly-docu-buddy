import { DENTISTS } from "@/lib/clinic-data";

export type Specialization = {
  id: string;
  label: string;
  icon: "tooth" | "stethoscope" | "sparkles" | "baby" | "heart" | "eye";
  tint: "care" | "ember" | "gold";
};

/** Dental service categories shown as quick pills on the homepage. */
export const SPECIALIZATIONS: Specialization[] = [
  { id: "consultation", label: "Check-up", icon: "tooth", tint: "care" },
  { id: "scaling", label: "Cleaning", icon: "sparkles", tint: "gold" },
  { id: "root-canal", label: "Root canal", icon: "stethoscope", tint: "ember" },
  { id: "child-checkup", label: "Children", icon: "baby", tint: "care" },
  { id: "whitening", label: "Whitening", icon: "heart", tint: "ember" },
  { id: "braces", label: "Braces & aligners", icon: "eye", tint: "gold" },
];

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  languages: string;
  next: string;
  experience: string;
  bio: string;
  tags: string[];
  photo: string;
};

export const DOCTORS: Doctor[] = DENTISTS.map((d) => ({
  id: d.id,
  name: d.name,
  specialty: d.specialty,
  clinic: "Demo profile · Crescent & Pearl",
  languages: d.languages.join(", "),
  next: d.next,
  experience: "Placeholder",
  bio: d.bio,
  tags: d.focus,
  photo: d.photo,
}));
