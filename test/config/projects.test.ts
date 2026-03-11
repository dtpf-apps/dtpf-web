import { projects } from '../../src/config/projects';

describe('projects config', () => {
  it('has exactly 5 projects', () => {
    expect(projects).toHaveLength(5);
  });

  it('each project has required fields', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy();
      expect(p.nameKey).toBeTruthy();
      expect(p.taglineKey).toBeTruthy();
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.liveUrl).toMatch(/^https:\/\//);
    }
  });

  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('dauth has metrics and case study', () => {
    const dauth = projects.find((p) => p.slug === 'dauth');
    expect(dauth).toBeDefined();
    expect(dauth!.metrics).toBeDefined();
    expect(dauth!.metrics!.length).toBeGreaterThan(0);
    expect(dauth!.problemKey).toBeDefined();
    expect(dauth!.solutionKey).toBeDefined();
    expect(dauth!.resultKey).toBeDefined();
  });

  it('all slugs are lowercase alphanumeric', () => {
    for (const p of projects) {
      expect(p.slug).toMatch(/^[a-z0-9]+$/);
    }
  });

  it('all stack arrays are non-empty and contain strings', () => {
    for (const p of projects) {
      expect(p.stack.length).toBeGreaterThan(0);
      for (const s of p.stack) {
        expect(typeof s).toBe('string');
        expect(s.length).toBeGreaterThan(0);
      }
    }
  });

  it('dtpf has no metrics and no case study', () => {
    const dtpf = projects.find((p) => p.slug === 'dtpf');
    expect(dtpf).toBeDefined();
    expect(dtpf!.metrics).toBeUndefined();
    expect(dtpf!.problemKey).toBeUndefined();
  });

  it('projects with problemKey also have solutionKey and resultKey', () => {
    for (const p of projects) {
      if (p.problemKey) {
        expect(p.solutionKey).toBeDefined();
        expect(p.resultKey).toBeDefined();
      }
    }
  });

  it('all liveUrl values are unique', () => {
    const urls = projects.map((p) => p.liveUrl);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
