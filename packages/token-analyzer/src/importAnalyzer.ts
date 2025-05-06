// importAnalyzer.ts
import { Project, Node, SourceFile, ImportDeclaration, Symbol, TypeChecker } from 'ts-morph';
import { log } from './debugUtils.js';
import { knownTokenImportsAndModules } from './types.js';
import { getModuleSourceFile } from './moduleResolver.js';

/**
 * Represents a value imported from another module
 */
export interface ImportedValue {
  value: string;
  node: Node;
  knownTokenPackage: boolean;
}

/**
 * Analyzes imports in a source file to extract string values
 */
export async function analyzeImports(sourceFile: SourceFile, project: Project): Promise<Map<string, ImportedValue>> {
  const importedValues = new Map<string, ImportedValue>();
  const filePath = sourceFile.getFilePath();

  log(`Analyzing imports in ${filePath}`);

  // Get TypeScript's type checker
  const typeChecker = project.getTypeChecker();

  // Process all import declarations
  for (const importDecl of sourceFile.getImportDeclarations()) {
    try {
      // Process the import declaration
      await processImportDeclaration(importDecl, sourceFile, project, importedValues, typeChecker);
    } catch (err) {
      log(`Error processing import: ${importDecl.getModuleSpecifierValue()}`, err);
    }
  }

  return importedValues;
}

/**
 * Process a single import declaration
 */
async function processImportDeclaration(
  importDecl: ImportDeclaration,
  sourceFile: SourceFile,
  project: Project,
  importedValues: Map<string, ImportedValue>,
  typeChecker: TypeChecker
): Promise<void> {
  const moduleSpecifier = importDecl.getModuleSpecifierValue();
  const containingFilePath = sourceFile.getFilePath();
  // Use our module resolver to get the imported file
  const importedFile = getModuleSourceFile(project, moduleSpecifier, containingFilePath);

  if (!importedFile) {
    log(`Could not resolve module: ${moduleSpecifier}`);
    return;
  }

  // Process named imports (import { x } from 'module')
  processNamedImports(importDecl, importedFile, project, importedValues, typeChecker, moduleSpecifier);

  // Process default import (import x from 'module')
  processDefaultImport(importDecl, importedFile, project, importedValues, typeChecker, moduleSpecifier);

  processNamespaceImport(importDecl, importedFile, project, importedValues, typeChecker, moduleSpecifier);
}

/**
 * Process named imports using TypeScript's type checker to follow re-exports
 */
function processNamedImports(
  importDecl: ImportDeclaration,
  importedFile: SourceFile,
  project: Project,
  importedValues: Map<string, ImportedValue>,
  typeChecker: TypeChecker,
  moduleSpecifier: string
): void {
  for (const namedImport of importDecl.getNamedImports()) {
    // We want to keep the node reference the same as the original import so when we do equality checks we can ensure
    // we're going to get a valid result. If we moved to use a nested value we'd never get a true result across files.
    const nameOrAliasNode = namedImport.getAliasNode() ?? namedImport;
    const importName = namedImport.getName();
    const alias = namedImport.getAliasNode()?.getText() || importName;

    // We should process the imports module import first to determine if it's a known token package
    // If it's not, we can then process it's value as it's likely another file within the application or library.
    if (isKnownTokenPackage(moduleSpecifier, importName)) {
      importedValues.set(alias, {
        value: importName,
        node: nameOrAliasNode, // Use the alias node if available, otherwise use the declaration
        knownTokenPackage: true,
      });

      log(`Added known token import: ${alias} = ${importName} from ${importedFile.getFilePath()}`);
    } else {
      // Find the export's true source using TypeScript's type checker
      const exportInfo = findExportDeclaration(importedFile, importName, typeChecker);

      if (exportInfo) {
        const { declaration, sourceFile: declarationFile, moduleSpecifier: exportModuleSpecifier } = exportInfo;
        // We need to first check if the import is coming from a known token package

        // Extract the value from the declaration
        const valueInfo = extractValueFromDeclaration(declaration);
        if (valueInfo) {
          // We don't have a direct known token import, so process where the value is declared and determine if that's a
          // known token package or not. If not, we can omit the value.

          importedValues.set(alias, {
            value: valueInfo.value,
            node: nameOrAliasNode,
            knownTokenPackage: isKnownTokenPackage(exportModuleSpecifier, importName),
          });

          log(`Added imported value: ${alias} = ${valueInfo.value} from ${declarationFile.getFilePath()}`);
        }
      }
    }
  }
}

