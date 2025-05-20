import { Node, SourceFile, TypeChecker, SyntaxKind, ts, Project } from 'ts-morph';
import { log } from './debugUtils.js';
import { isKnownTokenPackage } from './tokenUtils';
import { getModuleSourceFile } from './moduleResolver';

export interface ExportInfo {
  declaration: Node;
  sourceFile: SourceFile;
  moduleSpecifier: string;
  importExportSpecifierName?: string;
  valueDeclarationValue?: string;
}

// Resolves an export name to its original declaration, following aliases and re-exports
export function resolveExport(
  sourceFile: SourceFile,
  exportName: string,
  typeChecker: TypeChecker,
  project: Project
): ExportInfo | undefined {
  try {
    // Get module symbol
    const moduleSymbol = typeChecker.getSymbolAtLocation(sourceFile);
    if (!moduleSymbol) {
      return undefined;
    }

    // Get all direct exports
    const exportsArr = typeChecker.getExportsOfModule(moduleSymbol);
    // Find direct export symbol
    const symbol = exportsArr.find((s) => s.getName() === exportName);
    if (symbol) {
      const exportSpecifier = symbol?.getDeclarations().find(Node.isExportSpecifier);
      const varDeclaration = symbol?.getDeclarations().find(Node.isVariableDeclaration);

      if (varDeclaration) {
        // if we have a simple variable declaration that points to a known token import, we can return it,
        // if we have a template expression, we need to process with extractNodesFromTemplateStringLiteral
        // and then determine if any of the nodes are known token packages.
        const initializer = varDeclaration.getInitializer();
        console.log(`getting the type of var declaration ${initializer?.getKindName()}`);
        if (Node.isIdentifier(initializer)) {
          const importSpecifier = initializer.getSymbol()?.getDeclarations().find(Node.isImportSpecifier);
          if (importSpecifier) {
            const specifierName = importSpecifier.getName();
            const importDeclaration = importSpecifier.getFirstAncestorByKind(SyntaxKind.ImportDeclaration);
            const moduleSpecifier = importDeclaration?.getModuleSpecifierValue();
            if (moduleSpecifier !== undefined && isKnownTokenPackage(moduleSpecifier, specifierName)) {
              // found a known token, process
              return {
                declaration: importSpecifier,
                sourceFile: importSpecifier.getSourceFile(),
                moduleSpecifier,
                importExportSpecifierName: specifierName,
                valueDeclarationValue: specifierName,
              };
            } else if (moduleSpecifier !== undefined && ts.isExternalModuleNameRelative(moduleSpecifier)) {
              const moduleSourceFile = getModuleSourceFile(project, moduleSpecifier, sourceFile.getFilePath());
              if (moduleSourceFile) {
                return resolveExport(moduleSourceFile, specifierName, typeChecker, project);
              }
            }
          } else {
            // if we don't have an import specifier, we should check of there's another delcaration and then resolve that as well
            // This couuld be a var that points to another var that points to a known token for example.
            console.log(`no import specifier found for ${initializer.getText()}, it's a ${initializer.getKindName()}`);
          }
        } else if (Node.isTemplateExpression(initializer)) {
          console.log(`found template expression ${initializer.getText()}`);
        } else if (Node.isPropertyAccessExpression(initializer)) {
          console.log(
            `found property access ${initializer.getText()}, expression ${initializer.getExpression().getText()}`
          );
          const expressionSymbol = initializer.getExpression().getSymbol();
          const expressionImportSpecifier = expressionSymbol?.getDeclarations().find(Node.isImportSpecifier);
          if (expressionImportSpecifier) {
            const expressionSpecifierName = expressionImportSpecifier.getName();
            const expressionImportDeclaration = expressionImportSpecifier.getFirstAncestorByKind(
              SyntaxKind.ImportDeclaration
            );
            const expressionModuleSpecifier = expressionImportDeclaration?.getModuleSpecifierValue();
            if (
              expressionModuleSpecifier !== undefined &&
              isKnownTokenPackage(expressionModuleSpecifier, expressionSpecifierName)
            ) {
              // found a known token, process
              return {
                declaration: expressionImportSpecifier,
                sourceFile: expressionImportSpecifier.getSourceFile(),
                moduleSpecifier: expressionModuleSpecifier,
                importExportSpecifierName: expressionSpecifierName,
                valueDeclarationValue: initializer.getText(),
              };
            } else if (
              expressionModuleSpecifier !== undefined &&
              ts.isExternalModuleNameRelative(expressionModuleSpecifier)
            ) {
              const moduleSourceFile = getModuleSourceFile(
                project,
                expressionModuleSpecifier,
                sourceFile.getFilePath()
              );
              if (moduleSourceFile) {
                return resolveExport(moduleSourceFile, expressionSpecifierName, typeChecker, project);
              }
            }
          }
        }
      }
      if (exportSpecifier) {
        // If we have an export specifier, determine if we have a known token.
        // If not, we need to find the module name and see if it's relative. If it is, we should recursively call this
        // function to determine if there is a token. If it's not relative, we then should just end as the module
        // isn't a token source.
        const exportDeclaration = exportSpecifier.getFirstAncestorByKind(SyntaxKind.ExportDeclaration);
        const exportSpecifierName = exportSpecifier.getName();
        if (exportDeclaration) {
          const moduleSpecifier = exportDeclaration.getModuleSpecifierValue();
          if (moduleSpecifier !== undefined && isKnownTokenPackage(moduleSpecifier, exportSpecifierName)) {
            // We found a known token source, return it
            return {
              declaration: exportSpecifier,
              sourceFile: exportDeclaration.getSourceFile(),
              moduleSpecifier,
              importExportSpecifierName: exportSpecifierName,
              valueDeclarationValue: exportSpecifierName,
            };
          } else if (moduleSpecifier !== undefined && ts.isExternalModuleNameRelative(moduleSpecifier)) {
            // We have a relative module specifier, we need to resolve it
            const moduleSourceFile = getModuleSourceFile(project, moduleSpecifier, sourceFile.getFilePath());
            if (moduleSourceFile) {
              return resolveExport(moduleSourceFile, exportSpecifierName, typeChecker, project);
            }
          }
        }
      }
    }
  } catch (e) {
    log(`Error resolving export ${exportName} in ${sourceFile.getFilePath()}:`, e);
    return undefined;
  }
}
