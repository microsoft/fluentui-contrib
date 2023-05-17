import { Tree, getProjects } from '@nx/devkit';
import * as path from 'path';

export interface PackagePaths {
  root: string;
  src: string;
  main: string;
  packageJson: string;
  readme: string;
  swcrc: string;
  dist: string;
  esm: string;
  commonjs: string;
  tsconfigLib: string;
}

export function getPackagePaths(
  workspaceRoot: string,
  rootPath: string
): PackagePaths {
  return {
    root: rootPath,
    main: path.join(rootPath, 'src', 'index.ts'),
    src: path.join(rootPath, 'src'),
    packageJson: path.join(rootPath, 'package.json'),
    readme: path.join(rootPath, 'README.md'),
    swcrc: path.join(rootPath, '.swcrc'),
    tsconfigLib: path.join(rootPath, 'tsconfig.lib.json'),
    dist: path.join(workspaceRoot, 'dist', rootPath),
    esm: path.join(workspaceRoot, 'dist', rootPath, 'lib'),
    commonjs: path.join(workspaceRoot, 'dist', rootPath, 'lib-commonjs'),
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
