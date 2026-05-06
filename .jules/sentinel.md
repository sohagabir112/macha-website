## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-05-06 - [Client-Side Price Manipulation in Server Actions]
**Vulnerability:** Client-Side Enforcement of Server-Side Security (CWE-602). The `addToCart` server action in `app/shop/actions.ts` blindly trusted the `product.price` supplied by the client during insertion into the cart. This allowed malicious users to modify the client request and add items to their cart at arbitrary prices (e.g., $0.01).
**Learning:** Server actions, even when authenticated and authorized via user ID, must not trust critical business data (like prices, item IDs, or roles) sent directly from the client.
**Prevention:** Always maintain a single, trusted source of truth for critical data on the server (e.g., a database lookup or a shared `utils/products.ts` catalog). In server actions that process transactions or state changes, validate client input against this trusted source and strictly use the server-validated values for downstream operations like database inserts or payment processing.
