import type { NovaEvent } from "@nova/types";
import { originator } from "./events-contextual-pane.constants";

const EVENT_NAME = "dismissPane" as const;

export const dismissPane = () => ({
  originator,
  type: EVENT_NAME,
});

export const isDismissPane = (
  event: NovaEvent<unknown>
): event is NovaEvent<{}> => {
  return event.originator === originator && event.type === EVENT_NAME;
};
