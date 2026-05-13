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
    <section className={`${gradientMap[gradient]} hero-section hero-gradient`}>
      <div className="container-max hero-gradient-text">
        <h1 className="text-cloud-white mb-6">{title}</h1>
        {subtitle && (
          <p className="hero-subtitle text-cloud-white/90">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
