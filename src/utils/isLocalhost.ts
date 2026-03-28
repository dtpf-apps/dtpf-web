export const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/) ||
  window.location.hostname.match(/^192\.168\.\d{1,3}\.\d{1,3}$/) ||
  window.location.hostname.match(/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)
);
