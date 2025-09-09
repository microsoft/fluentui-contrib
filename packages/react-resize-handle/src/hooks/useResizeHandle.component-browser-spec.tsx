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
  // eslint-disable-next-line @typescript-eslint/no-restricted-types
  component: React.JSX.Element,
  options?: PwMountOptions<HooksConfig>
) => Promise<PwMountResult>;
type MountResult = Awaited<ReturnType<typeof mountTest>>;

function createSpyFn<T>() {
  const calls: { time: number; args: T[] }[] = [];
  const spy = (...args: T[]) => {
    calls.push({ time: performance.now(), args });
  };

  spy.calls = calls;
  spy.clear = () => {
    calls.length = 0;
  };

  return spy;
}

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
    domValue = value,
    eventType,
    skipAriaCheck = false,
  }: {
    /** A value coming from `onChange` callback */
    value: string;
    /** An actual value of the DOM element */
    domValue?: string;

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
    `width (from callback): ${value};`
  );
  await expect(mountResult.valueEl).toContainText(
    `width (actual DOM): ${domValue};`
  );
  await expect(variableTarget).toHaveCSS('--width', value);

  if (!skipAriaCheck) {
    await expect(mountResult.dragEl).toHaveAttribute('aria-valuetext', value);
  }

  if (eventType) {
    await expect(mountResult.valueEl).toContainText(`eventType: ${eventType}`);
  }
}

