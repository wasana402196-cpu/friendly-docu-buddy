import { createFileRoute, Link } from "@tanstack/react-router";
import { DemoBadge, PageHeader, PageShell, Reveal } from "@/components/caddy/PageShell";
import { SERVICES, priceLabel } from "@/lib/clinic-data";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Indicative pricing (PKR) — Crescent & Pearl Dental" },
      { name: "description", content: "Transparent indicative dental rates in Pakistani rupees, with duration and consultation requirements." },
      { property: "og:title", content: "Indicative pricing — Crescent & Pearl Dental" },
      { property: "og:description", content: "Every treatment's indicative PKR rate in one clear table." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Pricing"
        title="Indicative rates, no surprises"
        lead="“From” means the final cost depends on examination, imaging, material, tooth position or number of stages. You approve an itemized estimate before any treatment."
      />
      <Reveal className="glass-card overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <p className="text-sm font-extrabold">Treatment rates</p>
          <DemoBadge>Fictional demo rates</DemoBadge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Service</th>
                <th className="px-5 py-3">Duration</th>
                <th className="px-5 py-3">Consultation</th>
                <th className="px-5 py-3 text-right">Indicative rate</th>
                <th className="px-5 py-3"><span className="sr-only">Book</span></th>
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-5 py-3 font-bold">{s.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{s.duration}</td>
                  <td className="px-5 py-3 text-muted-foreground">{s.consultRequired ? "Required" : "Not needed"}</td>
                  <td className="px-5 py-3 text-right font-extrabold">{priceLabel(s)}</td>
                  <td className="px-5 py-3 text-right">
                    <Link to="/book" search={{ service: s.id }} className="font-bold text-primary hover:underline">Book</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
      <p className="mt-4 text-xs text-muted-foreground">
        Tax, deposits and final fees are set by the clinic owner before publication. Booking never promises a diagnosis or final price.
      </p>
    </PageShell>
  );
}
