import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SPECIALIZATIONS } from "@/lib/home-data";
import checkup from "@/assets/treat-checkup.jpg";
import cleaning from "@/assets/treat-cleaning.jpg";
import rootcanal from "@/assets/treat-rootcanal.jpg";
import children from "@/assets/treat-children.jpg";
import whitening from "@/assets/treat-whitening.jpg";
import braces from "@/assets/treat-braces.jpg";

const ART: Record<string, { src: string; blurb: string }> = {
  consultation: { src: checkup, blurb: "A friendly look-over and clear next steps." },
  scaling: { src: cleaning, blurb: "Fresh, polished, sparkly-clean teeth." },
  "root-canal": { src: rootcanal, blurb: "Gentle relief for deep tooth pain." },
  "child-checkup": { src: children, blurb: "Fun, fear-free visits for little ones." },
  whitening: { src: whitening, blurb: "A brighter smile you'll love to show." },
  braces: { src: braces, blurb: "Straighter teeth with braces or aligners." },
};

const tintRing = {
  care: "from-primary/60 to-primary/10",
  ember: "from-accent/70 to-accent/10",
  gold: "from-gold/70 to-gold/10",
} as const;

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const card = {
  hidden: { opacity: 0, y: 40, rotate: -2, scale: 0.92 },
  show: {
    opacity: 1, y: 0, rotate: 0, scale: 1,
    transition: { type: "spring" as const, stiffness: 220, damping: 18 },
  },
};

export function SpecializationPills() {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-2 gap-4 md:grid-cols-3"
    >
      {SPECIALIZATIONS.map((s, i) => {
        const art = ART[s.id];
        return (
          <motion.li key={s.id} variants={card}>
            <motion.div
              whileHover={{ y: -8, rotate: i % 2 ? 1.2 : -1.2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className={`group rounded-[2rem] bg-gradient-to-br p-[2px] shadow-lg ${tintRing[s.tint]}`}
            >
              <Link
                to="/book"
                search={{ service: s.id }}
                className="block overflow-hidden rounded-[calc(2rem-2px)] bg-card"
              >
                <div className="relative aspect-square overflow-hidden">
                  {art && (
                    <img
                      src={art.src}
                      alt={`${s.label} — anime illustration`}
                      width={816}
                      height={816}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 font-hero text-sm text-primary">
                    0{i + 1}
                  </span>
                  <h3 className="absolute bottom-3 left-4 right-4 font-hero text-2xl uppercase tracking-wide text-background sm:text-3xl">
                    {s.label}
                  </h3>
                </div>
                <div className="flex items-center justify-between gap-2 p-4">
                  <p className="text-xs text-muted-foreground sm:text-sm">{art?.blurb}</p>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1">
                    <ArrowRight aria-hidden className="size-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
