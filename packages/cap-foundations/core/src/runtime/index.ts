/**
 * Runtime exports
 *
 * The bootstrap module provides all runtime theme functionality:
 * - CapFoundations.setTheme(theme, mode, callback) — change active theme with on-demand CSS loading
 * - CapFoundations.getTheme() — get current theme state
 * - CapFoundations.subscribe(callback) — subscribe to theme changes
 * - CapFoundations.configure(config) — configure base path and defaults
 *
 * Also exports inline bootstrap generators (Node-safe) for embedding in HTML:
 * - getInlineBootstrap(options) — returns <style>+<script> HTML string (minified)
 * - getInlineBootstrapPretty(options) — same, unminified for debugging
 * - getFallbackCSS(options) — returns just the fallback CSS string
 * - getBootstrapScript(options) — returns just the bootstrap JS string
 */
export * from './bootstrap';
