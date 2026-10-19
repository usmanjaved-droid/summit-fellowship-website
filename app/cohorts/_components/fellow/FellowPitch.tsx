import { ArrowLink } from '@/app/components/fop';
import { pitchEmbedUrl, type Fellow } from '@/lib/fellows';
import styles from './fellow-detail.module.css';

/** "Watch the pitch": the recorded pitch played in place (Google Drive player), with a link to the deck. */
export function FellowPitch({ fellow }: { fellow: Fellow }) {
  const embed = pitchEmbedUrl(fellow.pitch_url);
  if (!embed && !fellow.deck_url) return null;
  return (
    <section className={styles['fellow-pitch']} aria-labelledby="fellow-pitch-heading">
      <h2 id="fellow-pitch-heading" className={`t-heading-2 ${styles['fellow-pitch__heading']}`}>
        Watch the pitch
      </h2>
      {embed && (
        <div className={styles['fellow-pitch__video']}>
          <iframe
            src={embed}
            title={`${fellow.name}, ${fellow.org}: pitch video`}
            loading="lazy"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      )}
      <div className={styles['fellow-pitch__links']}>
        {fellow.deck_url && (
          <ArrowLink href={fellow.deck_url} external>
            View the deck
          </ArrowLink>
        )}
        {fellow.pitch_url && (
          <ArrowLink href={fellow.pitch_url} external>
            Open the video in Google Drive
          </ArrowLink>
        )}
      </div>
    </section>
  );
}
