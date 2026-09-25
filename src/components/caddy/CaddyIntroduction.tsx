import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, CalendarDays, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import companion from "@/assets/caddy-companion.png";

export function scrollToCaddy() {
  document.getElementById("caddy-guide")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" });
}

export function CaddyIntroduction() {
  const reducedMotion = useReducedMotion();
  return (
    <section aria-labelledby="meet-caddy" className="relative mt-14 overflow-hidden border-y border-primary/25 bg-primary/10 py-9 sm:py-12">
      <div className="pointer-events-none absolute inset-0 clinic-grain opacity-50" aria-hidden />
      <div className="relative mx-auto grid max-w-5xl items-center gap-4 px-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-10 sm:px-8">
        <motion.div initial={reducedMotion ? false : { opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: "easeOut" }} className="relative mx-auto flex h-56 w-full max-w-72 items-end justify-center sm:h-80">
          <span className="caddy-signal absolute bottom-6 left-1/2 size-36 -translate-x-1/2 rounded-full border border-primary/50" aria-hidden />
          <span className="caddy-signal caddy-signal-delay absolute bottom-6 left-1/2 size-36 -translate-x-1/2 rounded-full border border-primary/50" aria-hidden />
          <span className="absolute bottom-1 h-14 w-52 rounded-full bg-gold/40 blur-xl" aria-hidden />
          <motion.img src={companion} alt="Caddy waves hello" width={816} height={816} loading="lazy" className="relative z-10 h-full w-full object-contain object-bottom drop-shadow-xl" animate={reducedMotion ? undefined : { y: [0, -9, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
        <motion.div initial={reducedMotion ? false : { opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}>
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase text-primary"><span className="flex h-6 items-center gap-0.5" aria-hidden>{[10, 19, 13, 23, 12].map((height, i) => <span key={i} className="caddy-wave w-1 rounded-full bg-primary" style={{ height, animationDelay: `${i * 0.12}s` }} />)}</span> Meet your guide</p>
          <h2 id="meet-caddy" className="mt-3 font-hero text-4xl uppercase leading-tight sm:text-5xl">Hi, I’m Caddy.<br /><span className="text-primary">Tell me what’s going on.</span></h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed">Not sure which visit to choose? Tell me in your own words. I’ll help you find a place to start, then you can book when you’re ready.</p>
          <p className="mt-2 text-xs text-muted-foreground">Demo text guide only · no voice or live person yet · your words aren’t saved.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="button" onClick={scrollToCaddy} className="h-11 rounded-md px-5 font-extrabold"><MessageCircle aria-hidden /> Talk to Caddy <ArrowDown aria-hidden /></Button>
            <Button asChild variant="outline" className="h-11 rounded-md px-5 font-extrabold"><a href="/book"><CalendarDays aria-hidden /> Book a visit</a></Button>
          </div>
        </motion.div>
      </div>
    </section>
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