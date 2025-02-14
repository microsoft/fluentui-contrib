import { STRICT_SYMBOL } from './STRICT_SYMBOL';
import type { StrictCssClass } from './types';

export const validateStrictClasses = <TExtension>(
  className?: StrictCssClass<TExtension> | false | undefined
) => {
  if (!className) {
    return;
  }

  if (className.DO_NOT_USE_OR_YOU_WILL_BE_FIRED !== STRICT_SYMBOL) {
    throw new Error(
      '@fluentui-contrib/teams-ui::This component only allows styles from makeStrictStyles'
    );
  }
};
