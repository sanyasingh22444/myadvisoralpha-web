'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, 
  Check, 
  CheckCircle2, 
  Copy, 
  ShieldCheck, 
  ArrowRight, 
  Loader2, 
  TrendingUp, 
  Phone, 
  Mail, 
  User, 
  AlertCircle,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

// -----------------------------------------------------------------------------
// Validation Oracles & Canonical Formats (Synchronized with verify-e2e.mjs)
// -----------------------------------------------------------------------------
export const PHONE_REGEX = /^[6-9]\d{9}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  portfolioSize: string;
  investmentGoal: string;
  consent: boolean;
}

export interface ValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  portfolioSize?: string;
  consent?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
}

export function validateLeadForm(formData: Partial<LeadFormData>): ValidationResult {
  const errors: ValidationErrors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Full name must be at least 2 characters.';
  }

  if (!formData.phone || !PHONE_REGEX.test(formData.phone.trim())) {
    errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
  }

  if (!formData.email || !EMAIL_REGEX.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!formData.portfolioSize) {
    errors.portfolioSize = 'Please select your portfolio size.';
  }

  if (formData.consent !== true) {
    errors.consent = 'You must agree to terms and communication consent.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export const PORTFOLIO_SIZE_OPTIONS = [
  { label: 'Below ₹5 Lakhs', value: 'Below ₹5L' },
  { label: '₹5 Lakhs – ₹25 Lakhs', value: '₹5L - ₹25L' },
  { label: '₹25 Lakhs – ₹1 Crore', value: '> ₹25 Lakhs' },
  { label: 'Above ₹1 Crore (HNI)', value: '₹1Cr+' },
];

export const INVESTMENT_GOAL_OPTIONS = [
  { label: 'Stock Advisory (Entry, Target & Stop-Loss)', value: 'Stock Advisory (Short/Long term)' },
  { label: 'Equity Model Portfolios (Long-term Wealth)', value: 'Model Portfolios (Wealth Creation)' },
  { label: 'Curated Mutual Funds (Direct SIP)', value: 'Curated Mutual Funds (SIP Growth)' },
  { label: 'Comprehensive Portfolio Review & Restructuring', value: 'Comprehensive Portfolio Review' },
];

export interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPhone?: string;
  initialPortfolioSize?: string;
  initialInvestmentGoal?: string;
  source?: string;
  onSuccess?: (ticketCode: string, data: LeadFormData) => void;
}

export type ModalState = 'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR';

