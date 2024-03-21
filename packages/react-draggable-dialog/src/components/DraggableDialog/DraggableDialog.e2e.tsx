import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';

const Example = () => {
  return <div>Example</div>;
};

test.use({ viewport: { width: 500, height: 500 } });

test('should render basic component', async ({ mount }) => {
  const component = await mount(<Example />);
  await expect(component).toBeVisible();
});
