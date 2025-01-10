import React, { FC, ReactNode, useEffect, useState } from 'react';
import { initGamepadNavigation } from '../src';

type Props = Readonly<{ children: ReactNode }>;

const GamepadNavigationDecorator: FC<Props> = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initGamepadNavigation().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return <>{children}</>;
};

export const withGamepadNavigation = (storyFn: () => JSX.Element) => (
  <GamepadNavigationDecorator>{storyFn()}</GamepadNavigationDecorator>
);
