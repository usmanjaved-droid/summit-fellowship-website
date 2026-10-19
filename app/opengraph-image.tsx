import { ImageResponse } from 'next/og';
import { OG_ALT, OG_COLORS, OG_SIZE, ogFonts, ogImageSrc } from '@/lib/og';

/** Site-wide link preview: the name, the line, and the Skardu photo. Fellow pages have their own. */
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const photo = await ogImageSrc('/images/skardu/Hero Home.jpg');
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: OG_COLORS.green }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 690, padding: '64px 56px 56px 64px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'Source Sans 3', fontSize: 30, color: OG_COLORS.white }}>Friends of Pakistan</div>
            <div style={{ fontFamily: 'Source Sans 3', fontSize: 15, letterSpacing: 5, color: OG_COLORS.yellow, marginTop: 4 }}>FELLOWSHIP</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'Crimson Pro', fontSize: 74, lineHeight: 1.05, color: OG_COLORS.white }}>Designed for scale.</div>
            <div style={{ fontFamily: 'Crimson Pro', fontSize: 30, lineHeight: 1.3, color: OG_COLORS.white, marginTop: 20 }}>
              A seven-day fellowship for Pakistani founders whose solutions are ready to reach millions.
            </div>
          </div>
          <div style={{ display: 'flex', width: 96, height: 8, background: OG_COLORS.yellow }} />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" width={510} height={630} style={{ objectFit: 'cover' }} />
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
