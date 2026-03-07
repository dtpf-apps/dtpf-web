import { useState, useRef, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { paths } from 'router/paths';
import { Send } from 'lucide-react';
import { apiUrl } from 'api/utils/config';

export default function Contact() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const formLoadedAt = useRef(Date.now());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setLoading(true);
    try {
      const res = await fetch(apiUrl('/contact-me'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          name: data.get('name'),
          message: data.get('message'),
          website: data.get('website'),
          _t: formLoadedAt.current,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        toast.error(body?.message || t('contact_error'));
        return;
      }
      toast.success(t('contact_success'));
      form.reset();
      formLoadedAt.current = Date.now();
    } catch {
      toast.error(t('contact_error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <title>{t('contact_title')} — David T. Pizarro Frick</title>

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
          <div className="mb-5">
            <label className="mb-1.5 block text-[13px] font-medium text-text-secondary">
              {t('contact_email_label')} <span className="text-accent">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder={t('contact_email_placeholder')}
              className="w-full rounded-lg border border-border bg-bg-tertiary px-3.5 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent focus:ring-[3px] focus:ring-accent-glow"
            />
          </div>
          <div className="mb-5">
            <label className="mb-1.5 block text-[13px] font-medium text-text-secondary">{t('contact_name_label')}</label>
            <input
              name="name"
              type="text"
              placeholder={t('contact_name_placeholder')}
              className="w-full rounded-lg border border-border bg-bg-tertiary px-3.5 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent focus:ring-[3px] focus:ring-accent-glow"
            />
          </div>
          <div className="mb-5">
            <label className="mb-1.5 block text-[13px] font-medium text-text-secondary">
              {t('contact_message_label')} <span className="text-accent">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder={t('contact_message_placeholder')}
              className="w-full resize-y rounded-lg border border-border bg-bg-tertiary px-3.5 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent focus:ring-[3px] focus:ring-accent-glow"
            />
          </div>
          <label className="mb-6 flex items-center gap-2.5 text-[13px] text-text-secondary">
            <input type="checkbox" required className="h-4 w-4 accent-accent" />
            {t('contact_privacy')} <Link to={paths.privacyPolicy} className="text-accent no-underline hover:underline">{t('contact_privacy_link')}</Link>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-6 py-3 text-sm font-semibold text-[#0B0F19] transition-all hover:bg-accent-hover disabled:opacity-50"
          >
            <Send size={15} />
            {t('contact_submit')}
          </button>
        </form>

        <div className="relative my-8 text-center font-mono text-xs tracking-wider text-text-muted">
          <span className="relative z-10 bg-bg-primary px-4">{t('contact_or')}</span>
          <div className="absolute left-0 right-0 top-1/2 h-px bg-border" />
        </div>

        <div className="flex flex-col gap-2">
          <a href="mailto:davidpizarrofrick@gmail.com" className="flex items-center gap-3 rounded-[10px] border border-border px-4 py-3 text-[13px] text-text-secondary transition hover:border-accent hover:bg-accent-subtle hover:text-text-primary">
            <span className="font-mono text-xs font-semibold text-accent">@</span>
            davidpizarrofrick@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/david-tomas-pizarro-frick" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-[10px] border border-border px-4 py-3 text-[13px] text-text-secondary transition hover:border-accent hover:bg-accent-subtle hover:text-text-primary">
            <span className="font-mono text-xs font-semibold text-accent">in</span>
            linkedin.com/in/david-tomas-pizarro-frick
          </a>
          <a href="https://github.com/DTPF" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-[10px] border border-border px-4 py-3 text-[13px] text-text-secondary transition hover:border-accent hover:bg-accent-subtle hover:text-text-primary">
            <span className="font-mono text-xs font-semibold text-accent">gh</span>
            github.com/DTPF
          </a>
        </div>
      </div>
    </>
  );
}
