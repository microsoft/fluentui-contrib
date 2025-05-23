import { Node, SourceFile, TypeChecker, SyntaxKind, ts, Project, ImportSpecifier } from 'ts-morph';
import { log } from './debugUtils.js';
import { isKnownTokenPackage } from './tokenUtils';
import { getModuleSourceFile } from './moduleResolver';
import { extractNodesFromTemplateStringLiteral } from './processTemplateStringLiteral';
import { TemplateGroupItem } from './importAnalyzer';

export interface ExportInfo {
  declaration: Node;
  sourceFile: SourceFile;
  moduleSpecifier: string;
  importExportSpecifierName?: string;
  valueDeclarationValue?: string;
  templateGroups?: TemplateGroupItem[][];
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
      const exportAssignment = symbol?.getDeclarations().find(Node.isExportAssignment);

      if (varDeclaration) {
        // if we have a simple variable declaration that points to a known token import, we can return it,
        // if we have a template expression, we need to process with extractNodesFromTemplateStringLiteral
        // and then determine if any of the nodes are known token packages.
        const initializer = varDeclaration.getInitializer();
        log(`getting the type of var declaration ${initializer?.getKindName()}`);
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
            // if we don't have an import specifier, we should check of there's another declaration and then resolve that as well
            // This could be a var that points to another var that points to a known token for example.
            // Since we haven't encountered this scenario yet, we'll leave this as a log entry
            log(`no import specifier found for ${initializer.getText()}, it's a ${initializer.getKindName()}`);
          }
        } else if (Node.isTemplateExpression(initializer)) {
          const templates = extractNodesFromTemplateStringLiteral(initializer);
          const filteredExpressions = templates.extractedExpressions
            .map((group) => {
              const newGroup: TemplateGroupItem[] = [];
              group.forEach((node) => {
                const nodeInfo = isNodeToken(node, typeChecker, project);
                if (nodeInfo?.isToken) {
                  newGroup.push({
                    node,
                    actualTokenValue: nodeInfo.declarationValue,
                  });
                }
              });
              return newGroup;
            })
            .filter((group) => group.length > 0);
          if (filteredExpressions.length > 0) {
            return {
              declaration: initializer,
              sourceFile: initializer.getSourceFile(),
              moduleSpecifier: '',
              importExportSpecifierName: '',
              valueDeclarationValue: initializer.getText(),
              templateGroups: filteredExpressions,
            };
          }
          // from here we should filter the nodes to see if any of them are known token packages and then return the groups if they are still present.
          // We'll need to filter each node group and then if no nodes in that group are found, we should remove the group.
        } else if (Node.isPropertyAccessExpression(initializer)) {
          log(`found property access ${initializer.getText()}, expression ${initializer.getExpression().getText()}`);
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
      if (exportAssignment) {
        const exportExpression = exportAssignment.getExpression();
        const tokenInfo = isNodeToken(exportExpression, typeChecker, project);
        if (tokenInfo?.isToken) {
          return {
            declaration: exportAssignment,
            sourceFile: exportAssignment.getSourceFile(),
            moduleSpecifier: '',
            importExportSpecifierName: exportName,
            valueDeclarationValue: tokenInfo.declarationValue ?? exportExpression.getText(),
          };
        }
      }
    }
  } catch (e) {
    log(`Error resolving export ${exportName} in ${sourceFile.getFilePath()}:`, e);
    return undefined;
  }
}

// Helper to avoid duplicating logic for property access and identifier token checks
function checkImportSpecifier(
  importSpecifier: ImportSpecifier,
  checker: TypeChecker,
  project: Project,
  sourceFilePath: string
): { isToken: boolean; declarationValue?: string } | undefined {
  const importDeclaration = importSpecifier.getFirstAncestorByKind(SyntaxKind.ImportDeclaration);
  const moduleSpecifier = importDeclaration?.getModuleSpecifierValue();
  const specifierName = importSpecifier.getName();
  if (moduleSpecifier !== undefined && isKnownTokenPackage(moduleSpecifier, specifierName)) {
    return { isToken: true };
  } else if (moduleSpecifier !== undefined && ts.isExternalModuleNameRelative(moduleSpecifier)) {
    const moduleSourceFile = getModuleSourceFile(project, moduleSpecifier, sourceFilePath);
    if (moduleSourceFile) {
      // If we have a relative module specifier, we need to resolve it and check if there's a token
      // If there's a declaration value we should also return that so we don't falsely return the variable name
      const resolverInfo = resolveExport(moduleSourceFile, specifierName, checker, project);
      if (resolverInfo) {
        return { isToken: true, declarationValue: resolverInfo.valueDeclarationValue };
      }
    }
  }
}

const isNodeToken = (
  node: Node,
  checker: TypeChecker,
  project: Project
): { isToken: boolean; declarationValue?: string } | undefined => {
  // Handle property access or identifier uniformly
  let importSpecifier;
  if (Node.isPropertyAccessExpression(node)) {
    const symbol = checker.getSymbolAtLocation(node.getExpression());
    importSpecifier = symbol?.getDeclarations().find(Node.isImportSpecifier);
  } else if (Node.isIdentifier(node)) {
    const symbol = checker.getSymbolAtLocation(node);
    importSpecifier = symbol?.getDeclarations().find(Node.isImportSpecifier);
  }
  if (importSpecifier) {
    return checkImportSpecifier(importSpecifier, checker, project, node.getSourceFile().getFilePath());
  }
};
