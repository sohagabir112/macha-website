## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-05-05 - [Price Manipulation in Add To Cart]
**Vulnerability:** The `addToCart` server action accepted an arbitrary price from the client instead of using a trusted server-side catalog, allowing malicious actors to manipulate the price of items added to the cart.
**Learning:** Client-provided data related to product properties (like price or description) is untrusted and should never be used to construct the authoritative cart or order records without server-side validation.
**Prevention:** Always extract and define product catalogs or pricing on the server (e.g., in a utility file or database) and validate the client-provided `product.name` or `product.id` against this single source of truth to derive the trusted price.
