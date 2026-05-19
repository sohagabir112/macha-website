## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** A price manipulation vulnerability was found in the `addToCart` server action in `app/shop/actions.ts`. The action blindly trusted the `price` provided in the client's request payload when inserting new items into the database.
**Learning:** Client-provided data related to critical business logic, such as product pricing, must never be trusted. Attackers can easily intercept and modify the request to inject arbitrary prices (e.g., $0.01).
**Prevention:** Always validate client-provided product data against a trusted server-side source (e.g., a shared catalog utility or a database query). Use the server-side verified price when creating orders or cart items.
