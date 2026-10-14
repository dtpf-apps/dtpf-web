/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

// A new worker takes over at once. Whether the open page moves to the new build is not its
// call: hooks/useSWUpdate does that on the next navigation or tab re-focus.
clientsClaim();
void self.skipWaiting();

// The Vite output (js, css, html, svg); vite-plugin-pwa injects the list at build time.
precacheAndRoute(self.__WB_MANIFEST);

// Page navigations get the precached shell, so the site opens offline. A path with a file
// extension (OG cards, the CV PDFs, sitemap.xml) is a file, and goes to the network.
const FILE_EXTENSION = /\/[^/?]+\.[^/]+$/;
registerRoute(
  ({ request, url }) => request.mode === 'navigate' && !FILE_EXTENSION.test(url.pathname),
  createHandlerBoundToURL('/index.html')
);

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin &&
    (url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.ico')),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);
