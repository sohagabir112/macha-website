## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Client-side price data was being trusted and directly inserted into the database in the `addToCart` server action (`app/shop/actions.ts`), allowing users to manipulate product prices.
**Learning:** Server actions, even when validating authentication, must independently fetch or verify critical domain data (like prices) from a trusted server-side source to prevent manipulation.
**Prevention:** Never trust client-provided pricing or sensitive business logic data. Always re-fetch or validate against a trusted catalog (e.g., `utils/products.ts` or database) within the server action.
