## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Found a price manipulation vulnerability in `app/shop/actions.ts`. The `addToCart` server action accepted a `price` directly from the client and inserted it into the database without validation. An attacker could tamper with the request to add items at an arbitrarily low price.
**Learning:** Never trust client-provided data for critical business logic (like pricing), even if it originates from an internal UI.
**Prevention:** Establish a single source of truth for product data on the server (e.g., `utils/products.ts` or a database). When receiving requests, use a unique identifier (like `name` or `id`) to look up the trusted price on the server before processing transactions or modifying the database.
