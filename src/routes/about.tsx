import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, Lock, ShieldCheck, Stethoscope } from "lucide-react";
import { PageHeader, PageShell, Reveal } from "@/components/caddy/PageShell";
import { FaqItem } from "@/components/clinic/FaqItem";
import { FAQ, JOURNEY, STERILIZATION, WHAT_TO_BRING } from "@/lib/clinic-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & safety — Crescent & Pearl Dental" },
      { name: "description", content: "How Crescent & Pearl sterilizes instruments, protects your privacy and supports families and guardians." },
      { property: "og:title", content: "About & safety — Crescent & Pearl Dental" },
      { property: "og:description", content: "Calm, precise, modern family dentistry with specialist access." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Stethoscope, t: "Clinician review", b: "Every clinical entry is reviewed and signed by your dentist. Corrections are added as dated notes, never overwritten." },
  { icon: ShieldCheck, t: "Sterilization", b: "Sealed, heat-sterilized instruments opened at the chair." },
  { icon: Lock, t: "Privacy", b: "Only staff involved in your care see your records, and access is logged." },
  { icon: HeartHandshake, t: "Families & guardians", b: "Parents and carers can book, consent and sit in for dependents." },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About"
        title={<>Calm, precise, <span className="foil-text foil-animate">family dentistry</span></>}
        lead="Crescent & Pearl is a demonstration clinic showing how an independent Pakistani dental practice can feel reassuring, premium and transparent."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {VALUES.map(({ icon: Icon, t, b }, i) => (
          <Reveal key={t} delay={i * 0.06} className="glass-card rounded-3xl p-6">
            <Icon aria-hidden className="size-6 text-primary" />
            <h2 className="mt-2 text-xl font-extrabold">{t}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{b}</p>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <Reveal className="glass-card rounded-3xl p-6">
          <h2 className="text-lg font-extrabold">Sterilization steps</h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
            {STERILIZATION.map((s) => <li key={s}>{s}</li>)}
          </ol>
        </Reveal>
        <Reveal className="glass-card rounded-3xl p-6">
          <h2 className="text-lg font-extrabold">What to bring</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            {WHAT_TO_BRING.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </Reveal>
        <Reveal className="glass-card rounded-3xl p-6">
          <h2 className="text-lg font-extrabold">Your journey</h2>
          <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {JOURNEY.map((j, i) => <li key={j.step}><b className="text-foreground">{i + 1}. {j.step}</b> — {j.body}</li>)}
          </ol>
        </Reveal>
      </div>
      <h2 className="mt-12 text-2xl font-extrabold">FAQ</h2>
      <div className="mt-4 space-y-2">
        {FAQ.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
      </div>
    </PageShell>
  );
}
