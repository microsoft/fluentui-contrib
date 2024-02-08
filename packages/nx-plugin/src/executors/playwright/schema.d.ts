import { PlaywrightExecutorSchema as NxPlaywrightExecutorSchema } from '@nx/playwright';

export interface PlaywrightExecutorSchema extends NxPlaywrightExecutorSchema {
  /**
   * @default 'component'
   */
  testingType: 'component' | 'e2e';
}
