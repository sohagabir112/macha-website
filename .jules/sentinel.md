## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-03-01 - [Open Redirect in Auth Callback]
**Vulnerability:** Open Redirect vulnerability found in `app/auth/callback/route.ts`. The `next` search parameter was being used directly in `NextResponse.redirect()` without validation, allowing attackers to redirect users to malicious domains by crafting URLs with `?next=//attacker.com`.
**Learning:** Next.js `NextResponse.redirect()` will happily follow protocol-relative URLs (starting with `//`). Validating that a URL parameter starts with `/` is not enough; we must also explicitly check that it does not start with `//`.
**Prevention:** Always strictly sanitize URL parameters used for redirection. Ensure they begin with a single `/` and explicitly reject or correct those that begin with `//` to ensure redirects are confined to the local domain.
