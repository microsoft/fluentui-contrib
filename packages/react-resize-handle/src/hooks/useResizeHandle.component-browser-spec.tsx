import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';

import {
  TestArea,
  type TestAreaProps,
} from './useResizeHandleExample.component-browser-spec';

test.use({ viewport: { width: 500, height: 500 } });

type PwTestFn = Parameters<typeof test>['1'];
type PwMountFn = Parameters<PwTestFn>[0]['mount'];
type PwPage = Parameters<PwTestFn>[0]['page'];

type MountResult = Awaited<ReturnType<typeof mountTest>>;

async function mountTest(mount: PwMountFn, props: TestAreaProps = {}) {
  const component = await mount(<TestArea {...props} />);

  const element = component.getByTestId('element');
  const dragHandle = component.getByRole('slider');
  const wrapper = component.getByTestId('wrapper');
  const valueEl = component.getByTestId('value');

  return {
    component,

    element,
    dragHandle,
    wrapper,
    valueEl,

    variableTarget: props.variableTarget,
  };
}

async function validateComponent(
  component: MountResult,
  value: number,
  eventType?: string
) {
  const variableTarget =
    component.variableTarget === 'element'
      ? component.element
      : component.wrapper;

  await expect(variableTarget).toHaveCSS('--width', `${value}px`);
  await expect(component.valueEl).toContainText(`--width: ${value}px;`);

  if (eventType) {
    await expect(component.valueEl).toContainText(`eventType: ${eventType}`);
  }

  await expect(component.dragHandle).toHaveAttribute(
    'aria-valuetext',
    `${value}px`
  );
}

async function dragX(component: MountResult, page: PwPage, amount: number) {
  await component.dragHandle.hover();

  await page.mouse.down();
  await page.mouse.move(amount, 0);
  await page.mouse.up();
}

test.describe('useResizeHandle', () => {
  test('mouse can be used for dragging', async ({ mount, page }) => {
    const result = await mountTest(mount);

    await dragX(result, page, 100);
    await validateComponent(result, 83);
  });

  test('keyboard can be used for resizing', async ({ mount, page }) => {
    const result = await mountTest(mount);

    await result.dragHandle.focus();
    await page.keyboard.press('ArrowRight');
    await validateComponent(result, 70, 'keyboard');
    await page.keyboard.press('ArrowLeft');
    await validateComponent(result, 50, 'keyboard');
  });

  test.describe("min/max value can't be exceeded", () => {
    test('with mouse', async ({ mount, page }) => {
      const result = await mountTest(mount);

      await dragX(result, page, 500);
      await validateComponent(result, 400, 'mouse');

      await dragX(result, page, -500);
      await validateComponent(result, 50, 'mouse');
    });

    test('with keyboard', async ({ mount, page }) => {
      const result = await mountTest(mount);
      await result.dragHandle.focus();

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowRight');
      }

      await validateComponent(result, 400, 'keyboard');

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowLeft');
      }
      await validateComponent(result, 50, 'keyboard');
    });
  });

  test.describe('variableTarget', () => {
    test('a CSS variable could be assigned to an element', async ({
      mount,
      page,
    }) => {
      const variableTarget = 'element';
      const result = await mountTest(mount, { variableTarget });

      await dragX(result, page, 100);
      await validateComponent(result, 83);
    });
  });
});
