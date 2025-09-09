import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';

import { DraggableDialogTestExample } from './DraggableDialogExample.component-browser-spec';

test.use({ viewport: { width: 500, height: 500 } });

test.describe('DraggableDialog (Playwright)', () => {
  test('does not render when open is false', async ({ mount, page }) => {
    await mount(<DraggableDialogTestExample open={false} />);

    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('renders when open is true', async ({ mount, page }) => {
    await mount(<DraggableDialogTestExample open />);

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(page.getByTestId('content')).toHaveText('Dialog Content');
  });

  test('respects controlled position prop', async ({ mount, page }) => {
    await mount(
      <DraggableDialogTestExample open position={{ x: 40, y: 60 }} />
    );
    const surface = page.locator('.fui-DraggableDialogSurface');
    await expect(surface).toBeVisible();
    const inlinePos = await surface.evaluate((el) => ({
      top: (el as HTMLElement).style.top,
      left: (el as HTMLElement).style.left,
    }));
    expect(inlinePos.top).toBe('60px');
    expect(inlinePos.left).toBe('40px');
  });

  test('applies margin with viewport boundary to initial positioning', async ({
    mount,
    page,
  }) => {
    const margin = 50;
    await mount(
      <DraggableDialogTestExample
        open
        margin={margin}
        contentText="Viewport Boundary"
      />
    );
    const surface = page.locator('.fui-DraggableDialogSurface');
    const styles = await surface.evaluate((el) => ({
      top: (el as HTMLElement).style.top,
      left: (el as HTMLElement).style.left,
    }));
    const topNum = parseInt(styles.top, 10);
    const leftNum = parseInt(styles.left, 10);
    expect(topNum).toBeGreaterThanOrEqual(margin);
    expect(leftNum).toBeGreaterThanOrEqual(margin);
  });
});
