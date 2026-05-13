interface FacultyMember {
  name: string;
  title: string;
  organization: string;
  bio: string;
  type: 'faculty' | 'organizing';
  avatar?: string;
  email?: string;
  linkedin?: string;
  website?: string;
  phone?: string;
}

const TYPE_COLORS = {
  faculty: { bg: 'bg-lake-dark', border: 'border-l-lake-dark', tint: 'bg-lake-dark/8' },
  organizing: { bg: 'bg-forest-dark', border: 'border-l-forest-dark', tint: 'bg-forest-dark/8' },
};

export default function FacultyCard({
  name,
  title,
  organization,
  bio,
  type,
  avatar,
  email,
  linkedin,
  website,
  phone,
}: FacultyMember) {
  // Generate initials if no avatar provided
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const typeColor = TYPE_COLORS[type];

  return (
    <div className={`card border-l-4 ${typeColor.border} ${typeColor.tint}
                    hover:shadow-lg hover:scale-[1.02] hover:rotate-[-1deg]
                    transition-all duration-200 ease-out`}>
      {/* Header with type color */}
      <div className={`${typeColor.bg} -mx-6 -mt-6 mb-4 px-6 pt-4 pb-4 rounded-t-lg`}>
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div>
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-16 h-16 rounded-lg object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{initials}</span>
              </div>
            )}
          </div>

          {/* Name and Title */}
          <div>
            <h3 className="text-lg font-bold text-white">{name}</h3>
            <p className="text-white/90 text-sm">{title}</p>
          </div>
        </div>
      </div>

      {/* Organization */}
      <p className="text-slate-warm font-semibold text-sm mb-2">{organization}</p>

      {/* Bio */}
      <p className="text-slate-warm mb-4 line-clamp-3">{bio}</p>

      {/* Contact Links */}
      <div className="flex gap-4 flex-wrap pt-4 border-t border-slate-warm/20">
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-terra-red hover:text-terra-red/80 transition-colors duration-100
                      focus:outline-none focus:ring-2 focus:ring-terra-red focus:ring-offset-2 rounded px-1"
            aria-label={`Email ${name}`}
          >
            ✉️ Email
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terra-red hover:text-terra-red/80 transition-colors duration-100
                      focus:outline-none focus:ring-2 focus:ring-terra-red focus:ring-offset-2 rounded px-1"
            aria-label={`LinkedIn profile of ${name}`}
          >
            💼 LinkedIn
          </a>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terra-red hover:text-terra-red/80 transition-colors duration-100
                      focus:outline-none focus:ring-2 focus:ring-terra-red focus:ring-offset-2 rounded px-1"
            aria-label={`Website of ${name}`}
          >
            🌐 Website
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="text-terra-red hover:text-terra-red/80 transition-colors duration-100
                      focus:outline-none focus:ring-2 focus:ring-terra-red focus:ring-offset-2 rounded px-1"
            aria-label={`Call ${name}`}
          >
            📞 Call
          </a>
        )}
      </div>
    </div>
  );
}
