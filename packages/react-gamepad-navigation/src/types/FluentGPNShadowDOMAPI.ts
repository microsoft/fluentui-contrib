export type FluentGPNShadowDOMAPI = {
  gamepadInitialized: boolean;
  windowId: string;
};

export type WindowWithFluentGPNShadowDOMAPI = Window & {
  __FluentGPNShadowDOMAPI?: FluentGPNShadowDOMAPI;
};
