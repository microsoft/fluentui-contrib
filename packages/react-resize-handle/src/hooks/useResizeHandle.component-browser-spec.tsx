import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';

import { TestArea } from './useResizeHandleExample.component-browser-spec';

test.use({ viewport: { width: 500, height: 500 } });

async function mountTest(mount) {
  const component = await mount(<TestArea />);
  const dragHandle = component.getByRole('slider');
  const wrapper = component.getByTestId('wrapper');
  const valueEl = component.getByTestId('value');

  return { component, dragHandle, wrapper, valueEl };
}

async function validateComponent(component, value) {
  await expect(component.wrapper).toHaveCSS('--width', `${value}px`);
  await expect(component.valueEl).toContainText(`--width: ${value}px;`);
  await expect(component.dragHandle).toHaveAttribute(
    'aria-valuetext',
    `${value}px`
  );
}

async function dragX(component, page, amount) {
  await component.dragHandle.hover();
  await page.mouse.down();
  await page.mouse.move(amount, 0);
  await page.mouse.up();
}

test.describe('useResizeHandle', () => {
  test('mouse can be used for dragging', async ({ mount, page }) => {
    const component = await mountTest(mount);

    dragX(component, page, 100);

    await validateComponent(component, 83);
  });

  test('keyboard can be used for resizing', async ({ mount, page }) => {
    const component = await mountTest(mount);

    await component.dragHandle.focus();
    await page.keyboard.press('ArrowRight');
    await validateComponent(component, 70);
    await page.keyboard.press('ArrowLeft');
    await validateComponent(component, 50);
  });

  test.describe("min/max value can't be exceeded", () => {
    test('with mouse', async ({ mount, page }) => {
      const component = await mountTest(mount);

      dragX(component, page, 1000);
      await validateComponent(component, 400);

      dragX(component, page, -1000);
      await validateComponent(component, 50);
    });

    test('with keyboard', async ({ mount, page }) => {
      const component = await mountTest(mount);
      await component.dragHandle.focus();

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowRight');
      }

      await validateComponent(component, 400);

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowLeft');
      }
      await validateComponent(component, 50);
    });
  });
});
