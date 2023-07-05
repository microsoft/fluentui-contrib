import { ExecutorContext, readJsonFile, writeJsonFile } from '@nx/devkit';
import * as tmp from 'tmp';
import { copySync } from 'fs-extra';
import * as path from 'path';
import * as semver from 'semver';
import { execSync } from 'child_process';
import { VerifyDepsExecutorSchema } from './schema';
import { PackagePaths, getPackagePaths } from '../../utils';

export default async function runExecutor(
  options: VerifyDepsExecutorSchema,
  context: ExecutorContext
) {
  const { cleanup: shouldCleanup } = options;
  const { projectName, projectsConfigurations, root: workspaceRoot } = context;
  if (!projectsConfigurations || !projectName) {
    throw new Error('no project configurations');
  }

  const { root } = projectsConfigurations.projects[projectName];
  const { name: tmpDir, removeCallback: cleanup } = tmp.dirSync({
    prefix: projectName,
    unsafeCleanup: true,
  });
  console.info('copying', projectName, 'to', tmpDir);
  copySync(root, tmpDir);
  const paths = getPackagePaths(tmpDir, '.', true);

  copyYarnBinary(paths, workspaceRoot);

  configureTsConfig(paths, workspaceRoot);

  configurePackageJson(paths, workspaceRoot);

  let success = true;
  try {
    const yarnCmd = 'yarn';
    console.log('Run', yarnCmd);
    execSync(yarnCmd, { stdio: 'inherit', cwd: paths.root });

    const tscCmd =
      'npx -p typescript tsc --noEmit --project ./tsconfig.lib.json';
    console.log('Run', tscCmd);
    execSync(tscCmd, {
      stdio: 'inherit',
      cwd: paths.root,
    });
  } catch {
    success = false;
    console.error(
      '======================================================================'
    );
    console.error(
      'verify-deps check failed. Most likely the minimum version of your peer dependency ranges need to be updated!'
    );
    console.error('You can debug by opening the test project', tmpDir);
    console.error(
      'and run the command `npx -p typescript tsc --noEmit --project ./tsconfig.lib.json`'
    );
  }

  if (shouldCleanup && success) {
    cleanup();
  }
  return {
    success,
  };
}

function copyYarnBinary(paths: PackagePaths, workspaceRoot: string) {
  copySync(path.join(workspaceRoot, '.yarn'), path.join(paths.root, '.yarn'));
}

function configureTsConfig(paths: PackagePaths, workspaceRoot: string) {
  copySync(
    path.join(workspaceRoot, 'tsconfig.base.json'),
    path.join(paths.root, 'tsconfig.base.json')
  );

  const tsconfig = readJsonFile(paths.tsconfig);
  tsconfig.extends = './tsconfig.base.json';
  writeJsonFile(paths.tsconfig, tsconfig);
}

function configurePackageJson(paths: PackagePaths, workspaceRoot: string) {
  const pkgJson = readJsonFile(paths.packageJson);
  pkgJson.dependencies ??= {};
  const peerDeps = Object.entries(pkgJson.peerDependencies) as Array<
    [string, string]
  >;
  // use minimum version of peer deps to test
  for (const [depName, versionRange] of peerDeps) {
    const minVersion = semver.minVersion(versionRange);
    if (minVersion) {
      pkgJson.dependencies[depName] = minVersion.version;
    }
  }

  // Copy all types dependencies - they are not that big and there's not many of them (yet)
  const rootPkgJson = readJsonFile(path.join(workspaceRoot, 'package.json'));
  const rootDevDeps = Object.entries(rootPkgJson.devDependencies ?? {});
  pkgJson.devDependencies ??= {};
  for (const [depName, version] of rootDevDeps) {
    if (depName.startsWith('@types/')) {
      pkgJson.devDependencies[depName] = version;
    }
  }

  writeJsonFile(paths.packageJson, pkgJson);
}
