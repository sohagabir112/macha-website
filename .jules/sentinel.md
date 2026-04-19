## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Open Redirect in Auth Callback]
**Vulnerability:** Open Redirect found in `app/auth/callback/route.ts`. The `next` search parameter was used directly in `NextResponse.redirect` without sanitization. An attacker could craft a URL like `?next=//malicious.com` or `?next=http://malicious.com` to redirect users after authentication.
**Learning:** URL search parameters used for redirection are untrusted input. Directly passing them to redirect functions creates an Open Redirect vulnerability, which can be used in phishing attacks.
**Prevention:** Always sanitize redirection parameters to ensure they are relative paths. Enforce that the parameter begins with a single `/` and not `//` (protocol-relative URL) before performing the redirect.
