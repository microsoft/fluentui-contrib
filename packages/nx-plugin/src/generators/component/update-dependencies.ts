import { readJson, updateJson, type Tree } from '@nx/devkit';
import { getPackagePaths, type PackageJson } from '../../utils';

function getReactComponentsVersion(tree: Tree): string {
  const monorepoRootPkgJson: PackageJson = readJson(tree, '/package.json');
  const { dependencies = {}, devDependencies = {} } = monorepoRootPkgJson;
  const reactComponentsVersion =
    dependencies['@fluentui/react-components'] ||
    devDependencies['@fluentui/react-components'];

  if (!reactComponentsVersion) {
    throw new Error(
      '🚨 Could not find @fluentui/react-components in package.json. please report this issue'
    );
  }

  // strip version ranges non-numeric characters
  return reactComponentsVersion.replace(/^[~^]/, '');
}

export function updateDependencies(
  tree: Tree,
  options: { paths: ReturnType<typeof getPackagePaths> }
) {
  const reactComponentsVersion = getReactComponentsVersion(tree);
  const peerDeps = {
    '@fluentui/react-components': `>=${reactComponentsVersion} <10.0.0`,
    '@types/react': '>=16.8.0 <20.0.0',
    react: '>=16.8.0 <20.0.0',
  };

  updateJson(tree, options.paths.packageJson, (packageJson) => {
    packageJson.peerDependencies = packageJson.peerDependencies ?? {};

    Object.assign(packageJson.peerDependencies, peerDeps);

    return packageJson;
  });

  return tree;
}
