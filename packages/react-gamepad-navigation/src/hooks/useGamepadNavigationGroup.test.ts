// Mock useGamepadNavigation before imports
jest.mock('./useGamepadNavigation', () => {
  const mockUseGamepadNavigation = jest.fn();
  return {
    useGamepadNavigation: mockUseGamepadNavigation,
    __mockUseGamepadNavigation: mockUseGamepadNavigation,
  };
});

import { renderHook } from '@testing-library/react';
import { useGamepadNavigationGroup } from './useGamepadNavigationGroup';
import { InputMode } from '../types/InputMode';

describe('useGamepadNavigationGroup', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should call useGamepadNavigation with correct options', () => {
    const defaultInputMode = InputMode.Gamepad;
    const pollingEnabled = true;

    renderHook(() =>
      useGamepadNavigationGroup({ defaultInputMode, pollingEnabled })
    );

    const { __mockUseGamepadNavigation } = require('./useGamepadNavigation');
    expect(__mockUseGamepadNavigation).toHaveBeenCalledWith({
      defaultInputMode,
      pollingEnabled,
    });
  });
});
