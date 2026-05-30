## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-05-30 - [Open Redirect via Auth Callback]
**Vulnerability:** Open redirect vulnerability found in `app/auth/callback/route.ts`. The `next` search parameter was used directly in a redirect without ensuring it was a safe, relative path.
**Learning:** Next.js redirect APIs and URL search parameters are a common vector for open redirects. An attacker could craft a malicious login link that redirects a user to an attacker-controlled site (e.g., using `//attacker.com` which bypassed a simple check or was unsanitized).
**Prevention:** Always sanitize the `next` search parameter or any user-provided URL used for redirection. Ensure it strictly begins with a single `/` and not `//` to guarantee it is a relative path within the same origin.
