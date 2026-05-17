'use client';

import { useRouter } from 'next/navigation';
import styles from '../page.module.css';

export function FellowNavigation() {
  const router = useRouter();

  return (
    <div className={styles['fellow-navigation']}>
      <button
        onClick={() => router.back()}
        className={styles['fellow-navigation__close']}
        aria-label="Back to all fellows"
      >
        ×
      </button>
    </div>
  );
}
