# Coffee-Pizza Cafe

A React SPA application for Coffee-Pizza Cafe with Microsoft Entra Single Sign-On (SSO) authentication.

## Features

- **Microsoft Entra SSO**: Secure single sign-on authentication using MSAL.js
- **Personalized Welcome**: Displays user's name after sign-in
- **Responsive Design**: Mobile-first FluentUI v9 components
- **8-Hour Sliding Session**: Automatic session timeout with activity tracking
- **Internationalization**: Ready for multi-language support with i18next
- **Azure Static Web Apps**: Production-ready deployment configuration

## Tech Stack

- **React 19** with TypeScript 5.9
- **FluentUI v9** (`@fluentui/react-components`)
- **MSAL React** (`@azure/msal-react`) for authentication
- **Vite 7** for development and build
- **Vitest** for testing

## Prerequisites

- Node.js 20.19+ or 22.12+ (required by Vite 7)
- Microsoft Entra (Azure AD) app registration

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd coffe-pizza-cafe
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file with your Entra credentials:

```env
VITE_ENTRA_CLIENT_ID=<your-client-id>
VITE_ENTRA_TENANT_ID=<your-tenant-id>
VITE_REDIRECT_URI=http://localhost:5173/
```

### 4. Start development server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Run tests with coverage report |

## Project Structure

```
src/
├── components/          # Shared UI components
│   ├── Header/         # App header with branding
│   └── LoadingSpinner/ # Loading indicator
├── features/
│   ├── auth/           # Authentication feature
│   │   ├── components/ # SignInButton, SignOutButton, UserGreeting, AuthErrorBanner
│   │   ├── config/     # MSAL configuration
│   │   ├── context/    # AuthProvider
│   │   ├── hooks/      # useAuth, useSessionTimeout
│   │   └── types/      # TypeScript types
│   └── home/           # Home page feature
├── i18n/               # Internationalization config
├── pages/              # Page components
├── theme/              # FluentUI theme customization
└── main.tsx            # App entry point
```

## Authentication

The app uses Microsoft Entra ID (formerly Azure AD) for authentication with the following features:

- **Single-tenant**: Configured for a specific organization
- **Redirect flow**: Uses redirect-based authentication (not popup)
- **Silent token refresh**: Automatically refreshes tokens
- **8-hour session**: Sliding session timeout based on user activity

### Entra App Registration Requirements

1. Register an application in Azure Portal
2. Set the redirect URI to `http://localhost:5173/` (development) or your production URL
3. Enable "Single-page application" platform
4. Required API permissions: `User.Read` (delegated)

## Deployment

### Azure Static Web Apps

The app includes `staticwebapp.config.json` for Azure SWA deployment:

1. Create an Azure Static Web App resource
2. Connect to your repository
3. Set the following build configuration:
   - App location: `/`
   - Output location: `dist`
   - API location: (leave empty)
4. Add environment variables in Azure portal

## Development Guidelines

This project follows the development standards defined in `.specify/constitution.md`:

- **Code Quality**: ESLint + Prettier + strict TypeScript
- **Testing**: Vitest + React Testing Library + MSW
- **Performance**: Bundle ≤ 250KB (gzipped), LCP ≤ 2.5s
- **Accessibility**: WCAG 2.1 AA compliance

## License

[MIT](LICENSE)
