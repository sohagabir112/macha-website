## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** The `addToCart` server action accepted a `price` parameter directly from the client without validation, allowing users to potentially manipulate the price of items added to their cart.
**Learning:** Client-provided data related to pricing or authorization must never be trusted. The server must always validate incoming product details against a trusted single source of truth (e.g., a server-side catalog or database).
**Prevention:** Extract catalog data into a shared utility file or database, and always query the server-side price using the product identifier before performing inserts or updates in server actions.
