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
  const reset = component.getByTestId('reset');

  return {
    component,

    element,
    dragHandle,
    wrapper,
    valueEl,
    reset,

    variableTarget: props.variableTarget,
  };
}

async function validateComponent(
  mountResult: MountResult,
  {
    varValue,
    domValue = varValue,
    eventType,
    skipAriaCheck = false,
  }: {
    varValue: number;
    domValue?: number;
    eventType?: string;
    // Heads up!
    // "aria-valuetext" is not correctly set when using relative mode
    skipAriaCheck?: boolean;
  }
) {
  const variableTarget =
    mountResult.variableTarget === 'element'
      ? mountResult.element
      : mountResult.wrapper;

  await expect(variableTarget).toHaveCSS('--width', `${varValue}px`);

  if (!skipAriaCheck) {
    await expect(mountResult.dragHandle).toHaveAttribute(
      'aria-valuetext',
      `${domValue}px`
    );
  }

  await expect(mountResult.valueEl).toContainText(
    `width (from callback): ${varValue}px;`
  );
  await expect(mountResult.valueEl).toContainText(
    `width (actual DOM): ${domValue}px;`
  );

  if (eventType) {
    await expect(mountResult.valueEl).toContainText(`eventType: ${eventType}`);
  }
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
    await validateComponent(result, { varValue: 83, eventType: 'mouse' });
  });

  test('keyboard can be used for resizing', async ({ mount, page }) => {
    const result = await mountTest(mount);

    await result.dragHandle.focus();
    await page.keyboard.press('ArrowRight');
    await validateComponent(result, { varValue: 70, eventType: 'keyboard' });
    await page.keyboard.press('ArrowLeft');
    await validateComponent(result, { varValue: 50, eventType: 'keyboard' });
  });

  test('value could be changed imperatively', async ({ mount, page }) => {
    const result = await mountTest(mount);

    await dragX(result, page, 100);
    await validateComponent(result, { varValue: 83, eventType: 'mouse' });

    await result.reset.click();
    await validateComponent(result, { varValue: 50, eventType: 'setValue' });
  });

  test.describe("min/max value can't be exceeded", () => {
    test('with mouse', async ({ mount, page }) => {
      const result = await mountTest(mount);

      await dragX(result, page, 500);
      await validateComponent(result, { varValue: 400, eventType: 'mouse' });

      await dragX(result, page, -500);
      await validateComponent(result, { varValue: 50, eventType: 'mouse' });
    });

    test('with keyboard', async ({ mount, page }) => {
      const result = await mountTest(mount);
      await result.dragHandle.focus();

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowRight');
      }

      await validateComponent(result, { varValue: 400, eventType: 'keyboard' });

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowLeft');
      }
      await validateComponent(result, { varValue: 50, eventType: 'keyboard' });
    });
  });

  test.describe('relative', () => {
    test('mouse can be used for dragging', async ({ mount, page }) => {
      const result = await mountTest(mount, { relative: true });

      await dragX(result, page, 100);
      await validateComponent(result, {
        varValue: 33,
        domValue: 83,
        skipAriaCheck: true,
      });
    });

    test('does not have dead zones after moving off the area', async ({
      mount,
      page,
    }) => {
      const result = await mountTest(mount, { relative: true });

      await result.dragHandle.hover();

      await page.mouse.down();
      await page.mouse.move(-1000, 0);
      await page.mouse.move(-2000, 0);

      await validateComponent(result, {
        varValue: 0,
        domValue: 50,
        skipAriaCheck: true,
      });

      await page.mouse.move(100, 0);
      await page.mouse.up();

      await validateComponent(result, {
        varValue: 33,
        domValue: 83,
        skipAriaCheck: true,
      });
    });

    test('value could be changed imperatively', async ({ mount, page }) => {
      const result = await mountTest(mount, { relative: true });

      await dragX(result, page, 100);
      await validateComponent(result, {
        varValue: 33,
        domValue: 83,
        eventType: 'mouse',
        skipAriaCheck: true,
      });

      await result.reset.click();
      await validateComponent(result, {
        varValue: 0,
        domValue: 50,
        eventType: 'setValue',
        skipAriaCheck: true,
      });
    });
  });

  test.describe('variableTarget', () => {
    test('a CSS variable could be assigned to an element', async ({
      mount,
      page,
    }) => {
      const result = await mountTest(mount, { variableTarget: 'element' });

      await dragX(result, page, 100);
      await validateComponent(result, { varValue: 83, eventType: 'mouse' });
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

      await validateComponent(result, { varValue: 83, eventType: 'mouse' });

      expect(dragStartCalls.length).toBe(1);
      expect(dragEndCalls.length).toBe(0);
      expect(onChangeCalls.length).toBe(1);

      expect(dragStartCalls[0]).toBeLessThan(onChangeCalls[0]);

      // Drag end
      // --------------------

      await page.mouse.move(200, 0);
      await page.mouse.up();

      await validateComponent(result, { varValue: 183, eventType: 'mouse' });

      expect(dragStartCalls.length).toBe(1);
      expect(dragEndCalls.length).toBe(1);
      expect(onChangeCalls.length).toBe(2);
      expect(onChangeCalls[1]).toBeLessThan(dragEndCalls[0]);
    });
  });
});
