## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2024-05-24 - [CRITICAL] Price Manipulation Vulnerability in Server Actions
**Vulnerability:** The `addToCart` server action blindly trusted the client-provided `price` and `name` to insert items into the cart database. A malicious user could manipulate the payload to set the price of any item to $0.00.
**Learning:** Never trust client-provided data for critical business logic like pricing. Server actions are still essentially API endpoints and can be called with arbitrary payloads.
**Prevention:** Implement a single source of truth for products and pricing on the server (e.g., `utils/products.ts` or database). Server actions must validate the client's request against this source of truth before performing any state changes or database transactions.
