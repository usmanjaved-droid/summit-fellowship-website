interface FacultyCardProps {
  name: string;
  title: string;
  institution: string;
  bio: string;
  avatar?: string;
  email?: string;
  linkedIn?: string;
  website?: string;
  phone?: string;
}

export default function FacultyCard({
  name,
  title,
  institution,
  bio,
  avatar,
  email,
  linkedIn,
  website,
  phone,
}: FacultyCardProps) {
  // Generate initials if no avatar provided
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="card border-l-4 border-purple-600 hover:shadow-lg">
      {/* Avatar */}
      <div className="mb-4">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600 font-bold text-lg">{initials}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-sm font-semibold text-purple-600 mb-1">{title}</p>
      <p className="text-sm text-gray-600 mb-3">{institution}</p>
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
