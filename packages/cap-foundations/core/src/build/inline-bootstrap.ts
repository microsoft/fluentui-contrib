/**
 * Cap-Foundations Inline Bootstrap Generator
 *
 * Generates inline HTML (CSS + JS) for zero-flash theme loading.
 * This module is Node-safe — no browser APIs used anywhere.
 *
 * Embed the result in your HTML <head> to ensure the correct theme
 * background color is applied before any CSS loads.
 */

export interface InlineBootstrapOptions {
  /** Base path to theme CSS files (default: '/themes') */
  basePath?: string;
  /** Default theme name (default: 'default') */
  defaultTheme?: string;
  /** Default colors for flash prevention (shown before theme CSS loads) */
  defaultColors?: {
    light: { baseBg: string; baseFg: string };
    dark: { baseBg: string; baseFg: string };
  };
}

const DEFAULT_COLORS = {
  light: { baseBg: '#fafafa', baseFg: '#171717' },
  dark: { baseBg: '#0f0f0f', baseFg: '#e5e5e5' },
};

/**
 * Generate fallback CSS that defines critical CSS variables before
 * the theme stylesheet loads. Prevents flashes of unstyled content.
 */
function generateFallbackCSS(colors = DEFAULT_COLORS): string {
  return (
    `:root{--base-bg:${colors.light.baseBg};--base-fg:${colors.light.baseFg}}` +
    `@media(prefers-color-scheme:dark){:root{--base-bg:${colors.dark.baseBg};--base-fg:${colors.dark.baseFg}}}`
  );
}

/**
 * Generate the inline bootstrap script source. Handles:
 * - Reading persisted theme/mode from localStorage
 * - Setting data-theme / data-mode on <html> immediately
 * - Loading the appropriate theme CSS on demand
 * - Exposing the window.CapFoundations runtime API
 */
function generateBootstrapScript(options: InlineBootstrapOptions = {}): string {
  const {
    basePath = '/themes',
    defaultTheme = 'default',
    defaultColors = DEFAULT_COLORS,
  } = options;

  return `(function(){
var STORAGE='cap-foundations-theme',CACHE='cap-foundations-css-cache';
var d=document.documentElement,s,c,m,r,k;
try{s=JSON.parse(localStorage.getItem(STORAGE))}catch(e){}
try{c=JSON.parse(localStorage.getItem(CACHE))}catch(e){}
m=(s&&s.mode)||'auto';
r=m==='auto'?(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'):m;
var th=(s&&s.theme)||'${defaultTheme}';
if(!s&&matchMedia('(prefers-contrast:more)').matches)th='high-contrast';
k=th+'-'+r;
d.dataset.theme=th;
d.dataset.mode=r;

// Inject cached CSS immediately if available (zero flash on repeat visits)
var fb=document.getElementById('cap-foundations-fallback');
if(c&&c[k]){
  var style=document.createElement('style');
  style.id='cap-foundations-cached-'+k;
  style.textContent=c[k];
  document.head.appendChild(style);
  if(fb)fb.remove();
}

// Track state
var theme=th,mode=m,resolvedMode=r;
var loadedCSS=new Map();
var subscribers=new Set();

// Load CSS file and cache it in localStorage for future visits
function loadCSS(th,md,cb){
  var key=th+'-'+md;
  if(loadedCSS.has(key)){if(cb)cb();return}
  var link=document.createElement('link');
  link.rel='stylesheet';
  link.href='${basePath}/'+key+'.css';
  link.id='cap-foundations-theme-'+key;
  link.onload=function(){
    loadedCSS.set(key,link);
    var fb=document.getElementById('cap-foundations-fallback');
    if(fb)fb.remove();
    fetch(link.href).then(function(r){return r.text()}).then(function(css){
      try{
        var cache=JSON.parse(localStorage.getItem(CACHE)||'{}');
        cache[key]=css;
        localStorage.setItem(CACHE,JSON.stringify(cache));
      }catch(e){}
    });
    if(cb)cb();
  };
  document.head.appendChild(link);
}

// Load initial theme CSS
loadCSS(theme,resolvedMode);

// Runtime API
window.CapFoundations={
  setTheme:function(newTheme,newMode,callback){
    newMode=newMode||mode;
    var newResolved=newMode==='auto'?(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'):newMode;
    loadCSS(newTheme,newResolved,function(){
      theme=newTheme;mode=newMode;resolvedMode=newResolved;
      d.dataset.theme=theme;d.dataset.mode=resolvedMode;
      try{
        var obj=JSON.parse(localStorage.getItem(STORAGE)||'{}');
        obj.theme=theme;obj.mode=mode;
        localStorage.setItem(STORAGE,JSON.stringify(obj));
      }catch(e){}
      var state={theme:theme,mode:mode,resolvedMode:resolvedMode};
      subscribers.forEach(function(cb){cb(state)});
      if(callback)callback(state);
    });
  },
  getTheme:function(){return{theme:theme,mode:mode,resolvedMode:resolvedMode}},
  subscribe:function(cb){subscribers.add(cb);return function(){subscribers.delete(cb)}},
  configure:function(cfg){if(cfg.basePath)'${basePath}'=cfg.basePath}
};

// Mirror OS-level dark/light preference when mode is 'auto'
matchMedia('(prefers-color-scheme:dark)').addEventListener('change',function(){
  if(mode==='auto')window.CapFoundations.setTheme(theme,'auto');
});
var bg=(s&&s.bg&&s.bg[r])||(r==='dark'?'${defaultColors.dark.baseBg}':'${defaultColors.light.baseBg}');
d.style.backgroundColor=bg;
})();`;
}

/**
 * Simple minification: strips comments and collapses whitespace.
 */
function minify(code: string): string {
  return code
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}();,:])\s*/g, '$1')
    .replace(/\s*=\s*(?!=)/g, '=')
    .replace(/\s*(===?|!==?|[<>]=?|\|\||&&)\s*/g, '$1')
    .trim();
}

/**
 * Generate the complete inline bootstrap HTML (CSS + JS) for embedding
 * at the top of your HTML <head>. Output is minified.
 *
 * @example
 * ```html
 * <head>
 *   <!-- Paste this FIRST, before any stylesheets -->
 *   <style id="cap-foundations-fallback">…</style>
 *   <script>…</script>
 * </head>
 * ```
 */
export function getInlineBootstrap(options: InlineBootstrapOptions = {}): string {
  const css = generateFallbackCSS(options.defaultColors);
  const js = minify(generateBootstrapScript(options));
  return `<style id="cap-foundations-fallback">${css}</style><script>${js}</script>`;
}

/**
 * Generate formatted (non-minified) bootstrap HTML for debugging.
 */
export function getInlineBootstrapPretty(options: InlineBootstrapOptions = {}): string {
  const css = generateFallbackCSS(options.defaultColors);
  const js = generateBootstrapScript(options);
  return `<style id="cap-foundations-fallback">\n${css}\n</style>\n<script>\n${js}\n</script>`;
}

/**
 * Get just the fallback CSS string (for static HTML templates).
 */
export function getFallbackCSS(options?: { colors?: typeof DEFAULT_COLORS }): string {
  return generateFallbackCSS(options?.colors);
}

/**
 * Get just the minified bootstrap script string (without the wrapping <script> tag).
 */
export function getBootstrapScript(options: InlineBootstrapOptions = {}): string {
  return minify(generateBootstrapScript(options));
}
