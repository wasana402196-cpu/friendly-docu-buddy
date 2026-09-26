import { AnimatePresence, motion } from "motion/react";
import { Building2, Smartphone, Store, Wallet } from "lucide-react";
import { DemoBadge } from "@/components/caddy/PageShell";

export type PayState = { method: "" | "counter" | "online"; provider: string };

const PROVIDERS = [
  { id: "JazzCash", icon: Smartphone, label: "Account number", value: "03XX-XXXXXXX", note: "Send to this JazzCash mobile account" },
  { id: "Easypaisa", icon: Wallet, label: "Till ID", value: "DEMO-000000", note: "Pay via Easypaisa app → Pay at Till" },
  { id: "Bank transfer", icon: Building2, label: "IBAN", value: "PK00 DEMO 0000 0000 0000 0000", note: "Account title: Crescent & Pearl Dental (demo)" },
];

/** Decorative demo QR (not scannable to any real account). */
function DemoQr({ seed }: { seed: string }) {
  const n = 21;
  let h = [...seed].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) | 0, 7);
  const cells: [number, number][] = [];
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x > n - 8 && y < 7) || (x < 7 && y > n - 8);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    h = (Math.imul(h, 1103515245) + 12345) & 0x7fffffff;
    if (!finder(x, y) && (h >> 16) % 2) cells.push([x, y]);
  }
  const eye = (x: number, y: number) => (
    <g key={`${x}${y}`}><rect x={x} y={y} width={7} height={7} fill="currentColor" /><rect x={x + 1} y={y + 1} width={5} height={5} fill="var(--card)" /><rect x={x + 2} y={y + 2} width={3} height={3} fill="currentColor" /></g>
  );
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} className="size-36 rounded-xl bg-card p-1 text-foreground" role="img" aria-label="Demo QR code, not payable">
      {cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />)}
      {eye(0, 0)}{eye(n - 7, 0)}{eye(0, n - 7)}
    </svg>
  );
}

export function PaymentChoice({ value, onChange, amount }: { value: PayState; onChange: (v: PayState) => void; amount: string }) {
  const provider = PROVIDERS.find((p) => p.id === value.provider);
  const opt = (on: boolean) => `flex min-h-16 flex-1 items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors ${on ? "border-primary bg-primary/10" : "border-border bg-card/60 hover:border-primary/40"}`;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between gap-2">
        <p className="font-extrabold">How would you like to pay?</p>
        <DemoBadge>Demo payment details</DemoBadge>
      </div>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button type="button" aria-pressed={value.method === "counter"} onClick={() => onChange({ method: "counter", provider: "" })} className={opt(value.method === "counter")}>
          <Store aria-hidden className="size-6 text-primary" />
          <span><span className="block text-sm font-extrabold">Pay at the counter</span><span className="block text-xs text-muted-foreground">Cash or card on arrival</span></span>
        </button>
        <button type="button" aria-pressed={value.method === "online"} onClick={() => onChange({ method: "online", provider: value.provider })} className={opt(value.method === "online")}>
          <Smartphone aria-hidden className="size-6 text-accent" />
          <span><span className="block text-sm font-extrabold">Pay online now</span><span className="block text-xs text-muted-foreground">JazzCash, Easypaisa or bank</span></span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {value.method === "online" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="mt-3 flex flex-wrap gap-2">
              {PROVIDERS.map((p) => (
                <button key={p.id} type="button" aria-pressed={value.provider === p.id} onClick={() => onChange({ method: "online", provider: p.id })}
                  className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold ${value.provider === p.id ? "bg-primary text-primary-foreground" : "bg-card/70"}`}>
                  <p.icon aria-hidden className="size-4" />{p.id}
                </button>
              ))}
            </div>
            {provider && (
              <motion.div key={provider.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-col items-center gap-4 rounded-3xl bg-secondary/60 p-4 sm:flex-row">
                <DemoQr seed={provider.id} />
                <div className="min-w-0 text-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{provider.label}</p>
                  <p className="break-all font-hero text-xl tracking-wide">{provider.value}</p>
                  <p className="mt-1 text-muted-foreground">{provider.note}</p>
                  <p className="mt-2 font-extrabold">Amount: {amount}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Placeholder details — the clinic will add its real account. Keep your receipt and show it at reception.</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {value.method === "counter" && <p className="mt-3 text-sm text-muted-foreground">No payment now. Pay {amount} (indicative) at reception after your visit.</p>}
    </div>
  );
}
