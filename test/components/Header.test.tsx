import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Header from '../../src/views/components/navigation/Header';

describe('Header', () => {
  it('renders logo link to home', () => {
    renderWithProviders(<Header />);
    const logo = screen.getByText('dtpf');
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders 4 navigation links', () => {
    renderWithProviders(<Header />);
    const nav = screen.getAllByRole('link');
    // Logo + 4 nav links = at least 5
    expect(nav.length).toBeGreaterThanOrEqual(5);
  });

  it('theme toggle button exists', () => {
    renderWithProviders(<Header />);
    const btn = screen.getAllByRole('button').find((b) => b.getAttribute('aria-label'));
    expect(btn).toBeDefined();
  });

  it('language toggle switches label', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    // Find the lang toggle button (shows "EN" when current lang is "es")
    const langBtn = screen.getAllByRole('button').find((b) => b.textContent === 'EN' || b.textContent === 'ES');
    expect(langBtn).toBeDefined();

    const initialText = langBtn!.textContent;
    await user.click(langBtn!);
    expect(langBtn!.textContent).not.toBe(initialText);
  });
});
