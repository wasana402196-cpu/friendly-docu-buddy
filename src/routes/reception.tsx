import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { DemoBadge, PageShell } from "@/components/caddy/PageShell";
import { Chip, Panel, StatCard } from "@/components/clinic/Workspace";
import { pkr } from "@/lib/clinic-data";

export const Route = createFileRoute("/reception")({
  head: () => ({
    meta: [
      { title: "Reception workspace (demo) — Crescent & Pearl Dental" },
      { name: "description", content: "Demo front-desk view: today's schedule, check-in, queue tokens, estimates, payments and cash close." },
      { property: "og:title", content: "Reception workspace (demo) — Crescent & Pearl" },
      { property: "og:description", content: "Fast scanning front-desk tools with synthetic data." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Reception,
});

type Row = { token: string; patient: string; time: string; service: string; status: "Booked" | "Checked in" | "Waiting" | "Called" | "In treatment"; alert?: string };
const INITIAL: Row[] = [
  { token: "A-21", patient: "Demo Patient 1", time: "15:30", service: "Scaling", status: "In treatment" },
  { token: "A-22", patient: "Demo Patient 2", time: "16:00", service: "Filling", status: "Called", alert: "Penicillin allergy" },
  { token: "A-23", patient: "Demo Patient 3", time: "16:15", service: "Consultation", status: "Waiting" },
  { token: "A-24", patient: "Demo Patient 4", time: "16:30", service: "Root canal (stage 2)", status: "Checked in" },
  { token: "—", patient: "Demo Patient 5", time: "17:00", service: "Child check-up", status: "Booked" },
];

function Reception() {
  const [rows, setRows] = useState(INITIAL);
  const [q, setQ] = useState("");
  const [cash, setCash] = useState({ opening: 5000, counted: "" });
  const [reason, setReason] = useState("");
  const collected = 21500;
  const expected = cash.opening + collected;
  const variance = cash.counted ? Number(cash.counted) - expected : 0;

  const checkIn = (i: number) =>
    setRows((r) => r.map((x, j) => (j === i ? { ...x, status: "Checked in", token: x.token === "—" ? `A-${25 + j}` : x.token } : x)));
  const call = () =>
    setRows((r) => {
      const i = r.findIndex((x) => x.status === "Waiting" || x.status === "Checked in");
      return i < 0 ? r : r.map((x, j) => (j === i ? { ...x, status: "Called" } : x));
    });
  const list = rows.filter((r) => r.patient.toLowerCase().includes(q.toLowerCase()) || r.token.toLowerCase().includes(q.toLowerCase()));

  return (
    <PageShell urgent={false}>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-10">
        <h1 className="text-3xl font-extrabold">Reception</h1>
        <DemoBadge>Synthetic data · no real patients</DemoBadge>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Booked today" value="18" hint="3 walk-ins" />
        <StatCard label="Checked in" value={String(rows.filter((r) => r.status !== "Booked").length)} />
        <StatCard label="Avg wait" value="14 min" />
        <StatCard label="Collected" value={pkr(collected)} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Panel
          title="Today's schedule & queue"
          action={<button onClick={call} className="btn-3d min-h-10 rounded-full bg-primary px-4 text-xs font-extrabold text-primary-foreground">Call next</button>}
        >
          <label className="field-glass mb-3 flex min-h-11 items-center gap-2 rounded-2xl px-3">
            <Search aria-hidden className="size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search patient or token" className="w-full bg-transparent text-sm outline-none" aria-label="Search patients" />
          </label>
          {list.length === 0 ? (
            <p className="rounded-2xl bg-secondary/60 p-6 text-center text-sm text-muted-foreground">No matching patients. Check spelling or register a new patient.</p>
          ) : (
            <ul className="space-y-2">
              <AnimatePresence initial={false}>
                {list.map((r) => {
                  const i = rows.indexOf(r);
                  return (
                    <motion.li layout key={r.patient} className="flex flex-wrap items-center gap-3 rounded-2xl bg-card/70 p-3">
                      <span className="font-hero w-12 text-lg">{r.token}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-extrabold">{r.patient} <span className="text-xs font-semibold text-muted-foreground">· {r.time}</span></p>
                        <p className="text-xs text-muted-foreground">{r.service}</p>
                      </div>
                      {r.alert && <Chip tone="ember">⚠ {r.alert}</Chip>}
                      <Chip tone={r.status === "Called" ? "care" : r.status === "In treatment" ? "gold" : "muted"}>{r.status}</Chip>
                      {r.status === "Booked" && <button onClick={() => checkIn(i)} className="min-h-10 rounded-full bg-primary/15 px-3 text-xs font-extrabold text-primary">Check in</button>}
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          )}
          <p className="mt-3 text-[11px] text-muted-foreground">Queue reordering requires a recorded reason in production. Clinical notes are not visible to reception.</p>
        </Panel>

        <div className="space-y-4">
          <Panel title="Register / walk-in" action={<UserPlus aria-hidden className="size-4 text-primary" />}>
            <div className="grid gap-2 text-sm">
              <input className="field-glass min-h-11 rounded-2xl px-3" placeholder="Full name" aria-label="Full name" />
              <input className="field-glass min-h-11 rounded-2xl px-3" placeholder="Mobile number" aria-label="Mobile" />
              <input className="field-glass min-h-11 rounded-2xl px-3" placeholder="Guardian (if minor)" aria-label="Guardian" />
              <p className="text-[11px] text-muted-foreground">Duplicate check runs on mobile + name before saving (demo: disabled).</p>
              <button disabled className="min-h-11 rounded-full bg-secondary text-sm font-bold opacity-70">Save — needs backend</button>
            </div>
          </Panel>
          <Panel title="Estimate & payment">
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between"><span>Root canal stage 2 — tooth 36</span><b>{pkr(9000)}</b></li>
              <li className="flex justify-between"><span>Periapical X-ray</span><b>{pkr(1000)}</b></li>
              <li className="flex justify-between border-t border-border pt-1"><span>Paid earlier</span><b>− {pkr(4000)}</b></li>
              <li className="flex justify-between font-extrabold"><span>Balance</span><span>{pkr(6000)}</span></li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Cash", "Card", "Bank", "Partial", "Receipt", "Refund request", "Book follow-up"].map((b) => (
                <button key={b} disabled className="min-h-9 rounded-full bg-secondary px-3 text-xs font-bold opacity-80">{b}</button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">Payment actions are placeholders — no payment is taken.</p>
          </Panel>
          <Panel title="Cash drawer close">
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between"><dt>Opening cash</dt><dd>{pkr(cash.opening)}</dd></div>
              <div className="flex justify-between"><dt>Cash collected</dt><dd>{pkr(collected)}</dd></div>
              <div className="flex justify-between font-extrabold"><dt>Expected</dt><dd>{pkr(expected)}</dd></div>
            </dl>
            <input value={cash.counted} onChange={(e) => setCash({ ...cash, counted: e.target.value.replace(/\D/g, "") })} inputMode="numeric" placeholder="Counted amount" aria-label="Counted amount" className="field-glass mt-2 min-h-11 w-full rounded-2xl px-3 text-sm" />
            {cash.counted && (
              <p className={`mt-2 text-sm font-extrabold ${variance === 0 ? "text-primary" : "text-destructive"}`}>
                Variance: {variance === 0 ? "none ✓" : pkr(variance)}
              </p>
            )}
            {cash.counted && variance !== 0 && (
              <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for variance (required)" aria-label="Variance reason" className="field-glass mt-2 min-h-11 w-full rounded-2xl px-3 text-sm" />
            )}
            <button disabled={!cash.counted || (variance !== 0 && reason.trim().length < 3)} className="btn-3d mt-3 min-h-11 w-full rounded-full bg-primary text-sm font-extrabold text-primary-foreground disabled:opacity-50">
              Confirm close (demo)
            </button>
          </Panel>
        </div>
      </div>
    </PageShell>
  );
}
