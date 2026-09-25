import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  AlertTriangle,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ClipboardList,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { HeroCaddy } from "@/components/caddy/HeroCaddy";
import { SpecializationPills } from "@/components/caddy/SpecializationPills";
import { DoctorCarousel } from "@/components/caddy/DoctorCarousel";
import { QueueTeaser } from "@/components/caddy/QueueTeaser";
import { CallDoctorAnimation } from "@/components/caddy/CallDoctorAnimation";
import { DemoBadge, PageShell, Reveal, spring } from "@/components/caddy/PageShell";
import { ServiceCard } from "@/components/clinic/ServiceCard";
import { FaqItem } from "@/components/clinic/FaqItem";
import {
  CLINIC,
  FAQ,
  JOURNEY,
  PAYMENT_METHODS,
  SERVICES,
  STERILIZATION,
  TRUST,
  WHAT_TO_BRING,
} from "@/lib/clinic-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crescent & Pearl Dental — Comfortable, transparent dental care" },
      {
        name: "description",
        content:
          "Family dentistry in Karachi (demo): clear PKR estimates, gentle dentists, easy online booking and a private queue status.",
      },
      { property: "og:title", content: "Crescent & Pearl Dental — Comfortable, transparent dental care" },
      {
        property: "og:description",
        content: "Book a check-up, see indicative prices and meet our dental team.",
      },
    ],
  }),
  component: Home,
});

const TRUST_ICONS = [ClipboardList, ShieldCheck, Users, CheckCircle2];

function Home() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="grid items-center gap-10 pt-10 lg:grid-cols-[1.1fr_1fr]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="order-2 space-y-6 lg:order-1"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
            transition={spring}
            className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground"
          >
            Family dentistry · {CLINIC.city}
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 34, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
            transition={{ type: "spring", stiffness: 150, damping: 16 }}
            className="max-w-2xl font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.1rem]"
          >
            Crescent &amp; Pearl <span className="foil-text foil-animate">Dental</span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
            transition={spring}
            className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {CLINIC.promise} Every treatment is explained, every estimate is itemized, and you always
            know when it&apos;s your turn.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={spring}
            className="flex flex-wrap items-center gap-3"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 4 }} transition={{ type: "spring", stiffness: 500, damping: 18 }}>
              <Link to="/book" className="btn-3d block rounded-full bg-primary px-7 py-3.5 text-sm font-extrabold text-primary-foreground">
                Book appointment
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/services" className="glass-card block rounded-full px-6 py-3.5 text-sm font-extrabold">
                View services
              </Link>
            </motion.div>
          </motion.div>

          {/* Today's status */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={spring}
            className="glass-card grid gap-3 rounded-3xl p-4 text-sm sm:grid-cols-3"
          >
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <span className="size-2 rounded-full bg-primary" /> Today
              </p>
              <p className="mt-1 font-extrabold">Open · demo schedule</p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Clock aria-hidden className="size-3" /> Next available
              </p>
              <p className="mt-1 font-extrabold">{CLINIC.nextAvailable}</p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <AlertTriangle aria-hidden className="size-3" /> Urgent pain?
              </p>
              <Link to="/book" search={{ service: "emergency" }} className="mt-1 block font-extrabold text-primary underline-offset-2 hover:underline">
                Emergency assessment
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <HeroCaddy />
          <p className="mt-2 text-center text-[11px] font-semibold text-muted-foreground">
            Illustration · demonstration clinic, not a real practice
          </p>
        </div>
      </section>

      {/* TRUST */}
      <section className="grid gap-3 pt-14 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST.map((t, i) => {
          const Icon = TRUST_ICONS[i]!;
          return (
            <Reveal key={t.title} delay={i * 0.06} className="glass-card rounded-3xl p-5">
              <span className="grid size-10 place-items-center rounded-2xl bg-primary/15 text-primary">
                <Icon aria-hidden className="size-5" />
              </span>
              <h3 className="mt-3 font-extrabold">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
            </Reveal>
          );
        })}
      </section>

      {/* QUICK PICK */}
      <section className="pt-14">
        <h2 className="mb-5 text-center text-2xl font-extrabold">What brings you in today?</h2>
        <SpecializationPills />
      </section>

      {/* SERVICES */}
      <section className="pt-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Popular treatments</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Indicative demo rates in PKR — your dentist confirms the final cost after examination.
            </p>
          </div>
          <Link to="/services" className="rounded-full bg-secondary px-4 py-2 text-sm font-bold">
            All 12 services →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* DENTISTS */}
      <div className="pt-16">
        <DoctorCarousel />
      </div>

      {/* JOURNEY */}
      <section className="pt-16">
        <h2 className="text-center text-3xl font-extrabold">Your visit, step by step</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {JOURNEY.map((j, i) => (
            <Reveal key={j.step} delay={i * 0.1} className="glass-card relative rounded-3xl p-5">
              <span className="font-hero text-4xl text-primary/80">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-extrabold">{j.step}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{j.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* QUEUE */}
      <div className="pt-16">
        <QueueTeaser />
      </div>

      {/* SAFETY + BRING */}
      <section className="grid gap-4 pt-16 lg:grid-cols-3">
        <Reveal className="glass-card rounded-3xl p-6 lg:col-span-1">
          <ShieldCheck aria-hidden className="size-6 text-primary" />
          <h3 className="mt-2 text-xl font-extrabold">How we sterilize</h3>
          <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
            {STERILIZATION.map((s, i) => (
              <li key={s} className="flex gap-2">
                <span className="font-extrabold text-primary">{i + 1}.</span> {s}
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.08} className="glass-card rounded-3xl p-6">
          <ClipboardList aria-hidden className="size-6 text-accent" />
          <h3 className="mt-2 text-xl font-extrabold">First visit? Bring</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {WHAT_TO_BRING.map((s) => (
              <li key={s} className="flex gap-2">
                <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" /> {s}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.16} className="glass-card rounded-3xl p-6">
          <HeartHandshake aria-hidden className="size-6 text-primary" />
          <h3 className="mt-2 text-xl font-extrabold">Access &amp; payment</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Ground-floor chair, wheelchair space and guardian seating in every room. Parents can book and
            sit with children.
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {PAYMENT_METHODS.map((p) => (
              <span key={p} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-bold">
                {p}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">Payment methods are placeholders — no online payment yet.</p>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="pt-16">
        <h2 className="text-center text-3xl font-extrabold">Questions patients ask</h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-2">
          {FAQ.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          <Sparkles aria-hidden className="mr-1 inline size-3" />
          AI assistant: not available in this demo — the answers above are written by the clinic.
        </p>
      </section>

      {/* FINAL CTA */}
      <Reveal className="glass-card mt-16 grid items-center gap-8 overflow-hidden rounded-4xl p-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <DemoBadge>Demo contact details</DemoBadge>
          <h2 className="mt-2 text-3xl font-extrabold">Ready for a calmer dental visit?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground lg:mx-0">
            {CLINIC.phone} · {CLINIC.email}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 4 }}>
              <Link to="/book" className="btn-3d flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground">
                <CalendarCheck aria-hidden className="size-4" /> Book appointment
              </Link>
            </motion.div>
            <Link to="/contact" className="glass-card rounded-full px-6 py-3 text-sm font-bold">
              Contact the clinic
            </Link>
          </div>
        </div>
        <CallDoctorAnimation className="mx-auto" />
      </Reveal>
    </PageShell>
  );
}

