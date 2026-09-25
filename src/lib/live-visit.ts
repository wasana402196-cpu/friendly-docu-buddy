/**
 * Single source of truth for the live visit / queue demo.
 * Privacy: the public board never shows patient names or visit reasons —
 * only token labels and a status (MYCLINIC_FRONTEND §7).
 */

export const MINUTES_PER_PATIENT = 6;

export type QueueEntry = {
  token: string;
  /** "You" for the viewer; everyone else is anonymous */
  name: string;
  /** privacy-safe status text */
  reason: string;
};

export const LIVE_VISIT = {
  doctor: "Dr. Sana Mirza (demo)",
  specialty: "Family dentist",
  clinic: "Crescent & Pearl Dental",
  room: "Chair 2",
  token: "A-24",
  date: "Today",
  time: "4:30 PM",
  reason: "Scaling and polishing",
  aheadOfYou: 3,
} as const;

export const QUEUE_POSITION = LIVE_VISIT.aheadOfYou + 1;

export function waitMinutes(ahead: number) {
  return Math.max(2, ahead * MINUTES_PER_PATIENT);
}

export function leaveHomeInMinutes(ahead: number) {
  return Math.max(0, waitMinutes(ahead) - 14);
}

export const QUEUE_BOARD: QueueEntry[] = [
  { token: "A-21", name: "Patient", reason: "In treatment" },
  { token: "A-22", name: "Patient", reason: "Called" },
  { token: "A-23", name: "Patient", reason: "Waiting" },
  { token: LIVE_VISIT.token, name: "You", reason: "Checked in" },
  { token: "A-25", name: "Patient", reason: "Waiting" },
  { token: "A-26", name: "Patient", reason: "Checked in" },
];

export function formatFee(rupees: number) {
  return `PKR ${rupees.toLocaleString("en-PK")}`;
}
