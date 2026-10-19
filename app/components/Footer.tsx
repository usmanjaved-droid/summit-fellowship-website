import Link from 'next/link';
import { PRIMARY_LINKS, getNavGroups } from '@/lib/navigation';
import { ArrowLink } from './fop';

const COLUMNS = [
  ...getNavGroups(),
  { label: 'Apply', links: [{ href: '/apply', label: 'How to apply' }, ...PRIMARY_LINKS] },
];

export default function Footer() {
  return (
    <footer className="site-footer" data-theme="dark">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          {COLUMNS.map((col) => (
            <div key={col.label} className="site-footer__col">
              <h2 className="t-heading-5">{col.label}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link className="t-body" href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="site-footer__box">
            <h2 className="t-heading-4">Applications</h2>
            <p className="t-body">
              A seven-day intensive for Pakistan&apos;s most promising social enterprises. A Friends of
              Pakistan programme, in partnership with Mulago Foundation and Taleemabad.
            </p>
            <div className="site-footer__go">
              <ArrowLink href="/apply" size="lg">
                Apply
              </ArrowLink>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom t-legal">
          <span className="site-footer__mark wordmark">
            <span className="wordmark__name">Friends of Pakistan</span>
            <span className="wordmark__sub">Fellowship</span>
          </span>
          <span className="site-footer__legal">© {new Date().getFullYear()} · Friends of Pakistan Fellowship</span>
          <span className="site-footer__legal">Friends of Pakistan · Mulago Foundation · Taleemabad</span>
        </div>
      </div>
    </footer>
  );
}
