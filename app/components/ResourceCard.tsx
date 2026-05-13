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

// Category color mapping
const categoryColors: Record<string, { bg: string; text: string }> = {
  Framework: { bg: 'bg-blue-50', text: 'text-blue-700' },
  Tools: { bg: 'bg-green-50', text: 'text-green-700' },
  Communication: { bg: 'bg-orange-50', text: 'text-orange-700' },
  Document: { bg: 'bg-purple-50', text: 'text-purple-700' },
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
    <div className="card hover:shadow-lg hover:scale-105 transition-all">
      {/* Icon and Category */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors.text} ${colors.bg}`}>
          {category}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{title}</h4>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">
        {description}
      </p>

      {/* Link */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2 group"
      >
        Access Resource
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </div>
  );
}
