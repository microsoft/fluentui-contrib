import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { VirtualizedMeetingsNavigationFixture } from './fixtures/VirtualizedMeetingsNavigation.fixture';

test.use({ viewport: { width: 1400, height: 1000 } });

test.describe('Virtualized meetings navigation', () => {
  test('Home and End move across virtualized section headers', async ({
    mount,
    page,
  }) => {
    const component = await mount(<VirtualizedMeetingsNavigationFixture />);
    const firstSection = component.locator('[data-item-id="meeting-day-0"]');
    const lastSection = component.locator('[data-item-id="meeting-day-7"]');

    await expect(lastSection).toHaveCount(0);
    await firstSection.focus();
    await expect(firstSection).toBeFocused();

    await page.keyboard.press('End');
    await expect(lastSection).toBeFocused();

    await page.keyboard.press('Home');
    await expect(firstSection).toBeFocused();
  });

  test('ArrowLeft from a child row focuses the parent section', async ({
    mount,
    page,
  }) => {
    const component = await mount(<VirtualizedMeetingsNavigationFixture />);
    const firstSection = component.locator('[data-item-id="meeting-day-0"]');
    const firstMeeting = component.locator(
      '[data-item-id="meeting-day-0-meeting-0"]'
    );

    await firstMeeting.focus();
    await expect(firstMeeting).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(firstSection).toBeFocused();
  });

  test('ArrowLeft returns from first cell to row before focusing the parent section', async ({
    mount,
    page,
  }) => {
    const component = await mount(<VirtualizedMeetingsNavigationFixture />);
    const firstSection = component.locator('[data-item-id="meeting-day-0"]');
    const firstMeeting = component.locator(
      '[data-item-id="meeting-day-0-meeting-0"]'
    );
    const firstMeetingButton = firstMeeting.getByRole('button');

    await firstMeeting.focus();
    await expect(firstMeeting).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(firstMeetingButton).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(firstMeeting).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(firstSection).toBeFocused();
  });
});
