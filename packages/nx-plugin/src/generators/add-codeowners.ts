import { applyChangesToString, Tree } from '@nx/devkit';
import { joinPathFragments, StringChange, ChangeType } from '@nx/devkit';

interface Options {
  owner: string;
  path: string;
}

/**
 * This function is used to add a new line to the CODEOWNERS file
 * FIXME: This should be replaced with a unified tooling, as soon as we have one
 */
export function addCodeowner(tree: Tree, options: Options) {
  const { owner, path } = options;

  const placeholder = '# <%= NX-CODEOWNER-PLACEHOLDER %>';
  const codeownersPath = joinPathFragments('/.github', 'CODEOWNERS');

  if (!tree.exists(codeownersPath)) {
    throw new Error(`CODEOWNERS doesn't exists`);
  }

  const codeownersContent = tree.read(codeownersPath, 'utf8') as string;
  const placeholderPosition = codeownersContent.indexOf(placeholder);

  if (placeholderPosition === -1) {
    throw new Error(`CODEOWNERS is missing '${placeholder}' placeholder`);
  }

  const changes: StringChange[] = [
    {
      type: ChangeType.Delete,
      start: placeholderPosition,
      length: placeholder.length,
    },
    {
      index: placeholderPosition,
      type: ChangeType.Insert,
      text: `${path} ${owner}\n`,
    },
    {
      type: ChangeType.Insert,
      index: placeholderPosition,
      text: placeholder,
    },
  ];

  const newContents = applyChangesToString(codeownersContent, changes);

  tree.write(codeownersPath, newContents);
}
