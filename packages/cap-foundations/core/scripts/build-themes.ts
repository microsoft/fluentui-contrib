/**
 * Build theme CSS files from JSON definitions
 *
 * This script reads theme definitions from JSON files in src/themes/definitions/
 * and generates CSS files using the data-driven generator.
 *
 * Run via: yarn ts-node --project tsconfig.scripts.json scripts/build-themes.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateThemeCSS, validateTheme } from '../src/themes/generator';
import type { ThemeDefinition } from '../src/themes/types';

const srcDir = path.resolve(__dirname, '..', 'src');
const distDir = path.resolve(__dirname, '..', 'dist');
const themesDir = path.resolve(distDir, 'themes');
const definitionsDir = path.resolve(srcDir, 'themes', 'definitions');

// Ensure themes directory exists
if (!fs.existsSync(themesDir)) {
  fs.mkdirSync(themesDir, { recursive: true });
}

console.log('Generating theme CSS files from JSON definitions...');
console.log(`Reading from: ${definitionsDir}`);
console.log(`Writing to: ${themesDir}`);
console.log('');

// Load all theme JSON files
const themeFiles = fs.readdirSync(definitionsDir).filter(f => f.endsWith('.json'));

if (themeFiles.length === 0) {
  console.error('No theme JSON files found in', definitionsDir);
  process.exit(1);
}

const themes: ThemeDefinition[] = [];
const errors: string[] = [];

for (const file of themeFiles) {
  const filePath = path.join(definitionsDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const theme = JSON.parse(content);

    if (validateTheme(theme)) {
      themes.push(theme);
      console.log(`  ✓ Loaded ${file} (${theme.name})`);
    } else {
      errors.push(`  ✗ Invalid theme schema in ${file}`);
    }
  } catch (err) {
    errors.push(`  ✗ Failed to parse ${file}: ${err instanceof Error ? err.message : err}`);
  }
}

if (errors.length > 0) {
  console.log('\nErrors:');
  errors.forEach(e => console.error(e));
}

if (themes.length === 0) {
  console.error('\nNo valid themes found!');
  process.exit(1);
}

console.log(`\nGenerating CSS for ${themes.length} themes...`);

const manifest: Array<{
  id: string;
  name: string;
  description?: string;
  accessibility?: string;
  files: { light: string; dark: string };
}> = [];

for (const theme of themes) {
  console.log(`  Generating ${theme.name}...`);

  // Generate light mode
  const lightCSS = generateThemeCSS(theme, 'light');
  const lightPath = path.resolve(themesDir, `${theme.id}-light.css`);
  fs.writeFileSync(lightPath, lightCSS, 'utf-8');

  // Generate dark mode
  const darkCSS = generateThemeCSS(theme, 'dark');
  const darkPath = path.resolve(themesDir, `${theme.id}-dark.css`);
  fs.writeFileSync(darkPath, darkCSS, 'utf-8');

  manifest.push({
    id: theme.id,
    name: theme.name,
    description: theme.description,
    accessibility: theme.accessibility?.level,
    files: {
      light: `${theme.id}-light.css`,
      dark: `${theme.id}-dark.css`,
    },
  });
}

// Sort manifest alphabetically by name, but keep 'default' first
manifest.sort((a, b) => {
  if (a.id === 'default') return -1;
  if (b.id === 'default') return 1;
  return a.name.localeCompare(b.name);
});

// Write manifest
const manifestPath = path.resolve(themesDir, 'manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

console.log('');
console.log(`✓ Generated ${themes.length * 2} theme CSS files`);
console.log(`✓ Generated manifest.json with ${manifest.length} themes`);
console.log('');
console.log('Available themes:');
manifest.forEach(t => console.log(`  - ${t.name} (${t.id})`));
