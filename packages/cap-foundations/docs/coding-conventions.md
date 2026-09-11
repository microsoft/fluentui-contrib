# Coding Conventions

This guide defines the coding standards and conventions for `packages/cap-foundations`. Following these conventions ensures consistency, maintainability, and readability across the codebase.

## General Principles

- **Clarity over cleverness** — Write code that is easy to understand
- **Consistency** — Follow existing patterns in the codebase
- **Type safety** — Leverage TypeScript to catch errors early
- **Testability** — Write code that is easy to test
- **Performance** — Consider performance implications, but don't optimize prematurely

## File Organization

### File Naming

- **Components**: PascalCase — `Button.tsx`, `UserProfile.tsx`
- **Utilities/Hooks**: camelCase — `formatDate.ts`, `useAuth.ts`
- **Constants**: camelCase — `constants.ts`, `config.ts`
- **Types/Interfaces**: PascalCase — `User.ts`, `ApiResponse.ts`
- **Test files**: Same name with `.test.ts` — `Button.test.tsx`

### Directory Structure

```typescript
// ❌ Avoid: Deeply nested structures
src / components / forms / inputs / text / validated / EmailInput.tsx;

// ✅ Prefer: Flatter structure
src / components / EmailInput / EmailInput.tsx;
```

### File Length

- **Hard limit**: Files must be under 500 lines
- **Target**: Keep files under 300 lines when possible
- If a file approaches 500 lines, refactor into separate components, utility functions, custom hooks, or type definitions

### Module Exports

- **One primary export per file** (plus related type exports)
- **No default exports** — Always use named exports
- **Colocate types** with their implementations

```typescript
// ❌ Avoid: Default exports
export default function Button() {}

// ❌ Avoid: Multiple unrelated exports
export function Button() {}
export function Card() {}

// ✅ Good: Single named export with related types
export interface ButtonProps {}
export function Button(props: ButtonProps) {}

// ✅ Good: Re-export pattern
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### Why No Default Exports?

1. **Consistency**: Named exports enforce consistent naming across imports
2. **Refactoring**: Easier to refactor with IDE tools
3. **Tree shaking**: Better support for dead code elimination
4. **Clarity**: Import statements clearly show what's being imported

## TypeScript Conventions

**Core Principle: Always prefer specific types. Fall back to `unknown` only when the type is truly unknown.**

### Type Definitions

```typescript
// ✅ Interfaces for objects, types for unions/aliases
interface User {
  id: string;
  name: string;
}
type Status = 'pending' | 'active' | 'completed';

// ❌ NEVER use 'any'
const data: any = getData();

// ✅ Use specific types first, 'unknown' as fallback
const user: User = getUser();
const parsed: unknown = JSON.parse(input); // External data
```

### The 'any' Type is Forbidden

**Type Priority**: Specific types → Union types → Generics → `unknown` (never `any`)

### Type Imports

Always use type imports for type-only imports:

```typescript
// Type-only imports: use `import type`
import type { User, Role } from './types';

// Mixed imports: use inline `type`
import { type User, type Config, getUser, loadConfig } from './module';

// ❌ Never import types without 'type' modifier
import { User } from './types'; // Wrong!
```

### Enums vs Object Maps

```typescript
// ❌ Avoid enums (increase bundle size)
enum Status {
  Pending = 'pending',
}

// ✅ Use object maps
const Status = { Pending: 'pending', Active: 'active' } as const;
type Status = (typeof Status)[keyof typeof Status];
```

## React Conventions

### Component Structure

```typescript
// ✅ Functional components only
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children }: ButtonProps) {
  return <button className={variant}>{children}</button>;
}
```

### Event Handlers & Props

```typescript
// ✅ Type event handlers
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};

// ✅ Destructure props with defaults
function Card({ title, description = 'No description' }: CardProps) {}
```

## SSR Safety (cap-foundations-specific)

**All code in `src/runtime/` and `src/build/` must guard browser APIs.** The package runs in server-rendered environments.

```typescript
// ✅ CORRECT — guard every browser global
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', theme);
}

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('cap-foundations-theme') : null;

// ❌ WRONG — crashes in Node/SSR
document.documentElement.setAttribute('data-theme', theme);
```

Globals requiring guards: `window`, `document`, `localStorage`, `sessionStorage`, `navigator`, `getComputedStyle`.

## Testing Conventions

This project uses **Jest** with `@swc/jest` (not Vitest). Use these patterns:

```typescript
// ✅ Descriptive test names
describe('Button', () => {
  it('renders with primary variant by default', () => {});
  it('calls onClick handler when clicked', () => {});
});

