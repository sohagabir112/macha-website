## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Client-side price manipulation found in `app/shop/actions.ts`. The `addToCart` server action accepted a product's price directly from the client without verification, allowing an attacker to intercept the request and set an arbitrary price (e.g., $0.01) before it was stored in the database.
**Learning:** Server actions must never trust client-provided pricing or sensitive data. Even if the UI shows the correct price, the underlying API call can be easily manipulated.
**Prevention:** Always maintain a server-side source of truth for product data (e.g., a database query or a shared backend utility). In server actions that process orders or cart additions, extract an identifier from the client request and use it to look up the trusted price securely on the server.
