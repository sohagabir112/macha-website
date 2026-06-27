## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Client-provided prices were directly inserted into the database in the `addToCart` server action (`app/shop/actions.ts`). A malicious user could alter the `price` parameter in the payload to purchase items at any price, including $0.00.
**Learning:** Never trust pricing or sensitive data provided by the client, even if it comes from a trusted UI component. Always re-validate and enforce pricing using a server-side single source of truth.
**Prevention:** Centralize product catalogs (e.g., in `utils/products.ts` or a database). Server actions must use a unique identifier (`id` or `name`) from the client to look up the correct price server-side before performing any transactional operations.
