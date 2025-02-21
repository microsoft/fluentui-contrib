import { GamepadEventHandlers } from './GamepadEventJHandlers';

export type FluentGPNShadowDOMAPI = {
  gamepadInitialized: boolean;
  windowId: string;
  eventHandlers?: GamepadEventHandlers;
  removeEventListeners?: () => void;
};

export type WindowWithFluentGPNShadowDOMAPI = Window & {
  __FluentGPNShadowDOMAPI?: FluentGPNShadowDOMAPI;
};
