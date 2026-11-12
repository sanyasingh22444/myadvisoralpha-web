import Link from 'next/link';
import { ArrowRight, CircleCheck, Target, Repeat, Landmark, ShieldCheck } from 'lucide-react';
import { PageTitle, Card } from '@/components/app/ui';
import { APP_LINKS } from '@/data/app';
import { BRAND_INFO } from '@/data/brand';

const STEPS = [
  { icon: Target, title: 'Pick a goal', body: 'Wealth creation, tax saving, a child’s education or retirement — each goal has its own basket.' },
  { icon: Repeat, title: 'Start a SIP in 2 minutes', body: 'Choose a monthly amount and date. Pause or stop any time.' },
  { icon: Landmark, title: 'Money goes straight to the AMC', body: 'Orders run on ONDC; your units are held in your name with the fund house.' },
];

export default function MutualFundsPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Mutual Funds" sub="Goal-based mutual fund baskets, handpicked by our research team." />

      <div className="relative overflow-hidden rounded-[20px] bg-[#081026] text-white border border-[#F5BA31]/60 p-6 sm:p-8">
        <div aria-hidden className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-[#F5BA31]/15 blur-[90px]" />
        <div className="relative max-w-xl">
          <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#F5BA31]">Powered by ONDC</span>
          <h2 className="mt-2 text-[28px] sm:text-[34px] leading-tight font-extrabold tracking-[-0.02em]">Find your Alpha in <span className="text-[#F5BA31]">Mutual Funds</span></h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/80">
            {['Handpicked funds, grouped by goal', 'Start a SIP in 2 minutes', 'Your money goes straight to the AMC'].map((t) => (
              <li key={t} className="flex gap-2.5"><CircleCheck className="w-5 h-5 text-[#F5BA31] flex-none" />{t}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/mutual-funds" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] text-sm font-bold">Explore mutual funds<ArrowRight className="w-4 h-4" /></Link>
            <a href={APP_LINKS.playStore} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-11 px-5 rounded-xl border border-white/25 text-sm font-semibold hover:bg-white/[0.06]">Get the Android app</a>
            <a href={APP_LINKS.appStore} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-11 px-5 rounded-xl border border-white/25 text-sm font-semibold hover:bg-white/[0.06]">Get the iOS app</a>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={s.title} className="p-5">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#EEF3FE] text-[#154198] flex items-center justify-center"><Icon className="w-5 h-5" /></span>
                <span className="text-xs font-extrabold text-[#8D95A3]">STEP {i + 1}</span>
              </div>
              <h3 className="mt-3 text-base font-extrabold">{s.title}</h3>
              <p className="mt-1 text-[13.5px] text-[#4A525F] leading-relaxed">{s.body}</p>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center gap-3 rounded-[14px] bg-white border border-[#93C5FD] p-4 text-[11.5px] text-[#6B7381]">
        <ShieldCheck className="w-5 h-5 text-[#154198] flex-none" />
        <p>AMFI Registered Mutual Fund Distributor {BRAND_INFO.amfiArn}. Mutual fund investments are subject to market risks; read all scheme-related documents carefully.</p>
      </div>
    </div>
  );
}
