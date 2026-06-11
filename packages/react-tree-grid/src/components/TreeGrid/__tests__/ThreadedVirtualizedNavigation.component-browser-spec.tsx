import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { ThreadedVirtualizedNavigationFixture } from './fixtures/ThreadedVirtualizedNavigation.fixture';

test.use({ viewport: { width: 1400, height: 1000 } });

test.describe('Threaded virtualized navigation', () => {
  test('ArrowUp and ArrowDown move between mounted headers', async ({
    mount,
    page,
  }) => {
    const component = await mount(<ThreadedVirtualizedNavigationFixture />);
    const firstHeader = component.locator('[data-item-id="thread-401"]');
    const secondHeader = component.locator('[data-item-id="thread-402"]');

    await expect(firstHeader).toBeVisible();
    await expect(secondHeader).toBeVisible();

    await firstHeader.focus();
    await expect(firstHeader).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(secondHeader).toBeFocused();

    await secondHeader.focus();
    await expect(secondHeader).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(firstHeader).toBeFocused();
  });

  test('ArrowDown handles an off-DOM header target', async ({
    mount,
    browserName,
    page,
  }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'webkit',
      'WebKit component tests do not reliably drive this virtualized Arrow navigation path.'
    );

    const component = await mount(<ThreadedVirtualizedNavigationFixture />);
    const secondHeader = component.locator('[data-item-id="thread-402"]');
    const thirdHeader = component.locator('[data-item-id="thread-403"]');

    await expect(thirdHeader).toHaveCount(0);
    await secondHeader.focus();
    await expect(secondHeader).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(thirdHeader).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(secondHeader).toBeFocused();
  });
});
