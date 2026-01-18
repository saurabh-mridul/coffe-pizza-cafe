# Tasks: SSO Authentication & Home Page

**Input**: Design documents from `/specs/001-sso-home-page/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Tests are included following Constitution Principle III (Test-First Development).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single SPA**: `src/`, `tests/` at repository root
- Paths follow Constitution folder structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, dependencies, and configuration

- [ ] T001 Initialize Vite + React + TypeScript project with `npm create vite@latest . -- --template react-ts`
- [ ] T002 Install core dependencies: `@fluentui/react-components`, `@azure/msal-browser`, `@azure/msal-react`, `zod`
- [ ] T003 [P] Install dev dependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jest-axe`, `@playwright/test`
- [ ] T004 [P] Install linting dependencies: `eslint`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-jsx-a11y`, `prettier`
- [ ] T005 Configure TypeScript strict mode in tsconfig.json
- [ ] T006 [P] Configure ESLint with TypeScript and jsx-a11y rules in eslint.config.js
- [ ] T007 [P] Configure Prettier in .prettierrc
- [ ] T008 [P] Configure Vitest in vite.config.ts with jsdom environment
- [ ] T009 [P] Create .env.local with MSAL environment variables (VITE_MSAL_CLIENT_ID, VITE_MSAL_TENANT_ID, VITE_MSAL_REDIRECT_URI)
- [ ] T010 Create test setup file in tests/setup.ts with Testing Library and jest-axe configuration
- [ ] T011 [P] Add hero image placeholder in public/images/hero.webp

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T012 Create auth types from contract in src/features/auth/types/auth.types.ts (copy from specs/contracts/auth.types.ts)
- [ ] T013 [P] Create Zod validation schemas for UserProfile and AuthError in src/features/auth/types/auth.schemas.ts
- [ ] T014 Create MSAL configuration in src/features/auth/services/msalConfig.ts with environment variables
- [ ] T015 Create Fluent UI custom theme in src/theme/cafeTheme.ts
- [ ] T016 Configure MsalProvider wrapper in src/App.tsx
- [ ] T017 Create useAuth hook tests in src/features/auth/hooks/useAuth.test.ts (test-first)
- [ ] T018 Implement useAuth hook in src/features/auth/hooks/useAuth.ts
- [ ] T019 Create useUserProfile hook tests in src/features/auth/hooks/useUserProfile.test.ts (test-first)
- [ ] T020 Implement useUserProfile hook in src/features/auth/hooks/useUserProfile.ts (MS Graph API calls)
- [ ] T021 [P] Create auth feature barrel export in src/features/auth/index.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Sign In with Microsoft (Priority: P1) 🎯 MVP

**Goal**: Enable users to sign in via Microsoft Entra SSO

**Independent Test**: Click "Sign in with Microsoft" → Complete Entra login → Return authenticated

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T022 [P] [US1] Create SignInButton accessibility test in src/components/SignInButton/SignInButton.test.tsx
- [ ] T023 [P] [US1] Create SignInButton unit tests (renders, click handler, loading state) in src/components/SignInButton/SignInButton.test.tsx

### Implementation for User Story 1

- [ ] T024 [P] [US1] Create SignInButton styles using makeStyles in src/components/SignInButton/SignInButton.styles.ts
- [ ] T025 [US1] Implement SignInButton component in src/components/SignInButton/SignInButton.tsx
- [ ] T026 [US1] Create SignInButton barrel export in src/components/SignInButton/index.ts
- [ ] T027 [US1] Integrate SignInButton with useAuth hook in src/pages/HomePage/HomePage.tsx (unauthenticated view)
- [ ] T028 [US1] Add loading spinner during redirect in SignInButton component

**Checkpoint**: User Story 1 complete - users can sign in via Microsoft SSO

---

## Phase 4: User Story 2 - Personalized Welcome Message (Priority: P2)

**Goal**: Display personalized welcome with user's name and avatar after sign-in

**Independent Test**: Sign in → See "Welcome, [Name]" with avatar → Avatar shows initials if no photo

### Tests for User Story 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T029 [P] [US2] Create UserWelcome accessibility test in src/components/UserWelcome/UserWelcome.test.tsx
- [ ] T030 [P] [US2] Create UserWelcome unit tests (displays name, avatar, fallback to initials) in src/components/UserWelcome/UserWelcome.test.tsx

### Implementation for User Story 2

- [ ] T031 [P] [US2] Create UserWelcome styles using makeStyles in src/components/UserWelcome/UserWelcome.styles.ts
- [ ] T032 [US2] Implement UserWelcome component with Fluent UI Avatar/Persona in src/components/UserWelcome/UserWelcome.tsx
- [ ] T033 [US2] Create UserWelcome barrel export in src/components/UserWelcome/index.ts
- [ ] T034 [US2] Integrate UserWelcome with useAuth and useUserProfile in src/pages/HomePage/HomePage.tsx (authenticated view)
- [ ] T035 [US2] Implement avatar fallback logic (photo → initials) in UserWelcome component

**Checkpoint**: User Story 2 complete - authenticated users see personalized welcome with avatar

---

## Phase 5: User Story 3 - Sign Out (Priority: P3)

**Goal**: Allow users to sign out and clear their session

**Independent Test**: Click sign out → Session cleared → Return to unauthenticated home page

### Tests for User Story 3 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T036 [P] [US3] Create sign-out functionality tests in src/components/UserWelcome/UserWelcome.test.tsx (sign out button)
- [ ] T037 [P] [US3] Create useAuth sign-out tests in src/features/auth/hooks/useAuth.test.ts

### Implementation for User Story 3

- [ ] T038 [US3] Add sign-out button/menu to UserWelcome component in src/components/UserWelcome/UserWelcome.tsx
- [ ] T039 [US3] Implement signOut action in useAuth hook in src/features/auth/hooks/useAuth.ts
- [ ] T040 [US3] Add loading state during sign-out in UserWelcome component
- [ ] T041 [US3] Verify session cleared and redirect to unauthenticated home page

**Checkpoint**: User Story 3 complete - users can sign out and session is cleared

---

## Phase 6: User Story 4 - Unauthenticated Home Page (Priority: P4)

**Goal**: Display welcoming home page with cafe branding for visitors who haven't signed in

**Independent Test**: Visit home page without signing in → See hero, tagline, sign-in button

### Tests for User Story 4 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T042 [P] [US4] Create HeroSection accessibility test in src/components/HeroSection/HeroSection.test.tsx
- [ ] T043 [P] [US4] Create HeroSection unit tests (renders image, tagline, cafe name) in src/components/HeroSection/HeroSection.test.tsx
- [ ] T044 [P] [US4] Create HomePage integration test (auth state switching) in src/pages/HomePage/HomePage.test.tsx

### Implementation for User Story 4

- [ ] T045 [P] [US4] Create HeroSection styles using makeStyles in src/components/HeroSection/HeroSection.styles.ts
- [ ] T046 [US4] Implement HeroSection component in src/components/HeroSection/HeroSection.tsx
- [ ] T047 [US4] Create HeroSection barrel export in src/components/HeroSection/index.ts
- [ ] T048 [US4] Create AuthGuard component in src/features/auth/components/AuthGuard.tsx (covers FR-007 for HomePage; route protection deferred until routing added)
- [ ] T049 [US4] Compose HomePage with AuthGuard, HeroSection, SignInButton, UserWelcome in src/pages/HomePage/HomePage.tsx
- [ ] T050 [US4] Create HomePage styles in src/pages/HomePage/HomePage.styles.ts
- [ ] T051 [US4] Create HomePage barrel export in src/pages/HomePage/index.ts

**Checkpoint**: User Story 4 complete - unauthenticated visitors see branded home page

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Error handling, E2E tests, and final validation

- [ ] T052 [P] Create AuthErrorDisplay component tests in src/components/AuthErrorDisplay/AuthErrorDisplay.test.tsx
- [ ] T053 Implement AuthErrorDisplay component in src/components/AuthErrorDisplay/AuthErrorDisplay.tsx
- [ ] T054 [P] Create AuthErrorDisplay styles in src/components/AuthErrorDisplay/AuthErrorDisplay.styles.ts
- [ ] T055 Integrate error handling in HomePage (display AuthErrorDisplay when error state)
- [ ] T056 [P] Create E2E test for sign-in flow in tests/e2e/auth.spec.ts
- [ ] T057 [P] Create E2E test for sign-out flow in tests/e2e/auth.spec.ts
- [ ] T058 Run Lighthouse accessibility audit and fix any issues
- [ ] T059 Verify bundle size is under 250KB gzipped
- [ ] T060 Run quickstart.md validation (all steps work as documented)
- [ ] T061 [P] Validate auth flow completes within 5 seconds (NFR-001) using browser DevTools Network tab

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - US1 (Sign In) can start first → Provides foundation for US2, US3
  - US2 (Welcome) can start after US1 tests pass
  - US3 (Sign Out) can start after US2 (adds to UserWelcome)
  - US4 (Unauthenticated) can run in parallel with US2/US3
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

| Story | Depends On | Can Parallelize With |
|-------|------------|---------------------|
| US1 (Sign In) | Foundational | - |
| US2 (Welcome) | US1 (useAuth hook) | US4 |
| US3 (Sign Out) | US2 (UserWelcome component) | US4 |
| US4 (Unauthenticated) | Foundational | US2, US3 |

### Within Each User Story

1. Tests MUST be written and FAIL before implementation
2. Styles before components (styles are dependencies)
3. Component implementation after tests + styles
4. Integration into HomePage after component complete

### Parallel Opportunities

```bash
# Phase 1 - All [P] tasks can run in parallel:
T003, T004, T006, T007, T008, T009, T011

