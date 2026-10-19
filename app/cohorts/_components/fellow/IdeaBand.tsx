import { Fellow } from '@/lib/fellows';
import styles from './fellow-detail.module.css';

type IdeaBandProps = {
  fellow: Fellow;
};

export function IdeaBand({ fellow }: IdeaBandProps) {
  return (
    <section className={styles['idea-band']}>
      <div className={styles['idea-band__inner']}>
        <div className={styles['idea-band__header']}>
          <p className={`t-eyebrow ${styles['idea-band__label']}`}>BIG IDEA</p>
        </div>
        <p className={`t-heading-2 ${styles['idea-band__tagline']}`}>{fellow.tagline}</p>
      </div>
    </section>
  );
}
