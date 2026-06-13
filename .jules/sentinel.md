## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Price Manipulation found in `app/shop/actions.ts`. The server action `addToCart` was trusting the `price` provided by the client when inserting new items into the database, allowing a malicious user to set an arbitrary price (e.g., $0.01) for items.
**Learning:** Never trust client-provided data for critical business logic like pricing. Even if the UI is restricted, the server action can be called directly or intercepted.
**Prevention:** Always validate client-provided product data against a single trusted server-side source of truth (e.g., a shared catalog or database) to enforce correct pricing and prevent manipulation.
