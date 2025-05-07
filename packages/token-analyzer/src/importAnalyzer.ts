// importAnalyzer.ts
import { Project, Node, SourceFile, ImportDeclaration, Symbol, TypeChecker } from 'ts-morph';
import { log } from './debugUtils.js';
import { knownTokenImportsAndModules } from './types.js';
import { getModuleSourceFile } from './moduleResolver.js';
import { getInitializerFromIdentifier } from './tokenUtils';

/**
 * Represents a value imported from another module
 */
export interface ImportedValue {
  value: string;
  sourceFile: string;
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
        sourceFile: importedFile.getFilePath(),
      });

      log(`Added known token import: ${alias} = ${importName} from ${importedFile.getFilePath()}`);
    } else {
      // Find the export's true source using TypeScript's type checker
      const exportInfo = findExportDeclaration(importedFile, importName, typeChecker);

      if (exportInfo) {
        const {
          sourceFile: declarationFile,
          moduleSpecifier: exportModuleSpecifier,
          importExportSpecifierName,
          valueDeclarationValue,
        } = exportInfo;
        // We need to first check if the import is coming from a known token package
        if (isKnownTokenPackage(exportModuleSpecifier, importExportSpecifierName ?? importName)) {
          // We don't have a direct known token import, so process where the value is declared and determine if that's a
          // known token package or not. If not, we can omit the value.

          importedValues.set(alias, {
            // TODO we should set the value to the end token resolution, for now we will process to the import if this is an import
            // which we need to get from findExportDeclaration and the processing within that function
            value: valueDeclarationValue ?? importName,
            node: nameOrAliasNode,
            knownTokenPackage: true,
            sourceFile: declarationFile.getFilePath(),
          });

          log(`Added imported value: ${alias} =  from ${exportModuleSpecifier}`);
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
      sourceFile: importedFile.getFilePath(),
    });
  } else {
    // Find the default export's true source
    const exportInfo = findExportDeclaration(importedFile, 'default', typeChecker);

    if (exportInfo) {
      const {
        sourceFile: declarationFile,
        moduleSpecifier: exportModuleSpecifier,
        importExportSpecifierName,
        valueDeclarationValue,
      } = exportInfo;

      if (isKnownTokenPackage(exportModuleSpecifier, importExportSpecifierName ?? importName)) {
        importedValues.set(importName, {
          // TODO we should set the value to the end token resolution, for now we will process to the import if this is an import
          // which we need to get from findExportDeclaration and the processing within that function
          value: valueDeclarationValue ?? importName,
          node: defaultImport,
          knownTokenPackage: true,
          sourceFile: declarationFile.getFilePath(),
        });
        log(
          `Added default import: ${importName} = ${
            valueDeclarationValue ?? importName
          } from ${declarationFile.getFilePath()}`
        );
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
      sourceFile: importedFile.getFilePath(),
    });
  }
}

