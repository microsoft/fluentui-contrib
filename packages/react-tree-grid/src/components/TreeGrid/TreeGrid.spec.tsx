import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { TreeGridExample } from './TreeGridExample.spec';

test.use({ viewport: { width: 500, height: 500 } });

test('should have subtrees closed by default', async ({ mount }) => {
  const component = await mount(<TreeGridExample />);
  await expect(component).toBeVisible();
  await expect(component.getByTestId('level-1-row-1')).toBeVisible();
  await expect(component.getByTestId('level-1-row-2')).toBeVisible();
  await expect(component.getByTestId('level-2-row-1')).not.toBeVisible();
  await expect(component.getByTestId('level-2-row-2')).not.toBeVisible();
  await expect(component.getByTestId('level-2-row-3')).not.toBeVisible();
  await expect(component.getByTestId('level-2-row-4')).not.toBeVisible();
});

test.describe('Click interaction', () => {
  test('should open/close subtree on row click', async ({ mount }) => {
    const component = await mount(<TreeGridExample />);
    await expect(component.getByTestId('level-1-row-1')).toBeVisible();
    await component
      .getByTestId('level-1-row-1')
      .getByRole('columnheader')
      .click();
    await expect(component.getByTestId('level-2-row-1')).toBeVisible();
    await component
      .getByTestId('level-1-row-1')
      .getByRole('columnheader')
      .click();
    await expect(component.getByTestId('level-2-row-1')).not.toBeVisible();
  });
  test('should not open/close subtree on button click', async ({ mount }) => {
    const component = await mount(<TreeGridExample />);
    await expect(component.getByTestId('level-1-row-1')).toBeVisible();
    await component
      .getByTestId('level-1-row-1')
      .getByRole('button')
      .first()
      .click();
    await expect(component.getByTestId('level-2-row-1')).not.toBeVisible();
  });
  test('should not open/close subtree on subtree click', async ({ mount }) => {
    const component = await mount(<TreeGridExample defaultOpen />);
    await expect(component.getByTestId('level-2-row-1')).toBeVisible();
    await component
      .getByTestId('level-2-row-1')
      .getByRole('columnheader')
      .click();
    await expect(component.getByTestId('level-2-row-1')).toBeVisible();
  });
  test('should not open/close subtree on subtree button click', async ({
    mount,
  }) => {
    const component = await mount(<TreeGridExample defaultOpen />);
    await expect(component.getByTestId('level-2-row-1')).toBeVisible();
    await component
      .getByTestId('level-2-row-1')
      .getByRole('button')
      .first()
      .click();
    await expect(component.getByTestId('level-2-row-1')).toBeVisible();
  });
});

