## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** E-commerce price manipulation vulnerability found in `app/shop/actions.ts`. The `addToCart` server action accepted `product.price` from the client and inserted it directly into the database without validation.
**Learning:** Client-provided data related to pricing, billing, or authorization should never be trusted blindly. Hardcoding product data directly in client components and passing it to server actions introduces risks of client-side tampering.
**Prevention:** Always validate client-provided product data against a trusted server-side source of truth (e.g., extracting a shared catalog to `utils/products.ts` or querying a database) before performing transactions or adding items to carts.
