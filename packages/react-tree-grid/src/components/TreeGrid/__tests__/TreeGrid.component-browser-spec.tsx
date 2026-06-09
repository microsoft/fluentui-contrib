import * as React from 'react';
import {
  test,
  expect,
  type Locator,
  type Page,
} from '@playwright/experimental-ct-react';
import { TreeGridExample } from './fixtures/TreeGridExample.fixture';

test.use({ viewport: { width: 500, height: 500 } });

const pressKey = async (
  page: Page,
  target: Locator,
  key: string
): Promise<void> => {
  await target.focus();
  await expect(target).toBeFocused();
  await page.keyboard.press(key);
};

const clickTarget = async (page: Page, target: Locator): Promise<void> => {
  await expect(target).toBeVisible();
  await target.scrollIntoViewIfNeeded();

  const box = await target.boundingBox();
  if (!box) {
    throw new Error('Expected click target to have a bounding box.');
  }

  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
};

test('should have subtrees closed by default', async ({ mount }) => {
  const component = await mount(<TreeGridExample />);
  await expect(component).toBeVisible();
  await expect(component.getByTestId('level-1-row-1')).toBeVisible();
  await expect(component.getByTestId('level-1-row-2')).toBeVisible();
  await expect(component.getByTestId('level-2-row-1')).toBeHidden();
  await expect(component.getByTestId('level-2-row-2')).toBeHidden();
  await expect(component.getByTestId('level-2-row-3')).toBeHidden();
  await expect(component.getByTestId('level-2-row-4')).toBeHidden();
});

test.describe('Click interaction', () => {
  test('should open/close subtree on row click', async ({ mount, page }) => {
    const component = await mount(<TreeGridExample />);
    const firstRowHeader = component
      .getByTestId('level-1-row-1')
      .getByRole('rowheader');

    await expect(component.getByTestId('level-1-row-1')).toBeVisible();
    await clickTarget(page, firstRowHeader);
    await expect(component.getByTestId('level-2-row-1')).toBeVisible();
    await clickTarget(page, firstRowHeader);
    await expect(component.getByTestId('level-2-row-1')).toBeHidden();
  });
  test('should not open/close subtree on button click', async ({
    mount,
    page,
  }) => {
    const component = await mount(<TreeGridExample />);
    const firstRowButton = component
      .getByTestId('level-1-row-1')
      .getByRole('button')
      .first();

    await expect(component.getByTestId('level-1-row-1')).toBeVisible();
    await clickTarget(page, firstRowButton);
    await expect(component.getByTestId('level-2-row-1')).toBeHidden();
  });
  test('should not open/close subtree on subtree click', async ({
    mount,
    page,
  }) => {
    const component = await mount(<TreeGridExample defaultOpen />);
    const firstSubtreeHeader = component
      .getByTestId('level-2-row-1')
      .getByRole('rowheader');

    await expect(component.getByTestId('level-2-row-1')).toBeVisible();
    await clickTarget(page, firstSubtreeHeader);
    await expect(component.getByTestId('level-2-row-1')).toBeVisible();
  });
  test('should not open/close subtree on subtree button click', async ({
    mount,
    page,
  }) => {
    const component = await mount(<TreeGridExample defaultOpen />);
    const firstSubtreeButton = component
      .getByTestId('level-2-row-1')
      .getByRole('button')
      .first();

    await expect(component.getByTestId('level-2-row-1')).toBeVisible();
    await clickTarget(page, firstSubtreeButton);
    await expect(component.getByTestId('level-2-row-1')).toBeVisible();
  });
});

