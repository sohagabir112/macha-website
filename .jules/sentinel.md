## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.
## 2025-02-28 - [CRITICAL] Fix Client-Side Price Manipulation Vulnerability
**Vulnerability:** The `addToCart` server action accepted a `price` parameter directly from the client. This allows malicious actors to manipulate the network request and add items to their cart for any price (e.g. $0.01) instead of the actual listed price.
**Learning:** Client-provided data related to pricing, discounts, or inventory must never be trusted. The server must act as the single source of truth for pricing.
**Prevention:** Extract catalog data into a central `utils/products.ts` or query the database to act as the single source of truth. Always validate user selections against this source and strictly use the server-side pricing data rather than relying on values submitted from the client.
