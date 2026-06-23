## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-27 - Price Manipulation in Server Action
**Vulnerability:** A price manipulation vulnerability was found in the `addToCart` server action (`app/shop/actions.ts`), which incorrectly relied on the client-provided price (from `app/shop/page.tsx`) to set the price in the `cart_items` table. A malicious user could modify the client-side request to set an arbitrary price (e.g. `$0.01`).
**Learning:** The client should never be trusted as the authoritative source for critical data like pricing. Server actions must retrieve prices from a trusted, centralized server-side source of truth.
**Prevention:** Always validate and overwrite client-provided price data using a centralized, trusted source on the server (like `PRODUCTS` array in `utils/products.ts` or a database query) before inserting or updating data related to financial transactions.
