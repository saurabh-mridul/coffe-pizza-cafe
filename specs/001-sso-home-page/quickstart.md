# Quickstart: SSO Authentication & Home Page

**Feature**: 001-sso-home-page  
**Date**: 2026-01-18  
**Time to Complete**: ~15 minutes

## Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- Modern browser (Chrome, Edge, Firefox, Safari)
- Access to Microsoft Entra tenant (work/school account)

## Step 1: Clone and Install

```bash
# Clone the repository (if not already done)
git clone <repository-url>
cd coffe-pizza-cafe

# Switch to feature branch
git checkout 001-sso-home-page

# Install dependencies
npm install
```

## Step 2: Environment Setup

Create a `.env.local` file in the project root:

```env
# Microsoft Entra Configuration
VITE_MSAL_CLIENT_ID=99a15b6e-7c53-48b2-b4cc-3fb0586c4975
VITE_MSAL_TENANT_ID=72f988bf-86f1-41af-91ab-2d7cd011db47
VITE_MSAL_REDIRECT_URI=http://localhost:5173/
```

> **Note**: These values are already configured for the Coffee Pizza Cafe Entra app registration.

## Step 3: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## Step 4: Verify Authentication Flow

1. **Unauthenticated State**:
   - Open `http://localhost:5173/`
   - You should see:
     - Coffee Pizza Cafe logo/branding
     - Hero image with tagline
     - "Sign in with Microsoft" button

2. **Sign In**:
   - Click "Sign in with Microsoft"
   - You'll be redirected to Microsoft login
   - Enter your work/school account credentials
   - Grant consent for "User.Read" permission (first time only)
   - You'll be redirected back to the app

3. **Authenticated State**:
   - You should see:
     - "Welcome, [Your Name]" message
     - Your profile avatar (or initials if no photo)
     - Sign out option

4. **Sign Out**:
   - Click on your avatar/name to open menu
   - Click "Sign out"
   - You'll be returned to the unauthenticated home page

## Step 5: Run Tests

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run accessibility tests
npm run test:a11y

# Run E2E tests (requires test account)
npm run test:e2e
```

## Troubleshooting

### "AADSTS50011: Reply URL does not match"

**Cause**: Redirect URI mismatch between app and Entra registration.

**Solution**: Ensure you're running on `http://localhost:5173/` (exact match including trailing slash).

### "AADSTS65001: User or administrator has not consented"

**Cause**: First-time user hasn't granted permissions.

**Solution**: Click through the consent prompt during sign-in. Only `User.Read` is required.

### "Network error during sign-in"

**Cause**: Browser blocking popups or third-party cookies.

**Solution**: 
- Ensure popups are allowed for `login.microsoftonline.com`
- Try using redirect flow instead of popup (default configuration)

### "Avatar not loading"

**Cause**: User doesn't have a profile photo in Entra/Microsoft 365.

**Solution**: This is expected behavior. The app will show initials-based avatar as fallback.

## Project Structure Overview

```
src/
├── components/           # UI components (SignInButton, UserWelcome, HeroSection)
├── features/auth/        # Authentication logic (MSAL config, hooks)
├── pages/HomePage/       # Home page composition
├── theme/                # Fluent UI custom theme
└── App.tsx               # Root component with MsalProvider
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Next Steps

After verifying the quickstart:

1. Review [data-model.md](./data-model.md) for entity definitions
2. Review [contracts/](./contracts/) for TypeScript interfaces
3. Run `/speckit.tasks` to generate implementation tasks
