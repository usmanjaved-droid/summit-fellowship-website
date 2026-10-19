'use client';

import { useState } from 'react';

export function buildMailtoHref(
  to: string,
  fields: { name: string; email: string; topic: string; message: string },
): string {
  const subject = `Friends of Pakistan Fellowship enquiry: ${fields.topic}`;
  const body = `${fields.message}\n\n— ${fields.name} (${fields.email})`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm({ contactEmail }: { contactEmail: string }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const get = (k: string) => String(data.get(k) ?? '').trim();
        const href = buildMailtoHref(contactEmail, {
          name: get('name'),
          email: get('email'),
          topic: get('topic'),
          message: get('message'),
        });
        window.location.href = href;
        setSubmitted(true);
      }}
    >
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cname">Your name</label>
          <input id="cname" name="name" type="text" required />
        </div>
        <div className="form-group">
          <label htmlFor="cemail">Email</label>
          <input id="cemail" name="email" type="email" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="ctopic">What&rsquo;s this about?</label>
        <select id="ctopic" name="topic" required defaultValue="">
          <option value="">Pick one…</option>
          <option>Applying / eligibility</option>
          <option>The curriculum</option>
          <option>Partnerships &amp; funding</option>
          <option>Press / media</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cmsg">Your message</label>
        <textarea id="cmsg" name="message" rows={4} required />
      </div>
      <button type="submit" className="btn btn--ochre form-submit">Send note →</button>
      <div className="form-status" aria-live="polite">
        {submitted && `✓ Your email app should now be open with your message ready to send to ${contactEmail}.`}
      </div>
    </form>
  );
}
