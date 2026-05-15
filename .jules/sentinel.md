## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Untrusted client input for product price was used directly in `app/shop/actions.ts` when adding items to the cart, allowing users to potentially manipulate the price of items they purchase.
**Learning:** Client-provided data (especially regarding pricing or sensitive parameters) should never be trusted. Server actions must validate the input against a trusted server-side source of truth.
**Prevention:** Establish a single source of truth for product data on the server (e.g., `utils/products.ts` or a database). In server actions, use the client-provided identifier (like product name or ID) to look up the trusted data and use the server-side price for database insertions.
