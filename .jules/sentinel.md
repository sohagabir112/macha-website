## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation Vulnerability in Server Actions]
**Vulnerability:** A critical price manipulation vulnerability found in `app/shop/actions.ts`. The `addToCart` server action accepted unverified product pricing and name directly from the client and inserted it into the database, allowing an attacker to submit custom prices (e.g., $0) for products.
**Learning:** Client-provided data related to pricing, discounts, or sensitive product details cannot be trusted. Server actions must validate or lookup the canonical values from a trusted server-side source before performing critical operations.
**Prevention:** Extract product catalogs or pricing logic into a shared server-side utility or database table. Pass only identifiers (like `id` or `slug`) from the client, and look up the trusted price server-side within the action.
