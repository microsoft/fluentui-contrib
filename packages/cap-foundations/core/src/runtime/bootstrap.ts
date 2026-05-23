/* eslint-disable no-restricted-globals */
/**
 * Cap-Foundations Bootstrap
 *
 * A self-contained script that applies the active theme with zero-flash:
 * 1. Reads localStorage for persisted theme/mode preferences
 * 2. Sets background color immediately to prevent flash before CSS loads
 * 3. Loads theme CSS files on demand (not all upfront)
 * 4. Exposes window.CapFoundations API for runtime theme changes
 *
 * Usage (inline in index.html for zero-flash):
 * <script>
 *   window.CapFoundationsConfig = { basePath: '/themes' };
 * </script>
 * <script src="/node_modules/@fluentui-contrib/cap-foundations-core/dist/bootstrap.js"></script>
 *
 * Or import in JS (may cause brief flash on first load):
 * import '@fluentui-contrib/cap-foundations-core/bootstrap';
 *
 * API:
 * - CapFoundations.setTheme(theme, mode, callback) — change active theme
 * - CapFoundations.getTheme() — returns { theme, mode, resolvedMode }
 * - CapFoundations.subscribe(callback) — subscribe to theme changes, returns unsubscribe fn
 * - CapFoundations.configure(config) — reconfigure base path and defaults
 *
 * SSR note: all browser API calls are guarded with typeof checks so this
 * module is safe to import in Node.js / server-side environments.
 */

// Types
export interface CapFoundationsConfig {
  /** Base path to theme CSS files (e.g., '/themes' or 'https://cdn.example.com/themes') */
  basePath?: string;
  /** Default theme name */
  defaultTheme?: string;
  /** Default mode: 'light', 'dark', or 'auto' */
  defaultMode?: 'light' | 'dark' | 'auto';
  /** Default background colors for immediate flash prevention */
  defaultBg?: { light: string; dark: string };
}

export interface CapFoundationsThemeState {
  theme: string;
  mode: 'light' | 'dark' | 'auto';
  resolvedMode: 'light' | 'dark';
}

export type ThemeCallback = (state: CapFoundationsThemeState) => void;

export interface CapFoundationsAPI {
  /** Set theme and/or mode. Loads CSS on demand and calls back when ready. */
  setTheme: (theme: string, mode?: 'light' | 'dark' | 'auto', callback?: ThemeCallback) => void;
  /** Get current theme state */
  getTheme: () => CapFoundationsThemeState;
  /** Subscribe to theme changes. Returns unsubscribe function. */
  subscribe: (callback: ThemeCallback) => () => void;
  /** Reconfigure CapFoundations (e.g., change basePath) */
  configure: (config: CapFoundationsConfig) => void;
}

// Storage key
const STORAGE_KEY = 'cap-foundations-theme';

// State
let config: Required<CapFoundationsConfig> = {
  basePath: '/themes',
  defaultTheme: 'default',
  defaultMode: 'auto',
  defaultBg: { light: '#fafafa', dark: '#0f0f0f' },
};

let currentState: CapFoundationsThemeState = {
  theme: 'default',
  mode: 'auto',
  resolvedMode: 'light',
};

const loadedCSS = new Map<string, unknown>();
const subscribers = new Set<ThemeCallback>();

/**
 * Resolve 'auto' mode to actual light/dark based on system preference.
 * SSR-safe: returns 'light' when window is unavailable.
 */
function resolveMode(mode: 'light' | 'dark' | 'auto'): 'light' | 'dark' {
  if (mode !== 'auto') return mode;
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Get stored theme settings from localStorage.
 * SSR-safe: returns null when localStorage is unavailable.
 */
function getStoredSettings(): { theme?: string; mode?: 'light' | 'dark' | 'auto'; bg?: { light?: string; dark?: string } } | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Save theme settings to localStorage.
 * SSR-safe: no-op when localStorage is unavailable.
 */
function saveSettings(state: CapFoundationsThemeState, bgColor?: string): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const existing = getStoredSettings() || {};
    const bg = existing.bg || {};
    if (bgColor) {
      bg[state.resolvedMode] = bgColor;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      theme: state.theme,
      mode: state.mode,
      bg,
    }));
  } catch {
    // Storage quota exceeded or restricted — silently skip
  }
}

/**
 * Load a theme CSS file by creating a <link> element.
 * SSR-safe: no-op when document is unavailable.
 */
