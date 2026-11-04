'use client';

import { usePathname } from 'next/navigation';

/** Renders the marketing site's chrome (navbar, footer, sticky bars) everywhere except inside the signed-in app. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/app' || pathname?.startsWith('/app/')) return null;
  return <>{children}</>;
}
