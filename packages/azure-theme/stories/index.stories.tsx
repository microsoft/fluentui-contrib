import { Meta } from '@storybook/react';
import description from '../README.md';

import { AllControls } from './All.stories';
export { AccordionExample } from './Accordion.stories';
export { AvatarExample } from './Avatar.stories';
export { AvatarGroupExample } from './AvatarGroup.stories';
export { BadgeExample } from './Badge.stories';
export { BreadcrumbExample } from './Breadcrumb.stories';
export { ButtonsExample } from './Buttons.stories';
export { CardsExample } from './Cards.stories';
export { CheckBoxExample } from './Checkbox.stories';
export { ComboBoxExample } from './Combobox.stories';
export { DataGridExample } from './DataGrid.stories';
export { DialogExample } from './Dialog.stories';
export { DividerExample } from './Divider.stories';
export { DrawerExample } from './Drawer.stories';
export { DropDownExample } from './Dropdown.stories';
export { FieldExample } from './Field.stories';
export { InputExample } from './Input.stories';
export { LabelExample } from './Label.stories';
export { LinkExample } from './Link.stories';
export { MenuExample } from './Menu.stories';
export { MessageBarExample } from './MessageBar.stories';
export { OverflowExample } from './Overflow.stories';
export { PersonaExample } from './Persona.stories';
export { PopoverExample } from './Popover.stories';
export { RadioGroupExample } from './RadioGroup.stories';
export { SelectExample } from './Select.stories';
export { SkeletonExample } from './Skeleton.stories';
export { SliderExample } from './Slider.stories';
export { SpinButtonExample } from './SpinButton.stories';
export { SwitchExample } from './Switch.stories';
export { TableExample } from './Table.stories';
export { TabListExample } from './TabList.stories';
export { TextExample } from './Text.stories';
export { TextAreaExample } from './Textarea.stories';
export { ToastExample } from './Toast.stories';
export { ToolbarExample } from './Toolbar.stories';
export { ToolTipExample } from './Tooltip.stories';
export { TreeExample } from './Tree.stories';

// Using AllControls component in meta
const meta: Meta<typeof AllControls> = {
  title: 'Packages/azure-theme',
  component: AllControls,
  parameters: {
    docs: {
      description: {
        component: description,
      },
      hideArgsTable: true,
    },
  },
};

export default meta;
