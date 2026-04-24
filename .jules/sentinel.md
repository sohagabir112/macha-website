## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation via Client Form Submission]
**Vulnerability:** A price manipulation vulnerability was found in the `addToCart` server action in `app/shop/actions.ts`. The action accepted and blindly trusted the `price` parameter provided by the client when adding a product to the cart, allowing users to modify the price arbitrarily (e.g. adding a $100 product for $0.01).
**Learning:** Client-provided data related to critical business logic (especially pricing) must never be trusted. Server actions must validate the input against a trusted server-side source of truth.
**Prevention:** Always maintain a server-side catalog or database of products and their canonical prices. When processing cart operations, look up the price server-side using an identifier (like product ID or name) and ignore any price data sent by the client.
