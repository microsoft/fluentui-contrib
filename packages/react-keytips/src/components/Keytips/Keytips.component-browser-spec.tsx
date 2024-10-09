import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import {
  KeytipsBasicExample,
  KeytipsTabsExample,
  KeytipsOverflowMenuExample,
  KeytipsDynamicExample,
} from './KeytipsExamples.component-browser-spec';

test.use({ viewport: { width: 500, height: 500 } });

test.describe('enter and exit from keytip mode interactions', () => {
  test('should enter and exit keytip mode', async ({ mount, page }) => {
    const component = await mount(<KeytipsBasicExample />);
    const tooltip = page.getByRole('tooltip');
    await expect(tooltip).toBeHidden();
    await component.press('Alt+Meta');
    await expect(tooltip).toBeVisible();
    await component.press('Alt+Escape');
    await expect(tooltip).toBeHidden();
  });

  test('should enter and exit with custom start and exit sequences', async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <KeytipsBasicExample
        startSequence="alt+control"
        exitSequence="alt+enter"
      />
    );
    const tooltip = page.getByRole('tooltip');
    await expect(tooltip).toBeHidden();
    await component.press('Alt+Control');
    await expect(tooltip).toBeVisible();
    await component.press('Alt+Enter');
    await expect(tooltip).toBeHidden();
  });

  // TODO: Space seems not to be working in playwright testing
  const keyCases = ['Tab', 'Enter', 'Alt+Escape'];

  keyCases.forEach((key) => {
    test(`hides tooltip on ${key} key press`, async ({ mount, page }) => {
      const component = await mount(<KeytipsBasicExample />);
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip).toBeHidden();
      await component.press('Alt+Meta');
      await expect(tooltip).toBeVisible();
      await component.press(key);
      await expect(tooltip).toBeHidden();
    });
  });
});

test.describe('test keytip navigation', () => {
  test('should work with tabs', async ({ mount, page }) => {
    const component = await mount(<KeytipsTabsExample />);
    // should shoow first level of keytips
    await component.press('Alt+Meta');

    expect(await page.getByRole('tooltip').count()).toBe(2);
    await expect(page.getByRole('tooltip', { name: 'A' })).toBeVisible();
    await expect(page.getByRole('tooltip', { name: 'B' })).toBeVisible();

    await component.press('a');

    await expect(page.getByRole('tooltip', { name: '1' })).toBeVisible();
    await expect(page.getByRole('tooltip', { name: '2' })).toBeVisible();
    await expect(page.getByRole('tooltip', { name: '3' })).toBeVisible();

    // go back to tabs selection
    await component.press('Escape');
    // select second tab
    await component.press('b');
    expect(await page.getByRole('tooltip').count()).toBe(1);
    await expect(page.getByRole('tooltip', { name: 'B1' })).toBeVisible();
  });

  test('should work with overflow menu, if the overflow menu is available', async ({
    mount,
    page,
  }) => {
    const component = await mount(<KeytipsOverflowMenuExample />);
    await component.press('Alt+Meta');

    await expect(page.getByRole('tooltip', { name: 'A' })).toBeVisible();
    // should open nested menus and show next keytip
    await component.press('a');
    await expect(page.getByRole('menuitem', { name: 'Item 7' })).toBeVisible();
    await expect(page.getByRole('tooltip', { name: 'B' })).toBeVisible();

    await component.press('b');
    await expect(page.getByRole('menuitem', { name: '8' })).toBeVisible();
  });

  test('should be hidden with overflow menu, if the overflow menu is not available', async ({
    mount,
    page,
  }) => {
    page.setViewportSize({ width: 1200, height: 500 });
    const component = await mount(<KeytipsOverflowMenuExample />);
    await component.press('Alt+Meta');
    await expect(page.getByRole('tooltip', { name: 'A' })).toBeHidden();
  });
});

test.describe('keytip and dynamic content update', () => {
  test('should change keytip sequence and child button content', async ({
    mount,
    page,
  }) => {
    const component = await mount(<KeytipsDynamicExample />);
    await component.press('Alt+Meta');

    await expect(
      page.getByRole('button', { name: 'active button is Button 1' })
    ).toBeVisible();

    await expect(page.getByRole('tooltip', { name: 'A' })).toBeVisible();
    await expect(page.getByRole('tooltip', { name: 'B' })).toBeVisible();

    await component.press('B');
    await expect(page.getByRole('tooltip', { name: 'C' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'active button is Button 2' })
    ).toBeVisible();
  });
});
