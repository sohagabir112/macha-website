## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Open Redirect in Auth Callback]
**Vulnerability:** Open Redirect vulnerability found in `app/auth/callback/route.ts`. The `next` query parameter was used as a redirect target without sanitization, allowing attackers to redirect users to malicious sites via protocol-relative URLs (e.g., `//evil.com`).
**Learning:** Query parameters used for redirection must always be sanitized and validated to prevent open redirects. A simple `starts with "/"` check is insufficient if it also allows `//`.
**Prevention:** Always validate that redirect URLs strictly start with a single `/` and do not start with `//`, or parse the URL and ensure its hostname matches the expected origin.
