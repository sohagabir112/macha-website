## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-05-27 - [Price Manipulation in Server Actions]
**Vulnerability:** The `addToCart` server action in `app/shop/actions.ts` trusted the `price` parameter provided by the client, allowing malicious users to arbitrarily set the price of items added to their cart (Price Manipulation).
**Learning:** Client-provided data related to pricing, discounts, or sensitive business logic must never be trusted. They should always be verified against a single source of truth on the server.
**Prevention:** Always validate client-provided product data against a trusted server-side catalog (e.g., database or trusted static file) and use the server-side price for operations like adding to cart or calculating totals.