test.describe('Keyboard interaction', () => {
  test.describe('row', () => {
    test.describe('Enter', () => {
      test('should toggle subtree', async ({ mount }) => {
        const component = await mount(<TreeGridExample />);
        await expect(component.getByTestId('level-2-row-1')).not.toBeVisible();
        await component.getByTestId('level-1-row-1').press('Enter');
        await expect(component.getByTestId('level-2-row-1')).toBeVisible();
        await component.getByTestId('level-1-row-1').press('Enter');
        await expect(component.getByTestId('level-2-row-1')).not.toBeVisible();
      });
    });
    test.describe('Escape', () => {
      test('should do nothing', async ({ mount }) => {
        const component = await mount(<TreeGridExample />);
        await expect(component.getByTestId('level-2-row-1')).not.toBeVisible();
        await component.getByTestId('level-1-row-1').press('Escape');
        await expect(component.getByTestId('level-2-row-1')).not.toBeVisible();
      });
    });
    test.describe('ArrowRight', () => {
      test('if subtree closed, should open subtree', async ({ mount }) => {
        const component = await mount(<TreeGridExample />);
        await expect(component.getByTestId('level-2-row-1')).not.toBeVisible();
        await component.getByTestId('level-1-row-1').press('ArrowRight');
        await expect(component.getByTestId('level-2-row-1')).toBeVisible();
      });
      test('if subtree opened, should focus next focusable element on row', async ({
        mount,
      }) => {
        const component = await mount(<TreeGridExample defaultOpen />);
        await expect(component.getByTestId('level-2-row-1')).toBeVisible();
        await component.getByTestId('level-2-row-1').press('ArrowRight');
        await expect(
          component.getByTestId('level-2-row-1').getByRole('button').first()
        ).toBeFocused();
      });
    });
    test.describe('ArrowLeft', () => {
      test('if subtree opened, should close subtree', async ({ mount }) => {
        const component = await mount(<TreeGridExample defaultOpen />);
        await expect(component.getByTestId('level-2-row-1')).toBeVisible();
        await component.getByTestId('level-1-row-1').press('ArrowLeft');
        await expect(component.getByTestId('level-2-row-1')).not.toBeVisible();
      });
      test('if subtree closed, should focus parent row', async ({ mount }) => {
        const component = await mount(<TreeGridExample defaultOpen />);
        await expect(component.getByTestId('level-2-row-1')).toBeVisible();
        await component.getByTestId('level-2-row-1').press('ArrowLeft');
        await expect(component.getByTestId('level-1-row-1')).toBeFocused();
      });
    });
    test.describe('ArrowUp', () => {
      test('should focus previous row', async ({ mount }) => {
        const component = await mount(<TreeGridExample />);
        await component.getByTestId('level-1-row-2').press('ArrowUp');
        await expect(component.getByTestId('level-1-row-1')).toBeFocused();
      });
    });
    test.describe('ArrowDown', () => {
      test('should focus next row', async ({ mount }) => {
        const component = await mount(<TreeGridExample />);
        await component.getByTestId('level-1-row-1').press('ArrowDown');
        await expect(component.getByTestId('level-1-row-2')).toBeFocused();
      });
    });
  });
  test.describe('focusable element', () => {
    test.describe('Escape', () => {
      test('should focus current row', async ({ mount }) => {
        const component = await mount(<TreeGridExample />);
        await component
          .getByTestId('level-1-row-1')
          .getByRole('button')
          .first()
          .press('Escape');
        await expect(component.getByTestId('level-1-row-1')).toBeFocused();
      });
    });
    test.describe('ArrowRight', () => {
      test('should focus next focusable element', async ({ mount }) => {
        const component = await mount(<TreeGridExample />);
        await component
          .getByTestId('level-1-row-1')
          .getByRole('button')
          .first()
          .press('ArrowRight');
        await expect(
          component.getByTestId('level-1-row-1').getByRole('button').nth(1)
        ).toBeFocused();
      });
    });
    test.describe('ArrowLeft', () => {
      test('should focus previous focusable element', async ({ mount }) => {
        const component = await mount(<TreeGridExample />);
        await component
          .getByTestId('level-1-row-1')
          .getByRole('button')
          .nth(1)
          .press('ArrowLeft');
        await expect(
          component.getByTestId('level-1-row-1').getByRole('button').first()
        ).toBeFocused();
      });
      test('if no previous focusable element, should focus row', async ({
        mount,
      }) => {
        const component = await mount(<TreeGridExample />);
        await component
          .getByTestId('level-1-row-1')
          .getByRole('button')
          .first()
          .press('ArrowLeft');
        await expect(component.getByTestId('level-1-row-1')).toBeFocused();
      });
    });
    test.describe('ArrowUp', () => {
      test('should focus previous row', async ({ mount }) => {
        const component = await mount(<TreeGridExample />);
        await component
          .getByTestId('level-1-row-2')
          .getByRole('button')
          .first()
          .press('ArrowUp');
        await expect(component.getByTestId('level-1-row-1')).toBeFocused();
      });
    });
    test.describe('ArrowDown', () => {
      test('should focus next row', async ({ mount }) => {
        const component = await mount(<TreeGridExample />);
        await component
          .getByTestId('level-1-row-1')
          .getByRole('button')
          .first()
          .press('ArrowDown');
        await expect(component.getByTestId('level-1-row-2')).toBeFocused();
      });
    });
  });
});
