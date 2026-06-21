## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Client-provided product prices were being directly written to the database in `addToCart` server action in `app/shop/actions.ts` without being validated against a trusted server-side source.
**Learning:** Server actions must treat all client inputs (especially prices and critical business logic data) as untrusted. Duplicating pricing data in client components and server actions without a single source of truth makes validation difficult and prone to bypasses.
**Prevention:** Extract critical product data (like prices) to a shared server-side utility or database, and always validate client-provided parameters against this trusted source before performing database mutations.
