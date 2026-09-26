import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Moon, Sun, Sunrise } from "lucide-react";

export type DayPick = { key: string; date: Date };

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const ALL = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "15:00", "15:30", "16:00", "16:30", "17:00", "18:00", "18:30", "19:00", "19:30"];

const keyOf = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

/** Deterministic synthetic availability per date (demo only). */
export function slotsFor(d: Date) {
  if (d.getDay() === 0) return [];
  const seed = d.getDate() * 7 + d.getMonth() * 13;
  return ALL.filter((_, i) => (seed + i * 5) % 4 !== 0);
}

const GROUPS = [
  { label: "Morning", icon: Sunrise, test: (t: string) => Number(t.slice(0, 2)) < 13 },
  { label: "Afternoon", icon: Sun, test: (t: string) => { const h = Number(t.slice(0, 2)); return h >= 13 && h < 18; } },
  { label: "Evening", icon: Moon, test: (t: string) => Number(t.slice(0, 2)) >= 18 },
];

export function BookingCalendar({ value, slot, onDay, onSlot }: { value: DayPick | null; slot: string; onDay: (d: DayPick) => void; onSlot: (s: string) => void }) {
  const [today, setToday] = useState<Date | null>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => { const t = new Date(); t.setHours(0, 0, 0, 0); setToday(t); }, []);

  const cells = useMemo(() => {
    if (!today) return [];
    const first = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const lead = (first.getDay() + 6) % 7;
    const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    return [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => new Date(first.getFullYear(), first.getMonth(), i + 1))] as (Date | null)[];
  }, [today, offset]);

  if (!today) return <div className="mt-4 h-72 animate-pulse rounded-3xl bg-secondary/60" />;
  const monthDate = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const max = new Date(today); max.setDate(max.getDate() + 45);
  const slots = value ? slotsFor(value.date) : [];

  return (
    <div className="mt-4 grid gap-5 md:grid-cols-[1.05fr_1fr]">
      <div className="rounded-3xl bg-card/70 p-4">
        <div className="flex items-center justify-between">
          <button type="button" aria-label="Previous month" disabled={offset === 0} onClick={() => setOffset(offset - 1)} className="grid size-10 place-items-center rounded-full hover:bg-secondary disabled:opacity-30"><ChevronLeft className="size-4" /></button>
          <p className="font-extrabold">{monthDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p>
          <button type="button" aria-label="Next month" disabled={offset === 1} onClick={() => setOffset(offset + 1)} className="grid size-10 place-items-center rounded-full hover:bg-secondary disabled:opacity-30"><ChevronRight className="size-4" /></button>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase text-muted-foreground">{WEEK.map((w) => <span key={w}>{w}</span>)}</div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (!d) return <span key={`e${i}`} />;
            const k = keyOf(d);
            const off = d < today || d > max || d.getDay() === 0;
            const on = value?.key === k;
            const isToday = keyOf(today) === k;
            const count = off ? 0 : slotsFor(d).length;
            return (
              <motion.button key={k} type="button" whileTap={off ? {} : { scale: 0.9 }} disabled={off} onClick={() => onDay({ key: k, date: d })} aria-pressed={on} aria-label={d.toDateString()}
                className={`relative grid aspect-square place-items-center rounded-xl text-sm font-bold transition-colors ${on ? "bg-primary text-primary-foreground" : off ? "text-muted-foreground/40 line-through" : "hover:bg-primary/10"} ${isToday && !on ? "ring-2 ring-primary/40" : ""}`}>
                {d.getDate()}
                {!off && <span className={`absolute bottom-1 size-1 rounded-full ${on ? "bg-primary-foreground" : count > 8 ? "bg-primary" : "bg-accent"}`} />}
              </motion.button>
            );
          })}
        </div>
        <p className="mt-3 flex gap-3 text-[11px] text-muted-foreground"><span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-primary" /> Plenty free</span><span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-accent" /> Filling up</span></p>
      </div>

      <div>
        {!value ? (
          <p className="grid h-full min-h-40 place-items-center rounded-3xl border-2 border-dashed border-border p-6 text-center text-sm text-muted-foreground">Tap a date to see open times.</p>
        ) : (
          <motion.div key={value.key} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="font-extrabold">{value.date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</p>
            {GROUPS.map((g) => {
              const list = slots.filter(g.test);
              if (!list.length) return null;
              return (
                <div key={g.label} className="mt-3">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground"><g.icon aria-hidden className="size-3.5" />{g.label}</p>
                  <div className="mt-1.5 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {list.map((t) => (
                      <motion.button key={t} type="button" whileTap={{ scale: 0.95 }} onClick={() => onSlot(t)} aria-pressed={slot === t}
                        className={`min-h-11 rounded-2xl text-sm font-extrabold ${slot === t ? "btn-3d bg-primary text-primary-foreground" : "bg-card/70 hover:bg-primary/10"}`}>{t}</motion.button>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
