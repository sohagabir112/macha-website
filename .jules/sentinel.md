## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-05-04 - [Price Manipulation in Cart Action]
**Vulnerability:** Price Manipulation (IDOR variation) found in `app/shop/actions.ts`. The `addToCart` server action directly trusted the `price` provided by the client when inserting new cart items into the database.
**Learning:** Client-provided data (especially pricing or sensitive fields) should never be trusted blindly by the server. Even if the frontend UI restricts choices, an attacker can intercept and modify the payload (e.g., sending `price: 0.01`).
**Prevention:** Always validate client-provided product identifiers against a trusted server-side source of truth (e.g., a shared catalog or database) and use the server-authoritative price for sensitive operations.
