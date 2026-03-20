import { isStaging } from 'utils/isStaging';

export default function StagingBadge() {
  if (!isStaging) return null;

  return (
    <div className="fixed bottom-3 left-3 z-[9999] select-none rounded-full bg-amber-500/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg transition-colors hover:bg-amber-500">
      Staging
    </div>
  );
}
