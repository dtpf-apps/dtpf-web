import type { KeyboardEvent } from 'react';

const FOCUSABLE = 'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

/** Keeps Tab and Shift+Tab inside a modal; call it from the modal container's keydown handler. */
export function trapFocus(e: KeyboardEvent<HTMLElement>): void {
  if (e.key !== 'Tab') return;
  const focusable = e.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first || !last) return;

  const active = document.activeElement;
  // A click on non-focusable content can leave focus on the container itself (tabIndex -1);
  // from there Tab must enter the controls, never the page behind.
  if (active === e.currentTarget) {
    e.preventDefault();
    (e.shiftKey ? last : first).focus();
  } else if (e.shiftKey && active === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
}
