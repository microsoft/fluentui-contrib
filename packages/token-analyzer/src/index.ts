#!/usr/bin/env node
import { Project } from 'ts-morph';
import { promises as fs } from 'fs';
import { relative } from 'path';
import { format } from 'prettier';
import { findStyleFiles } from './fileOperations.js';
import { analyzeFile } from './astAnalyzer.js';
import { AnalysisResults, FileAnalysis } from './types.js';
import { configure, log, error, measureAsync } from './debugUtils.js';
import { findTsConfigPath } from './findTsConfigPath.js';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

async function analyzeProjectStyles(
  rootDir: string,
  outputFile?: string,
  options: { debug?: boolean; perf?: boolean } = {}
): Promise<AnalysisResults> {
  configure({
    debug: options.debug || false,
    perf: options.perf || false,
  });

  log(`Starting analysis of ${rootDir}`);
  const results: AnalysisResults = {};

  try {
    const styleFiles = await measureAsync('find style files', () => findStyleFiles(rootDir));
    console.log(`Found ${styleFiles.length} style files to analyze`);

    const project = new Project({
      // Get the nearest tsconfig.json file so we can resolve modules and paths correctly based on the project config
      tsConfigFilePath: findTsConfigPath(rootDir) ?? undefined,
      skipAddingFilesFromTsConfig: true,
      skipFileDependencyResolution: false,
    });

    for (const file of styleFiles) {
      const relativePath = relative(rootDir, file);
      console.log(`Analyzing ${relativePath}...`);

      try {
        const analysis = await analyzeFile(file, project);
        if (Object.keys(analysis.styles).length > 0) {
          results[relativePath] = {
            styles: analysis.styles,
            metadata: analysis.metadata,
          };
        }
      } catch (err) {
        error(`Error analyzing ${relativePath}:`, err);
      }
    }

    if (outputFile) {
      await measureAsync('write output file', async () => {
        const formatted = format(JSON.stringify(sortObjectByKeys(results), null, 2), {
          parser: 'json',
          printWidth: 120,
          tabWidth: 2,
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'avoid',
        });
        await fs.writeFile(outputFile, formatted, 'utf8');
        console.log(`Analysis written to ${outputFile}`);
      });
    }

    return results;
  } catch (err) {
    error('Error during analysis:', err);
    throw err;
  }
}

/**
 * Sorts an object by its keys alphabetically
 *
 * @param obj Object to sort
 * @returns New object with the same properties, sorted by keys
 */
function sortObjectByKeys<T>(obj: Record<string, T>): Record<string, T> {
  return Object.keys(obj)
    .sort()
    .reduce((sorted: Record<string, T>, key: string) => {
      sorted[key] = obj[key];
      return sorted;
    }, {});
}

function countTokens(analysis: FileAnalysis): number {
  let count = 0;
  Object.values(analysis.styles).forEach((_value) => {
    Object.values(_value).forEach((value) => {
      count += value.tokens.length;
      if (value.nested) {
        Object.values(value.nested).forEach((nestedValue) => {
          count += nestedValue.tokens.length;
        });
      }
    });
  });
  return count;
}

// Define the expected CLI arguments interface
interface CliArgs {
  root: string;
  output: string;
  debug: boolean;
  perf: boolean;
}

// CLI execution
const isRunningDirectly =
  require.main === module || // Standard Node.js detection
  process.argv[1].includes('token-analyzer') || // When run as global CLI
  process.argv[1].endsWith('index.js') || // When run directly
  process.argv[1].includes('index'); // Your original check

if (isRunningDirectly) {
  const argv = yargs(hideBin(process.argv))
    .usage('$0 [options]', 'Analyze project styles and token usage')
    .option('root', {
      alias: 'r',
      describe: 'Root directory to analyze',
      type: 'string',
      default: '.',
    })
    .option('output', {
      alias: 'o',
      describe: 'Output file path',
      type: 'string',
      default: './token-analysis.json',
    })
    .option('debug', {
      alias: 'd',
      describe: 'Enable debug mode',
      type: 'boolean',
      default: false,
    })
    .option('perf', {
      alias: 'p',
      describe: 'Enable performance tracking',
      type: 'boolean',
      default: false,
    })
    .example('$0', 'Run with default settings')
    .example('$0 --root ./components --output ./results.json', 'Analyze components directory')
    .example('$0 -r ./src -o ./analysis.json --debug', 'Run with debug mode')
    .help('h')
    .alias('h', 'help')
    .version()
    .strict()
    .parseSync() as CliArgs;

  const { root: rootDir, output: outputFile, debug, perf } = argv;

  console.log(`Starting analysis of ${rootDir}`);
  console.log(`Output will be written to ${outputFile}`);

  if (debug) console.log('Debug mode enabled');
  if (perf) console.log('Performance tracking enabled');

  analyzeProjectStyles(rootDir, outputFile, { debug, perf })
    .then((results) => {
      const totalFiles = Object.keys(results).length;
      let totalTokens = 0;

      Object.values(results).forEach((fileAnalysis) => {
        totalTokens += countTokens(fileAnalysis);
      });

      console.log('\nAnalysis complete!');
      console.log(`Processed ${totalFiles} files containing styles`);
      console.log(`Found ${totalTokens} token references`);
    })
    .catch((err) => {
      console.error('Analysis failed:', err);
      process.exit(1);
    });
}

export { analyzeProjectStyles };
export type {
  AnalysisResults,
  FileAnalysis,
  KnownTokenImportsAndModules,
  StyleAnalysis,
  StyleCondition,
  StyleContent,
  StyleMetadata,
  StyleTokens,
  TokenMap,
  TokenReference,
  TokenResolverInfo,
} from './types';
