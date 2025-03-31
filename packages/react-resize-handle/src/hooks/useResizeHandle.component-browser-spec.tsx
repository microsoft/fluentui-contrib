import * as React from 'react';
import {
  test,
  expect,
  type MountOptions as PwMountOptions,
  type MountResult as PwMountResult,
} from '@playwright/experimental-ct-react';

import {
  TestArea,
  type TestAreaProps,
} from './useResizeHandleExample.component-browser-spec';

/* eslint-disable no-restricted-globals */

test.use({ viewport: { width: 500, height: 500 } });

type PwMountFn = <HooksConfig>(
  component: React.JSX.Element,
  options?: PwMountOptions<HooksConfig>
) => Promise<PwMountResult>;
type PwPage = ReturnType<PwMountResult['page']>;

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
  mountResult: MountResult,
  value: number,
  eventType?: string
) {
  const variableTarget =
    mountResult.variableTarget === 'element'
      ? mountResult.element
      : mountResult.wrapper;

  await expect(variableTarget).toHaveCSS('--width', `${value}px`);
  await expect(mountResult.valueEl).toContainText(`--width: ${value}px;`);

  if (eventType) {
    await expect(mountResult.valueEl).toContainText(`eventType: ${eventType}`);
  }

  await expect(mountResult.dragHandle).toHaveAttribute(
    'aria-valuetext',
    `${value}px`
  );
}

async function dragX(mountResult: MountResult, page: PwPage, amount: number) {
  await mountResult.dragHandle.hover();

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

  test.describe('events', () => {
    test('events are called in order', async ({ mount, page }) => {
      const dragStartCalls: number[] = [];
      const dragEndCalls: number[] = [];
      const onChangeCalls: number[] = [];

      const result = await mountTest(mount, {
        onDragStart: () => {
          dragStartCalls.push(performance.now());
        },
        onDragEnd: () => {
          dragEndCalls.push(performance.now());
        },
        onChange: () => {
          onChangeCalls.push(performance.now());
        },
      });

      // Drag start
      // --------------------

      await result.dragHandle.hover();

      await page.mouse.down();
      await page.mouse.move(100, 0);

      await validateComponent(result, 83);

      expect(dragStartCalls.length).toBe(1);
      expect(dragEndCalls.length).toBe(0);
      expect(onChangeCalls.length).toBe(1);

      expect(dragStartCalls[0]).toBeLessThan(onChangeCalls[0]);

      // Drag end
      // --------------------

      await page.mouse.move(200, 0);
      await page.mouse.up();

      await validateComponent(result, 183);

      expect(dragStartCalls.length).toBe(1);
      expect(dragEndCalls.length).toBe(1);
      expect(onChangeCalls.length).toBe(2);
      expect(onChangeCalls[1]).toBeLessThan(dragEndCalls[0]);
    });
  });
});
