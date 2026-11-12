'use client';

import { useEffect, useState } from 'react';
import { FileText, Info, LayoutList, Table2, ArrowUpRight, CircleCheck, CircleX, Target } from 'lucide-react';
import { TRACK_RECORD, isHit, holdingDays, dateTime, price, shortDate, type ClosedIdea } from '@/data/app';
import { BRAND_INFO } from '@/data/brand';
import { cn } from '@/lib/utils';
import { Card, LogoTile, Sheet, TermChip, Segmented, mono, GAIN, LOSS } from '../ui';

const PAGE = 12;
const signed = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(2)}%`;

function Outcome({ idea }: { idea: ClosedIdea }) {
  if (idea.gainPercentage > 0) return <span className="inline-flex items-center gap-1 text-[11.5px] font-extrabold text-[#0F5C2C] bg-[#E7F5EC] rounded-md px-2 py-[3px]"><CircleCheck className="w-3 h-3" />Profit booked</span>;
  if (idea.gainPercentage === 0) return <span className="text-[11.5px] font-extrabold text-[#1E3A8A] bg-[#E8EDFB] rounded-md px-2 py-[3px]">Closed at cost</span>;
  return <span className="inline-flex items-center gap-1 text-[11.5px] font-extrabold text-[#8A1C12] bg-[#FDECEA] rounded-md px-2 py-[3px]"><CircleX className="w-3 h-3" />Exited at a loss</span>;
}

/** Date / Action / Price rows: Buy at launch, optional Buy more, Exit full. */
function Timeline({ idea, compact = false }: { idea: ClosedIdea; compact?: boolean }) {
  const rows = [
    { at: idea.launchedAt, action: 'Buy', price: idea.launchedPrice },
    ...(idea.buyMore ? [{ at: idea.buyMore.at, action: 'Buy more', price: idea.buyMore.price }] : []),
    { at: idea.closedAt, action: 'Exit full', price: idea.closedPrice },
  ];
  return (
    <div>
      <div className="grid grid-cols-[1.5fr_1fr_1fr] pb-2 border-b border-[#E8EBF0] text-[11px] font-bold tracking-[0.06em] uppercase text-[#8D95A3]">
        <span>Date</span><span>Action</span><span className="text-right">Price</span>
      </div>
      {rows.map((r) => (
        <div key={r.action} className={cn('grid grid-cols-[1.5fr_1fr_1fr] items-center', compact ? 'pt-2' : 'py-2.5 border-b border-[#F0F2F7] last:border-0')}>
          <span className={cn(mono, 'text-[11.5px] leading-tight text-[#6B7381]')}>
            {r.at ? (() => { const [d, t] = dateTime(r.at).split(', '); return <>{d}<br />{t}</>; })() : '–'}
          </span>
          <span className={cn('text-[13px] font-bold', r.action === 'Exit full' ? 'text-[#B02121]' : 'text-[#0E7F58]')}>{r.action}</span>
          <span className={cn(mono, 'text-[14px] font-semibold text-right')}>{price(r.price)}</span>
        </div>
      ))}
    </div>
  );
}

function NetResult({ idea }: { idea: ClosedIdea }) {
  const up = isHit(idea);
  return (
    <div className={cn('rounded-[10px] py-2 px-3 text-center text-sm font-extrabold', up ? 'bg-[#E3F5E7]' : 'bg-[#FDECEC]')} style={{ color: up ? GAIN : LOSS }}>
      Net {idea.gainPercentage >= 0 ? 'gain' : 'loss'}: {signed(idea.gainPercentage)} in {holdingDays(idea)} day{holdingDays(idea) === 1 ? '' : 's'}
    </div>
  );
}

export default function ClosedIdeas({ ideas }: { ideas: ClosedIdea[] }) {
  const [view, setView] = useState<'list' | 'table'>('list');
  const [shown, setShown] = useState(PAGE);
  const [about, setAbout] = useState<ClosedIdea | null>(null);
  // Back to the first page whenever the filtered set changes (filters or search).
  const signature = ideas.map((i) => i.id).join();
  useEffect(() => { setShown(PAGE); }, [signature]);
  const misses = TRACK_RECORD.totalClosed - TRACK_RECORD.totalWinning;
  const page = ideas.slice(0, shown);

  return (
    <div className="flex flex-col gap-4">
      {/* Hit / accuracy / miss */}
      <Card className="p-4 grid grid-cols-3 sm:grid-cols-5 gap-3 items-center">
        <div className="flex flex-col"><span className="text-xs font-semibold text-[#6B7381]">Hit</span><span className={cn(mono, 'text-xl font-semibold')} style={{ color: GAIN }}>{TRACK_RECORD.totalWinning}</span></div>
        <div className="flex flex-col items-center"><span className="text-xs font-semibold text-[#6B7381]">Accuracy</span><span className={cn(mono, 'text-xl font-semibold')}>{TRACK_RECORD.hitRatePercentage.toFixed(1)}%</span></div>
        <div className="flex flex-col items-end sm:items-center"><span className="text-xs font-semibold text-[#6B7381]">Miss</span><span className={cn(mono, 'text-xl font-semibold')} style={{ color: LOSS }}>{misses}</span></div>
        <div className="hidden sm:flex flex-col items-center"><span className="text-xs font-semibold text-[#6B7381]">Avg. return</span><span className={cn(mono, 'text-xl font-semibold')} style={{ color: GAIN }}>+{TRACK_RECORD.averageProfitPercentage.toFixed(1)}%</span></div>
        <div className="hidden sm:flex flex-col items-end"><span className="text-xs font-semibold text-[#6B7381]">Avg. holding</span><span className={cn(mono, 'text-xl font-semibold')}>{Math.round(TRACK_RECORD.averageDurationDays)} days</span></div>
        <div className="col-span-3 sm:col-span-5 flex h-2 rounded-full overflow-hidden gap-0.5">
          <div style={{ width: `${(TRACK_RECORD.totalWinning / TRACK_RECORD.totalClosed) * 100}%`, background: '#26A649' }} />
          <div style={{ width: `${(misses / TRACK_RECORD.totalClosed) * 100}%`, background: '#EB4E2C' }} />
        </div>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] font-semibold text-[#6B7381]">{ideas.length} closed idea{ideas.length === 1 ? '' : 's'} · every one published, including losses</span>
        <Segmented className="w-[200px]" value={view} onChange={setView} options={[
          { id: 'list', label: <span className="inline-flex items-center gap-1.5"><LayoutList className="w-3.5 h-3.5" />List</span> },
          { id: 'table', label: <span className="inline-flex items-center gap-1.5"><Table2 className="w-3.5 h-3.5" />Table</span> },
        ]} />
      </div>

      {view === 'list' ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 items-start">
          {page.map((c) => (
            <Card key={c.id} className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <TermChip>{c.category}</TermChip>
                <Outcome idea={c} />
              </div>
              <div className="flex items-center gap-3">
                <LogoTile src={c.logoUrl} label={c.symbol} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="text-base font-extrabold truncate">{c.symbol}</div>
                  <div className="text-xs text-[#8D95A3] truncate">{c.name}</div>
                </div>
                {c.tag && <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#8A6A12] bg-[#FBF3DE] border border-[#EFD9A0] rounded-full px-2 py-0.5">{c.tag}</span>}
              </div>
              <Timeline idea={c} compact />
              <NetResult idea={c} />
              <div className="flex gap-2">
                <button onClick={() => setAbout(c)} className="flex-1 h-10 rounded-[10px] bg-[#1E3A8A] text-white text-sm font-bold hover:bg-[#13235B]">About idea</button>
                {c.reportUrl && (
                  <a href={c.reportUrl} target="_blank" rel="noopener noreferrer" aria-label={`${c.symbol} research report`} className="h-10 px-3.5 rounded-[10px] border border-[#C6D0EC] text-[#13235B] text-sm font-bold flex items-center gap-1.5 hover:bg-[#F4F6F9]"><FileText className="w-4 h-4" />Report</a>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-[13px]">
              <thead className="bg-[#F5F7FC] text-[11px] font-bold uppercase tracking-[0.06em] text-[#6B7381] text-left">
                <tr><th className="px-4 py-3">Stock</th><th className="px-3 py-3">Term</th><th className="px-3 py-3">Entry</th><th className="px-3 py-3 text-right">Avg. entry</th><th className="px-3 py-3">Exit</th><th className="px-3 py-3 text-right">Exit price</th><th className="px-3 py-3 text-right">Return</th><th className="px-3 py-3 text-right">Days</th><th className="px-4 py-3" /></tr>
              </thead>
              <tbody className="divide-y divide-[#E8EBF0]">
                {page.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAFBFE]">
                    <td className="px-4 py-2.5"><button onClick={() => setAbout(c)} className="text-left"><div className="font-extrabold text-[#154198] hover:underline">{c.symbol}</div><div className="text-[11px] text-[#8D95A3] max-w-[160px] truncate">{c.name}</div></button></td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-[#4A525F]">{c.category}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-[#4A525F]">{shortDate(c.launchedDate)}</td>
                    <td className={cn(mono, 'px-3 py-2.5 text-right')}>{price(c.buyPrice)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-[#4A525F]">{shortDate(c.closedDate)}</td>
                    <td className={cn(mono, 'px-3 py-2.5 text-right')}>{price(c.closedPrice)}</td>
                    <td className={cn(mono, 'px-3 py-2.5 text-right font-semibold')} style={{ color: isHit(c) ? GAIN : LOSS }}>{signed(c.gainPercentage)}</td>
                    <td className={cn(mono, 'px-3 py-2.5 text-right text-[#6B7381]')}>{holdingDays(c)}</td>
                    <td className="px-4 py-2.5 text-right">{c.reportUrl && <a href={c.reportUrl} target="_blank" rel="noopener noreferrer" aria-label={`${c.symbol} report`} className="inline-flex text-[#154198]"><FileText className="w-4 h-4" /></a>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {shown < ideas.length && (
        <button onClick={() => setShown((n) => n + PAGE)} className="self-center h-10 px-5 rounded-[10px] border border-[#C6D0EC] bg-white text-sm font-bold text-[#13235B] hover:bg-[#F4F6F9]">
          Show {Math.min(PAGE, ideas.length - shown)} more of {ideas.length - shown}
        </button>
      )}

      <Sheet open={!!about} onClose={() => setAbout(null)} eyebrow="About idea" title={about ? `${about.symbol} · ${about.name}` : ''}>
        {about && <AboutIdea idea={about} />}
      </Sheet>
    </div>
  );
}

/** The closed-idea About panel on its own, for Home. */
export function ClosedAboutSheet({ idea, onClose }: { idea: ClosedIdea | null; onClose: () => void }) {
  return (
    <Sheet open={!!idea} onClose={onClose} eyebrow="About idea" title={idea ? `${idea.symbol} · ${idea.name}` : ''}>
      {idea && <AboutIdea idea={idea} />}
    </Sheet>
  );
}

function AboutIdea({ idea }: { idea: ClosedIdea }) {
  const targeted = idea.targetUpside;
  // Gain on launch price vs the upside targeted at launch.
  const fromLaunch = ((idea.closedPrice - idea.launchedPrice) / idea.launchedPrice) * 100;
  const achieved = targeted ? Math.max(0, Math.min(100, (fromLaunch / targeted) * 100)) : null;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2"><TermChip>{idea.category}</TermChip><Outcome idea={idea} /><span className="text-xs text-[#6B7381]">{idea.sector}</span></div>
      <Timeline idea={idea} />
      <NetResult idea={idea} />

      <div className="grid grid-cols-2 gap-2">
        <Box label="Avg. entry" value={price(idea.buyPrice)} hint={idea.buyMore ? `Launch ${price(idea.launchedPrice)} + buy more` : undefined} />
        <Box label="Exit price" value={price(idea.closedPrice)} />
        <Box label="Targeted upside" value={targeted ? `+${targeted.toFixed(2)}%` : '–'} hint="Set at launch" />
        <Box label="Holding period" value={`${holdingDays(idea)} days`} hint={idea.category} />
      </div>

      {achieved !== null && (
        <div className="rounded-xl border border-[#E4E8EF] p-3">
          <div className="flex items-center justify-between text-[12.5px] font-bold"><span className="inline-flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-[#154198]" />Share of targeted upside captured</span><span className={mono}>{achieved.toFixed(0)}%</span></div>
          <div className="mt-2 h-2 rounded-full bg-[#E7ECF6] overflow-hidden"><div className="h-full rounded-full" style={{ width: `${achieved}%`, background: achieved >= 100 ? '#26A649' : '#154198' }} /></div>
          <p className="mt-1.5 text-[11.5px] text-[#6B7381]">Exit was {signed(fromLaunch)} from the launch price of {price(idea.launchedPrice)}, against +{targeted!.toFixed(2)}% targeted.</p>
        </div>
      )}

      <div>
        <h3 className="text-sm font-extrabold mb-1">Why we recommended it</h3>
        <p className="text-sm leading-relaxed text-[#2C3550]">{idea.why ?? 'The research team didn’t publish a written rationale with this idea.'}</p>
      </div>

      {idea.reportUrl && (
        <a href={idea.reportUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-[14px] border border-[#EFD9A0] bg-[#FBF3DE] p-3.5 hover:border-[#CC9720]">
          <span className="w-9 h-9 rounded-xl bg-white text-[#A87C16] flex items-center justify-center"><FileText className="w-[18px] h-[18px]" /></span>
          <span className="flex-1"><span className="block text-sm font-extrabold">{idea.name} research report</span><span className="text-xs text-[#6E4C0B]">PDF, published at launch</span></span>
          <ArrowUpRight className="w-4 h-4 text-[#8A6A12]" />
        </a>
      )}

      <p className="flex gap-2 text-[11px] leading-4 text-[#5B6478]"><Info className="w-3.5 h-3.5 flex-none mt-px" />This idea is closed and research coverage has ended. Returns are from the average entry to the exit price, before charges. SEBI RA Reg. No. {BRAND_INFO.sebiRegNo}. Past performance may or may not be sustained in the future.</p>
    </div>
  );
}

function Box({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-[10px] border border-[#DCE2F2] px-3 py-2 flex flex-col gap-0.5">
      <span className="text-xs text-[#5B6478]">{label}</span>
      <span className={cn(mono, 'text-[15px] font-semibold')}>{value}</span>
      {hint && <span className="text-[11px] text-[#8D95A3]">{hint}</span>}
    </div>
  );
}
