## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** The `addToCart` server action accepted user-provided prices from the client and inserted them directly into the database. A malicious user could tamper with the request payload to change the price of an item to $0.01 before adding it to their cart.
**Learning:** Client-provided data related to pricing, discounts, or inventory must never be trusted. The server must validate these fields against a secure, single source of truth (like a database or an authoritative server-side configuration file).
**Prevention:** Centralize the product catalog (e.g., `utils/products.ts`) and validate the user-provided product ID or name against it in the server action. Only use the server-side retrieved price for database insertions.
