import Image from 'next/image';
import { Fellow } from '@/lib/fellows';

type FellowHeroProps = {
  fellow: Fellow;
};

export function FellowHero({ fellow }: FellowHeroProps) {
  const initials = fellow.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <section className="fellow-hero">
      <div className="topo-bg topo-bg--on-dark" aria-hidden="true"></div>
      <div className="fellow-hero__inner">
        <div className="fellow-hero__content">
          <h1 className="fellow-hero__name">{fellow.name}</h1>
          <p className="fellow-hero__problem">{fellow.idea_context}</p>
        </div>
        <div className="fellow-hero__media">
          {fellow.photo_url ? (
            <Image
              src={fellow.photo_url}
              alt={fellow.name}
              width={300}
              height={300}
              className="fellow-hero__photo"
              priority
            />
          ) : (
            <div className="fellow-hero__avatar">{initials}</div>
          )}
        </div>
      </div>
    </section>
  );
}
