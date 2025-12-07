import * as React from 'react';
import { Label, type LabelProps } from '@fluentui-contrib/react-cap-theme';
import { Badge, type BadgeProps } from '@fluentui/react-components';
import { CircleRegular } from '@fluentui/react-icons';
import { CAPThemeExamplesTable } from '../../StorybookUtils';

const DEFAULT_BADGE: Required<
  Pick<BadgeProps, 'appearance' | 'shape' | 'size' | 'color'>
> = {
  appearance: 'filled',
  shape: 'rounded',
  size: 'small',
  color: 'informative',
};

type LabelStoryProps = Omit<LabelProps, 'badge'> & {
  badgeVisible?: boolean;
  badgeAppearance?: BadgeProps['appearance'];
  badgeShape?: BadgeProps['shape'];
  badgeSize?: BadgeProps['size'];
  badgeColor?: BadgeProps['color'];
  badgeIcon?: boolean;
};

export const CAPLabelStory = ({
  badgeVisible = true,
  badgeAppearance = DEFAULT_BADGE.appearance,
  badgeShape = DEFAULT_BADGE.shape,
  badgeSize = DEFAULT_BADGE.size,
  badgeColor = DEFAULT_BADGE.color,
  badgeIcon = false,
  ...props
}: LabelStoryProps) => {
  const getBadge = () =>
    badgeVisible ? (
      <Badge
        appearance={badgeAppearance}
        shape={badgeShape}
        size={badgeSize}
        color={badgeColor}
        icon={<CircleRegular />}
      ></Badge>
    ) : undefined;

  return (
    <CAPThemeExamplesTable
      examples={[
        {
          title: 'Default',
          render() {
            return (
              <Label {...props} badge={getBadge()}>
                Label
              </Label>
            );
          },
        },
        {
          title: 'Required',
          render() {
            return (
              <Label required {...props} badge={getBadge()}>
                Required Label
              </Label>
            );
          },
        },
        {
          title: 'Disabled',
          render() {
            return (
              <Label disabled {...props} badge={getBadge()}>
                Disabled Label
              </Label>
            );
          },
        },
      ]}
    />
  );
};

CAPLabelStory.argTypes = {
  size: {
    options: ['small', 'medium', 'large'],
    control: { type: 'radio' },
  },
  weight: {
    options: ['regular', 'semibold'],
    control: { type: 'radio' },
  },
  badgeVisible: {
    control: { type: 'boolean' },
  },
  badgeAppearance: {
    options: ['filled', 'ghost', 'outline', 'tint'],
    control: { type: 'radio' },
  },
  badgeShape: {
    options: ['rounded', 'circular', 'square'],
    control: { type: 'radio' },
  },
  badgeSize: {
    options: ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'],
    control: { type: 'radio' },
  },
  badgeColor: {
    options: [
      'brand',
      'danger',
      'important',
      'informative',
      'severe',
      'subtle',
      'success',
      'warning',
    ],
    control: { type: 'radio' },
  },
  badgeIcon: {
    control: { type: 'boolean' },
  },
};

CAPLabelStory.args = {
  size: 'medium',
  weight: 'regular',
  badgeVisible: true,
  badgeAppearance: DEFAULT_BADGE.appearance,
  badgeShape: DEFAULT_BADGE.shape,
  badgeSize: DEFAULT_BADGE.size,
  badgeColor: DEFAULT_BADGE.color,
  badgeIcon: false,
};
