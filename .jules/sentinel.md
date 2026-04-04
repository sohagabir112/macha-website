## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2024-04-04 - Price Manipulation in Server Actions
**Vulnerability:** The `addToCart` server action accepted price data directly from the client without server-side verification, allowing malicious users to modify the price of items before adding them to their cart.
**Learning:** Never trust client-provided data for critical business logic like pricing. Even in server actions, parameters passed from the client can be tampered with.
**Prevention:** Maintain a server-side source of truth for product catalog and pricing. Always validate client-provided product identifiers and prices against this server-side catalog before processing transactions or adding items to a cart.
