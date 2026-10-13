import { Link, NavLink, Navigate } from 'react-router';
import type { ComponentProps } from 'react';
import { localizePath } from './paths';
import useRouteLang from './useRouteLang';

// These wrap the react-router primitives so a link written as `/about` lands on `/en/about`
// when the visitor is in the English tree; a raw `Link` would bounce them back to Spanish.
// Only the `to` prop changes; everything else is passed straight through.

export function LocalizedLink({ to, ...rest }: ComponentProps<typeof Link> & { to: string }) {
  return <Link to={localizePath(to, useRouteLang())} {...rest} />;
}

export function LocalizedNavLink({ to, ...rest }: ComponentProps<typeof NavLink> & { to: string }) {
  return <NavLink to={localizePath(to, useRouteLang())} {...rest} />;
}

export function LocalizedNavigate({ to, ...rest }: ComponentProps<typeof Navigate> & { to: string }) {
  return <Navigate to={localizePath(to, useRouteLang())} {...rest} />;
}
