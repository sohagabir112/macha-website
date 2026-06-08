## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Open Redirect Vulnerability in Auth Callback]
**Vulnerability:** Open redirect vulnerability in `app/auth/callback/route.ts` where the `next` search parameter was directly appended to the redirect URL without validation, allowing protocol-relative URLs (`//malicious.com`).
**Learning:** URL search parameters like `next` that dictate redirection destination must be sanitized carefully. An attacker could exploit this by crafting a URL with a protocol-relative `next` value, resulting in successful authentication redirecting to a malicious site.
**Prevention:** Always ensure redirect parameters originating from the client start with a single `/` and not `//`, or use a whitelist of allowed domains.
