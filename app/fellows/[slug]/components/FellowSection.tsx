type FellowSectionProps = {
  title: string;
  content?: string;
  children?: React.ReactNode;
};

export function FellowSection({ title, content, children }: FellowSectionProps) {
  return (
    <section className="fellow-section">
      <h2 className="fellow-section__title">{title}</h2>
      {children ? (
        <div className="fellow-section__content">{children}</div>
      ) : (
        <p className="fellow-section__content">{content}</p>
      )}
    </section>
  );
}
