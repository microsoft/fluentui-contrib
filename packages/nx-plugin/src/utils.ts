import { type Tree, getProjects, joinPathFragments } from '@nx/devkit';

export type PackagePaths = ReturnType<typeof getPackagePaths>;

export function getPackagePaths(workspaceRoot: string, rootPath: string) {
  const distRoot = joinPathFragments(workspaceRoot, 'dist', rootPath);
  return {
    workspaceRoot,
    root: rootPath,
    main: joinPathFragments(rootPath, 'src', 'index.ts'),
    src: joinPathFragments(rootPath, 'src'),
    packageJson: joinPathFragments(rootPath, 'package.json'),
    readme: joinPathFragments(rootPath, 'README.md'),
    swcrc: joinPathFragments(rootPath, '.swcrc'),
    tsconfigLib: joinPathFragments(rootPath, 'tsconfig.lib.json'),
    dist: distRoot,
    esm: joinPathFragments(distRoot, 'lib'),
    commonjs: joinPathFragments(distRoot, 'lib-commonjs'),
  };
}

export function getProject(tree: Tree, name: string) {
  const projects = getProjects(tree);
  const project = projects.get(name);
  if (!project) {
    throw new Error(`Project ${name} does not exist`);
  }

  return project;
}

export const npmScope = '@fluentui-contrib';

// =================================================
// nx @private API's re-exports for internal usage
// =================================================

// eslint-disable-next-line import/no-extraneous-dependencies
export { type PackageJson } from 'nx/src/utils/package-json';
