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
        gradient="alpine-lake"
      />

      <div className="section container-max pt-8 border-t-4 border-lake-dark">
        {/* Filter Section */}
        <div className="mb-12 pb-8 border-b-2 border-terra-red">
          <h2 className="text-sm font-bold text-lake-dark mb-4 uppercase tracking-widest">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-smooth ${
                  selectedCategory === category
                    ? 'bg-terra-red text-cloud-white shadow-lg'
                    : 'bg-cloud-white border-2 border-slate-warm/30 text-lake-dark hover:border-terra-red hover:text-terra-red'
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