export default function LeadCaptureModal({
  isOpen,
  onClose,
  initialPhone = '',
  initialPortfolioSize = '',
  initialInvestmentGoal = 'Stock Advisory (Short/Long term)',
  source = 'direct',
  onSuccess,
}: LeadCaptureModalProps) {
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState('');
  const [portfolioSize, setPortfolioSize] = useState(initialPortfolioSize);
  const [investmentGoal, setInvestmentGoal] = useState(initialInvestmentGoal);
  const [consent, setConsent] = useState(true);

  // Status & Validation State
  const [modalState, setModalState] = useState<ModalState>('IDLE');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [ticketCode, setTicketCode] = useState('');
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Synchronize initial props when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialPhone) setPhone(initialPhone);
      if (initialPortfolioSize) setPortfolioSize(initialPortfolioSize);
      if (initialInvestmentGoal) setInvestmentGoal(initialInvestmentGoal);
      setModalState('IDLE');
      setErrors({});
      setSubmitError('');
      setCopiedTicket(false);

      // Lock body scroll
      document.body.style.overflow = 'hidden';

      // Autofocus first input after animation
      const timer = setTimeout(() => {
        if (!initialPhone && firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialPhone, initialPortfolioSize, initialInvestmentGoal]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && modalState !== 'SUBMITTING') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, modalState, onClose]);

  // Institutional Multi-Burst Confetti Trigger
  const triggerCelebration = useCallback(async () => {
    if (typeof window === 'undefined') return;
    try {
      const confetti = (await import('canvas-confetti')).default;
      const count = 180;
      const defaults = {
        origin: { y: 0.65 },
        zIndex: 9999,
        colors: ['#F5BA31', '#3AA17E', '#FF8415', '#FCF50F', '#FFFFFF'],
      };

      const fire = (particleRatio: number, opts: any) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } catch {
      // Fallback gracefully if canvas-confetti is blocked
    }
  }, []);

  // Phone input sanitizer: extracts digits, limits to 10
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(cleaned);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: LeadFormData = {
      name,
      phone,
      email,
      portfolioSize,
      investmentGoal,
      consent,
    };

    const validation = validateLeadForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setModalState('SUBMITTING');

    try {
      // Simulated server submission latency (800ms)
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate canonical ticket code: #AA-XXXXX (length 9)
      const randomCode = '#AA-' + Math.floor(10000 + Math.random() * 90000);
      setTicketCode(randomCode);
      setModalState('SUCCESS');
      triggerCelebration();

      if (onSuccess) {
        onSuccess(randomCode, formData);
      }
    } catch {
      setModalState('ERROR');
      setSubmitError('Unable to schedule consultation at this moment. Please retry or contact WhatsApp support.');
    }
  };

  // Copy Ticket Code helper
  const handleCopyTicket = () => {
    if (!ticketCode || typeof navigator === 'undefined') return;
    navigator.clipboard.writeText(ticketCode);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      {/* Blurred Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={() => {
          if (modalState !== 'SUBMITTING') onClose();
        }}
        aria-hidden="true"
      />

      {/* Modal Surface Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-[#0B1528] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-[0px_8px_48px_0px_rgba(35,127,251,0.25)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Subtle Radial Blue Top Ambient Glow */}
        <div
          aria-hidden="true"
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#F5BA31]/20 rounded-full blur-[70px] pointer-events-none"
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={modalState === 'SUBMITTING'}
          aria-label="Close consultation modal"
          className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#F5BA31] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ------------------------------------------------------------------- */}
        {/* VIEW 1: Form Input & Booking (IDLE, SUBMITTING, ERROR)              */}
        {/* ------------------------------------------------------------------- */}
        {modalState !== 'SUCCESS' ? (
          <div>
            {/* Header / Credibility Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5BA31]/15 border border-[#F5BA31]/30 text-[#F5BA31] text-[11px] font-bold tracking-wide uppercase">
                <TrendingUp className="w-3.5 h-3.5" />
                SEBI Registered Advisory · INH000021818
              </span>
            </div>

            <h2
              id="modal-headline"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight"
            >
              Book Advisory Consultation
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-white/70">
              Speak directly with an equity research analyst. Personalized stock & portfolio diagnostics.
            </p>

            {/* Error Notification Banner if submission failed */}
            {submitError && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Consultation Booking Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
              
              {/* Field 1: Full Name */}
              <div>
                <label 
                  htmlFor="lead-name" 
                  className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-1.5"
                >
                  Full Name <span className="text-[#F5BA31]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    ref={firstInputRef}
                    id="lead-name"
                    name="name"
                    type="text"
                    value={name}
                    disabled={modalState === 'SUBMITTING'}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="e.g. Dr. Rahul Malhotra"
                    className={`w-full bg-[#141A26] border ${
                      errors.name ? 'border-[#DD5240] focus:ring-[#DD5240]' : 'border-white/15 focus:border-[#F5BA31] focus:ring-[#F5BA31]'
                    } rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 transition-all`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-[#DD5240] font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Field 2: Mobile Number */}
              <div>
                <label 
                  htmlFor="lead-phone" 
                  className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-1.5"
                >
                  Mobile Number <span className="text-[#F5BA31]">*</span>
                </label>
                <div 
                  className={`flex items-center bg-[#141A26] border ${
                    errors.phone ? 'border-[#DD5240] ring-1 ring-[#DD5240]' : 'border-white/15 focus-within:border-[#F5BA31] focus-within:ring-1 focus-within:ring-[#F5BA31]'
                  } rounded-xl overflow-hidden transition-all`}
                >
                  <div className="px-3.5 py-2.5 bg-white/5 border-r border-white/10 text-white font-semibold text-sm flex items-center gap-1.5 select-none shrink-0">
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/80">+91</span>
                  </div>
                  <input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    disabled={modalState === 'SUBMITTING'}
                    onChange={handlePhoneChange}
                    placeholder="10-digit mobile number"
                    className="bg-transparent px-3 py-2.5 text-white placeholder-white/30 text-sm flex-1 outline-none font-medium"
                  />
                  <div className="pr-3 text-white/30">
                    <Phone className="w-4 h-4" />
                  </div>
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-[#DD5240] font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Field 3: Email Address */}
              <div>
                <label 
                  htmlFor="lead-email" 
                  className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-1.5"
                >
                  Email Address <span className="text-[#F5BA31]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    value={email}
                    disabled={modalState === 'SUBMITTING'}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="e.g. rahul.malhotra@corporate.in"
                    className={`w-full bg-[#141A26] border ${
                      errors.email ? 'border-[#DD5240] focus:ring-[#DD5240]' : 'border-white/15 focus:border-[#F5BA31] focus:ring-[#F5BA31]'
                    } rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 transition-all`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-[#DD5240] font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Field 4 & 5 Grid: Portfolio Size & Primary Interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Portfolio Size Selector */}
                <div>
                  <label 
                    htmlFor="portfolioSize" 
                    className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-1.5"
                  >
                    Portfolio Size <span className="text-[#F5BA31]">*</span>
                  </label>
                  <select
                    id="portfolioSize"
                    name="portfolioSize"
                    value={portfolioSize}
                    disabled={modalState === 'SUBMITTING'}
                    onChange={(e) => {
                      setPortfolioSize(e.target.value);
                      if (errors.portfolioSize) setErrors((prev) => ({ ...prev, portfolioSize: undefined }));
                    }}
                    className={`w-full bg-[#141A26] border ${
                      errors.portfolioSize ? 'border-[#DD5240] focus:ring-[#DD5240]' : 'border-white/15 focus:border-[#F5BA31] focus:ring-[#F5BA31]'
                    } rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 transition-all cursor-pointer`}
                  >
                    <option value="" disabled className="bg-[#0B1528] text-white/40">Select Capital Range</option>
                    {PORTFOLIO_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#0B1528] text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.portfolioSize && (
                    <p className="mt-1 text-xs text-[#DD5240] font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.portfolioSize}
                    </p>
                  )}
                </div>

                {/* Investment Goal Dropdown */}
                <div>
                  <label 
                    htmlFor="investmentGoal" 
                    className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-1.5"
                  >
                    Advisory Focus
                  </label>
                  <select
                    id="investmentGoal"
                    name="investmentGoal"
                    value={investmentGoal}
                    disabled={modalState === 'SUBMITTING'}
                    onChange={(e) => setInvestmentGoal(e.target.value)}
                    className="w-full bg-[#141A26] border border-white/15 focus:border-[#F5BA31] focus:ring-1 focus:ring-[#F5BA31] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-all cursor-pointer"
                  >
                    {INVESTMENT_GOAL_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#0B1528] text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 6: Regulatory Consent Checkbox */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    id="lead-consent"
                    name="consent"
                    type="checkbox"
                    checked={consent}
                    disabled={modalState === 'SUBMITTING'}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
                    }}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-[#141A26] text-[#F5BA31] focus:ring-[#F5BA31] accent-[#F5BA31] shrink-0"
                  />
                  <span className="text-[11px] sm:text-xs text-white/70 leading-relaxed">
                    I authorize AdvisorAlpha (SEBI RA INH000021818) to contact me via Call, SMS, or WhatsApp regarding this consultation, and agree to the{' '}
                    <a href="/legal/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[#F5BA31] hover:underline">
                      Terms
                    </a>{' '}
                    &{' '}
                    <a href="/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#F5BA31] hover:underline">
                      Privacy Policy
                    </a>.
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-xs text-[#DD5240] font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.consent}
                  </p>
                )}
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={modalState === 'SUBMITTING'}
                className="btn-shimmer w-full py-3.5 px-6 rounded-xl font-extrabold text-sm bg-[#F5BA31] hover:bg-[#e5ab28] active:scale-98 text-[#081026] shadow-lg shadow-[#F5BA31]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {modalState === 'SUBMITTING' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#081026]" />
                    <span>Scheduling Consultation...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Request Advisory Call</span>
                    <ArrowRight className="w-4 h-4 text-[#081026]" />
                  </>
                )}
              </button>

              {/* Privacy Guarantee Note */}
              <div className="pt-1 flex items-center justify-center gap-3 text-[11px] text-white/50">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3AA17E]" /> 100% Confidential
                </span>
                <span>•</span>
                <span>Zero Sales Spam</span>
                <span>•</span>
                <span>SEBI Regulated</span>
              </div>
            </form>
          </div>
        ) : (
          /* ----------------------------------------------------------------- */
          /* VIEW 2: Success Confirmation & Celebration State                  */
          /* ----------------------------------------------------------------- */
          <div className="py-4 text-center animate-in fade-in zoom-in-95 duration-300">
            {/* Animated Emerald Checkmark Badge */}
            <div className="w-16 h-16 rounded-full bg-[#3AA17E]/20 border-2 border-[#3AA17E] flex items-center justify-center mx-auto text-[#3AA17E] shadow-lg shadow-[#3AA17E]/30 animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="mt-4 text-2xl font-black text-white tracking-tight">
              Consultation Confirmed!
            </h3>
            <p className="mt-1 text-sm text-white/70 max-w-sm mx-auto">
              Your appointment request has been reserved with our SEBI-registered research desk.
            </p>

            {/* Ticket Code Card */}
            <div className="my-5 bg-[#141A26] border border-[#3AA17E]/30 rounded-2xl p-4 max-w-sm mx-auto shadow-inner relative group">
              <div className="text-[10px] uppercase font-bold text-white/50 tracking-wider">
                Consultation Reference Ticket
              </div>
              <div className="flex items-center justify-center gap-3 my-1">
                <span className="text-3xl font-mono font-black text-[#3AA17E] tracking-wider select-all">
                  {ticketCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyTicket}
                  title="Copy ticket code"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white/80 hover:text-white transition-all cursor-pointer"
                >
                  {copiedTicket ? (
                    <Check className="w-4 h-4 text-[#3AA17E]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="text-[11px] text-white/50">
                {copiedTicket ? 'Copied to clipboard!' : 'Quote this ticket code when our analyst contacts you'}
              </div>
            </div>

            {/* Next Steps Checklist */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-left space-y-2.5 max-w-md mx-auto text-xs text-white/80 mb-6">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                <span>
                  <strong>Instant WhatsApp dispatch:</strong> Confirmation and research briefing link sent to <span className="text-white font-medium">+91 {phone}</span>.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                <span>
                  <strong>24-Hour callback promise:</strong> An equity research specialist will call you during market hours (9:00 AM – 6:00 PM IST).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                <span>
                  <strong>Complimentary audit:</strong> Keep your Demat holdings or watchlist ready for real-time SQGARP™ scoring.
                </span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors cursor-pointer"
              >
                Close Window
              </button>
              <a
                href="https://whatsapp.com/channel/0029Vb6uPDGLtOj9FJ6BWW46"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join WhatsApp Desk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
