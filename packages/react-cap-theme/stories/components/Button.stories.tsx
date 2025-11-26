import * as React from 'react';
import { Button, type ButtonProps } from '@fluentui/react-components';
import { CAPThemeExamples, useCAPThemeSelection } from '../utils.stories';
import {
  bundleIcon,
  CalendarMonthFilled,
  CalendarMonthRegular,
} from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const buttonAppearances = [
  'secondary',
  'primary',
  'outline',
  'subtle',
  'transparent',
  'tint',
] as const;

const buttonStates = ['default', 'hover', 'active', 'focus', 'disabled'] as const;

const stateId = (
  appearance: (typeof buttonAppearances)[number],
  state: (typeof buttonStates)[number]
) => `cap-button-${appearance}-${state}`;

type ButtonStoryProps = Pick<
  ButtonProps,
  'disabledFocusable' | 'iconPosition' | 'shape' | 'size'
>;

export const CAPButtonStory = ({
  disabledFocusable = false,
  iconPosition = 'before',
  shape = 'rounded',
  size = 'medium',
}: ButtonStoryProps) => {
  const selectedTheme = useCAPThemeSelection();
  const commonButtonProps: Partial<ButtonProps> = {
    iconPosition,
    shape,
    size,
  };

  React.useEffect(() => {
    // Force pseudo-state classes back onto the demo buttons whenever the story re-renders for a new theme or arg change.
    buttonAppearances.forEach((appearance) => {
      const hoverButton = document.getElementById(stateId(appearance, 'hover'));
      hoverButton?.classList.add('pseudo-hover');

      const activeButton = document.getElementById(stateId(appearance, 'active'));
      activeButton?.classList.add('pseudo-hover', 'pseudo-active');

      const focusButton = document.getElementById(stateId(appearance, 'focus'));
      if (focusButton) {
        focusButton.classList.add('pseudo-focus-visible');
        focusButton.setAttribute('data-fui-focus-visible', 'true');
      }
    });
  }, [selectedTheme, iconPosition, shape, size, disabledFocusable]);

  return (
    <CAPThemeExamples
      examples={[
        {
          title: 'States Overview',
          render() {
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '32px 24px' }}>
                {buttonAppearances.map((appearance) => {
                  return (
                    <div
                      key={appearance}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px',
                      }}
                    >
                      <div style={{ fontWeight: 600, textTransform: 'capitalize', width: '100px', textAlign: 'right', margin: '0 24px 0 0' }}>
                        {appearance}
                      </div>
                      <Button
                        id={stateId(appearance, 'default')}
                        icon={<CalendarMonthRegular />}
                        {...commonButtonProps}
                        appearance={appearance}
                      >
                        Default
                      </Button>
                      <Button
                        id={stateId(appearance, 'hover')}
                        icon={<CalendarMonthRegular />}
                        {...commonButtonProps}
                        appearance={appearance}
                      >
                        Hover
                      </Button>
                      <Button
                        id={stateId(appearance, 'active')}
                        icon={<CalendarMonthRegular />}
                        {...commonButtonProps}
                        appearance={appearance}
                      >
                        Pressed
                      </Button>
                      <Button
                        id={stateId(appearance, 'focus')}
                        icon={<CalendarMonthRegular />}
                        {...commonButtonProps}
                        appearance={appearance}
                      >
                        Focus
                      </Button>
                      <Button
                        id={stateId(appearance, 'disabled')}
                        icon={<CalendarMonthRegular />}
                        {...commonButtonProps}
                        appearance={appearance}
                        disabled
                        disabledFocusable={disabledFocusable}
                      >
                        Disabled
                      </Button>
                    </div>
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

CAPButtonStory.parameters = {
  pseudo: {
    hover: buttonAppearances.map((appearance) => `#${stateId(appearance, 'hover')}`),
    active: buttonAppearances.map((appearance) => `#${stateId(appearance, 'active')}`),
    focusVisible: buttonAppearances.map((appearance) => `#${stateId(appearance, 'focus')}`),
  },
};

CAPButtonStory.argTypes = {
  disabledFocusable: {
    control: false,
    table: { disable: true },
  },
  iconPosition: {
    options: ['before', 'after'],
    control: { type: 'radio' },
  },
  shape: {
    options: ['rounded', 'circular', 'square'],
    control: { type: 'radio' },
  },
  size: {
    options: ['small', 'medium', 'large'],
    control: { type: 'radio' },
  },
};

CAPButtonStory.args = {
  disabledFocusable: false,
  iconPosition: 'before',
  shape: 'rounded',
  size: 'medium',
};
