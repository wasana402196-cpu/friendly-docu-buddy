import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Clock, Stethoscope } from "lucide-react";
import { priceLabel, type Service } from "@/lib/clinic-data";
import { ToothRegionIcon } from "./ToothRegionIcon";

export function ServiceCard({ service: s, index = 0 }: { service: Service; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover="hover"
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: (index % 3) * 0.06 }}
      className="glass-card group flex flex-col rounded-3xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary">{s.category}</p>
          <h3 className="mt-1 text-lg font-extrabold leading-tight">{s.name}</h3>
        </div>
        <ToothRegionIcon region={s.region} />
      </div>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.purpose}</p>
      <dl className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-secondary/60 p-3 text-xs">
        <div>
          <dt className="flex items-center gap-1 font-bold text-muted-foreground">
            <Clock aria-hidden className="size-3" /> Duration
          </dt>
          <dd className="mt-0.5 font-extrabold">{s.duration}</dd>
        </div>
        <div>
          <dt className="font-bold text-muted-foreground">Indicative rate</dt>
          <dd className="mt-0.5 font-extrabold">{priceLabel(s)}</dd>
        </div>
      </dl>
      <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
        <Stethoscope aria-hidden className="size-3" />
        {s.consultRequired ? "Consultation required first" : "No prior consultation needed"}
      </p>
      <Link
        to="/book"
        search={{ service: s.id }}
        className="mt-4 flex min-h-11 items-center justify-center rounded-full bg-primary/10 text-sm font-extrabold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        Book this
      </Link>
    </motion.article>
  );
}
