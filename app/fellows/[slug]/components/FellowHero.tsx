import Image from 'next/image';
import { Fellow, getAllFellows } from '@/lib/fellows';
import styles from '../page.module.css';

type FellowHeroProps = {
  fellow: Fellow;
};

export function FellowHero({ fellow }: FellowHeroProps) {
  const initials = fellow.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const allFellows = getAllFellows();
  const fellowNumber = allFellows.findIndex((f) => f.id === fellow.id) + 1;

  return (
    <section className={styles['fellow-hero']}>
      <div className={styles['fellow-hero__inner']}>
        <div className={styles['fellow-hero__content']}>
          <p className={styles['fellow-hero__meta']}>
            FELLOW NO. {fellowNumber.toString().padStart(2, '0')} / {allFellows.length} / {fellow.sector.toUpperCase()}
          </p>
          <h1 className={styles['fellow-hero__name']}>{fellow.name}</h1>
          <p className={styles['fellow-hero__problem']}>{fellow.idea_context}</p>
        </div>
        <div className={styles['fellow-hero__media']}>
          {fellow.photo_url ? (
            <Image
              src={fellow.photo_url}
              alt={fellow.name}
              width={300}
              height={300}
              className={styles['fellow-hero__photo']}
              priority
            />
          ) : (
            <div className={styles['fellow-hero__avatar']}>{initials}</div>
          )}
        </div>
      </div>
    </section>
  );
}
