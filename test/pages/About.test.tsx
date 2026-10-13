import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../helpers/renderWithProviders';
import About from '../../src/views/pages/About';
import { facts } from '../../src/config/facts';
import { trackEvent } from '../../src/utils/analytics';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

describe('About', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders name and profile initials', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('David T. Pizarro Frick')).toBeInTheDocument();
    expect(screen.getByText('DP')).toBeInTheDocument();
  });

  it('renders experience section with 3 entries', () => {
    renderWithProviders(<About />);
    const section = screen.getByRole('heading', { level: 2, name: 'Experience' }).parentElement!;
    expect(within(section).getAllByRole('heading', { level: 3 })).toHaveLength(3);
  });

  it('renders tools grid with 5 categories', () => {
    renderWithProviders(<About />);
    const section = screen.getByRole('heading', { level: 2, name: 'Tools' }).parentElement!;
    expect(within(section).getAllByRole('heading', { level: 3 })).toHaveLength(5);
    expect(screen.getByText('React 19')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.getByText('Claude Code')).toBeInTheDocument();
    expect(screen.getByText('Vitest')).toBeInTheDocument();
  });

  it('names the stack of the day job and the self-hosted inference models', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('NestJS')).toBeInTheDocument();
    expect(screen.getByText('Jest')).toBeInTheDocument();
    expect(screen.getByText('Whisper')).toBeInTheDocument();
    expect(screen.getByText('Gitea Actions')).toBeInTheDocument();
  });

  it('has LinkedIn and GitHub links', () => {
    renderWithProviders(<About />);
    const links = screen.getAllByRole('link');
    const linkedin = links.find((l) => l.getAttribute('href')?.includes('linkedin'));
    const github = links.find((l) => l.getAttribute('href')?.includes('github'));
    expect(linkedin).toBeDefined();
    expect(github).toBeDefined();
  });

  it('renders all 3 experience entries with company names', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('Storaia')).toBeInTheDocument();
    expect(screen.queryByText(/Hub4Retail/)).not.toBeInTheDocument();
    expect(screen.getByText('Palmira')).toBeInTheDocument();
    expect(screen.getByText('Assembler Institute of Technology')).toBeInTheDocument();
  });

  it('renders experience periods', () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/Jul 2023/)).toBeInTheDocument();
    expect(screen.getByText(/Jun 2021.*Jun 2023/)).toBeInTheDocument();
    expect(screen.getByText(/Oct 2022.*May 2023/)).toBeInTheDocument();
  });

  it('renders experience role descriptions', () => {
    renderWithProviders(<About />);
    expect(
      screen.getByText(/one platform for catalogue, orders, pricing and sell-out data/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Next\.js \+ NestJS \+ TypeScript/)).toBeInTheDocument();
    expect(screen.getByText(/Mobile and web apps/)).toBeInTheDocument();
  });

  it('renders frontend tools in grid', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
    expect(screen.getByText('Framer Motion')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
  });

  it('renders backend tools in grid', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('Express')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('REST APIs')).toBeInTheDocument();
    expect(screen.getByText('WebSockets')).toBeInTheDocument();
  });

  it('renders bio paragraphs with the measured app census', () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/full-stack engineer at Storaia/)).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`${facts.apps.production} apps of my own in production \\(${facts.apps.public} public\\)`)
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/taking an idea from zero/)).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/\{\{/);
  });

  it('shows role, location and availability', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('Senior Full-Stack Engineer')).toBeInTheDocument();
    expect(screen.getByText('Mallorca, Spain')).toBeInTheDocument();
    expect(screen.getByText('Open to offers · remote or hybrid from Mallorca')).toBeInTheDocument();
  });

  it('clicking LinkedIn tracks about:linkedin event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<About />);
    const linkedinLink = screen
      .getAllByRole('link')
      .find((l) => l.getAttribute('href')?.includes('linkedin'));
    await user.click(linkedinLink!);
    expect(trackEvent).toHaveBeenCalledWith('about:linkedin');
  });

  it('clicking GitHub tracks about:github event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<About />);
    const githubLink = screen.getAllByRole('link').find((l) => l.getAttribute('href')?.includes('github'));
    await user.click(githubLink!);
    expect(trackEvent).toHaveBeenCalledWith('about:github');
  });

  it('links to the CV in the current language and tracks about:cv', async () => {
    const user = userEvent.setup();
    const { unmount } = renderWithProviders(<About />, { route: '/about' });
    const link = screen.getByRole('link', { name: 'Résumé' });
    expect(link).toHaveAttribute('href', '/cv');
    await user.click(link);
    expect(trackEvent).toHaveBeenCalledWith('about:cv');
    unmount();

    renderWithProviders(<About />, { route: '/en/about' });
    expect(screen.getByRole('link', { name: 'Résumé' })).toHaveAttribute('href', '/en/cv');
  });
});
