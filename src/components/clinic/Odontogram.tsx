import { motion } from "motion/react";
import { useState } from "react";

/** Interactive permanent-tooth odontogram (FDI numbering) — demo data only. */
type Finding = "healthy" | "caries" | "filled" | "crown" | "missing" | "planned";
const SURFACES = ["Mesial", "Occlusal", "Distal", "Buccal", "Lingual"] as const;

const FINDING_STYLE: Record<Finding, { fill: string; label: string }> = {
  healthy: { fill: "var(--card)", label: "Healthy" },
  caries: { fill: "var(--ember)", label: "Caries" },
  filled: { fill: "var(--care)", label: "Filled" },
  crown: { fill: "var(--gold)", label: "Crown" },
  missing: { fill: "var(--cream-deep)", label: "Missing" },
  planned: { fill: "color-mix(in oklab, var(--care) 35%, var(--card))", label: "Planned" },
};

const UPPER = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const LOWER = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

const PREVIOUS: Record<number, Finding> = { 16: "filled", 26: "crown", 38: "missing", 46: "filled" };
const INITIAL: Record<number, Finding> = { ...PREVIOUS, 36: "caries", 24: "caries", 46: "planned" };

export function Odontogram() {
  const [findings, setFindings] = useState<Record<number, Finding>>(INITIAL);
  const [sel, setSel] = useState<number>(36);
  const [surfaces, setSurfaces] = useState<Record<number, string[]>>({ 36: ["Occlusal"] });
  const [compare, setCompare] = useState(false);
  const shown = compare ? PREVIOUS : findings;

  const tooth = (n: number) => {
    const f = shown[n] ?? "healthy";
    const on = sel === n;
    const molar = [8, 7, 6].includes(n % 10);
    return (
      <motion.button
        key={n}
        type="button"
        onClick={() => setSel(n)}
        aria-pressed={on}
        aria-label={`Tooth ${n}: ${FINDING_STYLE[f].label}`}
        animate={{ scale: on ? 1.12 : 1 }}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className={`flex min-h-11 flex-col items-center gap-0.5 rounded-xl p-0.5 ${on ? "ring-2 ring-primary" : ""}`}
      >
        <span
          className="block rounded-lg border border-foreground/25"
          style={{ background: FINDING_STYLE[f].fill, width: molar ? 22 : 16, height: 26, opacity: f === "missing" ? 0.45 : 1 }}
        />
        <span className="text-[9px] font-bold text-muted-foreground">{n}</span>
      </motion.button>
    );
  };

  const cur = findings[sel] ?? "healthy";
  const curSurf = surfaces[sel] ?? [];

  return (
    <section className="glass-card rounded-3xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-extrabold">Odontogram · permanent teeth</h2>
        <label className="flex items-center gap-2 text-xs font-bold">
          <input type="checkbox" checked={compare} onChange={(e) => setCompare(e.target.checked)} className="accent-[var(--care)]" />
          Show previous visit (demo)
        </label>
      </div>
      <div className="mt-4 overflow-x-auto">
        <div className="mx-auto w-max space-y-3">
          <div className="flex gap-0.5">{UPPER.map(tooth)}</div>
          <div className="h-px bg-border" />
          <div className="flex gap-0.5">{LOWER.map(tooth)}</div>
        </div>
      </div>
      <ul className="mt-3 flex flex-wrap gap-3 text-[11px] font-bold" aria-label="Legend">
        {Object.entries(FINDING_STYLE).map(([k, v]) => (
          <li key={k} className="flex items-center gap-1">
            <span className="size-3 rounded border border-foreground/25" style={{ background: v.fill }} /> {v.label}
          </li>
        ))}
      </ul>
      <motion.div key={sel} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl bg-secondary/60 p-4" aria-live="polite">
        <p className="text-sm font-extrabold">
          Tooth {sel} — {FINDING_STYLE[cur].label}
          {curSurf.length > 0 && <span className="font-semibold text-muted-foreground"> · {curSurf.join(", ")}</span>}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(Object.keys(FINDING_STYLE) as Finding[]).map((f) => (
            <button key={f} type="button" disabled={compare} onClick={() => setFindings({ ...findings, [sel]: f })} aria-pressed={cur === f} className={`min-h-9 rounded-full px-3 text-xs font-bold disabled:opacity-50 ${cur === f ? "bg-primary text-primary-foreground" : "bg-card"}`}>
              {FINDING_STYLE[f].label}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {SURFACES.map((s) => {
            const on = curSurf.includes(s);
            return (
              <button key={s} type="button" disabled={compare} aria-pressed={on} onClick={() => setSurfaces({ ...surfaces, [sel]: on ? curSurf.filter((x) => x !== s) : [...curSurf, s] })} className={`min-h-9 rounded-full border px-3 text-xs font-bold disabled:opacity-50 ${on ? "border-primary text-primary" : "border-border"}`}>
                {s}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">Draft finding — saved only when the dentist signs the examination note.</p>
      </motion.div>
    </section>
  );
}
