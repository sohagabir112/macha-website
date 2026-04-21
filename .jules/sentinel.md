## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Client-Side Price Manipulation]
**Vulnerability:** The `addToCart` server action in `app/shop/actions.ts` relied entirely on the client-provided `price` parameter to insert new items into the user's cart, making it possible for a malicious actor to add an expensive item to the cart for $0.00.
**Learning:** Client-provided parameters should never be trusted for sensitive operations like billing and pricing. Prices must be strictly controlled and validated on the server side.
**Prevention:** Always maintain a server-side catalog or database table for product prices. Server actions must retrieve the trusted price directly using the product ID or name, instead of accepting user-provided price parameters.
