import styles from './fop.module.css';

export type ArrowLength = 32 | 45 | 55;

export function Arrow({
  length = 45,
  direction = 'right',
}: {
  length?: ArrowLength;
  direction?: 'right' | 'left';
}) {
  const end = length - 1;
  return (
    <svg
      className={`${styles['fop-arrow']}${direction === 'left' ? ` ${styles['fop-arrow--left']}` : ''}`}
      width={length}
      height={16}
      viewBox={`0 0 ${length} 16`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      focusable="false"
    >
      <path d={`M0 8H${end}M${end - 7} 1L${end} 8L${end - 7} 15`} />
    </svg>
  );
}
