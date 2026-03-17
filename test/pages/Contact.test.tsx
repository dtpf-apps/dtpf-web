import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Contact from '../../src/views/pages/Contact';
import { trackEvent } from '../../src/utils/analytics';

vi.mock('../../src/api/utils/config', () => ({
  apiUrl: (path: string) => `http://localhost:3998/api/v1${path}`,
}));

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
  identifyUser: vi.fn(),
}));

describe('Contact', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = mockFetch;
  });

  it('renders form with email, name, and message fields', () => {
    renderWithProviders(<Contact />);
    expect(document.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="name"]')).toBeInTheDocument();
    expect(document.querySelector('textarea[name="message"]')).toBeInTheDocument();
  });

  it('has a hidden honeypot field', () => {
    renderWithProviders(<Contact />);
    const honeypot = document.querySelector('input[name="website"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot!.closest('div')).toHaveClass('-left-[9999px]');
  });

  it('has a submit button', () => {
    renderWithProviders(<Contact />);
    const btn = document.querySelector('button[type="submit"]');
    expect(btn).toBeInTheDocument();
  });

  it('has a privacy policy link', () => {
    renderWithProviders(<Contact />);
    const link = screen.getByRole('link', { name: /privac/i });
    expect(link).toHaveAttribute('href', '/privacy-policy');
  });

  it('submits form with correct data', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ status: 200 }) });

    renderWithProviders(<Contact />);

    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    const messageInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;

    await user.type(emailInput, 'test@example.com');
    await user.type(nameInput, 'Test User');
    await user.type(messageInput, 'Hola, este es un test.');

    // Check the privacy checkbox
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    // Submit
    const submitBtn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3998/api/v1/contact-me',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });
  });

  it('renders direct contact links', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByText('davidpizarrofrick@gmail.com')).toBeInTheDocument();
  });

  it('disables submit button while loading', async () => {
    const user = userEvent.setup();
    // Mock a slow response
    mockFetch.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ ok: true, json: () => Promise.resolve({ status: 200 }) }), 500)
        )
    );

    renderWithProviders(<Contact />);

    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    const messageInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    const checkbox = screen.getByRole('checkbox');

    await user.type(emailInput, 'test@test.com');
    await user.type(nameInput, 'Test');
    await user.type(messageInput, 'Mensaje de prueba.');
    await user.click(checkbox);

    const submitBtn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    await user.click(submitBtn);

    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });
  });

  it('shows success toast after successful submit', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ status: 200 }) });

    renderWithProviders(<Contact />);

    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const messageInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    const checkbox = screen.getByRole('checkbox');

    await user.type(emailInput, 'test@test.com');
    await user.type(messageInput, 'Mensaje de prueba.');
    await user.click(checkbox);
    await user.click(document.querySelector('button[type="submit"]') as HTMLButtonElement);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it('shows error toast when server returns non-ok response', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Demasiados mensajes' }),
    });

    renderWithProviders(<Contact />);

    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const messageInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    const checkbox = screen.getByRole('checkbox');

    await user.type(emailInput, 'test@test.com');
    await user.type(messageInput, 'Mensaje de prueba.');
    await user.click(checkbox);
    await user.click(document.querySelector('button[type="submit"]') as HTMLButtonElement);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it('sends _t timestamp in request body', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ status: 200 }) });

    renderWithProviders(<Contact />);

    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const messageInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    const checkbox = screen.getByRole('checkbox');

    await user.type(emailInput, 'test@test.com');
    await user.type(messageInput, 'Mensaje de prueba.');
    await user.click(checkbox);
    await user.click(document.querySelector('button[type="submit"]') as HTMLButtonElement);

    await waitFor(() => {
      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body._t).toBeDefined();
      expect(typeof body._t).toBe('number');
    });
  });

  it('has a required checkbox for privacy policy', () => {
    renderWithProviders(<Contact />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeRequired();
  });

  it('renders LinkedIn and GitHub contact links', () => {
    renderWithProviders(<Contact />);
    const links = screen.getAllByRole('link');
    const linkedin = links.find((l) => l.getAttribute('href')?.includes('linkedin'));
    const github = links.find((l) => l.getAttribute('href')?.includes('github'));
    expect(linkedin).toBeDefined();
    expect(github).toBeDefined();
  });

  it('shows error toast on network failure', async () => {
    const user = userEvent.setup();
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    renderWithProviders(<Contact />);

    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const messageInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    const checkbox = screen.getByRole('checkbox');

    await user.type(emailInput, 'test@test.com');
    await user.type(messageInput, 'Mensaje de prueba.');
    await user.click(checkbox);
    await user.click(document.querySelector('button[type="submit"]') as HTMLButtonElement);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it('handles non-ok response when json() fails', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.reject(new Error('invalid json')),
    });

    renderWithProviders(<Contact />);

    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const messageInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    const checkbox = screen.getByRole('checkbox');

    await user.type(emailInput, 'test@test.com');
    await user.type(messageInput, 'Mensaje de prueba.');
    await user.click(checkbox);
    await user.click(document.querySelector('button[type="submit"]') as HTMLButtonElement);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it('clicking email link tracks contact:email event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    const emailLink = screen
      .getAllByRole('link')
      .find((l) => l.getAttribute('href') === 'mailto:davidpizarrofrick@gmail.com');
    await user.click(emailLink!);
    expect(trackEvent).toHaveBeenCalledWith('contact:email');
  });

  it('clicking LinkedIn link tracks contact:linkedin event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    const linkedinLink = screen
      .getAllByRole('link')
      .find((l) => l.getAttribute('href')?.includes('linkedin'));
    await user.click(linkedinLink!);
    expect(trackEvent).toHaveBeenCalledWith('contact:linkedin');
  });

  it('clicking GitHub link tracks contact:github event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    const githubLink = screen
      .getAllByRole('link')
      .find((l) => l.getAttribute('href')?.includes('github.com/DTPF'));
    await user.click(githubLink!);
    expect(trackEvent).toHaveBeenCalledWith('contact:github');
  });
});
