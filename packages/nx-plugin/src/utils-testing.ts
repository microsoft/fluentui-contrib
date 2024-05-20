import { Tree, joinPathFragments, stripIndents, updateJson } from '@nx/devkit';

const codeownersPath = joinPathFragments('/.github', 'CODEOWNERS');

export function createCodeowners(
  tree: Tree,
  options: { withPlaceholder?: boolean } = {}
) {
  const { withPlaceholder } = { withPlaceholder: true, ...options };

  tree.write(
    codeownersPath,
    stripIndents`
      packages/react-one @org/team-one
      packages/react-two @org/team-two
      ${withPlaceholder ? '# <%= NX-CODEOWNER-PLACEHOLDER %>' : ''}
    `
  );
}

/**
 *
 * if your test uses [library generator]{@link file://./generators/library/generator.ts} you need to call this in order to setup valid testing environment
 */
export function setupWorkspaceDependencies(tree: Tree) {
  updateJson(tree, '/package.json', (json) => {
    json.devDependencies['@fluentui/react-components'] = '^9.46.3';
    return json;
  });
}
