import * as React from 'react';
import type { Meta } from '@storybook/react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Combobox,
  CompoundButton,
  Dropdown,
  FluentProvider,
  Image,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  Input,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Option,
  SplitButton,
  Tag,
  TagGroup,
  Text,
  ToggleButton,
  Toolbar,
  ToolbarButton,
  makeStyles,
  tokens,
  type FluentProviderProps,
} from '@fluentui/react-components';
import {
  CalendarRegular,
  CalendarFilled,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  CAP_STYLE_HOOKS,
  CAP_STYLE_HOOKS_ROUNDED_CORNERS,
} from '../../../src/index';

const CalendarIcon = bundleIcon(CalendarFilled, CalendarRegular);

type StyleHooks = NonNullable<FluentProviderProps['customStyleHooks_unstable']>;

// The global preview decorator wraps every story in a CAP-themed FluentProvider
// with the full CAP_STYLE_HOOKS, and nested providers *merge* their hooks with
// the ancestor's. To compare against stock Fluent we neutralize every CAP hook
// with an identity override; the rounded column then re-applies only the
// radius hooks on top of that neutral baseline. (Both columns still inherit the
// CAP theme tokens, so CAP's larger radii resolve in the right column.)
const neutralizedCapHooks = Object.fromEntries(
  Object.keys(CAP_STYLE_HOOKS).map((key) => [key, (state: unknown) => state])
) as StyleHooks;

const roundedHooks: StyleHooks = {
  ...neutralizedCapHooks,
  ...CAP_STYLE_HOOKS_ROUNDED_CORNERS,
};

const sampleImage =
  "data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='90'><rect width='140' height='90' fill='%230f6cbd'/></svg>";

