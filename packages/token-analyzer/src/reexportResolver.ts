import { Node, SourceFile, Symbol, TypeChecker, ImportDeclaration, SyntaxKind, ExportDeclaration } from 'ts-morph';
import { log } from './debugUtils.js';
import { knownTokenImportsAndModules } from './types.js';

export interface ExportInfo {
  declaration: Node;
  sourceFile: SourceFile;
  moduleSpecifier: string;
  importExportSpecifierName?: string;
  valueDeclarationValue?: string;
}

export function isKnownTokenPackage(moduleSpecifier: string, valueName?: string): boolean {
  const keys = Object.keys(knownTokenImportsAndModules);
  return (
    (valueName && keys.includes(valueName) && knownTokenImportsAndModules[valueName].includes(moduleSpecifier)) ||
    knownTokenImportsAndModules.default.includes(moduleSpecifier)
  );
}

// Resolves an export name to its original declaration, following aliases and re-exports
export function resolveExport(
  sourceFile: SourceFile,
  exportName: string,
  typeChecker: TypeChecker
): ExportInfo | undefined {
  try {
    // Handle named re-exports (export { foo as bar } from './module')
    for (const exportDecl of sourceFile.getExportDeclarations()) {
      const targetFile = exportDecl.getModuleSpecifierSourceFile();
      if (!targetFile) continue;
      for (const specifier of exportDecl.getNamedExports()) {
        const alias = specifier.getAliasNode()?.getText() ?? specifier.getNameNode().getText();
        const name = specifier.getNameNode().getText();
        if (alias === exportName) {
          // Follow into target module with original name
          return resolveExport(targetFile, name, typeChecker);
        }
      }
    }

    // Get module symbol
    const moduleSymbol = typeChecker.getSymbolAtLocation(sourceFile);
    if (!moduleSymbol) return undefined;
    // Get all direct exports
    const exportsArr = typeChecker.getExportsOfModule(moduleSymbol);
    // Find direct export symbol
    let symbol = exportsArr.find((s) => s.getName() === exportName);

    // Handle star re-exports (export * from 'module')
    if (!symbol) {
      for (const exportDecl of sourceFile.getExportDeclarations()) {
        // include export * from. isNamespaceExport covers 'export * as', but also check if no namedExports
        if (!exportDecl.isNamespaceExport() && exportDecl.getNamedExports().length === 0) {
          const target = exportDecl.getModuleSpecifierSourceFile();
          if (target) {
            const nested = resolveExport(target, exportName, typeChecker);
            if (nested) return nested;
          }
        }
      }
      return undefined;
    }

    // Walk alias chain and check for knownTokenPackage at each step
    let currentSymbol: Symbol | undefined = symbol;
    while (currentSymbol) {
      const decls = currentSymbol.getDeclarations();
      for (const decl of decls) {
        if (Node.isImportSpecifier(decl)) {
          const importDecl = decl.getFirstAncestorByKind(SyntaxKind.ImportDeclaration) as ImportDeclaration;
          if (importDecl) {
            const moduleSpecifier = importDecl.getModuleSpecifierValue();
            const valueName = decl.getName();
            if (isKnownTokenPackage(moduleSpecifier, valueName)) {
              return {
                declaration: decl,
                sourceFile: importDecl.getSourceFile(),
                moduleSpecifier,
                importExportSpecifierName: valueName,
                valueDeclarationValue: valueName,
              };
            }
          }
        }
      }
      if (!currentSymbol.isAlias()) break;
      const aliased = typeChecker.getImmediatelyAliasedSymbol(currentSymbol) as Symbol;
      if (!aliased || aliased === currentSymbol) break;
      currentSymbol = aliased;
    }

    // Fallback: use local declaration in this module
    const decl = symbol.getValueDeclaration() ?? symbol.getDeclarations()[0];
    if (!decl) return undefined;

    const declSourceFile = decl.getSourceFile();
    const moduleSpecifier = declSourceFile.getFilePath();
    // Extract the value text (initializer or expression) for accurate token reference
    let valueDeclarationValue: string | undefined;
    if (Node.isVariableDeclaration(decl)) {
      const init = decl.getInitializer();
      valueDeclarationValue = init?.getText();
    } else if (Node.isExportAssignment(decl)) {
      const expr = decl.getExpression();
      valueDeclarationValue = expr.getText();
    } else {
      valueDeclarationValue = decl.getText();
    }

    return {
      declaration: decl,
      sourceFile: declSourceFile,
      moduleSpecifier,
      importExportSpecifierName: symbol.getName(),
      valueDeclarationValue,
    };
  } catch (e) {
    log(`Error resolving export ${exportName} in ${sourceFile.getFilePath()}:`, e);
    return undefined;
  }
}
