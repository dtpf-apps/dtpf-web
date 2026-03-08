import { screen } from '@testing-library/react';
import { renderWithProviders } from '../helpers/renderWithProviders';
import NotFound from '../../src/views/pages/NotFound';

describe('NotFound', () => {
  it('shows 404 text', () => {
    renderWithProviders(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('has a link to go home', () => {
    renderWithProviders(<NotFound />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});
