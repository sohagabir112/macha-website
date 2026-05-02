## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Client-provided product data (including price) was blindly trusted by the `addToCart` server action in `app/shop/actions.ts` before insertion into the database, allowing an attacker to manipulate network requests to purchase items at a lower or zero cost.
**Learning:** Client state (e.g. `product.price` sent from a React component) cannot be trusted as it can be easily intercepted and modified. Server actions that deal with sensitive commerce operations (pricing, discounts, etc) must re-verify all inputs against a trusted server-side source.
**Prevention:** Establish a single source of truth (e.g., database or server-side catalog like `utils/products.ts`). When a client requests to add an item to the cart, the server action must look up the product by ID/Name in the trusted source and use the server-validated price, completely ignoring the price sent by the client.
