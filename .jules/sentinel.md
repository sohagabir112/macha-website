## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2026-04-29 - [Price Manipulation via Client-Side Input]
**Vulnerability:** A critical price manipulation vulnerability was found in `app/shop/actions.ts`. The server action `addToCart` accepted both `product_name` and `price` from the client and directly inserted the client-provided price into the database. An attacker could tamper with the request to purchase items at arbitrary prices (e.g., $0.01).
**Learning:** Client-provided prices (or any critical business data) cannot be trusted, even if the UI restricts choices. Server actions must validate product data against a trusted server-side source or catalog to enforce correct pricing.
**Prevention:** Always maintain a server-side catalog (or fetch authoritative prices from the database) and validate/use the trusted server-side price based on the product ID or name when processing orders or cart additions.
