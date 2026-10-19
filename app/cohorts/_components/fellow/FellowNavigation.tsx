import { Button } from '@/app/components/fop';
import styles from './fellow-detail.module.css';

type FellowNavigationProps = {
  backHref: string;
  year: number;
};

export function FellowNavigation({ backHref, year }: FellowNavigationProps) {
  return (
    <div className={styles['fellow-navigation']}>
      <Button
        href={backHref}
        variant="white"
        size="sm"
        className={styles['fellow-navigation__close']}
        aria-label={`Back to all ${year} fellows`}
      >
        <span aria-hidden="true">×</span>
      </Button>
    </div>
  );
}
