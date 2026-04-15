import { FluentProviderProps } from '@fluentui/react-components';
import { ButtonState } from '../components/react-button/Button';
import { CAP_STYLE_HOOKS } from '../CAPStyleHooks';
import { mergeStyleHooks } from '../util/FluentUtil';
import { useButtonStyles } from './react-button/components/Button/useButtonStyles.styles';

export const TEAMS_STYLE_HOOKS: NonNullable<
  FluentProviderProps['customStyleHooks_unstable']
> = mergeStyleHooks(CAP_STYLE_HOOKS, {
  useButtonStyles_unstable: (state) => {
    return useButtonStyles(state as ButtonState);
  },
});
