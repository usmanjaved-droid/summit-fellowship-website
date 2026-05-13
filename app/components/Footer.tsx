'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold mb-4">Summit Fellowship</h3>
            <p className="text-gray-400 text-sm">
              A 7-day intensive retreat transforming social entrepreneurs from project-driven organizations to scale-ready impact machines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Pages</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/fellows" className="text-gray-400 hover:text-white transition-colors">Fellows</Link></li>
              <li><Link href="/faculty" className="text-gray-400 hover:text-white transition-colors">Faculty</Link></li>
              <li><Link href="/schedule" className="text-gray-400 hover:text-white transition-colors">Schedule</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: <a href="mailto:summit@taleemabad.com" className="text-white hover:text-blue-400">summit@taleemabad.com</a></li>
              <li>Organizing Team: Muhammad Usman Javed</li>
            </ul>
          </div>

          {/* Co-hosts */}
          <div>
            <h4 className="font-bold mb-4">Co-Hosts</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://taleemabad.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Taleemabad</a></li>
              <li><a href="https://mulagofoundation.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Mulago Foundation</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {currentYear} Summit Fellowship. All rights reserved. | Co-hosted by Taleemabad & Mulago Foundation
          </p>
        </div>
      </div>
    </footer>
  );
}
