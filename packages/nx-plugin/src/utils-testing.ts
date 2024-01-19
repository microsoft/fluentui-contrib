import { Tree, joinPathFragments, stripIndents } from '@nx/devkit';

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
