'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cname">Your name</label>
          <input id="cname" type="text" required />
        </div>
        <div className="form-group">
          <label htmlFor="cemail">Email</label>
          <input id="cemail" type="email" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="ctopic">What&rsquo;s this about?</label>
        <select id="ctopic" required defaultValue="">
          <option value="">Pick one…</option>
          <option>General enquiry</option>
          <option>Logistics / travel / visa</option>
          <option>Curriculum / faculty</option>
          <option>Press / media</option>
          <option>Partnership</option>
          <option>Future cohort (Vol. 02)</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cmsg">Your message</label>
        <textarea id="cmsg" rows={4} required />
      </div>
      <button type="submit" className="btn btn--ochre form-submit">Send note →</button>
      <div className="form-status" aria-live="polite">
        {submitted && "✓ Thanks — we'll reply within one working day."}
      </div>
    </form>
  );
}
