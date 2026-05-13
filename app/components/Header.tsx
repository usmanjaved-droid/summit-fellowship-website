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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-warm/10 shadow-xs">
      <nav className="container-max flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold text-slate-warm hover:text-terra-red
                     transition-colors duration-200 focus:outline-none
                     focus:ring-2 focus:ring-terra-red focus:ring-offset-2 rounded-md px-2 py-1 flex-shrink-0"
        >
          <span className="block text-xs uppercase tracking-wider font-semibold">Summit</span>
          <span className="block">Fellowship</span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex gap-12 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-widest text-slate-warm hover:text-terra-red
                         transition-colors duration-200 ease-out
                         focus:outline-none focus:ring-2 focus:ring-terra-red
                         focus:ring-offset-2 rounded-md px-2 py-1 font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:+923001234567"
            className="text-sm text-slate-warm hover:text-terra-red transition-colors flex items-center gap-2"
          >
            <span>📞</span>
            <span>+1 585 506 6307</span>
          </a>
          <Link
            href="/contact"
            className="px-6 py-2 bg-terra-red text-white font-medium rounded-lg
                       hover:bg-[#b82020] transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-terra-red focus:ring-offset-2"
          >
            CONTACT US
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-12 h-12 flex items-center justify-center
                     rounded-lg hover:bg-slate-warm/10 transition-colors duration-150
                     focus:outline-none focus:ring-2 focus:ring-terra-red focus:ring-offset-2"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-lake-dark transition-all duration-300 ${
              isMenuOpen ? 'transform rotate-45 translate-y-2' : ''
            }`} />
            <span className={`h-0.5 w-full bg-lake-dark transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`} />
            <span className={`h-0.5 w-full bg-lake-dark transition-all duration-300 ${
              isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''
            }`} />
          </span>
        </button>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-cloud-white border-b border-slate-warm/20
                          md:hidden shadow-lg">
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-slate-warm hover:bg-slate-warm/10 hover:text-terra-red
                             rounded-lg transition-colors duration-100 ease-out
                             focus:outline-none focus:ring-2 focus:ring-terra-red focus:ring-offset-2"
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
