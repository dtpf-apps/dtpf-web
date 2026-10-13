import { localizePath, stripLang, type Lang } from 'router/paths';

// Fixed on purpose, staging included: a canonical must point at the public site, and staging
// is kept out of the index by its access list rather than by a different canonical.
export const SITE_URL = 'https://dtpf.es';
export const SITE_NAME = 'David T. Pizarro Frick';

export const AUTHOR = {
  name: 'David T. Pizarro Frick',
  jobTitle: 'Senior Full-Stack Engineer',
  linkedin: 'https://www.linkedin.com/in/david-tomas-pizarro-frick',
  github: 'https://github.com/DTPF',
  email: 'davidpizarrofrick@gmail.com',
} as const;

/** `key` is `home | projects | about | contact | cv | privacy-policy | project-<slug>`. */
export function ogImagePath(lang: Lang, key: string): string {
  return `/og/${lang}/${key}.png`;
}

/** Where the build writes the printable CV; `scripts/postbuild/pdf.mjs` must produce the same name. */
export function cvPdfPath(lang: Lang): string {
  return `/cv/david-pizarro-frick-${lang}.pdf`;
}

/** Absolute URL of a page in a given language; the Spanish home keeps its trailing slash. */
export function canonicalUrl(pathname: string, lang: Lang): string {
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const localized = localizePath(stripLang(trimmed || '/'), lang);
  return `${SITE_URL}${localized}`;
}

/** `<` is escaped so a string value can never close the surrounding `<script>` element. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function personJsonLd(lang: Lang): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    url: canonicalUrl('/', lang),
    sameAs: [AUTHOR.linkedin, AUTHOR.github],
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Mallorca',
      addressCountry: 'ES',
    },
  };
}

export function softwareJsonLd(app: {
  name: string;
  description: string;
  /** Absent for a private project: nothing public to point at. */
  url?: string;
  android?: boolean;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    description: app.description,
    ...(app.url ? { url: app.url } : {}),
    applicationCategory: 'WebApplication',
    operatingSystem: app.android ? 'Android' : 'Web',
    author: { '@type': 'Person', name: AUTHOR.name, url: SITE_URL },
  };
}
