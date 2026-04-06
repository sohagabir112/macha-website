## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.
## 2024-04-06 - [Open Redirect in Auth Callback]
**Vulnerability:** The `next` URL parameter in `app/auth/callback/route.ts` was used directly for redirection without validation, allowing for Open Redirect vulnerabilities.
**Learning:** Next.js authentication callbacks that handle generic redirect URLs must sanitize the input to prevent attackers from crafting login links that redirect to malicious domains upon successful authentication.
**Prevention:** Always validate that redirect parameters (like `next`) start with a single `/` and not `//` to ensure they are relative paths within the application.
