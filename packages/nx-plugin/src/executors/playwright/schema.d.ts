import { PlaywrightExecutorSchema as NxPlaywrightExecutorSchema } from '@nx/playwright';

export interface PlaywrightExecutorSchema extends NxPlaywrightExecutorSchema {
  /**
   * @default 'component'
   */
  testingType: 'component' | 'e2e';

  // ============ BELOW API COPIED FROM https://github.com/nrwl/nx/blob/master/packages/playwright/src/executors/playwright/playwright.impl.ts ============

  browser?: 'all' | 'chromium' | 'firefox' | 'webkit' | string;
  config?: string;
  debug?: boolean;
  forbidOnly?: boolean;
  fullyParallel?: boolean;
  grep?: string;
  globalTimeout?: number;
  grepInvert?: string;
  testFiles?: string[];
  headed?: boolean;
  ignoreSnapshots?: boolean;
  workers?: string;
  list?: boolean;
  maxFailures?: number | boolean;
  noDeps?: boolean;
  output?: string;
  passWithNoTests?: boolean;
  project?: string[];
  quiet?: boolean;
  repeatEach?: number;
  reporter?:
    | 'list'
    | 'line'
    | 'dot'
    | 'json'
    | 'junit'
    | 'null'
    | 'github'
    | 'html'
    | 'blob';
  retries?: number;
  shard?: string;
  timeout?: number;
  trace?:
    | 'on'
    | 'off'
    | 'on-first-retry'
    | 'on-all-retries'
    | 'retain-on-failure';
  updateSnapshots?: boolean;
  ui?: boolean;
  uiHost?: string;
  uiPort?: number;
  skipInstall?: boolean;
}
