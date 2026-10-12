import Link from 'next/link';
import { PRIMARY_LINKS, getNavGroups } from '@/lib/navigation';

const COLUMNS = [
  ...getNavGroups(),
  { label: 'Apply', links: [{ href: '/apply', label: 'How to apply' }, ...PRIMARY_LINKS] },
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
              A seven-day intensive for Pakistan&apos;s most promising social enterprises, co-hosted by
              Taleemabad &amp; Mulago Foundation.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.label} className="site-footer__col">
              <h4>{col.label}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} · Summit Fellowship</span>
          <span>Taleemabad · Mulago Foundation · Pakistan</span>
        </div>
      </div>
    </footer>
  );
}
