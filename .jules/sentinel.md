## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** A price manipulation vulnerability was found in `app/shop/actions.ts`. The `addToCart` server action blindly trusted the `product.price` value sent from the client and inserted it directly into the `cart_items` table.
**Learning:** Client-provided prices (or any critical business logic data) should never be trusted, as a malicious actor could intercept the request and modify the price before adding the item to their cart.
**Prevention:** Always maintain a trusted server-side catalog (e.g., in code or a database) and use it as the source of truth for pricing instead of trusting client input.
