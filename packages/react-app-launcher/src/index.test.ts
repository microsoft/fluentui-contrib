import * as api from './index';

describe('package export surface', () => {
  it('exposes exactly the documented component exports', () => {
    // Consumers import the launcher from the package root, so the runtime
    // surface is part of the contract: every documented component is
    // reachable and no internal module leaks out.
    expect(Object.keys(api).sort()).toEqual([
      'AppLauncher',
      'AppLauncherGrid',
      'AppLauncherItem',
      'AppLauncherList',
      'AppLauncherSearch',
      'AppLauncherSection',
      'AppLauncherTrigger',
    ]);
  });
});
