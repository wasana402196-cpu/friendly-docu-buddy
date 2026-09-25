import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { DemoBadge, PageHeader, PageShell, Reveal } from "@/components/caddy/PageShell";
import { CLINIC } from "@/lib/clinic-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & hours — Crescent & Pearl Dental" },
      { name: "description", content: "Phone, WhatsApp, address and demo opening hours for Crescent & Pearl Dental." },
      { property: "og:title", content: "Contact — Crescent & Pearl Dental" },
      { property: "og:description", content: "Reach the clinic or book an appointment online." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const rows = [
    { icon: Phone, label: "Phone", value: CLINIC.phone },
    { icon: MessageCircle, label: "WhatsApp", value: CLINIC.whatsapp },
    { icon: Mail, label: "Email", value: CLINIC.email },
    { icon: MapPin, label: "Address", value: CLINIC.address },
  ];
  return (
    <PageShell>
      <PageHeader eyebrow="Contact" title="We're here to help" lead="All contact details below are demonstration placeholders until the clinic supplies verified ones." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Reveal className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold">Get in touch</h2>
            <DemoBadge />
          </div>
          <ul className="mt-4 space-y-3">
            {rows.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary"><Icon aria-hidden className="size-4" /></span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="font-bold">{value}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/book" className="btn-3d mt-6 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-extrabold text-primary-foreground">Book appointment</Link>
        </Reveal>
        <Reveal delay={0.08} className="glass-card rounded-3xl p-6">
          <h2 className="flex items-center gap-2 text-xl font-extrabold"><Clock aria-hidden className="size-5 text-primary" /> Demo schedule</h2>
          <dl className="mt-4 divide-y divide-border">
            {CLINIC.hours.map(([d, h]) => (
              <div key={d} className="flex justify-between py-2.5 text-sm">
                <dt className="font-bold">{d}</dt>
                <dd className="text-muted-foreground">{h}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-2xl bg-accent/15 p-3 text-xs font-semibold text-accent-foreground">
            Dental emergency outside these hours? For heavy bleeding, swelling near the eye or neck, or difficulty breathing, go to the nearest hospital emergency department.
          </p>
        </Reveal>
      </div>
    </PageShell>
  );
}
