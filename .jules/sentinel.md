## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Price manipulation vulnerability found in `app/shop/actions.ts`. The `addToCart` server action blindly trusted the `price` property passed from the client when inserting new cart items.
**Learning:** Client-provided data is inherently untrustworthy. Even if the UI displays a fixed price, malicious users can intercept and modify the request payload to purchase items at a lower price (or even $0).
**Prevention:** Always extract pricing or critical business logic into a shared server-side catalog/database. Server actions must validate client input against this single source of truth and use the trusted server-side values for database operations.
