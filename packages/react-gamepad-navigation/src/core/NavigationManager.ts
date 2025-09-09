import { FocusDirection } from '../types/FocusDirection';
import { MoverKey } from '../types/Keys';
import { emitSyntheticMoverMoveFocusEvent } from './GamepadEvents';
/**
 * Navigates in the given direction if possible. This is the entry point to all navigation logic
 *  @param direction - the direction to navigate
 * @param targetDocument - the document to navigate in
 */
export const navigate = (
  direction: FocusDirection,
  targetDocument: Document
): void => {
  const activeElement = targetDocument.activeElement;
  const finalDirection = !activeElement ? FocusDirection.None : direction;

  if (finalDirection !== FocusDirection.None) {
    emitSyntheticMoverMoveFocusEvent(
      finalDirection as MoverKey,
      targetDocument
    );
  }
};