# Phase 2 - Limited parallelism (dependencies):
T013 (after T012), T021 can run anytime

# Phase 3 - Tests first, then implementation:
T022, T023 in parallel → T024 → T025 → T026 → T027 → T028

# Phase 4 - Tests first, then implementation:
T029, T030 in parallel → T031 → T032 → T033 → T034 → T035

# Phase 6 - Tests in parallel, then implementation:
T042, T043, T044 in parallel → T045 → T046-T051
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1 (Sign In)
4. **STOP and VALIDATE**: Test sign-in flow works end-to-end
5. Deploy/demo if ready

### Incremental Delivery

| Increment | Stories | Deliverable |
|-----------|---------|-------------|
| MVP | US1 | Users can sign in via Microsoft SSO |
| v0.2 | US1 + US2 | Signed-in users see personalized welcome |
| v0.3 | US1 + US2 + US3 | Users can sign out |
| v1.0 | All stories | Complete unauthenticated experience + polish |

### Suggested Order for Solo Developer

1. T001-T011 (Setup) — Day 1
2. T012-T021 (Foundation) — Day 1-2
3. T022-T028 (US1: Sign In) — Day 2
4. T029-T035 (US2: Welcome) — Day 3
5. T036-T041 (US3: Sign Out) — Day 3
6. T042-T051 (US4: Unauthenticated) — Day 4
7. T052-T060 (Polish) — Day 4-5

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- **Test-First**: Verify tests fail (Red) before implementing (Green)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
