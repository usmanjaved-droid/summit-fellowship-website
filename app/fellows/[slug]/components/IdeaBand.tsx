import { Fellow } from '@/lib/fellows';
import styles from '../page.module.css';

type IdeaBandProps = {
  fellow: Fellow;
};

export function IdeaBand({ fellow }: IdeaBandProps) {
  return (
    <section className={styles['idea-band']}>
      <div className={styles['idea-band__inner']}>
        <p className={styles['idea-band__label']}>— BIG IDEA</p>
        <p className={styles['idea-band__tagline']}>"{fellow.tagline}"</p>
      </div>
    </section>
  );
}
