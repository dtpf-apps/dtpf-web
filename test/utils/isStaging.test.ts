describe('isStaging', () => {
  const originalLocation = window.location;

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
    vi.resetModules();
  });

  async function loadWithHostname(hostname: string): Promise<boolean> {
    Object.defineProperty(window, 'location', {
      value: { ...originalLocation, hostname },
      writable: true,
      configurable: true,
    });
    vi.resetModules();
    const mod = await import('../../src/utils/isStaging');
    return mod.isStaging;
  }

  it('detects "dev.dtpf.es" as staging', async () => {
    expect(await loadWithHostname('dev.dtpf.es')).toBe(true);
  });

  it('detects "dev-dtpf.dtpf.es" as staging', async () => {
    expect(await loadWithHostname('dev-dtpf.dtpf.es')).toBe(true);
  });

  it('returns false for production domain "dtpf.es"', async () => {
    expect(await loadWithHostname('dtpf.es')).toBe(false);
  });

  it('returns false for "localhost"', async () => {
    expect(await loadWithHostname('localhost')).toBe(false);
  });
});
