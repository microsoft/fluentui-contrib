import type {
  InlineDrawerProps as FluentInlineDrawerProps,
  InlineDrawerState as FluentInlineDrawerState,
} from '@fluentui/react-drawer';

export type InlineDrawerProps = FluentInlineDrawerProps & {
  appearance?: 'solid' | 'transparent';
};

export type InlineDrawerState = FluentInlineDrawerState &
  Required<Pick<InlineDrawerProps, 'appearance'>>;
