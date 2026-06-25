## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Client-side price manipulation vulnerability found in `app/shop/actions.ts`. The `addToCart` server action blindly trusted the `price` property sent from the client-side component when inserting new items into the `cart_items` table.
**Learning:** Never trust client-provided data for critical business logic like pricing. Data sent over the network can be intercepted and modified by an attacker, allowing them to dictate the price of items added to their cart.
**Prevention:** Always maintain a single source of truth for critical data on the server (e.g., a database or a shared catalog module). In server actions, use the client-provided identifier (like product ID or name) to fetch the trusted data (like price) directly from the server-side source before performing operations.
