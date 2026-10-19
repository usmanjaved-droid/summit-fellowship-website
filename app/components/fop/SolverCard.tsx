import Link from 'next/link';
import Image from 'next/image';
import styles from './fop.module.css';

export function SolverCard({
  name,
  description,
  image,
  href,
  fallback,
}: {
  name: string;
  description?: string;
  image?: string | null;
  href?: string;
  fallback?: string;
}) {
  return (
    <div className={styles['fop-tile']}>
      {image ? (
        <Image src={image} alt="" fill sizes="(max-width: 640px) 100vw, 450px" />
      ) : (
        <div className={styles['fop-tile__fallback']} aria-hidden="true">
          {fallback}
        </div>
      )}
      <div className={styles['fop-tile__scrim']} />
      <div className={styles['fop-tile__cap']}>
        <div className={styles['fop-tile__rule']}>
          <h3>{name}</h3>
          {description && <p>{description}</p>}
        </div>
      </div>
      {href &&
        (href.startsWith('/') ? (
          <Link href={href} className={styles['fop-tile__link']} aria-label={name} />
        ) : (
          <a href={href} className={styles['fop-tile__link']} aria-label={name} />
        ))}
    </div>
  );
}
