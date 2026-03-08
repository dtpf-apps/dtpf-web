import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '../../src/contexts/theme/ThemeContext';
import '../../src/utils/i18n';

export function renderWithProviders(ui: React.ReactElement, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ThemeProvider>{ui}</ThemeProvider>
    </MemoryRouter>
  );
}
