'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Opens every new page at the top, unless the link points at a section on it
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
