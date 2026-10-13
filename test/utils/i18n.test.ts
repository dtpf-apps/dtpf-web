import { es } from '../../src/assets/locale/es';
import { en } from '../../src/assets/locale/en';
import i18n from '../../src/utils/i18n';

describe('i18n translations', () => {
  it('Spanish and English have the same keys', () => {
    const esKeys = Object.keys(es).sort();
    const enKeys = Object.keys(en).sort();
    expect(esKeys).toEqual(enKeys);
  });

  it('no empty translation values in Spanish', () => {
    for (const [key, value] of Object.entries(es)) {
      expect(value, `es.${key} is empty`).toBeTruthy();
    }
  });

  it('no empty translation values in English', () => {
    for (const [key, value] of Object.entries(en)) {
      expect(value, `en.${key} is empty`).toBeTruthy();
    }
  });

  it('Spanish copy carries its accents (no ASCII-only stand-ins for common words)', () => {
    const unaccented =
      /\b(produccion|autenticacion|politica|pagina|configuracion|anos|dia|mas|dias|menu|solucion)\b/i;
    for (const [key, value] of Object.entries(es)) {
      expect(value, `es.${key} is missing an accent`).not.toMatch(unaccented);
    }
  });

  it('every interpolation placeholder in Spanish exists in English and vice versa', () => {
    const placeholders = (s: string) => (s.match(/\{\{\w+\}\}/g) ?? []).sort();
    for (const key of Object.keys(es) as (keyof typeof es)[]) {
      expect(placeholders(es[key]), key).toEqual(placeholders(en[key]));
    }
  });
});

describe('document language', () => {
  it('mirrors the active language on <html lang> and follows changes', async () => {
    expect(document.documentElement.lang).toBe(i18n.language);
    await i18n.changeLanguage('es');
    expect(document.documentElement.lang).toBe('es');
    await i18n.changeLanguage('en');
    expect(document.documentElement.lang).toBe('en');
  });
});