test.describe('Keyboard interaction', () => {
  test.describe('Breadth-first vertical navigation', () => {
    test('should keep ArrowDown on a row at the same visible level', async ({
      mount,
      page,
    }) => {
      const component = await mount(
        <TreeGridExample defaultOpen verticalNavigationMode="breadth-first" />
      );
      const firstTopLevelRow = component.getByTestId('level-1-row-1');

      await pressKey(page, firstTopLevelRow, 'ArrowDown');

      await expect(component.getByTestId('level-1-row-2')).toBeFocused();
    });

    test('should allow ArrowDown from a focusable header cell to descend', async ({
      mount,
      page,
    }) => {
      const component = await mount(
        <TreeGridExample
          defaultOpen
          focusableHeaderCell
          verticalNavigationMode="breadth-first"
        />
      );
      const firstHeaderCell = component
        .getByTestId('level-1-row-1')
        .getByRole('rowheader');

      await pressKey(page, firstHeaderCell, 'ArrowDown');

      await expect(component.getByTestId('level-2-row-1')).toBeFocused();
    });

    test('should allow ArrowDown inside row content to descend', async ({
      mount,
      page,
    }) => {
      const component = await mount(
        <TreeGridExample defaultOpen verticalNavigationMode="breadth-first" />
      );
      const firstRowButton = component
        .getByTestId('level-1-row-1')
        .getByRole('button')
        .first();

      await pressKey(page, firstRowButton, 'ArrowDown');

      await expect(component.getByTestId('level-2-row-1')).toBeFocused();
    });

    test('should prevent ArrowDown default movement when no later stage handles', async ({
      mount,
      page,
    }) => {
      const component = await mount(
        <TreeGridExample defaultOpen verticalNavigationMode="breadth-first" />
      );
      const lastRow = component.getByTestId('level-2-row-4');

      await pressKey(page, lastRow, 'ArrowDown');

      await expect(lastRow).toBeFocused();
    });

    test('should prevent ArrowDown on the last top-level row from descending into its subtree', async ({
      mount,
      page,
    }) => {
      const component = await mount(
        <TreeGridExample defaultOpen verticalNavigationMode="breadth-first" />
      );
      const lastTopLevelRow = component.getByTestId('level-1-row-2');
      const firstChildRow = component.getByTestId('level-2-row-3');

      await pressKey(page, lastTopLevelRow, 'ArrowDown');

      await expect(lastTopLevelRow).toBeFocused();
      await expect(firstChildRow).not.toBeFocused();
    });
  });

  test.describe('row', () => {
    test.describe('Enter', () => {
      test('should toggle subtree', async ({ mount, page }) => {
        const component = await mount(<TreeGridExample />);
        const firstRow = component.getByTestId('level-1-row-1');

        await expect(component.getByTestId('level-2-row-1')).toBeHidden();
        await pressKey(page, firstRow, 'Enter');
        await expect(component.getByTestId('level-2-row-1')).toBeVisible();
        await pressKey(page, firstRow, 'Enter');
        await expect(component.getByTestId('level-2-row-1')).toBeHidden();
      });
    });
    test.describe('Escape', () => {
      test('should do nothing', async ({ mount, page }) => {
        const component = await mount(<TreeGridExample />);
        const firstRow = component.getByTestId('level-1-row-1');

        await expect(component.getByTestId('level-2-row-1')).toBeHidden();
        await pressKey(page, firstRow, 'Escape');
        await expect(component.getByTestId('level-2-row-1')).toBeHidden();
      });
    });
    test.describe('ArrowRight', () => {
      test('if subtree closed, should open subtree', async ({
        mount,
        page,
      }) => {
        const component = await mount(<TreeGridExample />);
        const firstRow = component.getByTestId('level-1-row-1');

        await expect(component.getByTestId('level-2-row-1')).toBeHidden();
        await pressKey(page, firstRow, 'ArrowRight');
        await expect(component.getByTestId('level-2-row-1')).toBeVisible();
      });
      test('if subtree opened, should focus next focusable element on row', async ({
        mount,
        page,
      }) => {
        const component = await mount(<TreeGridExample defaultOpen />);
        const firstChildRow = component.getByTestId('level-2-row-1');

        await expect(component.getByTestId('level-2-row-1')).toBeVisible();
        await pressKey(page, firstChildRow, 'ArrowRight');
        await expect(
          component.getByTestId('level-2-row-1').getByRole('button').first()
        ).toBeFocused();
      });
    });
    test.describe('ArrowLeft', () => {
      test('if subtree opened, should close subtree', async ({
        mount,
        page,
      }) => {
        const component = await mount(<TreeGridExample defaultOpen />);
        const firstRow = component.getByTestId('level-1-row-1');

        await expect(component.getByTestId('level-2-row-1')).toBeVisible();
        await pressKey(page, firstRow, 'ArrowLeft');
        await expect(component.getByTestId('level-2-row-1')).toBeHidden();
      });
      test('if subtree closed, should focus parent row', async ({
        mount,
        page,
      }) => {
        const component = await mount(<TreeGridExample defaultOpen />);
        const firstChildRow = component.getByTestId('level-2-row-1');

        await expect(component.getByTestId('level-2-row-1')).toBeVisible();
        await pressKey(page, firstChildRow, 'ArrowLeft');
        await expect(component.getByTestId('level-1-row-1')).toBeFocused();
      });
    });
    test.describe('ArrowUp', () => {
      test('should focus previous row', async ({ mount, page }) => {
        const component = await mount(<TreeGridExample />);
        await pressKey(page, component.getByTestId('level-1-row-2'), 'ArrowUp');
        await expect(component.getByTestId('level-1-row-1')).toBeFocused();
      });
    });
    test.describe('ArrowDown', () => {
      test('should focus next row', async ({ mount, page }) => {
        const component = await mount(<TreeGridExample />);
        await pressKey(
          page,
          component.getByTestId('level-1-row-1'),
          'ArrowDown'
        );
        await expect(component.getByTestId('level-1-row-2')).toBeFocused();
      });
    });
  });
  test.describe('focusable element', () => {
    test.describe('Escape', () => {
      test('should focus current row', async ({ mount, page }) => {
        const component = await mount(<TreeGridExample />);
        await pressKey(
          page,
          component.getByTestId('level-1-row-1').getByRole('button').first(),
          'Escape'
        );
        await expect(component.getByTestId('level-1-row-1')).toBeFocused();
      });
    });
    test.describe('ArrowRight', () => {
      test('should focus next focusable element', async ({ mount, page }) => {
        const component = await mount(<TreeGridExample />);
        await pressKey(
          page,
          component.getByTestId('level-1-row-1').getByRole('button').first(),
          'ArrowRight'
        );
        await expect(
          component.getByTestId('level-1-row-1').getByRole('button').nth(1)
        ).toBeFocused();
      });
    });
    test.describe('ArrowLeft', () => {
      test('should focus previous focusable element', async ({
        mount,
        page,
      }) => {
        const component = await mount(<TreeGridExample />);
        await pressKey(
          page,
          component.getByTestId('level-1-row-1').getByRole('button').nth(1),
          'ArrowLeft'
        );
        await expect(
          component.getByTestId('level-1-row-1').getByRole('button').first()
        ).toBeFocused();
      });
      test('if no previous focusable element, should focus row', async ({
        mount,
        page,
      }) => {
        const component = await mount(<TreeGridExample />);
        await pressKey(
          page,
          component.getByTestId('level-1-row-1').getByRole('button').first(),
          'ArrowLeft'
        );
        await expect(component.getByTestId('level-1-row-1')).toBeFocused();
      });
    });
    test.describe('ArrowUp', () => {
      test('should focus previous row', async ({ mount, page }) => {
        const component = await mount(<TreeGridExample />);
        await pressKey(
          page,
          component.getByTestId('level-1-row-2').getByRole('button').first(),
          'ArrowUp'
        );
        await expect(component.getByTestId('level-1-row-1')).toBeFocused();
      });
    });
    test.describe('ArrowDown', () => {
      test('should focus next row', async ({ mount, page }) => {
        const component = await mount(<TreeGridExample />);
        await pressKey(
          page,
          component.getByTestId('level-1-row-1').getByRole('button').first(),
          'ArrowDown'
        );
        await expect(component.getByTestId('level-1-row-2')).toBeFocused();
      });
    });
  });
});
