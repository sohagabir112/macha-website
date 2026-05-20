## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Open Redirect via Next Parameter]
**Vulnerability:** Open Redirect vulnerability found in `app/auth/callback/route.ts`. The `next` parameter from the URL was used directly in `NextResponse.redirect` without validation.
**Learning:** Redirecting to a URL controlled by an attacker via search parameters like `next` can lead to phishing attacks and token stealing. Even local paths need strict validation.
**Prevention:** To prevent open redirect vulnerabilities, URL search parameters used for redirection (like 'next') must always be sanitized to ensure they begin with a single '/' and not '//' (protocol-relative).
