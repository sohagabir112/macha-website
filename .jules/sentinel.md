## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Open Redirect in Auth Callback]
**Vulnerability:** Open redirect vulnerability found in `app/auth/callback/route.ts`. The application used the `next` search parameter to redirect users after authentication without validating if the URL was an external destination (e.g. `//evil.com` or `http://evil.com`).
**Learning:** Never trust URL redirect parameters blindly. Attackers can craft malicious login links that use your legitimate domain but redirect users to phishing sites immediately after they authenticate successfully.
**Prevention:** Always sanitize redirect parameters. Enforce that internal redirect URLs start with a single `/` and explicitly reject protocol-relative URLs (`//`).
