/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const handler = document.defaultView?.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      // eslint-disable-next-line no-restricted-globals
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
