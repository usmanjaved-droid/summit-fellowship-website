'use client';

import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ResourceCard from '../components/ResourceCard';
import resourcesData from '../../data/resources.json';

type CategoryFilter = 'All' | 'Framework' | 'Tools' | 'Communication';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  // Get unique categories
  const categories: CategoryFilter[] = ['All', ...new Set(resourcesData.resources.map((r) => r.category as CategoryFilter))];

  // Filter resources based on selected category
  const filteredResources =
    selectedCategory === 'All'
      ? resourcesData.resources
      : resourcesData.resources.filter((r) => r.category === selectedCategory);

  return (
    <>
      <HeroSection
        title="Resources"
        subtitle="Tools, frameworks, and guides for scale"
        description="Access frameworks, toolkits, and resources to support your journey"
      />

      <div className="section container-max">
        {/* Filter Pills */}
        <div className="mb-12">
          <h2 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div>
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  category={resource.category}
                  type={resource.type}
                  link={resource.link}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No resources found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