/**
 * Process default import using TypeScript's type checker
 */
function processDefaultImport(
  importDecl: ImportDeclaration,
  importedFile: SourceFile,
  project: Project,
  importedValues: Map<string, ImportedValue>,
  typeChecker: TypeChecker,
  moduleSpecifier: string
): void {
  const defaultImport = importDecl.getDefaultImport();
  if (!defaultImport) {
    log(`No default import found in ${importDecl.getModuleSpecifierValue()}`);
    return;
  }

  const importName = defaultImport.getText();

  if (isKnownTokenPackage(moduleSpecifier)) {
    importedValues.set(importName, {
      value: importName,
      node: importDecl,
      knownTokenPackage: true,
    });
  } else {
    // Find the default export's true source
    const exportInfo = findExportDeclaration(importedFile, 'default', typeChecker);

    if (exportInfo) {
      const { declaration, sourceFile: declarationFile } = exportInfo;

      // Extract the value from the declaration
      const valueInfo = extractValueFromDeclaration(declaration);
      if (valueInfo) {
        importedValues.set(importName, {
          value: valueInfo.value,
          node: declaration,
          knownTokenPackage: false,
        });

        log(`Added default import: ${importName} = ${valueInfo.value} from ${declarationFile.getFilePath()}`);
      }
    }
  }
}

function processNamespaceImport(
  importDecl: ImportDeclaration,
  importedFile: SourceFile,
  project: Project,
  importedValues: Map<string, ImportedValue>,
  typeChecker: TypeChecker,
  moduleSpecifier: string
): void {
  const namespaceImport = importDecl.getNamespaceImport();
  if (!namespaceImport) {
    log(`No namespace import found in ${importDecl.getModuleSpecifierValue()}`);
    return;
  }

  // We need to resolve any re-exports to find the true source of the namespace import just as we do with the
  // other import types. Mark as TODO to handle this in the future. We don't expect many to deeply nest namespace
  // imports but it's possible. We can prioritize if we see this as a common pattern.

  const importName = namespaceImport.getText();
  // Find the default export's true source
  if (isKnownTokenPackage(moduleSpecifier)) {
    importedValues.set(importName, {
      value: importName,
      node: namespaceImport,
      knownTokenPackage: true,
    });
  }
}

function getModuleSpecifierFromExportSymbol(symbol: Symbol): {
  moduleSpecifier: string | undefined;
  sourceFile: SourceFile | undefined;
  declaration: Node | undefined;
} {
  let moduleSpecifier: string | undefined;
  let sourceFile: SourceFile | undefined;
  let declaration: Node | undefined;
  symbol.getDeclarations().forEach((declaration) => {
    if (Node.isVariableDeclaration(declaration)) {
      const varSymbol = declaration.getInitializer()?.getSymbol();
      if (varSymbol) {
        const varImportSpecifier = varSymbol.getDeclarations().find((varDeclaration) => {
          return Node.isImportSpecifier(varDeclaration);
        });
        const varImportSymbol = varImportSpecifier?.getSymbol();
        if (varImportSymbol) {
          return getModuleSpecifierFromExportSymbol(varImportSymbol);
        }
      }
    } else {
      // Walk the tree until we find an ExportDeclaration
      let currentDeclaration: Node | undefined = declaration;
      while (
        Node.isExportSpecifier(currentDeclaration) ||
        Node.isNamedExports(currentDeclaration) ||
        Node.isImportSpecifier(currentDeclaration) ||
        Node.isNamedImports(currentDeclaration) ||
        Node.isImportClause(currentDeclaration)
      ) {
        currentDeclaration = currentDeclaration.getParent();
      }

      if (Node.isExportDeclaration(currentDeclaration) || Node.isImportDeclaration(currentDeclaration)) {
        moduleSpecifier = currentDeclaration.getModuleSpecifierValue();
        sourceFile = currentDeclaration.getSourceFile();
        declaration = currentDeclaration;
      }
    }
  });
  return { moduleSpecifier, sourceFile, declaration };
}

