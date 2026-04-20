## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2026-04-20 - Server Actions Price Manipulation
**Vulnerability:** E-commerce Server Actions implicitly trusted client-provided price data (`product.price`) when inserting new cart items.
**Learning:** In Next.js Server Actions, all client-provided data must be treated as untrusted, especially critical business logic data like product pricing. Attackers could easily modify the price payload in the network request to set arbitrary prices for items.
**Prevention:** Always maintain a server-side source of truth (e.g., a catalog database or constant) for critical data like prices and validate client input against it before performing any database operations.
