import * as path from 'path';
import * as fs from 'fs/promises';
import { analyzeProjectStyles } from '../index.js';

describe('e2e test', () => {
  let tempDir: string;
  let targetPath: string;
  let analysis: any;
  let styles: any;

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

    await analyzeProjectStyles(tempDir, targetPath);
    await fs
      .readFile(path.join(tempDir, 'analysis.json'), 'utf-8')
      .then((analysisData) => {
        // Parse the JSON data from our analysis and start validating it
        analysis = JSON.parse(analysisData);
      });

    styles = analysis['useButtonStyles.styles.ts'].styles;
  });

  afterAll(async () => {
    // Clean up temp files
    // await fs.rm(targetPath, { recursive: true, force: true });
  });

  test('validate basic structure', () => {
    // Validate the structure of the analysis object
    expect(analysis).toHaveProperty(['useButtonStyles.styles.ts']);

    // Validate that we process a makeResetStyles function useRootBaseClassName
    expect(styles).toHaveProperty('useRootBaseClassName');
  });

  describe('validate makeResetStyles tokens', () => {
    // Define token cases for makeResetStyles tests
    const resetStyleTokenCases = [
      ['backgroundColor', 'tokens.colorNeutralBackground1Hover'],
      ['borderColor', 'tokens.colorNeutralStroke1Hover'],
      ['color', 'tokens.colorNeutralForeground1Hover'],
    ];
    test.each(resetStyleTokenCases)(
      '%s token is properly configured',
      (propertyName, expectedToken) => {
        const hoverMakeResetTokens =
          styles.useRootBaseClassName.resetStyles.nested["':hover'"].tokens;
        const token = hoverMakeResetTokens.find(
          (t: any) => t.property === propertyName
        );
        expect(token).toBeDefined();
        expect(token.token).toBe(expectedToken);
      }
    );
  });
});
