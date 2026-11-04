'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, ArrowRight, Check, Copy, Headset, Loader2, Phone, User, X } from 'lucide-react';
import { PHONE_REGEX } from '@/components/modals/LeadCaptureModal';
import { EXPERT_PHONE, EXPERT_PHONE_DISPLAY, EXPERT_PHONE_HREF } from './contactLinks';

interface TalkToExpertProps {
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

type Step = 'FORM' | 'SUBMITTING' | 'CALL';

const INPUT_CLASS =
  'w-full bg-[#141A26] border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 transition-all';

// "Talk to expert" button. The visitor first leaves their name and number, then the
// popup shows the advisory desk number to call. The number sits in the popup rather
// than behind a bare call link, which does nothing on laptops and can blank framed
// previews (like the shared link)
export default function TalkToExpert({ className, ariaLabel, children }: TalkToExpertProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('FORM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [query, setQuery] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const openPopup = () => {
    // Someone who already left their details goes straight to the number
    setStep((current) => (current === 'CALL' ? 'CALL' : 'FORM'));
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (!PHONE_REGEX.test(phone)) nextErrors.phone = 'Please enter a valid 10-digit mobile number.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStep('SUBMITTING');
    // Same simulated submission as the lead form until a backend receives these
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStep('CALL');
  };

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
      <button type="button" onClick={openPopup} aria-label={ariaLabel} title={ariaLabel} className={className}>
        {children}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#081026]/70 backdrop-blur-sm px-4 overflow-y-auto"
            onClick={() => step !== 'SUBMITTING' && setOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="talk-to-expert-title"
              className="relative w-full max-w-sm my-8 rounded-2xl bg-[#0B1528] border border-[#F5BA31]/70 p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={step === 'SUBMITTING'}
                aria-label="Close"
                className="absolute top-3 right-3 p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mx-auto w-12 h-12 rounded-full bg-[#164198] flex items-center justify-center">
                <Headset className="w-6 h-6 text-white" />
              </div>
              <h2 id="talk-to-expert-title" className="mt-4 text-xl font-extrabold text-center">
                Talk to an expert
              </h2>

              {step !== 'CALL' ? (
                <form onSubmit={handleSubmit} className="mt-1" noValidate>
                  <p className="text-sm text-white/70 text-center">Share your details to speak with our research desk</p>

                  <div className="mt-5 space-y-3.5 text-left">
                    <div>
                      <label htmlFor="expert-name" className="block text-xs font-semibold text-white/90 mb-1.5">
                        Full name <span className="text-[#F5BA31]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                        <input
                          id="expert-name"
                          type="text"
                          autoComplete="name"
                          value={name}
                          disabled={step === 'SUBMITTING'}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                          }}
                          placeholder="Your name"
                          className={`${INPUT_CLASS} pl-10 ${
                            errors.name ? 'border-[#DD5240] focus:ring-[#DD5240]' : 'border-white/15 focus:border-[#F5BA31] focus:ring-[#F5BA31]'
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-xs text-[#DD5240] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="expert-phone" className="block text-xs font-semibold text-white/90 mb-1.5">
                        Mobile number <span className="text-[#F5BA31]">*</span>
                      </label>
                      <div
                        className={`flex items-center bg-[#141A26] border rounded-xl overflow-hidden transition-all ${
                          errors.phone
                            ? 'border-[#DD5240]'
                            : 'border-white/15 focus-within:border-[#F5BA31] focus-within:ring-1 focus-within:ring-[#F5BA31]'
                        }`}
                      >
                        <span className="px-3 py-2.5 text-sm font-semibold text-white/80 border-r border-white/10 select-none">+91</span>
                        <input
                          id="expert-phone"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          value={phone}
                          disabled={step === 'SUBMITTING'}
                          onChange={(e) => {
                            setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                          }}
                          placeholder="10 digit mobile number"
                          className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-[#DD5240] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="expert-query" className="block text-xs font-semibold text-white/90 mb-1.5">
                        Your question <span className="text-white/40 font-normal">(optional)</span>
                      </label>
                      <textarea
                        id="expert-query"
                        rows={2}
                        value={query}
                        disabled={step === 'SUBMITTING'}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="What would you like to ask?"
                        className={`${INPUT_CLASS} resize-none border-white/15 focus:border-[#F5BA31] focus:ring-[#F5BA31]`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={step === 'SUBMITTING'}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] font-bold text-sm px-4 py-3 transition-colors disabled:opacity-60"
                  >
                    {step === 'SUBMITTING' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Please wait...
                      </>
                    ) : (
                      <>
                        Continue to call
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-[11px] text-white/50 text-center leading-relaxed">
                    By continuing you agree to be contacted by AdvisorAlpha (SEBI RA INH000021818) about your query.
                  </p>
                </form>
              ) : (
                <div className="text-center">
                  <p className="mt-1 text-sm text-white/70">
                    Thanks{name.trim() ? `, ${name.trim().split(/\s+/)[0]}` : ''}! Call us for any doubt or query
                  </p>

                  <p className="mt-4 text-2xl font-extrabold tracking-wide text-[#F5BA31] select-all">{EXPERT_PHONE_DISPLAY}</p>

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
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
