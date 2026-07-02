## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** The `addToCart` server action accepted an unverified, client-provided `price` value directly into the `cart_items` table, allowing malicious users to arbitrarily set the price of any item.
**Learning:** Client-provided data related to pricing, discounts, or security checks must never be trusted. Server actions handling business logic must enforce validation using a secure, server-side single source of truth.
**Prevention:** Extract catalog pricing to a centralized module (e.g., `utils/products.ts`) and validate the product against this source. Always override client-provided prices with the trusted server-side price before inserting or updating data.
