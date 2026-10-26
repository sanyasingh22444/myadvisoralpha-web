'use client';

import React, { useState, useMemo } from 'react';
import { BLOG_POSTS, BlogPost } from '@/data/blogs';
import {
  Search,
  Clock,
  Calendar,
  ArrowUpRight,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  X,
} from 'lucide-react';

type CategoryFilter = 'All' | 'Market Analysis' | 'SQGARP Insights' | 'Wealth Building';

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalPost, setActiveModalPost] = useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Category mapping matrix connecting the 11 real mined blog posts to high-level filter tabs
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      // 1. Text Search Filter across title, excerpt, author, and tags
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // 2. Category Tab Filter
      if (selectedCategory === 'All') return true;

      if (selectedCategory === 'Market Analysis') {
        return (
          post.category === 'Market Insights' ||
          post.category === 'Macro & Policy' ||
          post.category === 'Sector Trends'
        );
      }

      if (selectedCategory === 'SQGARP Insights') {
        return post.category === 'Stock Deep Dives' || post.category === 'Company Deep Dives';
      }

      if (selectedCategory === 'Wealth Building') {
        return post.category === 'Mutual Funds & SIPs' || post.category === 'Financial Planning';
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Featured post: The flagship power supercycle analysis
  const featuredPost = BLOG_POSTS[0];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
  };

  return (
    <div className="flex-1 flex flex-col w-full selection:bg-[#F5BA31] selection:text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-28 lg:pt-36 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[rgba(255,255,255,0.1)]">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#F5BA31]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1528] border border-[#F5BA31]/40 text-[#F5BA31] text-xs font-bold tracking-wider uppercase mb-5">
            <BookOpen className="w-4 h-4 text-[#F5BA31]" />
            <span>Alpha Research Publications & Market Memos</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto">
            Alpha Blogs &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5BA31] via-[#3DA2F1] to-[#3AA17E]">
              Market Insights
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            From macroeconomic supercycles to forensic balance-sheet accounting, get sharp, institutional insights to guide
            your wealth-building journey.
          </p>

          {/* LIVE SEARCH & CATEGORY FILTER TABS BAR */}
          <div className="mt-10 max-w-4xl mx-auto space-y-4">
            {/* Search Input Box */}
            <div className="relative">
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 11 real research articles by ticker, sector, or keyword (e.g. Power, OMC, Tata Steel, Small Cap)..."
                className="w-full bg-[#0B1528] border border-white/10 focus:border-[#F5BA31] rounded-full py-3.5 pl-12 pr-12 text-sm text-white placeholder-neutral-500 outline-none transition-colors shadow-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {(['All', 'Market Analysis', 'SQGARP Insights', 'Wealth Building'] as CategoryFilter[]).map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-[#F5BA31] text-white shadow-[0px_4px_16px_0px_rgba(35,127,251,0.35)] scale-105'
                        : 'bg-[#0B1528] text-neutral-400 border border-white/10 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {cat} {cat === 'All' && `(${BLOG_POSTS.length})`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE SPOTLIGHT */}
      {selectedCategory === 'All' && !searchQuery && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[rgba(255,255,255,0.1)]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#0B1528] border border-[#F5BA31]/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5BA31]/10 blur-[90px] rounded-full pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#F5BA31] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      Featured Research Report
                    </span>
                    <span className="bg-white/10 text-neutral-300 text-xs px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {featuredPost.readingTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#F5BA31]/20 text-[#F5BA31] flex items-center justify-center font-bold text-xs border border-[#F5BA31]/40">
                        PM
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{featuredPost.author}</div>
                        <div className="text-[10px] text-[#3AA17E] font-medium">Founder & CIO (Ex-Axis AMC)</div>
                      </div>
                    </div>

                    <span className="text-neutral-600">•</span>

                    <div className="inline-flex items-center gap-1.5 text-xs text-neutral-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{featuredPost.publishedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 w-full space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#3AA17E]">
                      Key Research Takeaways
                    </div>
                    <ul className="text-xs text-neutral-300 space-y-2 list-disc list-inside">
                      <li>Peak summer demand crossing 250 GW structural threshold.</li>
                      <li>High-voltage transmission moats over cyclical developers.</li>
                      <li>Strict SQGARP™ balance-sheet return filters.</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModalPost(featuredPost)}
                    className="btn-shimmer inline-flex items-center gap-2 bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] text-xs sm:text-sm font-extrabold px-6 py-3 rounded-full shadow-lg transition-all active:scale-95 w-full sm:w-auto justify-center"
                  >
                    <span>Read Full Research Rationale</span>
                    <ArrowUpRight className="w-4 h-4 text-[#081026]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ARTICLES GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header / Results Count */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(255,255,255,0.1)]">
            <div className="text-sm font-medium text-neutral-400">
              Showing <strong className="text-white">{filteredPosts.length}</strong> research publications{' '}
              {selectedCategory !== 'All' && <span>in <span className="text-[#F5BA31]">{selectedCategory}</span></span>}
              {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
            </div>

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#F5BA31] hover:underline"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 ? (
            <div className="bg-[#0B1528] border border-white/10 rounded-3xl p-12 text-center max-w-md mx-auto my-12">
              <BookOpen className="w-12 h-12 text-neutral-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white">No articles matched your criteria</h3>
              <p className="text-xs text-neutral-400 mt-2">
                Try searching for a different keyword such as &ldquo;Bonds&rdquo;, &ldquo;Cement&rdquo;, or &ldquo;SWP&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-6 text-xs font-semibold px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            /* Grid of Cards */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => {
                const isCIO = post.author === 'Pankaj Murarka';
                return (
                  <article
                    key={post.slug}
                    className="bg-[#0B1528] border border-white/10 hover:border-[#F5BA31]/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative shadow-lg"
                  >
                    <div>
                      {/* Top Metadata Strip */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F5BA31]/15 text-[#F5BA31] border border-[#F5BA31]/30">
                          {post.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-neutral-400">
                          <Clock className="w-3 h-3 text-neutral-500" />
                          <span>{post.readingTime}</span>
                        </span>
                      </div>

                      {/* Article Title */}
                      <h2 className="text-lg font-bold text-white group-hover:text-[#F5BA31] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-white/5 text-neutral-400 px-2 py-0.5 rounded border border-white/5"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Author & CTA */}
                    <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] ${
                            isCIO
                              ? 'bg-[#F5BA31]/20 text-[#F5BA31] border border-[#F5BA31]/40'
                              : 'bg-[#3AA17E]/20 text-[#3AA17E] border border-[#3AA17E]/40'
                          }`}
                        >
                          {isCIO ? 'PM' : 'RD'}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white truncate">{post.author}</div>
                          <div className="text-[10px] text-neutral-500">{post.publishedDate}</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveModalPost(post)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#F5BA31] group-hover:text-white group-hover:translate-x-1 transition-all"
                      >
                        <span>Read</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FULL IN-PAGE ARTICLE MODAL READER */}
      {activeModalPost && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalPost(null)}
        >
          <div
            className="bg-[#0B1528] border border-white/20 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalPost(null)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Metadata */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F5BA31]/20 text-[#F5BA31] border border-[#F5BA31]/30">
                {activeModalPost.category}
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                {activeModalPost.publishedDate} · {activeModalPost.readingTime}
              </span>
            </div>

            {/* Modal Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {activeModalPost.title}
            </h2>

            {/* Author Banner */}
            <div className="flex items-center gap-3 my-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#F5BA31]/20 text-[#F5BA31] flex items-center justify-center font-bold text-sm">
                {activeModalPost.author === 'Pankaj Murarka' ? 'PM' : 'RD'}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{activeModalPost.author}</div>
                <div className="text-xs text-[#3AA17E]">
                  {activeModalPost.author === 'Pankaj Murarka'
                    ? 'Founder & CIO (Ex-CIO Axis AMC $5B AUM)'
                    : 'MyAdvisorAlpha Research Desk'}
                </div>
              </div>
            </div>

            {/* Excerpt Callout */}
            <div className="text-sm sm:text-base text-neutral-300 italic border-l-4 border-[#F5BA31] pl-4 my-6 leading-relaxed bg-[#F5BA31]/5 py-2 pr-2">
              &ldquo;{activeModalPost.excerpt}&rdquo;
            </div>

            {/* Detailed Content Sections */}
            <div className="space-y-6 pt-2">
              {activeModalPost.contentSections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white text-[#3DA2F1]">
                    {sec.heading}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags Strip */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/10">
              {activeModalPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-white/5 text-neutral-300 px-3 py-1 rounded-full border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400">
                Advisor Alpha · SEBI RA INH000021818
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalPost(null)}
                  className="text-xs font-semibold text-neutral-300 hover:text-white px-4 py-2 rounded-full border border-white/20"
                >
                  Close Reader
                </button>
                <a
                  href="https://web.advisoralpha.in/#/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer text-xs font-bold text-[#081026] bg-[#F5BA31] hover:bg-[#e5ab28] px-5 py-2.5 rounded-full shadow-md"
                >
                  Get Real-Time Trade Signals →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEWSLETTER & CIO MARKET MEMO SUBSCRIPTION CARD */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#0B1528] via-[#101D38] to-[#0B1528] border border-white/10 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5BA31]/10 border border-[#F5BA31]/30 text-[#F5BA31] text-xs font-bold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Free Institutional Research</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get Pankaj Murarka’s Weekly Market Memo
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-xl mx-auto">
            Join 1,00,000+ investors receiving our Sunday evening breakdown of macroeconomic tailwinds, earnings surprise
            candidates, and SQGARP™ valuation updates.
          </p>

          {newsletterSubscribed ? (
            <div className="mt-8 inline-flex items-center gap-2 bg-[#3AA17E]/20 border border-[#3AA17E] text-[#3AA17E] text-sm font-semibold px-6 py-3 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
              <span>You’re subscribed! Check your inbox for this Sunday’s Market Memo.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-[#081026] border border-white/20 focus:border-[#F5BA31] rounded-full px-5 py-3 text-sm text-white placeholder-neutral-500 outline-none"
              />
              <button
                type="submit"
                className="btn-shimmer inline-flex items-center justify-center gap-2 bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] text-sm font-bold px-6 py-3 rounded-full transition-all active:scale-95 whitespace-nowrap shadow-md"
              >
                <span>Subscribe</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 text-[11px] text-neutral-500">
            Zero spam. Unsubscribe at any time with one click.
          </div>
        </div>
      </section>
    </div>
  );
}
