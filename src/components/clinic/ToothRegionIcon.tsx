import { motion } from "motion/react";
import type { ToothRegion } from "@/lib/clinic-data";

/**
 * Small arch of 8 teeth; the service's region gets a restrained pulse
 * when the parent card is hovered (variant "hover").
 */
const TEETH = [0, 1, 2, 3, 4, 5, 6, 7];
function active(region: ToothRegion, i: number) {
  if (region === "all" || region === "gum") return true;
  if (region === "front") return i >= 2 && i <= 5;
  return i <= 1 || i >= 6;
}

export function ToothRegionIcon({ region }: { region: ToothRegion }) {
  return (
    <svg viewBox="0 0 64 36" className="h-9 w-16 shrink-0" aria-hidden>
      {region === "gum" && (
        <path d="M4 10 Q32 -4 60 10" stroke="var(--ember)" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {TEETH.map((i) => {
        const x = 4 + i * 7.3;
        const y = 12 + Math.abs(3.5 - i) * 2.2;
        const on = active(region, i);
        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width="6"
            height={i >= 2 && i <= 5 ? 11 : 9}
            rx="2.5"
            fill={on ? "var(--care)" : "var(--cream-deep)"}
            stroke="var(--charcoal)"
            strokeOpacity={0.25}
            variants={on ? { hover: { scale: [1, 1.18, 1], transition: { duration: 0.6 } } } : {}}
            style={{ transformOrigin: `${x + 3}px ${y + 5}px` }}
          />
        );
      })}
    </svg>
  );
}
