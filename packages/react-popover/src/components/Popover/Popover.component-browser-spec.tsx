import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';

import {
  UncontrolledExample,
  ControlledExample,
  OpenOnHoverExample,
  CustomTriggerExample,
  ContextPopoverExample,
  CloseOnScrollExample,
  NestedExample,
  UpdatingContentExample,
  InlineExample,
  LegacyTrapFocusExample,
  LegacyTrapFocusDisabledExample,
  InertTrapFocusExample,
  TrapFocusWithTabIndexExample,
  ExternalIframeExample,
  InternalIframeExample,
  NestedInternalIframeExample,
  RestoreFocusExample,
  PopoverWithMenuExample,
} from './PopoverExamples.component-browser-spec';

test.use({ viewport: { width: 500, height: 500 } });

const popoverTriggerSelector = '[aria-expanded]';
const popoverContentSelector = '[role="group"]';
const popoverInteractiveContentSelector = '[role="dialog"]';

test.describe('Popover - uncontrolled', () => {
  test('should open when clicked', async ({ mount, page }) => {
    await mount(<UncontrolledExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeVisible();
  });

  test('should open with Enter', async ({ mount, page }) => {
    await mount(<UncontrolledExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.focus();
    await page.keyboard.press('Enter');

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeVisible();
  });

  test('should open with Space', async ({ mount, page }) => {
    await mount(<UncontrolledExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.focus();
    await page.keyboard.press('Space');

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeVisible();
  });

  test('should dismiss on click outside', async ({ mount, page }) => {
    await mount(<UncontrolledExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    await page.mouse.click(450, 450);

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeHidden();
  });

  test('should dismiss on Escape keydown', async ({ mount, page }) => {
    await mount(<UncontrolledExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    await page.keyboard.press('Escape');

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeHidden();
  });

  test('should keep open state on scroll outside', async ({ mount, page }) => {
    await mount(<UncontrolledExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeVisible();

    await page.mouse.wheel(0, 100);

    await expect(popover).toBeVisible();
  });
});

test.describe('Popover - controlled', () => {
  test('should open when clicked', async ({ mount, page }) => {
    await mount(<ControlledExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeVisible();
  });

  test('should open with Enter', async ({ mount, page }) => {
    await mount(<ControlledExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.focus();
    await page.keyboard.press('Enter');

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeVisible();
  });

  test('should open with Space', async ({ mount, page }) => {
    await mount(<ControlledExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.focus();
    await page.keyboard.press('Space');

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeVisible();
  });

  test('should dismiss on click outside', async ({ mount, page }) => {
    await mount(<ControlledExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    await page.mouse.click(450, 450);

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeHidden();
  });

  test('should dismiss on Escape keydown', async ({ mount, page }) => {
    await mount(<ControlledExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    await page.keyboard.press('Escape');

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeHidden();
  });

  test('should keep open state on scroll outside', async ({ mount, page }) => {
    await mount(<ControlledExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeVisible();

    await page.mouse.wheel(0, 100);

    await expect(popover).toBeVisible();
  });
});

test.describe('Open on hover', () => {
  test('should open on hover, and keep open on mouse move to content', async ({
    mount,
    page,
  }) => {
    await mount(<OpenOnHoverExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.hover();

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeVisible();

    await popover.hover();
    await expect(popover).toBeVisible();
  });
});

test.describe('With custom trigger', () => {
  test('should dismiss on click outside', async ({ mount, page }) => {
    await mount(<CustomTriggerExample />);

    await page.mouse.click(450, 450);

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeHidden();
  });
});

test.describe('Context popover', () => {
  test('should open when right clicked', async ({ mount, page }) => {
    await mount(<ContextPopoverExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click({ button: 'right' });

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeVisible();
  });

  test('should dismiss on scroll outside', async ({ mount, page }) => {
    await mount(<ContextPopoverExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click({ button: 'right' });

    await page.mouse.wheel(0, 100);

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeHidden();
  });
});

test.describe('popover with closeOnScroll', () => {
  test('should dismiss on scroll outside', async ({ mount, page }) => {
    await mount(<CloseOnScrollExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeVisible();

    await page.mouse.wheel(0, 100);

    await expect(popover).toBeHidden();
  });
});

test.describe('Nested', () => {
  test('should trap focus with tab', async ({ mount, page }) => {
    await mount(<NestedExample />);

    await page.getByRole('button', { name: 'Root trigger' }).click();
    await page.getByRole('button', { name: 'First nested trigger' }).click();
    await page
      .getByRole('button', { name: 'Second nested trigger' })
      .first()
      .click();

    const focusedBefore = await page.evaluate(
      // eslint-disable-next-line no-restricted-globals
      () => document.activeElement?.textContent
    );

    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');

    const focusedAfter = await page.evaluate(
      // eslint-disable-next-line no-restricted-globals
      () => document.activeElement?.textContent
    );

    expect(focusedBefore).toBe(focusedAfter);
  });

  test('should trap focus with shift+tab', async ({ mount, page }) => {
    await mount(<NestedExample />);

    await page.getByRole('button', { name: 'Root trigger' }).click();
    await page.getByRole('button', { name: 'First nested trigger' }).click();
    await page
      .getByRole('button', { name: 'Second nested trigger' })
      .first()
      .click();

    const focusedBefore = await page.evaluate(
      // eslint-disable-next-line no-restricted-globals
      () => document.activeElement?.textContent
    );

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');

    const focusedAfter = await page.evaluate(
      // eslint-disable-next-line no-restricted-globals
      () => document.activeElement?.textContent
    );

    expect(focusedBefore).toBe(focusedAfter);
  });

  test('should dismiss all nested popovers on outside click', async ({
    mount,
    page,
  }) => {
    await mount(<NestedExample />);

    await page.getByRole('button', { name: 'Root trigger' }).click();
    await page.getByRole('button', { name: 'First nested trigger' }).click();
    await page
      .getByRole('button', { name: 'Second nested trigger' })
      .first()
      .click();

    await page.mouse.click(450, 450);

    const popover = page.locator(popoverInteractiveContentSelector);
    await expect(popover).toBeHidden();
  });

  test('should not dismiss when clicking on nested content', async ({
    mount,
    page,
  }) => {
    await mount(<NestedExample />);

    await page.getByRole('button', { name: 'Root trigger' }).click();
    await page.getByRole('button', { name: 'First nested trigger' }).click();
    await page
      .getByRole('button', { name: 'Second nested trigger' })
      .first()
      .click();

    await page.getByRole('button', { name: 'Second nested button' }).click();

    const popover = page.locator(popoverInteractiveContentSelector);
    await expect(popover).toHaveCount(3);
  });

  test('should dismiss child popovers when clicking on parents', async ({
    mount,
    page,
  }) => {
    await mount(<NestedExample />);

    await page.getByRole('button', { name: 'Root trigger' }).click();
    await page.getByRole('button', { name: 'First nested trigger' }).click();
    await page
      .getByRole('button', { name: 'Second nested trigger' })
      .first()
      .click();

    await page.getByRole('button', { name: 'First nested button' }).click();

    let popover = page.locator(popoverInteractiveContentSelector);
    await expect(popover).toHaveCount(2);

    await page.getByRole('button', { name: 'Root button' }).click();

    popover = page.locator(popoverInteractiveContentSelector);
    await expect(popover).toHaveCount(1);
  });

  test('when opening a sibling popover, should dismiss other sibling popover', async ({
    mount,
    page,
  }) => {
    await mount(<NestedExample />);

    await page.getByRole('button', { name: 'Root trigger' }).click();
    await page.getByRole('button', { name: 'First nested trigger' }).click();
    await page
      .getByRole('button', { name: 'Second nested trigger' })
      .first()
      .click();

    let popover = page.locator(popoverInteractiveContentSelector);
    await expect(popover).toHaveCount(3);

    await page
      .getByRole('button', { name: 'Second nested trigger' })
      .nth(1)
      .click();

    popover = page.locator(popoverInteractiveContentSelector);
    await expect(popover).toHaveCount(3);
  });

  test('should dismiss each popover in the stack with Escape keydown', async ({
    mount,
    page,
  }) => {
    await mount(<NestedExample />);

    await page.getByRole('button', { name: 'Root trigger' }).click();
    await page.getByRole('button', { name: 'First nested trigger' }).click();
    await page
      .getByRole('button', { name: 'Second nested trigger' })
      .first()
      .click();

    await page.keyboard.press('Escape');
    let popover = page.locator(popoverInteractiveContentSelector);
    await expect(popover).toHaveCount(2);

    await page.keyboard.press('Escape');
    popover = page.locator(popoverInteractiveContentSelector);
    await expect(popover).toHaveCount(1);

    await page.keyboard.press('Escape');
    popover = page.locator(popoverInteractiveContentSelector);
    await expect(popover).toBeHidden();
  });
});

test.describe('updating content', () => {
  test('should not close popover', async ({ mount, page }) => {
    await mount(<UpdatingContentExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeVisible();

    await popover.locator('button').click();

    await expect(popover).toBeAttached();
  });
});

test.describe('with inline prop', () => {
  test('should render PopoverSurface in DOM order', async ({ mount, page }) => {
    await mount(<InlineExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeVisible();

    const triggerElement = await trigger.evaluateHandle((el) => el);
    const popoverPrev = await popover.evaluateHandle(
      (el) => el.previousElementSibling
    );

    const areSame = await page.evaluate(
      ([trigger, prev]) => trigger === prev,
      [triggerElement, popoverPrev]
    );

    expect(areSame).toBe(true);
  });

  test.describe('legacy focus trap behaviour', () => {
    test('Tab should not go to the window', async ({ mount, page }) => {
      await mount(<LegacyTrapFocusExample />);

      const trigger = page.locator(popoverTriggerSelector);
      await trigger.focus();
      await page.keyboard.press('Enter');

      const buttonOne = page.getByRole('button', { name: 'One' });
      await expect(buttonOne).toBeFocused();

      await page.keyboard.press('Tab');

      const buttonTwo = page.getByRole('button', { name: 'Two' });
      await expect(buttonTwo).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(buttonOne).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(buttonTwo).toBeFocused();
    });

    test('should work as inertTrapFocus when set to false', async ({
      mount,
      page,
    }) => {
      await mount(<LegacyTrapFocusDisabledExample />);

      const trigger = page.locator(popoverTriggerSelector);
      await trigger.focus();
      await page.keyboard.press('Enter');

      const buttonOne = page.getByRole('button', { name: 'One' });
      await expect(buttonOne).toBeFocused();

      await page.keyboard.press('Tab');

      const buttonTwo = page.getByRole('button', { name: 'Two' });
      await expect(buttonTwo).toBeFocused();

      await page.keyboard.press('Tab');

      const focused = await page.evaluate(
        // eslint-disable-next-line no-restricted-globals
        () => document.activeElement?.tagName
      );
      expect(focused).toBe('BODY');
    });
  });

  test.describe('inert focus trap behaviour', () => {
    test('Tab should go to the window', async ({ mount, page }) => {
      await mount(<InertTrapFocusExample />);

      const trigger = page.locator(popoverTriggerSelector);
      await trigger.focus();
      await page.keyboard.press('Enter');

      const buttonOne = page.getByRole('button', { name: 'One' });
      await expect(buttonOne).toBeFocused();

      await page.keyboard.press('Tab');

      const buttonTwo = page.getByRole('button', { name: 'Two' });
      await expect(buttonTwo).toBeFocused();

      await page.keyboard.press('Tab');

      const focused = await page.evaluate(
        // eslint-disable-next-line no-restricted-globals
        () => document.activeElement?.tagName
      );
      expect(focused).toBe('BODY');
    });
  });

  test.describe('trap focus behaviour', () => {
    test('should focus on PopoverSurface when its tabIndex is a number', async ({
      mount,
      page,
    }) => {
      await mount(<TrapFocusWithTabIndexExample />);

      const trigger = page.locator(popoverTriggerSelector);
      await trigger.focus();
      await page.keyboard.press('Enter');

      const surface = page.locator('#popover-surface');
      await expect(surface).toBeFocused();

      await page.keyboard.press('Tab');

      const buttonOne = page.getByRole('button', { name: 'One' });
      await expect(buttonOne).toBeFocused();

      await page.keyboard.press('Tab');

      const buttonTwo = page.getByRole('button', { name: 'Two' });
      await expect(buttonTwo).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(buttonOne).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(buttonTwo).toBeFocused();
    });
  });
});

test.describe('with Iframe', () => {
  test('should close when focus is on an external iframe', async ({
    mount,
    page,
  }) => {
    await mount(<ExternalIframeExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    await page.frameLocator('iframe').locator('button').focus();

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeHidden();
  });

  test('should not close when focus is on an internal iframe', async ({
    mount,
    page,
  }) => {
    await mount(<InternalIframeExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    await page.frameLocator('iframe').locator('button').focus();

    // Wait for polling to detect iframe focus
    await page.waitForTimeout(2000);

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeAttached();
  });

  test('should not close when focus is on an internal iframe in a nested popover', async ({
    mount,
    page,
  }) => {
    await mount(<NestedInternalIframeExample />);

    const triggers = page.locator(popoverTriggerSelector);
    await triggers.first().click();
    await triggers.nth(1).click();

    await page.frameLocator('iframe').locator('button').focus();

    // Wait for polling to detect iframe focus
    await page.waitForTimeout(2000);

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toHaveCount(2);
  });
});

test.describe('Without trapFocus', () => {
  test('should restore focus on close', async ({ mount, page }) => {
    await mount(<RestoreFocusExample />);

    const trigger = page.locator('#trigger');
    await trigger.click();

    const popover = page.locator(popoverContentSelector);
    await expect(popover).toBeAttached();

    const button = page.locator('#button');
    await button.focus();
    await page.keyboard.press('Escape');

    await expect(popover).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});

test.describe('Opens menu', () => {
  test('should keep focus in popover once menu is dismissed with mouse', async ({
    mount,
    page,
  }) => {
    await mount(<PopoverWithMenuExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    const menuTrigger = page.locator('#menu-trigger');
    await menuTrigger.click();

    const firstItem = page.locator('#first-item');
    await expect(firstItem).toBeFocused();

    await menuTrigger.click();

    await expect(firstItem).toBeHidden();
    await expect(menuTrigger).toBeFocused();
  });

  test('should keep focus in popover once menu is dismissed with keyboard', async ({
    mount,
    page,
  }) => {
    await mount(<PopoverWithMenuExample />);

    const trigger = page.locator(popoverTriggerSelector);
    await trigger.click();

    const menuTrigger = page.locator('#menu-trigger');
    await menuTrigger.click();

    const firstItem = page.locator('#first-item');
    await expect(firstItem).toBeFocused();

    await page.keyboard.press('Escape');

    await expect(menuTrigger).toBeFocused();
  });
});
