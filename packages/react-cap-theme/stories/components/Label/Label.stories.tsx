import * as React from 'react';
import { Label, type LabelProps } from '@fluentui-contrib/react-cap-theme';
import { Badge, type BadgeProps } from '@fluentui/react-components';
import { CircleRegular } from '@fluentui/react-icons';
import { CAPThemeExamplesTable } from '../../StorybookUtils';

type LabelStoryProps = Omit<LabelProps, 'badge'> & {
  badgeVisible?: boolean;
  badgeAppearance?: BadgeProps['appearance'];
  badgeShape?: BadgeProps['shape'];
  badgeSize?: BadgeProps['size'];
  badgeColor?: BadgeProps['color'];
};

export const CAPLabelStory = ({
  badgeVisible = true,
  badgeAppearance = 'filled',
  badgeShape = 'rounded',
  badgeSize = 'small',
  badgeColor = 'informative',
  ...props
}: LabelStoryProps) => {
  const badgeContent = badgeVisible ? (
    <Badge
      appearance={badgeAppearance}
      shape={badgeShape}
      size={badgeSize}
      color={badgeColor}
      icon={<CircleRegular />}
    />
  ) : undefined;

  return (
    <CAPThemeExamplesTable
      examples={[
        {
          title: 'Default',
          render() {
            return (
              <Label {...props} badge={badgeContent}>
                Label
              </Label>
            );
          },
        },
        {
          title: 'Required',
          render() {
            return (
              <Label required {...props} badge={badgeContent}>
                Required Label
              </Label>
            );
          },
        },
        {
          title: 'Disabled',
          render() {
            return (
              <Label disabled {...props} badge={badgeContent}>
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
    options: ['brand', 'danger', 'important', 'informative', 'severe', 'subtle', 'success', 'warning'],
    control: { type: 'radio' },
  },
};

CAPLabelStory.args = {
  size: 'medium',
  weight: 'regular',
  badgeVisible: true,
  badgeAppearance: 'ghost',
  badgeShape: 'rounded',
  badgeSize: 'medium',
  badgeColor: 'subtle',
};