const useStyles = makeStyles({
  compare: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalXXXL,
    alignItems: 'start',
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  cellLabel: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  row: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

const Compare: React.FC<{ render: () => React.ReactNode }> = ({ render }) => {
  const styles = useStyles();
  return (
    <div className={styles.compare}>
      <div className={styles.cell}>
        <span className={styles.cellLabel}>Fluent v9</span>
        <FluentProvider customStyleHooks_unstable={neutralizedCapHooks}>
          <div className={styles.row}>{render()}</div>
        </FluentProvider>
      </div>
      <div className={styles.cell}>
        <span className={styles.cellLabel}>Rounded</span>
        <FluentProvider customStyleHooks_unstable={roundedHooks}>
          <div className={styles.row}>{render()}</div>
        </FluentProvider>
      </div>
    </div>
  );
};

type Story = (() => React.ReactElement) & { storyName?: string };

/** Builds a story that compares a single component default-vs-rounded. */
const example =
  (render: () => React.ReactNode): Story =>
  () =>
    <Compare render={render} />;

export const ButtonExample = example(() => (
  <>
    <Button>Default</Button>
    <Button appearance="primary">Primary</Button>
    <Button size="small">Small</Button>
    <Button size="large">Large</Button>
    <Button shape="circular">Circular</Button>
    <Button shape="square">Square</Button>
    <Button icon={<CalendarIcon />} title="Icon only" />
  </>
));

export const CompoundButtonExample = example(() => (
  <>
    <CompoundButton secondaryContent="Secondary">Default</CompoundButton>
    <CompoundButton appearance="primary" secondaryContent="Secondary">
      Primary
    </CompoundButton>
  </>
));

export const ToggleButtonExample = example(() => (
  <>
    <ToggleButton>Off</ToggleButton>
    <ToggleButton defaultChecked>On</ToggleButton>
  </>
));

export const SplitButtonExample = example(() => (
  <Menu positioning="below-start">
    <MenuTrigger disableButtonEnhancement>
      {(triggerProps) => (
        <SplitButton menuButton={triggerProps}>Split</SplitButton>
      )}
    </MenuTrigger>
    <MenuPopover>
      <MenuList>
        <MenuItem>Item one</MenuItem>
        <MenuItem>Item two</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
));

export const InputExample = example(() => (
  <>
    <Input placeholder="Outline" />
    <Input appearance="underline" placeholder="Underline" />
    <Input size="small" placeholder="Small" />
  </>
));

export const ComboboxExample = example(() => (
  <Combobox placeholder="Pick a color">
    <Option>Red</Option>
    <Option>Green</Option>
    <Option>Blue</Option>
  </Combobox>
));

export const DropdownExample = example(() => (
  <Dropdown placeholder="Pick a number">
    <Option>One</Option>
    <Option>Two</Option>
    <Option>Three</Option>
  </Dropdown>
));

export const CheckboxExample = example(() => (
  <>
    <Checkbox label="Unchecked" />
    <Checkbox label="Checked" defaultChecked />
  </>
));

export const TagExample = example(() => (
  <TagGroup>
    <Tag>Medium</Tag>
    <Tag size="small">Small</Tag>
    <Tag shape="circular">Circular</Tag>
  </TagGroup>
));

export const InteractionTagExample = example(() => (
  <TagGroup>
    <InteractionTag>
      <InteractionTagPrimary hasSecondaryAction>
        Interaction
      </InteractionTagPrimary>
      <InteractionTagSecondary aria-label="dismiss" />
    </InteractionTag>
  </TagGroup>
));

export const MenuItemExample = example(() => (
  <MenuList style={{ minWidth: '180px' }}>
    <MenuItem>New</MenuItem>
    <MenuItem>Open</MenuItem>
    <MenuItem>Save</MenuItem>
  </MenuList>
));

export const AvatarExample = example(() => (
  <>
    <Avatar shape="square" size={32} name="Cap Theme" />
    <Avatar shape="square" size={48} name="Cap Theme" />
    <Avatar shape="square" size={64} name="Cap Theme" />
  </>
));

export const BadgeExample = example(() => (
  <>
    <Badge size="medium">Medium</Badge>
    <Badge size="extra-large">Extra large</Badge>
    <Badge shape="square" size="extra-large">
      Square
    </Badge>
  </>
));

export const ImageExample = example(() => (
  <Image src={sampleImage} shape="rounded" alt="" />
));

export const ToolbarExample = example(() => (
  <Toolbar>
    <ToolbarButton icon={<CalendarIcon />}>Action</ToolbarButton>
    <ToolbarButton icon={<CalendarIcon />}>Action</ToolbarButton>
  </Toolbar>
));

export const CardExample = example(() => (
  <Card style={{ maxWidth: '260px' }}>
    <Text weight="semibold">Card</Text>
    <Text>Surfaces use the largest CAP radius.</Text>
  </Card>
));

ButtonExample.storyName = 'Button';
CompoundButtonExample.storyName = 'CompoundButton';
ToggleButtonExample.storyName = 'ToggleButton';
SplitButtonExample.storyName = 'SplitButton';
InputExample.storyName = 'Input';
ComboboxExample.storyName = 'Combobox';
DropdownExample.storyName = 'Dropdown';
CheckboxExample.storyName = 'Checkbox';
TagExample.storyName = 'Tag';
InteractionTagExample.storyName = 'InteractionTag';
MenuItemExample.storyName = 'MenuItem';
AvatarExample.storyName = 'Avatar';
BadgeExample.storyName = 'Badge';
ImageExample.storyName = 'Image';
ToolbarExample.storyName = 'Toolbar';
CardExample.storyName = 'Card';

const meta = {
  title: 'Packages/react-cap-theme/Design Language/Rounded Corners',
  // Hide the per-component stories from the sidebar so this shows up as a
  // single docs-only nav item (like "Getting Started"). The `!dev` tag removes
  // them from the sidebar while they keep the inherited `docs` tag, so they
  // still render in the "Components" section of the docs page.
  tags: ['!dev'],
} satisfies Meta;

export default meta;
