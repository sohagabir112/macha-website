## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Cart Action]
**Vulnerability:** A critical price manipulation vulnerability was found in `app/shop/actions.ts`. The `addToCart` server action accepted the price from the client without verifying it against a trusted server-side source before insertion.
**Learning:** Hardcoding duplicate data on the server and client leads to vulnerabilities where untrusted client inputs are directly processed and written to the database. Next.js server actions are exposed as endpoints, and any parameters (like `product.price`) must be treated as untrusted.
**Prevention:** Extract catalog/pricing data to a single shared source of truth. Always validate client-provided product identifiers and fetch the corresponding trusted data (e.g. price) on the server side before performing database inserts or updates.
