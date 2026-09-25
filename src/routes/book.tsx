import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { z } from "zod";
import { AlertTriangle, ArrowLeft, ArrowRight, CalendarX, Check, Loader2 } from "lucide-react";
import { DemoBadge, PageShell } from "@/components/caddy/PageShell";
import { ToothRegionIcon } from "@/components/clinic/ToothRegionIcon";
import { CLINIC, DEMO_DAYS, DENTISTS, SERVICES, priceLabel } from "@/lib/clinic-data";

const searchSchema = z.object({
  service: z.string().optional(),
  dentist: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Book an appointment — Crescent & Pearl Dental" },
      { name: "description", content: "Book a dental visit in five short steps: treatment, dentist, time, your details and review." },
      { property: "og:title", content: "Book an appointment — Crescent & Pearl Dental" },
      { property: "og:description", content: "Choose treatment, dentist and a time that suits you." },
    ],
  }),
  component: BookPage,
});

const STEPS = ["Treatment", "Dentist", "Date & time", "Your details", "Review"];
const UNSURE = "unsure";

type Details = {
  name: string;
  phone: string;
  contact: "WhatsApp" | "Call" | "SMS";
  patientType: "new" | "returning";
  forWhom: "self" | "dependent";
  relationship: string;
  reason: string;
  consent: boolean;
};

