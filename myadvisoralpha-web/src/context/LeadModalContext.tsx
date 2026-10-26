'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import LeadCaptureModal, { LeadFormData } from '@/components/modals/LeadCaptureModal';

export interface LeadModalOpenOptions {
  phone?: string;
  portfolioSize?: string;
  investmentGoal?: string;
  source?: 'navbar' | 'hero' | 'calculator' | 'pricing' | 'footer' | string;
}

export interface LeadModalContextValue {
  isOpen: boolean;
  options: LeadModalOpenOptions;
  openLeadModal: (optionsOrPhone?: LeadModalOpenOptions | string) => void;
  closeLeadModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextValue | undefined>(undefined);

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<LeadModalOpenOptions>({});

  const openLeadModal = useCallback((optionsOrPhone?: LeadModalOpenOptions | string) => {
    if (typeof optionsOrPhone === 'string') {
      setOptions({ phone: optionsOrPhone });
    } else if (optionsOrPhone) {
      setOptions(optionsOrPhone);
    } else {
      setOptions({});
    }
    setIsOpen(true);
  }, []);

  const closeLeadModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSuccess = useCallback((ticketCode: string, data: LeadFormData) => {
    // Telemetry or logging hook if dataLayer exists
    if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: 'lead_form_submitted',
        ticketCode,
        portfolioSize: data.portfolioSize,
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      options,
      openLeadModal,
      closeLeadModal,
    }),
    [isOpen, options, openLeadModal, closeLeadModal]
  );

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <LeadCaptureModal
        isOpen={isOpen}
        onClose={closeLeadModal}
        initialPhone={options.phone}
        initialPortfolioSize={options.portfolioSize}
        initialInvestmentGoal={options.investmentGoal}
        source={options.source}
        onSuccess={handleSuccess}
      />
    </LeadModalContext.Provider>
  );
}

export function useLeadModal(): LeadModalContextValue {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error('useLeadModal must be used within a LeadModalProvider');
  }
  return context;
}
