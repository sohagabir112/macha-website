## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2026-06-15 - [Price Manipulation in Server Actions]
**Vulnerability:** Price manipulation vulnerability in `app/shop/actions.ts`. The `addToCart` server action blindly trusted the `price` value provided by the client when inserting an item into the cart.
**Learning:** Never trust client-provided data for sensitive fields like pricing or billing. Malicious users can intercept requests and alter the price to arbitrary values (e.g., $0.01).
**Prevention:** Always look up the trusted, authoritative price on the server-side before performing actions like adding to cart or checking out.
