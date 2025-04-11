import { GamepadEventHandlers } from './GamepadEventHandlers';

export type FluentGPNShadowDOMAPI = {
  gamepadInitialized: boolean;
  windowId: string;
  eventHandlers?: GamepadEventHandlers;
  removeEventListeners?: () => void;
};

export type WindowWithFluentGPNShadowDOMAPI = Window & {
  __FluentGPNShadowDOMAPI?: FluentGPNShadowDOMAPI;
};
