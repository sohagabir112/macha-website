## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** A price manipulation vulnerability was found in the `addToCart` server action (`app/shop/actions.ts`). The action previously accepted user-provided prices from the client-side component and inserted them directly into the database without server-side validation.
**Learning:** Client-provided data (especially critical properties like price) must never be trusted. Malicious users can easily intercept network requests and alter these values before they reach the server.
**Prevention:** Always maintain a trusted server-side source of truth (like a product catalog) and use it to look up and validate properties (like price) before processing transactions or storing data based on client requests.
