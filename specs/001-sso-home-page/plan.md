# Implementation Plan: SSO Authentication & Home Page

**Branch**: `001-sso-home-page` | **Date**: 2026-01-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-sso-home-page/spec.md`

## Summary

Implement a React SPA home page for Coffee Pizza Cafe with Microsoft Entra SSO authentication using MSAL.js. The page displays cafe branding (hero image, tagline) for unauthenticated visitors and a personalized welcome message with user avatar for authenticated users. Authentication uses single-tenant configuration with the provided Entra app registration.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: React 18.x, @fluentui/react-components 9.x, @azure/msal-react 2.x, @azure/msal-browser 3.x  
**Storage**: Browser localStorage/sessionStorage for MSAL token cache (24-hour session)  
**Testing**: Vitest + React Testing Library + jest-axe (accessibility) + Playwright (E2E)  
**Target Platform**: Modern evergreen browsers (Chrome, Edge, Firefox, Safari - last 2 years), desktop + mobile  
**Project Type**: Single SPA (frontend only)  
**Build Tool**: Vite 5.x  
**Performance Goals**: LCP < 2.5s, TTI < 3.5s, bundle < 250KB gzipped  
**Constraints**: Single-tenant auth, 24-hour session, WCAG 2.1 AA compliance  
**Scale/Scope**: Internal organization users via Entra tenant

### Microsoft Entra Configuration

| Setting | Value |
|---------|-------|
| Client ID | `99a15b6e-7c53-48b2-b4cc-3fb0586c4975` |
| Tenant ID | `72f988bf-86f1-41af-91ab-2d7cd011db47` |
| Redirect URI | `http://localhost:5173/` |
| Authority | `https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47` |
| Account Type | Single tenant (work/school accounts only) |
| Scopes | `User.Read` (MS Graph - for profile + avatar) |

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Check (Phase 0)

| Principle | Status | Implementation Approach |
|-----------|--------|------------------------|
| I. Component-First | ✅ PASS | `SignInButton`, `UserWelcome`, `HeroSection` as isolated Fluent UI components |
| II. Accessibility-First | ✅ PASS | Fluent UI primitives + jest-axe tests + Lighthouse ≥90 target |
| III. Test-First | ✅ PASS | Tests written before implementation; 80% coverage target |
| IV. Type Safety | ✅ PASS | Strict TypeScript; Zod for auth response validation |
| V. Performance | ✅ PASS | Bundle budget enforced; MSAL lazy-loaded; images optimized |

**Gate Status**: ✅ PASSED — No violations; proceed to Phase 0 research.

### Post-Design Re-Check (Phase 1)

| Principle | Status | Verification |
|-----------|--------|--------------|
| I. Component-First | ✅ PASS | Contracts define isolated props; no business logic in components |
| II. Accessibility-First | ✅ PASS | All components use Fluent UI accessible primitives; test plan includes jest-axe |
| III. Test-First | ✅ PASS | Quickstart includes test commands; mocking strategy documented in research |
| IV. Type Safety | ✅ PASS | Contracts export strict TypeScript interfaces; no `any` types |
| V. Performance | ✅ PASS | Single SPA structure; localStorage for session (no network on reload) |

**Gate Status**: ✅ PASSED — Design aligns with Constitution. Ready for Phase 2 (tasks).

## Project Structure

### Documentation (this feature)

```text
specs/001-sso-home-page/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (TypeScript interfaces)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── components/              # Reusable UI components
│   ├── SignInButton/
│   │   ├── index.ts
│   │   ├── SignInButton.tsx
│   │   ├── SignInButton.test.tsx
│   │   └── SignInButton.styles.ts
│   ├── UserWelcome/
│   │   ├── index.ts
│   │   ├── UserWelcome.tsx
│   │   ├── UserWelcome.test.tsx
│   │   └── UserWelcome.styles.ts
│   └── HeroSection/
│       ├── index.ts
│       ├── HeroSection.tsx
│       ├── HeroSection.test.tsx
│       └── HeroSection.styles.ts
├── features/
│   └── auth/
│       ├── components/
│       │   └── AuthGuard.tsx
│       ├── hooks/
│       │   ├── useAuth.ts
│       │   └── useUserProfile.ts
│       ├── services/
│       │   └── msalConfig.ts
│       └── types/
│           └── auth.types.ts
├── pages/
│   └── HomePage/
│       ├── index.ts
│       ├── HomePage.tsx
│       ├── HomePage.test.tsx
│       └── HomePage.styles.ts
├── theme/
│   └── cafeTheme.ts         # Fluent UI custom theme
├── types/
│   └── user.types.ts
├── App.tsx
├── main.tsx
└── vite-env.d.ts

tests/
├── e2e/
│   └── auth.spec.ts         # Playwright E2E tests
└── setup.ts                 # Test configuration

public/
├── images/
│   └── hero.webp            # Hero image (optimized)
└── favicon.ico
```

**Structure Decision**: Single SPA structure following Constitution's folder conventions. Authentication logic isolated in `features/auth/` for encapsulation. Components follow the `[ComponentName]/` folder pattern with co-located tests and styles.

## Deferred Dependencies

> Constitution Compliance Note

The Constitution mandates **TanStack Query (React Query)** for server state and **Zustand** for client state. For this authentication-only MVP:

| Library | Constitution Requirement | This Feature | Rationale |
|---------|-------------------------|--------------|----------|
| TanStack Query | Server state | **Deferred** | No server data fetching; MS Graph calls are one-time during auth flow, handled by MSAL |
| Zustand | Client state | **Deferred** | Auth state managed by MSAL's built-in `useMsal` hook; no additional client state needed |
| Husky + lint-staged | Pre-commit hooks | **Deferred** | Can be added post-MVP; manual lint/format in Phase 1 |

**When to add**: These libraries become required when implementing menu browsing, cart, or order features that involve:
- Fetching/caching server data (React Query)
- Complex client-side state (Zustand)

## Complexity Tracking

> No violations — section intentionally left minimal.

No complexity justifications required. The implementation follows standard patterns within Constitution guidelines.
