interface HeroSectionProps {
  title: string;
  subtitle?: string;
  gradient?: 'alpine-lake' | 'skardu-horizon' | 'forest-shadow';
}

export default function HeroSection({
  title,
  subtitle,
  gradient = 'alpine-lake',
}: HeroSectionProps) {
  const gradientMap = {
    'alpine-lake': 'bg-alpine-lake',
    'skardu-horizon': 'bg-skardu-horizon',
    'forest-shadow': 'bg-forest-shadow',
  };

  return (
    <div className={`${gradientMap[gradient]} py-24 md:py-32 text-cloud-white`}>
      <div className="container-max">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-cloud-white/90 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
