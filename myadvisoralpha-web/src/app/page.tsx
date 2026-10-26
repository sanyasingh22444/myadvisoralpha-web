'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import StackedShowcase from '@/components/sections/StackedShowcase';
import ComparisonGrid from '@/components/sections/ComparisonGrid';
import Testimonials from '@/components/sections/Testimonials';
import FaqAccordion from '@/components/sections/FaqAccordion';
import SipCalculator from '@/components/calculators/SipCalculator';
import LeadCaptureModal from '@/components/modals/LeadCaptureModal';

export default function HomePage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [modalPrefillPhone, setModalPrefillPhone] = useState<string | undefined>(undefined);
  const [modalPrefillPortfolio, setModalPrefillPortfolio] = useState<string | undefined>(undefined);

  const handleOpenConsultation = (phone?: string, portfolioCategory?: string) => {
    if (phone) setModalPrefillPhone(phone);
    if (portfolioCategory) setModalPrefillPortfolio(portfolioCategory);
    setIsLeadModalOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsLeadModalOpen(false);
    setModalPrefillPhone(undefined);
    setModalPrefillPortfolio(undefined);
  };

  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ phone?: string; portfolioSize?: string }>;
      if (customEvent.detail) {
        handleOpenConsultation(customEvent.detail.phone, customEvent.detail.portfolioSize);
      } else {
        handleOpenConsultation();
      }
    };
    window.addEventListener('open-consultation-modal', handleOpenEvent);
    return () => window.removeEventListener('open-consultation-modal', handleOpenEvent);
  }, []);

  return (
    <div className="flex-1 flex flex-col w-full bg-[#010101]">
      {/* 1. High-Converting Hero Section */}
      <HeroSection onOpenConsultation={(phone) => handleOpenConsultation(phone)} />

      {/* 2. Signature 5-Card Stacked Showcase */}
      <StackedShowcase />

      {/* 3. "Stop Guessing. Start Growing." Comparison Matrix */}
      <ComparisonGrid onOpenConsultation={() => handleOpenConsultation()} />

      {/* 4. Interactive SIP & Wealth Growth Calculator with Alpha Pro Banner */}
      <SipCalculator onOpenConsultation={(portfolio) => handleOpenConsultation(undefined, portfolio)} />

      {/* 5. 4.9 Star Verified Investor Testimonials */}
      <Testimonials onOpenConsultation={() => handleOpenConsultation()} />

      {/* 6. Expandable FAQ Accordion */}
      <FaqAccordion onOpenConsultation={() => handleOpenConsultation()} />

      {/* Global Interactive Consultation Booking Modal */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={handleCloseConsultation}
        initialPhone={modalPrefillPhone}
        initialPortfolioSize={modalPrefillPortfolio}
      />
    </div>
  );
}
