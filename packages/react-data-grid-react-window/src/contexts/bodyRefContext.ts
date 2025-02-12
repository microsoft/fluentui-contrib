import * as React from 'react';

const bodyRefContext: React.Context<
  React.MutableRefObject<HTMLElement | null>
> = React.createContext<React.MutableRefObject<HTMLElement | null>>({
  current: null,
});

export const bodyRefContextDefaultValue: React.MutableRefObject<HTMLElement | null> =
  { current: null };

export const useBodyRefContext = () =>
  React.useContext(bodyRefContext) ?? bodyRefContextDefaultValue;

export const BodyRefContextProvider = bodyRefContext.Provider;
