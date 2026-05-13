interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  type: string;
  link: string;
}

// Type to icon mapping
const typeIcons: Record<string, string> = {
  document: '📄',
  toolkit: '🛠️',
  article: '📖',
};

// Category color mapping - Shangrila Lake palette
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Framework: { bg: 'bg-lake-dark/10', text: 'text-lake-dark', border: 'border-lake-dark' },
  Tools: { bg: 'bg-moss-light/10', text: 'text-moss-light', border: 'border-moss-light' },
  Communication: { bg: 'bg-terra-red/10', text: 'text-terra-red', border: 'border-terra-red' },
  Document: { bg: 'bg-forest-dark/10', text: 'text-forest-dark', border: 'border-forest-dark' },
};

export default function ResourceCard({
  title,
  description,
  category,
  type,
  link,
}: ResourceCardProps) {
  const colors = categoryColors[category] || { bg: 'bg-gray-50', text: 'text-gray-700' };
  const icon = typeIcons[type] || '📌';

  return (
    <div className={`card hover:shadow-lg hover:scale-105 transition-all border-l-4 ${colors.border}`}>
      {/* Icon and Category */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors.text} ${colors.bg}`}>
          {category}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-lg font-bold text-lake-dark mb-3 line-clamp-2">{title}</h4>

      {/* Description */}
      <p className="text-slate-warm text-sm mb-4 leading-relaxed line-clamp-3">
        {description}
      </p>

      {/* Link */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-terra-red hover:text-terra-red/80 font-medium text-sm flex items-center gap-2 group transition-colors"
      >
        Access Resource
        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
      </a>
    </div>
  );
}
