import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import generator from './generator';
import { ComponentGeneratorSchema } from './schema';

describe('component generator', () => {
  let tree: Tree;
  const options: ComponentGeneratorSchema = {
    name: 'test',
    componentName: 'foo',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  xit('should run successfully', async () => {
    await generator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
