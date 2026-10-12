import { isProductionDeploy } from '@/lib/env';

export default function StagingBanner() {
  if (isProductionDeploy()) return null;
  return (
    <div className="staging-banner" role="note">
      Staging — not the live site
    </div>
  );
}
