## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** The `addToCart` server action in `app/shop/actions.ts` directly used the client-provided `price` when inserting new items into the `cart_items` table. This allows a malicious user to manipulate the client payload and add expensive items to their cart for arbitrary amounts (e.g., $0.01).
**Learning:** Server actions must never trust client-provided data for critical business logic like pricing. All client data must be validated against a trusted server-side source or catalog.
**Prevention:** Always define a trusted server-side representation of products/pricing or query the database for the correct price based on a product ID before performing financial operations or adding items to a cart.
