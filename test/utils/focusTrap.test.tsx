import { fireEvent, render, screen } from '@testing-library/react';
import { trapFocus } from '../../src/utils/focusTrap';

function renderModal(withControls = true) {
  render(
    // The WAI-ARIA modal pattern, as in Header and ProjectGallery: the dialog container owns the
    // keys. Those use motion.div, which the rule does not inspect; this plain div it does.
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div role="dialog" tabIndex={-1} onKeyDown={trapFocus}>
      {withControls && (
        <>
          <button>first</button>
          <button>middle</button>
          <button>last</button>
        </>
      )}
    </div>
  );
  return {
    dialog: screen.getByRole('dialog'),
    first: screen.queryByRole('button', { name: 'first' }),
    middle: screen.queryByRole('button', { name: 'middle' }),
    last: screen.queryByRole('button', { name: 'last' }),
  };
}

/** Presses a key on the focused element and reports whether the trap took it over. */
function press(key: string, shiftKey = false): boolean {
  return !fireEvent.keyDown(document.activeElement!, { key, shiftKey });
}

describe('trapFocus', () => {
  it('wraps Tab from the last control to the first', () => {
    const { first, last } = renderModal();
    last!.focus();
    expect(press('Tab')).toBe(true);
    expect(first).toHaveFocus();
  });

  it('wraps Shift+Tab from the first control to the last', () => {
    const { first, last } = renderModal();
    first!.focus();
    expect(press('Tab', true)).toBe(true);
    expect(last).toHaveFocus();
  });

  it('leaves Tab between inner controls to the browser', () => {
    const { middle } = renderModal();
    middle!.focus();
    expect(press('Tab')).toBe(false);
    expect(press('Tab', true)).toBe(false);
    expect(middle).toHaveFocus();
  });

  it('sends Tab from the container itself into the controls, never to the page behind', () => {
    const { dialog, first, last } = renderModal();
    dialog.focus();
    expect(press('Tab')).toBe(true);
    expect(first).toHaveFocus();

    dialog.focus();
    expect(press('Tab', true)).toBe(true);
    expect(last).toHaveFocus();
  });

  it('ignores every other key', () => {
    const { last } = renderModal();
    last!.focus();
    expect(press('Enter')).toBe(false);
    expect(last).toHaveFocus();
  });

  it('does nothing in a container without controls', () => {
    const { dialog } = renderModal(false);
    dialog.focus();
    expect(press('Tab')).toBe(false);
    expect(dialog).toHaveFocus();
  });
});
