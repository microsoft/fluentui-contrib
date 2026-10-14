import * as React from 'react';
import { test, expect, type Locator } from '@playwright/experimental-ct-react';

import { DraggableDialogTestExample } from './DraggableDialogExample.component-browser-spec';

test.use({ viewport: { width: 500, height: 500 } });

const evaluate = async (locator: Locator) => {
  return locator.evaluate((el: HTMLElement) => ({
    top: el.style.top,
    left: el.style.left,
  }));
};

const getBoundingBox = async (locator: Locator) => {
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error('Expected a visible element to have a bounding box.');
  }
  return box;
};

const waitForOpeningMotion = async (surface: Locator) => {
  await expect(surface).toBeVisible();
  await surface.evaluate(async (element) => {
    await Promise.all(
      element.getAnimations().map((animation) => animation.finished)
    );
  });
};

const expectPosition = async (
  surface: Locator,
  position: { x: number; y: number }
) => {
  await expect
    .poll(async () => (await getBoundingBox(surface)).x)
    .toBeGreaterThanOrEqual(position.x - 1);
  await expect
    .poll(async () => (await getBoundingBox(surface)).x)
    .toBeLessThanOrEqual(position.x + 1);
  await expect
    .poll(async () => (await getBoundingBox(surface)).y)
    .toBeGreaterThanOrEqual(position.y - 1);
  await expect
    .poll(async () => (await getBoundingBox(surface)).y)
    .toBeLessThanOrEqual(position.y + 1);
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

  for (const boundary of [undefined, null]) {
    test(`preserves the origin on first and repeated mouse drags ${
      boundary === null
        ? 'without a boundary'
        : 'with the default viewport boundary'
    }`, async ({ mount, page }) => {
      await mount(<DraggableDialogTestExample open boundary={boundary} />);

      const surface = page.getByRole('dialog');
      const handle = page.getByTestId('drag-handle');
      await waitForOpeningMotion(surface);

      const { x, y } = await getBoundingBox(surface);
      expect(x).toBeGreaterThan(0);
      expect(y).toBeGreaterThan(0);
      let position = { x, y };

      for (let drag = 0; drag < 2; drag++) {
        await test.step(`mouse drag ${drag + 1}`, async () => {
          const handleBox = await getBoundingBox(handle);
          const grab = {
            x: handleBox.x + handleBox.width / 2,
            y: handleBox.y + handleBox.height / 2,
          };
          await page.mouse.move(grab.x, grab.y);
          await expectPosition(surface, position);

          await page.mouse.down();
          await expect(handle).toHaveAttribute('aria-pressed', 'true');
          await expectPosition(surface, position);

          const drop = { x: position.x + 40, y: position.y + 30 };
          await page.mouse.move(grab.x + 40, grab.y + 30);
          await expectPosition(surface, drop);

          await page.mouse.up();
          await expect(handle).not.toHaveAttribute('aria-pressed', 'true');
          await expectPosition(surface, drop);
          position = drop;
        });
      }
    });
  }

  test('uses a controlled position updated after rendering as the drag origin', async ({
    mount,
    page,
  }) => {
    const initialPosition = { x: 40, y: 60 };
    const updatedPosition = { x: 120, y: 100 };
    const component = await mount(
      <DraggableDialogTestExample open position={initialPosition} />
    );

    const surface = page.getByRole('dialog');
    const handle = page.getByTestId('drag-handle');
    await waitForOpeningMotion(surface);
    await expectPosition(surface, initialPosition);

    await component.update(
      <DraggableDialogTestExample open position={updatedPosition} />
    );
    await expectPosition(surface, updatedPosition);

    const handleBox = await getBoundingBox(handle);
    const grab = {
      x: handleBox.x + handleBox.width / 2,
      y: handleBox.y + handleBox.height / 2,
    };
    await page.mouse.move(grab.x, grab.y);
    await expectPosition(surface, updatedPosition);

    await page.mouse.down();
    await expect(handle).toHaveAttribute('aria-pressed', 'true');
    await expectPosition(surface, updatedPosition);

    await page.mouse.move(grab.x + 40, grab.y + 30);
    await expectPosition(surface, {
      x: updatedPosition.x + 40,
      y: updatedPosition.y + 30,
    });

    await page.mouse.up();
    await expect(handle).not.toHaveAttribute('aria-pressed', 'true');
    await expectPosition(surface, updatedPosition);
  });

  test('preserves the centered origin when starting, moving, and dropping with the keyboard', async ({
    mount,
    page,
  }) => {
    await mount(<DraggableDialogTestExample open />);

    const surface = page.getByRole('dialog');
    const handle = page.getByTestId('drag-handle');
    await waitForOpeningMotion(surface);
    const { x, y } = await getBoundingBox(surface);
    const origin = { x, y };

    await handle.focus();
    await expect(handle).toBeFocused();
    await expectPosition(surface, origin);

    await page.keyboard.press('Space');
    await expect(handle).toHaveAttribute('aria-pressed', 'true');
    await expectPosition(surface, origin);

    await page.keyboard.press('ArrowRight');
    await expectPosition(surface, { x: origin.x + 25, y: origin.y });
    const drop = { x: origin.x + 25, y: origin.y + 25 };
    await page.keyboard.press('ArrowDown');
    await expectPosition(surface, drop);

    await page.keyboard.press('Space');
    await expect(handle).not.toHaveAttribute('aria-pressed', 'true');
    await expectPosition(surface, drop);
  });
});
