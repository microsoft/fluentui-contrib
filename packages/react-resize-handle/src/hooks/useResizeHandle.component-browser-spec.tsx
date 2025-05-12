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
type MountResult = Awaited<ReturnType<typeof mountTest>>;

async function mountTest(mount: PwMountFn, props: TestAreaProps = {}) {
  const component = await mount(<TestArea {...props} />);

  const wrapperEl = component.getByTestId('wrapper');

  const resizableEl = component.getByTestId('resizable');
  const staticEl = component.getByTestId('static');
  const dragEl = component.getByRole('slider');

  const valueEl = component.getByTestId('value');
  const resetEl = component.getByTestId('reset');

  const spacerBefore = component.getByTestId('spacer-before');
  const spacerAfter = component.getByTestId('spacer-after');

  return {
    component,

    wrapperEl,
    resizableEl,
    staticEl,
    dragEl,

    valueEl,
    resetEl,

    spacerBefore,
    spacerAfter,

    variableTarget: props.variableTarget,
  };
}

async function validateComponent(
  mountResult: MountResult,
  {
    value,
    varValue = value,
    domValue = value,
    eventType,
    skipAriaCheck = false,
  }: {
    /** A value coming from `onChange` callback */
    value: number;
    /** A value of assigned CSS variable */
    varValue?: number;
    /** An actual value of the DOM element */
    domValue?: number;

    eventType?: string;
    /**
     * Heads up!
     * "aria-valuetext" is not correctly set when using relative mode
     */
    skipAriaCheck?: boolean;
  }
) {
  const variableTarget =
    mountResult.variableTarget === 'element'
      ? mountResult.resizableEl
      : mountResult.wrapperEl;

  await expect(mountResult.valueEl).toContainText(
    `width (from callback): ${value}px;`
  );
  await expect(mountResult.valueEl).toContainText(
    `width (actual DOM): ${domValue}px;`
  );
  await expect(variableTarget).toHaveCSS('--width', `${varValue}px`);

  if (!skipAriaCheck) {
    await expect(mountResult.dragEl).toHaveAttribute(
      'aria-valuetext',
      `${domValue}px`
    );
  }

  if (eventType) {
    await expect(mountResult.valueEl).toContainText(`eventType: ${eventType}`);
  }
}

