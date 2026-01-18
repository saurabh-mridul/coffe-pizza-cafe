# Research: SSO Authentication & Home Page

**Feature**: 001-sso-home-page  
**Date**: 2026-01-18  
**Purpose**: Resolve technical unknowns and document best practices before design

## Research Tasks

### 1. MSAL.js React Integration

**Question**: What is the recommended approach for integrating MSAL with React 18?

**Decision**: Use `@azure/msal-react` wrapper with `@azure/msal-browser`

**Rationale**:
- Official Microsoft library with React hooks (`useMsal`, `useIsAuthenticated`)
- Handles token caching, refresh, and redirect flows automatically
- Supports single-tenant configuration via `authority` setting
- Active maintenance and TypeScript support

**Alternatives Considered**:
- `react-aad-msal`: Deprecated, no longer maintained
- Direct `@azure/msal-browser`: More boilerplate, no React-specific hooks
- `oidc-client-ts`: Generic OIDC, lacks Entra-specific optimizations

**Key Implementation Notes**:
```typescript
// MSAL configuration pattern
const msalConfig: Configuration = {
  auth: {
    clientId: "99a15b6e-7c53-48b2-b4cc-3fb0586c4975",
    authority: "https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47",
    redirectUri: "http://localhost:5173/",
  },
  cache: {
    cacheLocation: "localStorage", // Persist across sessions
    storeAuthStateInCookie: false, // Not needed for modern browsers
  },
};
```

---

### 2. Token Storage and 24-Hour Session

**Question**: How to implement 24-hour session persistence with MSAL?

**Decision**: Use `localStorage` cache with token expiration handling

**Rationale**:
- MSAL automatically manages token refresh when tokens are valid
- Access tokens typically expire in 1 hour; MSAL uses refresh tokens silently
- Refresh tokens can be configured in Entra to expire after 24 hours
- Setting `cacheLocation: "localStorage"` persists across browser sessions

**Alternatives Considered**:
- `sessionStorage`: Clears on tab close, doesn't meet 24-hour requirement
- Custom token storage: Unnecessary complexity; MSAL handles this

**Configuration Required in Entra Portal**:
- Token lifetime policies should set refresh token to 24 hours max
- Application manifest should enable `allowPublicClient: false` for SPA

---

### 3. User Profile and Avatar Retrieval

**Question**: How to fetch user profile including avatar from Microsoft Graph?

**Decision**: Use MS Graph `/me` endpoint with `User.Read` scope; fetch photo via `/me/photo/$value`

**Rationale**:
- `User.Read` is the minimum scope required (no admin consent needed)
- Profile data includes `displayName`, `givenName`, `mail`
- Photo endpoint returns binary data; convert to data URL for avatar

**API Calls**:
```typescript
// Profile: GET https://graph.microsoft.com/v1.0/me
// Avatar: GET https://graph.microsoft.com/v1.0/me/photo/$value
```

**Fallback Strategy**:
1. If photo fetch returns 404 → Use initials-based avatar (Fluent UI `Avatar` component)
2. If `givenName` is empty → Fall back to `displayName` or `mail`

---

### 4. Fluent UI v9 Authentication Components

**Question**: What Fluent UI components are best suited for auth UI?

**Decision**: Use `Button`, `Avatar`, `Persona`, `Menu`, `Spinner`

**Rationale**:
- `Button` with `appearance="primary"` for sign-in CTA
- `Avatar` handles image + initials fallback automatically
- `Persona` combines avatar + name for welcome display
- `Menu` for user dropdown (profile, sign out)
- `Spinner` for loading states during auth

**Accessibility Built-in**:
- All components meet WCAG 2.1 AA by default
- Focus management handled automatically
- ARIA attributes pre-configured

---

### 5. Vite + React 18 Project Setup

**Question**: What is the optimal Vite configuration for this stack?

**Decision**: Use `vite-plugin-checker` for TypeScript, configure path aliases

**Key Dependencies**:
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@fluentui/react-components": "^9.54.0",
    "@azure/msal-browser": "^3.27.0",
    "@azure/msal-react": "^2.1.1",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.0",
    "vitest": "^2.1.0",
    "@testing-library/react": "^16.0.0",
    "jest-axe": "^9.0.0",
    "@playwright/test": "^1.48.0",
    "eslint": "^9.0.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "eslint-plugin-jsx-a11y": "^6.10.0",
    "prettier": "^3.3.0"
  }
}
```

---

### 6. Testing Strategy for MSAL

**Question**: How to test components that depend on MSAL authentication?

**Decision**: Mock `@azure/msal-react` hooks in unit tests; use real auth in E2E

**Rationale**:
- Unit tests should be isolated; mock `useMsal` and `useIsAuthenticated`
- Component tests verify UI states (authenticated, unauthenticated, loading)
- E2E tests use Playwright with real Entra login (test account required)

**Mock Pattern**:
```typescript
vi.mock('@azure/msal-react', () => ({
  useMsal: () => ({
    instance: { loginRedirect: vi.fn(), logoutRedirect: vi.fn() },
    accounts: [],
  }),
  useIsAuthenticated: () => false,
  MsalProvider: ({ children }) => children,
}));
```

---

## Summary of Decisions

| Topic | Decision |
|-------|----------|
| Auth Library | `@azure/msal-react` + `@azure/msal-browser` |
| Token Storage | `localStorage` (MSAL managed) |
| Session Duration | 24 hours via Entra refresh token policy |
| Profile API | MS Graph `/me` with `User.Read` scope |
| Avatar Fallback | Fluent UI `Avatar` with initials |
| UI Components | Fluent UI v9 primitives |
| Testing | Vitest mocks + Playwright E2E |
| Build Tool | Vite 5.x with TypeScript checker |

## Open Items

None — all technical questions resolved.
