import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { PageHeader, PageShell } from "@/components/caddy/PageShell";
import { ServiceCard } from "@/components/clinic/ServiceCard";
import { SERVICES, SERVICE_CATEGORIES } from "@/lib/clinic-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Dental services — Crescent & Pearl Dental" },
      { name: "description", content: "Check-ups, cleaning, fillings, root canals, crowns, whitening, braces and children's dentistry with indicative PKR rates." },
      { property: "og:title", content: "Dental services — Crescent & Pearl Dental" },
      { property: "og:description", content: "Twelve dental treatments with duration, indicative price and booking." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [cat, setCat] = useState<string>("All");
  const list = cat === "All" ? SERVICES : SERVICES.filter((s) => s.category === cat);
  return (
    <PageShell>
      <PageHeader
        eyebrow="Services"
        title={<>Dental care, <span className="foil-text foil-animate">explained plainly</span></>}
        lead="Each treatment shows what it is for, how long it takes and an indicative starting rate. Demo rates — not a quote."
      />
      <div role="tablist" aria-label="Service category" className="mb-6 flex flex-wrap gap-2">
        {["All", ...SERVICE_CATEGORIES].map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`relative min-h-11 rounded-full px-4 text-sm font-bold ${cat === c ? "text-primary-foreground" : "glass-card"}`}
          >
            {cat === c && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-primary" />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} />
        ))}
      </div>
    </PageShell>
  );
}
