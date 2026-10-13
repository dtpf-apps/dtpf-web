import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../helpers/renderWithProviders';
import ProjectGallery from '../../src/views/components/ProjectGallery';
import type { ProjectMedia } from '../../src/config/projects';

const media: ProjectMedia[] = [
  {
    src: '/projects/dcompany/landing-desktop.webp',
    altKey: 'media_dcompany_landing_desktop',
    width: 1600,
    height: 1000,
  },
  {
    src: '/projects/dcompany/landing-phone.webp',
    altKey: 'media_dcompany_landing_phone',
    width: 780,
    height: 1688,
  },
  {
    src: '/projects/dauth/landing-phone.webp',
    altKey: 'media_dauth_landing_phone',
    width: 780,
    height: 1688,
  },
];

function setup(items: ProjectMedia[] = media) {
  const user = userEvent.setup();
  renderWithProviders(<ProjectGallery media={items} projectName="dcompany" />);
  const thumbs = () => screen.getAllByRole('button', { name: /^Enlarge screenshot:/ });
  return { user, thumbs };
}

describe('ProjectGallery', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders one thumbnail per image with its translated alt', () => {
    const { thumbs } = setup();
    expect(thumbs()).toHaveLength(3);
    expect(screen.getByAltText('dcompany landing on a phone')).toHaveAttribute(
      'src',
      '/projects/dcompany/landing-phone.webp'
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens a modal dialog with the close button focused and a 1-based counter', async () => {
    const { user, thumbs } = setup();
    await user.click(thumbs()[0]);
    const dialog = screen.getByRole('dialog', { name: 'dcompany screenshots' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
    expect(screen.getByText('1 of 3')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('navigates with the arrow keys and wraps around', async () => {
    const { user, thumbs } = setup();
    await user.click(thumbs()[0]);
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('2 of 3')).toBeInTheDocument();
    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(screen.getByText('3 of 3')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('1 of 3')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByText('3 of 3')).toBeInTheDocument();
  });

  it('closes on Escape, returns focus to the opener and restores body scroll', async () => {
    const { user, thumbs } = setup();
    const opener = thumbs()[1];
    await user.click(opener);
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
  });

  it('closes on a backdrop click but not on an image click', async () => {
    const { user, thumbs } = setup();
    await user.click(thumbs()[0]);
    const dialog = screen.getByRole('dialog');
    await user.click(dialog.querySelector('img')!);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('traps Tab and Shift+Tab inside the dialog', async () => {
    const { user, thumbs } = setup();
    await user.click(thumbs()[0]);
    const close = screen.getByRole('button', { name: 'Close' });
    const next = screen.getByRole('button', { name: 'Next' });
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(next).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
  });

  it('keeps the keyboard in control after a click on the image or the counter', async () => {
    const { user, thumbs } = setup();
    const opener = thumbs()[0];
    await user.click(opener);
    const dialog = screen.getByRole('dialog');
    const image = () => dialog.querySelector('img')!;
    await user.click(image());
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('2 of 3')).toBeInTheDocument();
    await user.click(screen.getByText('2 of 3'));
    await user.tab();
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
    await user.click(image());
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();
    await user.click(image());
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it('returns focus to the opener when closed with the button or the backdrop', async () => {
    const { user, thumbs } = setup();
    const opener = thumbs()[2];
    await user.click(opener);
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    await user.click(opener);
    await user.click(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it('closes on a click on the empty part of the top bar but not on the counter', async () => {
    const { user, thumbs } = setup();
    await user.click(thumbs()[0]);
    const counter = screen.getByText('1 of 3');
    await user.click(counter);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(counter.parentElement!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('restores body scroll when unmounted while open', async () => {
    const user = userEvent.setup();
    const { unmount } = renderWithProviders(<ProjectGallery media={media} projectName="dcompany" />);
    await user.click(screen.getAllByRole('button', { name: /^Enlarge screenshot:/ })[0]);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('shows no prev/next and ignores arrows with a single image', async () => {
    const { user, thumbs } = setup([media[0]]);
    await user.click(thumbs()[0]);
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('1 of 1')).toBeInTheDocument();
    const close = screen.getByRole('button', { name: 'Close' });
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(close).toHaveFocus();
  });
});
