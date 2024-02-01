import { execSync } from 'child_process';
import { ExecutorContext } from '@nx/devkit';
import { PlaywrightExecutorSchema } from './schema';
import { playwrightExecutor } from '@nx/playwright';

export default async function runExecutor(
  options: PlaywrightExecutorSchema,
  context: ExecutorContext
) {
  if (options.testingType === 'e2e') {
    return playwrightExecutor(options, context);
  }

  if (!context.projectsConfigurations || !context.projectName) {
    throw new Error('no project configurations');
  }

  const { root } = context.projectsConfigurations.projects[context.projectName];

  if (!root) {
    throw new Error('No root root found in projects configurations');
  }

  execSync(`npx playwright test`, { cwd: root });

  return {
    success: true,
  };
}
