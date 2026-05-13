import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-cloud-white">
      <div className="container-max py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-moss-light">Summit Fellowship</h3>
          <p className="text-cloud-white/80">
            A 7-day intensive retreat for Pakistani social entrepreneurs focused on scaling impact.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-moss-light">Quick Links</h3>
          <ul className="space-y-2">
            {['About', 'Fellows', 'Schedule', 'Logistics'].map((link) => (
              <li key={link}>
                <Link
                  href={`/${link.toLowerCase()}`}
                  className="text-cloud-white/80 hover:text-terra-red transition-colors duration-100
                             focus:outline-none focus:ring-2 focus:ring-terra-red focus:ring-offset-2 rounded px-1"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-moss-light">Contact</h3>
          <p className="text-cloud-white/80">
            Email: <a href="mailto:info@summitweb.com" className="text-terra-red hover:underline">
              info@summitweb.com
            </a>
          </p>
          <p className="text-cloud-white/80 mt-2">
            Organized by Taleemabad & Mulago Foundation
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-moss-light/20 py-6">
        <div className="container-max flex flex-col md:flex-row justify-between items-center text-cloud-white/60 text-sm">
          <p>&copy; 2026 Summit Fellowship. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-terra-red transition-colors duration-100">LinkedIn</a>
            <a href="#" className="hover:text-terra-red transition-colors duration-100">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
