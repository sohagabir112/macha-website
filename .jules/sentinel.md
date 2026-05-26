## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Open Redirect via Next Parameter]
**Vulnerability:** Open Redirect found in `app/auth/callback/route.ts`. The application used the `next` search parameter as a redirect destination without validation, allowing attackers to redirect users to malicious sites using protocol-relative URLs (e.g., `//evil.com`).
**Learning:** URL search parameters used for redirection must always be sanitized. Even if they appear to be relative paths, they can be manipulated to point to external domains.
**Prevention:** Always validate that redirection targets from user input start with a single `/` and do not start with `//` (protocol-relative URLs) before using them in a redirect response.
