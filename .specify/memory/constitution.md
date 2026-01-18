<!--
================================================================================
SYNC IMPACT REPORT
================================================================================
Version Change: N/A → 1.0.0 (Initial constitution)
Modified Principles: N/A (new constitution)
Added Sections:
  - Core Principles (5 principles)
  - Development Standards
  - Quality Gates
  - Governance
Removed Sections: N/A
Templates Requiring Updates:
  - plan-template.md: ✅ Compatible (Constitution Check section exists)
  - spec-template.md: ✅ Compatible (Requirements section aligns)
  - tasks-template.md: ✅ Compatible (Testing phases align with Principle III)
Follow-up TODOs: None
================================================================================
-->

# Coffee Pizza Cafe Constitution

## Core Principles

### I. Component-First Architecture

Every UI feature MUST be implemented as a self-contained, reusable component.

- Components MUST use Fluent UI React v9 primitives as the foundation
- Components MUST be independently testable without external dependencies
- Components MUST expose props with TypeScript interfaces for type safety
- Components MUST NOT contain business logic; delegate to custom hooks or services
- Components MUST follow single responsibility principle—one component, one purpose

**Rationale**: Fluent UI provides accessible, consistent building blocks. Wrapping business logic separately enables isolated testing and reduces coupling.

### II. Accessibility-First (NON-NEGOTIABLE)

All UI elements MUST meet WCAG 2.1 AA compliance at minimum.

- Every interactive element MUST have proper ARIA labels and roles
- Keyboard navigation MUST be fully supported (Tab, Enter, Escape, Arrow keys)
- Color contrast MUST meet AA ratio (4.5:1 for normal text, 3:1 for large text)
- Focus states MUST be visually distinct and follow Fluent UI focus indicators
- Screen reader announcements MUST be tested with NVDA, VoiceOver, or equivalent
- Dynamic content changes MUST use ARIA live regions appropriately
- Forms MUST have associated labels and error messages linked via aria-describedby

**Rationale**: Accessibility is a legal requirement and ensures all users can interact with the application. Fluent UI provides accessible components by default—do not override or bypass.

### III. Test-First Development (NON-NEGOTIABLE)

No feature code ships without corresponding tests written BEFORE implementation.

- Unit tests MUST be written using Vitest or Jest with React Testing Library
- Component tests MUST verify accessibility using jest-axe or similar
- Tests MUST follow the Red-Green-Refactor cycle:
  1. Write failing test
  2. Implement minimal code to pass
  3. Refactor while keeping tests green
- Coverage thresholds: 80% line coverage minimum for components and hooks
- Integration tests MUST cover critical user flows (ordering, cart, checkout)
- E2E tests MUST verify accessibility across user journeys using Playwright

**Rationale**: Test-first ensures requirements are understood before coding and catches regressions early. Accessibility tests prevent compliance drift.

### IV. Type Safety and Code Quality

TypeScript strict mode MUST be enabled with no escape hatches in production code.

- `strict: true` in tsconfig.json is mandatory
- `any` type is PROHIBITED except in test mocks with explicit justification
- All props, state, and function signatures MUST have explicit types
- ESLint with `@typescript-eslint/recommended` and `jsx-a11y/recommended` rules
- Prettier MUST be configured for consistent formatting
- No `@ts-ignore` or `@ts-expect-error` without linked issue number and expiration
- API responses MUST be validated with Zod or equivalent runtime validation

**Rationale**: Type safety catches errors at compile time and improves developer experience. Consistent tooling reduces friction in code reviews.

### V. Performance and User Experience

The application MUST remain responsive and fast under normal usage conditions.

- Initial bundle size MUST NOT exceed 250KB gzipped (excluding vendor chunks)
- Largest Contentful Paint (LCP) MUST be under 2.5 seconds
- Time to Interactive (TTI) MUST be under 3.5 seconds
- Components MUST implement proper loading states (Fluent UI Spinner/Skeleton)
- State management MUST use React Query for server state, Zustand for client state
- Expensive operations MUST be memoized using useMemo/useCallback appropriately
- Images MUST be lazy-loaded and use modern formats (WebP, AVIF)

