import * as React from 'react';
import { Avatar, Tag, TagProps } from '@fluentui/react-components';
import { CAPThemeExamples } from '../StorybookUtils';
import { CircleRegular } from '@fluentui/react-icons';

const tagAppearances = ['filled', 'brand', 'outline'] as const;

const tagSizes = ['extra-small', 'small', 'medium'] as const;

export const CAPTagWithCtrlsStory = ({
  avatar,
  disabled,
  dismissible,
  icon,
  secondaryText,

  shape,
}: {
  avatar: TagProps['media'];
  disabled: TagProps['disabled'];
  dismissible: TagProps['dismissible'];
  icon: TagProps['icon'];
  secondaryText: TagProps['secondaryText'];

  shape: TagProps['shape'];
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
                  gridTemplateColumns: '100px repeat(3, 1fr)',
                  gap: '24px',
                  padding: '32px 24px',
                }}
              >
                {/* Header row */}
                <div></div>
                {tagAppearances.map((appearance) => (
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

                {/* Data rows */}
                {tagSizes.map((size) => {
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
                      {tagAppearances.map((appearance) => (
                        <div
                          key={appearance}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Tag
                            appearance={appearance}
                            size={size}
                            shape={shape}
                            {...(secondaryText &&
                              size === 'medium' && {
                                secondaryText: 'Secondary Text',
                              })}
                            {...(icon && { icon: <CircleRegular /> })}
                            {...(avatar && {
                              media: (
                                <Avatar
                                  name="Katri Athokas"
                                  badge={{ status: 'busy' }}
                                />
                              ),
                            })}
                            disabled={disabled}
                            dismissible={dismissible}
                          >
                            Tag
                          </Tag>
                        </div>
                      ))}
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

CAPTagWithCtrlsStory.argTypes = {
  avatar: {
    options: [true, false],
    control: { type: 'boolean' },
  },
  disabled: {
    options: [true, false],
    control: { type: 'boolean' },
  },
  dismissible: {
    options: [true, false],
    control: { type: 'boolean' },
  },
  icon: {
    options: [true, false],
    control: { type: 'boolean' },
  },

  secondaryText: {
    options: [true, false],
    control: { type: 'boolean' },
    description: 'Available only for medium size Tags.',
  },
  shape: {
    options: ['rounded', 'circular'],
    control: { type: 'radio' },
  },
};
CAPTagWithCtrlsStory.args = {
  shape: 'rounded',
  dismissible: false,
  avatar: false,
  icon: false,
  secondaryText: false,
  disabled: false,
};
