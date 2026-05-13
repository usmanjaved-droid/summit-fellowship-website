'use client';
import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  /** Tone color applied via mix-blend-mode: color. Defaults to brand lake-dark. */
  toneColor?: string;
  className?: string;
  /** Aspect ratio used by the wrapping box. Default 3:2. */
  aspect?: string;
  priority?: boolean;
  sizes?: string;
};

export default function DuotoneImage({
  src,
  alt,
  toneColor = 'var(--color-lake-dark)',
  className = '',
  aspect = '3 / 2',
  priority,
  sizes = '(min-width: 1024px) 40vw, 100vw',
}: Props) {
  return (
    <div
      className={`relative overflow-hidden group ${className}`}
      style={{ aspectRatio: aspect, backgroundColor: 'var(--color-cloud-white)' }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-[filter] duration-500 ease-out
                   [filter:grayscale(1)_contrast(1.05)_brightness(0.95)]
                   group-hover:[filter:grayscale(0)_contrast(1)_brightness(1)]
                   group-focus-within:[filter:grayscale(0)_contrast(1)_brightness(1)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-500 ease-out
                   opacity-80 group-hover:opacity-0 group-focus-within:opacity-0"
        style={{ backgroundColor: toneColor, mixBlendMode: 'color' }}
      />
    </div>
  );
}
