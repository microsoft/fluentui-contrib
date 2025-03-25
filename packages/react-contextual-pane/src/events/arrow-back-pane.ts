import type { NovaEvent } from "@nova/types";
import { originator } from "./events-contextual-pane.constants";

const EVENT_NAME = "arrowBack" as const;

export const arrowBack = () => ({
  originator,
  type: EVENT_NAME,
});

export const isArrowBack = (
  event: NovaEvent<unknown>
): event is NovaEvent<{}> => {
  return event.originator === originator && event.type === EVENT_NAME;
};
