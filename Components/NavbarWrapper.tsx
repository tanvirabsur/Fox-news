'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/Components/Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  return <Navbar />;
}
