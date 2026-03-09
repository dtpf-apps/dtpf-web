import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, RefreshCw, X } from 'lucide-react';
import useSWUpdate from 'hooks/useSWUpdate';

function SWUpdateBanner() {
  const { t } = useTranslation();
  const { updateAvailable, applyUpdate } = useSWUpdate();
  const [dismissed, setDismissed] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = useCallback(() => {
    setIsUpdating(true);
    applyUpdate();
  }, [applyUpdate]);

  if (!updateAvailable || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md animate-slide-up">
      <div className="bg-bg-surface border border-border rounded-xl shadow-2xl px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary">{t('sw_update-available')}</p>
          <p className="text-xs text-text-muted mt-0.5">{t('sw_update-on-navigate')}</p>
        </div>
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-accent text-bg-primary hover:bg-accent-hover transition-colors shrink-0 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isUpdating ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
          {isUpdating ? t('sw_updating') : t('sw_update-now')}
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default memo(SWUpdateBanner);
