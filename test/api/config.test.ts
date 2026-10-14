import { apiUrl } from '../../src/api/utils/config';

describe('apiUrl', () => {
  it('builds a same-origin path under /api/v1', () => {
    expect(apiUrl('/contact-me')).toBe('/api/v1/contact-me');
  });

  it('adds the slash a bare path is missing', () => {
    expect(apiUrl('client-errors')).toBe('/api/v1/client-errors');
  });
});
