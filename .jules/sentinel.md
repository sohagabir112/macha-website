## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Business Logic Flaw / Price Manipulation in `app/shop/actions.ts`. The `addToCart` server action blindly trusted the `product.price` supplied by the client when inserting into the database. A malicious user could tamper with the request payload to purchase items at a discounted rate or for free.
**Learning:** Client-provided data (especially pricing or sensitive business logic data) must never be trusted. Even if the UI only sends correct values, API requests can be intercepted and modified.
**Prevention:** Always validate client-provided product data against a trusted server-side source of truth (e.g., a database or a shared server-side configuration file). Extract shared data to a common utility file to avoid duplication and enforce consistency.