test.describe('useResizeHandle', () => {
  test('mouse can be used for dragging', async ({ mount }) => {
    const result = await mountTest(mount);

    await result.dragEl.dragTo(result.staticEl);
    await validateComponent(result, { value: 235, eventType: 'mouse' });
  });

  test('keyboard can be used for resizing', async ({ mount, page }) => {
    const result = await mountTest(mount);

    await result.dragEl.focus();
    await page.keyboard.press('ArrowRight');
    await validateComponent(result, { value: 70, eventType: 'keyboard' });
    await page.keyboard.press('ArrowLeft');
    await validateComponent(result, { value: 50, eventType: 'keyboard' });
  });

  test('value could be changed imperatively', async ({ mount }) => {
    const result = await mountTest(mount);

    await result.dragEl.dragTo(result.staticEl);
    await validateComponent(result, { value: 235, eventType: 'mouse' });

    await result.resetEl.click();
    await validateComponent(result, { value: 50, eventType: 'setValue' });
  });

  test.describe('CSS clamp', () => {
    // Heads up!
    // A value of the CSS variable can exceed the clamp values, but it will be actually clamped in the DOM:
    //
    // {
    //   '--width': '2000px',
    //   'width': 'clamp(50px, 2000px, 400px)' // 400px
    // }

    test('cannot exceed min with mouse', async ({ mount }) => {
      const result = await mountTest(mount, { useCSSClamp: true });

      await result.dragEl.dragTo(result.spacerBefore);
      await validateComponent(result, {
        value: 40,
        varValue: 0,
        eventType: 'mouse',
      });
    });

    test('cannot exceed max with mouse', async ({ mount }) => {
      const result = await mountTest(mount, { useCSSClamp: true });

      await result.dragEl.dragTo(result.spacerAfter);
      await validateComponent(result, {
        value: 400,
        varValue: 480,
        eventType: 'mouse',
      });
    });

    test('cannot exceed with keyboard', async ({ mount, page }) => {
      const result = await mountTest(mount, { useCSSClamp: true });
      await result.dragEl.focus();

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowRight');
      }

      await validateComponent(result, {
        value: 400,
        varValue: 420,
        eventType: 'keyboard',
      });

      // ---

      await result.resetEl.click();
      await result.dragEl.focus();

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowLeft');
      }

      await validateComponent(result, {
        value: 40,
        varValue: 20,
        eventType: 'keyboard',
      });
    });
  });

  test.describe("min/max value can't be exceeded", () => {
    test('with mouse (min)', async ({ mount }) => {
      const result = await mountTest(mount, { minValue: 30 });

      await result.dragEl.dragTo(result.spacerBefore);
      await validateComponent(result, { value: 30, eventType: 'mouse' });
    });

    test('with mouse (max)', async ({ mount }) => {
      const result = await mountTest(mount, { maxValue: 300 });

      await result.dragEl.dragTo(result.spacerAfter);
      await validateComponent(result, { value: 300, eventType: 'mouse' });
    });

    test('with keyboard', async ({ mount, page }) => {
      const result = await mountTest(mount, { minValue: 30, maxValue: 300 });
      await result.dragEl.focus();

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowRight');
      }

      await validateComponent(result, { value: 300, eventType: 'keyboard' });

      // ---

      await result.resetEl.click();
      await result.dragEl.focus();

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowLeft');
      }
      await validateComponent(result, { value: 30, eventType: 'keyboard' });
    });
  });

  test.describe('relative', () => {
    test('mouse can be used for dragging', async ({ mount }) => {
      const result = await mountTest(mount, { relative: true });

      await result.dragEl.dragTo(result.staticEl);
      await validateComponent(result, {
        value: 185,
        domValue: 235,
        skipAriaCheck: true,
      });
    });

    test('does not have dead zones after moving off the area', async ({
      mount,
      page,
    }) => {
      const result = await mountTest(mount, { relative: true });

      await result.dragEl.hover();
      await page.mouse.down();
      await page.mouse.move(30, 0);

      await validateComponent(result, {
        value: -35,
        domValue: 40,
        skipAriaCheck: true,
      });

      // ---

      await page.mouse.move(100, 0);
      await page.mouse.up();

      await validateComponent(result, {
        value: 35,
        domValue: 85,
        skipAriaCheck: true,
      });
    });

    test('value could be changed imperatively', async ({ mount }) => {
      const result = await mountTest(mount, { relative: true });

      await result.dragEl.dragTo(result.staticEl);
      await validateComponent(result, {
        value: 185,
        domValue: 235,
        skipAriaCheck: true,
      });

      await result.resetEl.click();
      await validateComponent(result, {
        value: 0,
        domValue: 50,
        eventType: 'setValue',
        skipAriaCheck: true,
      });
    });
  });

  test.describe('variableTarget', () => {
    test('a CSS variable could be assigned to an element', async ({
      mount,
    }) => {
      const result = await mountTest(mount, { variableTarget: 'element' });

      await result.dragEl.dragTo(result.staticEl);
      await validateComponent(result, { value: 235, eventType: 'mouse' });
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

      await result.dragEl.hover();

      await page.mouse.down();
      await page.mouse.move(100, 0);

      await validateComponent(result, { value: 85, eventType: 'mouse' });

      expect(dragStartCalls.length).toBe(1);
      expect(dragEndCalls.length).toBe(0);
      expect(onChangeCalls.length).toBe(1);

      expect(dragStartCalls[0]).toBeLessThan(onChangeCalls[0]);

      // Drag end
      // --------------------

      await page.mouse.move(200, 0);
      await page.mouse.up();

      await validateComponent(result, { value: 185, eventType: 'mouse' });

      expect(dragStartCalls.length).toBe(1);
      expect(dragEndCalls.length).toBe(1);
      expect(onChangeCalls.length).toBe(2);
      expect(onChangeCalls[1]).toBeLessThan(dragEndCalls[0]);
    });

    test("exceeding `clamp()` don't fire 'onChange' events", async ({
      mount,
    }) => {
      const onChangeCalls: number[] = [];
      const result = await mountTest(mount, {
        onChange: (_, { value }) => {
          onChangeCalls.push(value);
        },
        useCSSClamp: true,
      });

      // Drag to the left
      // ---

      const spacerBefore = await result.resizableEl.boundingBox();

      await result.dragEl.dragTo(result.resizableEl, {
        targetPosition: {
          x: spacerBefore.x + 10,
          y: spacerBefore.y,
        },
      });

      await validateComponent(result, {
        value: 40,
        varValue: 17,
        eventType: 'mouse',
      });
      expect(onChangeCalls.length).toBeGreaterThan(0);

      // ---

      onChangeCalls.length = 0;
      await result.dragEl.dragTo(result.spacerBefore);

      await validateComponent(result, {
        value: 40,
        varValue: 0,
        eventType: 'mouse',
      });
      expect(onChangeCalls.length).toBe(0);

      // Drag to the right
      // ---

      const staticRect = await result.staticEl.boundingBox();

      await result.dragEl.dragTo(result.staticEl, {
        targetPosition: {
          x: staticRect.x + 400,
          y: staticRect.y,
        },
      });

      await validateComponent(result, {
        value: 400,
        varValue: 407,
        eventType: 'mouse',
      });
      expect(onChangeCalls.length).toBeGreaterThan(0);

      // ---

      onChangeCalls.length = 0;

      await result.dragEl.dragTo(result.spacerAfter);

      await validateComponent(result, {
        value: 400,
        varValue: 580,
        eventType: 'mouse',
      });
      expect(onChangeCalls.length).toBe(0);
    });
  });
});
