## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Cart Actions]
**Vulnerability:** The `addToCart` server action in `app/shop/actions.ts` was blindly trusting the `price` property passed from the client payload when inserting new items into the `cart_items` table. A malicious user could intercept the request and modify the price to $0.00.
**Learning:** Never trust client-provided data for sensitive fields like product pricing, especially in e-commerce applications. The client should only send the product identifier, and the server must independently verify the correct price from a trusted source.
**Prevention:** Always maintain a single source of truth for product data on the server (e.g., a database or a shared catalog module like `utils/products.ts`). Server actions should look up the trusted price using the product identifier before performing database operations.
