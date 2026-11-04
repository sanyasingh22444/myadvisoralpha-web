import { PlayCircle, ArrowUpRight } from 'lucide-react';
import { PageTitle } from '@/components/app/ui';
import { RESEARCH, shortDate } from '@/data/app';

export default function ResearchPage() {
  const [lead, ...rest] = RESEARCH;
  return (
    <div>
      <PageTitle title="Research & insights" sub="Market notes, webinars and TV appearances from our research team." />
      <ResearchCard post={lead} lead />
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => <ResearchCard key={p.id} post={p} />)}
      </div>
    </div>
  );
}

function ResearchCard({ post, lead = false }: { post: (typeof RESEARCH)[number]; lead?: boolean }) {
  const yt = post.videoUrl?.match(/[?&]v=([^&]+)/)?.[1];
  const src = post.imageUrl ?? (yt ? `https://img.youtube.com/vi/${yt}/hqdefault.jpg` : null);
  const href = post.videoUrl ?? null;
  const Wrapper = href ? 'a' : 'div';
  return (
    <Wrapper
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group block rounded-[14px] bg-white border border-[#E4E8EF] overflow-hidden hover:border-[#154198] transition-colors ${lead ? 'md:grid md:grid-cols-[1.2fr_1fr]' : ''}`}
    >
      <div className="relative aspect-[16/9] bg-[#EEF3FE]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {src && <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />}
        {post.videoUrl && <PlayCircle className="absolute inset-0 m-auto w-12 h-12 text-white drop-shadow-lg" />}
      </div>
      <div className={lead ? 'p-5 md:p-7 flex flex-col justify-center' : 'p-4'}>
        <div className="text-[11px] font-bold text-[#8D95A3] uppercase tracking-wider">{post.videoUrl ? 'Video' : 'Article'} · {shortDate(post.date)}{post.author ? ` · ${post.author}` : ''}</div>
        <h2 className={`mt-1.5 font-extrabold leading-snug group-hover:text-[#154198] ${lead ? 'text-xl md:text-2xl tracking-[-0.02em]' : 'text-[15px]'}`}>{post.title}</h2>
        <p className={`mt-2 text-[13.5px] text-[#4A525F] leading-relaxed ${lead ? '' : 'line-clamp-3'}`}>{post.excerpt}</p>
        {href && <span className="mt-3 inline-flex items-center gap-1 text-sm font-extrabold text-[#154198]">Watch<ArrowUpRight className="w-4 h-4" /></span>}
      </div>
    </Wrapper>
  );
}
