import * as React from 'react';

export const Button = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  return <button>{children}</button>;
};
