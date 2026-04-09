## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation via Client-Provided Data]
**Vulnerability:** A price manipulation vulnerability existed in `app/shop/actions.ts` where the `addToCart` server action blindly trusted the `price` provided by the client when inserting a new item into the cart. This allowed malicious users to modify the client-side request and add items to their cart with arbitrary prices (e.g., $0.01).
**Learning:** Server actions must never trust critical business data (like prices or product details) sent from the client. The client can easily manipulate any data it sends.
**Prevention:** Always validate client-provided product identifiers against a trusted server-side catalog (e.g., `app/shop/products.ts` or a database). When performing business logic or saving to the database, use the trusted server-side data, not the client-provided data.
