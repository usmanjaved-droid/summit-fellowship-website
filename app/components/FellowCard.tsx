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

  return (
    <div className="card hover:shadow-lg">
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
      <p className="text-xs font-semibold text-blue-600 mb-3 uppercase tracking-wide">
        {sector}
      </p>
      <p className="text-sm text-gray-700 mb-4 line-clamp-3">{bio}</p>

      {/* Contact Links */}
      <div className="flex gap-3 flex-wrap pt-4 border-t border-gray-200">
        {email && (
          <a
            href={`mailto:${email}`}
            title="Email"
            className="text-gray-600 hover:text-blue-600 text-sm"
          >
            ✉️
          </a>
        )}
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="text-gray-600 hover:text-blue-600 text-sm"
          >
            in
          </a>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            title="Website"
            className="text-gray-600 hover:text-blue-600 text-sm"
          >
            🌐
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone}`}
            title="Phone"
            className="text-gray-600 hover:text-blue-600 text-sm"
          >
            📱
          </a>
        )}
      </div>
    </div>
  );
}
