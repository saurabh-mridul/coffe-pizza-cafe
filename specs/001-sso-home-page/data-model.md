# Data Model: SSO Authentication & Home Page

**Feature**: 001-sso-home-page  
**Date**: 2026-01-18  
**Source**: Feature specification and research findings

## Entities

### 1. UserProfile

Represents the authenticated user's profile information retrieved from Microsoft Graph.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique user identifier from Entra (OID) |
| displayName | string | Yes | Full display name |
| givenName | string | No | First name (may be empty) |
| surname | string | No | Last name (may be empty) |
| mail | string | Yes | Primary email address |
| userPrincipalName | string | Yes | UPN (typically same as email for org accounts) |
| avatarUrl | string | No | Data URL of profile photo (null if unavailable) |

**Validation Rules**:
- `id` must be a valid GUID format
- `mail` must be a valid email address format
- `displayName` must not be empty

**Fallback Logic**:
- If `givenName` is empty, use first word of `displayName`
- If `avatarUrl` is null, derive initials from `displayName`

---

### 2. AuthenticationState

Represents the current authentication status and session information.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| isAuthenticated | boolean | Yes | Whether user is currently authenticated |
| isLoading | boolean | Yes | Whether auth operation is in progress |
| user | UserProfile | No | Profile data (null if not authenticated) |
| error | AuthError | No | Error details (null if no error) |

**State Transitions**:
```
UNAUTHENTICATED → (login initiated) → LOADING → (success) → AUTHENTICATED
UNAUTHENTICATED → (login initiated) → LOADING → (failure) → ERROR
AUTHENTICATED → (logout initiated) → LOADING → UNAUTHENTICATED
AUTHENTICATED → (token expired) → LOADING → (refresh success) → AUTHENTICATED
AUTHENTICATED → (token expired) → LOADING → (refresh failure) → UNAUTHENTICATED
```

---

### 3. AuthError

Represents authentication error information for user display.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| code | string | Yes | Error code (e.g., "consent_required", "network_error") |
| message | string | Yes | User-friendly error message |
| timestamp | Date | Yes | When the error occurred |
| isRetryable | boolean | Yes | Whether user can retry the operation |

**Known Error Codes**:
| Code | Message | Retryable |
|------|---------|-----------|
| `consent_required` | "Please grant the required permissions to continue" | Yes |
| `interaction_required` | "Please sign in again to continue" | Yes |
| `network_error` | "Unable to connect. Please check your internet connection" | Yes |
| `user_cancelled` | "Sign in was cancelled" | Yes |
| `account_disabled` | "Your account has been disabled" | No |
| `unknown_error` | "An unexpected error occurred" | Yes |

---

### 4. MsalConfiguration

Configuration for MSAL instance (compile-time constant).

| Field | Type | Value |
|-------|------|-------|
| clientId | string | `99a15b6e-7c53-48b2-b4cc-3fb0586c4975` |
| tenantId | string | `72f988bf-86f1-41af-91ab-2d7cd011db47` |
| authority | string | `https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47` |
| redirectUri | string | `http://localhost:5173/` |
| scopes | string[] | `["User.Read"]` |
| cacheLocation | string | `localStorage` |

---

## Relationships

```
┌─────────────────────┐
│ AuthenticationState │
├─────────────────────┤
│ isAuthenticated     │
│ isLoading           │
│ user ───────────────┼──────► UserProfile (0..1)
│ error ──────────────┼──────► AuthError (0..1)
└─────────────────────┘

┌─────────────────────┐
│   MsalConfiguration │ (singleton, immutable)
├─────────────────────┤
│ clientId            │
│ tenantId            │
│ authority           │
│ redirectUri         │
│ scopes              │
└─────────────────────┘
```

## UI State Derivation

| AuthenticationState | UI Behavior |
|---------------------|-------------|
| `isLoading: true` | Show `Spinner`, disable interactions |
| `isAuthenticated: false, error: null` | Show hero + "Sign in with Microsoft" button |
| `isAuthenticated: true` | Show `UserWelcome` with name + avatar |
| `error: not null` | Show error message with retry option (if retryable) |

## Data Flow

1. **App Load**: MSAL checks `localStorage` for cached tokens → Sets initial `AuthenticationState`
2. **Sign In**: User clicks button → MSAL redirects to Entra → Returns with auth code → MSAL exchanges for tokens → Fetch Graph `/me` → Update `UserProfile`
3. **Sign Out**: User clicks sign out → MSAL clears tokens → Clear `UserProfile` → Reset to unauthenticated state
4. **Token Refresh**: MSAL automatically refreshes in background before expiration