function loadThemeCSS(theme: string, mode: 'light' | 'dark', callback?: () => void): void {
  if (typeof document === 'undefined') {
    callback?.();
    return;
  }

  const key = `${theme}-${mode}`;

  // Already loaded
  if (loadedCSS.has(key)) {
    callback?.();
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${config.basePath}/${key}.css`;
  link.id = `cap-foundations-theme-${key}`;

  link.onload = () => {
    loadedCSS.set(key, link);
    callback?.();
  };

  link.onerror = () => {
    console.error(`[CapFoundations] Failed to load theme: ${link.href}`);
    callback?.();
  };

  document.head.appendChild(link);
}

/**
 * Apply theme state to DOM by setting data attributes on <html>.
 * SSR-safe: no-op when document is unavailable.
 */
function applyToDOM(state: CapFoundationsThemeState): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.dataset.mode = state.resolvedMode;
}

/**
 * Notify all subscribers of a state change.
 */
function notifySubscribers(): void {
  const stateCopy = { ...currentState };
  subscribers.forEach(cb => cb(stateCopy));
}

/**
 * Set theme with CSS loading and optional callback.
 */
function setTheme(theme: string, mode?: 'light' | 'dark' | 'auto', callback?: ThemeCallback): void {
  const newMode = mode ?? currentState.mode;
  const resolvedMode = resolveMode(newMode);

  const newState: CapFoundationsThemeState = {
    theme,
    mode: newMode,
    resolvedMode,
  };

  loadThemeCSS(theme, resolvedMode, () => {
    currentState = newState;
    applyToDOM(currentState);

    // Save background color for flash prevention on next page load
    if (typeof document !== 'undefined' && typeof getComputedStyle !== 'undefined') {
      const computedBg = getComputedStyle(document.documentElement).getPropertyValue('--base-bg').trim();
      saveSettings(currentState, computedBg || undefined);
    } else {
      saveSettings(currentState);
    }

    notifySubscribers();
    callback?.(currentState);
  });
}

/**
 * Get current theme state.
 */
function getTheme(): CapFoundationsThemeState {
  return { ...currentState };
}

/**
 * Subscribe to theme changes. Returns an unsubscribe function.
 */
function subscribe(callback: ThemeCallback): () => void {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

/**
 * Reconfigure bootstrap options.
 */
function configure(newConfig: CapFoundationsConfig): void {
  config = { ...config, ...newConfig };
}

/**
 * Initialize bootstrap — called automatically when this module is imported
 * in a browser environment. Safe no-op in Node.js or SSR.
 */
function init(): void {
  if (typeof window === 'undefined') return;

  // Apply user config if provided via global variable
  const userConfig = (window as unknown as { CapFoundationsConfig?: CapFoundationsConfig }).CapFoundationsConfig;
  if (userConfig) {
    configure(userConfig);
  }

  // Auto-detect basePath from script src if not explicitly configured
  if (!userConfig?.basePath && typeof document !== 'undefined') {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (src && src.includes('bootstrap')) {
        const match = src.match(/(.*)\/bootstrap/);
        if (match) {
          config.basePath = `${match[1]}/themes`;
        }
        break;
      }
    }
  }

  // Restore persisted settings
  const stored = getStoredSettings();

  let theme = stored?.theme ?? config.defaultTheme;
  const mode: 'light' | 'dark' | 'auto' = stored?.mode ?? config.defaultMode;

  // Respect high-contrast OS preference when no stored setting
  if (!stored && window.matchMedia('(prefers-contrast: more)').matches) {
    theme = 'high-contrast';
  }

  const resolvedMode = resolveMode(mode);

  // Set background color IMMEDIATELY (before CSS loads) to prevent flash
  if (typeof document !== 'undefined') {
    const bgColor = stored?.bg?.[resolvedMode] ?? config.defaultBg[resolvedMode];
    document.documentElement.style.backgroundColor = bgColor;
  }

  // Apply data attributes immediately so CSS selectors activate without waiting for onload
  currentState = { theme, mode, resolvedMode };
  applyToDOM(currentState);

  // Load the active theme CSS file
  loadThemeCSS(theme, resolvedMode);

  // Mirror OS-level dark/light changes when mode is 'auto'
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (currentState.mode === 'auto') {
      const newResolvedMode = resolveMode('auto');
      if (newResolvedMode !== currentState.resolvedMode) {
        setTheme(currentState.theme, 'auto');
      }
    }
  });
}

// Check if an inline bootstrap already ran (embedded in <head> HTML)
const existingAPI = typeof window !== 'undefined'
  ? (window as unknown as { CapFoundations?: CapFoundationsAPI }).CapFoundations
  : undefined;

if (existingAPI) {
  // Sync state from the inline bootstrap rather than re-initializing
  const existingState = existingAPI.getTheme();
  currentState = { ...existingState };

  existingAPI.subscribe((state) => {
    currentState = { ...state };
    notifySubscribers();
  });
} else {
  init();
}

// Build the public API object
const CapFoundations: CapFoundationsAPI = existingAPI ?? {
  setTheme,
  getTheme,
  subscribe,
  configure,
};

// Expose globally — safe no-op in Node.js
if (typeof window !== 'undefined' && !existingAPI) {
  (window as unknown as { CapFoundations: CapFoundationsAPI }).CapFoundations = CapFoundations;
}

// Named exports for module usage
export { CapFoundations, setTheme, getTheme, subscribe, configure };
export default CapFoundations;

// Re-export inline bootstrap generators (Node-safe, no browser APIs)
export { getInlineBootstrap, getInlineBootstrapPretty, getFallbackCSS, getBootstrapScript } from '../build/inline-bootstrap';
