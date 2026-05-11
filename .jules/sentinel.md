## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-05-11 - [Price Manipulation in Server Actions]
**Vulnerability:** The `addToCart` server action in `app/shop/actions.ts` trusted the `price` parameter provided by the client when adding items to the cart, allowing users to potentially modify the price of items before checkout.
**Learning:** Client-provided data, especially prices and quantities, should never be trusted as the sole source of truth in e-commerce applications.
**Prevention:** Always validate client-provided product data against a trusted server-side source (e.g., a shared catalog or database) to enforce correct pricing and prevent manipulation.
