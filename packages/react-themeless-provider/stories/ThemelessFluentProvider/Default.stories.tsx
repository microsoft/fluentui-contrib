import * as React from 'react';
import {
  makeStyles,
  Button,
  Checkbox,
  Tooltip,
  shorthands,
  webLightTheme,
  FluentProvider,
  useFluent,
} from '@fluentui/react-components';
import type { PartialTheme } from '@fluentui/react-components';
import {
  createCSSStyleSheetFromTheme,
  ThemelessFluentProvider,
} from '@fluentui-contrib/react-themeless-provider';
import { root } from '@fluentui-contrib/react-shadow';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    ...shorthands.gap('5px'),
  },
});

const useShadowDomContainerStyles = makeStyles({
  container: {
    ...shorthands.border('2px', 'solid', 'blue'),
    ...shorthands.padding('30px'),
    position: 'relative',

    '::before': {
      content: '"Shadow DOM container"',
      backgroundColor: 'blue',
      color: 'white',
      position: 'absolute',
      top: '0px',
      left: '0px',
      fontFamily: 'sans-serif',
      ...shorthands.padding('2px'),
    },
  },
});

const Container: React.FC = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <Tooltip content="Hello, world!" relationship="label">
        <Button>Hover me</Button>
      </Tooltip>

      <Button appearance="primary">Primary</Button>
      <Button appearance="subtle">Subtle</Button>
    </div>
  );
};

const useTheme = (theme: PartialTheme, inject = true) => {
  const { targetDocument: doc } = useFluent();

  React.useEffect(() => {
    const sheet = createCSSStyleSheetFromTheme(':root', theme);
    if (inject && doc) {
      doc.adoptedStyleSheets = [...doc.adoptedStyleSheets, sheet];
    }

    return () => {
      if (!doc) {
        return;
      }
      doc.adoptedStyleSheets = doc.adoptedStyleSheets.filter(
        (adoptedSheet) => adoptedSheet !== sheet
      );
    };
  }, [theme, inject]);
};

export const Default = () => {
  const shadowDomContainerStyles = useShadowDomContainerStyles();

  const [fluentProviderEnabled, setFluentProviderEnabled] =
    React.useState(false);

  useTheme(webLightTheme, !fluentProviderEnabled);

  return (
    <>
      <p>
        <code>ThemelessFluentProvider</code> is a replacemenet for{' '}
        <code>FluentProvider</code> when the provider needs to be rendered
        inside shadow DOM.
      </p>
      <p>
        This example demonstrates how <code>ThemelessFluentProvider</code> works
        when tokens are applied to <code>:root</code>.
      </p>

      <p>
        Toggle the checkbox to enable the standard <code>FluentProvider</code>{' '}
        to compare its behavior to <code>ThemelessFluentProvider</code> in
        shadow DOM.
      </p>

      <FluentProvider theme={webLightTheme}>
        <Checkbox
          checked={fluentProviderEnabled}
          onChange={() => setFluentProviderEnabled(!fluentProviderEnabled)}
          label="Use standard FluentProvider"
        />
      </FluentProvider>

      <root.div className={shadowDomContainerStyles.container}>
        {fluentProviderEnabled ? (
          <FluentProvider theme={webLightTheme}>
            <Container />
          </FluentProvider>
        ) : (
          <ThemelessFluentProvider>
            <Container />
          </ThemelessFluentProvider>
        )}
      </root.div>
    </>
  );
};
