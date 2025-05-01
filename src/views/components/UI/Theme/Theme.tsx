import React from 'react';
import { gaEvent } from 'utils/analytics';
import './Theme.scss';

function Theme() {
  const theme: any = localStorage.getItem('theme');
  theme && document.documentElement.setAttribute('data-theme', theme);
  const isDarkTheme = () => {
    if (theme === 'dark') {
      return true;
    }
    if (theme === 'light') {
      return false;
    }
  };
  const checkbox = document.querySelector('input[name=theme-switcher]');
  const trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition');
    }, 1000);
  };
  checkbox &&
    checkbox.addEventListener('change', (e: any) => {
      if (e.target.checked) {
        localStorage.setItem('theme', 'dark');
        trans();
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
        trans();
        document.documentElement.setAttribute('data-theme', 'light');
      }
    });
  const gaClickThemeSwitcher = () => {
    gaEvent('click_theme_switcher', 'clicks', 'UI Clicks', true);
  };
  return (
    <div className="layout__theme-switch">
      <input type="checkbox" id="theme-switcher" name="theme-switcher" defaultChecked={isDarkTheme()} />
      <label htmlFor="theme-switcher" aria-hidden="true" onClick={gaClickThemeSwitcher}>
        Theme Toggle
      </label>
    </div>
  );
}

export default Theme;
