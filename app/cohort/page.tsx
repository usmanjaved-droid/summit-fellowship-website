import { Suspense } from 'react';
import HeroSection from '../components/HeroSection';
import FellowsContent from './fellows-content';

export default function FellowsPage() {
  return (
    <>
      <HeroSection
        title="Meet the Fellows"
        subtitle="The 11 social entrepreneurs transforming Pakistan"
        gradient="alpine-lake"
      />

      <Suspense fallback={<div className="section container-max">Loading fellows...</div>}>
        <FellowsContent />
      </Suspense>
    </>
  );
}
