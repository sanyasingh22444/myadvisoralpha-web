import Link from 'next/link';
import { ArrowRight, Activity, Layers, Headset } from 'lucide-react';
import { PageTitle, Card } from '@/components/app/ui';
import { APP_USER, APP_LINKS, PORTFOLIO_PLANS, rupees, shortDate } from '@/data/app';
import PlanPicker from './PlanPicker';

export default function PlansPage() {
  const plan = APP_USER.stockPlan;
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Plans" sub={<>You&apos;re on <b>{plan.name}</b> ({plan.durationMonths} months) · active till {shortDate(plan.endDate)} · {plan.remainingDays} days left</>} />

      <PlanPicker />

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5 flex flex-col gap-2">
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#154198]">Stock portfolios</span>
          <h3 className="text-lg font-extrabold">Model portfolio plans from {rupees(Math.min(...PORTFOLIO_PLANS.flatMap((p) => p.durations.map((d) => d.price))))}</h3>
          <p className="text-sm text-[#4A525F]">{PORTFOLIO_PLANS.map((p) => p.name).join(' · ')}</p>
          <Link href="/app/advisory/portfolios" className="mt-2 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#154198]">Compare portfolio plans<ArrowRight className="w-4 h-4" /></Link>
        </Card>
        <Card className="p-5 flex flex-col gap-2">
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#C98F1E]">New</span>
          <h3 className="text-lg font-extrabold flex items-center gap-2"><Activity className="w-5 h-5 text-[#154198]" />Futures &amp; <Layers className="w-5 h-5 text-[#154198]" />MTF Baskets</h3>
          <p className="text-sm text-[#4A525F]">Talk to our team about access to futures calls and MTF baskets.</p>
          <a href={APP_LINKS.helpSupport} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#154198]"><Headset className="w-4 h-4" />Talk to an expert</a>
        </Card>
      </div>
    </div>
  );
}
