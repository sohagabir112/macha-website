## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in E-commerce Cart]
**Vulnerability:** Price Manipulation risk found in `app/shop/actions.ts`. The `addToCart` server action accepted a `price` directly from the client and inserted it into the `cart_items` table.
**Learning:** Client-provided data related to pricing, discounts, or permissions should never be trusted, even in a server action. A malicious user could intercept the network request and modify the price payload (e.g. `{ price: 0.01 }`) before it reaches the server.
**Prevention:** Always maintain a single source of truth for critical data (like a product catalog or database table) on the server. When processing transactions or carts, use an identifier (like product ID or name) to look up the secure, server-side value rather than trusting the client payload.
