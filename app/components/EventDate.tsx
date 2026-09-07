/**
 * Event date band. Replaced the live countdown once the fellowship
 * concluded (June 2026) — now a static record of when it ran.
 */
export default function EventDate() {
  return (
    <section className="event-date" aria-label="Fellowship dates">
      <div className="event-date__bg" aria-hidden="true" />
      <div className="event-date__inner">
        <span className="event-date__label">The expedition</span>
        <p className="event-date__value">June 7&ndash;14, 2026</p>
      </div>
    </section>
  );
}
