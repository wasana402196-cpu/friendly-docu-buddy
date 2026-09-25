import { motion } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-2xl">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-12 w-full items-center justify-between gap-3 px-5 py-3 text-left font-bold"
      >
        {q}
        <motion.span animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown aria-hidden className="size-4" />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
        <p className="px-5 pb-4 text-sm text-muted-foreground">{a}</p>
      </motion.div>
    </div>
  );
}
