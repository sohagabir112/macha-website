## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** E-commerce applications relying on client-provided price data in server actions (`addToCart`) are vulnerable to Price Manipulation attacks, where a malicious actor intercepts and modifies the API request to purchase items at a lower cost (e.g., $0.01).
**Learning:** Never trust client-provided data for critical business logic like pricing. The client-side is inherently insecure and can be bypassed or manipulated.
**Prevention:** Always maintain a single Server-Side Source of Truth (e.g., a centralized `utils/products.ts` catalog or database table). Server actions should accept only a `productId` and resolve the trusted price on the server before database insertion or payment processing.
