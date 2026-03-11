vi.mock('../../src/api/utils/config', () => ({
  basePath: 'http://localhost:3998/api',
  apiVersion: 'v1',
}));

import { fetchAPI, apiUrl, buildUrl } from '../../src/api/utils/fetchHelper';

describe('apiUrl', () => {
  it('builds full URL from path', () => {
    expect(apiUrl('contact-me')).toBe('http://localhost:3998/api/v1/contact-me');
  });
});

describe('buildUrl', () => {
  it('builds URL with query params', () => {
    const url = buildUrl('http://localhost/api', { page: 1, active: true });
    expect(url).toBe('http://localhost/api?page=1&active=true');
  });

  it('converts non-string params to strings', () => {
    const url = buildUrl('http://test.com', { num: 42 });
    expect(url).toContain('num=42');
  });
});

describe('fetchAPI', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = mockFetch;
  });

  it('calls fetch with credentials: include', async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ status: 200 }),
    });

    await fetchAPI('http://localhost:3998/api/v1/test');

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3998/api/v1/test', {
      credentials: 'include',
    });
  });

  it('parses JSON response', async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ message: 'ok' }),
    });

    const { data } = await fetchAPI<{ message: string }>('http://test.com/api');
    expect(data.message).toBe('ok');
  });

  it('returns null data if JSON parsing fails', async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.reject(new Error('not json')),
    });

    const { data } = await fetchAPI('http://test.com/api');
    expect(data).toBeNull();
  });

  it('passes custom options to fetch', async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({}),
    });

    await fetchAPI('http://test.com/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(mockFetch).toHaveBeenCalledWith('http://test.com/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  });

  it('returns response object alongside data', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: () => Promise.resolve({ status: 200 }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    const { response, data } = await fetchAPI<{ status: number }>('http://test.com/api');
    expect(response).toBe(mockResponse);
    expect(data.status).toBe(200);
  });

  it('propagates network errors', async () => {
    mockFetch.mockRejectedValue(new Error('Network failure'));

    await expect(fetchAPI('http://test.com/api')).rejects.toThrow('Network failure');
  });

  it('always includes credentials even without options', async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({}),
    });

    await fetchAPI('http://test.com/api');

    expect(mockFetch).toHaveBeenCalledWith('http://test.com/api', {
      credentials: 'include',
    });
  });
});
