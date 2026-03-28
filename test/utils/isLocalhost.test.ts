describe('isLocalhost', () => {
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
    const mod = await import('../../src/utils/isLocalhost');
    return mod.isLocalhost;
  }

  it('detects "localhost"', async () => {
    expect(await loadWithHostname('localhost')).toBe(true);
  });

  it('detects "127.0.0.1"', async () => {
    expect(await loadWithHostname('127.0.0.1')).toBe(true);
  });

  it('detects "[::1]"', async () => {
    expect(await loadWithHostname('[::1]')).toBe(true);
  });

  it('detects 192.168.1.x addresses', async () => {
    expect(await loadWithHostname('192.168.1.44')).toBe(true);
  });

  it('detects 10.x.x.x addresses', async () => {
    expect(await loadWithHostname('10.5.0.44')).toBe(true);
  });

  it('returns false for production domain', async () => {
    expect(await loadWithHostname('dtpf.es')).toBe(false);
  });
});
