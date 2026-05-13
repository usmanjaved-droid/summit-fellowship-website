interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
}: HeroSectionProps) {
  return (
    <div className="hero-gradient section container-max">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-xl mb-6 text-blue-100">{subtitle}</p>}
        {description && (
          <p className="text-lg text-blue-50 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
