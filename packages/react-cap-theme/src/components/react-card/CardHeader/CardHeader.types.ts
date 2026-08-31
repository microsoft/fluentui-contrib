import type { CardHeaderState as BaseState } from '@fluentui/react-card';
import type { CardState } from '../Card/Card.types';

/**
 * State used in rendering CardPreview.
 * @alpha
 */
export type CardHeaderState = BaseState & Required<Pick<CardState, 'disabled'>>;
