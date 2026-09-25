import type { ReactNode } from "react";
import { motion } from "motion/react";

export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-4">
      <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-extrabold">{value}</p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </motion.div>
  );
}

export function Panel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="glass-card rounded-3xl p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-lg font-extrabold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Chip({ children, tone = "muted" }: { children: ReactNode; tone?: "care" | "ember" | "gold" | "muted" }) {
  const cls = { care: "bg-primary/15 text-primary", ember: "bg-accent/20 text-accent-foreground", gold: "bg-gold/30 text-foreground", muted: "bg-secondary text-muted-foreground" }[tone];
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${cls}`}>{children}</span>;
}