// ✅ Arrange-Act-Assert pattern
it('updates user name', async () => {
  const user = { id: '1', name: 'John' }; // Arrange
  const updated = await updateName(user.id, 'Jane'); // Act
  expect(updated.name).toBe('Jane'); // Assert
});
```

### DOM-dependent tests

`it.skipIf()` is not available in Jest. Use this pattern instead:

```typescript
// ✅ CORRECT — Jest-compatible conditional skip
const hasDom = typeof document !== 'undefined';
const itDom = hasDom ? it : it.skip;

itDom('reads DOM attribute', () => {
  // test body
});

// ❌ WRONG — Vitest-only API
it.skipIf(!hasDom)('reads DOM attribute', () => {});
```

## Build & Toolchain Conventions

### Compiler: SWC, not tsc

The package uses **SWC** (`@swc/jest`, `@nx/js` with SWC preset) for compilation. Do not invoke `tsc --emit`. Use `tsc --noEmit` for type-checking only.

### CJS scripts: no top-level await

`tsconfig.scripts.json` emits CommonJS. All async script entry points must be wrapped:

```typescript
// ✅ CORRECT
async function run() {
  await doWork();
}
run().catch(console.error);

// ❌ WRONG — not valid in CJS
await doWork();
```

### JSON imports in scripts

Scripts importing `.json` files need `resolveJsonModule: true` and `esModuleInterop: true` in their tsconfig:

```typescript
import defaultTheme from '../themes/definitions/default.json';
```

### Package manager: Yarn 4

Never use `npm` or `pnpm`. All commands use Yarn:

```bash
# Install
yarn install

# Add a dependency
yarn workspace @fluentui-contrib/cap-foundations-core add some-package

# Run Nx target
yarn nx build cap-foundations-core
```

## CSS and Styling

- Use CSS modules for component styles
- Scope styles within `@layer base` or `@layer overrides`
- Use `classnames` (aliased as `cx`) to conditionalize class names

```typescript
// ✅ CSS modules with classnames
import styles from './Button.module.css';
import cx from 'classnames';

<button className={cx(styles.root, isCircular && styles.circular)}>Click</button>;
```

```css
/* CSS modules only. Scope within layers. */
@layer base {
  .root {
  }
  .circular {
  }
}
```

**Always use cap-foundations tokens** — no hardcoded colors, spacing, or typography:

```css
/* ❌ BAD */
.card {
  padding: 16px;
  background: #f5f5f5;
  color: #333;
}

/* ✅ GOOD */
.card {
  padding: var(--space-4);
  background: var(--soft-bg);
  color: var(--soft-fg);
}
```

## Error Handling

```typescript
// ✅ Custom error classes
export class TokenError extends Error {
  constructor(message: string, public tokenName: string) {
    super(message);
  }
}

// ✅ Type guards
function isTokenError(error: unknown): error is TokenError {
  return error instanceof TokenError;
}
```

## Performance Guidelines

```typescript
// ✅ Memoize only expensive operations
const result = useMemo(() => expensiveCalc(data), [data]);

// ✅ Dynamic imports for code splitting
const Heavy = lazy(() => import('./HeavyComponent'));

// ✅ Tree-shakeable imports
import { debounce } from 'lodash-es';
```

## Documentation

```typescript
// ✅ Explain WHY, not WHAT
// Debounce to avoid excessive API calls during rapid theme switches
const applyTheme = useMemo(() => debounce(setTheme, 50), [setTheme]);
```

## Git Conventions

**Branch naming**: `feature/description`, `fix/description`, `chore/description`

**Commit messages**: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`

## Accessibility

```typescript
// ✅ Use semantic HTML and ARIA labels
<button aria-label="Close dialog"><CloseIcon /></button>
<nav aria-label="Main navigation">{/* items */}</nav>

// ✅ Handle keyboard navigation
useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
  document.addEventListener('keydown', handleEsc);
  return () => document.removeEventListener('keydown', handleEsc);
}, [onClose]);
```

## Final Checklist

Before submitting code:

- [ ] Code follows TypeScript conventions
- [ ] **No `any` types** (use `unknown` or proper types)
- [ ] No files exceed 500 lines
- [ ] One primary export per file (no default exports)
- [ ] Tests are included for new functionality (Jest, not Vitest)
- [ ] **SSR safety**: all browser globals guarded with `typeof` checks
- [ ] No hardcoded colors, spacing, or typography — use cap-foundations tokens
- [ ] Error cases are handled
- [ ] Code is accessible
- [ ] No hardcoded secrets
- [ ] Linting passes (`yarn nx lint cap-foundations-core`)
- [ ] Type checking passes (`yarn nx type-check cap-foundations-core`)
- [ ] Tests pass (`yarn nx test cap-foundations-core`)
