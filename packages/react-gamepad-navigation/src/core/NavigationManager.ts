import { FocusDirection } from '../types/FocusDirection';
import { MoverKey } from '../types/Keys';
import { emitSyntheticMoverMoveFocusEvent } from './GamepadEvents';
import { getCurrentActiveElement } from '../hooks/useGamepadNavigation';

/**
 * Navigates in the given direction if possible. This is the entry point to all navigation logic
 *  @param direction - the direction to navigate
 */
export const navigate = (direction: FocusDirection) => {
  const activeElement = getCurrentActiveElement();
  const finalDirection = !activeElement ? FocusDirection.None : direction;

  if (finalDirection !== FocusDirection.None) {
    emitSyntheticMoverMoveFocusEvent(finalDirection as MoverKey, activeElement);
  }
};
