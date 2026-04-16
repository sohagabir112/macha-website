## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.
## 2025-03-05 - [Open Redirect in Auth Callback]
**Vulnerability:** Open Redirect vulnerability found in `app/auth/callback/route.ts`. The `next` query parameter was used directly in `NextResponse.redirect` without validation.
**Learning:** URL search parameters used for redirection are common vectors for Open Redirects. Attackers can use protocol-relative URLs (e.g., `//malicious.com`) to bypass simple path checks and redirect users to external sites after authentication.
**Prevention:** Always validate and sanitize user-provided redirect paths. Ensure they begin with a single `/` and do not begin with `//` before using them in redirect operations.
