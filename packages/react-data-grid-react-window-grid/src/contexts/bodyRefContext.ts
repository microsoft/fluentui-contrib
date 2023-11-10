import * as React from 'react';
import { FixedSizeGrid } from 'react-window';

const bodyRefContext: React.Context<React.MutableRefObject<FixedSizeGrid | null>> =
  React.createContext<React.MutableRefObject<FixedSizeGrid | null>>({ current: null});


export const bodyRefContextDefaultValue: React.MutableRefObject<FixedSizeGrid | null> = { current: null };

export const useBodyRefContext = () =>
  React.useContext(bodyRefContext) ?? bodyRefContextDefaultValue;

export const BodyRefContextProvider = bodyRefContext.Provider;
