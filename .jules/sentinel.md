## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation via Client Input]
**Vulnerability:** The `addToCart` server action in `app/shop/actions.ts` accepted the product price directly from the client without server-side validation. An attacker could manipulate the `price` parameter in the client request to add items to the cart at an arbitrary or zero price.
**Learning:** Never trust client-provided pricing data. Always maintain a single source of truth for product pricing on the server (e.g., a database or a shared catalog module) and validate against it.
**Prevention:** Extract product catalog definitions into a shared module (`utils/products.ts`) and use the server-side trusted catalog to enforce pricing in server actions, ignoring untrusted client price inputs.
