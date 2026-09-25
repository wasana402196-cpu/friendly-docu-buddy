import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, CalendarDays, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import companion from "@/assets/caddy-companion.png";

export function scrollToCaddy() {
  document.getElementById("caddy-guide")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" });
}

export function CaddyIntroduction() {
  const reducedMotion = useReducedMotion();
  return (
    <motion.section
      aria-labelledby="meet-caddy"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.94, y: 26 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="glass-card mt-10 grid items-center gap-4 rounded-4xl px-5 py-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:px-8 sm:py-7"
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, scale: 0.6, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative mx-auto flex size-32 items-center justify-center sm:size-40"
      >
        <span className="caddy-signal absolute inset-0 rounded-full border border-primary/50" aria-hidden />
        <motion.img
          src={companion}
          alt="Caddy waves hello"
          width={816}
          height={816}
          loading="lazy"
          className="relative z-10 h-full w-full object-contain"
          animate={reducedMotion ? false : { y: [0, -7, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div>
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="flex items-center gap-2 text-xs font-extrabold uppercase text-primary"
        >
          <span className="flex h-5 items-center gap-0.5" aria-hidden>
            {[10, 17, 12, 20, 11].map((height, i) => (
              <span key={i} className="caddy-wave w-1 rounded-full bg-primary" style={{ height, animationDelay: `${i * 0.12}s` }} />
            ))}
          </span>
          Meet your guide
        </motion.p>
        <motion.h2
          id="meet-caddy"
          initial={reducedMotion ? false : { opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.14, ease: "easeOut" }}
          className="mt-2 font-hero text-2xl uppercase leading-tight sm:text-3xl"
        >
          Hi, I’m Caddy. <span className="text-primary">Tell me what’s going on.</span>
        </motion.h2>
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, delay: 0.22, ease: "easeOut" }}
          className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground"
        >
          Unsure which visit fits? Describe it in your own words and I’ll point you to a start.
          <span className="mt-1 block text-[11px]">Demo text guide only · no voice or live person yet · your words aren’t saved.</span>
        </motion.p>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
          className="mt-4 flex flex-wrap gap-3"
        >
          <Button type="button" onClick={scrollToCaddy} className="h-10 rounded-md px-4 text-sm font-extrabold">
            <MessageCircle aria-hidden /> Talk to Caddy <ArrowDown aria-hidden />
          </Button>
          <Button asChild variant="outline" className="h-10 rounded-md px-4 text-sm font-extrabold">
            <Link to="/book"><CalendarDays aria-hidden /> Book a visit</Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export function FloatingCaddy() {
  return (
    <div className="fixed bottom-3 right-3 z-40 sm:bottom-6 sm:right-6">
      <Button type="button" onClick={scrollToCaddy} aria-label="Talk to Caddy, demo text guide" title="Talk to Caddy, demo text guide" className="group relative h-auto gap-1 rounded-full border border-primary/30 bg-card py-1 pl-1 pr-3 text-foreground shadow-[var(--shadow-card-hover)] hover:bg-secondary focus-visible:ring-2 sm:pr-5">
        <span className="absolute -inset-1 -z-10 rounded-full border border-primary/40 caddy-float-ring" aria-hidden />
        <img src={companion} alt="" width={816} height={816} loading="lazy" className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16" />
        <span className="text-left text-xs font-extrabold leading-tight sm:text-sm">Talk to<br /><span className="text-primary">Caddy</span></span>
      </Button>
    </div>
  );
}
