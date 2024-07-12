import { execSync } from 'node:child_process';
import * as path from 'node:path';
import * as fs from 'node:fs';
import {
  type ExecutorContext,
  readJsonFile,
  writeJsonFile,
  output,
} from '@nx/devkit';

import { BuildExecutorSchema } from './schema';
import { PackagePaths, getPackagePaths } from '../../utils';

type ModuleType = 'es6' | 'commonjs';

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  if (!context.projectsConfigurations || !context.projectName) {
    throw new Error(
      'executor context is missing required metadata - projectsConfigurations,projectName'
    );
  }

  const projectConfig =
    context.projectsConfigurations.projects[context.projectName];

  if (!projectConfig) {
    return { success: false };
  }

  const paths = getPackagePaths(context.root, projectConfig.root);

  cleanDist(paths);

  runSwc(paths, 'es6');
  runSwc(paths, 'commonjs');

  copyPackageJson(paths);
  copyReadme(paths);

  return {
    success: true,
  };
}

function copyReadme(paths: PackagePaths) {
  fs.copyFileSync(paths.readme, path.join(paths.dist, 'README.md'));
}

function cleanDist(paths: PackagePaths) {
  fs.rmSync(paths.dist, { recursive: true, force: true });
}

function copyPackageJson(paths: PackagePaths) {
  const packageJson = readJsonFile(paths.packageJson);
  Object.assign(packageJson, {
    typings: './src/index.d.ts',
    main: './lib-commonjs/index.js',
    module: './lib/index.js',
    sideEffects: false,
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'https://github.com/microsoft/fluentui-contrib',
    },
    dependencies: {
      '@swc/helpers': '~0.5.1',
      ...packageJson.dependencies,
    },
    peerDependencies: {
      '@types/react': '>=16.8.0 <19.0.0',
      '@types/react-dom': '>=16.8.0 <19.0.0',
      react: '>=16.8.0 <19.0.0',
      'react-dom': '>=16.8.0 <19.0.0',
      ...packageJson.peerDependencies,
    },
    exports: {
      '.': {
        types: './src/index.d.ts',
        node: './lib-commonjs/index.js',
        import: './lib/index.js',
        require: './lib-commonjs/index.js',
      },
      './package.json': './package.json',
    },
  });
  writeJsonFile(path.resolve(paths.dist, 'package.json'), packageJson);
}

function runSwc(paths: PackagePaths, type: ModuleType) {
  const swcCmd = getSwcCmd({
    srcPath: 'src',
    destPath: type === 'commonjs' ? paths.commonjs : paths.esm,
    swcrcPath: '.swcrc',
    type,
  });

  output.logSingleLine(`running: "${swcCmd}"`);

  execSync(swcCmd, {
    // NOTE:
    // swc CLI needs to be run from project root otherwise it will incorrectly build assets folder structure
    // https://github.com/microsoft/fluentui-contrib/issues/198
    cwd: paths.root,
  });
}

function getSwcCmd({
  srcPath,
  swcrcPath,
  destPath,
  type,
}: {
  srcPath: string;
  swcrcPath: string;
  destPath: string;
  type: ModuleType;
}) {
  // strip-leading-paths is necessary in order to not put build assets under provided source (`/src`) - https://swc.rs/docs/usage/cli#--strip-leading-paths
  return `npx swc ${srcPath} --strip-leading-paths -d ${destPath} --config-file=${swcrcPath} --config module.type=${type}`;
}
