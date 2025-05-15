import { Project, ModuleKind } from 'ts-morph';
import { resolveExport } from '../reexportResolver';
describe('reexportResolver.resolveExport', () => {
  let project: Project;
  beforeEach(() => {
    project = new Project({
      useInMemoryFileSystem: true,
      skipFileDependencyResolution: true,
      compilerOptions: { module: ModuleKind.CommonJS },
    });
  });

  it('resolves a direct export in the same file', () => {
    const file = project.createSourceFile('A.ts', `export const foo = 'bar';`);
    const info = resolveExport(file, 'foo', project.getTypeChecker());
    expect(info).toBeDefined();
    expect(info!.sourceFile.getBaseName()).toBe('A.ts');
    expect(info!.declaration.getText()).toContain('foo');
  });

  it('resolves a re-export from another module', () => {
    project.createSourceFile('A.ts', `export const foo = 'baz';`);
    const fileB = project.createSourceFile('B.ts', `export { foo } from './A';`);
    const infoB = resolveExport(fileB, 'foo', project.getTypeChecker());
    expect(infoB).toBeDefined();
    expect(infoB!.sourceFile.getBaseName()).toBe('A.ts');
    expect(infoB!.declaration.getText()).toContain('foo');
  });

  it('resolves a renamed re-export alias', () => {
    project.createSourceFile('A.ts', `export const foo = 123;`);
    const fileC = project.createSourceFile('C.ts', `export { foo as foo2 } from './A';`);
    const infoC = resolveExport(fileC, 'foo2', project.getTypeChecker());
    expect(infoC).toBeDefined();
    expect(infoC!.sourceFile.getBaseName()).toBe('A.ts');
    expect(infoC!.importExportSpecifierName).toBe('foo');
    expect(infoC!.declaration.getText()).toContain('foo');
  });

  it('returns undefined for missing export', () => {
    const file = project.createSourceFile('X.ts', `export const a = 1;`);
    const info = resolveExport(file, 'nope', project.getTypeChecker());
    expect(info).toBeUndefined();
  });
});
