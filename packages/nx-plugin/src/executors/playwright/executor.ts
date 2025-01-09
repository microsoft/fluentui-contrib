import { execSync, fork } from 'node:child_process';
import * as path from 'node:path';
import {
  type ExecutorContext,
  getPackageManagerCommand,
  names,
  output,
  workspaceRoot,
} from '@nx/devkit';
import { playwrightExecutor } from '@nx/playwright';

import { type PlaywrightExecutorSchema } from './schema';

export default async function runExecutor(
  options: PlaywrightExecutorSchema,
  context: ExecutorContext
) {
  if (options.testingType === 'e2e') {
    return playwrightExecutor(options, context);
  }

  return playwrightCTExecutor(options, context);
}

/**
 *
 * Most of this code is copied from https://github.com/nrwl/nx/blob/master/packages/playwright/src/executors/playwright/playwright.impl.ts
 */
function playwrightCTExecutor(
  options: PlaywrightExecutorSchema,
  context: ExecutorContext
) {
  if (!context.projectsConfigurations || !context.projectName) {
    throw new Error('no project configurations');
  }

  const projectRoot =
    context.projectsConfigurations.projects[context.projectName].root;

  if (!projectRoot) {
    throw new Error(
      `Unable to find the Project Root for ${context.projectName}. Is it set in the project.json?`
    );
  }

  if (!options.skipInstall) {
    output.log({
      title: 'Ensuring Playwright is installed.',
      bodyLines: ['use --skipInstall to skip installation.'],
    });
    const pmc = getPackageManagerCommand();
    execSync(`${pmc.exec} playwright install --with-deps`, {
      cwd: workspaceRoot,
      stdio: 'inherit',
    });
  }

  const args = createArgs(options);

  const childProcess = runPlaywright(args, context.root);
  childProcess.stdout?.on('data', (message) => {
    process.stdout.write(message);
  });
  childProcess.stderr?.on('data', (message) => {
    process.stderr.write(message);
  });

  return new Promise<{ success: boolean }>((resolve) => {
    childProcess.on('close', (code) => {
      resolve({ success: code === 0 });
    });
  });
}

/**
 *
 * Most of this code is copied from https://github.com/nrwl/nx/blob/master/packages/playwright/src/executors/playwright/playwright.impl.ts
 */
function createArgs(
  opts: PlaywrightExecutorSchema,
  exclude: string[] = ['skipInstall', 'testingType']
): string[] {
  const args: string[] = [];

  const { testFiles, ...rest } = opts;
  if (testFiles) {
    args.push(...testFiles);
  }

  for (const key in rest) {
    if (exclude.includes(key)) continue;

    const value = opts[key as keyof typeof rest];
    // NOTE: playwright doesn't accept pascalCase args, only kebab-case
    const arg = names(key).fileName;

    if (Array.isArray(value)) {
      args.push(...value.map((v) => `--${arg}=${v.trim()}`));
    } else if (typeof value === 'boolean') {
      // NOTE: playwright don't accept --arg=false, instead just don't pass the arg.
      if (value) {
        args.push(`--${arg}`);
      }
    } else {
      args.push(`--${arg}=${value}`);
    }
  }

  return args;
}

/**
 *
 * Most of this code is copied from https://github.com/nrwl/nx/blob/master/packages/playwright/src/executors/playwright/playwright.impl.ts
 */
function runPlaywright(args: string[], cwd: string) {
  try {
    const module = require.resolve('@playwright/experimental-ct-react');
    const cli = path.join(path.dirname(module), 'cli.js');

    return fork(cli, ['test', ...args], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
      cwd,
    });
  } catch (e) {
    console.error(e);
    throw new Error(
      'Unable to run playwright component tests. Is @playwright/experimental-ct-core installed?'
    );
  }
}
