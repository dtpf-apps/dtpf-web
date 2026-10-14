import {
  ageInDays,
  facts,
  formatDate,
  formatDecimal,
  formatInt,
  platformVars,
  projectVars,
  roundDownToTen,
  roundDownToThousand,
  yearsSince,
} from '../../src/config/facts';
import { projects } from '../../src/config/projects';

// Regenerate with `python3 scripts/utils/portfolio-facts.py` from the d-context workspace.
const MAX_AGE_DAYS = 120;

describe('facts.json', () => {
  it('carries a parseable generatedAt date', () => {
    expect(Number.isNaN(new Date(facts.generatedAt).getTime())).toBe(false);
  });

  // Only in CI: a developer's checkout must not go red because the file aged while they
  // were working on something else, but a deploy with figures older than four months must.
  it.runIf(process.env.CI)(`was regenerated within the last ${MAX_AGE_DAYS} days`, () => {
    expect(ageInDays(facts.generatedAt)).toBeLessThanOrEqual(MAX_AGE_DAYS);
  });

  it('never claims more public apps than apps in production', () => {
    expect(facts.apps.public).toBeGreaterThan(0);
    expect(facts.apps.public).toBeLessThanOrEqual(facts.apps.production);
  });

  it('counts at least one dauth tenant', () => {
    expect(facts.dauthTenants).toBeGreaterThanOrEqual(1);
  });

  it('has an entry for every project card that shows metrics', () => {
    for (const p of projects.filter((p) => p.metrics)) {
      expect(facts.projects[p.slug], `facts.projects.${p.slug}`).toBeDefined();
    }
  });

  it('breaks every project total down into parts that add up', () => {
    for (const [slug, project] of Object.entries(facts.projects)) {
      const { total, ...parts } = project.tests;
      const sum = Object.values(parts).reduce((acc, n) => acc + n, 0);
      expect(sum, `${slug} breakdown`).toBe(total);
    }
  });

  it('keeps the site total at or above the sum of the project totals', () => {
    const sum = Object.values(facts.projects).reduce((acc, p) => acc + p.tests.total, 0);
    expect(facts.tests.total).toBeGreaterThanOrEqual(sum);
  });

  it('measures the platform, with no figure left at the zero an unreachable exporter would leave', () => {
    const p = facts.platform;
    expect(p.nodes).toBeGreaterThan(0);
    expect(p.guests.lxc + p.guests.vm).toBeGreaterThan(p.nodes);
    expect(p.replicationJobs).toBeGreaterThan(0);
    expect(p.guestsWithoutBackup).toBeGreaterThanOrEqual(0);
    expect(p.backup.datastores).toBeGreaterThan(0);
    expect(p.backup.usedBytes).toBeGreaterThan(1e9);
    expect(p.monitoring.alertRules).toBeGreaterThan(0);
    expect(p.monitoring.probes).toBeLessThanOrEqual(p.monitoring.targets);
    expect(p.monitoring.jobs).toBeLessThanOrEqual(p.monitoring.targets);
    expect(p.ci.workflows).toBeGreaterThanOrEqual(p.ci.repos);
    expect(p.ci.forges).toBe(2);
  });
});

describe('formatDecimal', () => {
  it('uses the comma in Spanish and the point in English', () => {
    expect(formatDecimal(2.787, 'es')).toBe('2,8');
    expect(formatDecimal(2.787, 'en')).toBe('2.8');
    expect(formatDecimal(2, 'en', 2)).toBe('2.00');
  });
});

describe('formatDate', () => {
  it('writes the long date in the language of the UI, on the day the ISO string names', () => {
    expect(formatDate('2026-10-14', 'es')).toBe('14 de octubre de 2026');
    expect(formatDate('2026-10-14', 'en')).toBe('14 October 2026');
    expect(formatDate('2026-01-01', 'en')).toBe('1 January 2026');
  });
});

