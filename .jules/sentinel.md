## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation via Server Action]
**Vulnerability:** Client-side price manipulation in `app/shop/actions.ts`. The `addToCart` server action blindly trusted the `product.price` supplied by the client, allowing malicious users to arbitrarily set the price of items being added to their cart (e.g., to $0).
**Learning:** Never trust client-provided pricing data. Server actions must validate critical business logic variables (like price) against a trusted server-side source of truth.
**Prevention:** Hardcode or database-fetch a trusted price dictionary (`TRUSTED_PRODUCTS`) on the server. Validate incoming product requests against this trusted source and strictly use the trusted server-side price for all downstream logic (e.g., inserting into the database).
