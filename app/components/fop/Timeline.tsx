import styles from './fop.module.css';

export function Timeline({
  stages,
  current = -1,
  label = 'Progress',
}: {
  stages: string[];
  current?: number;
  label?: string;
}) {
  return (
    <ol className={styles['fop-timeline']} aria-label={label}>
      {stages.map((s, i) => (
        <li
          key={`${s}-${i}`}
          className={`${styles['fop-timeline__dot']}${
            i <= current ? ` ${styles['fop-timeline__dot--reached']}` : ''
          }`}
          aria-current={i === current ? 'step' : undefined}
        >
          <span className={styles['fop-sr']}>{s}</span>
        </li>
      ))}
    </ol>
  );
}
