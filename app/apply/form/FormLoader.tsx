'use client';

import dynamic from 'next/dynamic';

const ApplicationForm = dynamic(() => import('./ApplicationForm'), {
  ssr: false,
  loading: () => <p className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>Loading the application…</p>,
});

export default function FormLoader(props: { year: number; contactEmail: string }) {
  return <ApplicationForm {...props} />;
}
