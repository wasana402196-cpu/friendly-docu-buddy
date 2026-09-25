import { motion, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Heart, Instagram, Linkedin, Twitter } from "lucide-react";
import { ToothMark } from "./ToothMark";

const COLUMNS: { title: string; links: { label: string; to?: string }[] }[] = [
  {
    title: "Patients",
    links: [
      { label: "Book appointment", to: "/book" },
      { label: "Services", to: "/services" },
      { label: "Pricing", to: "/pricing" },
      { label: "Queue status", to: "/queue" },
      { label: "Patient area", to: "/dashboard" },
    ],
  },
  {
    title: "Clinic",
    links: [
      { label: "Our dentists", to: "/dentists" },
      { label: "About & safety", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Patient login", to: "/login" },
    ],
  },
  {
    title: "Staff (demo)",
    links: [
      { label: "Reception", to: "/reception" },
      { label: "Dentist workspace", to: "/doctor" },
      { label: "Clinic owner", to: "/owner" },
    ],
  },
];

const MARQUEE = [
  "itemized treatment plans",
  "sterilized instruments",
  "family appointments",
  "private queue status",
  "dentist-reviewed records",
  "transparent estimates",
];

export function SiteFooter() {
  const calm = useReducedMotion();

  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* marquee ribbon */}
      <div
        className="relative overflow-hidden py-2.5"
        style={{ background: "var(--gradient-care)" }}
        aria-hidden
      >
        <motion.div
          className="flex w-max gap-6 whitespace-nowrap"
          animate={calm ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-primary-foreground/90"
            >
              {word} <span className="opacity-60">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative bg-secondary/60">
        <div aria-hidden className="clinic-grain pointer-events-none absolute inset-0 opacity-50" />

        <div className="relative mx-auto max-w-6xl px-5 pb-9 pt-12 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
            >
              <div className="flex items-center gap-2">
                <ToothMark className="size-10" />
                <span className="font-display text-xl font-extrabold leading-none">
                  Crescent<span className="foil-text foil-animate"> &amp; Pearl</span>
                </span>
              </div>
              <p className="mt-4 max-w-sm text-[0.8rem] leading-relaxed text-muted-foreground">
                Calm, precise family dentistry. Demo contact: hello@crescentpearl.example · +92 300 000 0000 (demo). All details on this site are demonstration data.
              </p>

              <div className="mt-5 flex gap-2">
                {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    aria-label="Clinic social (demo)"
                    whileHover={{ y: -4, rotate: -6 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 420, damping: 14 }}
                    className="glass-card grid size-9 place-items-center rounded-xl"
                  >
                    <Icon aria-hidden className="size-3.5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-3">
              {COLUMNS.map((col, ci) => (
                <motion.div
                  key={col.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    type: "spring",
                    stiffness: 170,
                    damping: 18,
                    delay: 0.06 * ci,
                  }}
                >
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-primary">
                    {col.title}
                  </p>
                  <ul className="mt-3.5 space-y-2 text-[0.8rem] font-semibold">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        {l.to ? (
                          <Link
                            to={l.to}
                            className="story-link inline-block text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {l.label}
                          </Link>
                        ) : (
                          <span className="story-link inline-block cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
                            {l.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* medium caddy wordmark */}
          <motion.p
            aria-hidden
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="hero-title mt-12 select-none text-center text-[10vw] leading-none sm:text-[7vw]"
          >
            Crescent &amp; Pearl
          </motion.p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5 text-[0.7rem] font-semibold text-muted-foreground">
            <p>© {new Date().getFullYear()} Crescent & Pearl Dental (demo) · Powered by Caddy Care</p>
            <p className="inline-flex items-center gap-1.5">
              Made with
              <motion.span
                animate={calm ? {} : { scale: [1, 1.35, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="text-accent"
              >
                <Heart aria-hidden className="size-3" />
              </motion.span>
              for calmer dental visits
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
