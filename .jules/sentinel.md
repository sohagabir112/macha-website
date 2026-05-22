## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Client-Side Price Manipulation found in `app/shop/actions.ts`. The `addToCart` server action blindly trusted the `price` property sent from the client inside the `product` payload when adding items to the database.
**Learning:** Never trust client-provided pricing or security-sensitive data in server actions. Malicious actors can intercept and modify the payload to set arbitrary prices (e.g., $0.01) before the action is executed on the server.
**Prevention:** Establish a single trusted source of truth for product data on the server (e.g., a shared `utils/products.ts` catalog or database query). Always validate the incoming product identifier against this trusted source and use the server-side price to perform transactions or database inserts.
