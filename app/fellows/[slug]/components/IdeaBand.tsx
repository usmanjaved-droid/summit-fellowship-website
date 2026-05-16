import { Fellow } from '@/lib/fellows';

type IdeaBandProps = {
  fellow: Fellow;
};

export function IdeaBand({ fellow }: IdeaBandProps) {
  return (
    <section className="idea-band">
      <div className="idea-band__inner">
        <p className="idea-band__tagline">{fellow.tagline}</p>
      </div>
    </section>
  );
}
