import Link from 'next/link';

const PROGRAM = [
  { href: '/curriculum', label: 'Curriculum' },
  { href: '/itinerary', label: 'Itinerary' },
  { href: '/resources', label: 'Resources' },
];

const PEOPLE = [
  { href: '/fellows', label: 'Fellows 2026' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/faculty#organizers', label: 'Organizers' },
];

const EXPLORE = [
  { href: '/venue', label: 'Khoj Resort, Skardu' },
  { href: '/explore-skardu', label: 'Explore Skardu' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="topo-bg" aria-hidden="true" />
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <h3>
              Summit
              <br />
              Fellowship
            </h3>
            <p>
              The Skardu Scale-Up Fellowship. A seven-day intensive for Pakistan&apos;s most
              promising social enterprises, co-hosted by Taleemabad &amp; Mulago Foundation.
            </p>
          </div>
          <div className="site-footer__col">
            <h4>The Program</h4>
            <ul>
              {PROGRAM.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer__col">
            <h4>The People</h4>
            <ul>
              {PEOPLE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer__col">
            <h4>Explore</h4>
            <ul>
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 · Summit Fellowship · Vol. 01</span>
          <span>Skardu · Gilgit-Baltistan · Pakistan</span>
        </div>
      </div>
    </footer>
  );
}
