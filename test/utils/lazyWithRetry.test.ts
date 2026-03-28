vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

vi.mock('../../src/utils/errorTracking', () => ({
  reportError: vi.fn(),
  initErrorTracking: vi.fn(),
  reportFetchError: vi.fn(),
}));

import { checkChunkRecovery } from '../../src/utils/lazyWithRetry';
import { trackEvent } from '../../src/utils/analytics';

describe('lazyWithRetry', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  describe('checkChunkRecovery', () => {
    it('does nothing when no retry flag in sessionStorage', () => {
      checkChunkRecovery();
      expect(trackEvent).not.toHaveBeenCalled();
    });

    it('tracks recovery event and clears flag when retry flag exists', () => {
      sessionStorage.setItem('chunk-retry', '1');
      checkChunkRecovery();
      expect(trackEvent).toHaveBeenCalledWith('error:chunk-load-recovered', {
        path: '/',
      });
      expect(sessionStorage.getItem('chunk-retry')).toBeNull();
    });

    it('clears the flag after recovery check', () => {
      sessionStorage.setItem('chunk-retry', '1');
      checkChunkRecovery();
      // Calling again should not track
      vi.clearAllMocks();
      checkChunkRecovery();
      expect(trackEvent).not.toHaveBeenCalled();
    });
  });
});
