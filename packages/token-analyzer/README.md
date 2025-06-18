# Design Token Usage Analyzer

A static analysis tool that scans your project's style files to track and analyze design token usage. The analyzer helps identify where and how design tokens are being used across your codebase, making it easier to maintain consistency and track token adoption. The data from this tool can also be used to create other tools like theme designers.

### How it works

The tool first scans for the common pattern of `styles` or `style` being in the file name (along with common file extensions). From there it checks all imports to see if there are imports of known tokens. Currently, the list of known tokens and packages are internally maintained but we could easily expose this for extension libraries as well. See [knownTokenImportsAndModules](./src/types.ts#L65) in `types.ts` for the current list. This analysis isn't just done for direct imports but for any re-exports, new variable declarations, template expressions values, etc. This hopefully covers a wide range of scenarios the tool might encounter in code but it's possible there's more edge cases. Please report any issues you find so we can fix them and add new tests. Once this mapping is done, the tool scans for `makeStyles`, `makeResetStyles` and `mergeStyles` to build a comprehensive picture of what styles use which tokens, what meta data is considered when applying the styles and what properties they're applied to. As a result, this tool is targeted towards Griffel based styles for now. Since this tool works off the AST maps the usage of tokens and imports back to their symbols instead of just string analysis which we've found to be quite robust. Once analysis is complete, it outputs a JSON file with the mappings. By default it will produce a single analysis file for a given run. Multiple files are under an object key with their relative path within the JSON file.

## TODO

- add config to point to custom prettier config for file output.
- add tests for findTsConfigPath
- Remove `extractTokensFromText` as we're only using it to help with `getPropertiesForShorthand`, we should leverage the existing analysis for this
- update contributing doc with info about version management
- Update test to return promise instead of async/await function.
- Add ability to customize glob used to find style files
- Add ability to add known tokens
- Read gitignore from target dir and use that for ignore if we find one. (currently hard coded).
- Add 'thorough' or 'complete' mode that doesn't filter files based on `style` or styles` in the name.
-

## Installation

```bash
npm install --save-dev @fluentui-contrib/token-analyzer
```

or

```bash
yarn add @fluentui-contrib/token-analyzer -D
```

## Usage

### Command Line Interface

Run the style analysis tool:

```bash
npm run analyze-tokens [options]
```

### Options

| Option      | Alias | Type    | Default                 | Description                           |
| ----------- | ----- | ------- | ----------------------- | ------------------------------------- |
| `--root`    | `-r`  | string  | `./src`                 | Root directory to analyze             |
| `--output`  | `-o`  | string  | `./token-analysis.json` | Output file path for results          |
| `--debug`   | `-d`  | boolean | `false`                 | Enable debug mode for verbose logging |
| `--perf`    | `-p`  | boolean | `false`                 | Enable performance tracking           |
| `--help`    | `-h`  | -       | -                       | Show help information                 |
| `--version` | -     | -       | -                       | Show version number                   |

### Examples

**Basic usage (uses defaults):**

```bash
npm run analyze-tokens
```

**Custom directory and output:**

```bash
npm run analyze-tokens -- --root ./components --output ./analysis-results.json
```

**With debugging and performance tracking:**

```bash
npm run analyze-tokens -- --root ./src/components --debug --perf
```

### Getting Help

View all available options and examples:

```bash
npm run analyze-tokens --help
# or
npm run analyze-tokens -h
```

View version information:

```bash
npm run analyze-tokens --version
```

### Output

The tool will display progress information and a summary:

```
Starting analysis of ./src
Output will be written to ./token-analysis.json
Debug mode enabled
Performance tracking enabled

Analysis complete!
Processed 23 files containing styles
Found 156 token references
```

Results are saved as JSON to the specified output file, containing detailed analysis of each file's style usage and token references.

### Programmatic Usage

```typescript
import { analyzeProjectStyles } from '@fluentui-contrib/token-analyzer';

async function analyze() {
  const results = await analyzeProjectStyles('./src', './analysis.json', {
    debug: true,
    perf: true,
  });

  console.log(`Analyzed ${Object.keys(results).length} files`);
}
```

## Example JSON Output

Below is a simplification of styles output that the tool might produce. Note that the `assignedVariables` field corresponds to the key name under `styleConditions`.

```json
{
  "useButtonStyles.styles.ts": {
    "styles": {
      "useRootBaseClassName": {
        "resetStyles": {
          "tokens": [
            {
              "property": "backgroundColor",
              "token": ["tokens.colorNeutralBackground1"],
              "path": ["backgroundColor"]
            },
            {
              "property": "color",
              "token": ["semanticTokens.cornerFlyoutRest"],
              "path": ["color"]
            },
            {
              "property": "border",
              "token": ["tokens.strokeWidthThin"],
              "path": ["border"]
            },
            {
              "property": "border",
              "token": ["tokens.colorNeutralStroke1"],
              "path": ["border"]
            },
            {
              "property": "fontFamily",
              "token": ["textStyleAiHeaderFontfamily"],
              "path": ["fontFamily"]
            },
            {
              "property": "padding",
              "token": ["tokens.spacingHorizontalM"],
              "path": ["padding"]
            },
            {
              "property": "borderRadius",
              "token": ["tokens.borderRadiusMedium"],
              "path": ["borderRadius"]
            },
            {
              "property": "fontSize",
              "token": ["tokens.fontSizeBase300"],
              "path": ["fontSize"]
            },
            {
              "property": "fontWeight",
              "token": ["tokens.fontWeightSemibold"],
              "path": ["fontWeight"]
            },
            {
              "property": "lineHeight",
              "token": ["tokens.lineHeightBase300"],
              "path": ["lineHeight"]
            },
            {
              "property": "transitionDuration",
              "token": ["tokens.durationFaster"],
              "path": ["transitionDuration"]
            },
            {
              "property": "transitionTimingFunction",
              "token": ["tokens.curveEasyEase"],
              "path": ["transitionTimingFunction"]
            }
          ],
          "nested": {
            "':hover'": {
              "tokens": [
                {
                  "property": "backgroundColor",
                  "token": ["cornerCtrlLgHoverRaw"],
                  "path": ["':hover'", "backgroundColor"]
                },
                {
                  "property": "borderColor",
                  "token": ["ctrlLinkForegroundBrandHover"],
                  "path": ["':hover'", "borderColor"]
                },
                {
                  "property": "color",
                  "token": ["tokens.colorNeutralForeground1Hover"],
                  "path": ["':hover'", "color"]
                }
              ]
            }
          },
          "isResetStyles": true,
          "assignedVariables": ["rootBaseClassName"]
        }
      },
      "useRootDisabledStyles": {
        "base": {
          "tokens": [
            {
              "property": "backgroundColor",
              "token": ["tokens.colorNeutralBackgroundDisabled"],
              "path": ["backgroundColor"]
            },
            {
              "property": "borderTopColor",
              "token": ["tokens.colorNeutralStrokeDisabled"],
              "path": ["borderTopColor"]
            },
            {
              "property": "borderRightColor",
              "token": ["tokens.colorNeutralStrokeDisabled"],
              "path": ["borderRightColor"]
            },
            {
              "property": "borderBottomColor",
              "token": ["tokens.colorNeutralStrokeDisabled"],
              "path": ["borderBottomColor"]
            },
            {
              "property": "borderLeftColor",
              "token": ["tokens.colorNeutralStrokeDisabled"],
              "path": ["borderLeftColor"]
            },
            {
              "property": "color",
              "token": ["tokens.colorNeutralForegroundDisabled"],
              "path": ["color"]
            }
          ],
          "assignedVariables": ["rootDisabledStyles"]
        }
      }
    },
    "metadata": {
      "styleConditions": {
        "rootBaseClassName": {
          "isBase": true,
          "slotName": "root"
        },
        "rootDisabledStyles.base": {
          "conditions": ["(disabled || disabledFocusable)"],
          "slotName": "root"
        }
      }
    }
  }
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

## Development

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
