'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Fellows', href: '/fellows' },
    { label: 'Faculty', href: '/faculty' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Logistics', href: '/logistics' },
    { label: 'Resources', href: '/resources' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[color:var(--color-border)]">
      <nav className="container-max flex items-center justify-between py-5 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex-shrink-0 focus:outline-none focus-visible:ring-2
                     focus-visible:ring-terra-red focus-visible:ring-offset-2 rounded-md"
        >
          <span className="block eyebrow leading-none">Summit</span>
          <span className="block font-serif text-2xl font-semibold text-[color:var(--color-ink)] leading-none mt-1">
            Fellowship
          </span>
        </Link>

        <div className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[0.18em] font-semibold
                         text-[color:var(--color-ink)] hover:text-terra-red
                         transition-colors duration-200 ease-out
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-red
                         focus-visible:ring-offset-2 rounded-md px-1 py-1"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/contact" className="btn-primary text-xs">
            Contact
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-11 h-11 flex items-center justify-center
                     rounded-md hover:bg-slate-warm/10 transition-colors duration-150
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-red
                     focus-visible:ring-offset-2"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-px w-full bg-[color:var(--color-ink)] transition-all duration-300 ${
              isMenuOpen ? 'translate-y-2 rotate-45' : ''
            }`} />
            <span className={`h-px w-full bg-[color:var(--color-ink)] transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`} />
            <span className={`h-px w-full bg-[color:var(--color-ink)] transition-all duration-300 ${
              isMenuOpen ? '-translate-y-2 -rotate-45' : ''
            }`} />
          </span>
        </button>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-[color:var(--color-border)]
                          md:hidden shadow-lg">
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-[color:var(--color-ink)] hover:bg-slate-warm/10
                             hover:text-terra-red rounded-md transition-colors duration-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
}
