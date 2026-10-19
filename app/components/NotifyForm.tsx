'use client';

import { useState } from 'react';
import { HONEYPOT_FIELD } from '@/lib/application/handle';
import { Button } from './fop';
import styles from './NotifyForm.module.css';

type Status = { kind: 'idle' | 'sending' | 'done' | 'error'; message?: string };

/** "Get notified when applications open": one email field, posted to /api/notify. */
export default function NotifyForm({ year }: { year: number }) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, [HONEYPOT_FIELD]: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus({ kind: 'done', message: `Thank you. We will email ${email.trim()} when applications for the ${year} cohort open.` });
      } else {
        setStatus({ kind: 'error', message: data.error ?? 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ kind: 'error', message: 'We could not reach the server. Please check your connection and try again.' });
    }
  }

  if (status.kind === 'done') {
    return <p className={`t-body ${styles.done}`} role="status">{status.message}</p>;
  }

  return (
    <form className={styles.notify} onSubmit={submit}>
      <label className={styles.label} htmlFor="notify-email">Get an email when applications open</label>
      <div className={styles.row}>
        <input
          id="notify-email"
          className={styles.input}
          type="email"
          required
          autoComplete="email"
          placeholder="you@organisation.org"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" size="md" disabled={status.kind === 'sending'}>
          {status.kind === 'sending' ? 'Sending…' : 'Notify me'}
        </Button>
      </div>
      <div className={styles.honeypot} aria-hidden="true">
        <label>Leave this empty <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
      </div>
      <p className={`t-body-sm ${styles.note}`} role="status" aria-live="polite">
        {status.kind === 'error' ? status.message : 'One email when applications open. Nothing else.'}
      </p>
    </form>
  );
}