function isKnownTokenPackage(moduleSpecifier: string, valueName?: string): boolean {
  const knownTokenKeys = Object.keys(knownTokenImportsAndModules);
  return (
    (valueName !== undefined &&
      knownTokenKeys.includes(valueName) &&
      knownTokenImportsAndModules[valueName].includes(moduleSpecifier)) ||
    knownTokenImportsAndModules.default.includes(moduleSpecifier)
  );
}

/**
 * Function that walks up the aliases to find the nearest import/export declaration with a known token package
 */
function findNearestKnownTokenInfo(
  exportSymbol: Symbol,
  typeChecker: TypeChecker
):
  | {
      knownTokenSymbol: Symbol;
      knownTokenModuleSpecifier: string;
      knownTokenSourceFile?: SourceFile;
      knownTokenDeclaration?: Node;
    }
  | undefined {
  // Get the module specifier if we're an export specifier
  const { moduleSpecifier, sourceFile, declaration } = getModuleSpecifierFromExportSymbol(exportSymbol);

  const isAlias = exportSymbol.isAlias();
  if (moduleSpecifier) {
    // If this is an alias (re-export), get the original symbol
    let resolvedSymbol: Symbol = exportSymbol;
    if (isAlias) {
      // we're ok type casting here because we know the symbol is an alias from the previous check but TS won't pick up on it
      resolvedSymbol = typeChecker.getImmediatelyAliasedSymbol(exportSymbol) as Symbol;
      // console.log(`Resolved alias to: ${resolvedSymbol.getName()}`, moduleSpecifier);
      if (isKnownTokenPackage(moduleSpecifier, resolvedSymbol.getName())) {
        return {
          knownTokenSymbol: resolvedSymbol,
          knownTokenModuleSpecifier: moduleSpecifier,
          knownTokenSourceFile: sourceFile,
          knownTokenDeclaration: declaration ?? resolvedSymbol.getValueDeclaration(),
        };
      } else {
        return findNearestKnownTokenInfo(resolvedSymbol, typeChecker);
      }
    }
  }
  return undefined;
}

/**
 * Find an export's original declaration using TypeScript's type checker
 */
function findExportDeclaration(
  sourceFile: SourceFile,
  exportName: string,
  typeChecker: TypeChecker
): { declaration: Node; sourceFile: SourceFile; moduleSpecifier: string } | undefined {
  try {
    // Get the source file's symbol (represents the module)
    const sourceFileSymbol = typeChecker.getSymbolAtLocation(sourceFile);
    if (!sourceFileSymbol) {
      log(`No symbol found for source file ${sourceFile.getFilePath()}`);
      return undefined;
    }

    // Get all exports from this module
    const exports = typeChecker.getExportsOfModule(sourceFileSymbol);
    if (!exports || exports.length === 0) {
      log(`No exports found in module ${sourceFile.getFilePath()}`);
      return undefined;
    }

    // Find the specific export we're looking for
    const exportSymbol = exports.find((symbol: Symbol) => symbol.getName() === exportName);
    if (!exportSymbol) {
      log(`Export symbol '${exportName}' not found in ${sourceFile.getFilePath()}`);
      return undefined;
    }

    const tokenInfo = findNearestKnownTokenInfo(exportSymbol, typeChecker);

    if (tokenInfo && tokenInfo.knownTokenDeclaration && tokenInfo.knownTokenSourceFile) {
      return {
        declaration: tokenInfo.knownTokenDeclaration,
        sourceFile: tokenInfo.knownTokenSourceFile,
        moduleSpecifier: tokenInfo.knownTokenModuleSpecifier,
      };
    }
  } catch (err) {
    log(`Error finding export declaration for ${exportName}:`, err);
    return undefined;
  }
}

/**
 * Extract string value from a declaration node
 */
function extractValueFromDeclaration(declaration: Node): { value: string } | undefined {
  // Handle variable declarations
  if (Node.isVariableDeclaration(declaration)) {
    return { value: declaration.getNameNode().getText() };
  }

  // TODO IF NEEDED
  // Handle right side of declaration if the assignment is from a known token package
  // Handle template literals here if needed (we don't so far but may).
  // We might also need to fully process the value but we'd do this by calling getAliasNode() on the value node and
  // then getting the value declaration.

  return undefined;
}
