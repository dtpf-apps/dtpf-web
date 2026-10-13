import { useLocation } from 'react-router';
import { langFromPath, type Lang } from './paths';

/** The URL is the source of truth for the language; i18next follows it, never the reverse. */
export default function useRouteLang(): Lang {
  return langFromPath(useLocation().pathname);
}
