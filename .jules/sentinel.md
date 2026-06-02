## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Client-side price data was being blindly trusted by the `addToCart` server action in `app/shop/actions.ts`. An attacker could intercept the request and change the `price` parameter to any value (e.g., $0.01), allowing them to purchase items for effectively free.
**Learning:** Never trust client-provided pricing or product metadata in e-commerce server actions. The client should only send an identifier (like product ID or name), and the server must independently fetch the authoritative price from a trusted source (database or server-side catalog).
**Prevention:** Establish a single source of truth for product data on the server (e.g., `utils/products.ts`). In server actions, use the client-provided identifier to look up the item in the trusted catalog and use the catalog's price for all database insertions and business logic.
