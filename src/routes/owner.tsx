import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { KeyRound, ShieldCheck } from "lucide-react";
import { DemoBadge, PageShell } from "@/components/caddy/PageShell";
import { Chip, Panel, StatCard } from "@/components/clinic/Workspace";
import { SERVICES, pkr, priceLabel } from "@/lib/clinic-data";

export const Route = createFileRoute("/owner")({
  head: () => ({
    meta: [
      { title: "Clinic owner view (demo) — Crescent & Pearl Dental" },
      { name: "description", content: "Demo owner dashboard: appointments, collections, chair use, staff roles, services and audit." },
      { property: "og:title", content: "Clinic owner view (demo) — Crescent & Pearl" },
      { property: "og:description", content: "How a clinic owner sees performance and settings, with synthetic data." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Owner,
});

const REVENUE = [
  { k: "Root canal", v: 412000 },
  { k: "Crowns", v: 336000 },
  { k: "Scaling", v: 187000 },
  { k: "Fillings", v: 158000 },
  { k: "Consultations", v: 96000 },
];
const STAFF = [
  { n: "Dr. Sana Mirza", r: ["Dentist"] },
  { n: "Dr. Hamza Qureshi", r: ["Dentist"] },
  { n: "Front desk A (demo)", r: ["Reception"] },
  { n: "Owner (demo)", r: ["Owner", "Dentist"] },
];
const AUDIT = [
  "Refund of PKR 2,000 approved — reason recorded",
  "Cash variance PKR −500 — reason: change error",
  "Role change: Front desk A → Reception",
  "Patient export requested — pending second approval",
  "Support session opened by platform (visible to clinic)",
];

function Owner() {
  const max = Math.max(...REVENUE.map((r) => r.v));
  return (
    <PageShell urgent={false}>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-10">
        <h1 className="text-3xl font-extrabold">Clinic owner</h1>
        <DemoBadge>Synthetic figures · this month</DemoBadge>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-6">
        <StatCard label="Appointments" value="486" />
        <StatCard label="No-shows" value="4.1%" />
        <StatCard label="Collections" value={pkr(1189000)} />
        <StatCard label="Outstanding" value={pkr(142500)} />
        <StatCard label="Avg wait" value="12 min" />
        <StatCard label="Chair use" value="78%" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Panel title="Revenue by service">
          <ul className="space-y-2.5">
            {REVENUE.map((r, i) => (
              <li key={r.k}>
                <div className="flex justify-between text-sm font-bold"><span>{r.k}</span><span>{pkr(r.v)}</span></div>
                <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-secondary">
                  <motion.div className="h-full rounded-full" style={{ background: "var(--gradient-care)" }} initial={{ width: 0 }} whileInView={{ width: `${(r.v / max) * 100}%` }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">By method: Cash 58% · Card 27% · Bank 15%</p>
        </Panel>

        <Panel title="Staff & roles">
          <ul className="space-y-2">
            {STAFF.map((s) => (
              <li key={s.n} className="flex items-center justify-between rounded-2xl bg-card/70 p-3 text-sm">
                <span className="font-bold">{s.n}</span>
                <span className="flex gap-1">{s.r.map((r) => <Chip key={r} tone={r === "Owner" ? "gold" : "care"}>{r}</Chip>)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-start gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck aria-hidden className="mt-0.5 size-3.5" /> Roles are clinic memberships, separate from personal accounts. Ownership does not grant editing of signed clinical records.
          </p>
        </Panel>

        <Panel title="Services, rates & schedule">
          <ul className="max-h-64 space-y-1 overflow-y-auto text-sm">
            {SERVICES.map((s) => (
              <li key={s.id} className="flex justify-between border-b border-border py-1.5"><span>{s.name}</span><span className="font-bold">{priceLabel(s)} · {s.duration}</span></li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">Closures: 14 Aug (holiday, demo). Reminders: 24h + 2h before, WhatsApp.</p>
        </Panel>

        <Panel title="Health & audit">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-2xl bg-card/70 p-3"><p className="text-xs text-muted-foreground">Follow-ups due</p><p className="font-extrabold">23</p></div>
            <div className="rounded-2xl bg-card/70 p-3"><p className="text-xs text-muted-foreground">Messages delivered</p><p className="font-extrabold">97.2%</p></div>
            <div className="rounded-2xl bg-card/70 p-3"><p className="text-xs text-muted-foreground">Storage</p><p className="font-extrabold">1.8 / 10 GB</p></div>
            <div className="rounded-2xl bg-card/70 p-3"><p className="flex items-center gap-1 text-xs text-muted-foreground"><KeyRound aria-hidden className="size-3" /> AI key</p><p className="font-extrabold">Not configured</p></div>
          </div>
          <ul className="mt-3 space-y-1.5 text-xs">
            {AUDIT.map((a) => <li key={a} className="rounded-xl bg-secondary/60 px-3 py-2">{a}</li>)}
          </ul>
          <p className="mt-2 text-[11px] text-muted-foreground">Domain: crescentpearl.example · Exports and tenant audit available once the backend is connected.</p>
        </Panel>
      </div>
    </PageShell>
  );
}
