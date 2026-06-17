## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** A price manipulation vulnerability was found in the `addToCart` server action in `app/shop/actions.ts`. The server blindly trusted the `product.price` provided in the client request.
**Learning:** Server actions must never trust client-provided data for critical business logic like pricing. The client-provided product data must be validated against a trusted server-side source.
**Prevention:** Implement a single source of truth for product data on the server (e.g., in a utility file or database) and validate incoming requests against this trusted source before performing critical operations.
