'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-blue-600">
            Summit
          </div>
          <span className="text-sm font-medium text-gray-600">Fellowship</span>
        </Link>

        {/* Navigation - will be handled by Navigation component */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            About
          </Link>
          <Link href="/fellows" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Fellows
          </Link>
          <Link href="/faculty" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Faculty
          </Link>
          <Link href="/schedule" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Schedule
          </Link>
          <Link href="/logistics" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Logistics
          </Link>
          <Link href="/resources" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Resources
          </Link>
        </nav>

        {/* Mobile menu button will go here in future */}
      </div>
    </header>
  );
}
