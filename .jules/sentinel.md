## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Client-side price manipulation found in `app/shop/actions.ts`. The `addToCart` server action blindly trusted the client-provided `price` value to insert cart items.
**Learning:** Never trust client-provided pricing or sensitive data. Malicious users can intercept the request to change prices before it hits the server action.
**Prevention:** Extract the product catalog into a single server-side trusted source of truth (`utils/products.ts`), and validate client requests against it within server actions to enforce correct pricing.
