## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** The `addToCart` server action accepted `price` directly from the client. This allows malicious actors to modify the price parameter and checkout items for a fraction of their intended cost (Price Manipulation).
**Learning:** Never trust client-provided data for critical business logic like pricing or discounts. Even inside modern frameworks using "Server Actions", parameters provided to the action come from the client request and can be spoofed.
**Prevention:** Always use a single server-side source of truth for critical data like pricing (e.g., look up product details from a database or a shared server-side catalog like `utils/products.ts` using only an ID provided by the client).
