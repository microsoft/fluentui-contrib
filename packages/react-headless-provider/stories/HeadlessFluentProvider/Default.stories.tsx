import {
  createDOMRenderer,
  makeStyles,
  Button,
  RendererProvider,
  Tooltip,
  shorthands,
  webLightTheme,
} from '@fluentui/react-components';
import type { PartialTheme } from '@fluentui/react-components';
import { HeadlessFluentProvider } from '@fluentui-contrib/react-headless-provider';
import * as React from 'react';
import Frame, { useFrame } from 'react-frame-component';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    ...shorthands.gap('5px'),
  },
});

// TODO: should come from Fluent
function createCSSRuleFromTheme(
  theme: PartialTheme | undefined,
  selector: string
): string {
  if (theme) {
    const cssVarsAsString = (
      Object.keys(theme) as (keyof typeof theme)[]
    ).reduce((cssVarRule, cssVar) => {
      return `${cssVarRule}--${cssVar}: ${theme[cssVar]}; `;
    }, '');

    return `${selector} { ${cssVarsAsString} }`;
  }

  return '';
}

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

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { document: targetDocument } = useFrame();
  const renderer = React.useMemo(
    () => createDOMRenderer(targetDocument),
    [targetDocument]
  );

  return (
    <RendererProvider renderer={renderer} targetDocument={targetDocument}>
      <HeadlessFluentProvider targetDocument={targetDocument}>
        {children}
      </HeadlessFluentProvider>
    </RendererProvider>
  );
};

const ThemeInjector: React.FC<{ theme: PartialTheme }> = ({ theme }) => {
  const cssRule = React.useMemo(
    () => createCSSRuleFromTheme(theme, ':root'),
    [theme]
  );

  return <style dangerouslySetInnerHTML={{ __html: cssRule }} />;
};

export const Default = () => {
  return (
    <Frame style={{ border: '2px dotted green', width: 500 }}>
      <ThemeInjector theme={webLightTheme} />
      <AppProvider>
        <Container />
      </AppProvider>
    </Frame>
  );
};

Default.parameters = {
  docs: {
    description: {
      story: [
        `This example uses <code>iframe</code> to sandbox styles, but it's not
      mandatory in a real world.`,
        `This example uses <code>HeadlessFluentProvider</code> to provide proper
      context values for components (including a proper <code>document</code>
      instance), but does not apply CSS for the theme. CSS for theme is
      applied globally (to \`:root\`) in this example.`,
      ].join('\n'),
    },
  },
};
