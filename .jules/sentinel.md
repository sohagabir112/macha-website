## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation Vulnerability in Shopping Cart]
**Vulnerability:** In `app/shop/actions.ts`, the `addToCart` server action blindly trusted the client-provided `price` from the `product` object when inserting new cart items into the database. A malicious client could alter the request to set an arbitrary price (e.g., $0.01) for any product.
**Learning:** Client-provided data is inherently untrustworthy. Even if the UI displays the correct price, the underlying API/action payload can be intercepted and modified. Trusting client prices for e-commerce transactions leads directly to severe business logic flaws.
**Prevention:** Never trust client-side pricing data. Always look up prices and critical product details from a trusted, server-side source of truth (e.g., a database or shared constants file) using an identifier like the product ID or name.