test.describe('useResizeHandle', () => {
  test('mouse can be used for dragging', async ({ mount }) => {
    const result = await mountTest(mount);

    await result.dragEl.dragTo(result.staticEl);
    await validateComponent(result, { value: '235px', eventType: 'mouse' });
  });

  test('keyboard can be used for resizing', async ({ mount, page }) => {
    const result = await mountTest(mount);

    await result.dragEl.focus();
    await page.keyboard.press('ArrowRight');
    await validateComponent(result, { value: '70px', eventType: 'keyboard' });
    await page.keyboard.press('ArrowLeft');
    await validateComponent(result, { value: '50px', eventType: 'keyboard' });
  });

  test('value could be changed imperatively', async ({ mount }) => {
    const result = await mountTest(mount);

    await result.dragEl.dragTo(result.staticEl);
    await validateComponent(result, { value: '235px', eventType: 'mouse' });

    await result.resetEl.click();
    await validateComponent(result, { value: '50px', eventType: 'setValue' });
  });

  test.describe('CSS clamp', () => {
    test('cannot exceed min with mouse', async ({ mount }) => {
      const result = await mountTest(mount, { useCSSClamp: true });

      await result.dragEl.dragTo(result.spacerBefore);
      await validateComponent(result, { value: '40px', eventType: 'mouse' });
    });

    test('cannot exceed max with mouse', async ({ mount }) => {
      const result = await mountTest(mount, { useCSSClamp: true });

      await result.dragEl.dragTo(result.spacerAfter);
      await validateComponent(result, { value: '400px', eventType: 'mouse' });
    });

    test('cannot exceed with keyboard', async ({ mount, page }) => {
      const result = await mountTest(mount, { useCSSClamp: true });
      await result.dragEl.focus();

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowRight');
      }

      await validateComponent(result, {
        value: '400px',
        eventType: 'keyboard',
      });

      // ---

      await result.resetEl.click();
      await result.dragEl.focus();

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowLeft');
      }

      await validateComponent(result, { value: '40px', eventType: 'keyboard' });
    });
  });

  test.describe("min/max value can't be exceeded", () => {
    test('with mouse (min)', async ({ mount }) => {
      const result = await mountTest(mount, { minValue: 30 });

      await result.dragEl.dragTo(result.spacerBefore);
      await validateComponent(result, { value: '30px', eventType: 'mouse' });
    });

    test('with mouse (max)', async ({ mount }) => {
      const result = await mountTest(mount, { maxValue: 300 });

      await result.dragEl.dragTo(result.spacerAfter);
      await validateComponent(result, { value: '300px', eventType: 'mouse' });
    });

    test('with keyboard', async ({ mount, page }) => {
      const result = await mountTest(mount, { minValue: 30, maxValue: 300 });
      await result.dragEl.focus();

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowRight');
      }

      await validateComponent(result, {
        value: '300px',
        eventType: 'keyboard',
      });

      // ---

      await result.resetEl.click();
      await result.dragEl.focus();

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('ArrowLeft');
      }
      await validateComponent(result, { value: '30px', eventType: 'keyboard' });
    });
  });

  test.describe('relative', () => {
    test('mouse can be used for dragging', async ({ mount }) => {
      const result = await mountTest(mount, { relative: true });

      await result.dragEl.dragTo(result.staticEl);
      await validateComponent(result, {
        value: '185px',
        domValue: '235px',
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
        value: '-35px',
        domValue: '40px',
        skipAriaCheck: true,
      });

      // ---

      await page.mouse.move(100, 0);
      await page.mouse.up();

      await validateComponent(result, {
        value: '35px',
        domValue: '85px',
        skipAriaCheck: true,
      });
    });

    test('value could be changed imperatively', async ({ mount }) => {
      const result = await mountTest(mount, { relative: true });

      await result.dragEl.dragTo(result.staticEl);
      await validateComponent(result, {
        value: '185px',
        domValue: '235px',
        skipAriaCheck: true,
      });

      await result.resetEl.click();
      await validateComponent(result, {
        value: '0px',
        domValue: '50px',
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
      await validateComponent(result, { value: '235px', eventType: 'mouse' });
    });
  });

  test.describe('unit (viewport)', () => {
    test('mouse can be used for dragging', async ({ mount }) => {
      const result = await mountTest(mount, { unit: 'viewport' });

      await result.dragEl.dragTo(result.staticEl);
      await validateComponent(result, {
        value: '47vw',
        domValue: '235px',
        eventType: 'mouse',
      });
    });

    test('keyboard can be used for resizing', async ({ mount, page }) => {
      const result = await mountTest(mount, { unit: 'viewport' });

      await result.dragEl.focus();
      await page.keyboard.press('ArrowRight');

      await validateComponent(result, {
        value: '14vw',
        domValue: '70px',
        eventType: 'keyboard',
      });
    });
  });

  test.describe('events', () => {
    test('events are called in order', async ({ mount, page }) => {
      const onDragStart = createSpyFn();
      const onDragEnd = createSpyFn();
      const onChange = createSpyFn();

      const result = await mountTest(mount, {
        onDragStart,
        onDragEnd,
        onChange,
      });

      // Drag start
      // --------------------

      await result.dragEl.hover();

      await page.mouse.down();
      await page.mouse.move(100, 0);

      await validateComponent(result, { value: '85px', eventType: 'mouse' });

      expect(onDragStart.calls).toHaveLength(1);
      expect(onDragEnd.calls).toHaveLength(0);
      expect(onChange.call).toHaveLength(1);

      expect(onDragStart.calls[0].time).toBeLessThan(onChange.calls[0].time);

      // Drag end
      // --------------------

      await page.mouse.move(200, 0);
      await page.mouse.up();

      await validateComponent(result, { value: '185px', eventType: 'mouse' });

      expect(onDragStart.calls).toHaveLength(1);
      expect(onDragEnd.calls).toHaveLength(1);
      expect(onChange.calls).toHaveLength(2);
      expect(onChange.calls[1].time).toBeLessThan(onDragEnd.calls[0].time);
    });

    test("exceeding `clamp()` don't fire 'onChange' events", async ({
      mount,
    }) => {
      const onChange = createSpyFn();
      const result = await mountTest(mount, { onChange, useCSSClamp: true });

      // Drag to the left
      // ---

      const spacerBefore = await result.resizableEl.boundingBox();

      await result.dragEl.dragTo(result.resizableEl, {
        targetPosition: {
          x: spacerBefore.x + 10,
          y: spacerBefore.y,
        },
      });

      await validateComponent(result, { value: '40px', eventType: 'mouse' });
      expect(onChange.calls.length).toBeGreaterThan(0);

      // ---

      onChange.clear();
      await result.dragEl.dragTo(result.spacerBefore);

      await validateComponent(result, { value: '40px', eventType: 'mouse' });
      expect(onChange.calls).toHaveLength(0);

      // Drag to the right
      // ---

      const staticRect = await result.staticEl.boundingBox();

      await result.dragEl.dragTo(result.staticEl, {
        targetPosition: {
          x: staticRect.x + 400,
          y: staticRect.y,
        },
      });

      await validateComponent(result, { value: '400px', eventType: 'mouse' });
      expect(onChange.calls.length).toBeGreaterThan(0);

      // ---

      onChange.clear();
      await result.dragEl.dragTo(result.spacerAfter);

      await validateComponent(result, { value: '400px', eventType: 'mouse' });
      expect(onChange.calls).toHaveLength(0);
    });

    test.describe('onChangeRejected', () => {
      test.describe('CSS clamp', () => {
        test('is called with mouse', async ({ mount }) => {
          const onChangeRejected = createSpyFn();
          const result = await mountTest(mount, {
            onChangeRejected,
            useCSSClamp: true,
          });

          await result.dragEl.dragTo(result.spacerBefore);

          expect(onChangeRejected.calls).toHaveLength(1);
          expect(onChangeRejected.calls[0].args).toEqual([
            expect.any(Object),
            expect.objectContaining({
              type: 'mouse',
              rejectedValue: 0,
              value: 40,
              unit: 'px',
            }),
          ]);

          // ---

          onChangeRejected.clear();
          await result.dragEl.dragTo(result.spacerAfter);

          expect(onChangeRejected.calls).toHaveLength(1);
          expect(onChangeRejected.calls[0].args).toEqual([
            expect.any(Object),
            expect.objectContaining({
              type: 'mouse',
              rejectedValue: 480,
              value: 400,
              unit: 'px',
            }),
          ]);
        });
      });

      test('is called with keyboard', async ({ mount, page }) => {
        const onChangeRejected = createSpyFn();
        const result = await mountTest(mount, {
          onChangeRejected,
          useCSSClamp: true,
        });

        await result.dragEl.focus();

        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('ArrowLeft');
        }

        // "rejectedValue" will be always the same i.e. 20px due "defaultStep"
        expect(onChangeRejected.calls).toHaveLength(2);
        expect(onChangeRejected.calls[0].args).toEqual([
          expect.any(Object),
          expect.objectContaining({
            type: 'keyboard',
            rejectedValue: 20,
            value: 40,
            unit: 'px',
          }),
        ]);
        expect(onChangeRejected.calls[1].args).toEqual([
          expect.any(Object),
          expect.objectContaining({
            type: 'keyboard',
            rejectedValue: 20,
            value: 40,
            unit: 'px',
          }),
        ]);

        // ---

        onChangeRejected.clear();
        await result.resetEl.click();
        await result.dragEl.focus();

        for (let i = 0; i < 20; i++) {
          await page.keyboard.press('ArrowRight');
        }

        expect(onChangeRejected.calls).toHaveLength(2);
        expect(onChangeRejected.calls[0].args).toEqual([
          expect.any(Object),
          expect.objectContaining({
            type: 'keyboard',
            rejectedValue: 420,
            value: 400,
            unit: 'px',
          }),
        ]);
      });
    });
  });
});
