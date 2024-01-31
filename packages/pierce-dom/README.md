# @fluentui-contrib/pierce-dom

This package provides "shadow DOM aware" implementatons of browser DOM APIs allowing, for example, traversal of DOM trees containing shadow roots.

## Background

Consider the following HTML snippet:

```html
<button>Light DOM button</button>
<custom-element>
  #shadow-root
  <button>Shadow DOM button</button>
</custom-element>
```

When `Light DOM button` has focus `document.activeElement` points to the DOM node associated with this element. When `Shadow DOM button` has focus `document.activeElement` points to `<custom-element>`, which is probably not useful information for your application.

This can be worked around by inspecting [ShadowRoot.activeElement](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/activeElement) to get a reference to the actual focused element.

## Limitations

`pierce-dom` only supports open shadow roots. Closed shadow roots are ignored.

Slots support is not implemented yet.

## Using with FluentUI React keyboarg navigation

```sh
yarn add @fluentui-contrib/pierce-dom

npm install @fluentui-contrib/pierce-dom
```

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { FluentProvider } from '@fluentui/react-components';
import { useShadowDOMSupport } from '@fluentui-contrib/pierce-dom';

import App from './App';

const ShadowDOMSupport = () => {
  // This hook must be called before the app starts rendering the UI.
  useShadowDOMSupport();
  return null;
};

ReactDOM.render(
  <FluentProvider>
    <ShadowDOMSupport />
    <App />
  </FluentProvider>,
  document.getElementById('root')
);
```
