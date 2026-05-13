'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FellowCard from '../components/FellowCard';
import { filterBySearch, filterByCategory } from '../../lib/utils';
import fellowsData from '../../data/fellows.json';

interface Fellow {
  id: string;
  name: string;
  organization: string;
  sector: string;
  bio: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  website?: string;
}

// Get unique sectors from fellows data
const getAllSectors = (fellows: Fellow[]): string[] => {
  const sectors = new Set<string>();
  fellows.forEach((fellow) => {
    sectors.add(fellow.sector);
  });
  return Array.from(sectors).sort();
};

// Initialize fellows data at module level
const initialFellows = fellowsData.fellows as Fellow[];
const initialSectors = ['All', ...getAllSectors(initialFellows)];

export default function FellowsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fellows] = useState<Fellow[]>(initialFellows);
  const [filteredFellows, setFilteredFellows] = useState<Fellow[]>(initialFellows);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [allSectors] = useState<string[]>(initialSectors);

  // Load from URL params on mount
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const sector = searchParams.get('sector') || 'All';
    setSearchTerm(search);
    setSelectedSector(sector);
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let result = fellows;

    // Apply sector filter
    if (selectedSector !== 'All') {
      result = filterByCategory(result, selectedSector, 'sector');
    }

    // Apply search filter
    if (searchTerm.trim()) {
      result = filterBySearch(result, searchTerm, ['name', 'organization']);
    }

    setFilteredFellows(result);
  }, [fellows, selectedSector, searchTerm]);

  // Update URL when filters change
  const updateFilters = (search: string, sector: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (sector && sector !== 'All') params.set('sector', sector);

    const queryString = params.toString();
    router.push(`/fellows${queryString ? '?' + queryString : ''}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearchTerm(newSearch);
    updateFilters(newSearch, selectedSector);
  };

  const handleSectorChange = (sector: string) => {
    setSelectedSector(sector);
    updateFilters(searchTerm, sector);
  };

  return (
    <>
      {/* Filter Section */}
      <section className="section bg-gray-50">
        <div className="container-max">
          {/* Search Box */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by name or organization"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Sector Filter Pills */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {allSectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => handleSectorChange(sector)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedSector === sector
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                  aria-pressed={selectedSector === sector}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>

          {/* Results Counter */}
          <p className="text-sm text-gray-600">
            Showing {filteredFellows.length} of {fellows.length} fellows
          </p>
        </div>
      </section>

      {/* Fellows Grid */}
      <section className="section">
        <div className="container-max">
          {filteredFellows.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFellows.map((fellow) => (
                <FellowCard
                  key={fellow.id}
                  name={fellow.name}
                  organization={fellow.organization}
                  sector={fellow.sector}
                  bio={fellow.bio}
                  email={fellow.email}
                  phone={fellow.phone}
                  linkedIn={fellow.linkedin}
                  website={fellow.website}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-2">
                No fellows match your search. Try a different filter.
              </p>
              <p className="text-sm text-gray-500">
                Consider adjusting your search terms or sector selection.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
