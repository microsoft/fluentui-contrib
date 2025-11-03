import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';

import { DraggableDialogTestExample } from './DraggableDialogExample.component-browser-spec';
import { Locator } from 'playwright/test';

test.use({ viewport: { width: 500, height: 500 } });

const evaluate = async (locator: Locator) => {
  return locator.evaluate((el: HTMLElement) => ({
    top: el.style.top,
    left: el.style.left,
  }));
};

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

    const inlinePos = await evaluate(surface);

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
    await expect(surface).toBeVisible();

    // When boundary is viewport and dialog hasn't been dragged, inline styles are not applied
    // The dialog is centered using CSS. We should verify the margin is respected in the bounding box.
    const boundingBox = await surface.boundingBox();
    
    // TypeScript guard: boundingBox should exist for a visible element
    expect(boundingBox).toBeTruthy();
    const box = boundingBox as NonNullable<typeof boundingBox>;
    
    // Verify the dialog is positioned within the viewport accounting for margin
    expect(box.x).toBeGreaterThanOrEqual(margin);
    expect(box.y).toBeGreaterThanOrEqual(margin);
  });
});
