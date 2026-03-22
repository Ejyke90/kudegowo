# Copilot Prompt: AuthProvider Component for Kudegowo

## Objective

Create a reusable `AuthProvider` component for the Kudegowo Next.js 16 frontend that handles authentication state, token management, protected routes, and session lifecycle. This is a **skeleton implementation** with stubs for future phases.

## Context

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend**: NestJS with JWT auth (access token 15min, refresh token 7d)
- **Existing auth API client** in `frontend/lib/api.ts`:
  - `authApi.register(data)` → returns `{ accessToken, refreshToken, user }`
  - `authApi.login(data)` → returns `{ accessToken, refreshToken, user }`
  - `authApi.refresh(refreshToken)` → returns `{ accessToken }`
- **Existing token read** in `frontend/lib/api.ts` `getHeaders()` reads `localStorage.getItem('token')`
- **Existing login page** at `frontend/app/login/page.tsx` — static form, no logic wired
- **Existing activate page** at `frontend/app/activate/page.tsx` — static form, no logic wired
- **Feature flag** in `frontend/lib/features.ts`: `enableAuth` (boolean)
- **User type** already defined in `frontend/lib/api.ts`:
  ```typescript
  export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'parent' | 'admin';
    phone?: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
  }
  ```

## Component Name & Location

**Name**: `AuthProvider`  
**Hook**: `useAuth()`  
**Files to create/modify**:

```
frontend/
├── lib/
│   └── auth.tsx                          # NEW — AuthProvider + useAuth hook
├── components/
│   └── providers/
│       └── ProtectedRoute.tsx            # NEW — Route guard wrapper
├── middleware.ts                          # NEW — Next.js middleware for server-side route protection
├── app/
│   ├── layout.tsx                        # MODIFY — Wrap with AuthProvider
│   ├── login/page.tsx                    # MODIFY — Wire form to authApi.login + useAuth
│   └── activate/page.tsx                 # MODIFY — Wire form to authApi.register + useAuth
```

## Requirements

### 1. `frontend/lib/auth.tsx` — AuthProvider + useAuth

Create a React Context provider with the following interface:

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;           // True during initial hydration
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
}
```

**Skeleton behavior:**
- On mount: check `localStorage` for existing tokens, validate by calling the refresh endpoint, set user state
- `login()`: call `authApi.login()`, store `accessToken` + `refreshToken` in `localStorage`, set user state
- `register()`: call `authApi.register()`, store tokens, set user state
- `logout()`: clear `localStorage`, set user to null, redirect to `/login`
- `refreshSession()`: call `authApi.refresh()` with stored refresh token, update access token
- Token keys: `token` (access token — matches existing `getHeaders()`), `refreshToken`
- **Phase 2 stub**: Add a comment/TODO for automatic token refresh via `setInterval` or axios interceptor pattern
- **Phase 3 stub**: Add a comment/TODO for refresh token rotation

### 2. `frontend/components/providers/ProtectedRoute.tsx`

A wrapper component for dashboard pages:

```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'parent' | 'admin';  // Optional role guard
}
```

**Behavior:**
- If `isLoading`, show a centered spinner/skeleton
- If not authenticated, redirect to `/login`
- If `requiredRole` is set and user.role doesn't match, show 403 or redirect
- Otherwise, render children

### 3. `frontend/middleware.ts` — Next.js Middleware

Server-side route protection:
- Protected paths: `/dashboard`, `/dashboard/*`
- If no `token` cookie/header found, redirect to `/login`
- Public paths: `/`, `/login`, `/activate`, `/api/*`
- **Phase 2 stub**: Validate token expiry server-side

### 4. Modify `frontend/app/layout.tsx`

Wrap `{children}` with `<AuthProvider>`:

```tsx
import { AuthProvider } from '@/lib/auth';

// In the return:
<body>
  <AuthProvider>
    {children}
  </AuthProvider>
</body>
```

### 5. Modify `frontend/app/login/page.tsx`

- Convert to `'use client'`
- Wire the form to `useAuth().login()`
- Add loading state on submit button
- Add error display (toast or inline)
- On success: redirect to `/dashboard`
- Keep existing UI/styling

### 6. Modify `frontend/app/activate/page.tsx`

- Convert to `'use client'`
- Wire the form to `useAuth().register()`
- Add email, password, firstName, lastName fields (expand the current activation code form into a proper registration form, keeping the activation code field as optional)
- On success: redirect to `/dashboard`
- Keep existing UI/styling

## Constraints

- **Do NOT modify** `frontend/lib/api.ts` — use the existing `authApi` as-is
- **Do NOT install** new packages — use React built-ins (`createContext`, `useContext`, `useState`, `useEffect`)
- **Do NOT use** next-auth or any third-party auth library
- **Token storage**: `localStorage` for now (Phase 2 stub: httpOnly cookies)
- **Respect feature flag**: If `features.enableAuth` is false, AuthProvider should still render children but skip auth checks
- Use existing Tailwind classes consistent with the codebase
- All TypeScript — no `any` types

## Phased Plan

### Phase 1 — Skeleton (THIS PR)
- [x] `AuthProvider` + `useAuth()` with login/register/logout
- [x] `ProtectedRoute` wrapper
- [x] `middleware.ts` basic redirect
- [x] Wire login + activate pages
- [x] Wrap layout.tsx with AuthProvider

### Phase 2 — Token Lifecycle (Future)
- [ ] Auto-refresh: `setInterval` that calls `refreshSession()` before access token expires (e.g., every 12 minutes for a 15-min token)
- [ ] Axios/fetch interceptor: on 401 response, attempt refresh then retry original request
- [ ] Move tokens to httpOnly cookies (requires backend `Set-Cookie` support)
- [ ] Persistent session across tabs (BroadcastChannel API or storage event listener)

### Phase 3 — Security Hardening (Future)
- [ ] Refresh token rotation (backend returns new refresh token on each refresh call)
- [ ] CSRF protection (double-submit cookie pattern)
- [ ] Session invalidation on password change
- [ ] Device/session management UI (list active sessions, revoke)
- [ ] Rate limiting on login attempts (frontend cooldown + backend rate limit)

### Phase 4 — Enhanced Auth Flows (Future)
- [ ] Forgot password flow (request reset → email → reset page)
- [ ] Email verification on registration
- [ ] Social login (Google) — if needed
- [ ] Admin impersonation mode
- [ ] Biometric/passkey support (WebAuthn)

## Testing Checklist (Manual — Phase 1)

1. Visit `/dashboard` without logging in → redirected to `/login`
2. Login with valid credentials → redirected to `/dashboard`, user state populated
3. Refresh the page on `/dashboard` → stays logged in (token persisted)
4. Click logout → redirected to `/login`, `/dashboard` inaccessible
5. Register a new account → redirected to `/dashboard`
6. Open DevTools → `localStorage` has `token` and `refreshToken` keys
7. Delete `token` from localStorage, refresh → redirected to `/login`
