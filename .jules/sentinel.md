## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Client-Side Price Manipulation]
**Vulnerability:** A server action `addToCart` in `app/shop/actions.ts` was blindly trusting the `price` field sent by the client when inserting items into the cart database.
**Learning:** Client-provided data, especially critical fields like prices or item IDs, cannot be trusted as it can be easily manipulated by an attacker to alter the order total.
**Prevention:** Always validate client-provided product data against a single source of truth (like a database or a trusted server-side catalog) and use the server-validated values for sensitive operations like billing and cart calculation.
