import { useTranslation } from 'react-i18next';
import type { ProjectStatus } from 'config/projects';

// One badge per status so a visitor reads at a glance whether the app can be opened,
// is in private beta, was delivered for a client, or has no public URL at all.
const BADGES: Record<ProjectStatus, { key: string; className: string }> = {
  production: { key: 'projects_badge_production', className: 'border-success/20 bg-success/10 text-success' },
  beta: { key: 'projects_badge_beta', className: 'border-warm/20 bg-warm/10 text-warm' },
  client: { key: 'projects_badge_client', className: 'border-accent/20 bg-accent-subtle text-accent' },
  private: { key: 'projects_badge_private', className: 'border-border bg-bg-tertiary text-text-muted' },
};

export default function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const { t } = useTranslation();
  const badge = BADGES[status];

  return (
    <span
      className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badge.className}`}
    >
      {t(badge.key)}
    </span>
  );
}
