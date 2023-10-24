# stylelint-plugin

This stylelint plugin contains rules that are (first and foremost) applicable to Fluent UI. These rules
can also be used with projects that do not use Fluent UI or [Griffel](https://griffel.js.org/), but support
is not guaranteed.

## Install

```sh
yarn add @fluentui-contrib/stylelint-plugin

npm install @fluentui-contrib/stylelint-plugin
```

## Configuration

```js
// .stylelintrc.js

module.exports = {
  plugins: ['@fluentui-contrib/stylelint-plugin'],
  rules: {
    '@fluentui-contrib/combinator-depth': [0],
  },
  defaultSeverity: 'error',
};
```
