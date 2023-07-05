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
  tsconfig: string;
}

export function getPackagePaths(
  workspaceRoot: string,
  rootPath: string,
  absolute?: boolean
): PackagePaths {
  if (absolute) {
    return {
      root: path.join(workspaceRoot, rootPath),
      main: path.join(workspaceRoot, rootPath, 'src', 'index.ts'),
      src: path.join(workspaceRoot, rootPath, 'src'),
      packageJson: path.join(workspaceRoot, rootPath, 'package.json'),
      readme: path.join(workspaceRoot, rootPath, 'README.md'),
      swcrc: path.join(workspaceRoot, rootPath, '.swcrc'),
      tsconfig: path.join(workspaceRoot, rootPath, 'tsconfig.json'),
      tsconfigLib: path.join(workspaceRoot, rootPath, 'tsconfig.lib.json'),
      dist: path.join(workspaceRoot, 'dist', rootPath),
      esm: path.join(workspaceRoot, 'dist', rootPath, 'lib'),
      commonjs: path.join(workspaceRoot, 'dist', rootPath, 'lib-commonjs'),
    };
  }
  return {
    root: path.join(rootPath),
    main: path.join(rootPath, 'src', 'index.ts'),
    src: path.join(rootPath, 'src'),
    packageJson: path.join(rootPath, 'package.json'),
    readme: path.join(rootPath, 'README.md'),
    swcrc: path.join(rootPath, '.swcrc'),
    tsconfig: path.join(rootPath, 'tsconfig.json'),
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
