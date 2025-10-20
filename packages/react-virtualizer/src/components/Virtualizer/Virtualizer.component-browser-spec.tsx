import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { VirtualizerExample } from './VirtualizerExample.component-browser-spec';

test.use({ viewport: { width: 800, height: 600 } });

test.describe('Virtualizer', () => {
  test('should render only visible items initially', async ({ mount }) => {
    const component = await mount(<VirtualizerExample numItems={1000} />);
    await expect(component).toBeVisible();

    // Should render first item
    await expect(component.getByTestId('item-0')).toBeVisible();

    // Should NOT render items far down the list
    const farItem = component.getByTestId('item-500');
    await expect(farItem).not.toBeAttached();
  });

  test('should have correct ARIA attributes', async ({ mount }) => {
    const component = await mount(<VirtualizerExample numItems={100} />);

    const container = component.getByTestId('scroll-container');

    await expect(container).toBeVisible();

    await expect(container).toHaveAttribute('role', 'list');
    await expect(container).toHaveAttribute(
      'aria-label',
      'Virtualizer Example'
    );

    // Wait for first item to be rendered (virtualizer needs to measure container first)
    const firstItem = component.getByTestId('item-0');
    await expect(firstItem).toBeVisible({ timeout: 5000 });

    // Check ARIA attributes
    await expect(firstItem).toHaveAttribute('role', 'listitem');
    await expect(firstItem).toHaveAttribute('aria-posinset', '1');
    await expect(firstItem).toHaveAttribute('aria-setsize', '100');
  });

  test('should update visible items on scroll', async ({ mount }) => {
    const component = await mount(<VirtualizerExample numItems={1000} />);

    // Initially item-0 should be visible
    await expect(component.getByTestId('item-0')).toBeVisible();

    // Scroll down

    const container = component.getByTestId('scroll-container');

    await container.evaluate((el) => {
      el.scrollTop = 2500; // Scroll to middle (50 items * 50px each)
    });

    // Wait for item-50 to appear (IntersectionObserver callback)
    await expect(component.getByTestId('item-50')).toBeVisible({
      timeout: 5000,
    });

    // Item-0 should no longer be in the DOM
    await expect(component.getByTestId('item-0')).not.toBeAttached();
  });

  test('should handle rapid scrolling without whitespace', async ({
    mount,
    page,
  }) => {
    const component = await mount(<VirtualizerExample numItems={1000} />);
    const container = component.getByTestId('scroll-container');

    // Perform rapid scrolling
    for (let i = 0; i < 10; i++) {
      await container.evaluate((el, offset) => {
        el.scrollTop += offset;
      }, 500);
      await page.waitForTimeout(100);
    }

    // Wait for final virtualization update
    await page.waitForTimeout(500);

    // Should still have items rendered (no blank space)
    const items = await component.locator('[role="listitem"]').count();
    expect(items).toBeGreaterThan(0);
  });

  test('should scroll to bottom and render last items', async ({ mount }) => {
    const component = await mount(<VirtualizerExample numItems={1000} />);
    const container = component.getByTestId('scroll-container');

    // Scroll to bottom
    await container.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });

    // Wait for last item to appear
    await expect(component.getByTestId('item-999')).toBeVisible({
      timeout: 5000,
    });
  });

  test('should handle scroll to top', async ({ mount, page }) => {
    const component = await mount(<VirtualizerExample numItems={1000} />);
    const container = component.getByTestId('scroll-container');

    // First scroll to middle
    await container.evaluate((el) => {
      el.scrollTop = 5000;
    });

    // Wait for middle items to appear
    await page.waitForTimeout(500);

    // Then scroll back to top
    await container.evaluate((el) => {
      el.scrollTop = 0;
    });

    // Wait for first item to reappear
    await expect(component.getByTestId('item-0')).toBeVisible({
      timeout: 5000,
    });
  });

  test('should maintain correct item count', async ({ mount, page }) => {
    const component = await mount(<VirtualizerExample numItems={1000} />);
    const container = component.getByTestId('scroll-container');

    await expect(container).toBeVisible();

    // Count rendered items
    const itemCount = await component.locator('[role="listitem"]').count();

    // Should render more than viewport but less than total
    expect(itemCount).toBeGreaterThan(5);
    expect(itemCount).toBeLessThan(1000);

    // After scrolling, count should be similar

    await container.evaluate((el) => {
      el.scrollTop = 2500;
    });

    // Wait for virtualization update with longer timeout
    await page.waitForTimeout(800);

    const itemCountAfterScroll = await component
      .locator('[role="listitem"]')
      .count();
    expect(itemCountAfterScroll).toBeGreaterThan(5);
    expect(itemCountAfterScroll).toBeLessThan(1000);
  });

  test('should handle small lists (no virtualization needed)', async ({
    mount,
  }) => {
    const component = await mount(<VirtualizerExample numItems={5} />);

    // All items should be visible
    await expect(component.getByTestId('item-0')).toBeVisible();
    await expect(component.getByTestId('item-1')).toBeVisible();
    await expect(component.getByTestId('item-2')).toBeVisible();
    await expect(component.getByTestId('item-3')).toBeVisible();
    await expect(component.getByTestId('item-4')).toBeVisible();
  });

  test('should render items with correct content', async ({ mount }) => {
    const component = await mount(<VirtualizerExample numItems={100} />);

    const item0 = component.getByTestId('item-0');
    await expect(item0).toContainText('Item 0');

    const item1 = component.getByTestId('item-1');
    await expect(item1).toContainText('Item 1');
  });

  test('should handle edge case at list boundaries', async ({ mount }) => {
    const component = await mount(<VirtualizerExample numItems={100} />);
    const container = component.getByTestId('scroll-container');

    // Scroll to very bottom
    await container.evaluate((el) => {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    });

    // Wait for last item to appear
    await expect(component.getByTestId('item-99')).toBeVisible({
      timeout: 5000,
    });

    // Scroll to very top
    await container.evaluate((el) => {
      el.scrollTop = 0;
    });

    // Wait for first item to reappear
    await expect(component.getByTestId('item-0')).toBeVisible({
      timeout: 5000,
    });
  });

  test('should start with empty list and prepend items without React key errors', async ({
    mount,
    page,
  }) => {
    // Listen for console errors
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const component = await mount(<VirtualizerExample numItems={0} />);

    // Wait for initial render
    await expect(component.getByTestId('scroll-container')).toBeVisible();
    await page.waitForTimeout(500); // Wait for virtualizer to measure

    // Initially, list should be empty
    const items = await component.locator('[role="listitem"]').count();
    expect(items).toBe(0);

    // Add first item
    await component.getByTestId('add-item-button').click();
    await page.waitForTimeout(500);

    // Should have one item now
    const firstItem = component.getByTestId('item-0');
    await expect(firstItem).toBeVisible({ timeout: 3000 });
    await expect(firstItem).toHaveAttribute('data-value', '0');
    await expect(firstItem).toContainText('Item 0');

    // Add second item (should be prepended)
    await component.getByTestId('add-item-button').click();
    await page.waitForTimeout(500);

    // item-1 should now be first (prepended)
    const newFirstItem = component.getByTestId('item-1');
    await expect(newFirstItem).toBeVisible({ timeout: 3000 });
    await expect(newFirstItem).toHaveAttribute('data-value', '1');

    // item-0 should still be visible but below item-1
    await expect(firstItem).toBeVisible();

    // Verify no React key reconciliation errors
    const keyErrors = consoleErrors.filter(
      (err) =>
        err.includes('key') ||
        err.includes('unique') ||
        err.includes('Warning: Encountered two children with the same key')
    );

    expect(keyErrors).toHaveLength(0);
  });

  test('should handle prepending multiple items without React key errors', async ({
    mount,
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const component = await mount(<VirtualizerExample numItems={0} />);

    await expect(component.getByTestId('scroll-container')).toBeVisible();
    await page.waitForTimeout(500);

    // Add 10 items at once
    await component.getByTestId('add-multiple-button').click();
    await page.waitForTimeout(500);

    // Should have items visible
    const itemsAfterFirst = await component
      .locator('[role="listitem"]')
      .count();
    expect(itemsAfterFirst).toBeGreaterThan(0);

    // First visible item should be item-0 (the first of the 10 added)
    const firstItem = component.getByTestId('item-0');
    await expect(firstItem).toBeVisible({ timeout: 3000 });
    await expect(firstItem).toHaveAttribute('data-value', '0');

    // Add 10 more items (should be prepended)
    await component.getByTestId('add-multiple-button').click();
    await page.waitForTimeout(500);

    // Now item-10 should be first
    const newFirstItem = component.getByTestId('item-10');
    await expect(newFirstItem).toBeVisible({ timeout: 3000 });
    await expect(newFirstItem).toHaveAttribute('data-value', '10');

    // No key reconciliation errors
    const keyErrors = consoleErrors.filter(
      (err) =>
        err.includes('key') ||
        err.includes('unique') ||
        err.includes('Warning: Encountered two children with the same key')
    );

    expect(keyErrors).toHaveLength(0);
  });

  test('should correctly update when scrolled and items are prepended', async ({
    mount,
    page,
  }) => {
    const component = await mount(<VirtualizerExample numItems={0} />);

    await expect(component.getByTestId('scroll-container')).toBeVisible();
    await page.waitForTimeout(500);

    // Add many items to enable scrolling
    for (let i = 0; i < 5; i++) {
      await component.getByTestId('add-multiple-button').click();
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(500);

    // Scroll down
    const container = component.getByTestId('scroll-container');
    await container.evaluate((el) => {
      el.scrollTop = 1000;
    });
    await page.waitForTimeout(500);

    // Add more items while scrolled (prepend to top)
    await component.getByTestId('add-multiple-button').click();
    await page.waitForTimeout(500);

    // Items should still render correctly
    const items = await component.locator('[role="listitem"]').count();
    expect(items).toBeGreaterThan(0);

    // No errors should occur
    const errors = await page.evaluate(() => {
      // eslint-disable-next-line no-restricted-globals
      return (window as any).__reactErrors || [];
    });
    expect(errors).toHaveLength(0);
  });
});
