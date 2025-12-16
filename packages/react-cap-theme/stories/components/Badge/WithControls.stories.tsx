import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-components';
import { CAPThemeExamples } from '../../StorybookUtils';
import { CircleRegular } from '@fluentui/react-icons';

const badgeAppearances = ['outline', 'filled', 'ghost', 'tint'] as const;

const badgeSizes = [
  'tiny',
  'extra-small',
  'small',
  'medium',
  'large',
  'extra-large',
] as const;

export const CAPBadgeWithCtrlsStory = ({
  color,
  iconPosition,
  shape,
}: {
  color: BadgeProps['color'];
  iconPosition: BadgeProps['iconPosition'];
  shape: BadgeProps['shape'];
}) => {
  return (
    <CAPThemeExamples
      examples={[
        {
          title: 'States Overview',
          render() {
            return (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px repeat(5, 1fr)',
                  gap: '24px',
                  padding: '32px 24px',
                }}
              >
                {/* Header row */}
                <div></div>
                {badgeAppearances.map((appearance) => (
                  <div
                    key={appearance}
                    style={{
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      textAlign: 'center',
                    }}
                  >
                    {appearance}
                  </div>
                ))}
                <div
                  style={{
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  Icon Only / Filled
                </div>

                {/* Data rows */}
                {badgeSizes.map((size) => {
                  return (
                    <React.Fragment key={size}>
                      <div
                        style={{
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          textAlign: 'right',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                      >
                        {size}
                      </div>
                      {badgeAppearances.map((appearance) => (
                        <div
                          key={appearance}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {size === 'tiny' || size === 'extra-small' ? (
                            <Badge
                              appearance={appearance}
                              size={size}
                              color={color}
                              iconPosition={iconPosition}
                              shape={shape}
                              icon={<CircleRegular />}
                            />
                          ) : (
                            <Badge
                              appearance={appearance}
                              size={size}
                              color={color}
                              iconPosition={iconPosition}
                              shape={shape}
                              icon={<CircleRegular />}
                            >
                              badge
                            </Badge>
                          )}
                        </div>
                      ))}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Badge
                          appearance="filled"
                          size={size}
                          color={color}
                          shape={shape}
                          icon={<CircleRegular />}
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            );
          },
        },
      ]}
    />
  );
};

CAPBadgeWithCtrlsStory.argTypes = {
  color: {
    options: [
      'neutral',
      'brand',
      'strong',
      'important',
      'severe',
      'warning',
      'success',
      'informative',
    ],
    control: { type: 'radio' },
  },
  iconPosition: {
    options: ['before', 'after'],
    control: { type: 'radio' },
  },
  shape: {
    options: ['rounded', 'circular', 'square'],
    control: { type: 'radio' },
  },
};

CAPBadgeWithCtrlsStory.args = {
  color: 'brand',
  iconPosition: 'before',
  shape: 'rounded',
};
