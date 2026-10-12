import { getCurrentCohort, getDeadlineText } from '@/lib/site';

/** Application-deadline band. Renders nothing while applications are not live. */
export default function DeadlineBand() {
  const deadline = getDeadlineText(getCurrentCohort());
  if (!deadline) return null;
  return (
    <section className="event-date" aria-label="Application deadline">
      <div className="event-date__bg" aria-hidden="true" />
      <div className="event-date__inner">
        <span className="event-date__label">Applications close</span>
        <p className="event-date__value">{deadline}</p>
      </div>
    </section>
  );
}
