## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-03-05 - [Price Manipulation in Server Actions]
**Vulnerability:** Price manipulation vulnerability in `app/shop/actions.ts`. The `addToCart` server action blindly accepted the product price and name from the client via input arguments.
**Learning:** Client-provided data (like prices in e-commerce apps) should never be trusted when performing critical actions. Malicious actors could intercept and modify the payload to submit an arbitrary price for an item.
**Prevention:** Always use a single server-side source of truth for critical data like pricing. Server actions should accept identifiers (e.g., `id`) and look up the sensitive data (like `price` and `name`) from the trusted source before performing operations.