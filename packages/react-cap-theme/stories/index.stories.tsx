import * as React from 'react';
import { Meta } from '@storybook/react';

export { CAPBadgeStory as Badge } from './components/Badge.stories';
export { CAPButtonWithCtrlsStory as ButtonWithControls } from './components/Button.stories';
export { CAPCardStory as Card } from './components/Card.stories';
export { CAPDialogStory as Dialog } from './components/Dialog/WithTable';
export { CAPDialogWithCtrlsStory as DialogWithControls } from './components/Dialog/WithControls.stories';
export { CAPDrawerWithCtrlsStory as DrawerWithControls } from './components/Drawer.stories';
export { CAPInputStory as Input } from './components/Input.stories';
export { CAPMenuStory as Menu } from './components/Menu.stories';
export { CAPTooltipStory as Tooltip } from './components/Tooltip.stories';

const VisualRefreshStory = () => <div />;

export default {
  title: 'Components/Visual Refresh',
  component: VisualRefreshStory,
  parameters: {},
} as Meta;