function BookPage() {
  const search = Route.useSearch();
  const initialDentist = DENTISTS.find((d) => d.id === search.dentist)?.id ?? "";
  const initialService = SERVICES.find((s) => s.id === search.service)?.id ?? "";
  const [step, setStep] = useState(initialService ? 1 : 0);
  const [dir, setDir] = useState(1);
  const [service, setService] = useState(initialService);
  const [dentist, setDentist] = useState(initialDentist || "first");
  const [day, setDay] = useState(DEMO_DAYS[0]!.id);
  const [slot, setSlot] = useState("");
  const [d, setD] = useState<Details>({ name: "", phone: "", contact: "WhatsApp", patientType: "new", forWhom: "self", relationship: "", reason: "", consent: false });
  const [policy, setPolicy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "cancelled">("idle");
  const [ref, setRef] = useState("");
  const confirmed = useRef<Set<string>>(new Set());

  const svc = SERVICES.find((s) => s.id === service);
  const dayObj = DEMO_DAYS.find((x) => x.id === day)!;
  const dentists = useMemo(
    () => (svc ? DENTISTS.filter((x) => x.serviceIds.includes(svc.id)) : DENTISTS),
    [svc],
  );
  const dentistObj = DENTISTS.find((x) => x.id === dentist);
  const dupKey = `${d.phone.replace(/\D/g, "")}|${day}|${slot}`;
  const duplicate = confirmed.current.has(dupKey);

  function validate(s: number) {
    const e: Partial<Record<"service" | "slot" | "name" | "phone" | "relationship" | "reason" | "consent" | "policy", string>> = {};
    if (s === 0 && !service) e.service = "Choose a treatment, or “I am not sure”.";
    if (s === 2 && !slot) e.slot = "Pick a time to continue.";
    if (s === 3) {
      if (d.name.trim().length < 2) e.name = "Enter the patient's full name.";
      if (!/^(\+92|0)3\d{9}$/.test(d.phone.replace(/[\s-]/g, ""))) e.phone = "Use a Pakistani mobile number, e.g. 0300 1234567.";
      if (d.forWhom === "dependent" && !d.relationship.trim()) e.relationship = "Tell us your relationship to the patient.";
      if (d.reason.length > 200) e.reason = "Keep the reason under 200 characters.";
      if (!d.consent) e.consent = "Please allow us to contact you about this appointment.";
    }
    if (s === 4 && !policy) e.policy = "Please accept the booking policy.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function go(n: number) {
    if (n > step && !validate(step)) return;
    setErrors({});
    setDir(n > step ? 1 : -1);
    setStep(n);
  }

  async function submit() {
    if (status === "submitting" || !validate(4)) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 900));
    confirmed.current.add(dupKey);
    setRef(`CP-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
    setStatus("done");
  }

  function restart() {
    setStatus("idle");
    setStep(0);
    setService("");
    setSlot("");
    setPolicy(false);
  }

  const field = "field-glass mt-1 min-h-11 w-full rounded-2xl px-4 text-sm";
  const err = (k: string) => errors[k] && <p role="alert" className="mt-1 text-xs font-bold text-destructive">{errors[k]}</p>;

  if (status === "done" || status === "cancelled") {
    return (
      <PageShell urgent={false}>
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-pane mx-auto mt-12 max-w-lg rounded-4xl p-8 text-center">
          {status === "done" ? (
            <>
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 16 }} className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
                <svg viewBox="0 0 24 24" className="size-8" fill="none" aria-hidden>
                  <motion.path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.25, duration: 0.45 }} />
                </svg>
              </motion.span>
              <h1 className="mt-4 text-3xl font-extrabold">Request received</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {svc?.name ?? "Consultation"} with {dentistObj?.name ?? "first available dentist"} · {dayObj.label} {slot}
              </p>
              <p className="mt-4 font-hero text-3xl tracking-wider">{ref}</p>
              <p className="text-xs text-muted-foreground">Your booking reference — use it to check your queue status.</p>
              <div className="mt-2"><DemoBadge>Demo — not saved, no message sent</DemoBadge></div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/queue" className="btn-3d rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground">Check queue status</Link>
                <button onClick={() => setStatus("cancelled")} className="glass-card min-h-11 rounded-full px-5 text-sm font-bold">Cancel booking</button>
              </div>
            </>
          ) : (
            <>
              <CalendarX aria-hidden className="mx-auto size-12 text-accent" />
              <h1 className="mt-3 text-2xl font-extrabold">Booking {ref} cancelled</h1>
              <p className="mt-2 text-sm text-muted-foreground">The time is released. You can book again whenever you like.</p>
              <button onClick={restart} className="btn-3d mt-6 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground">Book again</button>
            </>
          )}
        </motion.section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl pt-10">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Book at {CLINIC.short}</h1>
          <DemoBadge>Demo booking</DemoBadge>
        </div>

        {/* progress */}
        <ol className="mt-6 grid grid-cols-5 gap-2" aria-label="Booking progress">
          {STEPS.map((s, i) => (
            <li key={s}>
              <button type="button" disabled={i > step} onClick={() => go(i)} className="w-full text-left disabled:cursor-not-allowed" aria-current={i === step ? "step" : undefined}>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <motion.div className="h-full rounded-full bg-primary" initial={false} animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }} transition={{ type: "spring", stiffness: 140, damping: 20 }} />
                </div>
                <p className={`mt-1.5 hidden text-xs font-bold sm:block ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
                  {i < step && <Check aria-hidden className="mr-0.5 inline size-3 text-primary" />}{s}
                </p>
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-sm font-bold sm:hidden">Step {step + 1} of 5 · {STEPS[step]}</p>

        <div className="glass-pane relative mt-6 overflow-hidden rounded-4xl p-5 sm:p-7">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.22 }}
            >
              {step === 0 && (
                <fieldset>
                  <legend className="text-xl font-extrabold">What would you like to book?</legend>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {[...SERVICES, { id: UNSURE, name: "I am not sure", duration: "30 min", region: "all" as const }].map((s) => {
                      const on = service === s.id;
                      return (
                        <motion.label key={s.id} whileHover="hover" whileTap={{ scale: 0.98 }} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border-2 p-3 ${on ? "border-primary bg-primary/10" : "border-transparent bg-card/70"}`}>
                          <input type="radio" name="service" className="sr-only" checked={on} onChange={() => setService(s.id)} />
                          <ToothRegionIcon region={s.region} />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-extrabold">{s.name}</span>
                            <span className="block text-xs text-muted-foreground">{"rate" in s ? `${s.duration} · ${priceLabel(s)}` : "We'll start with a consultation"}</span>
                          </span>
                          {on && <Check aria-hidden className="size-4 text-primary" />}
                        </motion.label>
                      );
                    })}
                  </div>
                  {err("service")}
                  {service === "emergency" && (
                    <p className="mt-4 flex gap-2 rounded-2xl bg-accent/15 p-3 text-sm font-semibold text-accent-foreground">
                      <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" />
                      We&apos;ll see you as soon as possible. If swelling spreads to your eye or neck, bleeding won&apos;t stop, or breathing is difficult, go to the nearest hospital emergency now.
                    </p>
                  )}
                </fieldset>
              )}

              {step === 1 && (
                <fieldset>
                  <legend className="text-xl font-extrabold">Choose your dentist</legend>
                  <div className="mt-4 grid gap-2">
                    {[{ id: "first", name: "First available", specialty: "Fastest option", next: CLINIC.nextAvailable, photo: "" }, ...dentists].map((x) => {
                      const on = dentist === x.id;
                      return (
                        <label key={x.id} className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border-2 p-3 ${on ? "border-primary bg-primary/10" : "border-transparent bg-card/70"}`}>
                          <input type="radio" name="dentist" className="sr-only" checked={on} onChange={() => setDentist(x.id)} />
                          {x.photo ? <img src={x.photo} alt="" className="size-11 rounded-xl object-cover" /> : <span className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary font-extrabold">1st</span>}
                          <span className="flex-1">
                            <span className="block font-extrabold">{x.name}</span>
                            <span className="block text-xs text-muted-foreground">{x.specialty} · next {x.next}</span>
                          </span>
                          {on && <Check aria-hidden className="size-4 text-primary" />}
                        </label>
                      );
                    })}
                  </div>
                  {svc && <p className="mt-3 text-xs text-muted-foreground">Showing dentists who offer {svc.name.toLowerCase()}.</p>}
                </fieldset>
              )}

              {step === 2 && (
                <fieldset>
                  <legend className="text-xl font-extrabold">Pick a date and time</legend>
                  <p className="mt-1 text-xs text-muted-foreground">Demo slots — these times are synthetic and not held for you.</p>
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                    {DEMO_DAYS.map((x) => (
                      <button key={x.id} type="button" onClick={() => { setDay(x.id); setSlot(""); }} aria-pressed={day === x.id} className={`min-h-11 shrink-0 rounded-2xl px-4 text-sm font-bold ${day === x.id ? "bg-primary text-primary-foreground" : "bg-card/70"}`}>
                        {x.label}
                      </button>
                    ))}
                  </div>
                  {dayObj.slots.length === 0 ? (
                    <div className="mt-6 rounded-2xl bg-secondary/70 p-6 text-center">
                      <CalendarX aria-hidden className="mx-auto size-8 text-muted-foreground" />
                      <p className="mt-2 font-extrabold">No slots on {dayObj.label}</p>
                      <p className="text-sm text-muted-foreground">Try another day, or call the clinic to join the waiting list.</p>
                    </div>
                  ) : (
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {dayObj.slots.map((t) => (
                        <motion.button key={t} type="button" whileTap={{ scale: 0.95 }} onClick={() => setSlot(t)} aria-pressed={slot === t} className={`min-h-11 rounded-2xl text-sm font-extrabold ${slot === t ? "btn-3d bg-primary text-primary-foreground" : "bg-card/70"}`}>
                          {t}
                        </motion.button>
                      ))}
                    </div>
                  )}
                  {err("slot")}
                </fieldset>
              )}

              {step === 3 && (
                <fieldset className="grid gap-4 sm:grid-cols-2">
                  <legend className="mb-2 text-xl font-extrabold">Patient details</legend>
                  <div className="sm:col-span-2 flex flex-wrap gap-2">
                    {(["self", "dependent"] as const).map((w) => (
                      <button key={w} type="button" aria-pressed={d.forWhom === w} onClick={() => setD({ ...d, forWhom: w })} className={`min-h-11 rounded-full px-4 text-sm font-bold ${d.forWhom === w ? "bg-primary text-primary-foreground" : "bg-card/70"}`}>
                        {w === "self" ? "Booking for me" : "Booking for someone else"}
                      </button>
                    ))}
                    {(["new", "returning"] as const).map((w) => (
                      <button key={w} type="button" aria-pressed={d.patientType === w} onClick={() => setD({ ...d, patientType: w })} className={`min-h-11 rounded-full px-4 text-sm font-bold ${d.patientType === w ? "bg-accent text-accent-foreground" : "bg-card/70"}`}>
                        {w === "new" ? "New patient" : "Returning patient"}
                      </button>
                    ))}
                  </div>
                  <label className="text-sm font-bold">Patient full name<input className={field} value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} autoComplete="name" />{err("name")}</label>
                  <label className="text-sm font-bold">Mobile number<input className={field} value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} inputMode="tel" placeholder="0300 1234567" />{err("phone")}</label>
                  <label className="text-sm font-bold">Contact me by
                    <select className={field} value={d.contact} onChange={(e) => setD({ ...d, contact: e.target.value as Details["contact"] })}>
                      <option>WhatsApp</option><option>Call</option><option>SMS</option>
                    </select>
                  </label>
                  {d.forWhom === "dependent" && (
                    <label className="text-sm font-bold">Your relationship to patient<input className={field} value={d.relationship} onChange={(e) => setD({ ...d, relationship: e.target.value })} placeholder="Parent, guardian, child…" />{err("relationship")}</label>
                  )}
                  <label className="text-sm font-bold sm:col-span-2">Reason for visit (optional)
                    <textarea className={`${field} min-h-20 py-3`} value={d.reason} onChange={(e) => setD({ ...d, reason: e.target.value })} placeholder="e.g. sensitivity on the left side when drinking cold water" />
                    <span className="text-xs font-normal text-muted-foreground">Briefly, in your words — your dentist will examine you. {d.reason.length}/200</span>
                    {err("reason")}
                  </label>
                  <label className="flex items-start gap-2 text-sm sm:col-span-2">
                    <input type="checkbox" className="mt-1 size-4 accent-[var(--care)]" checked={d.consent} onChange={(e) => setD({ ...d, consent: e.target.checked })} />
                    I agree that the clinic may contact me about this appointment by {d.contact}.
                  </label>
                  {err("consent")}
                </fieldset>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-xl font-extrabold">Review your booking</h2>
                  <dl className="mt-4 grid gap-3 rounded-3xl bg-secondary/60 p-5 text-sm sm:grid-cols-2">
                    {[
                      ["Clinic", CLINIC.name],
                      ["Treatment", svc?.name ?? "Not sure — consultation"],
                      ["Dentist", dentistObj?.name ?? "First available"],
                      ["When", `${dayObj.label}, ${slot}`],
                      ["Duration", svc?.duration ?? "30 min"],
                      ["Indicative rate", svc ? priceLabel(svc) : "PKR 1,500"],
                      ["Patient", `${d.name}${d.forWhom === "dependent" ? ` (booked by ${d.relationship})` : ""}`],
                      ["Contact", `${d.contact} · ${d.phone}`],
                    ].map(([k, v]) => (
                      <div key={k}><dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{k}</dt><dd className="font-extrabold">{v}</dd></div>
                    ))}
                  </dl>
                  <p className="mt-3 text-xs text-muted-foreground">The rate is indicative. Your dentist confirms diagnosis and final cost after examination.</p>
                  {duplicate && (
                    <p role="alert" className="mt-3 flex gap-2 rounded-2xl bg-accent/15 p-3 text-sm font-semibold text-accent-foreground">
                      <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" /> You already have a booking at this time with this number. Confirming again will not create a second one.
                    </p>
                  )}
                  <label className="mt-4 flex items-start gap-2 text-sm">
                    <input type="checkbox" className="mt-1 size-4 accent-[var(--care)]" checked={policy} onChange={(e) => setPolicy(e.target.checked)} />
                    I accept the booking policy: cancel or reschedule at least 12 hours before (demo policy).
                  </label>
                  {err("policy")}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
            <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-bold disabled:opacity-40">
              <ArrowLeft aria-hidden className="size-4" /> Back
            </button>
            {step < 4 ? (
              <motion.button type="button" whileTap={{ y: 3 }} onClick={() => go(step + 1)} className="btn-3d flex min-h-11 items-center gap-1.5 rounded-full bg-primary px-6 text-sm font-extrabold text-primary-foreground">
                Continue <ArrowRight aria-hidden className="size-4" />
              </motion.button>
            ) : (
              <motion.button type="button" whileTap={{ y: 3 }} onClick={submit} disabled={status === "submitting"} className="btn-3d flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-extrabold text-primary-foreground disabled:opacity-70">
                {status === "submitting" ? <><Loader2 aria-hidden className="size-4 animate-spin" /> Confirming…</> : "Confirm booking"}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
