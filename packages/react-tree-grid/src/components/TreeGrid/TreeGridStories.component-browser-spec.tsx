import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import {
  ThreadedNavigationFixture,
  ThreadedVirtualizationNavigationFixture,
  VirtualizationNavigationFixture,
} from './TreeGridStories.component-browser-fixture';

test.use({ viewport: { width: 1400, height: 1000 } });

test.describe('Story navigation', () => {
  test('Threaded should move between headers with ArrowUp and ArrowDown', async ({
    mount,
  }) => {
    const component = await mount(<ThreadedNavigationFixture />);
    const firstHeader = component.locator('[data-item-id="thread-401"]');
    const secondHeader = component.locator('[data-item-id="thread-402"]');

    await firstHeader.press('ArrowDown');
    await expect(secondHeader).toBeFocused();

    await secondHeader.press('ArrowUp');
    await expect(firstHeader).toBeFocused();
  });

  test('Virtualization should support Home and End across virtualized section headers', async ({
    mount,
  }) => {
    const component = await mount(<VirtualizationNavigationFixture />);
    const firstSection = component.locator('[data-item-id="meeting-day-0"]');
    const lastSection = component.locator('[data-item-id="meeting-day-7"]');

    await expect(lastSection).toHaveCount(0);

    await firstSection.press('End');
    await expect(lastSection).toBeFocused();

    await lastSection.press('Home');
    await expect(firstSection).toBeFocused();
  });

  test('Virtualization should focus the parent section on ArrowLeft from a child row', async ({
    mount,
  }) => {
    const component = await mount(<VirtualizationNavigationFixture />);
    const firstSection = component.locator('[data-item-id="meeting-day-0"]');
    const firstMeeting = component.locator(
      '[data-item-id="meeting-day-0-meeting-0"]'
    );

    await firstMeeting.press('ArrowLeft');
    await expect(firstSection).toBeFocused();
  });

  test('Threaded virtualization should pass mounted header navigation to breadth-first', async ({
    mount,
  }) => {
    const component = await mount(<ThreadedVirtualizationNavigationFixture />);
    const firstHeader = component.locator('[data-item-id="thread-401"]');
    const secondHeader = component.locator('[data-item-id="thread-402"]');

    await expect(firstHeader).toBeVisible();
    await expect(secondHeader).toBeVisible();

    await firstHeader.press('ArrowDown');
    await expect(secondHeader).toBeFocused();

    await secondHeader.press('ArrowUp');
    await expect(firstHeader).toBeFocused();
  });

  test('Threaded virtualization should handle an off-DOM header target before breadth-first', async ({
    mount,
    browserName,
  }) => {
    test.skip(
      browserName === 'webkit',
      'WebKit component tests do not reliably drive this virtualized Arrow navigation path.'
    );

    const component = await mount(<ThreadedVirtualizationNavigationFixture />);
    const secondHeader = component.locator('[data-item-id="thread-402"]');
    const thirdHeader = component.locator('[data-item-id="thread-403"]');

    await expect(thirdHeader).toHaveCount(0);
    await secondHeader.focus();
    await expect(secondHeader).toBeFocused();

    await secondHeader.press('ArrowDown');
    await expect(thirdHeader).toBeFocused();

    await thirdHeader.press('ArrowUp');
    await expect(secondHeader).toBeFocused();
  });
});
