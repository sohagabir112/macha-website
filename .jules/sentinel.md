## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Business Logic/Price Manipulation vulnerability found in `app/shop/actions.ts`. The `addToCart` server action accepted `price` from the client and inserted it directly into the database without validation.
**Learning:** Never trust client-provided data for critical business logic like pricing. Even if the UI shows the correct price, a malicious user can intercept the request and modify the payload (e.g., setting price to $0.01) before it reaches the server.
**Prevention:** Always maintain a single source of truth for critical data (e.g., a shared catalog file or database query) and validate incoming client requests against this server-side source of truth.
