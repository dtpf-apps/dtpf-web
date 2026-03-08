import { es } from '../../src/assets/locale/es';
import { en } from '../../src/assets/locale/en';

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
});
