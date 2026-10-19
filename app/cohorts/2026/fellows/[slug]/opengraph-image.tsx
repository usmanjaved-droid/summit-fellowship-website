import { ImageResponse } from 'next/og';
import { getAllFellows, getFellow, initials } from '@/lib/fellows';
import { OG_COLORS, OG_SIZE, ogFonts, ogImageSrc } from '@/lib/og';

/** Link preview for a fellow: photo, name, organisation, and their big idea on a yellow band. */
const YEAR = 2026;

export const alt = 'Friends of Pakistan Fellow';
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllFellows(YEAR).map((f) => ({ slug: f.id }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fellow = getFellow(YEAR, slug);
  const photo = fellow?.photo_url ? await ogImageSrc(fellow.photo_url) : null;

  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: OG_COLORS.green }}>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', padding: '0 64px', gap: 56 }}>
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="" width={300} height={300} style={{ objectFit: 'cover' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 300, height: 300, background: OG_COLORS.black, color: OG_COLORS.white, fontFamily: 'Crimson Pro', fontSize: 120 }}>
              {initials(fellow?.name ?? '')}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ fontFamily: 'Source Sans 3', fontSize: 20, letterSpacing: 3, color: OG_COLORS.yellow }}>
              {`FRIENDS OF PAKISTAN FELLOW · ${YEAR}`}
            </div>
            <div style={{ fontFamily: 'Crimson Pro', fontSize: 68, lineHeight: 1.05, color: OG_COLORS.white, marginTop: 16 }}>
              {fellow?.name ?? 'Friends of Pakistan Fellowship'}
            </div>
            {fellow?.org && (
              <div style={{ fontFamily: 'Source Sans 3', fontSize: 28, color: OG_COLORS.white, marginTop: 14 }}>{fellow.org}</div>
            )}
          </div>
        </div>
        {fellow?.tagline && (
          <div style={{ display: 'flex', background: OG_COLORS.yellow, padding: '30px 64px' }}>
            <div style={{ fontFamily: 'Crimson Pro', fontSize: 40, lineHeight: 1.15, color: OG_COLORS.black }}>{fellow.tagline}</div>
          </div>
        )}
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
