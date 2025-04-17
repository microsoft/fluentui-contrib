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
- Dedupe logic from extractTokensFromText and isTokenReference
- Add token test that determines which package tokens come from. IE (@fluentui/tokens or @fluentui/semantic-tokens)
- Data Flow
  - find all styles files
  - get all imports, analyze them for token references or values, return them to the main script flow
  - process merge styles and map meta data to styles
  - parse through each property of styles
    - with each property,we should look at whether an initializer is there, spread, delaration etc and then determine if that's a token. if it is, we also need to see if there's a fallback chain and not just log a token but also log the tokens in the right order (this should also open the door to ensure we don't over complicate or duplicate logic here)

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
