import { readStored, removeStored, STORAGE_KEYS, writeStored } from '../../src/utils/storage';

describe('storage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('writes, reads and removes a key', () => {
    writeStored(STORAGE_KEYS.theme, 'light');
    expect(readStored(STORAGE_KEYS.theme)).toBe('light');
    removeStored(STORAGE_KEYS.theme);
    expect(readStored(STORAGE_KEYS.theme)).toBeNull();
  });

  // Disabled by policy, some private modes, a full quota: the page must carry on without it.
  it('never throws when localStorage does', () => {
    const denied = () => {
      throw new DOMException('The operation is insecure.', 'SecurityError');
    };
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(denied);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(denied);
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(denied);

    expect(readStored(STORAGE_KEYS.lang)).toBeNull();
    expect(() => writeStored(STORAGE_KEYS.lang, 'en')).not.toThrow();
    expect(() => removeStored(STORAGE_KEYS.lang)).not.toThrow();
  });
});
