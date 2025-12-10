import * as React from 'react';
import { Button, type ButtonProps } from '@fluentui-contrib/react-cap-theme';
import { CAPThemeExamples, useCAPThemeSelection } from '../StorybookUtils';
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
] as const;

type ButtonState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';

const stateId = (
  appearance: (typeof buttonAppearances)[number],
  state: ButtonState
) => `cap-button-${appearance}-${state}`;

const hoverSelectors = buttonAppearances.map(
  (appearance) => `#${stateId(appearance, 'hover')}`
);
const activeSelectors = buttonAppearances.map(
  (appearance) => `#${stateId(appearance, 'active')}`
);
const focusSelectors = buttonAppearances.map(
  (appearance) => `#${stateId(appearance, 'focus')}`
);

export const CAPButtonWithCtrlsStory = ({
  disabledFocusable = false,
  iconPosition = 'before',
  shape = 'rounded',
  size = 'medium',
}: ButtonProps) => {
  const selectedTheme = useCAPThemeSelection();
  const commonButtonProps: ButtonProps = {
    iconPosition,
    shape,
    size,
  };

  React.useEffect(() => {
    // Force pseudo-state classes back onto the demo buttons whenever the story re-renders for a new theme or arg change.
    const doc = globalThis?.document;
    if (!doc) {
      return;
    }

    buttonAppearances.forEach((appearance) => {
      const hoverButton = doc.getElementById(stateId(appearance, 'hover'));
      hoverButton?.classList.add('pseudo-hover');

      const activeButton = doc.getElementById(stateId(appearance, 'active'));
      activeButton?.classList.add('pseudo-hover', 'pseudo-active');

      const focusButton = doc.getElementById(stateId(appearance, 'focus'));
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  padding: '32px 24px',
                }}
              >
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
                      <div
                        style={{
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          width: '100px',
                          textAlign: 'right',
                          margin: '0 24px 0 0',
                        }}
                      >
                        {appearance}
                      </div>
                      <Button
                        id={stateId(appearance, 'default')}
                        icon={<CalendarMonth />}
                        {...commonButtonProps}
                        appearance={appearance}
                      >
                        Default
                      </Button>
                      <Button
                        id={stateId(appearance, 'hover')}
                        icon={<CalendarMonth />}
                        {...commonButtonProps}
                        appearance={appearance}
                      >
                        Hover
                      </Button>
                      <Button
                        id={stateId(appearance, 'active')}
                        icon={<CalendarMonth />}
                        {...commonButtonProps}
                        appearance={appearance}
                      >
                        Pressed
                      </Button>
                      <Button
                        id={stateId(appearance, 'focus')}
                        icon={<CalendarMonth />}
                        {...commonButtonProps}
                        appearance={appearance}
                      >
                        Focus
                      </Button>
                      <Button
                        id={stateId(appearance, 'disabled')}
                        icon={<CalendarMonth />}
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

CAPButtonWithCtrlsStory.parameters = {
  pseudo: {
    // Keep pressed buttons hovered too since older Button styles rely on :hover:active
    hover: [...hoverSelectors, ...activeSelectors],
    active: activeSelectors,
    focusVisible: focusSelectors,
  },
};

CAPButtonWithCtrlsStory.argTypes = {
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

CAPButtonWithCtrlsStory.args = {
  disabledFocusable: false,
  iconPosition: 'before',
  shape: 'rounded',
  size: 'medium',
};
