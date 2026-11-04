import Link from 'next/link';
import {
  BadgeCheck, PenLine, Gauge, Crown, ChevronRight, Headset, CircleHelp, BookOpen, Info, FileText, Lock, Scale, LogOut, Smartphone, ShieldCheck,
} from 'lucide-react';
import { Card, Eyebrow } from '@/components/app/ui';
import { APP_USER, APP_LINKS, shortDate } from '@/data/app';
import { BRAND_INFO } from '@/data/brand';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const u = APP_USER;
  const steps = [
    { label: 'KYC', done: u.kycComplete, icon: BadgeCheck, body: 'Complete your KYC in under a minute' },
    { label: 'eSign agreement', done: u.esignComplete, icon: PenLine, body: 'Sign the advisory agreement' },
    { label: 'Risk profile', done: u.riskProfileComplete, icon: Gauge, body: 'Answer a few quick questions' },
  ];
  const pending = steps.filter((s) => !s.done).length;

  const groups: { title: string; links: { label: string; href: string; icon: typeof Info; external?: boolean }[] }[] = [
    { title: 'Account', links: [
      { label: 'Plans & billing', href: '/app/plans', icon: Crown },
    ] },
    { title: 'Help', links: [
      { label: 'Help & support', href: APP_LINKS.helpSupport, icon: Headset, external: true },
      { label: 'FAQs', href: APP_LINKS.faq, icon: CircleHelp, external: true },
      { label: 'How portfolios work', href: APP_LINKS.portfolioHelp, icon: BookOpen, external: true },
    ] },
    { title: 'About', links: [
      { label: 'About MyAdvisorAlpha', href: '/about', icon: Info },
      { label: 'Terms & conditions', href: '/legal/terms-and-conditions', icon: FileText },
      { label: 'Privacy policy', href: '/legal/privacy-policy', icon: Lock },
      { label: 'Grievance redressal', href: '/legal/grievance-redressal-escalation-matrix', icon: Scale },
    ] },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr] items-start">
      <div className="flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-[20px] bg-[#081026] text-white p-5 border border-[#F5BA31]/60">
          <div aria-hidden className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-[#F5BA31]/15 blur-[70px]" />
          <div className="relative flex items-center gap-4">
            <span className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1E2A4A] to-[#0B1320] ring-2 ring-[#F5BA31]/60 text-[#F5BA31] text-xl font-extrabold flex items-center justify-center">{u.firstName.charAt(0)}</span>
            <div>
              <div className="text-xl font-extrabold">{u.firstName}</div>
              <div className="text-sm text-white/60">{u.stockPlan.name} · till {shortDate(u.stockPlan.endDate)}</div>
            </div>
          </div>
          <Link href="/app/plans" className="relative mt-4 flex items-center justify-between rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 hover:bg-white/[0.1]">
            <span className="text-sm font-semibold">{u.stockPlan.remainingDays} days left on your plan</span>
            <span className="text-sm font-extrabold text-[#F5BA31] inline-flex items-center gap-1">Renew<ChevronRight className="w-4 h-4" /></span>
          </Link>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <Eyebrow>Finish setting up</Eyebrow>
            <span className="text-xs font-extrabold text-[#C98F1E]">{pending} of {steps.length} pending</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-[#E7ECF6] overflow-hidden"><div className="h-full bg-[#279D46]" style={{ width: `${((steps.length - pending) / steps.length) * 100}%` }} /></div>
          <ul className="mt-3 divide-y divide-[#E8EBF0]">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label} className="flex items-center gap-3 py-3">
                  <span className={cn('w-9 h-9 rounded-xl flex items-center justify-center', s.done ? 'bg-[#E3F5E7] text-[#1E7A35]' : 'bg-[#FFF6E3] text-[#C98F1E]')}><Icon className="w-[18px] h-[18px]" /></span>
                  <span className="flex-1"><span className="block text-sm font-extrabold">{s.label}</span><span className="text-xs text-[#6B7381]">{s.done ? 'Completed' : s.body}</span></span>
                  {!s.done && <a href={BRAND_INFO.deepLinks.webLogin} target="_blank" rel="noopener noreferrer" className="h-8 px-3 rounded-lg bg-[#154198] text-white text-xs font-bold flex items-center">Complete</a>}
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <Smartphone className="w-8 h-8 text-[#154198] flex-none" />
          <div className="flex-1"><div className="text-sm font-extrabold">Get the mobile app</div><div className="text-xs text-[#6B7381]">Alerts on exits, targets and stop losses</div></div>
          <div className="flex flex-col gap-1.5">
            <a href={APP_LINKS.playStore} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#154198] hover:underline">Android</a>
            <a href={APP_LINKS.appStore} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#154198] hover:underline">iOS</a>
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        {groups.map((g) => (
          <Card key={g.title} className="p-2">
            <div className="px-3 pt-2 pb-1"><Eyebrow>{g.title}</Eyebrow></div>
            {g.links.map((l) => {
              const Icon = l.icon;
              const inner = (
                <>
                  <span className="w-9 h-9 rounded-xl bg-[#EEF3FE] text-[#154198] flex items-center justify-center"><Icon className="w-[18px] h-[18px]" /></span>
                  <span className="flex-1 text-[14.5px] font-bold">{l.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#8D95A3]" />
                </>
              );
              const cls = 'flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-[#F5F7FC]';
              return l.external
                ? <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                : <Link key={l.label} href={l.href} className={cls}>{inner}</Link>;
            })}
          </Card>
        ))}
        <Link href="/" className="flex items-center justify-center gap-2 h-12 rounded-xl border border-[#F3C2BC] bg-white text-[#B02121] text-sm font-extrabold hover:bg-[#FDECEC]"><LogOut className="w-4 h-4" />Log out</Link>
        <div className="flex gap-3 text-[11.5px] text-[#6B7381] leading-relaxed px-1">
          <ShieldCheck className="w-5 h-5 text-[#154198] flex-none" />
          <p>{BRAND_INFO.legalEntity} · SEBI RA {BRAND_INFO.sebiRegNo} · BSE {BRAND_INFO.bseEnlistmentNo} · AMFI {BRAND_INFO.amfiArn}. Support: {BRAND_INFO.contact.supportEmail} · {BRAND_INFO.contact.phone}</p>
        </div>
      </div>
    </div>
  );
}
