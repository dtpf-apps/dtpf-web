let errorTracking: typeof import('../../src/utils/errorTracking');

function resetModule() {
  vi.resetModules();
  vi.restoreAllMocks();
}

describe('errorTracking', () => {
  const originalFetch = global.fetch;

  beforeEach(async () => {
    resetModule();
    vi.useFakeTimers();
    global.fetch = vi.fn().mockResolvedValue({});
    errorTracking = await import('../../src/utils/errorTracking');
  });

  afterEach(() => {
    vi.useRealTimers();
    global.fetch = originalFetch;
    resetModule();
  });

  describe('initErrorTracking', () => {
    it('sets up apiUrl and marks as initialized', () => {
      errorTracking.initErrorTracking('https://api.test.com/v1');
      // After init, reportError should enqueue (not bail out early)
      errorTracking.reportError(new Error('test'));
      vi.advanceTimersByTime(2000);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/v1/client-errors',
        expect.objectContaining({ method: 'POST' })
      );
    });

    it('does not re-initialize on second call', () => {
      errorTracking.initErrorTracking('https://first.com');
      errorTracking.initErrorTracking('https://second.com');
      errorTracking.reportError(new Error('test'));
      vi.advanceTimersByTime(2000);
      // Should still use the first URL
      expect(global.fetch).toHaveBeenCalledWith('https://first.com/client-errors', expect.anything());
    });

    it('registers window error listener', () => {
      const addEventSpy = vi.spyOn(window, 'addEventListener');
      errorTracking.initErrorTracking('https://api.test.com');
      expect(addEventSpy).toHaveBeenCalledWith('error', expect.any(Function));
    });

    it('registers window unhandledrejection listener', () => {
      const addEventSpy = vi.spyOn(window, 'addEventListener');
      errorTracking.initErrorTracking('https://api.test.com');
      expect(addEventSpy).toHaveBeenCalledWith('unhandledrejection', expect.any(Function));
    });
  });

  describe('reportError', () => {
    it('does nothing when not initialized', () => {
      errorTracking.reportError(new Error('should not send'));
      vi.advanceTimersByTime(2000);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('enqueues and flushes error with correct source', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      errorTracking.reportError(new Error('boom'), 'error-boundary');
      vi.advanceTimersByTime(2000);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
      expect(body.source).toBe('error-boundary');
      expect(body.message).toBe('boom');
    });

    it('defaults source to error-boundary', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      errorTracking.reportError(new Error('test'));
      vi.advanceTimersByTime(2000);
      const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
      expect(body.source).toBe('error-boundary');
    });
  });

  describe('reportFetchError', () => {
    it('enqueues a fetch error with formatted message', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      errorTracking.reportFetchError('/api/users', 500);
      vi.advanceTimersByTime(2000);
      const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
      expect(body.message).toBe('Fetch failed: 500 /api/users');
      expect(body.source).toBe('fetch-error');
    });
  });

  describe('deduplication', () => {
    it('ignores duplicate errors with same source:message', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      errorTracking.reportError(new Error('dup'), 'error-boundary');
      errorTracking.reportError(new Error('dup'), 'error-boundary');
      vi.advanceTimersByTime(2000);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('allows same message with different source', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      errorTracking.reportError(new Error('same'), 'error-boundary');
      errorTracking.reportFetchError('same', 0);
      vi.advanceTimersByTime(2000);
      // fetch-error message is "Fetch failed: 0 same" — different dedup key
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('truncation and metadata', () => {
    it('truncates message to 500 chars', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      const longMsg = 'x'.repeat(1000);
      errorTracking.reportError(new Error(longMsg));
      vi.advanceTimersByTime(2000);
      const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
      expect(body.message.length).toBe(500);
    });

    it('truncates stack to 2000 chars', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      const error = new Error('test');
      error.stack = 'y'.repeat(5000);
      errorTracking.reportError(error);
      vi.advanceTimersByTime(2000);
      const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
      expect(body.stack.length).toBe(2000);
    });

    it('includes url, userAgent, and timestamp', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      errorTracking.reportError(new Error('meta'));
      vi.advanceTimersByTime(2000);
      const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
      expect(body.url).toBeDefined();
      expect(body.userAgent).toBeDefined();
      expect(typeof body.timestamp).toBe('number');
    });
  });

  describe('flush batching', () => {
    it('batches multiple errors into one flush cycle', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      errorTracking.reportError(new Error('err1'));
      errorTracking.reportFetchError('/api/test', 404);
      // Both should flush at the same time
      vi.advanceTimersByTime(2000);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('does not call fetch if queue is empty at flush time', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      vi.advanceTimersByTime(5000);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('silently catches fetch failures', () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('network'));
      errorTracking.initErrorTracking('https://api.test.com');
      errorTracking.reportError(new Error('test'));
      // Should not throw
      expect(() => vi.advanceTimersByTime(2000)).not.toThrow();
    });
  });

  describe('window event handlers', () => {
    it('reports unhandled errors via error event', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      const errorEvent = new ErrorEvent('error', {
        error: new Error('unhandled'),
        message: 'unhandled',
      });
      window.dispatchEvent(errorEvent);
      vi.advanceTimersByTime(2000);
      const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
      expect(body.source).toBe('unhandled-error');
      expect(body.message).toBe('unhandled');
    });

    it('ignores error events without error object', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      const errorEvent = new ErrorEvent('error', { message: 'no error obj' });
      window.dispatchEvent(errorEvent);
      vi.advanceTimersByTime(2000);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('reports unhandled rejections', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      const event = new Event('unhandledrejection') as Event & { reason: Error };
      Object.defineProperty(event, 'reason', { value: new Error('rejected') });
      window.dispatchEvent(event);
      vi.advanceTimersByTime(2000);
      const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
      expect(body.source).toBe('unhandled-rejection');
      expect(body.message).toBe('rejected');
    });

    it('error handler falls back to event.message when error.message is empty', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      const errorEvent = new ErrorEvent('error', {
        error: { message: '', stack: undefined },
        message: 'fallback message',
      });
      window.dispatchEvent(errorEvent);
      vi.advanceTimersByTime(2000);
      const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
      expect(body.message).toBe('fallback message');
    });

    it('error handler falls back to Unknown error when no messages available', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      const errorEvent = new ErrorEvent('error', {
        error: { message: '', stack: undefined },
        message: '',
      });
      window.dispatchEvent(errorEvent);
      vi.advanceTimersByTime(2000);
      const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
      expect(body.message).toBe('Unknown error');
    });

    it('unhandledrejection with string reason uses String() fallback', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      const event = new Event('unhandledrejection');
      Object.defineProperty(event, 'reason', { value: 'string rejection' });
      window.dispatchEvent(event);
      vi.advanceTimersByTime(2000);
      const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
      expect(body.message).toBe('string rejection');
    });

    it('unhandledrejection with null reason uses String(null) fallback', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      const event = new Event('unhandledrejection');
      Object.defineProperty(event, 'reason', { value: null });
      window.dispatchEvent(event);
      vi.advanceTimersByTime(2000);
      const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
      // null?.message is undefined, String(null) is "null" which is truthy
      expect(body.message).toBe('null');
    });
  });

  describe('fetch call details', () => {
    it('sends with correct headers and options', () => {
      errorTracking.initErrorTracking('https://api.test.com');
      errorTracking.reportError(new Error('test'));
      vi.advanceTimersByTime(2000);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/client-errors',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          keepalive: true,
        })
      );
    });
  });
});
