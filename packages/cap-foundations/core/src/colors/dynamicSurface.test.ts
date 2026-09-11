import {
  generateSurfaceColors,
  generateSurfaceFromPreset,
  generateSurfaceCSS,
  generateAllSurfaceCSS,
  surfaceColorsToCSSVariables,
  injectSurfaceStyles,
  getRandomSurfaceName,
  getSurfaceClassName,
  SURFACE_PRESETS,
  SURFACE_PRESET_NAMES,
  type SurfaceColors,
  type ColorMode,
} from './dynamicSurface';

const hasDom = typeof document !== 'undefined';
const itDom = hasDom ? it : it.skip;

describe('dynamicSurface', () => {
  describe('generateSurfaceColors', () => {
    it('generates light mode colors with correct structure', () => {
      const colors = generateSurfaceColors(16, 90, 'light');

      expect(colors).toHaveProperty('bg');
      expect(colors).toHaveProperty('text');
      expect(colors).toHaveProperty('textSoft');
      expect(colors).toHaveProperty('border');
      expect(colors).toHaveProperty('icon');
    });

    it('generates dark mode colors with correct structure', () => {
      const colors = generateSurfaceColors(16, 90, 'dark');

      expect(colors).toHaveProperty('bg');
      expect(colors).toHaveProperty('text');
      expect(colors).toHaveProperty('textSoft');
      expect(colors).toHaveProperty('border');
      expect(colors).toHaveProperty('icon');
    });

    it('returns valid HSL strings', () => {
      const colors = generateSurfaceColors(200, 80, 'light');
      const hslPattern = /^hsl\(\d+,\s*\d+(\.\d+)?%,\s*\d+(\.\d+)?%\)$/;

      expect(colors.bg).toMatch(hslPattern);
      expect(colors.text).toMatch(hslPattern);
      expect(colors.textSoft).toMatch(hslPattern);
      expect(colors.border).toMatch(hslPattern);
      expect(colors.icon).toMatch(hslPattern);
    });

    it('light mode has high lightness background', () => {
      const colors = generateSurfaceColors(180, 70, 'light');
      const bgMatch = colors.bg.match(/hsl\(\d+,\s*[\d.]+%,\s*([\d.]+)%\)/);
      const lightness = bgMatch ? parseFloat(bgMatch[1]) : 0;

      expect(lightness).toBeGreaterThan(80);
    });

    it('dark mode has low lightness background', () => {
      const colors = generateSurfaceColors(180, 70, 'dark');
      const bgMatch = colors.bg.match(/hsl\(\d+,\s*[\d.]+%,\s*([\d.]+)%\)/);
      const lightness = bgMatch ? parseFloat(bgMatch[1]) : 100;

      expect(lightness).toBeLessThan(35);
    });

    it('light mode text has low lightness (dark text)', () => {
      const colors = generateSurfaceColors(180, 70, 'light');
      const textMatch = colors.text.match(/hsl\(\d+,\s*[\d.]+%,\s*([\d.]+)%\)/);
      const lightness = textMatch ? parseFloat(textMatch[1]) : 100;

      expect(lightness).toBeLessThan(30);
    });

    it('dark mode text has high lightness (light text)', () => {
      const colors = generateSurfaceColors(180, 70, 'dark');
      const textMatch = colors.text.match(/hsl\(\d+,\s*[\d.]+%,\s*([\d.]+)%\)/);
      const lightness = textMatch ? parseFloat(textMatch[1]) : 0;

      expect(lightness).toBeGreaterThan(90);
    });

    it('preserves hue across all color properties', () => {
      const hue = 250;
      const colors = generateSurfaceColors(hue, 70, 'light');

      const huePattern = /hsl\((\d+),/;
      expect(colors.bg.match(huePattern)?.[1]).toBe(String(hue));
      expect(colors.text.match(huePattern)?.[1]).toBe(String(hue));
      expect(colors.border.match(huePattern)?.[1]).toBe(String(hue));
    });

    it('caps saturation at maximum values', () => {
      const colors = generateSurfaceColors(180, 100, 'light');
      const satMatch = colors.bg.match(/hsl\(\d+,\s*([\d.]+)%/);
      const saturation = satMatch ? parseFloat(satMatch[1]) : 100;

      expect(saturation).toBeLessThanOrEqual(70);
    });
  });

  describe('generateSurfaceFromPreset', () => {
    it('generates colors for valid preset', () => {
      const colors = generateSurfaceFromPreset('coral', 'light');

      expect(colors).not.toBeNull();
      expect(colors?.bg).toBeDefined();
    });

    it('returns null for invalid preset', () => {
      const colors = generateSurfaceFromPreset('nonexistent', 'light');

      expect(colors).toBeNull();
    });

    it('generates correct hue for coral preset', () => {
      const colors = generateSurfaceFromPreset('coral', 'light');
      const hueMatch = colors?.bg.match(/hsl\((\d+),/);
      const hue = hueMatch ? parseInt(hueMatch[1]) : -1;

      expect(hue).toBe(16);
    });
  });

  describe('SURFACE_PRESETS', () => {
    it('contains 32 presets', () => {
      expect(Object.keys(SURFACE_PRESETS)).toHaveLength(32);
    });

    it('all presets have valid hue values (0-360)', () => {
      Object.entries(SURFACE_PRESETS).forEach(([name, [hue]]) => {
        expect(hue).toBeGreaterThanOrEqual(0);
        expect(hue).toBeLessThanOrEqual(360);
      });
    });

    it('all presets have valid saturation values (0-100)', () => {
      Object.entries(SURFACE_PRESETS).forEach(([name, [, saturation]]) => {
        expect(saturation).toBeGreaterThanOrEqual(0);
        expect(saturation).toBeLessThanOrEqual(100);
      });
    });

    it('SURFACE_PRESET_NAMES matches SURFACE_PRESETS keys', () => {
      expect(SURFACE_PRESET_NAMES).toEqual(Object.keys(SURFACE_PRESETS));
    });
  });

  describe('surfaceColorsToCSSVariables', () => {
    it('converts colors to standard CSS token variables', () => {
      const colors: SurfaceColors = {
        bg: 'hsl(16, 67%, 85%)',
        text: 'hsl(16, 40%, 20%)',
        textSoft: 'hsl(16, 30%, 35%)',
        border: 'hsl(16, 33%, 72%)',
        icon: 'hsl(16, 42%, 30%)',
      };

      const vars = surfaceColorsToCSSVariables(colors);

      expect(vars['--base-bg']).toBe(colors.bg);
      expect(vars['--base-fg']).toBe(colors.text);
      expect(vars['--base-fg-soft']).toBe(colors.textSoft);
      expect(vars['--base-border']).toBe(colors.border);
      expect(vars['--base-fg-primary']).toBe(colors.icon);
    });
  });

  describe('generateSurfaceCSS', () => {
    it('generates valid CSS class with standard tokens', () => {
      const css = generateSurfaceCSS('coral', 16, 90, 'light');

      expect(css).toContain('.dynamicSurface-coral');
      expect(css).toContain('--base-bg:');
      expect(css).toContain('--base-fg:');
      expect(css).toContain('background: var(--base-bg)');
    });

    it('uses custom class prefix', () => {
      const css = generateSurfaceCSS('coral', 16, 90, 'light', 'custom');

      expect(css).toContain('.custom-coral');
      expect(css).not.toContain('.dynamicSurface-coral');
    });
  });

  describe('generateAllSurfaceCSS', () => {
    it('includes all preset surfaces', () => {
      const css = generateAllSurfaceCSS();

      SURFACE_PRESET_NAMES.forEach((name) => {
        expect(css).toContain(`.dynamicSurface-${name}`);
      });
    });

    it('includes light mode comment', () => {
      const css = generateAllSurfaceCSS();

      expect(css).toContain('Light Mode');
    });

    it('includes dark mode with selector', () => {
      const css = generateAllSurfaceCSS('dynamicSurface', '[data-mode="dark"]');

      expect(css).toContain('[data-mode="dark"]');
      expect(css).toContain('Dark Mode');
    });

    it('uses custom dark mode selector', () => {
      const css = generateAllSurfaceCSS('dynamicSurface', '.dark-theme');

      expect(css).toContain('.dark-theme .dynamicSurface-');
    });
  });

  describe('injectSurfaceStyles', () => {
    beforeEach(() => {
      if (!hasDom) return;
      const existing = document.getElementById('dynamic-surface-styles');
      if (existing) existing.remove();
    });

    afterEach(() => {
      if (!hasDom) return;
      const existing = document.getElementById('dynamic-surface-styles');
      if (existing) existing.remove();
    });

    it('does nothing when document is undefined', () => {
      expect(() => injectSurfaceStyles()).not.toThrow();
    });

    itDom('injects style element into document head', () => {
      injectSurfaceStyles();

      const style = document.getElementById('dynamic-surface-styles');
      expect(style).not.toBeNull();
      expect(style?.tagName).toBe('STYLE');
    });

    itDom('replaces existing style element', () => {
      injectSurfaceStyles();
      injectSurfaceStyles();

      const styles = document.querySelectorAll('#dynamic-surface-styles');
      expect(styles).toHaveLength(1);
    });

    itDom('uses custom style ID', () => {
      injectSurfaceStyles({ styleId: 'custom-styles' });

      const style = document.getElementById('custom-styles');
      expect(style).not.toBeNull();

      style?.remove();
    });

    itDom('includes all preset classes in injected CSS', () => {
      injectSurfaceStyles();

      const style = document.getElementById('dynamic-surface-styles');
      const css = style?.textContent || '';

      expect(css).toContain('.dynamicSurface-coral');
      expect(css).toContain('.dynamicSurface-sky');
    });
  });

  describe('getRandomSurfaceName', () => {
    it('returns a valid preset name', () => {
      const name = getRandomSurfaceName();

      expect(SURFACE_PRESET_NAMES).toContain(name);
    });

    it('returns different values over multiple calls (probabilistic)', () => {
      const names = new Set<string>();

      for (let i = 0; i < 100; i++) {
        names.add(getRandomSurfaceName());
      }

      expect(names.size).toBeGreaterThan(1);
    });
  });

  describe('getSurfaceClassName', () => {
    it('returns correct class name with default prefix', () => {
      expect(getSurfaceClassName('coral')).toBe('dynamicSurface-coral');
    });

    it('uses custom prefix', () => {
      expect(getSurfaceClassName('coral', 'custom')).toBe('custom-coral');
    });
  });
});
