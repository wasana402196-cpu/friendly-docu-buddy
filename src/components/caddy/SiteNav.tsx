import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AlertTriangle, CalendarPlus, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { NotificationBell } from "./NotificationCenter";
import { ToothMark } from "./ToothMark";

const LINKS = [
  { label: "Services", to: "/services" },
  { label: "Dentists", to: "/dentists" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function UrgentStrip() {
  return (
    <p className="mx-auto mb-3 flex max-w-6xl items-start gap-2 rounded-2xl bg-accent/15 px-4 py-2 text-xs font-semibold text-accent-foreground sm:items-center">
      <AlertTriangle aria-hidden className="mt-0.5 size-3.5 shrink-0 sm:mt-0" />
      <span>
        Severe pain, swelling, bleeding or a knocked-out tooth?{" "}
        <Link to="/book" search={{ service: "emergency" }} className="underline underline-offset-2">
          Book an emergency assessment
        </Link>{" "}
        — if swelling spreads or breathing is hard, go to the nearest hospital emergency.
      </span>
    </p>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-3 z-50">
      <motion.nav
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="glass-card flex items-center gap-3 rounded-full px-3 py-2.5 sm:px-5"
        aria-label="Main"
      >
        <Link to="/" className="flex items-center gap-2">
          <ToothMark />
          <span className="font-display text-base font-extrabold leading-none sm:text-lg">
            Crescent<span className="foil-text foil-animate"> &amp; Pearl</span>
          </span>
        </Link>

        <ul className="mx-auto hidden items-center gap-1 text-sm font-bold lg:flex">
          {LINKS.map((link, i) => (
            <motion.li
              key={link.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 + i * 0.07 }}
            >
              <Link
                to={link.to}
                activeProps={{ className: "bg-secondary text-foreground" }}
                className="block rounded-full px-3.5 py-2 text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            to="/login"
            className="hidden rounded-full px-3 py-2 text-sm font-bold text-muted-foreground hover:text-foreground sm:block"
          >
            Patient login
          </Link>
          <NotificationBell />
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 4 }} transition={{ type: "spring", stiffness: 500, damping: 18 }}>
            <Link
              to="/book"
              className="btn-3d flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground sm:px-5"
            >
              <CalendarPlus aria-hidden className="size-4" />
              <span className="hidden sm:inline">Book appointment</span>
              <span className="sm:hidden">Book</span>
            </Link>
          </motion.div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 place-items-center rounded-full bg-secondary text-foreground lg:hidden"
          >
            {open ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="glass-pane mt-2 grid gap-1 rounded-3xl p-3 text-sm font-bold lg:hidden"
          >
            {[...LINKS, { label: "Patient login", to: "/login" as const }, { label: "Queue status", to: "/queue" as const }].map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 hover:bg-secondary">
                  {l.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
