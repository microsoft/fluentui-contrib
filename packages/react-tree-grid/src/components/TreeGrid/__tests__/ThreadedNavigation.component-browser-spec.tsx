import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { ThreadedNavigationFixture } from './fixtures/ThreadedNavigation.fixture';

test.use({ viewport: { width: 1400, height: 1000 } });

test.describe('Threaded navigation', () => {
  test('ArrowDown and ArrowUp move between headers', async ({
    mount,
    page,
  }) => {
    const component = await mount(<ThreadedNavigationFixture />);
    const firstHeader = component.locator('[data-item-id="thread-401"]');
    const secondHeader = component.locator('[data-item-id="thread-402"]');

    await firstHeader.focus();
    await expect(firstHeader).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(secondHeader).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(firstHeader).toBeFocused();
  });
});
