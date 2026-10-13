/**
 * The build writes the head tags of each route into its HTML, marked `data-prerender`, so crawlers
 * that do not run JavaScript see them. React 19 then renders the same tags itself; dropping the
 * marked copies before the first render keeps the head from ending up with two titles.
 */
export function removePrerendered(doc: Document = document): void {
  doc.querySelectorAll('[data-prerender]').forEach((el) => el.remove());
}
