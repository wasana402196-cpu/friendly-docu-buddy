import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarDays, ChevronRight, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToCaddy } from "./CaddyIntroduction";
import talkArt from "@/assets/journey-talk.png";
import bookArt from "@/assets/journey-book.png";
import arriveArt from "@/assets/journey-arrive.png";
import careArt from "@/assets/journey-care.png";

const scenes = [
  {
    number: "01",
    title: "Tell Caddy what's going on",
    story: "Not sure what to choose? Start with your own words. No dental jargon needed.",
    image: talkArt,
    tone: "bg-primary/15",
    action: "Talk to Caddy",
    to: "talk",
  },
  {
    number: "02",
    title: "Pick a time that feels right",
    story: "Choose a visit, a dentist and a demo time — at your pace.",
    image: bookArt,
    tone: "bg-gold/25",
    action: "Book a visit",
    to: "/book",
  },
  {
    number: "03",
    title: "Walk in, Caddy keeps up",
    story: "Check your private queue status instead of wondering when you're next.",
    image: arriveArt,
    tone: "bg-accent/20",
    action: "Check your queue",
    to: "/queue",
  },
  {
    number: "04",
    title: "Leave with a clear plan",
    story: "Understand your care and the estimate before agreeing to treatment.",
    image: careArt,
    tone: "bg-primary/15",
    action: "Explore care",
    to: "/services",
  },
] as const;

function suggestService(message: string) {
  const text = message.toLowerCase();
  if (/child|kid|son|daughter|baby/.test(text)) return { service: "child-checkup", answer: "A children's check-up sounds like a good starting point. You can choose a time next." };
  if (/severe|emergency|swelling|bleed|urgent/.test(text)) return { service: "emergency", answer: "It sounds urgent. Start with a dental emergency assessment. If you have trouble breathing or rapidly spreading swelling, seek emergency medical care now." };
  if (/pain|ache|hurt|broken|crack/.test(text)) return { service: "consultation", answer: "Let's start with an examination so a dentist can understand the pain and explain your options." };
  if (/clean|scale|tartar|polish/.test(text)) return { service: "scaling", answer: "A cleaning visit may fit. The dentist can confirm what's right for you." };
  if (/white|stain|bright/.test(text)) return { service: "whitening", answer: "Interested in a brighter smile? You can start with a whitening visit." };
  if (/brace|align|straight/.test(text)) return { service: "braces", answer: "An orthodontic visit is a good place to discuss straighter teeth." };
  return { service: "consultation", answer: "Thanks for telling me. A consultation is a good first step when you're not sure what to book." };
}

export function VisitJourney() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const reducedMotion = useReducedMotion();
  const suggestion = message ? suggestService(message) : null;

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessage(trimmed);
    setInput("");
  }

  return (
    <section className="pt-20" aria-labelledby="visit-story-title">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <motion.div initial={reducedMotion ? false : { opacity: 0, x: -44 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
          <p className="font-hero text-sm uppercase text-primary">A visit with Caddy</p>
          <h2 id="visit-story-title" className="mt-2 max-w-xl font-hero text-4xl uppercase leading-tight sm:text-5xl">From “I’m not sure” to “I’ve got this.”</h2>
        </motion.div>
        <motion.p initial={reducedMotion ? false : { opacity: 0, x: 44 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: 0.1 }} className="max-w-xs text-sm text-muted-foreground">A little help at every turn, from the first question to the next step.</motion.p>
      </div>

      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {scenes.map((scene, i) => (
          <motion.li
            key={scene.number}
            initial={reducedMotion ? false : { opacity: 0, y: 46, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: reducedMotion ? 0 : i * 0.12, duration: 0.55, type: "spring", stiffness: 150, damping: 18 }}
            whileHover={reducedMotion ? {} : { y: -7 }}
            className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className={`relative grid h-40 place-items-center overflow-hidden rounded-md ${scene.tone}`}>
              <span className="absolute left-3 top-2 font-hero text-xl text-foreground/50">{scene.number}</span>
              <img src={scene.image} alt="" width={816} height={816} loading="lazy" className="h-40 w-40 object-contain transition-transform duration-500 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-3" />
            </div>
            <h3 className="mt-4 text-lg font-extrabold leading-tight">{scene.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{scene.story}</p>
            {scene.to === "talk" ? (
              <Button type="button" variant="link" onClick={scrollToCaddy} className="mt-auto h-11 justify-start px-0 font-extrabold">{scene.action}<ChevronRight aria-hidden /></Button>
            ) : (
              <Button asChild variant="link" className="mt-auto h-11 justify-start px-0 font-extrabold"><Link to={scene.to}>{scene.action}<ChevronRight aria-hidden /></Link></Button>
            )}
          </motion.li>
        ))}
      </ol>

      <div id="caddy-guide" className="mt-8 grid scroll-mt-28 gap-6 border-y border-border py-7 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <div className="flex items-center gap-2 text-primary"><MessageCircle aria-hidden className="size-5" /><span className="text-xs font-extrabold uppercase">Talk to Caddy</span></div>
          <h3 className="mt-2 text-2xl font-extrabold">What’s on your mind?</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">Tell me what’s bothering you, or just say what kind of visit you’re looking for.</p>
          <p className="mt-3 text-xs text-muted-foreground">Demo guide · a simple suggestion, not a live chat or medical advice. Your words aren’t saved.</p>
          <Button asChild variant="outline" className="mt-5 h-11 font-extrabold"><Link to="/book"><CalendarDays aria-hidden /> Book appointment</Link></Button>
        </div>
        <div aria-live="polite">
          {suggestion && (
            <div className="mb-3 border-l-4 border-primary bg-primary/10 px-4 py-3 text-sm">
              <p className="font-bold">Caddy says</p>
              <p className="mt-1">{suggestion.answer}</p>
              <Link to="/book" search={{ service: suggestion.service }} className="mt-3 inline-flex min-h-11 items-center gap-2 font-extrabold text-primary underline-offset-4 hover:underline">
                Continue to appointment <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          )}
          <form onSubmit={send} className="flex items-end gap-2">
            <label htmlFor="caddy-message" className="sr-only">Tell Caddy about your visit</label>
            <textarea
              id="caddy-message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={240}
              rows={2}
              placeholder="E.g. My tooth hurts, but I don’t know what I need…"
              className="min-h-16 min-w-0 flex-1 resize-none rounded-md border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button type="submit" size="icon" aria-label="Send to Caddy" title="Send to Caddy" disabled={!input.trim()} className="size-11 shrink-0 rounded-md">
              <Send aria-hidden className="size-4" />
            </Button>
          </form>
          <Link to="/book" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary underline-offset-4 hover:underline">Or go straight to booking <ArrowRight aria-hidden className="size-4" /></Link>
        </div>
      </div>
    </section>
  );
}