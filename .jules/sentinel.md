## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-04-23 - [Price Manipulation in Server Actions]
**Vulnerability:** Price manipulation vulnerability in `app/shop/actions.ts`. The `addToCart` server action was relying on the client-provided `product.price` when inserting a new item into the cart.
**Learning:** Client-provided prices should never be trusted, as malicious users can manipulate network requests or form data to submit arbitrary prices.
**Prevention:** Always validate client-provided product names or IDs against a trusted server-side catalog and use the trusted server-side price for database insertions and updates.
