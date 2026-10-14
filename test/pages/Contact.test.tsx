import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Contact from '../../src/views/pages/Contact';
import { trackEvent } from '../../src/utils/analytics';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const GENERIC_ERROR = 'Error sending. Please try again.';

function jsonResponse(ok: boolean, status: number, body: unknown) {
  return { ok, status, json: () => Promise.resolve(body) };
}

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>, name = '') {
  await user.type(screen.getByLabelText(/^Email/), 'test@example.com');
  if (name) await user.type(screen.getByLabelText('Name'), name);
  await user.type(screen.getByLabelText(/^Message/), 'Hola, este es un mensaje de prueba.');
  await user.click(screen.getByRole('checkbox'));
  await user.click(screen.getByRole('button', { name: 'Send message' }));
}

describe('Contact', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = mockFetch;
  });

  describe('form', () => {
    it('applies the API limits in the browser', () => {
      renderWithProviders(<Contact />);
      expect(screen.getByLabelText(/^Email/)).toHaveAttribute('maxLength', '254');
      expect(screen.getByLabelText('Name')).toHaveAttribute('maxLength', '100');
      const message = screen.getByLabelText(/^Message/);
      expect(message).toHaveAttribute('minLength', '10');
      expect(message).toHaveAttribute('maxLength', '5000');
    });

    it('marks email, message and the privacy checkbox as required', () => {
      renderWithProviders(<Contact />);
      expect(screen.getByLabelText(/^Email/)).toBeRequired();
      expect(screen.getByLabelText(/^Message/)).toBeRequired();
      expect(screen.getByLabelText('Name')).not.toBeRequired();
      expect(screen.getByRole('checkbox')).toBeRequired();
    });

    it('has a honeypot field hidden off-screen', () => {
      renderWithProviders(<Contact />);
      const honeypot = document.querySelector('input[name="website"]');
      expect(honeypot).toHaveAttribute('tabIndex', '-1');
      expect(honeypot?.closest('div')).toHaveClass('-left-[9999px]');
    });

    it('links the privacy policy', () => {
      renderWithProviders(<Contact />);
      expect(screen.getByRole('link', { name: /privac/i })).toHaveAttribute('href', '/privacy-policy');
    });
  });

  describe('submit', () => {
    it('posts the fields, the empty honeypot and the time the form appeared', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce(jsonResponse(true, 201, {}));
      const before = Date.now();
      renderWithProviders(<Contact />);

      await fillAndSubmit(user, 'Test User');

      await waitFor(() => expect(mockFetch).toHaveBeenCalled());
      const [url, init] = mockFetch.mock.calls[0];
      expect(url).toBe('/api/v1/contact-me');
      expect(init.method).toBe('POST');
      expect(init.headers).toEqual({ 'Content-Type': 'application/json' });
      const body = JSON.parse(init.body);
      expect(body).toMatchObject({
        email: 'test@example.com',
        name: 'Test User',
        message: 'Hola, este es un mensaje de prueba.',
        website: '',
      });
      expect(body._t).toBeGreaterThanOrEqual(before);
      expect(body._t).toBeLessThanOrEqual(Date.now());
    });

    it('confirms, clears the form and tracks success', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce(jsonResponse(true, 201, {}));
      renderWithProviders(<Contact />);

      await fillAndSubmit(user);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Message sent. I'll reply soon."));
      expect(screen.getByLabelText(/^Message/)).toHaveValue('');
      expect(trackEvent).toHaveBeenCalledWith('contact:success');
    });

    it('disables the button while the request is in flight', async () => {
      const user = userEvent.setup();
      mockFetch.mockReturnValueOnce(new Promise(() => {}));
      renderWithProviders(<Contact />);

      await fillAndSubmit(user);

      expect(await screen.findByRole('button', { name: 'Sending...' })).toBeDisabled();
    });
  });

  describe('errors: the API code becomes copy that says what to change', () => {
    it.each([
      [{ code: 'invalid_email' }, 'Check the email: it does not look like a valid address.'],
      [{ code: 'message_too_short' }, 'Make the message longer: it needs at least 10 characters.'],
      [{ code: 'message_too_long' }, 'Shorten the message: it takes up to 5000 characters.'],
      [{ code: 'too_many_links' }, 'Remove some links: a message can carry 5 at most.'],
      [
        { code: 'rate_limited', retryAfter: 1500 },
        'You have sent several messages in a row. You can send another in 25 min, or email me instead.',
      ],
      [
        { code: 'email_cooldown', retryAfter: 7200 },
        'A message from this email already reached me in the last 24 hours. You can send another in 2 h, or email me instead.',
      ],
    ])('%o', async (body, expected) => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce(jsonResponse(false, 400, { status: 400, message: 'texto', ...body }));
      renderWithProviders(<Contact />);

      await fillAndSubmit(user);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith(expected));
      expect(trackEvent).toHaveBeenCalledWith('contact:error', { status: 400 });
    });

    it.each([
      ['a code this form never causes', { code: 'invalid_json', message: 'texto' }],
      ['a 429 without its retryAfter', { code: 'rate_limited' }],
      ['a body that is not an error at all', null],
    ])('falls back to the generic message for %s', async (_name, body) => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce(jsonResponse(false, 400, body));
      renderWithProviders(<Contact />);

      await fillAndSubmit(user);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith(GENERIC_ERROR));
    });

    it('falls back to the generic message when the error body is not JSON', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 502,
        json: () => Promise.reject(new Error('html')),
      });
      renderWithProviders(<Contact />);

      await fillAndSubmit(user);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith(GENERIC_ERROR));
    });

    it('says so when the network fails', async () => {
      const user = userEvent.setup();
      mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));
      renderWithProviders(<Contact />);

      await fillAndSubmit(user);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith(GENERIC_ERROR));
      expect(trackEvent).toHaveBeenCalledWith('contact:error', { status: 'network' });
    });

    it('says the request timed out when it was aborted', async () => {
      const user = userEvent.setup();
      mockFetch.mockRejectedValueOnce(new DOMException('aborted', 'AbortError'));
      renderWithProviders(<Contact />);

      await fillAndSubmit(user);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Request timed out. Please try again.'));
      expect(trackEvent).toHaveBeenCalledWith('contact:error', { status: 'timeout' });
    });
  });

  describe('direct links', () => {
    it.each([
      ['mailto:davidpizarrofrick@gmail.com', 'davidpizarrofrick@gmail.com', 'contact:email', false],
      [
        'https://www.linkedin.com/in/david-tomas-pizarro-frick',
        'linkedin.com/in/david-tomas-pizarro-frick',
        'contact:linkedin',
        true,
      ],
      ['https://github.com/DTPF', 'github.com/DTPF', 'contact:github', true],
    ])('%s reads as its address and is tracked', async (href, text, event, external) => {
      const user = userEvent.setup();
      renderWithProviders(<Contact />);
      const link = screen.getByRole('link', { name: new RegExp(text.replace(/\./g, '\\.')) });
      expect(link).toHaveAttribute('href', href);
      expect(link.getAttribute('target')).toBe(external ? '_blank' : null);
      await user.click(link);
      expect(trackEvent).toHaveBeenCalledWith(event);
    });

    it('links to the CV in the current language and tracks contact:cv', async () => {
      const user = userEvent.setup();
      const { unmount } = renderWithProviders(<Contact />, { route: '/contact' });
      const link = screen.getByRole('link', { name: /Résumé/ });
      expect(link).toHaveAttribute('href', '/cv');
      await user.click(link);
      expect(trackEvent).toHaveBeenCalledWith('contact:cv');
      unmount();

      renderWithProviders(<Contact />, { route: '/en/contact' });
      expect(screen.getByRole('link', { name: /Résumé/ })).toHaveAttribute('href', '/en/cv');
    });
  });
});
