## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Client-side price manipulation vulnerability found in `app/shop/actions.ts`. The server action `addToCart` accepted a `price` directly from the client without verifying its accuracy against a server-side catalog, allowing malicious users to arbitrarily set the price of items added to their cart.
**Learning:** Client-provided data related to pricing, discounts, and sensitive business logic cannot be trusted. Even if the frontend UI restricts inputs, malicious actors can intercept or modify the payload sent to server actions.
**Prevention:** Always maintain a single authoritative source of truth for pricing on the server (e.g., database, constants file). Server actions handling transactions or carts must validate client-provided product identifiers against this server-side source to determine the correct price.
