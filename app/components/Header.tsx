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
    <header className="sticky top-0 z-50 bg-cloud-white border-b border-slate-warm/20 shadow-sm">
      <nav className="container-max flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-lake-dark hover:text-terra-red
                     transition-colors duration-100 focus:outline-none
                     focus:ring-2 focus:ring-terra-red focus:ring-offset-2 rounded-md px-2 py-1"
        >
          Summit Fellowship
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-warm font-medium hover:text-terra-red
                         transition-colors duration-100 ease-out
                         focus:outline-none focus:ring-2 focus:ring-terra-red
                         focus:ring-offset-2 rounded-md px-2 py-1"
            >
              {item.label}
            </Link>
          ))}
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
