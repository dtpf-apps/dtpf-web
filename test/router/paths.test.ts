import { paths, projectDetailPath } from '../../src/router/paths';

describe('paths', () => {
  it('defines all required route paths', () => {
    expect(paths.home).toBe('/');
    expect(paths.projects).toBe('/projects');
    expect(paths.projectDetail).toBe('/projects/:slug');
    expect(paths.about).toBe('/about');
    expect(paths.contact).toBe('/contact');
    expect(paths.privacyPolicy).toBe('/privacy-policy');
  });

  it('paths object is frozen (readonly)', () => {
    // Ensure all values are strings
    for (const value of Object.values(paths)) {
      expect(typeof value).toBe('string');
    }
  });
});

describe('projectDetailPath', () => {
  it('builds correct path from slug', () => {
    expect(projectDetailPath('dauth')).toBe('/projects/dauth');
    expect(projectDetailPath('dstash')).toBe('/projects/dstash');
    expect(projectDetailPath('audity')).toBe('/projects/audity');
  });

  it('handles slugs with special characters', () => {
    expect(projectDetailPath('my-project')).toBe('/projects/my-project');
  });
});
