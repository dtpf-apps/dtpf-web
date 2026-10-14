import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ProjectMedia } from 'config/projects';

interface ProjectGalleryProps {
  media: ProjectMedia[];
  projectName: string;
}

const FOCUSABLE = 'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

const controlClass =
  'flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export default function ProjectGallery({ media, projectName }: ProjectGalleryProps) {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = openIndex !== null;
  const total = media.length;

  const close = useCallback(() => {
    setOpenIndex(null);
    // The opener stays mounted behind the dialog, so focus can go straight back to it.
    openerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((i) => (i === null ? i : (i + delta + total) % total));
    },
    [total]
  );

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key === 'ArrowRight' && total > 1) {
      step(1);
      return;
    }
    if (e.key === 'ArrowLeft' && total > 1) {
      step(-1);
      return;
    }
    if (e.key !== 'Tab') return;
    const focusable = e.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    // A click on the image or the counter lands focus on the dialog itself (tabIndex -1);
    // from there Tab must enter the controls, never the page behind.
    if (active === e.currentTarget) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
      return;
    }
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const current = openIndex !== null ? media[openIndex] : null;

  return (
    <>
      <ul className="grid list-none grid-cols-2 items-start gap-4 p-0 sm:grid-cols-4">
        {media.map((m, i) => {
          const alt = t(m.altKey);
          const landscape = m.width > m.height;
          return (
            <li key={m.src} className={landscape ? 'col-span-2' : 'col-span-1'}>
              <button
                type="button"
                aria-label={t('gallery_open', { alt })}
                onClick={(e) => {
                  openerRef.current = e.currentTarget;
                  setOpenIndex(i);
                }}
                className="block min-h-11 w-full cursor-zoom-in overflow-hidden rounded-xl border border-border bg-bg-secondary transition hover:border-border-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <img
                  src={m.src}
                  alt={alt}
                  width={m.width}
                  height={m.height}
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: `${m.width} / ${m.height}` }}
                  className="block h-auto w-full"
                />
              </button>
            </li>
          );
        })}
      </ul>

      {current && openIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          role="dialog"
          aria-modal="true"
          aria-label={t('gallery_dialog_label', { name: projectName })}
          // Focusable so a click on the image or the counter keeps focus (and the key handlers) inside.
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          onClick={(e) => {
            // Only the backdrop closes: controls and the image mark themselves as keepers.
            if (!(e.target as HTMLElement).closest('[data-lightbox-keep]')) close();
          }}
          // Same layer as the mobile menu (z-50): nothing may paint over an open lightbox.
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 outline-none"
        >
          {/* The bar itself lets clicks through to the backdrop; only its two children are keepers. */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-between px-4 py-3">
            <p
              data-lightbox-keep
              aria-live="polite"
              className="pointer-events-auto font-mono text-[13px] text-white"
            >
              {t('gallery_counter', { current: openIndex + 1, total })}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              data-lightbox-keep
              onClick={close}
              aria-label={t('gallery_close')}
              className={`${controlClass} pointer-events-auto`}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {total > 1 && (
            <button
              type="button"
              data-lightbox-keep
              onClick={() => step(-1)}
              aria-label={t('gallery_prev')}
              className={`${controlClass} absolute left-3 top-1/2 -translate-y-1/2`}
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
          )}

          <img
            data-lightbox-keep
            src={current.src}
            alt={t(current.altKey)}
            width={current.width}
            height={current.height}
            className="h-auto max-h-[85vh] w-auto max-w-[min(92vw,1600px)] rounded-lg object-contain"
          />

          {total > 1 && (
            <button
              type="button"
              data-lightbox-keep
              onClick={() => step(1)}
              aria-label={t('gallery_next')}
              className={`${controlClass} absolute right-3 top-1/2 -translate-y-1/2`}
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          )}
        </motion.div>
      )}
    </>
  );
}
