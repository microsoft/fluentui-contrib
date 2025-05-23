import * as path from 'path';
import * as fs from 'fs';

export function findTsConfigPath(startDir = __dirname): string | null {
  let currentDir = startDir;
  const root = path.parse(currentDir).root;

  while (currentDir !== root) {
    const tsConfigPath = path.join(currentDir, 'tsconfig.json');
    if (fs.existsSync(tsConfigPath)) {
      return tsConfigPath;
    }
    // Move up to parent directory
    currentDir = path.dirname(currentDir);
  }

  // Check root directory as well
  const rootTsConfigPath = path.join(root, 'tsconfig.json');
  return fs.existsSync(rootTsConfigPath) ? rootTsConfigPath : null;
}
