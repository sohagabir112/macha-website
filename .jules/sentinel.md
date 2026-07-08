## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2024-07-08 - Fix Price Manipulation / IDOR in addToCart
**Vulnerability:** The `addToCart` server action accepted a `price` parameter directly from the client and inserted it into the database. A malicious user could tamper with the request payload to change the price of a product before adding it to their cart, allowing them to purchase items for arbitrary amounts (e.g., $0.01).
**Learning:** Never trust pricing or sensitive data provided by the client, even if it is passed through a React component state. This is a common Insecure Direct Object Reference (IDOR) / Price Manipulation pattern in e-commerce apps where server actions blindly accept client object structures.
**Prevention:** Establish a single source of truth for product data on the server (e.g., a shared `utils/products.ts` catalog or database table). In server actions, use the client-provided `id` or `name` only as a lookup key to retrieve the trusted, server-authoritative price and details before performing any database insertions or modifications.
