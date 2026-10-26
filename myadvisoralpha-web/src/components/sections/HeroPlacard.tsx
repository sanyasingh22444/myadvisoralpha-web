"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Palette from the MyAdvisorAlpha app design
const C = {
  card: "#0E1A33",
  raised: "#1A2850",
  goldLight: "#E3C25A",
  goldPale: "#F3D77A",
  blue: "#6F9BFF",
  bluePale: "#C9D6FF",
  stopLoss: "#FF8FA3",
  onNavy2: "#C9D1E1",
  onNavyMuted: "#9AA4BC",
};

const SLIDE_MS = 7000;
const EASE = [0.6, 0.1, 0.3, 1] as const;

type SlideKey = "stock" | "port" | "sip";

const SLIDES: Array<{
  key: SlideKey;
  tab: string;
  title: string;
  sub: string;
  foot: Array<[string, string]>;
}> = [
  {
    key: "stock",
    tab: "Stock Ideas",
    title: "Anatomy of a stock idea",
    sub: "What you receive before you buy",
    foot: [
      ["Up to 2 targets", "Book profit in stages"],
      ["Stop-loss set upfront", "Your downside is defined"],
      ["Full rationale", "Why we like the business"],
    ],
  },
  {
    key: "port",
    tab: "Model Portfolios",
    title: "Inside a model portfolio",
    sub: "A ready-made mix, kept on plan",
    foot: [
      ["Matched to your risk", "Conservative to aggressive"],
      ["Stock-level rationale", "Why each stock is there"],
      ["Rebalancing alerts", "So it doesn't drift"],
    ],
  },
  {
    key: "sip",
    tab: "Mutual Funds",
    title: "A SIP, month by month",
    sub: "Small amounts, invested automatically",
    foot: [
      ["Goal-based baskets", "From first salary to retirement"],
      ["Set up in 2 minutes", "100% digital via ONDC"],
      ["Direct to the AMC", "We never hold your money"],
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Stock idea: price path through entry, target 1 and target 2        */
/* ------------------------------------------------------------------ */

const STOCK_PATH =
  "M28 236 C47.9 232 57.8 246 74.3 240 S102.5 258 117.4 262 S143.9 272 155.4 266 S175.3 240 188.6 232 S210.1 196 221.7 172 S244.8 150 256.4 156 S277.9 138 289.5 120 S312.7 102 324.3 110 S347.4 92 359 84 S387.2 76 412 70";

const TARGETS: Array<[number, string]> = [
  [120, "Target 2"],
  [170, "Target 1"],
];

function StockChart({ still }: { still: boolean }) {
  const draw = still ? { duration: 0 } : { duration: 2.2, ease: EASE };
  // Each marker fades in as the line reaches it
  const marker = (at: number) =>
    still ? { duration: 0 } : { delay: 2.2 * at, duration: 0.18 };

  return (
    <svg
      viewBox="0 50 530 266"
      className="w-full h-auto"
      role="img"
      aria-label="Example: the price rises from the entry range through target 1 and target 2, staying above the stop-loss."
    >
      <defs>
        <linearGradient id="placard-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.goldLight} stopOpacity={0.28} />
          <stop offset="1" stopColor={C.goldLight} stopOpacity={0} />
        </linearGradient>
      </defs>

      {TARGETS.map(([y, label]) => (
        <g key={label}>
          <line x1={28} x2={428} y1={y} y2={y} stroke={C.goldLight} strokeOpacity={0.55} strokeDasharray="4 5" />
          <text x={440} y={y + 5} fill={C.goldLight} fontSize={14} fontWeight={700}>
            {label}
          </text>
        </g>
      ))}

      <rect x={28} y={222} width={400} height={24} fill={C.blue} fillOpacity={0.14} />
      <text x={440} y={239} fill="#A9C1FF" fontSize={14} fontWeight={700}>
        Entry range
      </text>

      <line x1={28} x2={428} y1={292} y2={292} stroke={C.stopLoss} strokeOpacity={0.8} strokeDasharray="6 5" />
      <text x={440} y={297} fill={C.stopLoss} fontSize={14} fontWeight={700}>
        Stop-loss
      </text>

      <path d={`${STOCK_PATH} L412 312 L28 312 Z`} fill="url(#placard-area)" />
      <motion.path
        d={STOCK_PATH}
        fill="none"
        stroke={C.goldPale}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: still ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={draw}
      />

      <motion.circle
        cx={221.7} cy={172} r={7} fill={C.card} stroke={C.goldPale} strokeWidth={3}
        initial={{ opacity: still ? 1 : 0 }} animate={{ opacity: 1 }} transition={marker(0.5)}
      />
      <motion.circle
        cx={289.5} cy={120} r={7} fill={C.card} stroke={C.goldPale} strokeWidth={3}
        initial={{ opacity: still ? 1 : 0 }} animate={{ opacity: 1 }} transition={marker(0.66)}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Model portfolio: market-cap mix donut                              */
/* ------------------------------------------------------------------ */

const MIX = [
  { label: "Large-cap", pct: 50, color: C.goldLight },
  { label: "Mid-cap", pct: 30, color: C.blue },
  { label: "Small-cap", pct: 20, color: C.bluePale },
];

function PortfolioChart({ still }: { still: boolean }) {
  const circumference = 2 * Math.PI * 78;
  let offset = 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-5 py-3">
      <motion.div
        className="self-center w-[170px] sm:w-[190px] aspect-square shrink-0"
        initial={{ opacity: still ? 1 : 0, scale: still ? 1 : 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={still ? { duration: 0 } : { duration: 0.9, ease: EASE }}
      >
        <svg
          viewBox="-110 -110 220 220"
          className="w-full h-full"
          role="img"
          aria-label="Example portfolio mix: 50% large-cap, 30% mid-cap, 20% small-cap."
        >
          <g transform="rotate(-90)">
            {MIX.map((m) => {
              const len = (m.pct / 100) * circumference - 3;
              const el = (
                <circle
                  key={m.label}
                  r={78}
                  fill="none"
                  stroke={m.color}
                  strokeWidth={30}
                  strokeDasharray={`${len} ${circumference - len}`}
                  strokeDashoffset={(-offset / 100) * circumference}
                />
              );
              offset += m.pct;
              return el;
            })}
          </g>
          <text x={0} y={-2} textAnchor="middle" fill="#fff" fontSize={26} fontWeight={800}>
            25–30
          </text>
          <text x={0} y={20} textAnchor="middle" fill={C.onNavyMuted} fontSize={13} fontWeight={600}>
            stocks
          </text>
        </svg>
      </motion.div>

      <div className="flex-1 space-y-3">
        <div>
          <div className="text-base font-extrabold text-white">Alpha Allrounder</div>
          <div className="text-xs font-semibold" style={{ color: C.onNavyMuted }}>
            Balanced, flexicap
          </div>
        </div>
        {MIX.map((m) => (
          <div key={m.label} className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-[3px] shrink-0" style={{ backgroundColor: m.color }} />
            <span className="flex-1 text-sm" style={{ color: C.onNavy2 }}>{m.label}</span>
            <span className="text-sm font-bold text-white">{m.pct}%</span>
          </div>
        ))}
        <div
          className="flex gap-2.5 rounded-xl p-3 border"
          style={{ backgroundColor: "rgba(227,194,90,0.08)", borderColor: "rgba(227,194,90,0.3)" }}
        >
          <span className="text-base font-extrabold leading-none" style={{ color: C.goldLight }}>↻</span>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-white">Rebalancing alert</div>
            <div className="text-xs" style={{ color: C.onNavy2 }}>Sent with the reason for every change</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mutual funds: twelve monthly SIP instalments                       */
/* ------------------------------------------------------------------ */

export function SipChart({ still }: { still: boolean }) {
  return (
    <svg
      viewBox="0 30 530 278"
      className="w-full h-auto"
      role="img"
      aria-label="Example: twelve monthly SIP instalments, each paid automatically, adding up toward your goal."
    >
      <line x1={28} x2={440} y1={56} y2={56} stroke={C.goldLight} strokeOpacity={0.6} strokeDasharray="4 5" />
      <text x={448} y={61} fill={C.goldLight} fontSize={14} fontWeight={700}>
        Your goal
      </text>
      <line x1={28} x2={440} y1={270} y2={270} stroke="rgba(255,255,255,0.2)" />

      {Array.from({ length: 12 }, (_, i) => {
        const h = 17 * (i + 1);
        // Bars rise one after another across the 1.5s build
        const start = i / 16;
        const span = Math.min(start + 0.3, 1) - start;
        return (
          <g key={i}>
            <motion.rect
              x={40 + 33 * i}
              width={22}
              rx={4}
              fill={C.goldLight}
              fillOpacity={0.45 + 0.045 * i}
              initial={still ? { y: 270 - h, height: h } : { y: 270, height: 0 }}
              animate={{ y: 270 - h, height: h }}
              transition={still ? { duration: 0 } : { delay: 1.5 * start, duration: 1.5 * span, ease: EASE }}
            />
            <text x={51 + 33 * i} y={290} textAnchor="middle" fill={C.onNavyMuted} fontSize={12} fontWeight={600}>
              {i + 1}
            </text>
          </g>
        );
      })}

      <text x={28} y={306} fill={C.onNavyMuted} fontSize={12} fontWeight={600}>
        Month
      </text>
      <g transform="translate(448 222)">
        <rect width={78} height={44} rx={10} fill="rgba(227,194,90,0.12)" stroke="rgba(227,194,90,0.45)" />
        <text x={39} y={19} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={800}>
          Autopay
        </text>
        <text x={39} y={34} textAnchor="middle" fill={C.onNavy2} fontSize={11} fontWeight={600}>
          every month
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Placard: auto-advancing tabs with a progress bar                   */
/* ------------------------------------------------------------------ */

export default function HeroPlacard() {
  const reduceMotion = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const autoplay = !reduceMotion;
  const slide = SLIDES[index];

  const pause = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
  };

  const resumeAfter = (ms: number) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), ms);
  };

  const handleTabClick = (i: number) => {
    setIndex(i);
    pause();
    resumeAfter(6000); // resume after 6s without interaction
  };

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={() => resumeAfter(800)}
      onTouchStart={pause}
      onTouchEnd={() => resumeAfter(800)}
      className="w-full max-w-[520px] rounded-[20px] border border-white/[0.12] pt-3.5 px-5 overflow-hidden shadow-[0_24px_40px_rgba(0,0,0,0.5)]"
      style={{ backgroundColor: C.card }}
      aria-label="How each product works, illustrated"
    >
      {/* Tabs */}
      <div role="tablist" className="flex gap-1 p-1 -mx-1.5 mb-4 rounded-xl bg-white/[0.05]">
        {SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => handleTabClick(i)}
              className={`relative flex-1 min-h-[42px] px-1.5 rounded-[9px] overflow-hidden text-center text-[12.5px] sm:text-sm font-bold transition-colors ${
                active ? "text-white" : "hover:bg-white/[0.04]"
              }`}
              style={active ? undefined : { color: C.onNavy2 }}
            >
              {active && (
                <motion.span
                  layoutId="placardActiveTab"
                  className="absolute inset-0 rounded-[9px]"
                  style={{ backgroundColor: C.raised }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{s.tab}</span>
              {active && autoplay && (
                <span
                  key={`progress-${index}`}
                  className="placard-progress absolute left-0 bottom-0 h-0.5 z-10"
                  style={{
                    backgroundColor: C.goldLight,
                    animationDuration: `${SLIDE_MS}ms`,
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                  onAnimationEnd={() => setIndex((prev) => (prev + 1) % SLIDES.length)}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeInOut" }}
        >
          {/* Heading */}
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h4 className="text-[17px] font-bold text-white leading-tight">{slide.title}</h4>
              <p className="text-[13px] mt-0.5" style={{ color: C.onNavyMuted }}>{slide.sub}</p>
            </div>
            <span
              className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-md border border-white/20"
              style={{ color: C.onNavy2 }}
            >
              Illustrative
            </span>
          </div>

          {/* Visual */}
          <div className="my-2">
            {slide.key === "stock" && <StockChart still={reduceMotion} />}
            {slide.key === "port" && <PortfolioChart still={reduceMotion} />}
            {slide.key === "sip" && <SipChart still={reduceMotion} />}
          </div>

          {/* Footer value props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 -mx-5 border-t border-white/10">
            {slide.foot.map(([title, text], i) => (
              <div
                key={title}
                className={`py-3.5 px-[18px] ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-white/10" : ""}`}
              >
                <div className="text-sm font-bold text-white">{title}</div>
                <div className="text-[13px] leading-[18px]" style={{ color: C.onNavyMuted }}>{text}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
