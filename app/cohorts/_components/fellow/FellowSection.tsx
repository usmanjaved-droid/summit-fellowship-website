import { Prose } from '@/app/components/fop';
import styles from './fellow-detail.module.css';

type FellowSectionProps = {
  title: string;
  content?: string;
  children?: React.ReactNode;
};

export function FellowSection({ title, content, children }: FellowSectionProps) {
  return (
    <section className={styles['fellow-section']}>
      <Prose>
        <h2>{title}</h2>
        {children ?? <p>{content}</p>}
      </Prose>
    </section>
  );
}
