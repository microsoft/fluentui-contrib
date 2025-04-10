import * as path from 'path';
import * as fs from 'fs/promises';
import { analyzeProjectStyles } from '../index.js';

describe('e2e test', () => {
  let tempDir: string;
  let targetPath: string;
  let analysis: any;
  let styles: any;

  // generate our analysis file before all our tests run. Additionally, we set a long timeout
  // to ensure that we have enough time to run the analysis.
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
  }, 100000);

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

  /**
   * Factory function that outputs a function we can test against. This defines the token test params
   * that we will reuse across our tests. Note that this function must be called within the test.each() function
   * to ensure that the test context is properly set up.
   * @param tokenArray an array of tokens to pass into our factory
   * @returns a function we will call within test.each()
   */
  const tokenTestFactory = (tokenArray: any) => {
    return (propertyName: string, expectedToken: string) => {
      const token = tokenArray.some(
        (t: any) => t.property === propertyName && t.token === expectedToken
      );
      expect(token).toBeTruthy();
    };
  };

  /**
   * Reusable function to check tokens vs a known set
   * @param tokenArray the token array to test. Must be in the form of a function due to the lifecycle of Jest
   * @param testArray the known set of tokens are we looking for
   */
  const checkTokens = (tokenArray: () => any[], testArray: any[]) => {
    test.each(testArray)(
      '%s token is properly configured',
      (propertyName, expectedToken) => {
        tokenTestFactory(tokenArray())(propertyName, expectedToken);
      }
    );

    // Check if the length of the token array matches the expected length
    test(`token array length should be ${testArray.length}`, () => {
      expect(tokenArray().length).toBe(testArray.length);
    });
  };

  describe('validate makeResetStyles tokens', () => {
    // Define token cases for hover makeResetStyles tests
    checkTokens(
      () => styles.useRootBaseClassName.resetStyles.nested["':hover'"].tokens,
      [
        ['backgroundColor', 'tokens.colorNeutralBackground1Hover'],
        ['borderColor', 'tokens.colorNeutralStroke1Hover'],
        ['color', 'tokens.colorNeutralForeground1Hover'],
      ]
    );

    // Define token cases for active hover makeResetStyles tests
    checkTokens(
      () =>
        styles.useRootBaseClassName.resetStyles.nested["':hover:active'"]
          .tokens,
      [
        ['backgroundColor', 'tokens.colorNeutralBackground1Pressed'],
        ['borderColor', 'tokens.colorNeutralStroke1Pressed'],
        ['color', 'tokens.colorNeutralForeground1Pressed'],
      ]
    );

    // base makeResetStyles tests
    checkTokens(
      () => styles.useRootBaseClassName.resetStyles.tokens,
      [
        ['backgroundColor', 'tokens.colorNeutralBackground1'],
        ['color', 'tokens.colorNeutralForeground1'],
        ['border', 'tokens.strokeWidthThin'],
        ['border', 'tokens.colorNeutralStroke1'],
        ['fontFamily', 'tokens.fontFamilyBase'],
        ['padding', 'tokens.spacingHorizontalM'],
        ['borderRadius', 'tokens.borderRadiusMedium'],
        ['fontSize', 'tokens.fontSizeBase300'],
        ['fontWeight', 'tokens.fontWeightSemibold'],
        ['lineHeight', 'tokens.lineHeightBase300'],
        ['transitionDuration', 'tokens.durationFaster'],
        ['transitionTimingFunction', 'tokens.curveEasyEase'],
      ]
    );

    // Token cases for makeResetStyles focus
    checkTokens(
      () => styles.useRootBaseClassName.resetStyles.nested[':focus'].tokens,
      [
        ['borderColor', 'tokens.colorStrokeFocus2'],
        ['borderRadius', 'tokens.borderRadiusMedium'],
        ['outline', 'tokens.strokeWidthThick'],
        ['outline', 'tokens.strokeWidthThick'],
        ['boxShadow', 'tokens.strokeWidthThin'],
        ['boxShadow', 'tokens.colorStrokeFocus2'],
      ]
    );

    // Token cases for makeResetStyles mozilla bug
    checkTokens(
      () =>
        styles.useRootBaseClassName.resetStyles.nested[
          "'@supports (-moz-appearance:button)'"
        ].nested[':focus'].tokens,
      [
        ['boxShadow', 'tokens.colorStrokeFocus2'],
        ['boxShadow', 'tokens.strokeWidthThin'],
      ]
    );
  });

  describe('validate makeStyles tokens', () => {
    checkTokens(
      () => styles.useRootStyles.outline.tokens,
      [['backgroundColor', 'tokens.colorTransparentBackground']]
    );
  });
});
