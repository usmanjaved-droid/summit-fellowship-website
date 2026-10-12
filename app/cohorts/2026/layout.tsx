import { getCohort } from '@/lib/cohorts';
import CohortBar from '../_components/CohortBar';

export default function Cohort2026Layout({ children }: { children: React.ReactNode }) {
  const cohort = getCohort(2026);
  if (!cohort) throw new Error('Cohort 2026 missing from data/cohorts/index.json');
  return (
    <>
      <CohortBar cohort={cohort} />
      {children}
    </>
  );
}
