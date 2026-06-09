## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-06-09 - [Client-Side Price Manipulation]
**Vulnerability:** The `addToCart` server action in `app/shop/actions.ts` accepted the product price directly from the client without verifying it, allowing malicious users to potentially set their own price for products.
**Learning:** Client-provided data related to pricing, billing, or authorization should never be trusted. The server must always look up this sensitive data from a single, trusted server-side source of truth.
**Prevention:** Always extract product catalogs or pricing logic to a secure server-side module (e.g., `utils/products.ts`) or database, and validate incoming requests against this trusted source before processing transactions or adding items to carts.
