import type { Meta } from '@storybook/react';
import { AppLauncher } from '@fluentui-contrib/react-app-launcher';
import description from '../../README.md';

const meta = {
  title: 'Packages/react-app-launcher/AppLauncher',
  component: AppLauncher,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
} satisfies Meta<typeof AppLauncher>;

export default meta;

export { KitchenSink } from './KitchenSink.stories';
export { DockedToAppBar } from './DockedToAppBar.stories';
export { FullDock } from './FullDock.stories';
export { TriggerAnchoredList } from './TriggerAnchoredList.stories';
export { ToolbarTrigger } from './ToolbarTrigger.stories';
export { DisabledItems } from './DisabledItems.stories';
export { IconTreatments } from './IconTreatments.stories';
export { SearchStates } from './SearchStates.stories';
export { ControlledOpen } from './ControlledOpen.stories';
export { ItemActions } from './ItemActions.stories';
export { Localization } from './Localization.stories';
export { BrandedBars } from './BrandedBars.stories';
