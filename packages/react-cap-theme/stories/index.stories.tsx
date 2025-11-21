import * as React from 'react';
import { Meta } from '@storybook/react';

export { CAPBadgeStory as Badge } from './components/Badge.stories';
export { CAPButtonStory as Button } from './components/Button.stories';
export { CAPCardStory as Card } from './components/Card.stories';
export { CAPInputStory as Input } from './components/Input.stories';
export { CAPMenuStory as Menu } from './components/Menu.stories';
export { CAPTooltipStory as Tooltip } from './components/Tooltip.stories';

const VisualRefreshStory = () => <div />;

export default {
  title: 'Components/Visual Refresh',
  component: VisualRefreshStory,
  parameters: {},
} as Meta;
