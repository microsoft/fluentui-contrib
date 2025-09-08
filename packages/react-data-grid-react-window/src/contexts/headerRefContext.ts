import * as React from 'react';

const headerRefContext: React.Context<
  React.MutableRefObject<HTMLElement | null>
> = React.createContext<React.MutableRefObject<HTMLElement | null>>({
  current: null,
});

export const headerRefContextDefaultValue: React.MutableRefObject<HTMLElement | null> =
  { current: null };

export const useHeaderRefContext =
  (): React.MutableRefObject<HTMLElement | null> =>
    React.useContext(headerRefContext) ?? headerRefContextDefaultValue;

export const HeaderRefContextProvider = headerRefContext.Provider;