function getModuleSpecifierFromExportSymbol(symbol: Symbol): {
  moduleSpecifier: string | undefined;
  sourceFile: SourceFile | undefined;
  declaration: Node | undefined;
  specifier: Node | undefined;
  specifierName: string | undefined;
} {
  let moduleSpecifier: string | undefined;
  let sourceFile: SourceFile | undefined;
  let declaration: Node | undefined;
  let specifier: Node | undefined;
  let specifierName: string | undefined;
  symbol.getDeclarations().forEach((symbolDeclaration) => {
    if (Node.isVariableDeclaration(symbolDeclaration)) {
      let symbolInitializer = symbolDeclaration.getInitializer();
      if (Node.isPropertyAccessExpression(symbolInitializer)) {
        symbolInitializer = symbolInitializer.getExpression();
      }

      const varSymbol = symbolInitializer?.getSymbol();
      if (varSymbol) {
        const varImportSpecifier = varSymbol.getDeclarations().find((varDeclaration) => {
          return Node.isImportSpecifier(varDeclaration);
        });
        const varImportSymbol = varImportSpecifier?.getSymbol();
        specifier = varImportSpecifier;
        specifierName = varImportSpecifier?.getName();
        if (varImportSymbol) {
          const {
            moduleSpecifier: newSpecifier,
            sourceFile: newSourceFile,
            declaration: newDeclaration,
          } = getModuleSpecifierFromExportSymbol(varImportSymbol);
          moduleSpecifier = newSpecifier;
          sourceFile = newSourceFile;
          declaration = newDeclaration;
        }
      }
    } else if (Node.isExportAssignment(symbolDeclaration)) {
      // we have a default export and need to break down the expression to find the value
      const symbolExpression = symbolDeclaration.getExpression();
      if (Node.isIdentifier(symbolExpression)) {
        const symbolInitializer = getInitializerFromIdentifier(symbolExpression);
        if (Node.isPropertyAccessExpression(symbolInitializer)) {
          const accessExpressionSymbol = symbolInitializer.getExpression().getSymbol();
          const varImportSpecifier = accessExpressionSymbol?.getDeclarations().find((varDeclaration) => {
            return Node.isImportSpecifier(varDeclaration);
          });

          specifier = varImportSpecifier;
          specifierName = varImportSpecifier?.getName();
          if (accessExpressionSymbol) {
            const {
              moduleSpecifier: newSpecifier,
              sourceFile: newSourceFile,
              declaration: newDeclaration,
            } = getModuleSpecifierFromExportSymbol(accessExpressionSymbol);
            moduleSpecifier = newSpecifier;
            sourceFile = newSourceFile;
            declaration = newDeclaration;
          }
        }
      } else if (Node.isPropertyAccessExpression(symbolExpression)) {
        // Get the property access expression's expression (the token part of token.someValue)
        // From here we can extract the symbol and recurse.
        const accessExpressionSymbol = symbolExpression.getExpression().getSymbol();
        const varImportSpecifier = accessExpressionSymbol?.getDeclarations().find((varDeclaration) => {
          return Node.isImportSpecifier(varDeclaration);
        });

        specifier = varImportSpecifier;
        specifierName = varImportSpecifier?.getName();
        if (accessExpressionSymbol) {
          const {
            moduleSpecifier: newSpecifier,
            sourceFile: newSourceFile,
            declaration: newDeclaration,
          } = getModuleSpecifierFromExportSymbol(accessExpressionSymbol);
          moduleSpecifier = newSpecifier;
          sourceFile = newSourceFile;
          declaration = newDeclaration;
        }
      }
    } else {
      // Walk the tree until we find an ExportDeclaration
      let currentDeclaration: Node | undefined = symbolDeclaration;
      while (
        Node.isExportSpecifier(currentDeclaration) ||
        Node.isNamedExports(currentDeclaration) ||
        Node.isImportSpecifier(currentDeclaration) ||
        Node.isNamedImports(currentDeclaration) ||
        Node.isImportClause(currentDeclaration)
      ) {
        if (Node.isExportSpecifier(currentDeclaration) || Node.isImportSpecifier(currentDeclaration)) {
          specifier = currentDeclaration;
          specifierName = currentDeclaration.getName();
        }
        currentDeclaration = currentDeclaration.getParent();
      }

      if (Node.isExportDeclaration(currentDeclaration) || Node.isImportDeclaration(currentDeclaration)) {
        moduleSpecifier = currentDeclaration.getModuleSpecifierValue();
        sourceFile = currentDeclaration.getSourceFile();
        declaration = currentDeclaration;
      }
    }
  });
  return { moduleSpecifier, sourceFile, declaration, specifier, specifierName };
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
      knownTokenModuleSpecifier: string;
      knownTokenSourceFile?: SourceFile;
      knownTokenDeclaration?: Node;
      knownTokenImportExportName?: string;
      knownTokenImportExportSpecifier?: Node;
      knownTokenValueDeclarationValue?: string;
    }
  | undefined {
  // Get the module specifier if we're an export specifier
  const { moduleSpecifier, sourceFile, declaration, specifier, specifierName } =
    getModuleSpecifierFromExportSymbol(exportSymbol);

  const isAlias = exportSymbol.isAlias();
  if (moduleSpecifier) {
    if (isKnownTokenPackage(moduleSpecifier, specifierName)) {
      let tokenValueDeclaration = exportSymbol.getValueDeclaration();
      if (Node.isVariableDeclaration(tokenValueDeclaration)) {
        tokenValueDeclaration = tokenValueDeclaration.getInitializer();
      }
      exportSymbol.getDeclarations().forEach((declaration) => {
        if (Node.isExportAssignment(declaration)) {
          tokenValueDeclaration = declaration.getExpression();
        }
      });
      return {
        knownTokenModuleSpecifier: moduleSpecifier,
        knownTokenSourceFile: sourceFile,
        knownTokenDeclaration: declaration ?? exportSymbol.getValueDeclaration(),
        knownTokenImportExportName: specifierName,
        knownTokenImportExportSpecifier: specifier,
        knownTokenValueDeclarationValue: tokenValueDeclaration?.getText(),
      };
    }
    // If this is an alias (re-export), get the original symbol
    else if (isAlias) {
      let resolvedSymbol: Symbol = exportSymbol;
      // we're ok type casting here because we know the symbol is an alias from the previous check but TS won't pick up on it
      resolvedSymbol = typeChecker.getImmediatelyAliasedSymbol(exportSymbol) as Symbol;
      if (isKnownTokenPackage(moduleSpecifier, resolvedSymbol.getName())) {
        let tokenValueDeclaration = resolvedSymbol.getValueDeclaration();
        if (Node.isVariableDeclaration(tokenValueDeclaration)) {
          tokenValueDeclaration = tokenValueDeclaration.getInitializer();
        }
        return {
          knownTokenModuleSpecifier: moduleSpecifier,
          knownTokenSourceFile: sourceFile,
          knownTokenDeclaration: declaration ?? resolvedSymbol.getValueDeclaration(),
          knownTokenImportExportName: specifierName,
          knownTokenImportExportSpecifier: specifier,
          knownTokenValueDeclarationValue: tokenValueDeclaration?.getText(),
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
):
  | {
      declaration: Node;
      sourceFile: SourceFile;
      moduleSpecifier: string;
      valueDeclarationValue?: string;
      importExportSpecifierName?: string;
      importExportSpecifier?: Node;
    }
  | undefined {
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
        importExportSpecifierName: tokenInfo.knownTokenImportExportName,
        importExportSpecifier: tokenInfo.knownTokenImportExportSpecifier,
        valueDeclarationValue: tokenInfo.knownTokenValueDeclarationValue,
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
  // Extract the value from the declaration
  // TODO find the value of the token and then pass it into the values. This might be a string or template literal and
  // we can use this later but it isn't needed for token identification, more for value processing down the line
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
