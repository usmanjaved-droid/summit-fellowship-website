import Link from 'next/link';
import { Fellow } from '@/lib/fellows';

type FellowNavigationProps = {
  prevFellow?: Fellow;
  nextFellow?: Fellow;
};

export function FellowNavigation({ prevFellow, nextFellow }: FellowNavigationProps) {
  return (
    <nav className="fellow-navigation">
      <div className="fellow-navigation__col fellow-navigation__col--left">
        {prevFellow ? (
          <Link href={`/fellows/${prevFellow.id}`} className="fellow-navigation__link">
            ← {prevFellow.name}
          </Link>
        ) : (
          <span></span>
        )}
      </div>

      <div className="fellow-navigation__col fellow-navigation__col--center">
        <Link href="/fellows" className="fellow-navigation__link">
          Back to all fellows
        </Link>
      </div>

      <div className="fellow-navigation__col fellow-navigation__col--right">
        {nextFellow ? (
          <Link href={`/fellows/${nextFellow.id}`} className="fellow-navigation__link">
            {nextFellow.name} →
          </Link>
        ) : (
          <span></span>
        )}
      </div>
    </nav>
  );
}
