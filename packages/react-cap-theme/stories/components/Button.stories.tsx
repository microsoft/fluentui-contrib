import * as React from 'react';
import { Button, type ButtonProps } from '@fluentui-contrib/react-cap-theme';
import { Button as FluentButton } from '@fluentui/react-components';
import {
  CAPThemeComparisonSlider,
  CAPThemeExamples,
  useCAPThemeSelection,
} from '../StorybookUtils';
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
  state: ButtonState,
  prefix = 'cap'
) => `${prefix}-button-${appearance}-${state}`;

const makeSelectors = (state: ButtonState, prefix = 'cap') =>
  buttonAppearances.map((appearance) => `#${stateId(appearance, state, prefix)}`);

const hoverSelectors = makeSelectors('hover');
const activeSelectors = makeSelectors('active');
const focusSelectors = makeSelectors('focus');
const sliderPrefixes = ['slider-v9', 'slider-cap'] as const;
const sliderHoverSelectors = sliderPrefixes.flatMap((prefix) =>
  makeSelectors('hover', prefix)
);
const sliderActiveSelectors = sliderPrefixes.flatMap((prefix) =>
  makeSelectors('active', prefix)
);
const sliderFocusSelectors = sliderPrefixes.flatMap((prefix) =>
  makeSelectors('focus', prefix)
);

const renderStatesGrid = (
  ButtonComponent: React.ElementType,
  idPrefix: string,
  commonButtonProps: Pick<ButtonProps, 'iconPosition' | 'shape' | 'size'>,
  disabledFocusable: boolean
) => {
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
            <ButtonComponent
              id={stateId(appearance, 'default', idPrefix)}
              icon={<CalendarMonth />}
              {...commonButtonProps}
              appearance={appearance}
            >
              Default
            </ButtonComponent>
            <ButtonComponent
              id={stateId(appearance, 'hover', idPrefix)}
              icon={<CalendarMonth />}
              {...commonButtonProps}
              appearance={appearance}
            >
              Hover
            </ButtonComponent>
            <ButtonComponent
              id={stateId(appearance, 'active', idPrefix)}
              icon={<CalendarMonth />}
              {...commonButtonProps}
              appearance={appearance}
            >
              Pressed
            </ButtonComponent>
            <ButtonComponent
              id={stateId(appearance, 'focus', idPrefix)}
              icon={<CalendarMonth />}
              {...commonButtonProps}
              appearance={appearance}
            >
              Focus
            </ButtonComponent>
            <ButtonComponent
              id={stateId(appearance, 'disabled', idPrefix)}
              icon={<CalendarMonth />}
              {...commonButtonProps}
              appearance={appearance}
              disabled
              disabledFocusable={disabledFocusable}
            >
              Disabled
            </ButtonComponent>
          </div>
        );
      })}
    </div>
  );
};

export const CAPButtonStory = ({
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

    const applyPseudoStates = (prefix: string) => {
      buttonAppearances.forEach((appearance) => {
        const hoverButton = doc.getElementById(stateId(appearance, 'hover', prefix));
        hoverButton?.classList.add('pseudo-hover');

        const activeButton = doc.getElementById(stateId(appearance, 'active', prefix));
        activeButton?.classList.add('pseudo-hover', 'pseudo-active');

        const focusButton = doc.getElementById(stateId(appearance, 'focus', prefix));
        if (focusButton) {
          focusButton.classList.add('pseudo-focus-visible');
          focusButton.setAttribute('data-fui-focus-visible', 'true');
        }
      });
    };

    // Main table + both slider layers
    applyPseudoStates('cap');
    applyPseudoStates('slider-v9');
    applyPseudoStates('slider-cap');
  }, [selectedTheme, iconPosition, shape, size, disabledFocusable]);

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <CAPThemeComparisonSlider
          example={{
            render: (variant) =>
              renderStatesGrid(
                variant === 'v9' ? FluentButton : Button,
                variant === 'v9' ? 'slider-v9' : 'slider-cap',
                commonButtonProps,
                disabledFocusable
              ),
          }}
          ariaLabel="Drag to compare default Fluent and visual refresh buttons"
        />
      </div>

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
                          id={stateId(appearance, 'default', 'cap')}
                          icon={<CalendarMonth />}
                          {...commonButtonProps}
                          appearance={appearance}
                        >
                          Default
                        </Button>
                        <Button
                          id={stateId(appearance, 'hover', 'cap')}
                          icon={<CalendarMonth />}
                          {...commonButtonProps}
                          appearance={appearance}
                        >
                          Hover
                        </Button>
                        <Button
                          id={stateId(appearance, 'active', 'cap')}
                          icon={<CalendarMonth />}
                          {...commonButtonProps}
                          appearance={appearance}
                        >
                          Pressed
                        </Button>
                        <Button
                          id={stateId(appearance, 'focus', 'cap')}
                          icon={<CalendarMonth />}
                          {...commonButtonProps}
                          appearance={appearance}
                        >
                          Focus
                        </Button>
                        <Button
                          id={stateId(appearance, 'disabled', 'cap')}
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
    </>
  );
};

CAPButtonStory.parameters = {
  pseudo: {
    // Keep pressed buttons hovered too since older Button styles rely on :hover:active
    hover: [
      ...hoverSelectors,
      ...activeSelectors,
      ...sliderHoverSelectors,
      ...sliderActiveSelectors,
    ],
    active: [...activeSelectors, ...sliderActiveSelectors],
    focusVisible: [...focusSelectors, ...sliderFocusSelectors],
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
