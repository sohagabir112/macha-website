## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** A price manipulation vulnerability was found in `app/shop/actions.ts`. The `addToCart` server action blindly trusted the client-provided `price` parameter from the product object without verifying it against a trusted source.
**Learning:** Server actions must not trust client-provided data for critical business logic like pricing. Attackers could easily modify the price in the payload to an arbitrary amount (e.g. `$0.01`).
**Prevention:** Always extract critical static data (like product catalogs) to a centralized server-side module acting as a single source of truth. Server actions should look up the correct price based on a product identifier, ignoring the client-provided price parameter.
