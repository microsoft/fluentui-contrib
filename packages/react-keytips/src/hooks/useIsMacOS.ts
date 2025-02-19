import { useFluent } from '@fluentui/react-components';

export function useIsMacOS() {
  const { targetDocument } = useFluent();
  const platform =
    targetDocument?.defaultView?.navigator?.platform || 'Windows';
  const isMac = /Mac|iPod|iPhone|iPad/.test(platform);

  return isMac;
}
