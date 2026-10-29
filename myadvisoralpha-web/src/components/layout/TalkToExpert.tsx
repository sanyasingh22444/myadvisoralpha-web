'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Copy, Headset, Phone, X } from 'lucide-react';
import { EXPERT_PHONE, EXPERT_PHONE_DISPLAY, EXPERT_PHONE_HREF } from './contactLinks';

interface TalkToExpertProps {
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

// "Talk to expert" button. Opens a small popup with the advisory desk number, so the
// number is always visible: a bare call link does nothing on laptops, and inside
// framed previews (like the shared link) it can blank the page
export default function TalkToExpert({ className, ariaLabel, children }: TalkToExpertProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(EXPERT_PHONE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the number stays on screen to copy by hand
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={ariaLabel}
        title={ariaLabel}
        className={className}
      >
        {children}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#081026]/70 backdrop-blur-sm px-4"
            onClick={() => setOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="talk-to-expert-title"
              className="relative w-full max-w-sm rounded-2xl bg-[#0B1528] border border-[#F5BA31]/70 p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-3 right-3 p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mx-auto w-12 h-12 rounded-full bg-[#164198] flex items-center justify-center">
                <Headset className="w-6 h-6 text-white" />
              </div>
              <h2 id="talk-to-expert-title" className="mt-4 text-xl font-extrabold text-white">
                Talk to an expert
              </h2>
              <p className="mt-1 text-sm text-white/70">Call us for any doubt or query</p>

              <p className="mt-4 text-2xl font-extrabold tracking-wide text-[#F5BA31] select-all">
                {EXPERT_PHONE_DISPLAY}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {/* A new window lets framed previews hand the call to the phone's dialler */}
                <a
                  href={EXPERT_PHONE_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] font-bold text-sm px-4 py-3 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call now
                </a>
                <button
                  type="button"
                  onClick={copyNumber}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 hover:border-white/40 text-white font-semibold text-sm px-4 py-3 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-[#3AA17E]" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy number'}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
