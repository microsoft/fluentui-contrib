import * as path from 'path';
import * as fs from 'fs/promises';
import { analyzeProjectStyles } from '../index.js';

describe('e2e test', () => {
  let tempDir: string;
  let targetPath: string;

  beforeAll(async () => {
    // Create temp directory for test files
    tempDir = path.join(process.cwd(), 'src', '__tests__', 'test-files');
    await fs.mkdir(tempDir, { recursive: true });
    targetPath = path.join(
      process.cwd(),
      'src',
      '__tests__',
      'test-files',
      'analysis.json'
    );
  });

  afterAll(async () => {
    // Clean up temp files
    await fs.rm(targetPath, { recursive: true, force: true });
  });
  test('analyze test button styles', async () => {
    await analyzeProjectStyles(tempDir, targetPath);
  }, 10000);
});
