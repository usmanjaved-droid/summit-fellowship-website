import styles from '../page.module.css';

type FellowSectionProps = {
  title: string;
  content?: string;
  children?: React.ReactNode;
};

export function FellowSection({ title, content, children }: FellowSectionProps) {
  return (
    <section className={styles['fellow-section']}>
      <h2 className={styles['fellow-section__title']}>{title}</h2>
      {children ? (
        <div className={styles['fellow-section__content']}>{children}</div>
      ) : (
        <p className={styles['fellow-section__content']}>{content}</p>
      )}
    </section>
  );
}
