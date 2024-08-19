import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';

import { TestArea } from './useResizeHandleExample.component-browser-spec';

test.use({ viewport: { width: 500, height: 500 } });

test.describe('useResizeHandle', () => {
  test('"onChange" is called after dragging', async ({ mount, page }) => {
    const component = await mount(<TestArea />);

    const dragHandle = component.getByRole('separator');
    const valueEl = component.getByTestId('value');

    await expect(valueEl).toContainText('Default value');

    // Drag the handle to the right
    await dragHandle.hover();
    await page.mouse.down();
    await page.mouse.move(100, 0);
    await page.mouse.up();

    await expect(valueEl).toContainText('--width: 83px;');
  });
});
