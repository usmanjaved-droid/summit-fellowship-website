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

// Sector color mapping using Shangrila palette
const SECTOR_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Health': { bg: 'bg-moss-light', text: 'text-white', border: 'border-l-moss-light' },
  'Education': { bg: 'bg-lake-dark', text: 'text-white', border: 'border-l-lake-dark' },
  'Agriculture': { bg: 'bg-terra-red', text: 'text-white', border: 'border-l-terra-red' },
  'Legal': { bg: 'bg-forest-dark', text: 'text-white', border: 'border-l-forest-dark' },
  'Mental Health': { bg: 'bg-slate-warm', text: 'text-white', border: 'border-l-slate-warm' },
  'Disability': { bg: 'bg-moss-light', text: 'text-white', border: 'border-l-moss-light' },
  'Livelihoods': { bg: 'bg-terra-red', text: 'text-white', border: 'border-l-terra-red' },
  'Science Education': { bg: 'bg-lake-dark', text: 'text-white', border: 'border-l-lake-dark' },
  'Special Education': { bg: 'bg-forest-dark', text: 'text-white', border: 'border-l-forest-dark' },
};

const SECTOR_TINT_BG: Record<string, string> = {
  'Health': 'bg-moss-light/5',
  'Education': 'bg-lake-dark/5',
  'Agriculture': 'bg-terra-red/5',
  'Legal': 'bg-forest-dark/5',
  'Mental Health': 'bg-slate-warm/5',
  'Disability': 'bg-moss-light/5',
  'Livelihoods': 'bg-terra-red/5',
  'Science Education': 'bg-lake-dark/5',
  'Special Education': 'bg-forest-dark/5',
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

  const sectorColor = SECTOR_COLORS[sector] || SECTOR_COLORS['Health'];
  const sectorTint = SECTOR_TINT_BG[sector] || 'bg-moss-light/5';

  return (
    <div className={`card border-l-4 ${sectorColor.border} ${sectorTint}
                    hover:shadow-lg hover:scale-[1.02] hover:rotate-[-1deg]
                    transition-all duration-200 ease-out`}>
      {/* Header with sector color */}
      <div className={`${sectorColor.bg} -mx-6 -mt-6 mb-4 px-6 pt-4 pb-4 rounded-t-lg`}>
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

          {/* Name and Organization */}
          <div>
            <h3 className="text-lg font-bold text-white">{name}</h3>
            <p className="text-white/90 text-sm">{organization}</p>
          </div>
        </div>
      </div>

      {/* Sector Badge */}
      <div className={`${sectorColor.bg} ${sectorColor.text} inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3`}>
        {sector}
      </div>

      {/* Bio */}
      <p className="text-slate-warm mb-4 line-clamp-3">{bio}</p>

      {/* Contact Links */}
      <div className="flex gap-4 flex-wrap pt-4 border-t border-slate-warm/20">
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-terra-red hover:text-terra-red/80
                      transition-colors duration-100 focus:outline-none
                      focus:ring-2 focus:ring-terra-red focus:ring-offset-2 rounded px-1"
            aria-label={`Email ${name}`}
          >
            ✉️ Email
          </a>
        )}
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-terra-red hover:text-terra-red/80
                      transition-colors duration-100 focus:outline-none
                      focus:ring-2 focus:ring-terra-red focus:ring-offset-2 rounded px-1"
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
            className="flex items-center gap-2 text-terra-red hover:text-terra-red/80
                      transition-colors duration-100 focus:outline-none
                      focus:ring-2 focus:ring-terra-red focus:ring-offset-2 rounded px-1"
            aria-label={`Website of ${name}`}
          >
            🌐 Website
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-terra-red hover:text-terra-red/80
                      transition-colors duration-100 focus:outline-none
                      focus:ring-2 focus:ring-terra-red focus:ring-offset-2 rounded px-1"
            aria-label={`Call ${name}`}
          >
            📞 Call
          </a>
        )}
      </div>
    </div>
  );
}
