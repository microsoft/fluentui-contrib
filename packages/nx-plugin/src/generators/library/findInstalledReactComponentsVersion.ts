import { exec as execCb } from 'child_process';
import { promisify } from 'util';
import { parse } from 'semver';

const exec = promisify(execCb);

/**
 *
 * 💡 NOTE: this should not be used within generator as it will significantly slow down generator and all tests that use it
 * - non tree modifications should/can be done within generator only within return callback where all side effects are executed
 */
export async function findInstalledReactComponentsVersion() {
  const { stdout } = await exec(
    `yarn list --pattern @fluentui/react-components --json --depth=0`
  );
  const rawEntries = stdout.split('\n');
  const entries = rawEntries.map((entry) => {
    try {
      return JSON.parse(entry);
    } catch {
      return {} as unknown;
    }
  });
  const entry = entries.find((entry) => {
    if (entry.data?.trees?.[0]?.name.includes('@fluentui/react-components')) {
      return true;
    }
  });

  if (!entry) {
    throw new Error(
      'Could not find installed @fluentui/react-components version in lockfile, please report this issue'
    );
  }

  const version = entry.data.trees[0].name.split('@')[2];
  if (parse(version)) {
    return version;
  }

  throw new Error(
    'Could not find installed @fluentui/react-components version in lockfile, please report this issue'
  );
}
