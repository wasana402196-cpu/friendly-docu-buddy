import { motion } from "motion/react";
import type { ReactNode } from "react";
import { SiteNav, UrgentStrip } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export const spring = { type: "spring" as const, stiffness: 170, damping: 20 };

export function PageShell({ children, urgent = true }: { children: ReactNode; urgent?: boolean }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div aria-hidden className="clinic-grain pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-3 sm:px-8">
        {urgent && <UrgentStrip />}
        <SiteNav />
        {children}
      </div>
      <SiteFooter />
    </main>
  );
}

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: string }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="pt-12 pb-8"
    >
      <p className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-5xl">{title}</h1>
      {lead && <p className="mt-3 max-w-2xl text-muted-foreground sm:text-lg">{lead}</p>}
    </motion.header>
  );
}

export function DemoBadge({ children = "Demo data" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gold/30 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-foreground">
      {children}
    </span>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...spring, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