**Rationale**: Performance directly impacts user satisfaction and conversion rates. Fluent UI's design system optimizes for perceived performance.

## Development Standards

### Technology Stack

| Layer | Technology | Version Constraint |
|-------|------------|-------------------|
| Framework | React | 18.x |
| UI Library | Fluent UI React v9 | @fluentui/react-components ^9.x |
| Language | TypeScript | 5.x, strict mode |
| Build Tool | Vite | 5.x |
| Testing | Vitest + React Testing Library | Latest stable |
| E2E Testing | Playwright | Latest stable |
| Linting | ESLint + Prettier | Latest stable |
| State (Server) | TanStack Query (React Query) | v5 |
| State (Client) | Zustand | v4 |

### File and Folder Structure

```text
src/
├── components/          # Reusable UI components
│   ├── [ComponentName]/
│   │   ├── index.ts           # Public export
│   │   ├── [ComponentName].tsx
│   │   ├── [ComponentName].test.tsx
│   │   └── [ComponentName].styles.ts
├── features/            # Feature-specific modules
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       └── services/
├── hooks/               # Shared custom hooks
├── services/            # API and external service integrations
├── pages/               # Route-level page components
├── theme/               # Fluent UI theme customization
├── types/               # Shared TypeScript types
└── utils/               # Pure utility functions
```

### Naming Conventions

- Components: PascalCase (`MenuCard.tsx`)
- Hooks: camelCase with `use` prefix (`useMenuItems.ts`)
- Services: camelCase (`orderService.ts`)
- Types/Interfaces: PascalCase with descriptive suffix (`MenuItem`, `OrderFormProps`)
- Test files: `[name].test.tsx` or `[name].spec.tsx`
- Style files: `[ComponentName].styles.ts` using Fluent UI's `makeStyles`

## Quality Gates

### Pre-Commit (Automated via Husky + lint-staged)

- [ ] TypeScript compilation passes (`tsc --noEmit`)
- [ ] ESLint passes with zero errors
- [ ] Prettier formatting applied
- [ ] Affected unit tests pass

### Pre-Push (CI Pipeline)

- [ ] Full test suite passes (unit + integration)
- [ ] Accessibility audit passes (jest-axe, no violations)
- [ ] Bundle size within limits
- [ ] No TypeScript `any` types introduced

### Pre-Merge (PR Review)

- [ ] At least one approval from team member
- [ ] All automated checks pass
- [ ] Accessibility manually verified for UI changes
- [ ] Documentation updated if public API changed

### Pre-Deploy (Production Gate)

- [ ] E2E tests pass in staging environment
- [ ] Lighthouse accessibility score ≥90
- [ ] Performance budgets met (LCP, TTI)
- [ ] Security scan passes (npm audit, Snyk)

## Governance

This constitution supersedes all other development practices within the Coffee Pizza Cafe project. Amendments require the following process:

1. **Proposal**: Document the change with rationale in a GitHub Discussion or Issue
2. **Review**: All active contributors must review within 5 business days
3. **Approval**: Majority approval required; accessibility/security changes require unanimous approval
4. **Migration**: If change affects existing code, create migration plan with timeline
5. **Documentation**: Update constitution and increment version

### Versioning Policy

- **MAJOR**: Removal or redefinition of principles that break existing workflows
- **MINOR**: Addition of new principles or significant expansion of guidance
- **PATCH**: Clarifications, typo fixes, tooling version updates

### Compliance Verification

- All pull requests MUST include a Constitution Check confirming alignment
- Quarterly audits of accessibility compliance using automated and manual testing
- Annual review of constitution relevance and technology currency

**Version**: 1.0.0 | **Ratified**: 2026-01-18 | **Last Amended**: 2026-01-18
