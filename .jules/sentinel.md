## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Client-side price data was being trusted directly in the `addToCart` server action (`app/shop/actions.ts`), allowing users to intercept requests and manipulate the price of items added to their cart.
**Learning:** Client-provided data for critical fields like pricing must never be trusted. The server action was accepting the client's `product.price` instead of querying the backend source of truth.
**Prevention:** Always validate incoming product IDs against a trusted server-side catalog (e.g., `utils/products.ts` or database) and retrieve the authoritative price on the server before performing any critical operations like adding to cart.
