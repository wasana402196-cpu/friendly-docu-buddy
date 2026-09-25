import { motion, useReducedMotion } from "motion/react";

/** Crescent & Pearl brand tooth mark — gentle stroke reveal on first load. */
export function ToothMark({ className = "size-9" }: { className?: string }) {
  const calm = useReducedMotion();
  return (
    <span
      className={`grid place-items-center rounded-2xl text-primary-foreground ${className}`}
      style={{ background: "var(--gradient-care)" }}
    >
      <svg viewBox="0 0 24 24" className="size-[62%]" fill="none" aria-hidden>
        <motion.path
          d="M12 5.5c-1.6-1.4-3.6-2-5.4-1.2C4.4 5.2 4 7.8 4.7 10.3c.5 1.8 1 3.4 1.3 5.4.3 2 .6 4.3 1.9 4.3 1.6 0 1.5-4.4 4.1-4.4s2.5 4.4 4.1 4.4c1.3 0 1.6-2.3 1.9-4.3.3-2 .8-3.6 1.3-5.4.7-2.5.3-5.1-1.9-6-1.8-.8-3.8-.2-5.4 1.2Z"
          stroke="currentColor"
          strokeWidth={1.9}
          strokeLinejoin="round"
          initial={calm ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <motion.circle
          cx="15.4"
          cy="8"
          r="1.3"
          fill="var(--gold)"
          initial={calm ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 400, damping: 14 }}
        />
      </svg>
    </span>
  );
}
