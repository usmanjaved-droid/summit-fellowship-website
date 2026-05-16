import fellowsData from '@/data/fellows-deep.json';

/**
 * Type definition for a Fellow in the Summit Fellowship program
 */
export type Fellow = {
  id: string;
  name: string;
  org: string;
  sector: string;
  tagline: string;
  idea_context: string;
  mission: string;
  how_it_works: string;
  the_dream: string;
  structure: string;
  geography: string;
  org_url: string;
  fellow_linkedin: string;
  photo_url: string | null;
  photo_source: string | null;
  sources: string[];
};

/**
 * Retrieves a single fellow by their slug (id)
 * @param slug - The fellow's id/slug
 * @returns The Fellow object or null if not found
 */
export function getFellow(slug: string): Fellow | null {
  const fellows = fellowsData as Fellow[];
  return fellows.find((fellow) => fellow.id === slug) || null;
}

/**
 * Retrieves all fellows from the data file
 * @returns Array of all Fellows
 */
export function getAllFellows(): Fellow[] {
  return fellowsData as Fellow[];
}

/**
 * Retrieves related fellows from different sectors
 * Prioritizes fellows from different sectors first, then includes same-sector fellows if needed
 * @param currentFellow - The fellow to find related fellows for
 * @param count - Number of related fellows to return (default: 4)
 * @returns Array of related Fellow objects
 */
export function getRelatedFellows(currentFellow: Fellow, count: number = 4): Fellow[] {
  const fellows = fellowsData as Fellow[];

  // Exclude the current fellow
  const otherFellows = fellows.filter((fellow) => fellow.id !== currentFellow.id);

  // Separate into different sectors and same sector
  const differentSectors = otherFellows.filter((fellow) => fellow.sector !== currentFellow.sector);
  const sameSector = otherFellows.filter((fellow) => fellow.sector === currentFellow.sector);

  // Combine: prioritize different sectors first, then add same sector if needed
  const related = [...differentSectors, ...sameSector].slice(0, count);

  return related;
}
