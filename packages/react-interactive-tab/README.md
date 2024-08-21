# @fluentui-contrib/react-interactive-tab

The `InteractiveTab` component is an extension of the Tab component from `@fluentui/react-components`. It allows you to add interactive elements, such as buttons, inside a tab.

## Installation

To install the `InteractiveTab` component, you can use either npm or yarn:

```sh
npm install @fluentui-contrib/react-interactive-tab
```

or

```sh
yarn add @fluentui-contrib/react-interactive-tab
```

## Usage

To use the `InteractiveTab` component, you need to import it and use it as a child component of the `TabList` component:

```tsx
import { TabList } from '@fluentui-contrib/react-components';
import { InteractiveTab } from '@fluentui-contrib/react-interactive-tab';

<TabList>
  <InteractiveTab contentBefore={<button>x</button>}>Tab 1</InteractiveTab>
  <InteractiveTab contentAfter={<button>x</button>}>Tab 2</InteractiveTab>
</TabList>;
```

Please note that the `InteractiveTab` component uses a div as its root instead of the default Tab component. It also includes three additional slots: `button` (where `role=tab` is assigned), `beforeContent`, and `afterContent`. This design allows users to insert interactive content before or after the tab button.
