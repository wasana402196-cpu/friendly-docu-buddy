import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CalendarCheck, Clock, Languages } from "lucide-react";
import { DemoBadge, PageHeader, PageShell } from "@/components/caddy/PageShell";
import { DENTISTS } from "@/lib/clinic-data";

export const Route = createFileRoute("/dentists")({
  head: () => ({
    meta: [
      { title: "Our dentists — Crescent & Pearl Dental" },
      { name: "description", content: "Meet the family, root-canal, orthodontic and oral-surgery dentists at Crescent & Pearl (demo profiles)." },
      { property: "og:title", content: "Our dentists — Crescent & Pearl Dental" },
      { property: "og:description", content: "Specialties, languages and next available times for each dentist." },
    ],
  }),
  component: DentistsPage,
});

function DentistsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Dentists"
        title="Gentle hands, clear answers"
        lead="Fictional clinicians for this demo. Credentials are placeholders and are not presented as verified."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {DENTISTS.map((d, i) => (
          <motion.article
            key={d.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: (i % 2) * 0.08 }}
            className="glass-card flex gap-5 rounded-3xl p-5"
          >
            <img src={d.photo} alt={`${d.name}, demo profile photo`} loading="lazy" className="size-28 shrink-0 rounded-2xl object-cover sm:size-36" />
            <div className="min-w-0 flex-1">
              <DemoBadge>Demo profile</DemoBadge>
              <h2 className="mt-1 text-xl font-extrabold">{d.name}</h2>
              <p className="text-sm font-bold text-primary">{d.specialty}</p>
              <p className="mt-2 text-sm text-muted-foreground">{d.bio}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <Languages aria-hidden className="size-3.5" /> {d.languages.join(", ")}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {d.focus.map((f) => (
                  <span key={f} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold">{f}</span>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">{d.experience}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Link to="/book" search={{ dentist: d.id }} className="btn-3d flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-extrabold text-primary-foreground">
                  <CalendarCheck aria-hidden className="size-4" /> Book
                </Link>
                <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                  <Clock aria-hidden className="size-3.5" /> Next: {d.next}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
