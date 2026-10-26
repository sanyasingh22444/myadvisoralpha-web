'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BRAND_INFO } from '@/data/brand';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Lock,
  Train,
  Plane,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FormData {
  name: string;
  phone: string;
  email: string;
  portfolioSize: string;
  service: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  portfolioSize?: string;
  consent?: string;
}

export default function ContactPage() {
  const { contact } = BRAND_INFO;

  // Form State
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    portfolioSize: '',
    service: 'Single Stock Advisory',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationTicket, setConfirmationTicket] = useState('');

  // Validation Rules (100% aligned with scripts/verify-e2e.mjs)
  const PHONE_REGEX = /^[6-9]\d{9}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
    }

    if (!formData.phone || !PHONE_REGEX.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).';
    }

    if (!formData.email || !EMAIL_REGEX.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.portfolioSize) {
      newErrors.portfolioSize = 'Please select your portfolio size.';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to the Terms and communication consent.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate realistic async network submission
    await new Promise((resolve) => setTimeout(resolve, 800));

    const ticketCode = '#AA-' + Math.floor(10000 + Math.random() * 90000);
    setConfirmationTicket(ticketCode);
    setIsSubmitting(false);
    setIsSuccess(true);

    // Trigger celebratory confetti effect
    if (typeof window !== 'undefined') {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F5BA31', '#3AA17E', '#FF8415', '#FFFFFF'],
        });
      } catch {
        // Safe fallback if confetti canvas not bound
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      portfolioSize: '',
      service: 'Single Stock Advisory',
      message: '',
      consent: false,
    });
    setErrors({});
    setIsSuccess(false);
    setConfirmationTicket('');
  };

  return (
    <div className="flex-1 flex flex-col w-full selection:bg-[#F5BA31] selection:text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-28 lg:pt-36 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[rgba(255,255,255,0.1)]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#F5BA31]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1528] border border-[#F5BA31]/40 text-[#F5BA31] text-xs font-bold tracking-wider uppercase mb-5">
            <ShieldCheck className="w-4 h-4 text-[#3AA17E]" />
            <span>Client Advisory Desk · SEBI RA INH000021818</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Connect With Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5BA31] via-[#3DA2F1] to-[#3AA17E]">
              Advisory Team
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Have questions about our single stock ideas, model portfolios, or curated mutual funds? Visit our Mumbai office or
            schedule a consultation with our research team.
          </p>
        </div>
      </section>

      {/* 4 CONTACT CHANNELS SUMMARY CARDS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[rgba(255,255,255,0.1)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Registered Office Address */}
            <div className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 hover:border-[#F5BA31]/50 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#F5BA31]/15 text-[#F5BA31] flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-white mb-2">Registered Office</h2>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Office No. 508, 5th Floor, B Wing, Mittal Commercial Premises CHS Ltd, Off M.V. Road, Near Mittal Estate,
                  Marol, Andheri (East), Mumbai - 400059, Maharashtra, India.
                </p>
                <p className="text-[11px] text-neutral-500 mt-2">
                  Branch: A/103, Mittal Commercial Premises, Marol, Andheri East.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#3AA17E] font-semibold">
                Near Marol Naka Metro Station
              </div>
            </div>

            {/* Card 2: Phone Helpline */}
            <div className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 hover:border-[#F5BA31]/50 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#3AA17E]/15 text-[#3AA17E] flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-white mb-2">Phone Support</h2>
                <p className="text-xs text-neutral-400 mb-2">Direct client advisory helpline:</p>
                <a
                  href="tel:+918655387833"
                  className="text-lg font-bold font-mono text-white hover:text-[#F5BA31] transition-colors block"
                >
                  +91 8655387833
                </a>
                <p className="text-[11px] text-neutral-500 mt-2">
                  Available during market operating hours.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-neutral-400">
                Priority support for active subscribers.
              </div>
            </div>

            {/* Card 3: Email Contacts */}
            <div className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 hover:border-[#F5BA31]/50 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FF8415]/15 text-[#FF8415] flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-white mb-2">Email Channels</h2>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-neutral-500 block">General & Support:</span>
                    <a href="mailto:support@myadvisoralpha.com" className="text-white hover:text-[#F5BA31] font-mono">
                      support@myadvisoralpha.com
                    </a>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Compliance & Grievance:</span>
                    <a href="mailto:support@renaissanceadvisors.in" className="text-white hover:text-[#F5BA31] font-mono">
                      support@renaissanceadvisors.in
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-neutral-400">
                Turnaround: 24–48 business hours.
              </div>
            </div>

            {/* Card 4: Operating Hours */}
            <div className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 hover:border-[#F5BA31]/50 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#3DA2F1]/15 text-[#3DA2F1] flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-white mb-2">Operating Hours</h2>
                <div className="text-xs text-neutral-300 space-y-1">
                  <div className="font-semibold text-white">9:00 AM – 6:00 PM IST</div>
                  <div className="text-neutral-400">Monday to Friday</div>
                  <div className="text-[11px] text-neutral-500 pt-1">
                    Closed on Saturdays, Sundays, and NSE/BSE Trading Holidays.
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#3AA17E]">
                Web Portal active 24/7/365
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE FORM & OFFICE TRANSIT SPLIT SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT COLUMN: INTERACTIVE CONSULTATION INQUIRY FORM */}
            <div className="lg:col-span-7">
              <div className="bg-[#0B1528] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
                {isSuccess ? (
                  /* SUCCESS STATE */
                  <div className="text-center py-10 space-y-5 animate-in fade-in duration-300">
                    <div className="w-16 h-16 rounded-full bg-[#3AA17E]/20 text-[#3AA17E] border-2 border-[#3AA17E] flex items-center justify-center mx-auto shadow-lg">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono text-[#3AA17E] font-bold tracking-wider">
                        INQUIRY CONFIRMED {confirmationTicket}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        Thank You, {formData.name.split(' ')[0]}!
                      </h2>
                      <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                        Your advisory consultation request has been routed to our research desk. A SEBI-registered advisor
                        will contact you at <strong className="text-white">+91 {formData.phone}</strong> within 24 business
                        hours.
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 max-w-md mx-auto text-left text-xs text-neutral-300 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Service Interest:</span>
                        <strong className="text-white">{formData.service}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Portfolio Category:</span>
                        <strong className="text-white">{formData.portfolioSize}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Registered Email:</span>
                        <strong className="text-white">{formData.email}</strong>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-xs font-semibold px-6 py-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  /* INPUT FORM */
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F5BA31] mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Schedule Free Advisory Review</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        Request a Consultation
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                        Fill in your details below and an analyst from Pankaj Murarka’s team will review your portfolio goals.
                      </p>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Full Name <span className="text-[#DD5240]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full bg-[#081026] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors border ${
                          errors.name ? 'border-[#DD5240]' : 'border-white/15 focus:border-[#F5BA31]'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-[#DD5240] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* 2-Column: Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone with +91 Prefix */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Mobile Number <span className="text-[#DD5240]">*</span>
                        </label>
                        <div
                          className={`flex items-center bg-[#081026] rounded-xl px-3 border transition-colors ${
                            errors.phone ? 'border-[#DD5240]' : 'border-white/15 focus-within:border-[#F5BA31]'
                          }`}
                        >
                          <span className="text-xs font-bold text-neutral-400 pr-2 border-r border-white/20">
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            value={formData.phone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              setFormData({ ...formData, phone: val });
                              if (errors.phone) setErrors({ ...errors, phone: undefined });
                            }}
                            placeholder="9820012345"
                            className="w-full bg-transparent px-2.5 py-3 text-sm text-white placeholder-neutral-600 outline-none"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-[11px] text-[#DD5240] mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Email Address <span className="text-[#DD5240]">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          placeholder="rahul@example.com"
                          className={`w-full bg-[#081026] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors border ${
                            errors.email ? 'border-[#DD5240]' : 'border-white/15 focus:border-[#F5BA31]'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-[#DD5240] mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 2-Column: Advisory Service & Portfolio Size */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Service Interested In */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Advisory Service of Interest
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-[#081026] border border-white/15 focus:border-[#F5BA31] rounded-xl px-3 py-3 text-sm text-white outline-none"
                        >
                          <option value="Single Stock Advisory">Single Stock Advisory (₹999/mo)</option>
                          <option value="Equity Model Portfolios">Equity Model Portfolios (₹299/mo)</option>
                          <option value="Curated Mutual Funds">Curated Mutual Funds (Zero Fee)</option>
                          <option value="Comprehensive Portfolio Review">Comprehensive Portfolio Review</option>
                        </select>
                      </div>

                      {/* Portfolio Size */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Current Portfolio Size <span className="text-[#DD5240]">*</span>
                        </label>
                        <select
                          value={formData.portfolioSize}
                          onChange={(e) => {
                            setFormData({ ...formData, portfolioSize: e.target.value });
                            if (errors.portfolioSize) setErrors({ ...errors, portfolioSize: undefined });
                          }}
                          className={`w-full bg-[#081026] rounded-xl px-3 py-3 text-sm text-white outline-none border ${
                            errors.portfolioSize ? 'border-[#DD5240]' : 'border-white/15 focus:border-[#F5BA31]'
                          }`}
                        >
                          <option value="">Select Portfolio Range...</option>
                          <option value="< ₹1 Lakh">&lt; ₹1 Lakh (Beginner / SIP)</option>
                          <option value="₹1 Lakh – ₹5 Lakhs">₹1 Lakh – ₹5 Lakhs (Growth)</option>
                          <option value="₹5 Lakhs – ₹25 Lakhs">₹5 Lakhs – ₹25 Lakhs (HNI Advisory)</option>
                          <option value="> ₹25 Lakhs">&gt; ₹25 Lakhs (Institutional / High Alpha)</option>
                        </select>
                        {errors.portfolioSize && (
                          <p className="text-[11px] text-[#DD5240] mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.portfolioSize}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message / Specific Queries */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Specific Investment Goals or Questions (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your investment horizon, existing demat holdings, or specific queries..."
                        className="w-full bg-[#081026] border border-white/15 focus:border-[#F5BA31] rounded-xl p-3.5 text-sm text-white placeholder-neutral-600 outline-none"
                      />
                    </div>

                    {/* Mandatory Consent Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(e) => {
                            setFormData({ ...formData, consent: e.target.checked });
                            if (errors.consent) setErrors({ ...errors, consent: undefined });
                          }}
                          className="mt-0.5 w-4 h-4 rounded border-white/30 text-[#F5BA31] focus:ring-0 focus:ring-offset-0 bg-[#081026]"
                        />
                        <span className="text-xs text-neutral-400 leading-relaxed">
                          I agree to the{' '}
                          <Link href="/legal/terms-and-conditions" className="text-[#F5BA31] underline hover:text-white">
                            Terms & Conditions
                          </Link>{' '}
                          and authorise MyAdvisorAlpha to contact me regarding research advisory alerts via Phone,
                          WhatsApp, SMS, or Email.
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-[11px] text-[#DD5240] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.consent}
                        </p>
                      )}
                    </div>

                    {/* Submit CTA Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-shimmer w-full bg-[#F5BA31] hover:bg-[#e5ab28] disabled:bg-neutral-700 text-[#081026] font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-[#081026]/30 border-t-[#081026] rounded-full animate-spin" />
                            <span>Routing to Advisor Desk...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Request for Callback</span>
                            <Send className="w-4 h-4 text-[#081026]" />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-[11px] text-center text-neutral-500 flex items-center justify-center gap-1.5">
                      <Lock className="w-4 h-4 text-neutral-400" />
                      <span>Confidential & Secure. Your contact information is never shared with third parties.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: WHY CONSULT MYADVISORALPHA & LOCATION CARD */}
            <div className="lg:col-span-5 space-y-6">
              {/* Trust Highlights */}
              <div className="bg-[#0B1528] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#3AA17E]" />
                  <span>Why Consult MyAdvisorAlpha?</span>
                </h3>

                <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Ex-Axis AMC CIO Leadership:</strong> Strategies guided directly by
                      Pankaj Murarka with 30+ years institutional equity experience.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">75% Historical Strike Rate:</strong> Disciplined multi-target profit
                      booking and pre-defined stop-losses.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Zero Broker Commission Conflicts:</strong> Pure SEBI-registered Research
                      Analyst fee model.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">100% Custody Safety:</strong> Execute directly via Zerodha, Groww, Angel
                      One, or Upstox.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Transit & Office Directions Card */}
              <div className="bg-[#0B1528] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#F5BA31]" />
                    <span>Visiting Our Mumbai Office</span>
                  </h3>
                  <span className="text-[10px] text-[#3AA17E] font-semibold bg-[#3AA17E]/10 px-2 py-0.5 rounded border border-[#3AA17E]/30">
                    Metro Accessible
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  Located conveniently in the commercial business corridor of Andheri East, right off Andheri-Kurla Road.
                </p>

                <div className="bg-white/5 rounded-xl p-3.5 text-xs text-neutral-300 space-y-1.5 border border-white/5">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#F5BA31]" />
                    <span>Mittal Commercial Premises CHS Ltd</span>
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Office No. 508, 5th Floor, B Wing, Near Mittal Estate, Marol, Andheri (East), Mumbai - 400059.
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5"><Train className="w-4 h-4 text-[#F5BA31]" /> <span><strong>By Metro:</strong> 5-minute walk from Marol Naka Metro Station (Line 1 & Line 3).</span></div>
                  <div className="flex items-center gap-1.5"><Plane className="w-4 h-4 text-[#F5BA31]" /> <span><strong>By Air:</strong> 15 minutes from Mumbai Chhatrapati Shivaji Maharaj International Airport (T2).</span></div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Mittal+Commercial+Marol+Andheri+East+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#F5BA31] hover:text-white"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Grievance Redressal Direct Link Box */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-xs text-neutral-400 space-y-2">
                <div className="font-semibold text-white">Investor Grievance Redressal:</div>
                <p>
                  For escalation to compliance or principal officer, please review our official 5-tier escalation matrix.
                </p>
                <Link
                  href="/legal/grievance-redressal-escalation-matrix"
                  className="inline-flex items-center gap-1 text-[#F5BA31] hover:underline font-semibold"
                >
                  <span>View Grievance Escalation Matrix</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
