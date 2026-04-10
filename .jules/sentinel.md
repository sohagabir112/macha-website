## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2024-04-10 - [Price Manipulation in Server Actions]
**Vulnerability:** Client-side price manipulation found in `app/shop/actions.ts`. The `addToCart` server action accepted a `price` from the client and inserted it directly into the database without verifying it against an authoritative server-side product catalog.
**Learning:** Never trust pricing data submitted from the client, even in authenticated server actions. Malicious users can intercept and modify the request to set arbitrary prices for products.
**Prevention:** Always maintain a server-side source of truth for product catalogs. In server actions, use the client-provided product identifier (e.g., ID or name) to look up the authoritative price server-side before performing any database insertions or updates related to pricing.
