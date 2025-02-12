# @fluentui-contrib/react-themeless-provider

This package provides `ThemelessFluentProvider`, a replacement for `FluentProvider` when the provider needs to be rendered inside shadow DOM.

`ThemelessFluentProvider` does not render the theme contexts or inject theme CSS custom properties into the DOM. When using this provider you are responsible for setting the necessary CSS custom properties in such a way that they will pierce the shadow DOM (e.g., apply them to `:root`).

## Install

```sh
yarn add @fluentui-contrib/react-themeless-provider
# or
npm install @fluentui-contrib/react-themeless-provider
```

## Usage

```tsx
import * as React from 'react';
import { root } from '@fluentui-contrib/react-shadow';
import { ThemelessFluentProvider } from '@fluentui-contrib/react-themeless-provider';
import { createCSSRuleFromTheme, webLightTheme, Button } from '@fluentui/react-components';

export function App() {
  React.useEffect(() => {
    // Example of how to create a style that will piece the shadow DOM.
    // This does not need to be created by React and can be created
    // by a host Web Component application for example.
    const cssRule = createCSSRuleFromTheme(':root', webLightTheme);
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule(cssRule);

    return () => {
      document.head.removeChild(style);
    }
  }, []);

  return (
    {/* renders a shadow root */}
    <root.div>
     <ThemelessFluentProvider>
        <Button>A themed Fluent React Button in shadow DOM</Button>
      </ThemelessFluentProvider>
    </root.div>
  );
}
```
