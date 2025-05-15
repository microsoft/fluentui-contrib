// importAnalyzer.ts
import { Project, Node, SourceFile, ImportDeclaration, Symbol, TypeChecker, ts } from 'ts-morph';
import { log } from './debugUtils.js';
import { resolveExport, isKnownTokenPackage, ExportInfo } from './reexportResolver';
import { getModuleSourceFile } from './moduleResolver.js';
import { getInitializerFromIdentifier } from './tokenUtils';
import { extractNodesFromTemplateStringLiteral } from './processTemplateStringLiteral';

/**
 * Represents a value imported from another module
 */
export interface ImportedValue {
  value: string;
  sourceFile: string;
  node: Node;
  declaredValue?: string;
  declarationNode?: Node;
  templateGroups?: Node[][];
}

// Context passed through each import handler for clearer signature
interface ImportContext {
  importDecl: ImportDeclaration;
  moduleSpecifier: string;
  importedFile: SourceFile;
  typeChecker: TypeChecker;
  importedValues: Map<string, ImportedValue>;
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

  const context: ImportContext = {
    importDecl,
    moduleSpecifier,
    importedFile,
    typeChecker,
    importedValues,
  };

  // Process named imports (import { x } from 'module')
  processNamedImports(context);

  // Process default import (import x from 'module')
  processDefaultImport(context);

  processNamespaceImport(context);
}

/**
 * Process named imports using TypeScript's type checker to follow re-exports
 */
function processNamedImports(context: ImportContext): void {
  const { importDecl, typeChecker } = context;

  for (const namedImport of importDecl.getNamedImports()) {
    console.log(
      `is this module ${context.moduleSpecifier} relative? ${ts.isExternalModuleNameRelative(context.moduleSpecifier)}`
    );
    const nameOrAliasNode = namedImport.getAliasNode() ?? namedImport;
    const importName = namedImport.getName();
    const alias = namedImport.getAliasNode()?.getText() || importName;

    if (isKnownTokenPackage(context.moduleSpecifier, importName)) {
      // we have a direct token import, record it and move on.
      recordImport(context, alias, nameOrAliasNode);
      addTemplateGroups(context.importedValues.get(alias)!);
    } else {
      const exportInfo: ExportInfo | undefined = resolveExport(context.importedFile, importName, typeChecker);

      if (exportInfo) {
        recordImport(context, alias, nameOrAliasNode, exportInfo);
        addTemplateGroups(context.importedValues.get(alias)!);
      }
    }
  }
}

/**
 * Process default import using TypeScript's type checker
 */
function processDefaultImport(context: ImportContext): void {
  const { importDecl, typeChecker } = context;

  const defaultImport = importDecl.getDefaultImport();
  if (!defaultImport) {
    log(`No default import found in ${importDecl.getModuleSpecifierValue()}`);
    return;
  }

  const importName = defaultImport.getText();
  if (isKnownTokenPackage(context.moduleSpecifier)) {
    recordImport(context, importName, importDecl);
    addTemplateGroups(context.importedValues.get(importName)!);
  } else {
    const exportInfo: ExportInfo | undefined = resolveExport(context.importedFile, 'default', typeChecker);

    if (exportInfo) {
      recordImport(context, importName, defaultImport, exportInfo);
      addTemplateGroups(context.importedValues.get(importName)!);
    }
  }
}

function processNamespaceImport(context: ImportContext): void {
  const { importDecl, moduleSpecifier, importedFile, importedValues } = context;

  const namespaceImport = importDecl.getNamespaceImport();
  if (!namespaceImport) {
    log(`No namespace import found in ${importDecl.getModuleSpecifierValue()}`);
    return;
  }

  const importName = namespaceImport.getText();
  // Only record namespace import if it's the tokens package
  if (isKnownTokenPackage(moduleSpecifier)) {
    importedValues.set(importName, {
      value: importName,
      node: namespaceImport,
      sourceFile: importedFile.getFilePath(),
    });
  }
}

// Helper to record an import consistently
function recordImport(ctx: ImportContext, alias: string, node: Node, exportInfo?: ExportInfo): void {
  const { importedValues, moduleSpecifier, importedFile } = ctx;
  const pkg = exportInfo?.moduleSpecifier ?? moduleSpecifier;
  const name = exportInfo?.importExportSpecifierName ?? alias;

  // Only record known token imports
  if (isKnownTokenPackage(pkg, name)) {
    const source = exportInfo?.sourceFile ?? importedFile;

    // Use actual token literal when available
    const importValue = exportInfo?.valueDeclarationValue ?? alias;
    importedValues.set(alias, {
      value: importValue,
      node,
      sourceFile: source.getFilePath(),
      declaredValue: exportInfo?.valueDeclarationValue,
      declarationNode: exportInfo?.declaration,
    });
    log(`Recorded token import: ${alias} from ${source.getFilePath()}`);
  }
}

// Helper to extract template groups if the declaration node is a template expression
function addTemplateGroups(imported: ImportedValue) {
  const declNode = imported.declarationNode;
  if (!declNode) {
    return;
  }
  let exprNode;
  if (Node.isVariableDeclaration(declNode)) {
    exprNode = declNode.getInitializer();
  } else if (Node.isExportAssignment(declNode)) {
    exprNode = declNode.getExpression();
  }
  if (exprNode && Node.isTemplateExpression(exprNode)) {
    imported.templateGroups = extractNodesFromTemplateStringLiteral(exprNode).extractedExpressions;
  }
}

// Local export-resolution functions moved to reexportResolver.ts
