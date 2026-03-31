## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-03-31 - [Open Redirect in Authentication Callback]
**Vulnerability:** An open redirect vulnerability existed in `app/auth/callback/route.ts`. The application read the `next` search parameter to redirect users after authentication without validating it, allowing attackers to construct URLs that redirect users to malicious, external sites using protocol-relative paths (e.g., `//malicious.com`).
**Learning:** URL parameters used for redirection cannot be trusted natively and must be sanitized. Relying solely on `?? '/'` is insufficient if the query parameter starts with `//`.
**Prevention:** Always validate and sanitize user-provided redirect URLs on the server. Ensure they strictly begin with a single `/` and not `//` to force a relative redirect within the application's domain.
