import * as path from 'path';
import { ExecutorContext, cacheDir } from '@nx/devkit';
import { runTypeCheck, printDiagnostics } from '@nx/js';
import { TypeCheckExecutorSchema } from './schema';
import { getPackagePaths } from '../../utils';

export default async function runExecutor(
  options: TypeCheckExecutorSchema,
  context: ExecutorContext
) {
  if (!context.projectsConfigurations || !context.projectName) {
    throw new Error('no project configurations');
  }

  const { sourceRoot, root } =
    context.projectsConfigurations.projects[context.projectName];

  const { root: workspaceRoot } = context;
  const paths = getPackagePaths(workspaceRoot, root);

  if (!sourceRoot || !root) {
    return;
  }

  console.log(path.join(workspaceRoot, 'dist'));
  // Move to separate exector - don't use NX default
  const { errors } = await runTypeCheck({
    mode: 'emitDeclarationOnly',
    outDir: path.join(workspaceRoot, 'dist'),
    tsConfigPath: paths.tsconfigLib,
    workspaceRoot,
    incremental: true,
    cacheDir,
  });

  if (errors?.length) {
    await printDiagnostics(errors);
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}
