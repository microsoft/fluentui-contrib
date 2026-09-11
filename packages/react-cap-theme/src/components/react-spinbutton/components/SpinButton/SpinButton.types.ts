import type { SpinButtonState as BaseSpinButtonState } from '@fluentui/react-components';

/**
 * State used in rendering the CAP SpinButton.
 *
 * CAP additionally supports a `'large'` size, which the base SpinButton does not
 * expose, so `size` is widened accordingly.
 * @alpha
 */
export type SpinButtonState = Omit<BaseSpinButtonState, 'size'> & {
  size: BaseSpinButtonState['size'] | 'large';
};
