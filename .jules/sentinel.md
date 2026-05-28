## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** The `addToCart` server action in `app/shop/actions.ts` previously accepted user-provided objects containing the product `price`. This allows an attacker to intercept or modify the request and submit arbitrary prices (e.g., $0.01) for items added to their cart.
**Learning:** Client-provided data (like prices or role assignments) must never be trusted in server actions. Data validation against a trusted server-side source is required to prevent price manipulation and business logic vulnerabilities.
**Prevention:** Only pass identifiers (e.g., `productId`) from the client to the server action. In the server action, use the identifier to fetch the true, authoritative data (e.g., price, name) from a single source of truth like a database or a shared server-side module (`utils/products.ts`).
