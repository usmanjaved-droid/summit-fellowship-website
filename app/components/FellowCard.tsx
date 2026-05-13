interface FellowCardProps {
  name: string;
  organization: string;
  sector: string;
  bio: string;
  avatar?: string;
  email?: string;
  linkedIn?: string;
  website?: string;
  phone?: string;
}

// Sector color mapping
const sectorColors: Record<string, { bg: string; text: string; icon: string }> = {
  'Mental Health': { bg: 'bg-blue-50', text: 'text-blue-700', icon: '🧠' },
  'Disability': { bg: 'bg-green-50', text: 'text-green-700', icon: '♿' },
  'Health': { bg: 'bg-green-50', text: 'text-green-700', icon: '💚' },
  'Science Education': { bg: 'bg-purple-50', text: 'text-purple-700', icon: '🔬' },
  'Legal': { bg: 'bg-blue-50', text: 'text-blue-700', icon: '⚖️' },
  'Education': { bg: 'bg-purple-50', text: 'text-purple-700', icon: '📚' },
  'Livelihoods': { bg: 'bg-orange-50', text: 'text-orange-700', icon: '💼' },
  'Agriculture': { bg: 'bg-orange-50', text: 'text-orange-700', icon: '🌾' },
  'Special Education': { bg: 'bg-indigo-50', text: 'text-indigo-700', icon: '✨' },
};

export default function FellowCard({
  name,
  organization,
  sector,
  bio,
  avatar,
  email,
  linkedIn,
  website,
  phone,
}: FellowCardProps) {
  // Generate initials if no avatar provided
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const colors = sectorColors[sector] || { bg: 'bg-gray-50', text: 'text-gray-700', icon: '🎯' };

  return (
    <div className={`card border-l-4 border-orange-600 ${colors.bg} hover:shadow-lg`}>
      {/* Avatar */}
      <div className="mb-4">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-700 font-bold text-lg">{initials}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">{organization}</p>
      <p className={`text-xs font-bold inline-block px-2 py-1 rounded mb-3 ${colors.text} ${colors.bg}`}>
        {colors.icon} {sector}
      </p>
      <p className="text-sm text-gray-700 mb-4 line-clamp-3">{bio}</p>

      {/* Contact Links */}
      <div className="flex gap-4 flex-wrap pt-4 border-t border-gray-200">
        {email && (
          <a
            href={`mailto:${email}`}
            title="Email"
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            ✉️ Email
          </a>
        )}
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            🔗 LinkedIn
          </a>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            title="Website"
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            🌐 Website
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone}`}
            title="Call"
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            📞 Call
          </a>
        )}
      </div>
    </div>
  );
}
