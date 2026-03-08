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
});