describe('platformVars', () => {
  it('formats every platform figure for the language and the backups in terabytes to one decimal', () => {
    const p = facts.platform;
    const es = platformVars('es');
    expect(es.guests).toBe(formatInt(p.guests.lxc + p.guests.vm, 'es'));
    expect(es.backupTb).toMatch(/^\d+,\d$/);
    expect(parseFloat(es.backupTb.replace(',', '.')) * 1e12).toBeCloseTo(p.backup.usedBytes, -11);
    expect(es.measuredAt).toBe(formatDate(facts.generatedAt, 'es'));
    expect(platformVars('en').backupTb).toMatch(/^\d+\.\d$/);
    for (const [key, value] of Object.entries(es)) {
      expect(value, key).not.toMatch(/undefined|NaN|\{\{/);
    }
  });
});

describe('ageInDays', () => {
  it('measures whole and fractional days', () => {
    expect(ageInDays('2026-01-01', new Date('2026-05-01'))).toBe(120);
    expect(ageInDays('2026-01-01', new Date('2026-05-02'))).toBe(121);
    expect(ageInDays('2026-01-01T00:00:00Z', new Date('2026-01-01T12:00:00Z'))).toBe(0.5);
  });
});

describe('formatInt', () => {
  it('groups thousands with a dot in Spanish', () => {
    expect(formatInt(87021, 'es')).toBe('87.021');
    expect(formatInt(3170, 'es')).toBe('3.170');
  });

  it('groups thousands with a comma in English', () => {
    expect(formatInt(87021, 'en')).toBe('87,021');
    expect(formatInt(1234567, 'en-US')).toBe('1,234,567');
  });

  it('leaves numbers under a thousand alone and truncates fractions', () => {
    expect(formatInt(999, 'es')).toBe('999');
    expect(formatInt(1999.9, 'en')).toBe('1,999');
  });
});

describe('roundDownToThousand', () => {
  it('floors to the thousand', () => {
    expect(roundDownToThousand(87021)).toBe(87000);
    expect(roundDownToThousand(87999)).toBe(87000);
    expect(roundDownToThousand(999)).toBe(0);
  });
});

describe('yearsSince', () => {
  it('counts whole years, turning over on the anniversary', () => {
    expect(yearsSince('2023-07-01', new Date('2026-10-13'))).toBe(3);
    expect(yearsSince('2023-07-01', new Date('2026-07-01'))).toBe(3);
    expect(yearsSince('2023-07-01', new Date('2026-06-30'))).toBe(2);
    expect(yearsSince('2023-07-15', new Date('2026-07-14'))).toBe(2);
  });

  it('never goes negative', () => {
    expect(yearsSince('2030-01-01', new Date('2026-10-13'))).toBe(0);
  });
});

describe('roundDownToTen', () => {
  it('floors to the ten', () => {
    expect(roundDownToTen(280)).toBe(280);
    expect(roundDownToTen(289)).toBe(280);
    expect(roundDownToTen(9)).toBe(0);
  });
});

describe('dcompany MCP tool count', () => {
  it('is measured and large enough to be a real catalogue, not a regex that matched nothing', () => {
    expect(facts.projects.dcompany.mcpTools).toBeGreaterThanOrEqual(100);
  });
});

describe('projectVars', () => {
  it('formats every test figure of a project for the language', () => {
    const vars = projectVars('dauth', 'es');
    expect(vars.tests).toBe(formatInt(facts.projects.dauth.tests.total, 'es'));
    expect(vars.backend).toBe(formatInt(facts.projects.dauth.tests.backend!, 'es'));
    expect(vars.packages).toBe(formatInt(facts.projects.dauth.tests.packages!, 'es'));
    expect(vars.tenants).toBe(String(facts.dauthTenants));
  });

  it('exposes the MCP tool count floored to the ten only where it is measured', () => {
    const floored = Math.floor(facts.projects.dcompany.mcpTools! / 10) * 10;
    expect(projectVars('dcompany', 'en').mcpTools).toBe(formatInt(floored, 'en'));
    expect(projectVars('dauth', 'en').mcpTools).toBeUndefined();
  });

  it('still provides the tenant count for a slug without facts', () => {
    expect(projectVars('nope', 'en')).toEqual({ tenants: String(facts.dauthTenants) });
  });
});
