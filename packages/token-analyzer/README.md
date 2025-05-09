# Design Token Usage Analyzer

A static analysis tool that scans your project's style files to track and analyze design token usage. The analyzer helps identify where and how design tokens are being used across your codebase, making it easier to maintain consistency and track token adoption. The data from this tool can also be used to create other tools like theme designers.

## TODO

- we also need to ensure var analysis is done correctly after the refactor
- Convert token member within the analysis output to an array so we can hold multiple tokens. The order should be the order or priority. [0] being the highest pri with the last item in the array the least prioritized.

- add config to point to custom prettier config for file output.
- add tests for findTsConfigPath
- Update extractTokensFromText to find imported vars and tokens. We've updated it to resolve variable declarations thusfar but there's potential cases where we could have imports impact this as well.
- add tests for structure and output. ~~We're processing the styles but not putting them in the right places right now~~
- update contributing doc with info about version management
- Data Flow
  - find all styles files
  - get all imports, analyze them for token references or values, return them to the main script flow
  - process merge styles and map meta data to styles
  - parse through each property of styles
    - with each property,we should look at whether an initializer is there, spread, delaration etc and then determine if that's a token. if it is, we also need to see if there's a fallback chain and not just log a token but also log the tokens in the right order (this should also open the door to ensure we don't over complicate or duplicate logic here)
    - The data flow complexity is a bit high currently and we should only recurse where we actually need to.
    - property set in styles -> analyze type (expression call, initializer, declaration, etc) -> resolve given import information, type and rules -> Once we resolve, analyze if it's a token which should be a single call so we can centralize it -> return token with path, value, etc. This should include priority order if we have a var() fallback structure.
- we need to update isToken to resolve to which package/module it's imported from.

  - We also need to do this for shorthands
  - We should write a function that does this from a node and follows it up the import chain.

- Update test to return promise instead of async/await function.
- We need to update import analyzer to handle namespace imports

- when we resolve imports we store template string literal spans as part of the object but I don't thiink that we need to this. More importantly, we need to maintain a reference to the node for any additional processing, and then the individual initializers and other internal nodes. Clean this up before moving into the ordering as it'll be easier to deal with. We should also ensure this is consistent across template literals.

- Switch to getImmediatelyAliasedSymbol from getAliasedSymbol. This is because if we have a direct export in a file like `export { someToken } from 'semantic-tokens` in a local file, we won't resolve to the local export location, but the library file, or a d.ts file. This isn't really what we need and we'd missed the actual import from `semantic-tokens` because of this and not correctly mark it. We'd be out of the boundary of our current application. This means we do need to manually walk but it shouldn't be overly complex. We should grab the immediate alias, see if we see a known token package, if not, walk again, etc until we can't anymore. From there if there isn't one we know it's not a token.

- handle when something has an import/export alias. Ex: `import { someToken as blah}`. In that case we have to look at `propertyName` and `name` to get the original and aliased names.

ExportDeclaration

## Notes

Get the symbol, find it's declaration, walk up the tree until we find the `ExportDeclaration`. From there grab the module specifier
compare that value to our known list
if it doesn't match, walk again, repeat
save the declaration

shortcut analysis if straight import is pointing to a known token package. If not, we can then analyze further with

-_ get source file (useButtonStyles.styles.ts) -_ pull all import declarations -_ process each import declaration based on type (named, default, namespace) -_ get the name of each import (if named or namespace) -_ check if the import is from a known package right away -_ if so, we add it and move on

- if not we process the file the module specifier resolves to (this could be a package index.ts or local file) (import-test.ts)
  - we could have direct exports (re-exports) or we could have imports from other packages and then exports of those values. Either way the first thing we see should
    be an export. We need to determine if the export is a full re-export or a declaration (extractValueFromDeclaration does this already).

Since we correctly resolve colorNeutralForeground1, we need to then add a mapping that the symbol resolved back into a known token package.

LET'S GET ODSPS AND TEAMS UXEs TO PULL DOWN THE NIGHTLY STUFF AND TRY TO USE SEMANTIC TOKENS ON THEIR CUSTOM COMPONENTS

- could we get anyone to also look at calendar? talk to Jeff about if there's anyone that could take a look?

## Features

- Scans TypeScript/JavaScript style files for token usage
- Tracks both direct token references and variables that reference tokens
- Follows imports to resolve token references across files
- Generates detailed JSON reports of token usage
- Performance tracking and debugging capabilities
- Handles nested style objects and property assignments

## Installation

```bash
npm install --save-dev @fluentui-contrib/token-analyzer
```

## Usage

### Via CLI

The analyzer can be run from the command line:

```bash
npm run analyze-tokens -- [sourceDir] [outputFile] [flags]
```

#### Arguments:

- `sourceDir`: Directory to analyze (default: `./src`)
- `outputFile`: Output JSON file path (default: `./token-analysis.json`)

#### Flags:

- `--debug`: Enable debug logging
- `--perf`: Enable performance metrics

Examples:

```bash
# Analyze src directory with default output
npm run analyze-tokens

# Analyze specific directory with custom output
npm run analyze-tokens -- ./components ./analysis.json

# Run with debug logging
npm run analyze-tokens -- --debug

# Run with performance metrics
npm run analyze-tokens -- --perf

# Run with both debug and performance tracking
npm run analyze-tokens -- --debug --perf
```

### Programmatic Usage

```typescript
import { analyzeProjectStyles } from '@your-org/token-analyzer';

async function analyze() {
  const results = await analyzeProjectStyles('./src', './analysis.json', {
    debug: true,
    perf: true,
  });

  console.log(`Analyzed ${Object.keys(results).length} files`);
}
```

## Configuration

The analyzer identifies style files based on naming conventions. By default, it looks for:

- Files containing `style` or `styles` in the name
- Files with extensions: `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs`

### Debug Configuration

Debug and performance tracking can be configured via:

1. CLI flags (as shown above)
2. Programmatic options when calling `analyzeProjectStyles`
3. Environment variables:
   - `TOKEN_ANALYZER_DEBUG=true`
   - `TOKEN_ANALYZER_PERF=true`

## Output Format

The analyzer generates a JSON file with the following structure:

```typescript
{
  "path/to/file.ts": {
    "styleName": {
      "tokens": [
        {
          "property": "color",
          "token": "tokens.colors.primary",
          "fromVariable": false  // true if reference comes from a variable
        }
      ],
      "nested": {
        "hover": {
          "tokens": [
            {
              "property": "backgroundColor",
              "token": "tokens.colors.secondary",
              "fromVariable": true,
              "sourceFile": "path/to/variables.ts"  // only present for variable references
            }
          ]
        }
      }
    }
  }
}
```

## Development

### Project Structure

```
src/
  ├── index.ts           # Main entry point
  ├── astAnalyzer.ts     # AST analysis logic
  ├── fileOperations.ts  # File handling utilities
  ├── formatter.ts       # Output formatting
  ├── debugUtils.ts      # Debug and performance utilities
  └── types.ts          # TypeScript type definitions
```

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

## Pending Improvements

- [ ] Add more granular performance metrics
- [ ] Implement different levels of debug logging
- [ ] Add output format customization
- [ ] Add parallel processing options
- [ ] Add token pattern customization
- [ ] Add file pattern customization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
