import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { LocalizedLink as Link } from 'router/LocalizedLink';
import Seo from 'views/components/Seo';
import { toast } from 'sonner';
import { paths } from 'router/paths';
import { Send } from 'lucide-react';
import { apiUrl } from 'api/utils/config';
import { AUTHOR, displayUrl } from 'config/site';
import { trackEvent } from 'utils/analytics';

// dtpf-api's limits (CONTACT_LIMITS and MAX_LINKS in its contact schema and controller). The
// browser stops the obvious cases before a round trip; the API stays the authority.
const LIMITS = { emailMax: 254, nameMax: 100, messageMin: 10, messageMax: 5000, links: 5 } as const;

// The error codes this form can meet, each with copy that says what to change. Any other code
// (a malformed request, which this form never builds) falls back to the generic message.
const FIELD_ERRORS = [
  'invalid_email',
  'name_too_long',
  'message_required',
  'message_too_short',
  'message_too_long',
  'too_many_links',
  'payload_too_large',
  'server_error',
  'service_unavailable',
] as const;
const WAIT_ERRORS = ['rate_limited', 'email_cooldown'] as const;

function includes<T extends string>(list: readonly T[], value: unknown): value is T {
  return list.includes(value as T);
}

/** Seconds as the visitor reads them: whole minutes under an hour, whole hours above. */
function formatWait(seconds: number): string {
  return seconds < 3600 ? `${Math.max(1, Math.ceil(seconds / 60))} min` : `${Math.ceil(seconds / 3600)} h`;
}

function errorMessage(t: TFunction, body: unknown): string {
  const { code, retryAfter } = (body ?? {}) as { code?: unknown; retryAfter?: unknown };
  if (includes(FIELD_ERRORS, code)) return t(`contact_error_${code}`, LIMITS);
  if (includes(WAIT_ERRORS, code) && typeof retryAfter === 'number') {
    return t(`contact_error_${code}`, { wait: formatWait(retryAfter) });
  }
  return t('contact_error');
}

const inputClass =
  'w-full rounded-lg border border-border bg-bg-tertiary px-3.5 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent focus:ring-[3px] focus:ring-accent-glow';

function Field({
  id,
  label,
  required = false,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <div className="mb-5">
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-text-secondary">
        {label}
        {required && (
          <>
            {' '}
            <span className="text-accent" aria-hidden="true">
              *
            </span>
            <span className="sr-only">({t('required')})</span>
          </>
        )}
      </label>
      {children}
    </div>
  );
}

const linkClass =
  'flex items-center gap-3 rounded-[10px] border border-border px-4 py-3 text-[13px] text-text-secondary transition hover:border-accent hover:bg-accent-subtle hover:text-text-primary';

function ContactLink({
  href,
  badge,
  event,
  children,
}: {
  href: string;
  badge: string;
  event: string;
  children: ReactNode;
}) {
  const external = href.startsWith('https://');
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noreferrer' })}
      className={linkClass}
      onClick={() => trackEvent(event)}
    >
      <span className="font-mono text-xs font-semibold text-accent">{badge}</span>
      {children}
    </a>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  // When the form appeared, for the API's time trap (a submit under 3 s is a bot). Set after
  // mount rather than during render, which must not read the clock.
  const formShownAt = useRef(0);
  useEffect(() => {
    formShownAt.current = Date.now();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    trackEvent('contact:submit');
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    try {
      const res = await fetch(apiUrl('/contact-me'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          name: data.get('name'),
          message: data.get('message'),
          website: data.get('website'),
          _t: formShownAt.current,
        }),
        signal: controller.signal,
      });
      if (!res.ok) {
        const body: unknown = await res.json().catch(() => null);
        toast.error(errorMessage(t, body));
        trackEvent('contact:error', { status: res.status });
        return;
      }
      toast.success(t('contact_success'));
      trackEvent('contact:success');
      form.reset();
      formShownAt.current = Date.now();
    } catch (err) {
      const timedOut = err instanceof DOMException && err.name === 'AbortError';
      toast.error(t(timedOut ? 'contact_timeout' : 'contact_error'));
      trackEvent('contact:error', { status: timedOut ? 'timeout' : 'network' });
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }

  return (
    <>
      <Seo pageName={t('contact_title')} description={t('seo_desc_contact')} ogKey="contact" />

      <div className="mx-auto max-w-[1100px] px-6 pt-14 text-center">
        <h1 className="mb-2 font-heading text-4xl font-bold tracking-tight">{t('contact_title')}</h1>
        <p className="text-base text-text-secondary">{t('contact_subtitle')}</p>
      </div>

      <div className="mx-auto max-w-[560px] px-6 py-12 pb-24">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-bg-surface p-8">
          {/* Honeypot — hidden from humans, bots fill it */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <Field id="contact-email" label={t('contact_email_label')} required>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              aria-required="true"
              maxLength={LIMITS.emailMax}
              autoComplete="email"
              placeholder={t('contact_email_placeholder')}
              className={inputClass}
            />
          </Field>
          <Field id="contact-name" label={t('contact_name_label')}>
            <input
              id="contact-name"
              name="name"
              type="text"
              maxLength={LIMITS.nameMax}
              autoComplete="name"
              placeholder={t('contact_name_placeholder')}
              className={inputClass}
            />
          </Field>
          <Field id="contact-message" label={t('contact_message_label')} required>
            <textarea
              id="contact-message"
              name="message"
              required
              aria-required="true"
              minLength={LIMITS.messageMin}
              maxLength={LIMITS.messageMax}
              rows={5}
              placeholder={t('contact_message_placeholder')}
              className={`${inputClass} resize-y`}
            />
          </Field>
          <div className="mb-6 flex items-center gap-2.5 text-[13px] text-text-secondary">
            <input
              id="privacy-check"
              type="checkbox"
              required
              aria-required="true"
              className="h-4 w-4 accent-accent"
            />
            <label htmlFor="privacy-check">
              {t('contact_privacy')}{' '}
              <Link
                to={paths.privacyPolicy}
                className="text-accent underline-offset-2 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {t('contact_privacy_link')}
              </Link>
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-all hover:bg-accent-hover disabled:opacity-50"
          >
            <Send size={15} aria-hidden="true" />
            {loading ? t('contact_sending') : t('contact_submit')}
          </button>
        </form>

        <div className="relative my-8 text-center font-mono text-xs tracking-wider text-text-muted">
          <span className="relative z-10 bg-bg-primary px-4">{t('contact_or')}</span>
          <div className="absolute left-0 right-0 top-1/2 h-px bg-border" />
        </div>

        <div className="flex flex-col gap-2">
          <ContactLink href={`mailto:${AUTHOR.email}`} badge="@" event="contact:email">
            {AUTHOR.email}
          </ContactLink>
          <ContactLink href={AUTHOR.linkedin} badge="in" event="contact:linkedin">
            {displayUrl(AUTHOR.linkedin)}
          </ContactLink>
          <ContactLink href={AUTHOR.github} badge="gh" event="contact:github">
            {displayUrl(AUTHOR.github)}
          </ContactLink>
          <Link to={paths.cv} className={linkClass} onClick={() => trackEvent('contact:cv')}>
            <span className="font-mono text-xs font-semibold text-accent">cv</span>
            {t('contact_cv')}
          </Link>
        </div>
      </div>
    </>
  );
}
