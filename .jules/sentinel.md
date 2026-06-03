## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-03-03 - [Price Manipulation in Server Actions]
**Vulnerability:** Price manipulation vulnerability found in `app/shop/actions.ts`. The `addToCart` server action blindly trusted the client-provided `product.price` when inserting new items into the database.
**Learning:** Server actions must never trust critical business logic data (like prices) coming from the client. Even if the UI is correct, an attacker can directly call the server action with manipulated data (e.g., setting the price to $0.01).
**Prevention:** Always validate client-provided product data against a trusted server-side source (e.g., a shared catalog in `utils/products.ts` or a database query) to enforce correct pricing before performing sensitive operations.
