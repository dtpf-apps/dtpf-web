import { localizePath, stripLang, type Lang } from 'router/paths';
import useRouteLang from 'router/useRouteLang';
import { useLocation } from 'react-router';
import { SITE_URL, SITE_NAME, canonicalUrl, ogImagePath, serializeJsonLd } from 'config/site';

type SeoTitle =
  /** The page's name, already in the page's language; the title reads "<name> — <site>". */
  | { pageName: string; title?: never }
  /** A complete title, used verbatim (the home page). */
  | { title: string; pageName?: never };

type SeoProps = SeoTitle & {
  description: string;
  /** Which OG card to point at; see `ogImagePath`. */
  ogKey: string;
  type?: 'website' | 'profile' | 'article';
  jsonLd?: object;
  /** Keep the page out of the index: no canonical, no alternates, no sharing tags. */
  noindex?: boolean;
  /** Page exists only in Spanish: the canonical is the Spanish URL and no alternates are declared. */
  esOnly?: boolean;
};

const LOCALE: Record<Lang, string> = { es: 'es_ES', en: 'en_US' };
const OTHER: Record<Lang, Lang> = { es: 'en', en: 'es' };

// React 19 hoists <title>, <meta> and <link> to <head>; the language tags come from the URL
// because it is what a crawler sees, and i18next only follows it.
export default function Seo({
  description,
  ogKey,
  type = 'website',
  jsonLd,
  noindex = false,
  esOnly = false,
  ...name
}: SeoProps) {
  const { pathname } = useLocation();
  const routeLang = useRouteLang();
  const lang: Lang = esOnly ? 'es' : routeLang;
  const fullTitle = name.title === undefined ? `${name.pageName} — ${SITE_NAME}` : name.title;

  if (noindex) {
    return (
      <>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex" />
      </>
    );
  }

  const canonical = canonicalUrl(pathname, lang);
  const image = `${SITE_URL}${ogImagePath(lang, ogKey)}`;
  const bare = stripLang(pathname);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {!esOnly && (
        <>
          <link rel="alternate" hrefLang="es" href={`${SITE_URL}${localizePath(bare, 'es')}`} />
          <link rel="alternate" hrefLang="en" href={`${SITE_URL}${localizePath(bare, 'en')}`} />
          <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${localizePath(bare, 'es')}`} />
        </>
      )}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={LOCALE[lang]} />
      {!esOnly && <meta property="og:locale:alternate" content={LOCALE[OTHER[lang]]} />}
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      )}
    </>
  );
}
