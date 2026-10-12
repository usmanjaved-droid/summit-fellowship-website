import Image from 'next/image';
import { Fellow, initials } from '@/lib/fellows';
import { FellowNavigation } from './FellowNavigation';
import styles from './fellow-detail.module.css';

type FellowHeroProps = {
  fellow: Fellow;
  number: number;
  total: number;
  /** Where the top-right close link goes (the cohort's fellows grid). */
  backHref: string;
  year: number;
};

export function FellowHero({ fellow, number, total, backHref, year }: FellowHeroProps) {
  const fellowInitials = initials(fellow.name);

  return (
    <section className={styles['fellow-hero']}>
      <FellowNavigation backHref={backHref} year={year} />
      <div className={styles['fellow-hero__inner']}>
        <div className={styles['fellow-hero__content']}>
          <p className={styles['fellow-hero__meta']}>
            FELLOW NO. {number.toString().padStart(2, '0')} / {total} / {fellow.sector.toUpperCase()}
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
              sizes="(max-width: 640px) 200px, 300px"
              className={styles['fellow-hero__photo']}
              priority
            />
          ) : (
            <div className={styles['fellow-hero__avatar']}>{fellowInitials}</div>
          )}
        </div>
      </div>
    </section>
  );
}
