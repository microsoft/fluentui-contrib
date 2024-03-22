import { mergeClasses } from '@fluentui/react-components';
import type {
  FluentProviderSlots,
  FluentProviderState,
  SlotClassNames,
} from '@fluentui/react-components';

export const themelessFluentProviderClassNames: SlotClassNames<FluentProviderSlots> =
  {
    root: 'fui-ThemelessFluentProvider',
  };

export const useThemelessProviderStyles_unstable = (
  state: FluentProviderState
): FluentProviderState => {
  state.root.className = mergeClasses(
    themelessFluentProviderClassNames.root,
    state.root.className
  );
  return state;
};
