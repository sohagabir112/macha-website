## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Open Redirect in Auth Callback]
**Vulnerability:** Open Redirect vulnerability found in `app/auth/callback/route.ts`. The `next` parameter from the URL was used directly for redirection via `NextResponse.redirect` without validation, allowing attackers to use protocol-relative URLs (e.g., `//attacker.com`) to redirect users to malicious sites after authentication.
**Learning:** Checking for a leading slash (`/`) is not sufficient to prevent open redirects, as protocol-relative URLs also begin with a slash. Both `startsWith('/')` and `startsWith('//')` conditions must be checked.
**Prevention:** Always validate and sanitize user-provided redirect URLs (like `next` or `returnTo` parameters). Ensure they strictly start with a single `/` and do not start with `//` before redirecting.
